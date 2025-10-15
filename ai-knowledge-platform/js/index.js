/* AI知识平台 - 首页脚本 */

// 首页数据
const HomePageData = {
    features: [
        {
            icon: '🤖',
            title: 'AI前沿技术',
            description: '深度解析人工智能最新技术趋势、算法原理和应用场景，助你把握AI发展脉搏。'
        },
        {
            icon: '📚',
            title: '系统化学习',
            description: '从基础概念到高级应用，构建完整的AI知识体系，循序渐进掌握AI技能。'
        },
        {
            icon: '💡',
            title: '实战案例',
            description: '丰富的AI项目实战案例，理论与实践相结合，快速提升AI应用开发能力。'
        },
        {
            icon: '🌟',
            title: '专家分享',
            description: 'AI领域专家定期分享经验心得，了解行业动态，获得专业指导和建议。'
        },
        {
            icon: '🚀',
            title: '创新应用',
            description: '探索AI在各行业的创新应用，启发思维，发现AI技术的商业价值。'
        },
        {
            icon: '🔧',
            title: '工具资源',
            description: '精选AI开发工具、框架和学习资源，提高学习效率，加速项目开发。'
        }
    ],

    articles: [
        {
            id: 1,
            title: 'GPT-4技术解析：理解大型语言模型的突破',
            excerpt: '深入探讨GPT-4的技术架构、训练方法和能力边界，分析其在自然语言处理领域的重大突破...',
            category: 'AI模型',
            author: 'AI专家',
            date: '2024-01-15',
            readTime: '15分钟',
            isPremium: true,
            image: 'https://images.unsplash.com/photo-1677756119517-756a179e41d7?w=400&h=200&fit=crop',
            views: 2456
        },
        {
            id: 2,
            title: '机器学习入门：从零开始理解ML算法',
            excerpt: '为初学者量身定制的机器学习指南，用通俗易懂的方式解释核心算法概念和应用方法...',
            category: '机器学习',
            author: 'ML工程师',
            date: '2024-01-14',
            readTime: '12分钟',
            isPremium: false,
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
            views: 1823
        },
        {
            id: 3,
            title: '深度学习框架对比：TensorFlow vs PyTorch',
            excerpt: '全面对比两大主流深度学习框架的优缺点，帮助开发者选择最适合的工具...',
            category: '深度学习',
            author: 'DL研究员',
            date: '2024-01-13',
            readTime: '18分钟',
            isPremium: true,
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=200&fit=crop',
            views: 3127
        },
        {
            id: 4,
            title: '计算机视觉实战：图像识别项目开发指南',
            excerpt: '从数据准备到模型部署，完整介绍计算机视觉项目的开发流程和最佳实践...',
            category: '计算机视觉',
            author: 'CV专家',
            date: '2024-01-12',
            readTime: '20分钟',
            isPremium: false,
            image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=200&fit=crop',
            views: 1654
        },
        {
            id: 5,
            title: '自然语言处理：文本分析技术全面解析',
            excerpt: '深入探讨NLP核心技术，包括分词、情感分析、命名实体识别等关键任务...',
            category: 'NLP',
            author: 'NLP研究员',
            date: '2024-01-11',
            readTime: '16分钟',
            isPremium: true,
            image: 'https://images.unsplash.com/photo-1628348068343-c6a8e5c754ab?w=400&h=200&fit=crop',
            views: 2891
        },
        {
            id: 6,
            title: '强化学习入门：Q-Learning算法详解',
            excerpt: '从基础概念到实际应用，详细介绍强化学习的核心算法Q-Learning...',
            category: '强化学习',
            author: 'RL专家',
            date: '2024-01-10',
            readTime: '14分钟',
            isPremium: false,
            image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=200&fit=crop',
            views: 1432
        }
    ],

    stats: [
        { number: '1000+', label: 'AI文章' },
        { number: '50+', label: '专家作者' },
        { number: '10万+', label: '读者' },
        { number: '4.8', label: '用户评分' }
    ]
};

// 首页控制器
class IndexPage {
    constructor() {
        this.data = HomePageData;
        this.init();
    }

    init() {
        this.renderFeatures();
        this.renderArticles();
        this.renderStats();
        this.bindEvents();
        this.initAnimations();
        this.initScrollEffects();
    }

