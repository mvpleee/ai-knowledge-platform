/* AI知识平台 - 公共脚本 */

// 全局配置
const CONFIG = {
    API_BASE_URL: '/api',
    APP_NAME: 'AI知识平台',
    VERSION: '1.0.0',
    STORAGE_PREFIX: 'ai_knowledge_platform_',
    ANIMATION_DURATION: 300,
    TOAST_DURATION: 3000,
    BREAKPOINTS: {
        MOBILE: 640,
        TABLET: 768,
        DESKTOP: 1024,
        LARGE: 1280
    }
};

// 工具函数
const Utils = {
    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 节流函数
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // 格式化日期
    formatDate(date, format = 'YYYY-MM-DD') {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');

        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes);
    },

    // 相对时间
    timeAgo(date) {
        const now = new Date();
        const past = new Date(date);
        const diffMs = now - past;
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) return `${diffDays}天前`;
        if (diffHours > 0) return `${diffHours}小时前`;
        if (diffMins > 0) return `${diffMins}分钟前`;
        return '刚刚';
    },

    // 生成随机ID
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    },

    // 深拷贝
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => this.deepClone(item));
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = this.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    },

    // 本地存储操作
    storage: {
        set(key, value) {
            try {
                localStorage.setItem(
                    CONFIG.STORAGE_PREFIX + key,
                    JSON.stringify(value)
                );
            } catch (error) {
                console.error('存储失败:', error);
            }
        },

        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(CONFIG.STORAGE_PREFIX + key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.error('读取失败:', error);
                return defaultValue;
            }
        },

        remove(key) {
            try {
                localStorage.removeItem(CONFIG.STORAGE_PREFIX + key);
            } catch (error) {
                console.error('删除失败:', error);
            }
        },

        clear() {
            try {
                const keys = Object.keys(localStorage).filter(key =>
                    key.startsWith(CONFIG.STORAGE_PREFIX)
                );
                keys.forEach(key => localStorage.removeItem(key));
            } catch (error) {
                console.error('清空失败:', error);
            }
        }
    },

    // 获取设备信息
    getDeviceInfo() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        let deviceType = 'desktop';
        if (width < CONFIG.BREAKPOINTS.MOBILE) {
            deviceType = 'mobile';
        } else if (width < CONFIG.BREAKPOINTS.DESKTOP) {
            deviceType = 'tablet';
        }

        return {
            width,
            height,
            deviceType,
            isMobile: deviceType === 'mobile',
            isTablet: deviceType === 'tablet',
            isDesktop: deviceType === 'desktop'
        };
    },

    // 滚动到元素
    scrollToElement(element, offset = 0) {
        if (!element) return;

        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    },

    // 复制到剪贴板
    async copyToClipboard(text) {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                // 降级方案
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const result = document.execCommand('copy');
                textArea.remove();
                return result;
            }
        } catch (error) {
            console.error('复制失败:', error);
            return false;
        }
    },

    // 验证邮箱
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // 验证手机号
    validatePhone(phone) {
        const re = /^1[3-9]\d{9}$/;
        return re.test(phone);
    },

    // 获取URL参数
    getUrlParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },

    // 设置URL参数
    setUrlParam(name, value) {
        const url = new URL(window.location);
        url.searchParams.set(name, value);
        window.history.replaceState({}, '', url);
    },

    // 移除URL参数
    removeUrlParam(name) {
        const url = new URL(window.location);
        url.searchParams.delete(name);
        window.history.replaceState({}, '', url);
    }
};

// 事件总线
const EventBus = {
    events: {},

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    },

    off(event, callback) {
        if (!this.events[event]) return;

        const index = this.events[event].indexOf(callback);
        if (index > -1) {
            this.events[event].splice(index, 1);
        }
    },

    emit(event, data) {
        if (!this.events[event]) return;

        this.events[event].forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error('事件处理错误:', error);
            }
        });
    }
};

