(function () {
  /* ---------- mobiel hamburgermenu ---------- */
  document.querySelectorAll('.navburger').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = document.body.classList.toggle('navopen');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---------- click-to-play YouTube player (all pages) ---------- */
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

  /* ---------- currency switcher (English view) ---------- */
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
  document.querySelectorAll('.curswitch button').forEach(function (b) {
    b.addEventListener('click', function () { setCurrency(b.getAttribute('data-cur'), true); });
  });

  function detectDutch() {
    var list = (navigator.languages && navigator.languages.length)
      ? navigator.languages : [navigator.language || navigator.userLanguage || 'en'];
    return list.some(function (l) { return (l || '').toLowerCase().indexOf('nl') === 0; });
  }

  var toggleLinks = document.querySelectorAll('.langtoggle a');
  var toggleButtons = document.querySelectorAll('.langtoggle button');

  if (toggleLinks.length) {
    /* ---------- single-language pages: / (EN) and /nl (NL) ---------- */
    // Remember the visitor's explicit language choice when they switch.
    toggleLinks.forEach(function (a) {
      a.addEventListener('click', function () {
        localStorage.setItem('nomoclub-lang', a.getAttribute('data-lang'));
      });
    });

    var isEnglish = document.body.classList.contains('lang-en');
    if (isEnglish) {
      setCurrency(localStorage.getItem('nomoclub-cur') || 'gbp', false);
    }

    // Gentle redirect on the English root: go to the Dutch page when the
    // visitor explicitly chose Dutch earlier, or when a Dutch-language browser
    // arrives without any saved language choice.
    var p = location.pathname;
    var isRoot = (p === '/' || p === '' || /\/index\.html$/.test(p));
    var savedPref = localStorage.getItem('nomoclub-lang');
    if (isEnglish && isRoot && (savedPref === 'nl' || (!savedPref && detectDutch()))) {
      location.replace('/nl');
    }
  } else if (toggleButtons.length) {
    /* ---------- legacy bilingual pages: privacy.html, terms.html ---------- */
    var savedLang = localStorage.getItem('nomoclub-lang');
    if (savedLang !== 'nl' && savedLang !== 'en') savedLang = detectDutch() ? 'nl' : 'en';

    function setLang(lang) {
      if (lang !== 'nl') lang = 'en';
      document.body.classList.toggle('lang-en', lang === 'en');
      document.body.classList.toggle('lang-nl', lang === 'nl');
      document.documentElement.lang = lang;
      toggleButtons.forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-lang') === lang);
      });
      localStorage.setItem('nomoclub-lang', lang);
      setCurrency(lang === 'nl' ? 'eur' : (localStorage.getItem('nomoclub-cur') || 'gbp'), lang !== 'nl');
    }
    toggleButtons.forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
    });
    setLang(savedLang);
  }
})();
