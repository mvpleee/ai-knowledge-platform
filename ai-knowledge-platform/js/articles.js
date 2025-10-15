/* AI知识平台 - 文章列表页脚本 */

// 文章数据
const ArticlesData = {
    articles: [
        {
            id: 1,
            title: 'GPT-4技术解析：理解大型语言模型的突破',
            excerpt: '深入探讨GPT-4的技术架构、训练方法和能力边界，分析其在自然语言处理领域的重大突破。本文将从Transformer架构的演进开始，详细介绍预训练、微调和推理优化等关键技术。',
            category: 'AI模型',
            categoryId: 'ai-models',
            author: 'AI专家',
            authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
            date: '2024-01-15',
            readTime: '15分钟',
            isPremium: true,
            isFeatured: true,
            image: 'https://images.unsplash.com/photo-1677756119517-756a179e41d7?w=400&h=200&fit=crop',
            views: 2456,
            likes: 186,
            tags: ['GPT-4', 'LLM', 'Transformer', 'NLP']
        },
        {
            id: 2,
            title: '机器学习入门：从零开始理解ML算法',
            excerpt: '为初学者量身定制的机器学习指南，用通俗易懂的方式解释核心算法概念和应用方法。涵盖监督学习、无监督学习和强化学习的基础知识。',
            category: '机器学习',
            categoryId: 'machine-learning',
            author: 'ML工程师',
            authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
            date: '2024-01-14',
            readTime: '12分钟',
            isPremium: false,
            isNew: true,
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
            views: 1823,
            likes: 142,
            tags: ['机器学习', '算法', 'Python', '入门']
        },
        {
            id: 3,
            title: '深度学习框架对比：TensorFlow vs PyTorch',
            excerpt: '全面对比两大主流深度学习框架的优缺点，帮助开发者选择最适合的工具。从性能、易用性、社区支持等多个维度进行分析。',
            category: '深度学习',
            categoryId: 'deep-learning',
            author: 'DL研究员',
            authorAvatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face',
            date: '2024-01-13',
            readTime: '18分钟',
            isPremium: true,
            isFeatured: true,
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=200&fit=crop',
            views: 3127,
            likes: 267,
            tags: ['TensorFlow', 'PyTorch', '深度学习', '框架']
        },
        {
            id: 4,
            title: '计算机视觉实战：图像识别项目开发指南',
            excerpt: '从数据准备到模型部署，完整介绍计算机视觉项目的开发流程和最佳实践。包含实际案例和代码示例。',
            category: '计算机视觉',
            categoryId: 'computer-vision',
            author: 'CV专家',
            authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face',
            date: '2024-01-12',
            readTime: '20分钟',
            isPremium: false,
            image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=200&fit=crop',
            views: 1654,
            likes: 128,
            tags: ['计算机视觉', '图像识别', 'OpenCV', 'CNN']
        },
        {
            id: 5,
            title: '自然语言处理：文本分析技术全面解析',
            excerpt: '深入探讨NLP核心技术，包括分词、情感分析、命名实体识别等关键任务。介绍最新的预训练模型和应用案例。',
            category: 'NLP',
            categoryId: 'nlp',
            author: 'NLP研究员',
            authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c1ca?w=40&h=40&fit=crop&crop=face',
            date: '2024-01-11',
            readTime: '16分钟',
            isPremium: true,
            image: 'https://images.unsplash.com/photo-1628348068343-c6a8e5c754ab?w=400&h=200&fit=crop',
            views: 2891,
            likes: 234,
            tags: ['NLP', '文本分析', 'BERT', 'GPT']
        },
        {
            id: 6,
            title: '强化学习入门：Q-Learning算法详解',
            excerpt: '从基础概念到实际应用，详细介绍强化学习的核心算法Q-Learning。包含数学原理和编程实现。',
            category: '强化学习',
            categoryId: 'reinforcement-learning',
            author: 'RL专家',
            authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
            date: '2024-01-10',
            readTime: '14分钟',
            isPremium: false,
            isNew: true,
            image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=200&fit=crop',
            views: 1432,
            likes: 98,
            tags: ['强化学习', 'Q-Learning', 'AI', '算法']
        },
        {
            id: 7,
            title: '数据科学家的Python工具箱',
            excerpt: '介绍数据科学家必备的Python库和工具，包括NumPy、Pandas、Matplotlib等。包含实用技巧和最佳实践。',
            category: '数据科学',
            categoryId: 'data-science',
            author: '数据科学家',
            authorAvatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=40&h=40&fit=crop&crop=face',
            date: '2024-01-09',
            readTime: '22分钟',
            isPremium: false,
            image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop',
            views: 1987,
            likes: 156,
            tags: ['Python', '数据科学', '工具', '数据分析']
        },
        {
            id: 8,
            title: 'AI伦理与责任：人工智能发展的道德考量',
            excerpt: '探讨AI技术发展过程中的伦理问题和责任担当。分析偏见、隐私、就业等社会影响。',
            category: 'AI伦理',
            categoryId: 'ai-ethics',
            author: '伦理学者',
            authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
            date: '2024-01-08',
            readTime: '25分钟',
            isPremium: true,
            isFeatured: true,
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop',
            views: 3456,
            likes: 289,
            tags: ['AI伦理', '道德', '社会责任', '偏见']
        }
    ],

    categories: [
        { id: 'all', name: '全部', icon: '📚', count: 0 },
        { id: 'ai-models', name: 'AI模型', icon: '🤖', count: 0 },
        { id: 'machine-learning', name: '机器学习', icon: '🧠', count: 0 },
        { id: 'deep-learning', name: '深度学习', icon: '🔮', count: 0 },
        { id: 'computer-vision', name: '计算机视觉', icon: '👁️', count: 0 },
        { id: 'nlp', name: 'NLP', icon: '💬', count: 0 },
        { id: 'reinforcement-learning', name: '强化学习', icon: '🎮', count: 0 },
        { id: 'data-science', name: '数据科学', icon: '📊', count: 0 },
        { id: 'ai-ethics', name: 'AI伦理', icon: '⚖️', count: 0 }
    ],

    tags: [
        'GPT-4', 'LLM', 'Transformer', 'NLP', '机器学习', '算法', 'Python', '入门',
        'TensorFlow', 'PyTorch', '深度学习', '框架', '计算机视觉', '图像识别', 'OpenCV', 'CNN',
        '文本分析', 'BERT', '强化学习', 'Q-Learning', 'AI', '数据科学', '工具', '数据分析',
        'AI伦理', '道德', '社会责任', '偏见'
    ]
};