// HTTP请求封装
const HTTP = {
    async request(url, options = {}) {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const finalOptions = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers
            }
        };

        try {
            const response = await fetch(CONFIG.API_BASE_URL + url, finalOptions);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || '请求失败');
            }

            return data;
        } catch (error) {
            console.error('HTTP请求错误:', error);
            throw error;
        }
    },

    get(url, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;
        return this.request(fullUrl);
    },

    post(url, data = {}) {
        return this.request(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    put(url, data = {}) {
        return this.request(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    delete(url) {
        return this.request(url, {
            method: 'DELETE'
        });
    }
};

// 导航管理器
const NavigationManager = {
    init() {
        this.bindEvents();
        this.updateActiveLink();
    },

    bindEvents() {
        // 导航链接点击事件
        document.querySelectorAll('.navbar-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    this.updateActiveLink(href);
                }
            });
        });

        // 移动端导航切换
        const toggle = document.querySelector('.navbar-toggle');
        const nav = document.querySelector('.navbar-nav');

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('active');
            });

            // 点击外部关闭导航
            document.addEventListener('click', (e) => {
                if (!toggle.contains(e.target) && !nav.contains(e.target)) {
                    nav.classList.remove('active');
                }
            });
        }

        // 滚动时导航栏样式变化
        window.addEventListener('scroll', Utils.throttle(() => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        }, 100));
    },

    updateActiveLink(currentPath) {
        const path = currentPath || window.location.pathname;

        document.querySelectorAll('.navbar-link').forEach(link => {
            link.classList.remove('active');

            const href = link.getAttribute('href');
            if (href === path || (path === '/' && href === '/index.html')) {
                link.classList.add('active');
            }
        });
    }
};

// 模态框管理器
const ModalManager = {
    currentModal: null,

    show(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        // 关闭当前模态框
        if (this.currentModal && this.currentModal !== modal) {
            this.hide(this.currentModal.id);
        }

        this.currentModal = modal;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // 绑定关闭事件
        this.bindModalEvents(modal);

        // 触发显示事件
        EventBus.emit('modal:show', { modalId, modal });
    },

    hide(modalId) {
        const modal = modalId ? document.getElementById(modalId) : this.currentModal;
        if (!modal) return;

        modal.classList.remove('show');
        document.body.style.overflow = '';

        if (this.currentModal === modal) {
            this.currentModal = null;
        }

        // 触发隐藏事件
        EventBus.emit('modal:hide', { modalId: modal.id, modal });
    },

    bindModalEvents(modal) {
        // 关闭按钮
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.onclick = () => this.hide(modal.id);
        }

        // 背景点击关闭
        modal.onclick = (e) => {
            if (e.target === modal) {
                this.hide(modal.id);
            }
        };

        // ESC键关闭
        const handleEscape = (e) => {
            if (e.key === 'Escape' && this.currentModal === modal) {
                this.hide(modal.id);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }
};

// 提示框管理器
const ToastManager = {
    container: null,
    toasts: new Map(),

    init() {
        this.createContainer();
    },

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 4000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(this.container);
    },

    show(message, options = {}) {
        const {
            type = 'info',
            title = '',
            duration = CONFIG.TOAST_DURATION,
            closable = true
        } = options;

        const id = Utils.generateId();
        const toast = this.createToast(id, message, type, title, closable);

        this.container.appendChild(toast);
        this.toasts.set(id, { element: toast, timer: null });

        // 显示动画
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // 自动隐藏
        if (duration > 0) {
            const timer = setTimeout(() => {
                this.hide(id);
            }, duration);
            this.toasts.get(id).timer = timer;
        }

        return id;
    },

    hide(id) {
        const toastData = this.toasts.get(id);
        if (!toastData) return;

        const { element, timer } = toastData;

        // 清除定时器
        if (timer) {
            clearTimeout(timer);
        }

        // 隐藏动画
        element.classList.remove('show');
        element.classList.add('hide');

        // 移除元素
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
            this.toasts.delete(id);
        }, CONFIG.ANIMATION_DURATION);
    },

    createToast(id, message, type, title, closable) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.dataset.id = id;

        const iconMap = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        toast.innerHTML = `
            <div class="toast-icon">${iconMap[type] || iconMap.info}</div>
            <div class="toast-content">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                <div class="toast-message">${message}</div>
            </div>
            ${closable ? '<button class="toast-close">×</button>' : ''}
        `;

        // 绑定关闭事件
        if (closable) {
            const closeBtn = toast.querySelector('.toast-close');
            closeBtn.addEventListener('click', () => this.hide(id));
        }

        // 样式
        toast.style.cssText = `
            transform: translateX(100%);
            opacity: 0;
            transition: all ${CONFIG.ANIMATION_DURATION}ms ease;
        `;

        toast.classList.add('show');
        toast.style.cssText = `
            transform: translateX(0);
            opacity: 1;
        `;

        return toast;
    },

    // 便捷方法
    success(message, options = {}) {
        return this.show(message, { ...options, type: 'success' });
    },

    error(message, options = {}) {
        return this.show(message, { ...options, type: 'error' });
    },

    warning(message, options = {}) {
        return this.show(message, { ...options, type: 'warning' });
    },

    info(message, options = {}) {
        return this.show(message, { ...options, type: 'info' });
    }
};

