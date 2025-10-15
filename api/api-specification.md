# AI知识平台 API接口规范文档

## 概述

AI知识平台RESTful API接口规范，支持用户认证、内容管理、订阅支付、AI功能等核心业务功能。

## 基础信息

- **Base URL**: `https://your-domain.vercel.app/api`
- **认证方式**: JWT Token (Supabase Auth)
- **数据格式**: JSON
- **字符编码**: UTF-8
- **API版本**: v1

## 通用响应格式

### 成功响应
```json
{
  "success": true,
  "data": {},
  "message": "操作成功",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 错误响应
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述",
    "details": {}
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 认证接口

### 用户注册
- **URL**: `POST /auth/register`
- **描述**: 用户邮箱注册
- **请求体**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "username",
  "full_name": "用户姓名"
}
```
- **响应**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "username",
      "full_name": "用户姓名"
    },
    "session": {
      "access_token": "jwt_token",
      "refresh_token": "refresh_token",
      "expires_in": 3600
    }
  }
}
```

### 用户登录
- **URL**: `POST /auth/login`
- **描述**: 用户邮箱登录
- **请求体**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### 社交登录
- **URL**: `POST /auth/oauth/{provider}`
- **描述**: 社交账号登录 (Google, GitHub)
- **路径参数**: `provider` (google, github)

### 刷新Token
- **URL**: `POST /auth/refresh`
- **描述**: 刷新访问令牌
- **请求体**:
```json
{
  "refresh_token": "refresh_token"
}
```

### 用户登出
- **URL**: `POST /auth/logout`
- **描述**: 用户登出
- **认证**: 需要Bearer Token

### 密码重置
- **URL**: `POST /auth/reset-password`
- **描述**: 发送密码重置邮件
- **请求体**:
```json
{
  "email": "user@example.com"
}
```

## 用户管理接口

### 获取用户资料
- **URL**: `GET /users/profile`
- **描述**: 获取当前用户详细资料
- **认证**: 需要Bearer Token

### 更新用户资料
- **URL**: `PUT /users/profile`
- **描述**: 更新用户资料
- **认证**: 需要Bearer Token
- **请求体**:
```json
{
  "username": "new_username",
  "full_name": "新姓名",
  "bio": "个人简介",
  "website": "https://example.com",
  "location": "北京",
  "company": "公司名称",
  "job_title": "职位",
  "social_links": {
    "github": "username",
    "twitter": "username"
  }
}
```

### 上传头像
- **URL**: `POST /users/avatar`
- **描述**: 上传用户头像
- **认证**: 需要Bearer Token
- **请求体**: `multipart/form-data`
- **字段**: `avatar` (文件)

### 获取用户统计
- **URL**: `GET /users/stats`
- **描述**: 获取用户统计数据
- **认证**: 需要Bearer Token
- **响应**:
```json
{
  "success": true,
  "data": {
    "articles_count": 10,
    "views_count": 1000,
    "likes_count": 50,
    "comments_count": 25,
    "followers_count": 100,
    "ai_queries_used": 50,
    "ai_queries_limit": 100
  }
}
```

## 文章管理接口

### 获取文章列表
- **URL**: `GET /articles`
- **描述**: 获取文章列表（分页）
- **查询参数**:
  - `page`: 页码 (默认: 1)
  - `limit`: 每页数量 (默认: 10, 最大: 50)
  - `category`: 分类ID
  - `tag`: 标签名称
  - `author`: 作者ID
  - `search`: 搜索关键词
  - `sort`: 排序方式 (latest, popular, views, likes)
  - `access_level`: 访问等级 (public, basic, premium)

### 获取文章详情
- **URL**: `GET /articles/{id}`
- **描述**: 获取文章详细内容
- **路径参数**: `id` - 文章ID

### 创建文章
- **URL**: `POST /articles`
- **描述**: 创建新文章
- **认证**: 需要Bearer Token
- **请求体**:
```json
{
  "title": "文章标题",
  "content": "文章内容",
  "excerpt": "文章摘要",
  "category_id": "uuid",
  "tags": ["标签1", "标签2"],
  "access_level": "public",
  "seo_title": "SEO标题",
  "seo_description": "SEO描述",
  "seo_keywords": ["关键词1", "关键词2"]
}
```

### 更新文章
- **URL**: `PUT /articles/{id}`
- **描述**: 更新文章信息
- **认证**: 需要Bearer Token (仅作者)
- **路径参数**: `id` - 文章ID

### 发布文章
- **URL**: `POST /articles/{id}/publish`
- **描述**: 发布文章
- **认证**: 需要Bearer Token (仅作者)

### 删除文章
- **URL**: `DELETE /articles/{id}`
- **描述**: 删除文章
- **认证**: 需要Bearer Token (仅作者和管理员)

### 点赞文章
- **URL**: `POST /articles/{id}/like`
- **描述**: 点赞/取消点赞文章
- **认证**: 需要Bearer Token

### 收藏文章
- **URL**: `POST /articles/{id}/bookmark`
- **描述**: 收藏/取消收藏文章
- **认证**: 需要Bearer Token

## 分类和标签接口

### 获取分类列表
- **URL**: `GET /categories`
- **描述**: 获取所有分类
- **响应**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "AI技术",
      "slug": "ai-technology",
      "description": "人工智能技术相关内容",
      "icon": "brain",
      "color": "#6366f1",
      "articles_count": 25
    }
  ]
}
```

