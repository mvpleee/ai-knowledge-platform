// 文章管理API端点
// /api/articles/index.js

import {
  supabase,
  createResponse,
  handleError,
  verifyToken,
  getPagination,
  buildQuery,
  checkUserPermission,
  createNotification
} from '../utils/supabase.js';

export async function GET(request) {
  try {
    const { page, limit, sort, order, searchParams } = buildQuery(request.url, 'published_at', 'desc');
    const { from, to } = getPagination(page, limit);

    // 构建查询
    let query = supabase
      .from('articles')
      .select(`
        id, title, slug, excerpt, featured_image, access_level,
        view_count, like_count, comment_count, reading_time,
        published_at,
        author:profiles(id, username, full_name, avatar_url),
        category:categories(id, name, slug, color),
        tags:tags(id, name, slug, color)
      `, { count: 'exact' })
      .eq('status', 'published');

    // 筛选条件
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const author = searchParams.get('author');
    const search = searchParams.get('search');
    const accessLevel = searchParams.get('access_level');

    if (category) {
      query = query.eq('category_id', category);
    }

    if (author) {
      query = query.eq('author_id', author);
    }

    if (accessLevel) {
      query = query.eq('access_level', accessLevel);
    }

    if (tag) {
      query = query.contains('tags.name', [tag]);
    }

    if (search) {
      query = query.or(`
        title.ilike.%${search}%,
        excerpt.ilike.%${search}%,
        content.ilike.%${search}%
      `);
    }

    // 排序和分页
    query = query
      .order(sort, { ascending: order === 'asc' })
      .range(from, to);

    const { data: articles, error, count } = await query;

    if (error) throw error;

    return createResponse(true, {
      articles: articles || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    });

  } catch (error) {
    return handleError(error, 'GET /api/articles');
  }
}

export async function POST(request) {
  try {
    // 验证用户身份
    const user = await verifyToken(request);
    if (!user) {
      return createResponse(false, null, { code: 'UNAUTHORIZED' }, '请先登录', 401);
    }

    const body = await request.json();
    const {
      title,
      content,
      excerpt,
      category_id,
      tags,
      access_level = 'public',
      seo_title,
      seo_description,
      seo_keywords,
      featured_image
    } = body;

    // 验证必填字段
    if (!title || !content) {
      return createResponse(false, null, { code: 'INVALID_REQUEST' }, '标题和内容不能为空', 400);
    }

    // 验证访问权限
    const hasPermission = await checkUserPermission(user.id, access_level);
    if (!hasPermission) {
      return createResponse(false, null, { code: 'FORBIDDEN' }, '权限不足，无法创建此等级的内容', 403);
    }

    // 生成文章slug
    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // 确保slug唯一
    let slugExists = true;
    let counter = 1;
    const originalSlug = slug;

    while (slugExists) {
      const { data: existing } = await supabase
        .from('articles')
        .select('id')
        .eq('slug', slug)
        .single();

      if (!existing) {
        slugExists = false;
      } else {
        slug = `${originalSlug}-${counter}`;
        counter++;
      }
    }

    // 创建文章
    const { data: article, error } = await supabase
      .from('articles')
      .insert({
        title,
        slug,
        content,
        excerpt,
        author_id: user.id,
        category_id: category_id || null,
        access_level,
        seo_title,
        seo_description,
        seo_keywords,
        featured_image,
        reading_time: Math.ceil(content.length / 1000), // 简单估算阅读时间
        status: 'draft'
      })
      .select()
      .single();

    if (error) throw error;

    // 处理标签关联
    if (tags && tags.length > 0) {
      const tagRelations = tags.map(tagId => ({
        article_id: article.id,
        tag_id: tagId
      }));

      await supabase
        .from('article_tags')
        .insert(tagRelations);
    }

    // 创建通知给关注者（如果发布状态）
    if (article.status === 'published') {
      await createNotification(
        user.id,
        'content',
        '新文章发布',
        `${user.username || user.full_name} 发布了新文章《${title}》`,
        { article_id: article.id, slug: article.slug }
      );
    }

    return createResponse(true, { article }, null, '文章创建成功');

  } catch (error) {
    return handleError(error, 'POST /api/articles');
  }
}