// 表单验证器
const FormValidator = {
    rules: {
        required: (value) => value && value.trim() !== '',
        email: (value) => Utils.validateEmail(value),
        phone: (value) => Utils.validatePhone(value),
        minLength: (value, min) => value && value.length >= min,
        maxLength: (value, max) => value && value.length <= max,
        pattern: (value, pattern) => new RegExp(pattern).test(value)
    },

    validate(form, rules) {
        const errors = {};
        const formData = new FormData(form);

        for (const fieldName in rules) {
            const fieldRules = rules[fieldName];
            const value = formData.get(fieldName);

            for (const rule of fieldRules) {
                const [ruleName, ...params] = rule.split(':');
                const ruleFunc = this.rules[ruleName];

                if (ruleFunc && !ruleFunc(value, ...params)) {
                    errors[fieldName] = this.getErrorMessage(ruleName, params);
                    break;
                }
            }
        }

        this.displayErrors(form, errors);
        return Object.keys(errors).length === 0;
    },

    displayErrors(form, errors) {
        // 清除之前的错误
        form.querySelectorAll('.form-error').forEach(el => el.remove());
        form.querySelectorAll('.form-input').forEach(el => {
            el.classList.remove('error');
        });

        // 显示新的错误
        for (const fieldName in errors) {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                field.classList.add('error');

                const errorEl = document.createElement('div');
                errorEl.className = 'form-error';
                errorEl.textContent = errors[fieldName];
                field.parentNode.appendChild(errorEl);
            }
        }
    },

    getErrorMessage(ruleName, params) {
        const messages = {
            required: '此字段为必填项',
            email: '请输入有效的邮箱地址',
            phone: '请输入有效的手机号码',
            minLength: `最少需要${params[0]}个字符`,
            maxLength: `最多允许${params[0]}个字符`,
            pattern: '格式不正确'
        };
        return messages[ruleName] || '输入不正确';
    }
};

// 用户管理器
const UserManager = {
    currentUser: null,

    init() {
        this.loadCurrentUser();
        this.bindEvents();
    },

    loadCurrentUser() {
        const user = Utils.storage.get('currentUser');
        if (user) {
            this.currentUser = user;
            this.updateUI();
        }
    },

    login(userData) {
        this.currentUser = userData;
        Utils.storage.set('currentUser', userData);
        this.updateUI();
        EventBus.emit('user:login', userData);
    },

    logout() {
        this.currentUser = null;
        Utils.storage.remove('currentUser');
        this.updateUI();
        EventBus.emit('user:logout');
    },

    updateUI() {
        const loginLinks = document.querySelectorAll('.auth-login');
        const logoutLinks = document.querySelectorAll('.auth-logout');
        const userNames = document.querySelectorAll('.user-name');

        if (this.currentUser) {
            loginLinks.forEach(el => el.style.display = 'none');
            logoutLinks.forEach(el => el.style.display = 'block');
            userNames.forEach(el => {
                el.textContent = this.currentUser.name || this.currentUser.email;
            });
        } else {
            loginLinks.forEach(el => el.style.display = 'block');
            logoutLinks.forEach(el => el.style.display = 'none');
            userNames.forEach(el => el.textContent = '');
        }
    },

    bindEvents() {
        document.querySelectorAll('.auth-logout').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
                ToastManager.success('已退出登录');
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 1000);
            });
        });
    },

    isAuthenticated() {
        return !!this.currentUser;
    },

    requireAuth() {
        if (!this.isAuthenticated()) {
            ToastManager.warning('请先登录');
            setTimeout(() => {
                window.location.href = '/auth.html?redirect=' + encodeURIComponent(window.location.pathname);
            }, 1000);
            return false;
        }
        return true;
    }
};