### 获取标签列表
- **URL**: `GET /tags`
- **描述**: 获取所有标签
- **查询参数**:
  - `popular`: 是否按使用频率排序
  - `limit`: 返回数量限制

### 创建分类
- **URL**: `POST /categories`
- **描述**: 创建新分类
- **认证**: 需要Bearer Token (仅管理员)

### 创建标签
- **URL**: `POST /tags`
- **描述**: 创建新标签
- **认证**: 需要Bearer Token

## 评论接口

### 获取文章评论
- **URL**: `GET /articles/{id}/comments`
- **描述**: 获取文章评论列表
- **路径参数**: `id` - 文章ID
- **查询参数**:
  - `page`: 页码
  - `limit`: 每页数量
  - `sort`: 排序方式 (latest, oldest, popular)

### 创建评论
- **URL**: `POST /articles/{id}/comments`
- **描述**: 创建文章评论
- **认证**: 需要Bearer Token
- **请求体**:
```json
{
  "content": "评论内容",
  "parent_id": "uuid" // 可选，回复评论时使用
}
```

### 删除评论
- **URL**: `DELETE /comments/{id}`
- **描述**: 删除评论
- **认证**: 需要Bearer Token (仅评论作者和管理员)

### 点赞评论
- **URL**: `POST /comments/{id}/like`
- **描述**: 点赞评论
- **认证**: 需要Bearer Token

## 订阅和支付接口

