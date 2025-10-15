/* AI知识平台 - 会员中心脚本 */

// 会员套餐数据
const MembershipPlans = [
    {
        id: 'basic',
        name: '基础版',
        price: 0,
        period: '永久免费',
        description: '适合AI学习初学者',
        features: [
            { text: '每月10篇免费文章', included: true },
            { text: '基础学习资源', included: true },
            { text: '社区讨论权限', included: true },
            { text: '所有付费文章', included: false },
            { text: '离线下载', included: false },
            { text: '专家答疑', included: false },
            { text: '专属学习路径', included: false },
            { text: '优先客服支持', included: false }
        ],
        buttonText: '当前套餐',
        buttonClass: 'current',
        popular: false
    },
    {
        id: 'premium-monthly',
        name: '高级版',
        price: 29,
        period: '每月',
        description: '适合持续学习者',
        features: [
            { text: '无限文章阅读', included: true },
            { text: '所有学习资源', included: true },
            { text: '离线下载', included: true },
            { text: '专家答疑', included: true },
            { text: '专属学习路径', included: true },
            { text: '优先客服支持', included: true },
            { text: '无广告体验', included: true },
            { text: '学习报告分析', included: true }
        ],
        buttonText: '立即订阅',
        buttonClass: 'primary',
        popular: true
    },
    {
        id: 'premium-yearly',
        name: '专业版',
        price: 299,
        period: '每年',
        description: '适合专业用户和团队',
        originalPrice: 348,
        savings: 49,
        features: [
            { text: '高级版所有功能', included: true },
            { text: '专属课程访问', included: true },
            { text: '1对1专家指导', included: true },
            { text: 'API访问权限', included: true },
            { text: '商业使用许可', included: true },
            { text: '团队协作功能', included: true },
            { text: '定制学习方案', included: true },
            { text: '线下活动优先权', included: true }
        ],
        buttonText: '立即订阅',
        buttonClass: 'primary',
        popular: false
    }
];

// 会员权益数据
const MembershipBenefits = [
    {
        icon: '📚',
        title: '无限阅读',
        description: '访问所有付费文章和深度内容，不受数量限制'
    },
    {
        icon: '💡',
        title: '专家指导',
        description: '获得AI领域专家的个性化指导和答疑服务'
    },
    {
        icon: '🎯',
        title: '学习路径',
        description: '定制化的学习路径，帮助您系统掌握AI技能'
    },
    {
        icon: '📱',
        title: '多端同步',
        description: '手机、平板、电脑无缝同步，随时随地学习'
    },
    {
        icon: '🔥',
        title: '最新资讯',
        description: '第一时间获取AI领域最新动态和技术趋势'
    },
    {
        icon: '🏆',
        title: '专属权益',
        description: '会员专属活动、优惠券和实体礼物等特权'
    }
];

// 常见问题数据
const MembershipFAQ = [
    {
        question: '会员订阅后如何付款？',
        answer: '我们支持支付宝、微信支付、银行卡等多种支付方式。订阅后系统会自动扣费，您也可以随时取消订阅。'
    },
    {
        question: '可以随时取消订阅吗？',
        answer: '是的，您可以随时取消订阅。取消后仍可使用到当前订阅期结束，不会立即失效。'
    },
    {
        question: '付费文章可以离线下载吗？',
        answer: '高级版和专业版会员都支持离线下载功能，您可以下载文章到本地随时阅读。'
    },
    {
        question: '会员价格会变动吗？',
        answer: '订阅后价格将保持不变，即使后续涨价也不会影响您的订阅价格。我们保证价格的稳定性。'
    },
    {
        question: '支持退款吗？',
        answer: '我们提供7天无理由退款保证。如果您对服务不满意，可以在购买后7天内申请全额退款。'
    },
    {
        question: '可以分享会员账号吗？',
        answer: '每个会员账号仅供个人使用，不建议与他人分享。专业版支持团队协作功能，适合企业用户。'
    }
];

// 用户评价数据
const MembershipTestimonials = [
    {
        name: '张同学',
        role: '机器学习工程师',
        content: '高级会员非常值得！付费文章质量很高，专家指导也很专业，帮我快速提升了AI技能。',
        avatar: '👨‍💼',
        rating: 5
    },
    {
        name: '李研究员',
        role: 'AI研究员',
        content: '专业版的1对1指导服务很棒，专家很有耐心，帮我解决了很多研究中的难题。',
        avatar: '👩‍🔬',
        rating: 5
    },
    {
        name: '王开发者',
        role: '全栈开发者',
        content: '学习路径规划得很好，从基础到进阶循序渐进，现在我已经能独立开发AI应用了。',
        avatar: '👨‍💻',
        rating: 4
    },
    {
        name: '陈产品经理',
        role: 'AI产品经理',
        content: '最新的AI资讯很及时，帮我快速了解行业动态，对产品设计很有帮助。',
        avatar: '👩‍💼',
        rating: 5
    },
    {
        name: '刘学生',
        role: '计算机专业学生',
        content: '作为学生，价格很合理，内容质量很高，比很多付费课程都实用。',
        avatar: '👨‍🎓',
        rating: 4
    },
    {
        name: '赵创业者',
        role: 'AI创业者',
        content: '专业版的商业使用许可对我们很重要，团队协作功能也很实用。',
        avatar: '🚀',
        rating: 5
    }
];

