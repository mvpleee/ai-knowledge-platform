/* AI知识平台 - 文章详情页脚本 */

// 文章数据
const ArticleData = {
    articles: [
        {
            id: 1,
            title: 'GPT-4技术解析：理解大型语言模型的突破',
            category: 'AI模型',
            categoryId: 'ai-models',
            author: 'AI专家',
            authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
            authorTitle: '高级AI研究员',
            authorBio: '专注于大型语言模型和自然语言处理研究，在深度学习和NLP领域有丰富的实践经验。',
            date: '2024-01-15',
            readTime: '15分钟',
            isPremium: true,
            isFeatured: true,
            image: 'https://images.unsplash.com/photo-1677756119517-756a179e41d7?w=800&h=400&fit=crop',
            views: 2456,
            likes: 186,
            tags: ['GPT-4', 'LLM', 'Transformer', 'NLP'],
            summary: 'GPT-4代表了大型语言模型的重大突破，本文将深入探讨其技术架构、训练方法和能力边界。',
            content: `
                <h2>引言</h2>
                <p>GPT-4的发布标志着人工智能发展的重要里程碑。作为OpenAI最新的大型语言模型，GPT-4在多个方面都展现出了令人印象深刻的能力提升。本文将从技术角度深入分析GPT-4的核心特性和创新点。</p>

                <h2>技术架构概述</h2>
                <p>GPT-4基于Transformer架构构建，但在多个关键方面进行了重要改进。首先，模型规模的显著增加为其带来了更强的表达能力。其次，训练数据的质量和多样性得到了大幅提升。</p>

                <h3>核心组件</h3>
                <ul>
                    <li><strong>多头注意力机制</strong>：改进的注意力计算方法</li>
                    <li><strong>位置编码</strong>：更精确的位置感知能力</li>
                    <li><strong>前馈网络</strong>：更深层的特征提取</li>
                    <li><strong>残差连接</strong>：优化的梯度传播</li>
                </ul>

                <h2>训练方法创新</h2>
                <p>GPT-4的训练过程采用了多项技术创新：</p>
                <blockquote>
                    "通过结合监督学习、强化学习和人类反馈，我们成功提升了模型的理解能力和输出质量。" - OpenAI研究团队
                </blockquote>

                <h3>数据质量优化</h3>
                <p>训练数据的质量直接影响模型性能。GPT-4使用了经过精心筛选的数据集，包括：</p>
                <ol>
                    <li>学术文献和研究成果</li>
                    <li>高质量的网页内容</li>
                    <li>专业领域的知识库</li>
                    <li>多语言平行语料</li>
                </ol>

                <h2>能力边界分析</h2>
                <p>尽管GPT-4表现出色，但它仍然存在一些局限性：</p>
                <pre><code>// 示例：GPT-4的能力边界
const capabilities = {
    strengths: [
        '自然语言理解',
        '代码生成',
        '数学推理',
        '创意写作'
    ],
    limitations: [
        '实时信息获取',
        '长期记忆',
        '物理世界交互',
        '情感理解'
    ]
};</code></pre>

                <h2>实际应用场景</h2>
                <p>GPT-4在多个领域都有广泛的应用前景：</p>
                <ul>
                    <li><strong>教育领域</strong>：个性化学习助手</li>
                    <li><strong>医疗健康</strong>：医学文献分析</li>
                    <li><strong>金融服务</strong>：风险评估和决策支持</li>
                    <li><strong>创意产业</strong>：内容创作和设计辅助</li>
                </ul>

                <h2>未来展望</h2>
                <p>随着技术的不断发展，我们可以期待大型语言模型在以下方面继续改进：</p>
                <p>1. 更强的推理能力<br>2. 更好的多模态理解<br>3. 更高的计算效率<br>4. 更强的安全性和可控性</p>

                <h2>结论</h2>
                <p>GPT-4代表了AI技术发展的重要进步，但仍然有很长的路要走。通过持续的研究和改进，我们期待看到更强大、更可靠的人工智能系统。</p>
            `,
            relatedArticles: [2, 3, 5]
        },
        {
            id: 2,
            title: '机器学习入门：从零开始理解ML算法',
            category: '机器学习',
            categoryId: 'machine-learning',
            author: 'ML工程师',
            authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
            authorTitle: '机器学习专家',
            authorBio: '拥有丰富的机器学习项目经验，擅长将复杂的概念用简单的方式解释清楚。',
            date: '2024-01-14',
            readTime: '12分钟',
            isPremium: false,
            isNew: true,
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
            views: 1823,
            likes: 142,
            tags: ['机器学习', '算法', 'Python', '入门'],
            summary: '为初学者量身定制的机器学习指南，用通俗易懂的方式解释核心算法概念和应用方法。',
            content: `
                <h2>什么是机器学习？</h2>
                <p>机器学习是人工智能的一个分支，它使计算机能够从数据中学习，而无需明确编程。简单来说，就是让机器通过经验来改进性能。</p>

                <h2>机器学习的类型</h2>
                <h3>1. 监督学习</h3>
                <p>监督学习是最常见的机器学习类型，算法从标记的训练数据中学习。就像有老师指导学习一样。</p>

                <h3>2. 无监督学习</h3>
                <p>无监督学习处理未标记的数据，算法自己发现数据中的模式和结构。</p>

                <h3>3. 强化学习</h3>
                <p>强化学习通过与环境交互来学习，算法根据获得的奖励或惩罚来调整行为。</p>

                <h2>常用算法介绍</h2>
                <p>让我们看看一些基础的机器学习算法：</p>
                <pre><code># 线性回归示例
import numpy as np
from sklearn.linear_model import LinearRegression

# 创建示例数据
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])

# 训练模型
model = LinearRegression()
model.fit(X, y)

# 预测
prediction = model.predict([[6]])
print(f"预测结果: {prediction[0]}")</code></pre>

                <h2>实践建议</h2>
                <p>对于机器学习初学者，我建议：</p>
                <ul>
                    <li>从基础概念开始，不要急于求成</li>
                    <li>多动手实践，理论结合实际</li>
                    <li>参加在线课程和实战项目</li>
                    <li>加入机器学习社区，与他人交流</li>
                </ul>

                <h2>总结</h2>
                <p>机器学习是一个充满挑战和机遇的领域。通过系统学习和不断实践，你也能够掌握这项强大的技术。</p>
            `,
            relatedArticles: [1, 6, 7]
        }
        // 可以添加更多文章...
    ],

    relatedArticles: [
        {
            id: 3,
            title: '深度学习框架对比：TensorFlow vs PyTorch',
            excerpt: '全面对比两大主流深度学习框架的优缺点',
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=160&h=120&fit=crop',
            readTime: '18分钟',
            category: '深度学习'
        },
        {
            id: 4,
            title: '计算机视觉实战：图像识别项目开发指南',
            excerpt: '从数据准备到模型部署的完整指南',
            image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=160&h=120&fit=crop',
            readTime: '20分钟',
            category: '计算机视觉'
        },
        {
            id: 5,
            title: '自然语言处理：文本分析技术全面解析',
            excerpt: '深入探讨NLP核心技术',
            image: 'https://images.unsplash.com/photo-1628348068343-c6a8e5c754ab?w=160&h=120&fit=crop',
            readTime: '16分钟',
            category: 'NLP'
        }
    ]
};