    renderFeatures() {
        const container = document.querySelector('.features-grid');
        if (!container) return;

        container.innerHTML = this.data.features.map((feature, index) => `
            <div class="feature-card fade-in-up delay-${index + 1}">
                <div class="feature-icon">${feature.icon}</div>
                <h3 class="feature-title">${feature.title}</h3>
                <p class="feature-description">${feature.description}</p>
            </div>
        `).join('');
    }

    renderArticles() {
        const container = document.querySelector('.articles-grid');
        if (!container) return;

        // 取前6篇文章显示
        const recentArticles = this.data.articles.slice(0, 6);

        container.innerHTML = recentArticles.map((article, index) => `
            <article class="article-card fade-in-up delay-${index + 1}" data-id="${article.id}">
                ${article.isPremium ? '<div class="article-card-badge">付费</div>' : ''}
                <img src="${article.image}" alt="${article.title}" class="article-card-image">
                <div class="article-card-content">
                    <div class="article-card-category">${article.category}</div>
                    <h3 class="article-card-title">${article.title}</h3>
                    <p class="article-card-excerpt">${article.excerpt}</p>
                    <div class="article-card-meta">
                        <div class="article-card-author">
                            <div class="article-card-author-avatar"></div>
                            <span>${article.author}</span>
                        </div>
                        <div class="article-card-stats">
                            <span>📖 ${article.readTime}</span>
                            <span>👁️ ${article.views}</span>
                        </div>
                    </div>
                </div>
            </article>
        `).join('');

        // 绑定文章卡片点击事件
        container.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', () => {
                const articleId = card.dataset.id;
                this.navigateToArticle(articleId);
            });
        });
    }

    renderStats() {
        const container = document.querySelector('.stats-grid');
        if (!container) return;

        container.innerHTML = this.data.stats.map((stat, index) => `
            <div class="stat-item fade-in-up delay-${index + 1}">
                <span class="stat-number" data-target="${stat.number}">${stat.number}</span>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');
    }

    bindEvents() {
        // CTA按钮事件
        document.querySelectorAll('.cta-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.dataset.action;
                this.handleCTA(action, e);
            });
        });

        // 查看全部文章
        const viewAllLink = document.querySelector('.view-all-link');
        if (viewAllLink) {
            viewAllLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'articles.html';
            });
        }

        // 搜索功能
        const searchInput = document.querySelector('.hero-search');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch(e.target.value);
                }
            });
        }

        // 订阅功能
        const subscribeForm = document.querySelector('.subscribe-form');
        if (subscribeForm) {
            subscribeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubscribe(e.target);
            });
        }
    }

    handleCTA(action, event) {
        switch (action) {
            case 'start-learning':
                if (UserManager.isAuthenticated()) {
                    window.location.href = 'articles.html';
                } else {
                    ToastManager.info('请先登录账号');
                    setTimeout(() => {
                        window.location.href = 'auth.html';
                    }, 1000);
                }
                break;
            case 'view-premium':
                window.location.href = 'membership.html';
                break;
            case 'start-free':
                if (UserManager.isAuthenticated()) {
                    ToastManager.success('欢迎开始学习之旅！');
                    window.location.href = 'articles.html';
                } else {
                    window.location.href = 'auth.html';
                }
                break;
            default:
                console.warn('未知的CTA操作:', action);
        }
    }

    handleSearch(query) {
        if (!query.trim()) {
            ToastManager.warning('请输入搜索关键词');
            return;
        }

        // 跳转到文章列表页面并传递搜索参数
        window.location.href = `articles.html?search=${encodeURIComponent(query.trim())}`;
    }

    handleSubscribe(form) {
        const email = form.email.value.trim();

        if (!Utils.validateEmail(email)) {
            ToastManager.error('请输入有效的邮箱地址');
            return;
        }

        // 模拟订阅请求
        ToastManager.info('正在订阅...');

        setTimeout(() => {
            ToastManager.success('订阅成功！您将收到最新的AI资讯');
            form.reset();

            // 保存订阅信息
            const subscribers = Utils.storage.get('subscribers', []);
            subscribers.push({
                email,
                date: new Date().toISOString()
            });
            Utils.storage.set('subscribers', subscribers);
        }, 1500);
    }

    navigateToArticle(articleId) {
        const article = this.data.articles.find(a => a.id == articleId);

        if (!article) return;

        // 检查是否为付费文章
        if (article.isPremium) {
            if (!UserManager.isAuthenticated()) {
                ToastManager.warning('此为付费文章，请先登录');
                setTimeout(() => {
                    window.location.href = `auth.html?redirect=article.html?id=${articleId}`;
                }, 1000);
                return;
            }

            const user = UserManager.currentUser;
            if (!user.isPremium) {
                ToastManager.warning('此为付费文章，请开通会员');
                setTimeout(() => {
                    window.location.href = 'membership.html';
                }, 1000);
                return;
            }
        }

        // 跳转到文章详情页
        window.location.href = `article.html?id=${articleId}`;
    }

    initAnimations() {
        // 数字递增动画
        this.animateNumbers();

        // 页面加载动画
        this.animateOnLoad();
    }

    animateNumbers() {
        const numbers = document.querySelectorAll('.stat-number');

        numbers.forEach(number => {
            const target = number.textContent;
            const hasPlus = target.includes('+');
            const numericValue = parseInt(target.replace(/\D/g, ''));
            const duration = 2000;
            const steps = 60;
            const increment = numericValue / steps;
            let current = 0;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                current += increment;

                if (step >= steps) {
                    number.textContent = target;
                    clearInterval(timer);
                } else {
                    const displayValue = Math.floor(current);
                    number.textContent = hasPlus ? `${displayValue}+` : displayValue;
                }
            }, duration / steps);
        });
    }

    animateOnLoad() {
        // 添加加载动画类
        const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
        elements.forEach(el => {
            el.style.opacity = '0';
        });

        // 延迟显示动画
        setTimeout(() => {
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.animation = el.classList.contains('fade-in-up') ?
                        'fadeInUp 0.8s ease-out forwards' :
                        el.classList.contains('fade-in-left') ?
                        'fadeInLeft 0.8s ease-out forwards' :
                        'fadeInRight 0.8s ease-out forwards';
                }, index * 100);
            });
        }, 300);
    }

    initScrollEffects() {
        // 滚动显示动画
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        // 观察所有需要滚动显示的元素
        const scrollElements = document.querySelectorAll('.feature-card, .article-card, .stat-item');
        scrollElements.forEach(el => {
            el.classList.add('scroll-reveal');
            observer.observe(el);
        });

        // 视差滚动效果
        window.addEventListener('scroll', Utils.throttle(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');

            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }, 16));
    }
}

// 页面初始化函数
function IndexPageInit() {
    // 检查是否在首页
    if (!document.body.classList.contains('index-page')) return;

    // 创建首页实例
    window.indexPage = new IndexPage();

    // 首页特定的初始化
    console.log('首页初始化完成');

    // 绑定页面可见性事件
    EventBus.on('page:visible', () => {
        // 页面重新可见时刷新数据
        if (window.indexPage) {
            window.indexPage.renderArticles();
        }
    });

    // 监听用户登录状态变化
    EventBus.on('user:login', () => {
        // 用户登录后更新UI
        window.indexPage.renderArticles();
    });

    EventBus.on('user:logout', () => {
        // 用户登出后更新UI
        window.indexPage.renderArticles();
    });
}

// 页面SEO优化
function optimizeSEO() {
    // 动态设置页面标题
    document.title = 'AI知识平台 - 人工智能学习与交流社区';

    // 设置页面描述
    const description = document.querySelector('meta[name="description"]');
    if (description) {
        description.content = 'AI知识平台提供最新的人工智能技术文章、学习资源和实战案例，助您掌握AI技能，成为AI专家。';
    }

    // 设置关键词
    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
        keywords.content = '人工智能,机器学习,深度学习,NLP,计算机视觉,AI教程,技术文章';
    }

    // 添加结构化数据
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "AI知识平台",
        "description": "人工智能学习与交流社区",
        "url": window.location.origin,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${window.location.origin}/articles.html?search={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// 性能监控
function trackPagePerformance() {
    // 监控页面加载性能
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;

        // 如果有分析服务，可以发送数据
        if (window.gtag) {
            window.gtag('event', 'page_load_time', {
                custom_parameter: loadTime
            });
        }

        console.log(`首页加载时间: ${loadTime}ms`);
    });

    // 监控用户交互
    let interactionStartTime = Date.now();
    let firstInteraction = true;

    ['click', 'scroll', 'keydown'].forEach(eventType => {
        document.addEventListener(eventType, () => {
            if (firstInteraction) {
                const timeToInteraction = Date.now() - interactionStartTime;
                console.log(`首次交互时间: ${timeToInteraction}ms`);
                firstInteraction = false;
            }
        }, { once: true });
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    optimizeSEO();
    trackPagePerformance();
});

// 导出供全局使用
window.IndexPageInit = IndexPageInit;