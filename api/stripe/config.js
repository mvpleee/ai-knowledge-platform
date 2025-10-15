// Stripe支付配置
// AI知识平台订阅支付系统

import Stripe from 'stripe';

// 初始化Stripe客户端
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
  typescript: true,
});

// 订阅计划配置
const SUBSCRIPTION_PLANS = {
  free: {
    name: '免费版',
    description: '基础功能，适合个人用户',
    price: 0,
    currency: 'usd',
    interval: 'month',
    features: [
      '阅读所有公开文章',
      '基础搜索功能',
      '每月5次AI查询',
      '社区支持'
    ],
    limits: {
      articles_per_month: 5,
      ai_queries_per_month: 5,
      max_file_size: '5MB'
    }
  },
  basic: {
    name: '基础版',
    description: '适合内容创作者',
    price: 999, // $9.99 in cents
    currency: 'usd',
    interval: 'month',
    features: [
      '所有免费版功能',
      '每月20篇文章',
      '每月100次AI查询',
      '高级搜索',
      '导出功能',
      '邮件支持'
    ],
    limits: {
      articles_per_month: 20,
      ai_queries_per_month: 100,
      max_file_size: '10MB'
    }
  },
  premium: {
    name: '高级版',
    description: '适合专业团队',
    price: 1999, // $19.99 in cents
    currency: 'usd',
    interval: 'month',
    features: [
      '所有基础版功能',
      '无限文章',
      '无限AI查询',
      '优先技术支持',
      '自定义内容模板',
      'API访问',
      '数据分析'
    ],
    limits: {
      articles_per_month: null, // 无限制
      ai_queries_per_month: null, // 无限制
      max_file_size: '50MB'
    }
  }
};

// 网站配置
const SITE_CONFIG = {
  name: 'AI知识平台',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.vercel.app',
  supportEmail: 'support@your-domain.com',
  company: {
    name: 'Your Company Name',
    address: {
      line1: '123 Main St',
      city: 'Beijing',
      state: 'Beijing',
      postal_code: '100000',
      country: 'CN'
    }
  }
};

// 支付成功和取消页面URL
const URLs = {
  success: `${SITE_CONFIG.url}/subscription/success`,
  cancel: `${SITE_CONFIG.url}/subscription/cancel`,
  billing_portal: `${SITE_CONFIG.url}/subscription/billing`
};

// 创建Stripe客户
const createCustomer = async (email, userId, metadata = {}) => {
  try {
    const customer = await stripe.customers.create({
      email,
      metadata: {
        user_id: userId,
        ...metadata
      },
      description: `AI知识平台用户 - ${userId}`
    });

    return customer;
  } catch (error) {
    console.error('创建Stripe客户失败:', error);
    throw error;
  }
};

// 获取或创建Stripe客户
const getOrCreateCustomer = async (email, userId) => {
  try {
    // 首先尝试通过metadata查找现有客户
    const existingCustomers = await stripe.customers.list({
      email,
      limit: 1
    });

    if (existingCustomers.data.length > 0) {
      return existingCustomers.data[0];
    }

    // 如果没有找到，创建新客户
    return await createCustomer(email, userId);
  } catch (error) {
    console.error('获取或创建Stripe客户失败:', error);
    throw error;
  }
};

// 创建或获取产品
const getOrCreateProduct = async (plan) => {
  const productName = `AI知识平台 - ${plan.name}`;

  try {
    // 查找现有产品
    const existingProducts = await stripe.products.list({
      limit: 1,
      active: true
    });

    const existingProduct = existingProducts.data.find(
      product => product.name === productName
    );

    if (existingProduct) {
      return existingProduct;
    }

    // 创建新产品
    const product = await stripe.products.create({
      name: productName,
      description: plan.description,
      metadata: {
        plan_id: plan.id,
        features: JSON.stringify(plan.features)
      },
      images: [], // 可以添加产品图片
    });

    return product;
  } catch (error) {
    console.error('创建或获取Stripe产品失败:', error);
    throw error;
  }
};

// 创建价格
const createPrice = async (product, plan) => {
  try {
    // 检查是否已存在相同价格
    const existingPrices = await stripe.prices.list({
      product: product.id,
      active: true,
      limit: 1
    });

    const existingPrice = existingPrices.data.find(
      price => price.unit_amount === plan.price &&
               price.currency === plan.currency &&
               price.recurring?.interval === plan.interval
    );

    if (existingPrice) {
      return existingPrice;
    }

    // 创建新价格
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.price,
      currency: plan.currency,
      recurring: {
        interval: plan.interval,
        interval_count: 1
      },
      nickname: `${plan.name} - ${plan.interval}`,
      metadata: {
        plan_type: plan.id
      }
    });

    return price;
  } catch (error) {
    console.error('创建Stripe价格失败:', error);
    throw error;
  }
};

