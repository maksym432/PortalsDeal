(function () {
    const tabbar = document.querySelector('.tabbar');
    const buttons = Array.from(tabbar.querySelectorAll('button'));
    const screens = Array.from(document.querySelectorAll('.screen'));
    
    // Custom selects functionality
    document.querySelectorAll('.custom-select').forEach((cs) => {
      const trigger = cs.querySelector('.cs-trigger');
      const list = cs.querySelector('.cs-list');
      const valueSpan = cs.querySelector('.cs-value');
      const hidden = cs.querySelector('input[type="hidden"]');
  
      trigger.addEventListener('click', () => {
        const expanded = cs.getAttribute('aria-expanded') === 'true';
        document.querySelectorAll('.custom-select[aria-expanded="true"]').forEach(el => { 
          if (el !== cs) el.setAttribute('aria-expanded', 'false'); 
        });
        cs.setAttribute('aria-expanded', String(!expanded));
      });
  
      list.addEventListener('click', (e) => {
        const option = e.target.closest('.cs-option');
        if (!option) return;
        list.querySelectorAll('.cs-option').forEach(o => o.classList.toggle('selected', o === option));
        const optEmoji = option.querySelector('.emoji')?.textContent || '';
        const triggerEmojiSpan = trigger.querySelector('.emoji');
        if (triggerEmojiSpan) triggerEmojiSpan.textContent = optEmoji;
        valueSpan.textContent = option.textContent.replace(optEmoji, '').trim();
        hidden.value = option.getAttribute('data-value');
        cs.setAttribute('aria-expanded', 'false');
      });
  
      document.addEventListener('click', (e) => {
        if (!cs.contains(e.target)) cs.setAttribute('aria-expanded', 'false');
      });
    });
  
    // Form validation & success
    const submitBtn = document.getElementById('create-submit');
    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        const amountInput = document.querySelector('#screen-create .input-like[type="number"]');
        const descInput = document.querySelector('#screen-create textarea.input-like');
        const success = document.getElementById('status-success');
        const error = document.getElementById('status-error');
  
        success.classList.remove('show');
        error.classList.remove('show');
        error.textContent = '';
  
        const hasAmount = amountInput && String(amountInput.value).trim() !== '';
        const descLen = descInput ? descInput.value.trim().length : 0;
  
        if (!hasAmount && descLen >= 10) {
          error.textContent = 'Нужно указать сумму сделки';
          error.classList.add('show');
          return;
        }
        if (descLen < 10) {
          error.textContent = 'Описание должно содержать минимум 10 символов';
          error.classList.add('show');
          return;
        }
  
        success.classList.add('show');
      });
    }
  
    function activate(targetSelector) {
      buttons.forEach(btn => {
        const isActive = btn.getAttribute('data-target') === targetSelector;
        btn.classList.toggle('active', isActive);
        if (isActive) btn.setAttribute('aria-current', 'page');
        else btn.removeAttribute('aria-current');
      });
  
      const desktopNavButtons = document.querySelectorAll('.nav-link');
      desktopNavButtons.forEach(btn => {
        const isActive = btn.getAttribute('data-target') === targetSelector;
        btn.classList.toggle('active', isActive);
      });
  
      screens.forEach(section => {
        const isActive = '#' + section.id === targetSelector;
        section.classList.toggle('active', isActive);
        if (isActive) resetScreenAnimations(section);
      });
    }
  
    function resetScreenAnimations(screen) {
      if (screen.id === 'screen-profile') {
        const profileHeader = screen.querySelector('.profile-header');
        const profileStats = screen.querySelector('.profile-stats');
        const profileActions = screen.querySelector('.profile-actions');
        const avatarCircle = screen.querySelector('.avatar-circle');
        if (profileHeader) { profileHeader.style.animation = 'none'; profileHeader.offsetHeight; profileHeader.style.animation = 'fadeInUp 0.8s ease-out 0.2s forwards'; }
        if (avatarCircle) { avatarCircle.style.animation = 'none'; avatarCircle.offsetHeight; avatarCircle.style.animation = 'scaleIn 0.6s ease-out 0.4s forwards'; }
        if (profileStats) { profileStats.style.animation = 'none'; profileStats.offsetHeight; profileStats.style.animation = 'fadeInUp 0.8s ease-out 0.6s forwards'; }
        if (profileActions) { profileActions.style.animation = 'none'; profileActions.offsetHeight; profileActions.style.animation = 'fadeInUp 0.8s ease-out 0.8s forwards'; }
      }
      if (screen.id === 'screen-statistics') {
        const formHeader = screen.querySelector('.form-header');
        const cards = screen.querySelectorAll('.card');
        const buttons = screen.querySelectorAll('.btn-primary, .btn-secondary');
        if (formHeader) { formHeader.style.animation = 'none'; formHeader.offsetHeight; formHeader.style.animation = 'fadeInDown 0.8s ease-out 0.1s forwards'; }
        cards.forEach((card, index) => { card.style.animation = 'none'; card.offsetHeight; card.style.animation = `fadeInUp 0.8s ease-out ${0.3 + index * 0.2}s forwards`; });
        buttons.forEach((button, index) => { button.style.animation = 'none'; button.offsetHeight; button.style.animation = `fadeInUp 0.6s ease-out ${0.5 + index * 0.1}s forwards`; });
      }
      const staggerElements = screen.querySelectorAll('.stagger-animation');
      staggerElements.forEach(container => {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
          child.style.animation = 'none';
          child.offsetHeight;
          child.style.animation = `fadeInUp 0.6s ease-out ${0.1 * (index + 1)}s forwards`;
        });
      });
    }
  
    tabbar.addEventListener('click', function (e) {
      const btn = e.target.closest('button');
      if (!btn || !btn.getAttribute('data-target')) return;
      activate(btn.getAttribute('data-target'));
    });
  
    document.addEventListener('click', function (e) {
      const navBtn = e.target.closest('[data-target]');
      if (navBtn) {
        activate(navBtn.getAttribute('data-target'));
      } else {
        const ext = e.target.closest('[data-external]');
        if (ext) window.open(ext.getAttribute('data-external'), '_blank');
      }
    });
  
    window.toggleFaq = function(button) {
      const answer = button.nextElementSibling;
      document.querySelectorAll(".faq-answer").forEach(ans => ans.classList.remove("show"));
      if (!answer.classList.contains("show")) answer.classList.add("show");
    }
  
    function createRandomStars() {
      const starsContainer = document.querySelector(".stars");
      for (let i = 0; i < 20; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.top = Math.random() * 100 + "%";
        star.style.left = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 3 + "s";
        starsContainer.appendChild(star);
      }
    }
  
    createRandomStars();
  
    const translations = {
      ru: {
        profile: 'Профиль',
        statistics: 'Статистика',
        balance: 'Баланс',
        'deals-completed': 'Сделок завершено',
        'top-up-balance': 'Пополнить баланс',
        'top-up-description': 'Добавить средства на счет',
        'statistics-description': 'Подробная информация о ваших сделках',
        'language-settings': 'Язык интерфейса',
        'back-to-profile': 'Назад к профилю',
        'statistics-title': 'Статистика',
        'statistics-subtitle': 'Подробная информация о ваших сделках',
        'general-stats': 'Общая статистика',
        'total-amount': 'Общая сумма транзакций',
        'recent-deals': 'Последние сделки',
        'faq-title': 'FAQ',
        'faq-q1': 'Как начать торговать подарками?',
        'faq-a1': 'Чтобы начать торговать подарками, просто нажмите кнопку "Создать сделку" и следуйте процессу создания сделки. Вам нужно будет подключить свой Telegram аккаунт и подтвердить свою личность.',
        'faq-q2': 'Что делать, если у меня проблема со сделкой?',
        'faq-a2': 'Если у вас возникнут проблемы со сделкой, наша служба поддержки доступна 24/7 для решения любых вопросов. Вы можете связаться с нами через чат поддержки в приложении.',
        'faq-q3': 'Почему стоит использовать бота для торговли подарками?',
        'faq-a3': 'Наш бот предлагает несколько ключевых преимуществ: удобный интерфейс, который делает торговлю простой. Безопасные транзакции для защиты ваших средств и подарков. Широкий выбор подарков. Отличная поддержка клиентов. Это самый простой и безопасный способ торговать подарками в Telegram.'
      },
      en: {
        profile: 'Profile',
        statistics: 'Statistics',
        balance: 'Balance',
        'deals-completed': 'Deals completed',
        'top-up-balance': 'Top up balance',
        'top-up-description': 'Add funds to account',
        'statistics-description': 'Detailed information about your deals',
        'language-settings': 'Interface language',
        'back-to-profile': 'Back to profile',
        'statistics-title': 'Statistics',
        'statistics-subtitle': 'Detailed information about your deals',
        'general-stats': 'General statistics',
        'total-amount': 'Total transaction amount',
        'recent-deals': 'Recent deals',
        'faq-title': 'FAQ',
        'faq-q1': 'How do I start trading gifts?',
        'faq-a1': 'To start trading gifts, simply click the "Create Deal" button and follow the deal creation process. You\'ll need to connect your Telegram account and verify your identity.',
        'faq-q2': 'What if I have a problem with a trade?',
        'faq-a2': 'If you encounter any issues with a trade, our support team is available 24/7 to help resolve any problems. You can contact us through the support chat in the app.',
        'faq-q3': 'Why should I use bot for trading gifts?',
        'faq-a3': 'Our bot offers several key benefits: A user-friendly interface that makes trading simple. Secure transactions to protect your funds and gifts. A wide variety of gifts to choose from. Excellent customer support to assist you whenever needed. It\'s the easiest and safest way to trade gifts within Telegram.'
      }
    };
  
    let currentLanguage = 'ru';
  
    function switchLanguage(language) {
      currentLanguage = language;
      const texts = translations[language];
      Object.keys(texts).forEach(key => {
        const elements = document.querySelectorAll(`[data-i18n="${key}"]`);
        elements.forEach(el => {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = texts[key];
          else el.textContent = texts[key];
        });
      });
    }
  
    const topUpBtn = document.getElementById('btn-top-up');
    if (topUpBtn) {
      topUpBtn.addEventListener('click', () => {
        window.open('http://t.me/send?start=IVJoB5pJLAob', '_blank');
      });
    }
  
    const backToProfileStatsBtn = document.getElementById('back-to-profile-stats');
    if (backToProfileStatsBtn) {
      backToProfileStatsBtn.addEventListener('click', () => {
        activate('#screen-profile');
      });
    }
  
    document.addEventListener('click', (e) => {
      const option = e.target.closest('.cs-option');
      if (option && option.getAttribute('data-value')) {
        const langCode = option.getAttribute('data-value');
        if (document.getElementById('screen-profile').classList.contains('active')) {
          switchLanguage(langCode);
        }
      }
    });
  })();