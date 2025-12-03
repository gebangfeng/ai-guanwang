// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {

    // 移动端菜单切换
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // 添加滚动阴影
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // 滚动动画 - Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.scroll-reveal');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // 如果是空的#或者只是#，不做处理
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 联系表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 获取表单数据
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // 这里应该发送到后端API
            console.log('表单数据:', formData);

            // 显示成功消息
            alert('感谢您的留言！我们会尽快与您联系。');

            // 重置表单
            contactForm.reset();
        });
    }

    // 按钮点击动画效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 为"立即体验"等按钮添加波纹效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 为波纹效果添加样式
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // 价格卡片悬停效果增强
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
            } else {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            }
        });
    });

    // 特性卡片交互效果
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 输入框焦点效果
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });

    // 页面加载动画
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // 返回顶部按钮（可选功能）
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.className = 'back-to-top';
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--gradient);
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: var(--shadow);
        `;

        document.body.appendChild(button);

        // 显示/隐藏按钮
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });

        // 点击返回顶部
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // 悬停效果
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    };

    // 创建返回顶部按钮
    createBackToTopButton();

    // 懒加载图片（如果有图片的话）
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    };

    lazyLoadImages();

    // 添加键盘导航支持
    document.addEventListener('keydown', function(e) {
        // ESC键关闭移动菜单
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // 性能优化：防抖函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 监听窗口大小变化
    const handleResize = debounce(() => {
        // 如果窗口变大，关闭移动菜单
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    }, 250);

    window.addEventListener('resize', handleResize);

    // 价格方案标签切换功能
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    const pricingContents = document.querySelectorAll('.pricing-content');

    if (pricingTabs.length > 0) {
        pricingTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // 移除所有active类
                pricingTabs.forEach(t => t.classList.remove('active'));
                pricingContents.forEach(c => c.classList.remove('active'));

                // 添加active类到当前标签和对应内容
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                const targetContent = document.getElementById(tabId);

                if (targetContent) {
                    targetContent.classList.add('active');

                    // 平滑滚动到内容区域
                    setTimeout(() => {
                        const yOffset = -100; // 导航栏高度
                        const element = targetContent;
                        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

                        window.scrollTo({top: y, behavior: 'smooth'});
                    }, 100);
                }
            });
        });
    }

    // 检查 URL 中是否有 hash 标签，用于直接跳转到特定标签
    if (window.location.hash === '#claude-code') {
        // 延迟执行，确保页面元素已加载
        setTimeout(() => {
            activateClaudeCodeTab();
        }, 300);
    }

    console.log('AI智能助手网站已加载完成！');
});

// 滚动到闲鱼购买联系方式
function scrollToXianyu() {
    const xianyuSection = document.getElementById('xianyuContact');
    if (xianyuSection) {
        const yOffset = -80;
        const y = xianyuSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });
    }
}

// 复制闲鱼购买链接
function copyXianyuLink() {
    const linkText = '【闲鱼】https://m.tb.cn/h.SA1qHNu?tk=n5xhfKwxLtF CZ356 「我在闲鱼发布了【【包售后】claude code月卡套餐】」';

    // 尝试使用现代剪贴板API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(linkText).then(function() {
            showCopySuccess();
        }).catch(function(err) {
            // 如果失败，使用传统方法
            fallbackCopyText(linkText);
        });
    } else {
        // 使用传统方法
        fallbackCopyText(linkText);
    }
}

// 传统复制方法（兼容旧浏览器）
function fallbackCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.top = '0';
    textarea.style.left = '0';
    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess();
        } else {
            showCopyError();
        }
    } catch (err) {
        showCopyError();
    }

    document.body.removeChild(textarea);
}

// 显示复制成功提示
function showCopySuccess() {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.innerHTML = '✅ 链接已复制！请在浏览器或微信中打开';
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #07c160 0%, #00d976 100%);
        color: white;
        padding: 1.5rem 2.5rem;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 600;
        box-shadow: 0 10px 40px rgba(7, 193, 96, 0.4);
        z-index: 10000;
        animation: slideInDown 0.3s ease;
        text-align: center;
        max-width: 90%;
    `;

    document.body.appendChild(toast);

    // 3秒后自动消失
    setTimeout(() => {
        toast.style.animation = 'slideOutUp 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);

    // 添加动画样式
    if (!document.getElementById('toast-animations')) {
        const style = document.createElement('style');
        style.id = 'toast-animations';
        style.textContent = `
            @keyframes slideInDown {
                from {
                    opacity: 0;
                    transform: translate(-50%, -150%);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
            }
            @keyframes slideOutUp {
                from {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
                to {
                    opacity: 0;
                    transform: translate(-50%, -150%);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 显示复制失败提示
function showCopyError() {
    alert('复制失败，请手动复制链接\n\n【闲鱼】https://m.tb.cn/h.SA1qHNu?tk=n5xhfKwxLtF CZ356 「我在闲鱼发布了【【包售后】claude code月卡套餐】」');
}

// 跳转到价格页面的 Claude Code 标签
function navigateToClaudeCode(event) {
    event.preventDefault();

    // 跳转到价格页面
    window.location.href = 'pricing.html#claude-code';

    // 如果已经在价格页面，则激活 Claude Code 标签
    setTimeout(() => {
        if (window.location.pathname.includes('pricing.html')) {
            activateClaudeCodeTab();
        }
    }, 100);
}

// 激活 Claude Code 标签（用于价格页面）
function activateClaudeCodeTab() {
    const claudeCodeTab = document.querySelector('.pricing-tab[data-tab="claude-code"]');
    const claudeCodeContent = document.getElementById('claude-code');

    if (claudeCodeTab && claudeCodeContent) {
        // 移除所有活动状态
        document.querySelectorAll('.pricing-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.pricing-content').forEach(content => content.classList.remove('active'));

        // 激活 Claude Code 标签
        claudeCodeTab.classList.add('active');
        claudeCodeContent.classList.add('active');

        // 滚动到内容区域
        setTimeout(() => {
            const yOffset = -100;
            const y = claudeCodeContent.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
    }
}
