// Stripe Webhook处理
// 处理Stripe支付事件回调

import { headers } from 'next/headers';
import {
  stripe,
  verifyWebhookSignature,
  createNotification
} from '../stripe/config.js';
import { supabase, createResponse, handleError } from '../utils/supabase.js';

// 处理订阅创建事件
const handleSubscriptionCreated = async (subscription) => {
  try {
    const userId = subscription.metadata.user_id;
    const planType = subscription.metadata.plan_type;

    if (!userId || !planType) {
      console.error('订阅创建事件缺少必要信息:', subscription.id);
      return;
    }

    // 获取订阅计划信息
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('slug', planType)
      .single();

    if (planError || !plan) {
      console.error('未找到订阅计划:', planType);
      return;
    }

    // 更新用户资料中的订阅信息
    await supabase
      .from('profiles')
      .update({
        subscription_tier: planType,
        subscription_status: subscription.status,
        subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString()
      })
      .eq('id', userId);

    // 创建订阅记录
    await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        plan_id: plan.id,
        stripe_subscription_id: subscription.id,
        stripe_customer_id: subscription.customer,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
        trial_start: subscription.trial_start ? new Date(subscription.trial_start * 1000).toISOString() : null,
        trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null
      });

    // 发送通知给用户
    await createNotification(
      userId,
      'subscription',
      '订阅创建成功',
      `恭喜！您已成功订阅${plan.name}`,
      {
        subscription_id: subscription.id,
        plan_type: planType,
        plan_name: plan.name
      }
    );

    console.log(`订阅创建成功: 用户 ${userId}, 计划 ${planType}`);
  } catch (error) {
    console.error('处理订阅创建事件失败:', error);
  }
};

// 处理订阅更新事件
const handleSubscriptionUpdated = async (subscription) => {
  try {
    const userId = subscription.metadata.user_id;
    const planType = subscription.metadata.plan_type;

    if (!userId || !planType) {
      console.error('订阅更新事件缺少必要信息:', subscription.id);
      return;
    }

    // 获取订阅计划信息
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('slug', planType)
      .single();

    if (planError || !plan) {
      console.error('未找到订阅计划:', planType);
      return;
    }

    // 更新用户资料中的订阅信息
    await supabase
      .from('profiles')
      .update({
        subscription_tier: planType,
        subscription_status: subscription.status,
        subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString()
      })
      .eq('id', userId);

    // 更新订阅记录
    await supabase
      .from('subscriptions')
      .update({
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end
      })
      .eq('stripe_subscription_id', subscription.id);

    // 如果订阅被取消，发送通知
    if (subscription.cancel_at_period_end) {
      await createNotification(
        userId,
        'subscription',
        '订阅即将取消',
        `您的${plan.name}订阅将在当前期间结束后取消`,
        {
          subscription_id: subscription.id,
          plan_type: planType,
          cancel_date: new Date(subscription.current_period_end * 1000).toISOString()
        }
      );
    }

    console.log(`订阅更新成功: 用户 ${userId}, 状态 ${subscription.status}`);
  } catch (error) {
    console.error('处理订阅更新事件失败:', error);
  }
};

// 处理订阅删除事件
const handleSubscriptionDeleted = async (subscription) => {
  try {
    const userId = subscription.metadata.user_id;

    if (!userId) {
      console.error('订阅删除事件缺少用户信息:', subscription.id);
      return;
    }

    // 更新用户资料为免费版
    await supabase
      .from('profiles')
      .update({
        subscription_tier: 'free',
        subscription_status: 'cancelled',
        subscription_end_date: new Date().toISOString()
      })
      .eq('id', userId);

    // 更新订阅记录
    await supabase
      .from('subscriptions')
      .update({
        status: 'canceled'
      })
      .eq('stripe_subscription_id', subscription.id);

    // 发送取消通知
    await createNotification(
      userId,
      'subscription',
      '订阅已取消',
      '您的订阅已被取消。感谢您的支持！',
      {
        subscription_id: subscription.id,
        cancelled_at: new Date().toISOString()
      }
    );

    console.log(`订阅删除成功: 用户 ${userId}`);
  } catch (error) {
    console.error('处理订阅删除事件失败:', error);
  }
};

// 处理支付成功事件
const handlePaymentSucceeded = async (paymentIntent) => {
  try {
    const userId = paymentIntent.metadata.user_id;
    const paymentType = paymentIntent.metadata.payment_type;

    if (!userId) {
      console.error('支付成功事件缺少用户信息:', paymentIntent.id);
      return;
    }

    // 获取用户信息
    const { data: user, error: userError } = await supabase
      .from('profiles')
      .select('email, username, full_name')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      console.error('未找到用户信息:', userId);
      return;
    }

    // 记录支付信息
    await supabase
      .from('payments')
      .insert({
        user_id: userId,
        stripe_payment_intent_id: paymentIntent.id,
        amount: paymentIntent.amount / 100, // 转换为元
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        payment_method: paymentIntent.payment_method_types[0],
        description: paymentIntent.description,
        metadata: paymentIntent.metadata
      });

    // 发送支付成功通知
    if (paymentType === 'one_time') {
      await createNotification(
        userId,
        'subscription',
        '支付成功',
        `您的支付 $${(paymentIntent.amount / 100).toFixed(2)} 已成功处理`,
        {
          payment_intent_id: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency
        }
      );
    }

    console.log(`支付成功记录: 用户 ${userId}, 金额 $${(paymentIntent.amount / 100).toFixed(2)}`);
  } catch (error) {
    console.error('处理支付成功事件失败:', error);
  }
};