// 页面加载管理器
const PageLoader = {
    isLoading: false,

    show() {
        if (this.isLoading) return;

        this.isLoading = true;
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="loading-text">加载中...</div>
        `;
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 15, 15, 0.9);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            color: white;
        `;

        document.body.appendChild(loader);
    },

    hide() {
        this.isLoading = false;
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 300);
        }
    }
};

// 性能监控
const Performance = {
    init() {
        this.observePageLoad();
        this.observeUserInteractions();
    },

    observePageLoad() {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const loadTime = navigation.loadEventEnd - navigation.loadEventStart;

            console.log(`页面加载时间: ${loadTime}ms`);

            // 如果加载时间过长，显示提示
            if (loadTime > 3000) {
                ToastManager.info('页面加载较慢，请检查网络连接', {
                    duration: 5000
                });
            }
        });
    },

    observeUserInteractions() {
        let lastInteractionTime = Date.now();

        ['click', 'scroll', 'keydown', 'touchstart'].forEach(event => {
            document.addEventListener(event, () => {
                lastInteractionTime = Date.now();
            }, { passive: true });
        });

        // 监控用户活跃度
        setInterval(() => {
            const inactiveTime = Date.now() - lastInteractionTime;
            if (inactiveTime > 300000) { // 5分钟无操作
                EventBus.emit('user:inactive');
            }
        }, 60000);
    }
};

// 应用初始化
class App {
    constructor() {
        this.components = [];
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) return;

        try {
            // 显示加载状态
            PageLoader.show();

            // 初始化核心模块
            NavigationManager.init();
            UserManager.init();
            ToastManager.init();
            Performance.init();
            ImageLoader.init();

            // 注册全局组件
            this.registerComponents();

            // 绑定全局事件
            this.bindGlobalEvents();

            // 初始化页面特定的逻辑
            await this.initPage();

            this.isInitialized = true;

            // 隐藏加载状态
            setTimeout(() => {
                PageLoader.hide();
            }, 500);

            console.log(`${CONFIG.APP_NAME} v${CONFIG.VERSION} 初始化完成`);

        } catch (error) {
            console.error('应用初始化失败:', error);
            PageLoader.hide();
            ToastManager.error('应用初始化失败，请刷新页面重试');
        }
    }

    registerComponents() {
        // 注册全局组件
        this.components.push(
            NavigationManager,
            UserManager,
            ToastManager,
            ModalManager
        );
    }

    bindGlobalEvents() {
        // 全局错误处理
        window.addEventListener('error', (e) => {
            console.error('全局错误:', e.error);
            ToastManager.error('发生了一个错误，请刷新页面重试');
        });

        // 全局Promise拒绝处理
        window.addEventListener('unhandledrejection', (e) => {
            console.error('未处理的Promise拒绝:', e.reason);
            ToastManager.error('请求处理失败，请稍后重试');
        });

        // 页面可见性变化
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                EventBus.emit('page:hidden');
            } else {
                EventBus.emit('page:visible');
            }
        });

        // 窗口大小变化
        window.addEventListener('resize', Utils.throttle(() => {
            const deviceInfo = Utils.getDeviceInfo();
            EventBus.emit('device:change', deviceInfo);
        }, 250));
    }

    async initPage() {
        // 根据当前页面初始化特定逻辑
        const pageName = this.getCurrentPageName();

        // 执行页面特定的初始化函数
        const pageInitFunction = window[`${pageName}PageInit`];
        if (typeof pageInitFunction === 'function') {
            await pageInitFunction();
        }

        EventBus.emit('page:loaded', { pageName });
    }

    getCurrentPageName() {
        const path = window.location.pathname;
        const pageName = path.split('/').pop().replace('.html', '') || 'index';
        return pageName.charAt(0).toUpperCase() + pageName.slice(1);
    }
}

// 创建全局应用实例
window.App = new App();

// DOM加载完成后初始化应用
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.App.init();
    });
} else {
    window.App.init();
}

