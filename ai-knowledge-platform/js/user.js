/* AI知识平台 - 用户中心脚本 */

// 用户数据模拟
const UserData = {
    profile: {
        name: 'AI学习者',
        email: 'user@ai-knowledge-platform.com',
        avatar: null,
        joinDate: '2024-01-01',
        status: 'basic', // basic, premium
        level: 3,
        bio: '专注于AI技术学习的人工智能爱好者'
    },
    stats: {
        articlesRead: 42,
        studyTime: 128, // 小时
        achievements: 8,
        streak: 15 // 连续学习天数
    },
    learningProgress: {
        overall: 68,
        categories: {
            'AI基础': 85,
            '机器学习': 72,
            '深度学习': 45,
            '自然语言处理': 60,
            '计算机视觉': 30
        }
    },
    recentLearning: [
        {
            id: 1,
            title: 'GPT-4技术解析：理解大型语言模型的突破',
            progress: 100,
            lastAccessed: '2024-01-15',
            category: 'AI模型'
        },
        {
            id: 2,
            title: '机器学习入门：从零开始理解ML算法',
            progress: 75,
            lastAccessed: '2024-01-14',
            category: '机器学习'
        },
        {
            id: 3,
            title: '深度学习框架对比：TensorFlow vs PyTorch',
            progress: 30,
            lastAccessed: '2024-01-13',
            category: '深度学习'
        }
    ],
    achievements: [
        {
            id: 1,
            name: '初学者',
            description: '完成第一篇文章学习',
            icon: '🎯',
            unlocked: true,
            unlockedDate: '2024-01-01'
        },
        {
            id: 2,
            name: '坚持学习',
            description: '连续学习7天',
            icon: '📅',
            unlocked: true,
            unlockedDate: '2024-01-08'
        },
        {
            id: 3,
            name: '知识达人',
            description: '阅读50篇文章',
            icon: '📚',
            unlocked: false,
            progress: 42,
            total: 50
        },
        {
            id: 4,
            name: '深度探索者',
            description: '完成所有AI基础课程',
            icon: '🔬',
            unlocked: false,
            progress: 85,
            total: 100
        }
    ],
    notifications: {
        email: true,
        push: false,
        studyReminder: true,
        newArticles: true,
        systemUpdates: false
    }
};

// 用户中心控制器
class UserCenter {
    constructor() {
        this.data = UserData;
        this.currentSection = 'overview';
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderUserProfile();
        this.renderUserStats();
        this.renderLearningProgress();
        this.renderRecentLearning();
        this.renderAchievements();
        this.initNotifications();
        this.initSettings();
        this.checkUserStatus();
    }