// 处理支付失败事件
const handlePaymentFailed = async (paymentIntent) => {
  try {
    const userId = paymentIntent.metadata.user_id;

    if (!userId) {
      console.error('支付失败事件缺少用户信息:', paymentIntent.id);
      return;
    }

    // 记录支付失败信息
    await supabase
      .from('payments')
      .insert({
        user_id: userId,
        stripe_payment_intent_id: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: 'failed',
        payment_method: paymentIntent.payment_method_types[0],
        description: paymentIntent.description,
        metadata: paymentIntent.metadata
      });

    // 发送支付失败通知
    await createNotification(
      userId,
      'subscription',
      '支付失败',
      '您的支付未能成功处理，请检查支付信息或联系客服',
      {
        payment_intent_id: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        failure_reason: paymentIntent.last_payment_error?.message
      }
    );

    console.log(`支付失败记录: 用户 ${userId}, 金额 $${(paymentIntent.amount / 100).toFixed(2)}`);
  } catch (error) {
    console.error('处理支付失败事件失败:', error);
  }
};

// 处理发票创建事件
const handleInvoiceCreated = async (invoice) => {
  try {
    // 记录发票信息（可选）
    console.log(`发票创建: ${invoice.id}, 客户: ${invoice.customer}`);
  } catch (error) {
    console.error('处理发票创建事件失败:', error);
  }
};

// 处理发票支付成功事件
const handleInvoicePaymentSucceeded = async (invoice) => {
  try {
    const subscriptionId = invoice.subscription;

    if (!subscriptionId) {
      return;
    }

    // 获取订阅信息
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('user_id, plan_id')
      .eq('stripe_subscription_id', subscriptionId)
      .single();

    if (subError || !subscription) {
      console.error('未找到订阅信息:', subscriptionId);
      return;
    }

    // 获取计划信息
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('name')
      .eq('id', subscription.plan_id)
      .single();

    if (planError || !plan) {
      console.error('未找到计划信息:', subscription.plan_id);
      return;
    }

    // 发送续费成功通知
    await createNotification(
      subscription.user_id,
      'subscription',
      '续费成功',
      `您的${plan.name}订阅已成功续费`,
      {
        subscription_id: subscriptionId,
        plan_name: plan.name,
        amount: invoice.total / 100,
        currency: invoice.currency,
        next_payment_date: new Date(invoice.period_end * 1000).toISOString()
      }
    );

    console.log(`续费成功: 用户 ${subscription.user_id}, 计划 ${plan.name}`);
  } catch (error) {
    console.error('处理发票支付成功事件失败:', error);
  }
};

// 处理发票支付失败事件
const handleInvoicePaymentFailed = async (invoice) => {
  try {
    const subscriptionId = invoice.subscription;

    if (!subscriptionId) {
      return;
    }

    // 获取订阅信息
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('user_id, plan_id')
      .eq('stripe_subscription_id', subscriptionId)
      .single();

    if (subError || !subscription) {
      console.error('未找到订阅信息:', subscriptionId);
      return;
    }

    // 获取计划信息
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('name')
      .eq('id', subscription.plan_id)
      .single();

    if (planError || !plan) {
      console.error('未找到计划信息:', subscription.plan_id);
      return;
    }

    // 发送续费失败通知
    await createNotification(
      subscription.user_id,
      'subscription',
      '续费失败',
      `您的${plan.name}订阅续费失败，请检查支付信息`,
      {
        subscription_id: subscriptionId,
        plan_name: plan.name,
        amount: invoice.total / 100,
        currency: invoice.currency,
        attempt_count: invoice.attempt_count
      }
    );

    console.log(`续费失败: 用户 ${subscription.user_id}, 计划 ${plan.name}`);
  } catch (error) {
    console.error('处理发票支付失败事件失败:', error);
  }
};

// 事件处理器映射
const eventHandlers = {
  'customer.subscription.created': handleSubscriptionCreated,
  'customer.subscription.updated': handleSubscriptionUpdated,
  'customer.subscription.deleted': handleSubscriptionDeleted,
  'payment_intent.succeeded': handlePaymentSucceeded,
  'payment_intent.payment_failed': handlePaymentFailed,
  'invoice.created': handleInvoiceCreated,
  'invoice.payment_succeeded': handleInvoicePaymentSucceeded,
  'invoice.payment_failed': handleInvoicePaymentFailed,
};

// Webhook处理主函数
export async function POST(request) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      return createResponse(false, null, { code: 'INVALID_SIGNATURE' }, '缺少Stripe签名', 400);
    }

    // 验证Webhook签名
    let event;
    try {
      event = verifyWebhookSignature(body, signature);
    } catch (error) {
      console.error('Webhook签名验证失败:', error);
      return createResponse(false, null, { code: 'INVALID_SIGNATURE' }, '签名验证失败', 400);
    }

    console.log(`收到Stripe事件: ${event.type}`);

    // 获取事件处理器
    const handler = eventHandlers[event.type];

    if (handler) {
      await handler(event.data.object);
    } else {
      console.log(`未处理的事件类型: ${event.type}`);
    }

    return createResponse(true, { received: true }, null, '事件处理成功');
  } catch (error) {
    console.error('Webhook处理失败:', error);
    return handleError(error, 'POST /api/webhooks/stripe');
  }
}

// 支持OPTIONS请求（用于CORS预检）
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, stripe-signature',
    },
  });
}