(function () {
  /* ---------- language (English is the default) ---------- */
  var savedLang = localStorage.getItem('nomoclub-lang') || 'en';
  setLang(savedLang);

  document.querySelectorAll('.langtoggle button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });

  function setLang(lang) {
    if (lang !== 'nl') lang = 'en';
    document.body.classList.toggle('lang-en', lang === 'en');
    document.body.classList.toggle('lang-nl', lang === 'nl');
    document.documentElement.lang = lang;
    document.querySelectorAll('.langtoggle button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    localStorage.setItem('nomoclub-lang', lang);
    // Dutch market is priced in euros; English keeps the chosen currency.
    setCurrency(lang === 'nl' ? 'eur' : (localStorage.getItem('nomoclub-cur') || 'gbp'), lang !== 'nl');
  }

  /* ---------- currency (per country, English view) ---------- */
  document.querySelectorAll('.curswitch button').forEach(function (b) {
    b.addEventListener('click', function () { setCurrency(b.getAttribute('data-cur'), true); });
  });

  function setCurrency(cur, persist) {
    if (['eur', 'gbp', 'usd'].indexOf(cur) === -1) cur = 'gbp';
    document.querySelectorAll('.cur').forEach(function (el) {
      var v = el.getAttribute('data-' + cur);
      if (v) el.textContent = v;
    });
    document.querySelectorAll('.curswitch button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-cur') === cur);
    });
    if (persist) localStorage.setItem('nomoclub-cur', cur);
  }
})();