// 文章列表控制器
class ArticlesPage {
    constructor() {
        this.data = ArticlesData;
        this.currentCategory = 'all';
        this.currentSort = 'latest';
        this.currentSearch = '';
        this.currentPage = 1;
        this.articlesPerPage = 9;
        this.viewMode = 'grid'; // grid or list
        this.filteredArticles = [];
        this.init();
    }

    init() {
        this.updateCategoryCounts();
        this.applyFilters();
        this.bindEvents();
        this.loadInitialState();
        this.render();
    }

    updateCategoryCounts() {
        this.data.categories.forEach(category => {
            if (category.id === 'all') {
                category.count = this.data.articles.length;
            } else {
                category.count = this.data.articles.filter(article =>
                    article.categoryId === category.id
                ).length;
            }
        });
    }

    applyFilters() {
        let filtered = [...this.data.articles];

        // 分类筛选
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(article =>
                article.categoryId === this.currentCategory
            );
        }

        // 搜索筛选
        if (this.currentSearch) {
            const searchTerm = this.currentSearch.toLowerCase();
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(searchTerm) ||
                article.excerpt.toLowerCase().includes(searchTerm) ||
                article.category.toLowerCase().includes(searchTerm) ||
                article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        // 排序
        switch (this.currentSort) {
            case 'latest':
                filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'popular':
                filtered.sort((a, b) => b.views - a.views);
                break;
            case 'likes':
                filtered.sort((a, b) => b.likes - a.likes);
                break;
            case 'readTime':
                filtered.sort((a, b) =>
                    parseInt(a.readTime) - parseInt(b.readTime)
                );
                break;
        }

        this.filteredArticles = filtered;
        this.currentPage = 1;
    }