// 图片懒加载和性能优化
const ImageLoader = {
    init() {
        this.initLazyLoading();
        this.initImageOptimization();
    },

    initLazyLoading() {
        // 检查是否支持Intersection Observer
        if ('IntersectionObserver' in window) {
            this.lazyLoadWithObserver();
        } else {
            this.lazyLoadWithScroll();
        }
    },

    lazyLoadWithObserver() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        // 观察所有懒加载图片
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    },

    lazyLoadWithScroll() {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const lazyLoad = () => {
            lazyImages.forEach(img => {
                if (this.isElementInViewport(img)) {
                    this.loadImage(img);
                }
            });
        };

        // 初始加载
        lazyLoad();

        // 滚动时加载
        window.addEventListener('scroll', Utils.throttle(lazyLoad, 200));
        window.addEventListener('resize', Utils.throttle(lazyLoad, 200));
    },

    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;

        // 添加加载状态
        img.classList.add('lazy-loading');

        // 创建新图片对象预加载
        const newImg = new Image();

        newImg.onload = () => {
            img.src = src;
            img.classList.remove('lazy-loading');
            img.classList.add('loaded');
            img.classList.add('lazy-load');

            // 移除data-src属性
            img.removeAttribute('data-src');

            // 添加加载完成动画
            requestAnimationFrame(() => {
                img.classList.add('loaded');
            });
        };

        newImg.onerror = () => {
            img.classList.remove('lazy-loading');
            img.classList.add('error');

            // 使用默认图片
            img.src = this.getDefaultImage();
        };

        // 开始加载
        newImg.src = src;
    },

    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight + 200) &&
            rect.bottom >= -200 &&
            rect.left <= (window.innerWidth + 200) &&
            rect.right >= -200
        );
    },

    getDefaultImage() {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMUYxRjFGIi8+CjxwYXRoIGQ9Ik0yMDAgMTIwQzIyMi4wOTEgMTIwIDI0MCAxMzcuOTA5IDI0MCAxNjBDMjQwIDE4Mi4wOTEgMjIyLjA5MSAyMDAgMjAwIDIwMEMxNzcuOTA5IDIwMCAxNjAgMTgyLjA5MSAxNjAgMTYwQzE2MCAxMzcuOTA5IDE3Ny45MDkgMTIwIDIwMCAxMjBaIiBmaWxsPSIjMzMzIi8+CjxwYXRoIGQ9Ik0yMDAgMTQwQzIxMS4wNDYgMTQwIDIyMCAxNDguOTU0IDIyMCAxNjBDMjIwIDE3MS4wNDYgMjExLjA0NiAxODAgMjAwIDE4MEMxODguOTU0IDE4MCAxODAgMTcxLjA0NiAxODAgMTYwQzE4MCAxNDguOTU0IDE4OC45NTQgMTQwIDIwMCAxNDBaIiBmaWxsPSIjMUYxRjFGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2IiBmb250LXNpemU9IjE2IiBmb250LWZhbWlseT0iQXJpYWwiPuWbvueJh+a1i+ivleinhu+ekg==</svg>';
    },

    initImageOptimization() {
        // 为所有图片添加响应式支持
        document.querySelectorAll('img').forEach(img => {
            if (!img.classList.contains('responsive-image')) {
                img.classList.add('responsive-image');
            }

            // 添加错误处理
            img.addEventListener('error', () => {
                if (!img.classList.contains('error-handled')) {
                    img.classList.add('error-handled');
                    img.src = this.getDefaultImage();
                }
            });
        });
    },

    // 创建骨架屏
    createSkeleton(width, height, type = 'card') {
        const skeleton = document.createElement('div');
        skeleton.className = `skeleton skeleton-${type}`;
        skeleton.style.width = width + 'px';
        skeleton.style.height = height + 'px';
        return skeleton;
    },

    // 预加载关键图片
    preloadCriticalImages(images) {
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
};

// 导出全局对象
window.CONFIG = CONFIG;
window.Utils = Utils;
window.EventBus = EventBus;
window.HTTP = HTTP;
window.ModalManager = ModalManager;
window.FormValidator = FormValidator;
window.ImageLoader = ImageLoader;