// 文章详情页控制器
class ArticlePage {
    constructor() {
        this.data = ArticleData;
        this.articleId = this.getArticleId();
        this.article = null;
        this.isLiked = false;
        this.init();
    }

    init() {
        this.loadArticle();
        if (this.article) {
            this.render();
            this.bindEvents();
            this.initReadingProgress();
            this.initTableOfContents();
            this.trackReading();
        } else {
            this.renderNotFound();
        }
    }

    getArticleId() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('id')) || 1;
    }

    loadArticle() {
        this.article = this.data.articles.find(a => a.id === this.articleId);

        if (!this.article) {
            console.warn('文章不存在:', this.articleId);
            return;
        }

        // 加载相关文章
        this.article.relatedArticlesData = this.article.relatedArticles.map(id =>
            this.data.relatedArticles.find(a => a.id === id)
        ).filter(Boolean);

        // 检查用户点赞状态
        this.isLiked = Utils.storage.get(`article_liked_${this.articleId}`, false);
    }

    render() {
        this.renderHeader();
        this.renderContent();
        this.renderSidebar();
        this.updateDocumentMeta();
    }

    renderHeader() {
        document.title = `${this.article.title} - AI知识平台`;

        const breadcrumbHTML = `
            <div class="article-breadcrumb">
                <a href="index.html">首页</a>
                <span class="separator">›</span>
                <a href="articles.html">文章</a>
                <span class="separator">›</span>
                <a href="articles.html?category=${this.article.categoryId}">${this.article.category}</a>
                <span class="separator">›</span>
                <span>正文</span>
            </div>
        `;

        const metaHTML = `
            <div class="article-meta">
                <div class="article-author">
                    <img src="${this.article.authorAvatar}" alt="${this.article.author}" class="article-author-avatar">
                    <span>${this.article.author}</span>
                </div>
                <div class="article-stats">
                    <span>📅 ${Utils.formatDate(this.article.date, 'YYYY年MM月DD日')}</span>
                    <span>📖 ${this.article.readTime}</span>
                    <span>👁️ ${this.article.views}</span>
                    <span>❤️ ${this.article.likes}</span>
                </div>
                <div class="article-category-badge">${this.article.category}</div>
            </div>
        `;

        const headerContainer = document.querySelector('.article-header-container');
        if (headerContainer) {
            headerContainer.innerHTML = `
                ${breadcrumbHTML}
                <h1 class="article-title">${this.article.title}</h1>
                ${metaHTML}
            `;
        }
    }

    renderContent() {
        const mainContainer = document.querySelector('.article-main');
        if (!mainContainer) return;

        const contentHTML = `
            <div class="article-body">
                ${this.article.image ? `<img src="${this.article.image}" alt="${this.article.title}" class="article-cover">` : ''}

                <div class="article-summary">
                    <strong>摘要：</strong>${this.article.summary}
                </div>

                <div class="article-text">
                    ${this.article.content}
                </div>

                ${this.renderPremiumContent()}
            </div>

            <div class="article-actions">
                <div class="action-buttons">
                    <button class="action-btn like-btn ${this.isLiked ? 'liked' : ''}" data-action="like">
                        <span>${this.isLiked ? '❤️' : '🤍'}</span>
                        <span class="like-count">${this.article.likes}</span>
                    </button>
                    <button class="action-btn" data-action="share">
                        <span>📤</span>
                        <span>分享</span>
                    </button>
                    <button class="action-btn" data-action="bookmark">
                        <span>🔖</span>
                        <span>收藏</span>
                    </button>
                    <button class="action-btn" data-action="comment">
                        <span>💬</span>
                        <span>评论</span>
                    </button>
                </div>
            </div>

            ${this.renderAuthorInfo()}
            ${this.renderRelatedArticles()}
            ${this.renderTags()}
        `;

        mainContainer.innerHTML = contentHTML;
    }

    renderPremiumContent() {
        if (!this.article.isPremium) {
            return '';
        }

        const user = UserManager.currentUser;
        const hasAccess = user && user.isPremium;

        if (hasAccess) {
            return `
                <div class="premium-divider">
                    <div class="premium-icon">👑</div>
                    <h3>会员专属内容</h3>
                    <p>您正在查看会员专享的深度内容</p>
                </div>
                <div class="article-text">
                    <h2>会员专属深入分析</h2>
                    <p>这里是只有会员才能看到的深度内容和分析...</p>
                    <p>包含更多技术细节、实际案例和高级技巧。</p>
                </div>
            `;
        }

        return `
            <div class="premium-divider">
                <div class="premium-icon">🔒</div>
                <h3>会员专属内容</h3>
                <p>这篇文章包含会员专享的深度内容，包括更多技术细节、实际案例和高级技巧。</p>
                <div class="premium-actions">
                    <button class="btn btn-primary" onclick="window.location.href='membership.html'">
                        升级为会员
                    </button>
                    <button class="btn btn-outline" onclick="window.location.href='auth.html'">
                        立即登录
                    </button>
                </div>
            </div>
        `;
    }

    renderAuthorInfo() {
        return `
            <div class="author-info">
                <div class="author-header">
                    <img src="${this.article.authorAvatar}" alt="${this.article.author}" class="author-avatar">
                    <div class="author-details">
                        <div class="author-name">${this.article.author}</div>
                        <div class="author-title">${this.article.authorTitle}</div>
                    </div>
                </div>
                <div class="author-bio">${this.article.authorBio}</div>
                <div class="author-stats">
                    <div class="author-stat">
                        <div class="author-stat-number">42</div>
                        <div class="author-stat-label">文章</div>
                    </div>
                    <div class="author-stat">
                        <div class="author-stat-number">15.2k</div>
                        <div class="author-stat-label">粉丝</div>
                    </div>
                    <div class="author-stat">
                        <div class="author-stat-number">4.8</div>
                        <div class="author-stat-label">评分</div>
                    </div>
                </div>
            </div>
        `;
    }

    renderRelatedArticles() {
        if (!this.article.relatedArticlesData || this.article.relatedArticlesData.length === 0) {
            return '';
        }

        const relatedHTML = this.article.relatedArticlesData.map(article => `
            <div class="related-item" data-id="${article.id}">
                <img src="${article.image}" alt="${article.title}" class="related-item-image">
                <div class="related-item-content">
                    <div class="related-item-title">${article.title}</div>
                    <div class="related-item-meta">
                        <span>${article.category}</span>
                        <span>•</span>
                        <span>📖 ${article.readTime}</span>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <div class="related-articles">
                <h3 class="related-header">相关文章</h3>
                <div class="related-list">
                    ${relatedHTML}
                </div>
            </div>
        `;
    }

    renderTags() {
        if (!this.article.tags || this.article.tags.length === 0) {
            return '';
        }

        const tagsHTML = this.article.tags.map(tag => `
            <span class="tag" onclick="window.location.href='articles.html?search=${encodeURIComponent(tag)}'">${tag}</span>
        `).join('');

        return `
            <div class="article-tags">
                <h3 class="tags-header">标签</h3>
                <div class="tag-cloud">
                    ${tagsHTML}
                </div>
            </div>
        `;
    }

    renderSidebar() {
        const sidebar = document.querySelector('.article-sidebar');
        if (!sidebar) return;

        sidebar.innerHTML = `
            ${this.renderTableOfContents()}
        `;
    }

    renderTableOfContents() {
        const toc = this.generateTableOfContents();

        return `
            <div class="sidebar-toc">
                <div class="sidebar-toc-header">
                    <h3 class="sidebar-toc-title">目录</h3>
                </div>
                <div class="sidebar-toc-content">
                    <ul class="toc-list">
                        ${toc.map(item => `
                            <li class="toc-item">
                                <a href="#${item.id}" class="toc-link toc-level-${item.level}" data-level="${item.level}">
                                    ${item.text}
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    generateTableOfContents() {
        if (!this.article.content) return [];

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.article.content;

        const headings = tempDiv.querySelectorAll('h2, h3');
        const toc = [];

        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;

            toc.push({
                id,
                text: heading.textContent,
                level: heading.tagName.toLowerCase()
            });
        });

        return toc;
    }

    updateDocumentMeta() {
        // 更新页面meta标签
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.content = this.article.summary;
        }

        const keywords = document.querySelector('meta[name="keywords"]');
        if (keywords) {
            keywords.content = this.article.tags.join(', ');
        }

        // 更新浏览量
        this.incrementViews();
    }

    incrementViews() {
        const views = Utils.storage.get(`article_views_${this.articleId}`, 0);
        Utils.storage.set(`article_views_${this.articleId}`, views + 1);
    }

    bindEvents() {
        // 操作按钮事件
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.handleAction(action, btn);
            });
        });

        // 相关文章点击
        document.querySelectorAll('.related-item').forEach(item => {
            item.addEventListener('click', () => {
                const articleId = item.dataset.id;
                this.navigateToArticle(articleId);
            });
        });

        // 代码复制功能
        this.initCodeCopy();

        // 图片点击放大
        this.initImageZoom();
    }

    handleAction(action, button) {
        switch (action) {
            case 'like':
                this.toggleLike(button);
                break;
            case 'share':
                this.shareArticle();
                break;
            case 'bookmark':
                this.toggleBookmark(button);
                break;
            case 'comment':
                this.scrollToComments();
                break;
        }
    }

    toggleLike(button) {
        if (!UserManager.isAuthenticated()) {
            ToastManager.warning('请先登录');
            setTimeout(() => {
                window.location.href = `auth.html?redirect=${window.location.pathname}`;
            }, 1000);
            return;
        }

        this.isLiked = !this.isLiked;
        Utils.storage.set(`article_liked_${this.articleId}`, this.isLiked);

        const likeCount = button.querySelector('.like-count');
        const currentLikes = parseInt(likeCount.textContent);
        const newLikes = this.isLiked ? currentLikes + 1 : currentLikes - 1;

        likeCount.textContent = newLikes;
        button.classList.toggle('liked', this.isLiked);
        button.querySelector('span:first-child').textContent = this.isLiked ? '❤️' : '🤍';

        ToastManager.success(this.isLiked ? '已点赞' : '已取消点赞');
    }

    shareArticle() {
        const url = window.location.href;
        const title = this.article.title;

        if (navigator.share) {
            navigator.share({
                title,
                text: this.article.summary,
                url
            }).catch(() => {
                this.copyShareLink(url);
            });
        } else {
            this.copyShareLink(url);
        }
    }

    async copyShareLink(url) {
        const success = await Utils.copyToClipboard(url);
        if (success) {
            ToastManager.success('链接已复制到剪贴板');
        } else {
            ToastManager.error('复制失败，请手动复制链接');
        }
    }

    toggleBookmark(button) {
        if (!UserManager.isAuthenticated()) {
            ToastManager.warning('请先登录');
            return;
        }

        const bookmarks = Utils.storage.get('user_bookmarks', []);
        const isBookmarked = bookmarks.includes(this.articleId);

        if (isBookmarked) {
            const index = bookmarks.indexOf(this.articleId);
            bookmarks.splice(index, 1);
            ToastManager.success('已取消收藏');
        } else {
            bookmarks.push(this.articleId);
            ToastManager.success('已收藏文章');
        }

        Utils.storage.set('user_bookmarks', bookmarks);
        button.classList.toggle('bookmarked', !isBookmarked);
    }

    scrollToComments() {
        // 滚动到评论区（如果有的话）
        const commentsSection = document.querySelector('.comments-section');
        if (commentsSection) {
            Utils.scrollToElement(commentsSection, 80);
        } else {
            ToastManager.info('评论功能开发中...');
        }
    }

    initCodeCopy() {
        document.querySelectorAll('pre code').forEach(block => {
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block';

            const header = document.createElement('div');
            header.className = 'code-header';
            header.innerHTML = `
                <span>代码示例</span>
                <button class="copy-btn" onclick="copyCode(this)">📋 复制代码</button>
            `;

            block.parentNode.insertBefore(wrapper, block);
            wrapper.appendChild(header);
            wrapper.appendChild(block);
        });
    }

    initImageZoom() {
        document.querySelectorAll('.article-text img').forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                this.showImageModal(img.src, img.alt);
            });
        });
    }

    showImageModal(src, alt) {
        // 创建图片模态框
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;

        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: var(--radius-lg);
        `;

        modal.appendChild(img);
        document.body.appendChild(modal);

        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }

    initReadingProgress() {
        // 创建阅读进度条
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
        document.body.appendChild(progressBar);

        const progressBarInner = progressBar.querySelector('.reading-progress-bar');

        window.addEventListener('scroll', Utils.throttle(() => {
            const articleElement = document.querySelector('.article-text');
            if (!articleElement) return;

            const articleTop = articleElement.offsetTop;
            const articleHeight = articleElement.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;

            const progress = Math.max(0, Math.min(100,
                ((scrollTop - articleTop + windowHeight) / articleHeight) * 100
            ));

            progressBarInner.style.width = `${progress}%`;
        }, 50));
    }

    initTableOfContents() {
        const tocLinks = document.querySelectorAll('.toc-link');

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.id;
                const tocLink = document.querySelector(`.toc-link[href="#${id}"]`);

                if (entry.isIntersecting) {
                    // 移除所有active状态
                    tocLinks.forEach(link => link.classList.remove('active'));
                    // 添加当前active状态
                    if (tocLink) {
                        tocLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        // 观察所有标题
        document.querySelectorAll('.article-text h2, .article-text h3').forEach(heading => {
            observer.observe(heading);
        });

        // 点击目录链接平滑滚动
        tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    Utils.scrollToElement(targetElement, 80);
                }
            });
        });
    }

    trackReading() {
        let startTime = Date.now();
        let readingTime = 0;
        let isReading = false;

        const trackReadingTime = () => {
            if (isReading) {
                readingTime += Date.now() - startTime;
                startTime = Date.now();
            }
        };

        // 监听页面可见性
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (isReading) {
                    trackReadingTime();
                    isReading = false;
                }
            } else {
                isReading = true;
                startTime = Date.now();
            }
        });

        // 监听滚动活动
        let scrollTimer;
        window.addEventListener('scroll', () => {
            if (!isReading) {
                isReading = true;
                startTime = Date.now();
            }

            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                if (isReading) {
                    trackReadingTime();
                    isReading = false;
                }
            }, 5000); // 5秒无滚动认为停止阅读
        });

        // 页面卸载时保存阅读时间
        window.addEventListener('beforeunload', () => {
            if (isReading) {
                trackReadingTime();
            }

            if (readingTime > 0) {
                const readingData = Utils.storage.get('reading_history', []);
                readingData.push({
                    articleId: this.articleId,
                    readingTime,
                    date: new Date().toISOString()
                });
                Utils.storage.set('reading_history', readingData);
            }
        });
    }

    navigateToArticle(articleId) {
        window.location.href = `article.html?id=${articleId}`;
    }

    renderNotFound() {
        const container = document.querySelector('.article-container');
        if (container) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📄</div>
                    <h3 class="empty-title">文章不存在</h3>
                    <p class="empty-description">
                        抱歉，您访问的文章不存在或已被删除。
                    </p>
                    <a href="articles.html" class="btn btn-primary">浏览其他文章</a>
                </div>
            `;
        }
    }
}

// 全局函数
function copyCode(button) {
    const codeBlock = button.closest('.code-block').querySelector('code');
    const code = codeBlock.textContent;

    Utils.copyToClipboard(code).then(success => {
        if (success) {
            const originalText = button.textContent;
            button.textContent = '✅ 已复制';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        } else {
            ToastManager.error('复制失败');
        }
    });
}

// 页面初始化函数
function ArticlePageInit() {
    // 检查是否在文章详情页
    if (!document.body.classList.contains('article-page')) return;

    // 创建文章详情页实例
    window.articlePage = new ArticlePage();

    console.log('文章详情页初始化完成');

    // 监听用户登录状态变化
    EventBus.on('user:login', () => {
        if (window.articlePage) {
            window.articlePage.render();
        }
    });

    EventBus.on('user:logout', () => {
        if (window.articlePage) {
            window.articlePage.render();
        }
    });
}

// 导出供全局使用
window.ArticlePageInit = ArticlePageInit;
window.copyCode = copyCode;