// 会员中心控制器
class MembershipCenter {
    constructor() {
        this.plans = MembershipPlans;
        this.benefits = MembershipBenefits;
        this.faq = MembershipFAQ;
        this.testimonials = MembershipTestimonials;
        this.selectedPlan = null;
        this.paymentModal = null;
        this.init();
    }

    init() {
        this.renderPlans();
        this.renderBenefits();
        this.renderFAQ();
        this.renderTestimonials();
        this.bindEvents();
        this.initPaymentModal();
        this.checkUserStatus();
        this.initCountdown();
    }

    bindEvents() {
        // 套餐选择按钮
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('plan-btn')) {
                const planId = e.target.closest('.plan-card').dataset.plan;
                this.selectPlan(planId);
            }
        });

        // 支付方式选择
        document.addEventListener('click', (e) => {
            if (e.target.closest('.payment-method')) {
                this.selectPaymentMethod(e.target.closest('.payment-method'));
            }
        });

        // 支付确认按钮
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('confirm-payment-btn')) {
                this.confirmPayment();
            }
        });

        // 支付模态框关闭
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('payment-modal-close') ||
                e.target.classList.contains('payment-modal')) {
                this.closePaymentModal();
            }
        });

        // FAQ展开/收起
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('faq-question')) {
                this.toggleFAQ(e.target.closest('.faq-item'));
            }
        });
    }

    renderPlans() {
        const plansGrid = document.querySelector('.plans-grid');
        if (!plansGrid) return;

        plansGrid.innerHTML = this.plans.map((plan, index) => `
            <div class="plan-card ${plan.popular ? 'featured' : ''} fade-in-up delay-${index + 1}" data-plan="${plan.id}">
                <div class="plan-header">
                    <h3 class="plan-name">${plan.name}</h3>
                    <div class="plan-price">
                        ${plan.originalPrice ?
                            `<span style="text-decoration: line-through; color: var(--text-tertiary); font-size: var(--text-lg);">¥${plan.originalPrice}</span>` :
                            ''
                        }
                        <span class="plan-currency">¥</span>
                        <span class="plan-amount">${plan.price}</span>
                        <span class="plan-period">/${plan.period}</span>
                    </div>
                    ${plan.savings ?
                        `<div style="color: var(--success-color); font-size: var(--text-sm); font-weight: 600;">
                            节省 ¥${plan.savings}
                        </div>` :
                        ''
                    }
                    <p class="plan-description">${plan.description}</p>
                </div>
                <div class="plan-features">
                    ${plan.features.map(feature => `
                        <div class="plan-feature ${feature.included ? '' : 'disabled'}">
                            <div class="plan-feature-icon">
                                ${feature.included ? '✓' : '✗'}
                            </div>
                            <span>${feature.text}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="plan-action">
                    <button class="plan-btn ${plan.buttonClass}" ${plan.buttonClass === 'current' ? 'disabled' : ''}>
                        ${plan.buttonText}
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderBenefits() {
        const benefitsGrid = document.querySelector('.benefits-grid');
        if (!benefitsGrid) return;

        benefitsGrid.innerHTML = this.benefits.map((benefit, index) => `
            <div class="benefit-card fade-in-up delay-${index + 1}">
                <div class="benefit-icon">${benefit.icon}</div>
                <h3 class="benefit-title">${benefit.title}</h3>
                <p class="benefit-description">${benefit.description}</p>
            </div>
        `).join('');
    }

    renderFAQ() {
        const faqList = document.querySelector('.faq-list');
        if (!faqList) return;

        faqList.innerHTML = this.faq.map((item, index) => `
            <div class="faq-item fade-in-up delay-${index + 1}">
                <button class="faq-question">
                    ${item.question}
                </button>
                <div class="faq-answer">
                    <div class="faq-answer-content">
                        ${item.answer}
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderTestimonials() {
        const testimonialsGrid = document.querySelector('.testimonials-grid');
        if (!testimonialsGrid) return;

        testimonialsGrid.innerHTML = this.testimonials.map((testimonial, index) => `
            <div class="testimonial-card fade-in-up delay-${index + 1}">
                <div class="testimonial-content">
                    <p class="testimonial-text">"${testimonial.content}"</p>
                </div>
                <div class="testimonial-author">
                    <div class="testimonial-avatar">${testimonial.avatar}</div>
                    <div class="testimonial-info">
                        <div class="testimonial-name">${testimonial.name}</div>
                        <div class="testimonial-role">${testimonial.role}</div>
                    </div>
                    <div class="testimonial-rating">
                        ${Array.from({length: 5}, (_, i) =>
                            `<span style="color: ${i < testimonial.rating ? '#FFD700' : 'var(--text-tertiary)'};">★</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    selectPlan(planId) {
        const plan = this.plans.find(p => p.id === planId);
        if (!plan) return;

        // 检查是否是当前套餐
        if (plan.buttonClass === 'current') {
            ToastManager.info('这是您当前的套餐');
            return;
        }

        // 检查是否免费套餐
        if (plan.price === 0) {
            ToastManager.success('您正在使用免费套餐');
            return;
        }

        this.selectedPlan = plan;
        this.openPaymentModal();
    }

    initPaymentModal() {
        // 创建支付模态框
        const modalHTML = `
            <div class="payment-modal" id="paymentModal">
                <div class="payment-modal-content">
                    <button class="payment-modal-close">✕</button>
                    <div class="payment-modal-header">
                        <h2 class="payment-modal-title">确认订阅</h2>
                        <p class="payment-modal-subtitle">
                            ${this.selectedPlan ?
                                `${this.selectedPlan.name} - ¥${this.selectedPlan.price}/${this.selectedPlan.period}` :
                                '选择您要订阅的套餐'
                            }
                        </p>
                    </div>
                    <div class="payment-methods">
                        <div class="payment-method" data-method="alipay">
                            <div class="payment-method-icon">💳</div>
                            <div class="payment-method-info">
                                <div class="payment-method-name">支付宝</div>
                                <div class="payment-method-description">使用支付宝安全支付</div>
                            </div>
                            <div class="payment-method-radio"></div>
                        </div>
                        <div class="payment-method" data-method="wechat">
                            <div class="payment-method-icon">💚</div>
                            <div class="payment-method-info">
                                <div class="payment-method-name">微信支付</div>
                                <div class="payment-method-description">使用微信安全支付</div>
                            </div>
                            <div class="payment-method-radio"></div>
                        </div>
                        <div class="payment-method" data-method="card">
                            <div class="payment-method-icon">💳</div>
                            <div class="payment-method-info">
                                <div class="payment-method-name">银行卡</div>
                                <div class="payment-method-description">支持所有主流银行卡</div>
                            </div>
                            <div class="payment-method-radio"></div>
                        </div>
                    </div>
                    <div class="security-note">
                        🔒 支付安全由第三方平台保障，我们不会存储您的支付信息
                    </div>
                    <div class="payment-modal-actions">
                        <button class="btn btn-secondary" onclick="membershipCenter.closePaymentModal()">取消</button>
                        <button class="btn btn-primary confirm-payment-btn">确认支付 ¥${this.selectedPlan ? this.selectedPlan.price : 0}</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.paymentModal = document.getElementById('paymentModal');
    }

    openPaymentModal() {
        if (!this.paymentModal) {
            this.initPaymentModal();
        }
        this.paymentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closePaymentModal() {
        if (this.paymentModal) {
            this.paymentModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    selectPaymentMethod(methodElement) {
        document.querySelectorAll('.payment-method').forEach(method => {
            method.classList.remove('selected');
        });
        methodElement.classList.add('selected');
    }

    confirmPayment() {
        const selectedMethod = document.querySelector('.payment-method.selected');
        if (!selectedMethod) {
            ToastManager.warning('请选择支付方式');
            return;
        }

        const method = selectedMethod.dataset.method;
        const plan = this.selectedPlan;

        if (!plan) {
            ToastManager.error('请选择订阅套餐');
            return;
        }

        // 模拟支付过程
        ToastManager.info('正在跳转到支付页面...');

        setTimeout(() => {
            this.processPayment(method, plan);
        }, 1500);
    }

    processPayment(method, plan) {
        // 模拟支付成功
        ToastManager.success('支付成功！正在为您开通会员...');

        setTimeout(() => {
            this.activateMembership(plan);
        }, 2000);
    }

    activateMembership(plan) {
        // 更新用户会员状态
        if (window.UserManager && window.UserManager.currentUser) {
            window.UserManager.currentUser.isPremium = true;
            window.UserManager.currentUser.membershipType = plan.id;
            window.UserManager.currentUser.membershipExpiry = this.calculateExpiryDate(plan.period);

            // 保存到本地存储
            Utils.storage.set('currentUser', window.UserManager.currentUser);
        }

        this.closePaymentModal();
        ToastManager.success('🎉 恭喜您成为高级会员！');

        // 跳转到用户中心
        setTimeout(() => {
            window.location.href = 'user.html';
        }, 2000);
    }

    calculateExpiryDate(period) {
        const now = new Date();
        let expiry;

        switch (period) {
            case '每月':
                expiry = new Date(now.setMonth(now.getMonth() + 1));
                break;
            case '每年':
                expiry = new Date(now.setFullYear(now.getFullYear() + 1));
                break;
            default:
                expiry = new Date(now.setMonth(now.getMonth() + 1));
        }

        return expiry.toISOString();
    }

    toggleFAQ(faqItem) {
        const isActive = faqItem.classList.contains('active');

        // 关闭所有其他FAQ项
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // 如果当前项未激活，则激活它
        if (!isActive) {
            faqItem.classList.add('active');
        }
    }

    checkUserStatus() {
        if (window.UserManager && window.UserManager.currentUser) {
            const user = window.UserManager.currentUser;

            // 如果用户已经是会员，更新套餐显示
            if (user.isPremium) {
                this.updatePlansForCurrentUser(user.membershipType);
            }
        }
    }

    updatePlansForCurrentUser(membershipType) {
        const plans = document.querySelectorAll('.plan-card');
        plans.forEach(plan => {
            const planId = plan.dataset.plan;
            const button = plan.querySelector('.plan-btn');

            if (planId === membershipType) {
                button.textContent = '当前套餐';
                button.className = 'plan-btn current';
                button.disabled = true;
            } else if (planId !== 'basic') {
                button.textContent = '升级套餐';
                button.className = 'plan-btn secondary';
            }
        });
    }

    initCountdown() {
        // 模拟限时优惠倒计时
        const countdownElements = document.querySelectorAll('.countdown-number');
        if (countdownElements.length === 0) return;

        // 设置结束时间（7天后）
        const endTime = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                countdownElements.forEach(el => el.textContent = '00');
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (countdownElements[0]) countdownElements[0].textContent = String(days).padStart(2, '0');
            if (countdownElements[1]) countdownElements[1].textContent = String(hours).padStart(2, '0');
            if (countdownElements[2]) countdownElements[2].textContent = String(minutes).padStart(2, '0');
            if (countdownElements[3]) countdownElements[3].textContent = String(seconds).padStart(2, '0');
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
}

// 页面初始化函数
function MembershipPageInit() {
    // 检查是否在会员中心页面
    if (!document.body.classList.contains('membership-page')) return;

    // 创建会员中心实例
    window.membershipCenter = new MembershipCenter();

    // 会员中心特定的初始化
    console.log('会员中心初始化完成');

    // 绑定页面可见性事件
    EventBus.on('page:visible', () => {
        // 页面重新可见时检查用户状态
        if (window.membershipCenter) {
            window.membershipCenter.checkUserStatus();
        }
    });

    // 监听用户登录状态变化
    EventBus.on('user:login', () => {
        // 用户登录后更新套餐显示
        if (window.membershipCenter) {
            window.membershipCenter.checkUserStatus();
        }
    });

    EventBus.on('user:logout', () => {
        // 用户登出后重置套餐显示
        if (window.membershipCenter) {
            location.reload(); // 简单重新加载页面
        }
    });
}

// 页面SEO优化
function optimizeMembershipPageSEO() {
    // 动态设置页面标题
    document.title = '会员中心 - AI知识平台';

    // 设置页面描述
    const description = document.querySelector('meta[name="description"]');
    if (description) {
        description.content = 'AI知识平台会员中心 - 解锁所有付费内容，享受专家指导，定制学习路径，成为AI领域专业人士';
    }

    // 设置关键词
    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
        keywords.content = '会员中心,AI会员,付费内容,专家指导,学习路径,AI课程';
    }
}

// 性能监控
function trackMembershipPagePerformance() {
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

        console.log(`会员中心页面加载时间: ${loadTime}ms`);
    });

    // 监控套餐点击
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('plan-btn')) {
            const planId = e.target.closest('.plan-card').dataset.plan;

            if (window.gtag) {
                window.gtag('event', 'plan_select', {
                    custom_parameter: planId
                });
            }
        }
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    optimizeMembershipPageSEO();
    trackMembershipPagePerformance();
});

// 导出供全局使用
window.MembershipPageInit = MembershipPageInit;