    bindEvents() {
        // 分类点击事件
        document.querySelectorAll('.category-item').forEach(item => {
            item.addEventListener('click', () => {
                const categoryId = item.dataset.category;
                this.setCategory(categoryId);
            });
        });

        // 排序选择事件
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.setSort(e.target.value);
            });
        }

        // 搜索事件
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');

        const performSearch = () => {
            const query = searchInput.value.trim();
            this.setSearch(query);
        };

        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', performSearch);
        }

        // 视图模式切换
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.view;
                this.setViewMode(mode);
            });
        });

        // 标签点击事件
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag')) {
                const tag = e.target.textContent;
                this.setTagFilter(tag);
            }
        });

        // 分页事件
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('pagination-item') && !e.target.classList.contains('disabled')) {
                const page = parseInt(e.target.dataset.page);
                if (page) {
                    this.setPage(page);
                }
            }
        });

        // 加载更多事件
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMore();
            });
        }
    }

    loadInitialState() {
        // 从URL参数加载初始状态
        const urlParams = new URLSearchParams(window.location.search);

        const category = urlParams.get('category');
        if (category && this.data.categories.find(c => c.id === category)) {
            this.currentCategory = category;
        }

        const search = urlParams.get('search');
        if (search) {
            this.currentSearch = search;
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = search;
            }
        }

        const sort = urlParams.get('sort');
        if (sort) {
            this.currentSort = sort;
            const sortSelect = document.getElementById('sort-select');
            if (sortSelect) {
                sortSelect.value = sort;
            }
        }

        const page = parseInt(urlParams.get('page'));
        if (page && page > 0) {
            this.currentPage = page;
        }
    }

    setCategory(categoryId) {
        this.currentCategory = categoryId;
        this.applyFilters();
        this.updateURL();
        this.render();
        this.updateActiveCategory();
        this.scrollToTop();
    }

    setSort(sort) {
        this.currentSort = sort;
        this.applyFilters();
        this.updateURL();
        this.render();
    }

    setSearch(search) {
        this.currentSearch = search;
        this.applyFilters();
        this.updateURL();
        this.render();
    }

    setViewMode(mode) {
        this.viewMode = mode;
        this.updateViewButtons();
        this.renderArticles();
        Utils.storage.set('articles_view_mode', mode);
    }

    setTagFilter(tag) {
        this.currentSearch = tag;
        this.applyFilters();
        this.updateURL();
        this.render();

        // 更新搜索框
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = tag;
        }
    }

    setPage(page) {
        const totalPages = Math.ceil(this.filteredArticles.length / this.articlesPerPage);
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.updateURL();
            this.render();
            this.scrollToTop();
        }
    }

    loadMore() {
        this.articlesPerPage += 6;
        this.render();
    }

    updateURL() {
        const params = new URLSearchParams();

        if (this.currentCategory !== 'all') {
            params.set('category', this.currentCategory);
        }
        if (this.currentSearch) {
            params.set('search', this.currentSearch);
        }
        if (this.currentSort !== 'latest') {
            params.set('sort', this.currentSort);
        }
        if (this.currentPage > 1) {
            params.set('page', this.currentPage.toString());
        }

        const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
        window.history.replaceState({}, '', newURL);
    }

    updateActiveCategory() {
        document.querySelectorAll('.category-item').forEach(item => {
            const isActive = item.dataset.category === this.currentCategory;
            item.classList.toggle('active', isActive);
        });
    }

    updateViewButtons() {
        document.querySelectorAll('.view-btn').forEach(btn => {
            const isActive = btn.dataset.view === this.viewMode;
            btn.classList.toggle('active', isActive);
        });
    }

    scrollToTop() {
        const articlesContent = document.querySelector('.articles-content');
        if (articlesContent) {
            Utils.scrollToElement(articlesContent, 80);
        }
    }

    render() {
        this.renderCategories();
        this.renderArticles();
        this.renderPagination();
        this.renderFilterTags();
        this.updateStats();
    }

    renderCategories() {
        const container = document.querySelector('.category-list');
        if (!container) return;

        container.innerHTML = this.data.categories.map(category => `
            <li class="category-item ${category.id === this.currentCategory ? 'active' : ''}"
                data-category="${category.id}">
                <div class="category-name">
                    <span class="category-icon">${category.icon}</span>
                    <span>${category.name}</span>
                </div>
                <span class="category-count">${category.count}</span>
            </li>
        `).join('');
    }

    renderArticles() {
        const container = document.getElementById('articles-container');
        if (!container) return;

        const startIndex = (this.currentPage - 1) * this.articlesPerPage;
        const endIndex = startIndex + this.articlesPerPage;
        const articles = this.filteredArticles.slice(startIndex, endIndex);

        if (articles.length === 0) {
            container.innerHTML = this.renderEmptyState();
            return;
        }

        // 设置网格模式
        container.className = this.viewMode === 'list' ? 'articles-list' : 'articles-grid';

        container.innerHTML = articles.map(article => this.renderArticleCard(article)).join('');

        // 绑定文章卡片点击事件
        container.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', () => {
                const articleId = card.dataset.id;
                this.navigateToArticle(articleId);
            });
        });
    }

    renderArticleCard(article) {
        const badges = [];
        if (article.isFeatured) badges.push('<div class="article-card-badge">🔥 热门</div>');
        if (article.isNew) badges.push('<div class="article-card-badge new">✨ 最新</div>');
        if (article.isPremium) badges.push('<div class="article-card-badge">付费</div>');

        return `
            <article class="article-card ${article.isFeatured ? 'featured' : ''} ${article.isNew ? 'new' : ''}"
                     data-id="${article.id}">
                ${badges.join('')}
                <img src="${article.image}" alt="${article.title}" class="article-card-image">
                <div class="article-card-content">
                    <div class="article-card-category">${article.category}</div>
                    <h3 class="article-card-title">${article.title}</h3>
                    <p class="article-card-excerpt">${article.excerpt}</p>
                    <div class="article-card-meta">
                        <div class="article-card-author">
                            <img src="${article.authorAvatar}" alt="${article.author}" class="article-card-author-avatar">
                            <span>${article.author}</span>
                        </div>
                        <div class="article-card-stats">
                            <span>📖 ${article.readTime}</span>
                            <span>👁️ ${article.views}</span>
                            <span>❤️ ${article.likes}</span>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }

    renderPagination() {
        const container = document.querySelector('.pagination');
        if (!container) return;

        const totalPages = Math.ceil(this.filteredArticles.length / this.articlesPerPage);

        if (totalPages <= 1) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'flex';

        let paginationHTML = '';

        // 上一页按钮
        paginationHTML += `
            <button class="pagination-item ${this.currentPage === 1 ? 'disabled' : ''}"
                    data-page="${this.currentPage - 1}">
                ←
            </button>
        `;

        // 页码按钮
        const maxVisiblePages = 7;
        let startPage = Math.max(1, this.currentPage - 3);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            paginationHTML += `
                <button class="pagination-item" data-page="1">1</button>
            `;
            if (startPage > 2) {
                paginationHTML += `<span class="pagination-item disabled">...</span>`;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="pagination-item ${i === this.currentPage ? 'active' : ''}"
                        data-page="${i}">${i}</button>
            `;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span class="pagination-item disabled">...</span>`;
            }
            paginationHTML += `
                <button class="pagination-item" data-page="${totalPages}">${totalPages}</button>
            `;
        }

        // 下一页按钮
        paginationHTML += `
            <button class="pagination-item ${this.currentPage === totalPages ? 'disabled' : ''}"
                    data-page="${this.currentPage + 1}">
                →
            </button>
        `;

        container.innerHTML = paginationHTML;
    }

    renderFilterTags() {
        const container = document.querySelector('.filter-tags');
        if (!container) return;

        const tags = [];

        if (this.currentCategory !== 'all') {
            const category = this.data.categories.find(c => c.id === this.currentCategory);
            if (category) {
                tags.push(`
                    <div class="filter-tag">
                        分类: ${category.name}
                        <span class="remove" data-filter="category">×</span>
                    </div>
                `);
            }
        }

        if (this.currentSearch) {
            tags.push(`
                <div class="filter-tag">
                    搜索: ${this.currentSearch}
                    <span class="remove" data-filter="search">×</span>
                </div>
            `);
        }

        if (tags.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'flex';
        container.innerHTML = tags.join('');

        // 绑定删除标签事件
        container.querySelectorAll('.remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const filterType = btn.dataset.filter;

                if (filterType === 'category') {
                    this.setCategory('all');
                } else if (filterType === 'search') {
                    this.setSearch('');
                    const searchInput = document.getElementById('search-input');
                    if (searchInput) {
                        searchInput.value = '';
                    }
                }
            });
        });
    }

    renderEmptyState() {
        return `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3 class="empty-title">没有找到相关文章</h3>
                <p class="empty-description">
                    ${this.currentSearch ?
                        `没有找到包含 "${this.currentSearch}" 的文章，请尝试其他关键词。` :
                        '该分类下暂时没有文章，请查看其他分类。'}
                </p>
                <button class="btn btn-primary" onclick="window.location.reload()">
                    重新开始
                </button>
            </div>
        `;
    }

    updateStats() {
        // 更新文章数量统计
        const statsElements = document.querySelectorAll('.articles-stats');
        statsElements.forEach(el => {
            el.textContent = `共找到 ${this.filteredArticles.length} 篇文章`;
        });
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
}

// 页面初始化函数
function ArticlesPageInit() {
    // 检查是否在文章列表页
    if (!document.body.classList.contains('articles-page')) return;

    // 加载保存的视图模式
    const savedViewMode = Utils.storage.get('articles_view_mode', 'grid');

    // 创建文章列表实例
    window.articlesPage = new ArticlesPage();

    // 设置视图模式
    if (savedViewMode !== 'grid') {
        window.articlesPage.setViewMode(savedViewMode);
    }

    console.log('文章列表页初始化完成');

    // 监听用户登录状态变化
    EventBus.on('user:login', () => {
        window.articlesPage.render();
    });

    EventBus.on('user:logout', () => {
        window.articlesPage.render();
    });
}

// 导出供全局使用
window.ArticlesPageInit = ArticlesPageInit;