-- AI知识平台数据库结构
-- 创建日期: 2024-10-15
-- 数据库: PostgreSQL 15+

-- 启用必要的扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 用户表
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE,
    full_name VARCHAR(255),
    avatar_url TEXT,
    bio TEXT,
    website VARCHAR(500),
    location VARCHAR(255),
    subscription_tier VARCHAR(50) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'premium')),
    subscription_status VARCHAR(50) DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'expired')),
    stripe_customer_id VARCHAR(255) UNIQUE,
    email_verified BOOLEAN DEFAULT false,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP WITH TIME ZONE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 文章分类表
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(100),
    color VARCHAR(7), -- 十六进制颜色值
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 标签表
CREATE TABLE IF NOT EXISTS public.tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7),
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 文章表
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    cover_image_url TEXT,
    reading_time INTEGER, -- 预估阅读时间（分钟）
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    is_premium BOOLEAN DEFAULT false, -- 付费内容
    published_at TIMESTAMP WITH TIME ZONE,
    author_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 文章标签关联表
CREATE TABLE IF NOT EXISTS public.article_tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(article_id, tag_id)
);

-- 评论表
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content TEXT NOT NULL,
    author_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE, -- 回复评论
    is_approved BOOLEAN DEFAULT false,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 点赞表
CREATE TABLE IF NOT EXISTS public.likes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
    comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, article_id),
    UNIQUE(user_id, comment_id)
);

-- 收藏表
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, article_id)
);

-- 订阅计划表
CREATE TABLE IF NOT EXISTS public.subscription_plans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    billing_cycle VARCHAR(20) DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
    stripe_price_id VARCHAR(255) UNIQUE,
    features JSONB, -- 功能特性列表
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 用户订阅表
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES public.subscription_plans(id) ON DELETE RESTRICT,
    stripe_subscription_id VARCHAR(255) UNIQUE,
    stripe_customer_id VARCHAR(255),
    status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'unpaid', 'incomplete')),
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT false,
    trial_start TIMESTAMP WITH TIME ZONE,
    trial_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 支付记录表
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE,
    stripe_payment_intent_id VARCHAR(255) UNIQUE,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50) NOT NULL CHECK (status IN ('succeeded', 'pending', 'failed', 'canceled', 'refunded')),
    payment_method VARCHAR(100),
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 学习记录表
CREATE TABLE IF NOT EXISTS public.learning_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
    reading_progress INTEGER DEFAULT 0 CHECK (reading_progress >= 0 AND reading_progress <= 100),
    reading_time INTEGER DEFAULT 0, -- 实际阅读时间（秒）
    is_completed BOOLEAN DEFAULT false,
    last_read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, article_id)
);

-- 系统通知表
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    type VARCHAR(50) DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
    is_read BOOLEAN DEFAULT false,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 系统设置表
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key VARCHAR(100) NOT NULL UNIQUE,
    value TEXT,
    description TEXT,
    type VARCHAR(20) DEFAULT 'string' CHECK (type IN ('string', 'number', 'boolean', 'json')),
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_subscription_tier ON public.users(subscription_tier);
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON public.articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_category_id ON public.articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_is_published ON public.articles(is_published);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON public.articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_is_premium ON public.articles(is_premium);
CREATE INDEX IF NOT EXISTS idx_comments_article_id ON public.comments(article_id);
CREATE INDEX IF NOT EXISTS idx_comments_author_id ON public.comments(author_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON public.comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON public.bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_progress_user_id ON public.learning_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);

-- 创建全文搜索索引
CREATE INDEX IF NOT EXISTS idx_articles_search ON public.articles USING gin(to_tsvector('english', title || ' ' || COALESCE(content, '') || ' ' || COALESCE(excerpt, '')));
CREATE INDEX IF NOT EXISTS idx_categories_search ON public.categories USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));
CREATE INDEX IF NOT EXISTS idx_tags_search ON public.tags USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为所有需要的表添加更新时间触发器
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON public.tags FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscription_plans_updated_at BEFORE UPDATE ON public.subscription_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_learning_progress_updated_at BEFORE UPDATE ON public.learning_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON public.notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON public.settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 创建文章统计视图
CREATE OR REPLACE VIEW public.article_stats AS
SELECT
    a.id,
    a.title,
    a.view_count,
    a.like_count,
    a.comment_count,
    COUNT(DISTINCT l.id) as actual_likes,
    COUNT(DISTINCT c.id) as actual_comments,
    COUNT(DISTINCT b.id) as bookmarks_count,
    COUNT(DISTINCT lp.id) as readers_count
