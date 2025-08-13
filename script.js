// 平滑滚动功能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// 功能卡片动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有功能卡片
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// 改进：统计数字动画支持小数与“+”号
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const raw = stat.textContent.trim();
        const hasPlus = raw.endsWith('+');
        const numericPart = raw.replace(/\+/g, '');
        const target = parseFloat(numericPart);
        const decimals = (numericPart.split('.')[1] || '').length;
        let current = 0;
        const steps = 50;
        const increment = target / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            const val = decimals > 0 ? current.toFixed(decimals) : Math.floor(current).toString();
            stat.textContent = val + (hasPlus ? '+' : '');
        }, 30);
    });
}
  

// 当统计区域进入视口时触发动画
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// 移动端菜单切换（如果需要的话）
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // 创建移动端菜单按钮
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.display = 'none';
    
    // 添加移动端菜单样式
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
                background: none;
                border: none;
                font-size: 24px;
                color: #333;
                cursor: pointer;
                padding: 10px;
            }
            
            .nav-links {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 20px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
                pointer-events: none;
            }
            
            .nav-links.active {
                transform: translateY(0);
                opacity: 1;
                pointer-events: all;
            }
            
            .nav-links a {
                padding: 15px 0;
                border-bottom: 1px solid #eee;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 插入移动端菜单按钮
    navbar.querySelector('.nav-container').appendChild(mobileMenuBtn);
    
    // 移动端菜单切换
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // 点击链接后关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 添加一些微交互效果
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 图片懒加载（如果有多张图片的话）
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 初始化懒加载
lazyLoadImages();

// =====================
// 多语言（中/英）支持
// =====================
const I18N_DICTIONARY = {
    zh: {
        'nav.features': '功能特色',
        'nav.download': '下载',
        'nav.about': '关于我们',

        'hero.title': '与萨摩耶的心灵旅程',
        'hero.subtitle': 'SamoDiary 是一款温柔、疗愈的日记与认知训练 App。走进魔法森林，与可爱的萨摩耶伙伴一同探索情绪，发现更好的自己。',
        'hero.download': '立即下载',
        'hero.learnMore': '了解更多',

        'features.title': '功能特色',
        'features.emotion.title': '情绪记录与日记',
        'features.emotion.desc': '快速记录每日心情与事件，用简洁温暖的界面，让记录成为一种享受。',
        'features.practice.title': '情绪觉察与练习',
        'features.practice.desc': '呼吸训练、情绪识别、反思小测等多种轻量练习，根据当下心情智能推荐，随时随地温柔照顾自己。',
        'features.ai.title': 'AI 向导与互动',
        'features.ai.desc': 'Nova（冥想）与 Sola（积极心理）两位 AI 向导，以不同风格的对话，引领你进入小游戏与情绪反思。',
        'features.gamification.title': '主线与日常任务',
        'features.gamification.desc': '主线剧情修复魔法森林，章节解锁新区域与角色；日常任务则提供短时、独立的情绪照顾活动。',
        'features.privacy.title': '数据与隐私',
        'features.privacy.desc': '本地存储 + 云端备份双重保障，支持加密与锁定功能，让每一份记录都安全私密。',
        'features.healing.title': '温柔疗愈空间',
        'features.healing.desc': '在忙碌生活中，留一方温柔的角落，停下来关注自己的情绪，慢慢建立稳定的自我照顾习惯。',

        'guides.title': '情绪向导',
        'guides.nova.role': '冥想向导',
        'guides.nova.desc': '带你用冥想与呼吸找到内心平静，让日常也有安宁的片刻。',
        'guides.sola.role': '积极心理向导',
        'guides.sola.desc': '用明亮的语言和互动，引导你发现生活中的美好，培养积极心态与健康自我认知。',


        'download.title': '立即下载',
        'download.subtitle': '在App Store下载SamoDiary',
        'download.version': '支持iOS 17.0及以上版本',
        'download.website': '官方网站:',

        'about.title': '关于SamoDiary',
        'about.mission': 'SamoDiary诞生于对用户心理健康的深深关怀。我们相信，每一个人都值得被温柔对待，包括自己。',
        'about.purpose': '我们的使命是帮助用户在日常生活中建立稳定的自我照顾习惯，通过轻量、低压力的互动，让情绪管理变得简单而有效。',
        'about.vision': '无论您是在面对压力、情绪低落，还是单纯想记录美好瞬间，SamoDiary都能作为一个贴心的陪伴者，陪您走过每一天的旅程。',
        'about.stats.users': '活跃用户',
        'about.stats.moments': '美好回忆',
        'about.stats.rating': '用户评分',

        'footer.tagline': '给情绪一个温柔的家',
        'footer.quickLinks': '快速链接',
        'footer.contact': '联系信息',
        'footer.website': '官方网站: samodiary.com',
        'footer.mail': '官方邮箱: samodiary@gmail.com',
        'footer.rights': '版权所有。',

        '__meta.title': 'SamoDiary - 您的温柔情绪伴侣',
        '__meta.desc': 'SamoDiary是一款轻量疗愈型日记与情绪练习应用，帮助用户更温柔地自我照顾。'
    },
    en: {
        'nav.features': 'Features',
        'nav.download': 'Download',
        'nav.about': 'About',

        'hero.title': 'A Heartfelt Journey with Your Samoyed',
        'hero.subtitle': 'SamoDiary is a gentle, healing journaling and cognitive training app. Step into a magical forest with your adorable Samoyed companion to explore emotions and discover a better you.',
        'hero.download': 'Download Now',
        'hero.learnMore': 'Learn More',

        'features.title': 'Key Features',
        'features.emotion.title': 'Emotion Tracking & Journaling',
        'features.emotion.desc': 'Quickly capture your daily moods and events with a warm, minimal interface that makes journaling a pleasure.',
        'features.practice.title': 'Emotional Awareness & Exercises',
        'features.practice.desc': 'Breathing practices, emotion recognition, and mini reflection quizzes — intelligently recommended based on your current mood, so you can care for yourself anytime, anywhere.',
        'features.ai.title': 'AI Guides & Interaction',
        'features.ai.desc': 'Two AI guides — Nova (meditation) and Sola (positive psychology) — lead you through mini-games and emotional reflection with their distinct styles.',
        'features.gamification.title': 'Story Mode & Daily Quests',
        'features.gamification.desc': 'Follow the main storyline to restore the magical forest, unlocking new areas and characters with each chapter. Daily quests offer short, standalone emotional self-care activities.',
        'features.privacy.title': 'Data & Privacy',
        'features.privacy.desc': 'Dual protection with local storage and cloud backup. Supports encryption and app lock to keep every record safe and private.',
        'features.healing.title': 'A Gentle Healing Space',
        'features.healing.desc': 'Amid a busy life, find a gentle corner to pause, check in with your emotions, and gradually build a steady self-care habit.',

        'guides.title': 'Emotional Guides',
        'guides.nova.role': 'Meditation Guide',
        'guides.nova.desc': 'Helps you find inner calm through meditation and breathing exercises, creating moments of tranquility in your day.',
        'guides.sola.role': 'Positive Psychology Guide',
        'guides.sola.desc': 'Uses uplifting language and interaction to help you notice life’s beauty, cultivate positivity, and strengthen healthy self-awareness.',


        'download.title': 'Download now',
        'download.subtitle': 'Get SamoDiary on the App Store',
        'download.version': 'Supports iOS 17.0 and later',
        'download.website': 'Website:',

        'about.title': 'About SamoDiary',
        'about.mission': 'Born from deep care for mental well-being. Everyone deserves to be treated gently — including yourself.',
        'about.purpose': 'Our mission is to help you build steady self-care habits through short, low-pressure interactions that make emotion care simple and effective.',
        'about.vision': 'Whether facing stress, feeling low, or simply recording a beautiful moment, SamoDiary is a warm companion by your side every day.',
        'about.stats.users': 'Active users',
        'about.stats.moments': 'Cherished moments',
        'about.stats.rating': 'User rating',

        'footer.tagline': 'A gentle space for your emotions',
        'footer.quickLinks': 'Quick links',
        'footer.contact': 'Contact',
        'footer.website': 'Website: samodiary.com',
        'footer.mail': 'Email: samodiary@gmail.com',
        'footer.rights': 'All rights reserved.',

        '__meta.title': 'SamoDiary - Your gentle emotional companion',
        '__meta.desc': 'SamoDiary is a lightweight emotional journal with soothing practices to help you care for yourself more gently.'
    }
};

function applyLanguage(lang) {
    const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY.zh;

    // 更新所有带 data-i18n 的元素文本
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = dict[key];
        if (typeof text === 'string') {
            el.textContent = text;
        }
    });

    // 更新标题与描述
    document.title = dict['__meta.title'];
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', dict['__meta.desc']);

    // 设置 html lang
    document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');

    // 切换按钮样式
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // 记忆语言
    try { localStorage.setItem('samodiary_lang', lang); } catch (e) {}
}

