(function () {
  /* ---------- language ---------- */
  /* First visit: open in the visitor's own language (Dutch browsers -> NL,
     everyone else -> EN). A manual choice is remembered and always wins. */
  var savedLang = localStorage.getItem('nomoclub-lang');
  if (savedLang !== 'nl' && savedLang !== 'en') {
    savedLang = detectLang();
  }
  setLang(savedLang);

  document.querySelectorAll('.langtoggle button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });

  function detectLang() {
    var list = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || 'en'];
    for (var i = 0; i < list.length; i++) {
      if ((list[i] || '').toLowerCase().indexOf('nl') === 0) return 'nl';
    }
    return 'en';
  }

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
    if (['eur', 'gbp', 'usd', 'aud'].indexOf(cur) === -1) cur = 'gbp';
    document.querySelectorAll('.cur').forEach(function (el) {
      var v = el.getAttribute('data-' + cur);
      if (v) el.textContent = v;
    });
    document.querySelectorAll('.curswitch button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-cur') === cur);
    });
    if (persist) localStorage.setItem('nomoclub-cur', cur);
  }

  /* ---------- click-to-play YouTube player (privacy-friendly) ---------- */
  /* No YouTube cookies are set until the visitor presses play. */
  document.querySelectorAll('.ytfacade').forEach(function (f) {
    f.addEventListener('click', function () {
      var id = f.getAttribute('data-id');
      if (!id) return;
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = f.getAttribute('data-title') || 'Nomoclub Music';
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', '');
      f.innerHTML = '';
      f.appendChild(iframe);
    });
  });
})();
