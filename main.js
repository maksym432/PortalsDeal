(function(){
  var tg = window.Telegram?.WebApp;
  var dbg = document.getElementById('dbg');
  var themeToggle = document.getElementById('themeToggle');
  function applyTheme(next){
    if(next === 'light'){
      document.documentElement.setAttribute('data-theme','light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }
  try {
    var saved = localStorage.getItem('wg_theme');
    applyTheme(saved);
  } catch(e) {}
  if (themeToggle){
    themeToggle.addEventListener('click', function(){
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      var next = isLight ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem('wg_theme', next); } catch(e) {}
    });
  }
  if (tg) {
    tg.ready();
    tg.expand();
    tg.MainButton.setText('Отправить');
    tg.MainButton.onClick(() => submitForm());
  }

  var form = document.getElementById('support-form');
  function setDbg(text){ if(dbg) dbg.textContent = text; }

  function submitForm() {
    var data = {
      type: 'support',
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim(),
      contact: document.getElementById('contact').value.trim(),
      lang: document.getElementById('lang').value,
      ts: Date.now()
    };
    if (!data.subject || !data.message) {
      alert('Заполните тему и сообщение');
      return;
    }
    var payload = JSON.stringify(data);
    console.log('Sending WebApp data:', payload);
    setDbg('Отправка...');
    if (tg) {
      try {
        tg.sendData(payload);
        setDbg('Отправлено, можно закрыть окно');
        tg.close();
      } catch (e) {
        console.error('sendData error', e);
        setDbg('Ошибка отправки. Обновите Telegram и попробуйте снова');
        alert('Не удалось отправить данные в Telegram. Обновите приложение.');
      }
    } else {
      alert(payload);
      setDbg('Вне Telegram: показан JSON');
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
  });
})();