function initI18n() {
    // 隐藏日文按钮（如存在）
    const jaBtn = document.querySelector('.lang-btn[data-lang="ja"]');
    if (jaBtn) jaBtn.style.display = 'none';

    // 默认中文，优先使用本地记忆
    let lang = 'zh';
    try {
        const saved = localStorage.getItem('samodiary_lang');
        if (saved && (saved === 'zh' || saved === 'en')) lang = saved;
    } catch (e) {}

    applyLanguage(lang);

    // 绑定按钮事件
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const target = btn.dataset.lang;
        if (target === 'zh' || target === 'en') {
            btn.addEventListener('click', () => applyLanguage(target));
        }
    });
}

// 追加：i18n 文案扩展（保持原有字典不变，仅补充缺失键）
(function extendI18n(){
    if(!window || !window.document) return;
    const dict = typeof I18N_DICTIONARY !== 'undefined' ? I18N_DICTIONARY : null;
    if(!dict) return;
    // 中文
    dict.zh['nav.support'] = '支持与社区';
    dict.zh['support.title'] = '支持与社区';
    dict.zh['support.github.title'] = '支持与常见问题（GitHub）';
    dict.zh['support.github.desc'] = '访问我们的支持站点，查看常见问题与最新公告。';
    dict.zh['support.github.btn'] = '前往 Support 仓库';
    dict.zh['support.community.title'] = '社区与更新';
    dict.zh['support.community.desc'] = '在小红书搜索账号“Chika不学了”，小红书号 7251358474 以追踪应用最新动态；也可通过主页加入小红书群参与交流。';
    dict.zh['footer.icpLabel'] = 'ICP备案号：';
    dict.zh['footer.supportLink'] = '支持站点（GitHub）';

    // 英文
    dict.en['nav.support'] = 'Support & Community';
    dict.en['support.title'] = 'Support & Community';
    dict.en['support.github.title'] = 'Support and FAQs (GitHub)';
    dict.en['support.github.desc'] = 'Visit our support site for FAQs and announcements.';
    dict.en['support.github.btn'] = 'Open Support Repo';
    dict.en['support.community.title'] = 'Community & Updates';
    dict.en['support.community.desc'] = 'Search on Xiaohongshu for account “Chika不学了” (ID 7251358474) to follow updates and join the community group.';
    dict.en['footer.icpLabel'] = 'ICP Filing No:';
    dict.en['footer.supportLink'] = 'Support (GitHub)';
})();

// 初始化多语言
document.addEventListener('DOMContentLoaded', initI18n); 