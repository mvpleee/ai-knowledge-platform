/* AI知识平台 - 认证页面脚本 */

// 认证控制器
class AuthPage {
    constructor() {
        this.mode = this.getModeFromURL();
        this.formData = {};
        this.isSubmitting = false;
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
        this.loadInitialData();
    }

    getModeFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('mode') || 'login';
    }

    render() {
        document.title = this.mode === 'login' ? '登录 - AI知识平台' : '注册 - AI知识平台';

        const container = document.querySelector('.auth-container');
        if (!container) return;

        const isLogin = this.mode === 'login';

        container.innerHTML = `
            <div class="auth-header">
                <div class="auth-logo">AI</div>
                <h1 class="auth-title">${isLogin ? '欢迎回来' : '创建账号'}</h1>
                <p class="auth-subtitle">
                    ${isLogin ? '登录您的AI知识平台账号' : '加入AI知识平台，开启学习之旅'}
                </p>
            </div>

            <form class="auth-form" id="auth-form">
                <div id="auth-message"></div>

                ${!isLogin ? `
                    <div class="form-group">
                        <label class="form-label" for="name">用户名</label>
                        <input type="text" id="name" name="name" class="auth-input" placeholder="请输入用户名" required>
                        <div class="form-error" style="display: none;"></div>
                    </div>
                ` : ''}

                <div class="form-group">
                    <label class="form-label" for="email">邮箱</label>
                    <input type="email" id="email" name="email" class="auth-input" placeholder="请输入邮箱" required>
                    <div class="form-error" style="display: none;"></div>
                </div>

                <div class="form-group">
                    <label class="form-label" for="password">密码</label>
                    <div class="password-input-wrapper">
                        <input type="password" id="password" name="password" class="auth-input" placeholder="请输入密码" required>
                        <button type="button" class="password-toggle" data-target="password">
                            👁️
                        </button>
                    </div>
                    <div class="form-error" style="display: none;"></div>
                    ${!isLogin ? '<div class="password-strength"><div class="password-strength-bar"></div><div class="password-strength-text"></div></div>' : ''}
                </div>

                ${!isLogin ? `
                    <div class="form-group">
                        <label class="form-label" for="confirm-password">确认密码</label>
                        <div class="password-input-wrapper">
                            <input type="password" id="confirm-password" name="confirm-password" class="auth-input" placeholder="请再次输入密码" required>
                            <button type="button" class="password-toggle" data-target="confirm-password">
                                👁️
                            </button>
                        </div>
                        <div class="form-error" style="display: none;"></div>
                    </div>
                ` : ''}

                ${isLogin ? `
                    <div class="auth-options">
                        <label class="remember-me">
                            <input type="checkbox" name="remember">
                            <span>记住我</span>
                        </label>
                        <a href="#" class="forgot-link" data-action="forgot-password">忘记密码？</a>
                    </div>
                ` : ''}

                <button type="submit" class="auth-submit" id="auth-submit">
                    ${isLogin ? '登录' : '注册'}
                </button>
            </form>

            <div class="auth-divider">
                <span>或</span>
            </div>

            <div class="social-login">
                <button class="social-btn google" data-provider="google">
                    <span>🔍</span>
                    <span>使用 Google 登录</span>
                </button>
                <button class="social-btn github" data-provider="github">
                    <span>🐙</span>
                    <span>使用 GitHub 登录</span>
                </button>
                <button class="social-btn wechat" data-provider="wechat">
                    <span>💬</span>
                    <span>使用微信登录</span>
                </button>
            </div>

            <div class="auth-switch">
                ${isLogin ? '还没有账号？' : '已有账号？'}
                <a href="?mode=${isLogin ? 'register' : 'login'}">
                    ${isLogin ? '立即注册' : '立即登录'}
                </a>
            </div>
        `;
    }

    bindEvents() {
        // 表单提交
        const form = document.getElementById('auth-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }

        // 密码显示/隐藏切换
        document.querySelectorAll('.password-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                this.togglePasswordVisibility(btn);
            });
        });

        // 输入验证
        this.bindInputValidation();

        // 第三方登录
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleSocialLogin(btn.dataset.provider);
            });
        });

        // 忘记密码
        document.querySelectorAll('.forgot-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showForgotPassword();
            });
        });
    }

    bindInputValidation() {
        // 邮箱验证
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', () => {
                this.validateEmail(emailInput);
            });
        }

        // 密码验证
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', () => {
                if (this.mode === 'register') {
                    this.checkPasswordStrength(passwordInput.value);
                }
            });

            passwordInput.addEventListener('blur', () => {
                this.validatePassword(passwordInput);
            });
        }

        // 确认密码验证
        const confirmPasswordInput = document.getElementById('confirm-password');
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('blur', () => {
                this.validatePasswordMatch();
            });
        }

        // 用户名验证
        const nameInput = document.getElementById('name');
        if (nameInput) {
            nameInput.addEventListener('blur', () => {
                this.validateUsername(nameInput);
            });
        }
    }

    togglePasswordVisibility(button) {
        const targetId = button.dataset.target;
        const input = document.getElementById(targetId);

        if (input.type === 'password') {
            input.type = 'text';
            button.textContent = '🙈';
        } else {
            input.type = 'password';
            button.textContent = '👁️';
        }
    }

    validateEmail(input) {
        const email = input.value.trim();
        const errorElement = input.parentNode.nextElementSibling;

        if (!email) {
            this.showFieldError(input, '请输入邮箱');
            return false;
        }

        if (!Utils.validateEmail(email)) {
            this.showFieldError(input, '请输入有效的邮箱地址');
            return false;
        }

        this.hideFieldError(input);
        return true;
    }

    validatePassword(input) {
        const password = input.value;
        const errorElement = input.parentNode.nextElementSibling;

        if (!password) {
            this.showFieldError(input, '请输入密码');
            return false;
        }

        if (password.length < 6) {
            this.showFieldError(input, '密码至少需要6个字符');
            return false;
        }

        this.hideFieldError(input);
        return true;
    }

    validatePasswordMatch() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const confirmInput = document.getElementById('confirm-password');

        if (!confirmPassword) {
            this.showFieldError(confirmInput, '请确认密码');
            return false;
        }

        if (password !== confirmPassword) {
            this.showFieldError(confirmInput, '两次输入的密码不一致');
            return false;
        }

        this.hideFieldError(confirmInput);
        return true;
    }

    validateUsername(input) {
        const username = input.value.trim();
        const errorElement = input.parentNode.nextElementSibling;

        if (!username) {
            this.showFieldError(input, '请输入用户名');
            return false;
        }

        if (username.length < 2) {
            this.showFieldError(input, '用户名至少需要2个字符');
            return false;
        }

        if (username.length > 20) {
            this.showFieldError(input, '用户名不能超过20个字符');
            return false;
        }

        if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(username)) {
            this.showFieldError(input, '用户名只能包含字母、数字、下划线和中文');
            return false;
        }

        this.hideFieldError(input);
        return true;
    }

    checkPasswordStrength(password) {
        const strengthBar = document.querySelector('.password-strength-bar');
        const strengthText = document.querySelector('.password-strength-text');

        if (!strengthBar || !strengthText) return;

        let strength = 0;
        let strengthLevel = '';
        let strengthColor = '';

        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;

        if (strength <= 2) {
            strengthLevel = '弱';
            strengthColor = 'weak';
        } else if (strength <= 3) {
            strengthLevel = '中等';
            strengthColor = 'medium';
        } else {
            strengthLevel = '强';
            strengthColor = 'strong';
        }

        strengthBar.className = `password-strength-bar ${strengthColor}`;
        strengthText.textContent = `密码强度: ${strengthLevel}`;
    }

    showFieldError(input, message) {
        input.classList.add('error');
        const errorElement = input.parentNode.nextElementSibling;
        if (errorElement && errorElement.classList.contains('form-error')) {
            errorElement.textContent = message;
            errorElement.style.display = 'flex';
        }
    }

    hideFieldError(input) {
        input.classList.remove('error');
        const errorElement = input.parentNode.nextElementSibling;
        if (errorElement && errorElement.classList.contains('form-error')) {
            errorElement.style.display = 'none';
        }
    }

    async handleSubmit() {
        if (this.isSubmitting) return;

        // 验证表单
        if (!this.validateForm()) {
            return;
        }

        this.isSubmitting = true;
        const submitBtn = document.getElementById('auth-submit');
        const originalText = submitBtn.textContent;

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            const formData = new FormData(document.getElementById('auth-form'));
            const data = Object.fromEntries(formData.entries());

            if (this.mode === 'login') {
                await this.handleLogin(data);
            } else {
                await this.handleRegister(data);
            }
        } catch (error) {
            this.showMessage(error.message, 'error');
        } finally {
            this.isSubmitting = false;
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    validateForm() {
        let isValid = true;

        // 验证邮箱
        const emailInput = document.getElementById('email');
        if (!this.validateEmail(emailInput)) {
            isValid = false;
        }

        // 验证密码
        const passwordInput = document.getElementById('password');
        if (!this.validatePassword(passwordInput)) {
            isValid = false;
        }

        // 注册时额外验证
        if (this.mode === 'register') {
            // 验证用户名
            const nameInput = document.getElementById('name');
            if (!this.validateUsername(nameInput)) {
                isValid = false;
            }

            // 验证密码确认
            if (!this.validatePasswordMatch()) {
                isValid = false;
            }
        }

        return isValid;
    }

    async handleLogin(data) {
        // 模拟登录请求
        await this.simulateRequest(1500);

        // 模拟用户数据
        const users = Utils.storage.get('users', []);
        const user = users.find(u => u.email === data.email && u.password === this.hashPassword(data.password));

        if (!user) {
            throw new Error('邮箱或密码错误');
        }

        // 保存登录状态
        const loginData = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            isPremium: user.isPremium || false,
            loginTime: new Date().toISOString()
        };

        if (data.remember) {
            Utils.storage.set('remembered_user', loginData);
        }

        UserManager.login(loginData);

        this.showMessage('登录成功！正在跳转...', 'success');

        // 跳转到原始页面或首页
        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get('redirect') || 'index.html';

        setTimeout(() => {
            window.location.href = redirect;
        }, 1500);
    }

    async handleRegister(data) {
        // 模拟注册请求
        await this.simulateRequest(2000);

        // 检查邮箱是否已存在
        const users = Utils.storage.get('users', []);
        const existingUser = users.find(u => u.email === data.email);

        if (existingUser) {
            throw new Error('该邮箱已被注册');
        }

        // 创建新用户
        const newUser = {
            id: Utils.generateId(),
            name: data.name,
            email: data.email,
            password: this.hashPassword(data.password),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=7C3AED&color=fff`,
            isPremium: false,
            registerTime: new Date().toISOString()
        };

        users.push(newUser);
        Utils.storage.set('users', users);

        this.showMessage('注册成功！请登录您的账号', 'success');

        // 切换到登录模式
        setTimeout(() => {
            this.switchToLogin();
        }, 1500);
    }

    handleSocialLogin(provider) {
        // 模拟第三方登录
        ToastManager.info(`正在使用 ${provider} 登录...`);

        setTimeout(() => {
            // 模拟第三方登录成功
            const userData = {
                id: Utils.generateId(),
                name: `${provider} 用户`,
                email: `user@${provider}.com`,
                avatar: `https://ui-avatars.com/api/?name=${provider}&background=7C3AED&color=fff`,
                isPremium: false,
                provider: provider,
                loginTime: new Date().toISOString()
            };

            UserManager.login(userData);
            ToastManager.success('登录成功！');

            const urlParams = new URLSearchParams(window.location.search);
            const redirect = urlParams.get('redirect') || 'index.html';

            setTimeout(() => {
                window.location.href = redirect;
            }, 1000);
        }, 1500);
    }

    showForgotPassword() {
        // 显示忘记密码对话框
        const email = prompt('请输入您的注册邮箱：');

        if (email && Utils.validateEmail(email)) {
            ToastManager.info('正在发送重置密码邮件...');

            setTimeout(() => {
                ToastManager.success('重置密码邮件已发送，请查收');
            }, 2000);
        } else if (email) {
            ToastManager.error('请输入有效的邮箱地址');
        }
    }

    switchToLogin() {
        this.mode = 'login';
        window.history.replaceState({}, '', '?mode=login');
        this.render();
        this.bindEvents();
    }

    showMessage(message, type = 'error') {
        const messageContainer = document.getElementById('auth-message');
        if (!messageContainer) return;

        messageContainer.className = `form-${type}`;
        messageContainer.textContent = message;
        messageContainer.style.display = 'flex';

        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 5000);
    }

    loadInitialData() {
        // 加载记住的用户信息
        const rememberedUser = Utils.storage.get('remembered_user');
        if (rememberedUser && this.mode === 'login') {
            const emailInput = document.getElementById('email');
            if (emailInput) {
                emailInput.value = rememberedUser.email;
            }
        }
    }

    hashPassword(password) {
        // 简单的密码哈希（实际应用中应使用更安全的哈希算法）
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // 转换为32位整数
        }
        return hash.toString();
    }

    simulateRequest(delay) {
        return new Promise(resolve => {
            setTimeout(resolve, delay);
        });
    }
}

// 页面初始化函数
function AuthPageInit() {
    // 检查是否在认证页面
    if (!document.body.classList.contains('auth-page')) return;

    // 如果用户已登录，跳转到首页
    if (UserManager.isAuthenticated()) {
        ToastManager.info('您已登录，正在跳转...');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
        return;
    }

    // 创建认证页面实例
    window.authPage = new AuthPage();

    console.log('认证页面初始化完成');
}

// 导出供全局使用
window.AuthPageInit = AuthPageInit;