### 获取订阅计划
- **URL**: `GET /subscription/plans`
- **描述**: 获取所有订阅计划
- **响应**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "基础版",
      "slug": "basic",
      "price": 9.99,
      "currency": "USD",
      "interval": "month",
      "features": ["功能1", "功能2"],
      "stripe_price_id": "price_xxx"
    }
  ]
}
```

### 获取用户订阅状态
- **URL**: `GET /subscription/status`
- **描述**: 获取当前用户订阅状态
- **认证**: 需要Bearer Token

### 创建订阅
- **URL**: `POST /subscription/create`
- **描述**: 创建订阅（生成支付链接）
- **认证**: 需要Bearer Token
- **请求体**:
```json
{
  "plan_id": "uuid",
  "success_url": "https://your-domain.com/success",
  "cancel_url": "https://your-domain.com/cancel"
}
```

### 取消订阅
- **URL**: `POST /subscription/cancel`
- **描述**: 取消订阅
- **认证**: 需要Bearer Token

### 恢复订阅
- **URL**: `POST /subscription/resume`
- **描述**: 恢复已取消的订阅
- **认证**: 需要Bearer Token

### 获取支付历史
- **URL**: `GET /subscription/payments`
- **描述**: 获取用户支付历史
- **认证**: 需要Bearer Token

## AI功能接口

### AI查询
- **URL**: `POST /ai/query`
- **描述**: AI智能查询
- **认证**: 需要Bearer Token
- **请求体**:
```json
{
  "query": "查询内容",
  "model": "gpt-3.5-turbo", // 可选
  "context": "上下文信息", // 可选
  "type": "general" // general, writing, analysis, translation
}
```

### AI内容生成
- **URL**: `POST /ai/generate`
- **描述**: AI生成内容
- **认证**: 需要Bearer Token (需要相应订阅等级)
- **请求体**:
```json
{
  "prompt": "生成提示",
  "type": "article", // article, summary, rewrite, translate
  "model": "gpt-3.5-turbo",
  "max_tokens": 1000
}
```

### 获取AI使用统计
- **URL**: `GET /ai/usage`
- **描述**: 获取AI使用统计
- **认证**: 需要Bearer Token
- **响应**:
```json
{
  "success": true,
  "data": {
    "queries_this_month": 50,
    "queries_limit": 100,
    "tokens_used": 25000,
    "cost_this_month": 5.50,
    "remaining_quota": 50
  }
}
```

### AI查询历史
- **URL**: `GET /ai/history`
- **描述**: 获取AI查询历史
- **认证**: 需要Bearer Token
- **查询参数**:
  - `page`: 页码
  - `limit`: 每页数量
  - `type`: 查询类型

## 搜索接口

### 全局搜索
- **URL**: `GET /search`
- **描述**: 全局搜索内容
- **查询参数**:
  - `q`: 搜索关键词
  - `type`: 搜索类型 (all, articles, tags, authors)
  - `category`: 分类筛选
  - `access_level`: 访问等级筛选
  - `page`: 页码
  - `limit`: 每页数量

### 搜索建议
- **URL**: `GET /search/suggestions`
- **描述**: 获取搜索建议
- **查询参数**: `q` - 输入的关键词

## 通知接口

### 获取通知列表
- **URL**: `GET /notifications`
- **描述**: 获取用户通知
- **认证**: 需要Bearer Token
- **查询参数**:
  - `unread_only`: 仅未读通知
  - `type`: 通知类型
  - `page`: 页码
  - `limit`: 每页数量

### 标记通知已读
- **URL**: `PUT /notifications/{id}/read`
- **描述**: 标记通知为已读
- **认证**: 需要Bearer Token

### 批量标记已读
- **URL**: `PUT /notifications/read-all`
- **描述**: 标记所有通知为已读
- **认证**: 需要Bearer Token

## 文件上传接口

### 上传文件
- **URL**: `POST /upload`
- **描述**: 上传文件
- **认证**: 需要Bearer Token
- **请求体**: `multipart/form-data`
- **字段**: `file` (文件), `type` (avatar, article-image)
- **响应**:
```json
{
  "success": true,
  "data": {
    "url": "https://cdn.example.com/file.jpg",
    "name": "file.jpg",
    "size": 1024,
    "type": "image/jpeg"
  }
}
```

## 错误代码说明

| 错误代码 | HTTP状态码 | 描述 |
|---------|-----------|------|
| INVALID_REQUEST | 400 | 请求参数无效 |
| UNAUTHORIZED | 401 | 未认证或Token无效 |
| FORBIDDEN | 403 | 权限不足 |
| NOT_FOUND | 404 | 资源不存在 |
| CONFLICT | 409 | 资源冲突 |
| RATE_LIMIT_EXCEEDED | 429 | 请求频率超限 |
| INTERNAL_ERROR | 500 | 服务器内部错误 |
| SUBSCRIPTION_REQUIRED | 402 | 需要订阅权限 |
| QUOTA_EXCEEDED | 403 | 使用额度超限 |
| INVALID_CREDENTIALS | 401 | 登录凭据无效 |
| EMAIL_ALREADY_EXISTS | 409 | 邮箱已存在 |
| USERNAME_ALREADY_EXISTS | 409 | 用户名已存在 |

## API使用限制

- **请求频率**: 每分钟100次请求
- **文件上传**: 最大10MB
- **AI查询**: 根据订阅等级限制
- **认证Token**: 有效期7天
- **分页限制**: 每页最大50条记录

## Webhook接口

### Stripe Webhook
- **URL**: `POST /webhooks/stripe`
- **描述**: 处理Stripe支付回调
- **认证**: Stripe签名验证
- **事件类型**:
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`

## API客户端示例

### JavaScript (Axios)
```javascript
// API客户端配置
const api = axios.create({
  baseURL: 'https://your-domain.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加认证Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器 - 处理Token过期
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      // Token过期，尝试刷新
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await api.post('/auth/refresh', {
            refresh_token: refreshToken,
          });
          localStorage.setItem('access_token', response.data.session.access_token);
          // 重试原请求
          return api.request(error.config);
        } catch (refreshError) {
          // 刷新失败，跳转登录
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);
```

## 版本更新记录

- **v1.0.0** (2024-01-01): 初始版本发布
- **v1.1.0** (2024-01-15): 添加AI功能接口
- **v1.2.0** (2024-02-01): 添加订阅支付功能
- **v1.3.0** (2024-02-15): 优化搜索功能和性能