// 创建订阅结账会话
const createSubscriptionCheckout = async (userId, email, planType, successUrl, cancelUrl) => {
  try {
    const plan = SUBSCRIPTION_PLANS[planType];
    if (!plan) {
      throw new Error(`无效的订阅计划: ${planType}`);
    }

    // 获取或创建客户
    const customer = await getOrCreateCustomer(email, userId);

    // 获取或创建产品
    const product = await getOrCreateProduct({ ...plan, id: planType });

    // 创建价格
    const price = await createPrice(product, plan);

    // 创建结账会话
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || URLs.success,
      cancel_url: cancelUrl || URLs.cancel,
      metadata: {
        user_id: userId,
        plan_type: planType
      },
      subscription_data: {
        metadata: {
          user_id: userId,
          plan_type: planType
        }
      },
      customer_email: email,
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
      locale: 'zh-CN'
    });

    return session;
  } catch (error) {
    console.error('创建订阅结账会话失败:', error);
    throw error;
  }
};

// 创建一次性支付结账会话
const createPaymentCheckout = async (userId, email, amount, description, successUrl, cancelUrl) => {
  try {
    // 获取或创建客户
    const customer = await getOrCreateCustomer(email, userId);

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: description,
              description: `AI知识平台 - ${description}`
            },
            unit_amount: amount, // 金额（分）
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || URLs.success,
      cancel_url: cancelUrl || URLs.cancel,
      metadata: {
        user_id: userId,
        payment_type: 'one_time',
        description
      }
    });

    return session;
  } catch (error) {
    console.error('创建支付结账会话失败:', error);
    throw error;
  }
};

// 创建客户门户会话
const createBillingPortalSession = async (customerId, returnUrl) => {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl || URLs.billing_portal,
    });

    return session;
  } catch (error) {
    console.error('创建客户门户会话失败:', error);
    throw error;
  }
};

// 取消订阅
const cancelSubscription = async (subscriptionId, immediate = false) => {
  try {
    let subscription;

    if (immediate) {
      subscription = await stripe.subscriptions.cancel(subscriptionId);
    } else {
      subscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true
      });
    }

    return subscription;
  } catch (error) {
    console.error('取消订阅失败:', error);
    throw error;
  }
};

// 恢复订阅
const resumeSubscription = async (subscriptionId) => {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
      proration_behavior: 'create_prorations'
    });

    return subscription;
  } catch (error) {
    console.error('恢复订阅失败:', error);
    throw error;
  }
};

// 更新订阅
const updateSubscription = async (subscriptionId, priceId) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [{
        id: subscription.items.data[0].id,
        price: priceId,
      }],
      proration_behavior: 'create_prorations'
    });

    return updatedSubscription;
  } catch (error) {
    console.error('更新订阅失败:', error);
    throw error;
  }
};

// 获取客户订阅信息
const getCustomerSubscriptions = async (customerId) => {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'all',
      expand: ['data.default_payment_method']
    });

    return subscriptions.data;
  } catch (error) {
    console.error('获取客户订阅失败:', error);
    throw error;
  }
};

// 获取支付历史
const getCustomerPaymentHistory = async (customerId, limit = 10) => {
  try {
    const paymentIntents = await stripe.paymentIntents.list({
      customer: customerId,
      limit,
      expand: ['data.payment_method']
    });

    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit,
      expand: ['data.payment_intent']
    });

    return {
      payment_intents: paymentIntents.data,
      invoices: invoices.data
    };
  } catch (error) {
    console.error('获取支付历史失败:', error);
    throw error;
  }
};

// 验证Webhook签名
const verifyWebhookSignature = (payload, signature) => {
  try {
    return stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error('Webhook签名验证失败:', error);
    throw error;
  }
};

// 计算使用量费用（用于按量计费）
const calculateUsageFee = (usage, unitPrice) => {
  return usage * unitPrice;
};

// 生成发票数据
const generateInvoiceData = (subscription, periodStart, periodEnd) => {
  return {
    customer: subscription.customer,
    subscription: subscription.id,
    period_start: periodStart,
    period_end: periodEnd,
    description: `${SITE_CONFIG.name} 订阅费用`,
    currency: subscription.currency,
    amount_due: subscription.items.data[0].amount,
    metadata: {
      plan_type: subscription.metadata.plan_type,
      user_id: subscription.metadata.user_id
    }
  };
};

// 导出所有函数和配置
export {
  stripe,
  SUBSCRIPTION_PLANS,
  SITE_CONFIG,
  URLs,
  createCustomer,
  getOrCreateCustomer,
  getOrCreateProduct,
  createPrice,
  createSubscriptionCheckout,
  createPaymentCheckout,
  createBillingPortalSession,
  cancelSubscription,
  resumeSubscription,
  updateSubscription,
  getCustomerSubscriptions,
  getCustomerPaymentHistory,
  verifyWebhookSignature,
  calculateUsageFee,
  generateInvoiceData
};