FROM public.articles a
LEFT JOIN public.likes l ON a.id = l.article_id
LEFT JOIN public.comments c ON a.id = c.article_id AND c.is_approved = true
LEFT JOIN public.bookmarks b ON a.id = b.article_id
LEFT JOIN public.learning_progress lp ON a.id = lp.article_id AND lp.is_completed = true
GROUP BY a.id, a.title, a.view_count, a.like_count, a.comment_count;

-- 创建用户统计视图
CREATE OR REPLACE VIEW public.user_stats AS
SELECT
    u.id,
    u.email,
    u.subscription_tier,
    COUNT(DISTINCT a.id) as articles_count,
    COUNT(DISTINCT l.id) as likes_given,
    COUNT(DISTINCT c.id) as comments_count,
    COUNT(DISTINCT b.id) as bookmarks_count,
    COALESCE(lp.total_reading_time, 0) as total_reading_time
FROM public.users u
LEFT JOIN public.articles a ON u.id = a.author_id
LEFT JOIN public.likes l ON u.id = l.user_id
LEFT JOIN public.comments c ON u.id = c.author_id
LEFT JOIN public.bookmarks b ON u.id = b.user_id
LEFT JOIN (
    SELECT user_id, SUM(reading_time) as total_reading_time
    FROM public.learning_progress
    GROUP BY user_id
) lp ON u.id = lp.user_id
GROUP BY u.id, u.email, u.subscription_tier;

-- 初始化基础数据
INSERT INTO public.subscription_plans (name, slug, description, price, features, sort_order) VALUES
('免费版', 'free', '基础功能，适合个人学习者', 0.00, '{"articles": "10篇/月", "bookmarks": "50个", "basic_search": true}', 1),
('基础版', 'basic', '进阶功能，适合深度学习者', 9.99, '{"articles": "无限", "bookmarks": "无限", "premium_content": true, "advanced_search": true, "export_pdf": true}', 2),
('高级版', 'premium', '完整功能，适合专业用户', 19.99, '{"articles": "无限", "bookmarks": "无限", "premium_content": true, "advanced_search": true, "export_pdf": true, "ai_assistant": true, "priority_support": true}', 3)
ON CONFLICT (slug) DO NOTHING;

-- 初始化分类数据
INSERT INTO public.categories (name, slug, description, icon, color, sort_order) VALUES
('机器学习', 'machine-learning', '机器学习算法、模型训练、深度学习等技术', '🤖', '#7C3AED', 1),
('深度学习', 'deep-learning', '神经网络、CNN、RNN、Transformer等深度学习技术', '🧠', '#8B5CF6', 2),
('自然语言处理', 'nlp', '文本分析、语言模型、聊天机器人等NLP技术', '💬', '#A78BFA', 3),
('计算机视觉', 'computer-vision', '图像识别、目标检测、图像生成等技术', '👁️', '#C4B5FD', 4),
('数据科学', 'data-science', '数据分析、数据可视化、统计学等', '📊', '#DDD6FE', 5),
('AI工具', 'ai-tools', 'AI工具使用、评测、最佳实践等', '🛠️', '#EDE9FE', 6),
('行业资讯', 'industry-news', 'AI行业动态、技术趋势、产品发布等', '📰', '#F3F4F6', 7)
ON CONFLICT (slug) DO NOTHING;

-- 初始化标签数据
INSERT INTO public.tags (name, slug, description, color) VALUES
('Python', 'python', 'Python编程语言及相关库', '#3776AB'),
('TensorFlow', 'tensorflow', 'TensorFlow深度学习框架', '#FF6F00'),
('PyTorch', 'pytorch', 'PyTorch深度学习框架', '#EE4C2C'),
('GPT', 'gpt', 'GPT系列模型和应用', '#10A37F'),
('机器学习', 'machine-learning', '机器学习算法和理论', '#7C3AED'),
('深度学习', 'deep-learning', '深度学习技术和应用', '#8B5CF6'),
('自然语言处理', 'nlp', 'NLP技术和应用', '#A78BFA'),
('计算机视觉', 'computer-vision', 'CV技术和应用', '#C4B5FD'),
('数据分析', 'data-analysis', '数据分析技术和工具', '#DDD6FE'),
('算法', 'algorithms', '各种算法介绍和实现', '#EDE9FE')
ON CONFLICT (slug) DO NOTHING;

