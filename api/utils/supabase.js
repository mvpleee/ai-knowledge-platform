// Supabase客户端配置和工具函数
// AI知识平台后端API核心模块

import { createClient } from '@supabase/supabase-js';

// 创建Supabase客户端
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY, // 使用服务角色密钥获得完整权限
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// 响应格式化工具
const createResponse = (success, data = null, error = null, message = '', statusCode = 200) => {
  const response = {
    success,
    timestamp: new Date().toISOString(),
  };

  if (success) {
    response.data = data;
    if (message) response.message = message;
  } else {
    response.error = error;
    if (message) response.error.message = message;
  }

  return new Response(JSON.stringify(response), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};

// 错误处理工具
const handleError = (error, context = '') => {
  console.error(`API Error in ${context}:`, error);

  // 根据错误类型返回适当的错误响应
  if (error.code === 'PGRST116') {
    return createResponse(false, null, { code: 'NOT_FOUND' }, '资源不存在', 404);
  }

  if (error.code === 'PGRST301') {
    return createResponse(false, null, { code: 'UNAUTHORIZED' }, '未授权访问', 401);
  }

  if (error.code === 'PGRST302') {
    return createResponse(false, null, { code: 'FORBIDDEN' }, '权限不足', 403);
  }

  // 默认错误响应
  return createResponse(false, null, {
    code: 'INTERNAL_ERROR',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  }, '服务器内部错误', 500);
};

// 验证JWT Token
const verifyToken = async (request) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};

// 分页处理工具
const getPagination = (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const from = offset;
  const to = offset + limit - 1;

  return { from, to, limit, offset };
};

// 构建查询参数
const buildQuery = (url, defaultSort = 'created_at', defaultOrder = 'desc') => {
  const { searchParams } = new URL(url);

  const page = parseInt(searchParams.get('page')) || 1;
  const limit = Math.min(parseInt(searchParams.get('limit')) || 10, 50); // 最大50条
  const sort = searchParams.get('sort') || defaultSort;
  const order = searchParams.get('order') || defaultOrder;

  return { page, limit, sort, order, searchParams };
};

// 文件上传处理
const uploadFile = async (file, bucket, path, options = {}) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
        ...options
      });

    if (error) throw error;

    // 获取公开URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return {
      url: publicUrl,
      path: data.path,
      size: file.size,
      type: file.type
    };
  } catch (error) {
    throw new Error(`文件上传失败: ${error.message}`);
  }
};

// 检查用户权限
const checkUserPermission = async (userId, requiredTier = 'public') => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('subscription_tier, subscription_end_date, is_admin')
      .eq('id', userId)
      .single();

    if (error || !profile) {
      return false;
    }

    // 检查管理员权限
    if (profile.is_admin) {
      return true;
    }

    // 检查订阅状态
    if (profile.subscription_end_date && new Date(profile.subscription_end_date) < new Date()) {
      return false;
    }

    // 检查订阅等级
    const tierLevels = { 'public': 0, 'basic': 1, 'premium': 2 };
    const userLevel = tierLevels[profile.subscription_tier] || 0;
    const requiredLevel = tierLevels[requiredTier] || 0;

    return userLevel >= requiredLevel;
  } catch (error) {
    console.error('Permission check error:', error);
    return false;
  }
};

// 用户统计信息
const getUserStats = async (userId) => {
  try {
    const [articlesResult, likesResult, commentsResult, aiQueriesResult] = await Promise.all([
      // 文章统计
      supabase
        .from('articles')
        .select('view_count, like_count, comment_count')
        .eq('author_id', userId)
        .eq('status', 'published'),

      // 点赞统计
      supabase
        .from('likes')
        .select('id')
        .eq('user_id', userId),

      // 评论统计
      supabase
        .from('comments')
        .select('id')
        .eq('user_id', userId)
        .eq('status', 'published'),

      // AI查询统计
      supabase
        .from('ai_queries')
        .select('tokens_used, cost')
        .eq('user_id', userId)
        .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1))
    ]);

    // 计算统计数据
    const articles = articlesResult.data || [];
    const totalViews = articles.reduce((sum, article) => sum + (article.view_count || 0), 0);
    const totalLikes = articles.reduce((sum, article) => sum + (article.like_count || 0), 0);
    const totalComments = articles.reduce((sum, article) => sum + (article.comment_count || 0), 0);

    const likesGiven = likesResult.data?.length || 0;
    const commentsMade = commentsResult.data?.length || 0;

    const aiQueries = aiQueriesResult.data || [];
    const tokensUsed = aiQueries.reduce((sum, query) => sum + (query.tokens_used || 0), 0);
    const totalCost = aiQueries.reduce((sum, query) => sum + (query.cost || 0), 0);

    return {
      articles_count: articles.length,
      views_count: totalViews,
      likes_count: totalLikes,
      comments_count: totalComments,
      likes_given: likesGiven,
      comments_made: commentsMade,
      ai_queries_count: aiQueries.length,
      tokens_used: tokensUsed,
      ai_cost: totalCost
    };
  } catch (error) {
    console.error('Stats calculation error:', error);
    return null;
  }
};

// 搜索功能
const searchContent = async (query, filters = {}) => {
  try {
    let searchQuery = supabase
      .from('articles')
      .select(`
        id, title, slug, excerpt, featured_image, published_at,
        author:profiles(username, full_name, avatar_url),
        category:categories(name, slug, color),
        view_count, like_count, comment_count
      `)
      .eq('status', 'published');

    // 文本搜索
    if (query) {
      searchQuery = searchQuery.or(`
        title.ilike.%${query}%,
        excerpt.ilike.%${query}%,
        content.ilike.%${query}%
      `);
    }

    // 分类筛选
    if (filters.category) {
      searchQuery = searchQuery.eq('category_id', filters.category);
    }

    // 访问等级筛选
    if (filters.access_level) {
      searchQuery = searchQuery.eq('access_level', filters.access_level);
    }

    // 排序
    const sortColumn = filters.sort || 'published_at';
    const sortOrder = filters.order || 'desc';
    searchQuery = searchQuery.order(sortColumn, { ascending: sortOrder === 'asc' });

    // 分页
    const { from, to } = getPagination(filters.page, filters.limit);
    searchQuery = searchQuery.range(from, to);

    const { data, error, count } = await searchQuery;

    if (error) throw error;

    return {
      articles: data || [],
      total: count || 0,
      page: filters.page || 1,
      limit: filters.limit || 10
    };
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

// 通知创建
const createNotification = async (userId, type, title, message, data = {}) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type,
        title,
        message,
        data
      });

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Notification creation error:', error);
    return false;
  }
};

// 订阅状态检查
const checkSubscriptionStatus = async (userId) => {
  try {
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select(`
        *,
        plan:subscription_plans(name, features, max_ai_queries_per_month)
      `)
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (error || !subscription) {
      // 返回免费计划信息
      const { data: freePlan } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('slug', 'free')
        .single();

      return {
        status: 'inactive',
        plan: freePlan,
        current_period_end: null
      };
    }

    return {
      status: subscription.status,
      plan: subscription.plan,
      current_period_end: subscription.current_period_end,
      cancel_at_period_end: subscription.cancel_at_period_end
    };
  } catch (error) {
    console.error('Subscription check error:', error);
    return null;
  }
};

// 导出所有工具函数
export {
  supabase,
  createResponse,
  handleError,
  verifyToken,
  getPagination,
  buildQuery,
  uploadFile,
  checkUserPermission,
  getUserStats,
  searchContent,
  createNotification,
  checkSubscriptionStatus
};