    bindEvents() {
        // 侧边栏菜单点击
        document.querySelectorAll('.user-menu-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.switchSection(section);
            });
        });

        // 头像编辑
        const avatarEdit = document.querySelector('.user-avatar-edit');
        if (avatarEdit) {
            avatarEdit.addEventListener('click', () => {
                this.editAvatar();
            });
        }

        // 设置表单提交
        const settingsForm = document.querySelector('.settings-form');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveSettings(e.target);
            });
        }

        // 通知设置
        document.querySelectorAll('.switch input').forEach(switchInput => {
            switchInput.addEventListener('change', (e) => {
                this.updateNotificationSetting(e.target.name, e.target.checked);
            });
        });

        // 删除账户
        const deleteBtn = document.querySelector('.delete-account-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                this.confirmDeleteAccount();
            });
        }
    }

    switchSection(section) {
        // 更新菜单状态
        document.querySelectorAll('.user-menu-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // 更新内容区域
        this.currentSection = section;
        this.renderSection(section);
    }

    renderSection(section) {
        const mainContent = document.querySelector('.user-main');
        if (!mainContent) return;

        let content = '';

        switch (section) {
            case 'overview':
                content = this.renderOverviewSection();
                break;
            case 'learning':
                content = this.renderLearningSection();
                break;
            case 'achievements':
                content = this.renderAchievementsSection();
                break;
            case 'settings':
                content = this.renderSettingsSection();
                break;
            default:
                content = this.renderOverviewSection();
        }

        mainContent.innerHTML = content;
        this.bindSectionEvents(section);
    }

    renderOverviewSection() {
        return `
            <div class="user-header">
                <h1 class="user-title">用户中心</h1>
                <p class="user-subtitle">管理您的学习进度和账户设置</p>
            </div>

            <div class="user-stats">
                <div class="stat-card">
                    <span class="stat-number">${this.data.stats.articlesRead}</span>
                    <div class="stat-label">已读文章</div>
                </div>
                <div class="stat-card">
                    <span class="stat-number">${this.data.stats.studyTime}</span>
                    <div class="stat-label">学习时长(小时)</div>
                </div>
                <div class="stat-card">
                    <span class="stat-number">${this.data.stats.achievements}</span>
                    <div class="stat-label">获得成就</div>
                </div>
                <div class="stat-card">
                    <span class="stat-number">${this.data.stats.streak}</span>
                    <div class="stat-label">连续学习(天)</div>
                </div>
            </div>

            <div class="learning-progress">
                <div class="progress-header">
                    <h2 class="progress-title">学习进度</h2>
                    <span class="progress-percentage">${this.data.learningProgress.overall}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${this.data.learningProgress.overall}%"></div>
                </div>
                <div class="progress-details">
                    <span>总体进度</span>
                    <span>${this.data.learningProgress.overall}% 完成</span>
                </div>
            </div>

            <div class="recent-learning">
                <div class="recent-header">
                    <h2 class="recent-title">最近学习</h2>
                    <a href="articles.html" class="btn btn-outline btn-sm">查看全部</a>
                </div>
                <div class="recent-grid">
                    ${this.data.recentLearning.map(item => `
                        <div class="recent-item" data-id="${item.id}">
                            <h3 class="recent-item-title">${item.title}</h3>
                            <div class="recent-item-meta">
                                <span>${item.category}</span>
                                <span>${item.lastAccessed}</span>
                            </div>
                            <div class="recent-progress">
                                <div class="recent-progress-fill" style="width: ${item.progress}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderLearningSection() {
        return `
            <div class="user-header">
                <h1 class="user-title">学习记录</h1>
                <p class="user-subtitle">查看您的详细学习进度和记录</p>
            </div>

            <div class="learning-progress">
                <h2 class="progress-title">分类学习进度</h2>
                ${Object.entries(this.data.learningProgress.categories).map(([category, progress]) => `
                    <div style="margin-bottom: var(--spacing-lg);">
                        <div class="progress-header">
                            <span class="progress-title" style="font-size: var(--text-base);">${category}</span>
                            <span class="progress-percentage">${progress}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="recent-learning">
                <h2 class="recent-title">学习历史</h2>
                <div class="recent-grid">
                    ${this.data.recentLearning.map(item => `
                        <div class="recent-item" data-id="${item.id}">
                            <h3 class="recent-item-title">${item.title}</h3>
                            <div class="recent-item-meta">
                                <span>${item.category}</span>
                                <span>${item.lastAccessed}</span>
                            </div>
                            <div class="recent-progress">
                                <div class="recent-progress-fill" style="width: ${item.progress}%"></div>
                            </div>
                            <div style="margin-top: var(--spacing-sm); text-align: right;">
                                <span style="font-size: var(--text-xs); color: var(--text-tertiary);">
                                    进度: ${item.progress}%
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderAchievementsSection() {
        return `
            <div class="user-header">
                <h1 class="user-title">成就系统</h1>
                <p class="user-subtitle">查看您获得的学习成就</p>
            </div>

            <div class="achievements">
                <h2 class="achievements-title">获得成就</h2>
                <div class="achievements-grid">
                    ${this.data.achievements.map(achievement => `
                        <div class="achievement-card ${achievement.unlocked ? '' : 'locked'}" data-id="${achievement.id}">
                            <div class="achievement-icon">${achievement.icon}</div>
                            <div class="achievement-name">${achievement.name}</div>
                            <div class="achievement-description">${achievement.description}</div>
                            ${achievement.unlocked ?
                                `<div style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--spacing-xs);">
                                    获得于: ${achievement.unlockedDate}
                                </div>` :
                                achievement.progress !== undefined ?
                                `<div style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--spacing-xs);">
                                    进度: ${achievement.progress}/${achievement.total}
                                </div>` : ''
                            }
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderSettingsSection() {
        return `
            <div class="user-header">
                <h1 class="user-title">账户设置</h1>
                <p class="user-subtitle">管理您的个人信息和偏好设置</p>
            </div>

            <form class="settings-form">
                <div class="settings-section">
                    <h2 class="settings-section-title">基本信息</h2>
                    <div class="settings-grid">
                        <div class="settings-group">
                            <label class="settings-label">姓名</label>
                            <input type="text" class="settings-input" name="name" value="${this.data.profile.name}">
                        </div>
                        <div class="settings-group">
                            <label class="settings-label">邮箱</label>
                            <input type="email" class="settings-input" name="email" value="${this.data.profile.email}">
                        </div>
                        <div class="settings-group" style="grid-column: 1 / -1;">
                            <label class="settings-label">个人简介</label>
                            <textarea class="settings-textarea" name="bio" rows="4">${this.data.profile.bio}</textarea>
                        </div>
                    </div>
                </div>

                <div class="settings-section">
                    <h2 class="settings-section-title">通知设置</h2>
                    <div class="notification-settings">
                        <div class="notification-item">
                            <div class="notification-info">
                                <div class="notification-title">邮件通知</div>
                                <div class="notification-description">接收学习进度和新文章邮件提醒</div>
                            </div>
                            <label class="switch">
                                <input type="checkbox" name="email" ${this.data.notifications.email ? 'checked' : ''}>
                                <span class="switch-slider"></span>
                            </label>
                        </div>
                        <div class="notification-item">
                            <div class="notification-info">
                                <div class="notification-title">推送通知</div>
                                <div class="notification-description">浏览器推送通知</div>
                            </div>
                            <label class="switch">
                                <input type="checkbox" name="push" ${this.data.notifications.push ? 'checked' : ''}>
                                <span class="switch-slider"></span>
                            </label>
                        </div>
                        <div class="notification-item">
                            <div class="notification-info">
                                <div class="notification-title">学习提醒</div>
                                <div class="notification-description">每日学习时间提醒</div>
                            </div>
                            <label class="switch">
                                <input type="checkbox" name="studyReminder" ${this.data.notifications.studyReminder ? 'checked' : ''}>
                                <span class="switch-slider"></span>
                            </label>
                        </div>
                        <div class="notification-item">
                            <div class="notification-info">
                                <div class="notification-title">新文章通知</div>
                                <div class="notification-description">有新文章发布时通知</div>
                            </div>
                            <label class="switch">
                                <input type="checkbox" name="newArticles" ${this.data.notifications.newArticles ? 'checked' : ''}>
                                <span class="switch-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="settings-actions">
                    <button type="button" class="btn btn-secondary">取消</button>
                    <button type="submit" class="btn btn-primary">保存设置</button>
                </div>
            </form>

            <div class="settings-section" style="margin-top: var(--spacing-2xl);">
                <h2 class="settings-section-title">危险操作</h2>
                <div class="delete-warning">
                    <strong>警告：</strong> 删除账户后，所有数据将无法恢复。
                </div>
                <button type="button" class="btn btn-outline delete-account-btn">删除账户</button>
            </div>
        `;
    }

    bindSectionEvents(section) {
        // 最近学习项目点击
        document.querySelectorAll('.recent-item').forEach(item => {
            item.addEventListener('click', () => {
                const articleId = item.dataset.id;
                window.location.href = `article.html?id=${articleId}`;
            });
        });

        // 成就徽章点击
        document.querySelectorAll('.achievement-card').forEach(badge => {
            badge.addEventListener('click', () => {
                const achievementId = badge.dataset.id;
                this.showAchievementDetails(achievementId);
            });
        });

        // 设置表单提交
        const settingsForm = document.querySelector('.settings-form');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveSettings(e.target);
            });
        }

        // 通知设置
        document.querySelectorAll('.switch input').forEach(switchInput => {
            switchInput.addEventListener('change', (e) => {
                this.updateNotificationSetting(e.target.name, e.target.checked);
            });
        });
    }

    renderUserProfile() {
        const userName = document.querySelector('.user-name');
        const userEmail = document.querySelector('.user-email');
        const userStatus = document.querySelector('.user-status');
        const userAvatar = document.querySelector('.user-avatar');

        if (userName) userName.textContent = this.data.profile.name;
        if (userEmail) userEmail.textContent = this.data.profile.email;
        if (userStatus) {
            userStatus.textContent = this.data.profile.status === 'premium' ? '高级会员' : '普通用户';
            userStatus.className = `user-status ${this.data.profile.status}`;
        }
        if (userAvatar && this.data.profile.avatar) {
            userAvatar.innerHTML = `<img src="${this.data.profile.avatar}" alt="${this.data.profile.name}">`;
        }
    }

    renderUserStats() {
        // 在渲染section时已经包含
    }

    renderLearningProgress() {
        // 在渲染section时已经包含
    }

    renderRecentLearning() {
        // 在渲染section时已经包含
    }

    renderAchievements() {
        // 在渲染section时已经包含
    }

    initNotifications() {
        // 初始化通知设置
        this.notifications = this.data.notifications;
    }

    initSettings() {
        // 初始化设置
    }

    checkUserStatus() {
        if (!UserManager.isAuthenticated()) {
            window.location.href = 'auth.html?redirect=user.html';
            return;
        }

        // 检查用户数据
        const user = UserManager.currentUser;
        if (user) {
            this.data.profile = { ...this.data.profile, ...user };
            this.renderUserProfile();
        }

        // 如果是基础用户，显示升级提示
        if (this.data.profile.status === 'basic') {
            this.showUpgradePrompt();
        }
    }

    showUpgradePrompt() {
        const mainContent = document.querySelector('.user-main');
        if (mainContent && !mainContent.querySelector('.upgrade-prompt')) {
            const upgradePrompt = document.createElement('div');
            upgradePrompt.className = 'upgrade-prompt';
            upgradePrompt.innerHTML = `
                <div class="upgrade-prompt-title">升级为高级会员</div>
                <div class="upgrade-prompt-description">
                    解锁所有付费文章，享受无广告阅读体验，获得专属学习资源和工具。
                </div>
                <button class="btn btn-primary" onclick="window.location.href='membership.html'">
                    立即升级
                </button>
            `;
            mainContent.insertBefore(upgradePrompt, mainContent.firstChild);
        }
    }

    editAvatar() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.uploadAvatar(file);
            }
        });
        input.click();
    }

    uploadAvatar(file) {
        // 模拟上传头像
        ToastManager.info('正在上传头像...');

        setTimeout(() => {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.data.profile.avatar = e.target.result;
                const userAvatar = document.querySelector('.user-avatar');
                if (userAvatar) {
                    userAvatar.innerHTML = `<img src="${e.target.result}" alt="${this.data.profile.name}">`;
                }
                ToastManager.success('头像上传成功！');
            };
            reader.readAsDataURL(file);
        }, 1500);
    }

    saveSettings(form) {
        const formData = new FormData(form);
        const settings = {};

        for (let [key, value] of formData.entries()) {
            settings[key] = value;
        }

        // 保存设置
        ToastManager.info('正在保存设置...');

        setTimeout(() => {
            this.data.profile = { ...this.data.profile, ...settings };
            ToastManager.success('设置保存成功！');
            this.renderUserProfile();
        }, 1000);
    }

    updateNotificationSetting(name, value) {
        this.notifications[name] = value;
        ToastManager.success('通知设置已更新');
    }

    confirmDeleteAccount() {
        if (confirm('确定要删除账户吗？此操作不可撤销！')) {
            if (confirm('再次确认：删除账户将永久删除所有数据，是否继续？')) {
                this.deleteAccount();
            }
        }
    }

    deleteAccount() {
        ToastManager.info('正在删除账户...');

        setTimeout(() => {
            ToastManager.success('账户已删除');
            UserManager.logout();
            window.location.href = 'index.html';
        }, 2000);
    }

    showAchievementDetails(achievementId) {
        const achievement = this.data.achievements.find(a => a.id == achievementId);
        if (!achievement) return;

        const details = `
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: var(--spacing-md);">${achievement.icon}</div>
                <h3 style="color: var(--text-primary); margin-bottom: var(--spacing-sm);">${achievement.name}</h3>
                <p style="color: var(--text-secondary); margin-bottom: var(--spacing-md);">${achievement.description}</p>
                ${achievement.unlocked ?
                    `<p style="color: var(--success-color); font-size: var(--text-sm);">
                        获得时间: ${achievement.unlockedDate}
                    </p>` :
                    achievement.progress !== undefined ?
                    `<div style="margin-top: var(--spacing-md);">
                        <div style="background: var(--bg-tertiary); border-radius: 4px; height: 8px; margin-bottom: var(--spacing-xs);">
                            <div style="background: var(--primary-color); height: 100%; width: ${(achievement.progress / achievement.total) * 100}%; border-radius: 4px;"></div>
                        </div>
                        <p style="color: var(--text-tertiary); font-size: var(--text-xs);">
                            进度: ${achievement.progress}/${achievement.total}
                        </p>
                    </div>` :
                    '<p style="color: var(--text-tertiary); font-size: var(--text-sm);">尚未解锁</p>'
                }
            </div>
        `;

        ToastManager.info(details, 5000);
    }
}

// 页面初始化函数
function UserPageInit() {
    // 检查是否在用户中心页面
    if (!document.body.classList.contains('user-page')) return;

    // 创建用户中心实例
    window.userCenter = new UserCenter();

    // 用户中心特定的初始化
    console.log('用户中心初始化完成');

    // 绑定页面可见性事件
    EventBus.on('page:visible', () => {
        // 页面重新可见时刷新数据
        if (window.userCenter) {
            window.userCenter.checkUserStatus();
        }
    });

    // 监听用户登录状态变化
    EventBus.on('user:login', () => {
        // 用户登录后更新界面
        if (window.userCenter) {
            window.userCenter.checkUserStatus();
        }
    });

    EventBus.on('user:logout', () => {
        // 用户登出后跳转到首页
        window.location.href = 'index.html';
    });
}

// 页面SEO优化
function optimizeUserPageSEO() {
    // 动态设置页面标题
    document.title = '用户中心 - AI知识平台';

    // 设置页面描述
    const description = document.querySelector('meta[name="description"]');
    if (description) {
        description.content = 'AI知识平台用户中心 - 管理您的学习进度、成就和账户设置';
    }

    // 设置关键词
    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
        keywords.content = '用户中心,学习进度,个人设置,AI学习,知识管理';
    }
}

// 性能监控
function trackUserPagePerformance() {
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

        console.log(`用户中心页面加载时间: ${loadTime}ms`);
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    optimizeUserPageSEO();
    trackUserPagePerformance();
});

// 导出供全局使用
window.UserPageInit = UserPageInit;