-- 初始化系统设置
INSERT INTO public.settings (key, value, description, type, is_public) VALUES
('site_name', 'AI知识平台', '网站名称', 'string', true),
('site_description', '专注于人工智能技术学习和交流的平台', '网站描述', 'string', true),
('max_free_articles', '10', '免费用户每月最大文章阅读数', 'number', false),
('ai_features_enabled', 'true', '是否启用AI功能', 'boolean', false),
('maintenance_mode', 'false', '维护模式', 'boolean', false),
('registration_enabled', 'true', '是否允许新用户注册', 'boolean', false)
ON CONFLICT (key) DO NOTHING;

-- 创建用于搜索的函数
CREATE OR REPLACE FUNCTION public.search_articles(query_text TEXT, limit_num INTEGER DEFAULT 20, offset_num INTEGER DEFAULT 0)
RETURNS TABLE(
    id UUID,
    title VARCHAR(255),
    excerpt TEXT,
    cover_image_url TEXT,
    reading_time INTEGER,
    view_count INTEGER,
    like_count INTEGER,
    is_featured BOOLEAN,
    is_premium BOOLEAN,
    published_at TIMESTAMP WITH TIME ZONE,
    author_name VARCHAR(255),
    category_name VARCHAR(100),
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        a.id,
        a.title,
        a.excerpt,
        a.cover_image_url,
        a.reading_time,
        a.view_count,
        a.like_count,
        a.is_featured,
        a.is_premium,
        a.published_at,
        u.full_name as author_name,
        c.name as category_name,
        ts_rank(to_tsvector('english', a.title || ' ' || COALESCE(a.content, '') || ' ' || COALESCE(a.excerpt, '')), plainto_tsquery('english', query_text)) as rank
    FROM public.articles a
    LEFT JOIN public.users u ON a.author_id = u.id
    LEFT JOIN public.categories c ON a.category_id = c.id
    WHERE a.is_published = true
    AND to_tsvector('english', a.title || ' ' || COALESCE(a.content, '') || ' ' || COALESCE(a.excerpt, '')) @@ plainto_tsquery('english', query_text)
    ORDER BY rank DESC, a.published_at DESC
    LIMIT limit_num
    OFFSET offset_num;
END;
$$ LANGUAGE plpgsql;

-- 创建获取推荐文章的函数
CREATE OR REPLACE FUNCTION public.get_recommended_articles(user_id_param UUID, limit_num INTEGER DEFAULT 10)
RETURNS TABLE(
    id UUID,
    title VARCHAR(255),
    excerpt TEXT,
    cover_image_url TEXT,
    reading_time INTEGER,
    view_count INTEGER,
    like_count INTEGER,
    is_featured BOOLEAN,
    is_premium BOOLEAN,
    published_at TIMESTAMP WITH TIME ZONE,
    author_name VARCHAR(255),
    category_name VARCHAR(100)
) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT
        a.id,
        a.title,
        a.excerpt,
        a.cover_image_url,
        a.reading_time,
        a.view_count,
        a.like_count,
        a.is_featured,
        a.is_premium,
        a.published_at,
        u.full_name as author_name,
        c.name as category_name
    FROM public.articles a
    LEFT JOIN public.users u ON a.author_id = u.id
    LEFT JOIN public.categories c ON a.category_id = c.id
    LEFT JOIN public.learning_progress lp ON a.id = lp.article_id AND lp.user_id = user_id_param
    WHERE a.is_published = true
    AND (lp.article_id IS NULL OR lp.is_completed = false) -- 推荐未读或未完成的文章
    AND (a.is_premium = false OR EXISTS (
        SELECT 1 FROM public.subscriptions s
        WHERE s.user_id = user_id_param
        AND s.status = 'active'
        AND s.current_period_end > NOW()
    )) -- 检查订阅状态
    ORDER BY a.is_featured DESC, a.published_at DESC
    LIMIT limit_num;
END;
$$ LANGUAGE plpgsql;

COMMIT;