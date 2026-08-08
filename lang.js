(function () {
  /* ---------- mobiel hamburgermenu ---------- */
  document.querySelectorAll('.navburger').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = document.body.classList.toggle('navopen');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });


  /* ---------- uitklapmenu in de navigatie ---------- */
  var drops = document.querySelectorAll('.navdrop');
  function closeDrops(except) {
    drops.forEach(function (d) {
      if (d === except) return;
      d.classList.remove('open');
      var t = d.querySelector('.navdroptoggle');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }
  drops.forEach(function (d) {
    var t = d.querySelector('.navdroptoggle');
    if (!t) return;
    t.addEventListener('click', function (e) {
      e.stopPropagation();
      closeDrops(d);
      var open = d.classList.toggle('open');
      t.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  if (drops.length) {
    document.addEventListener('click', function () { closeDrops(null); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.keyCode === 27) closeDrops(null);
    });
  }

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

  /* Remember the language choice in BOTH localStorage and a cookie.
     The cookie is what Cloudflare can read at the edge, so an explicit
     English choice survives the server-side redirect on the root URL. */
  function rememberLang(lang) {
    if (lang !== 'nl' && lang !== 'en') return;
    try { localStorage.setItem('nomoclub-lang', lang); } catch (e) {}
    document.cookie = 'nomoclub-lang=' + lang + '; path=/; max-age=31536000; SameSite=Lax';
  }

  var toggleLinks = document.querySelectorAll('.langtoggle a');
  var toggleButtons = document.querySelectorAll('.langtoggle button');

  if (toggleLinks.length) {
    /* ---------- single-language pages: / (NL) and /en (EN) ---------- */
    // Remember the visitor's explicit language choice when they switch.
    toggleLinks.forEach(function (a) {
      a.addEventListener('click', function () {
        rememberLang(a.getAttribute('data-lang'));
      });
    });

    var isEnglish = document.body.classList.contains('lang-en');
    if (isEnglish) {
      setCurrency(localStorage.getItem('nomoclub-cur') || 'gbp', false);
    }

    // Dutch is the primary language and lives on the root. We only redirect on
    // an EXPLICIT earlier language choice - never on browser detection - so that
    // crawlers (which carry no preference) always see the page they requested.
    var p = location.pathname;
    var isRoot = (p === '/' || p === '' || /\/index\.html$/.test(p));
    var isEnRoot = (p === '/en' || /\/en\.html$/.test(p));
    var savedPref = localStorage.getItem('nomoclub-lang');
    if (!isEnglish && isRoot && savedPref === 'en') {
      location.replace('/en');
    } else if (isEnglish && isEnRoot && savedPref === 'nl') {
      location.replace('/');
    }
  } else if (toggleButtons.length) {
    /* ---------- legacy bilingual pages: privacy.html, terms.html ---------- */
    var savedLang = localStorage.getItem('nomoclub-lang');
    if (savedLang !== 'nl' && savedLang !== 'en') savedLang = detectDutch() ? 'nl' : 'en';

    function setLang(lang, explicit) {
      if (lang !== 'nl') lang = 'en';
      document.body.classList.toggle('lang-en', lang === 'en');
      document.body.classList.toggle('lang-nl', lang === 'nl');
      document.documentElement.lang = lang;
      toggleButtons.forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-lang') === lang);
      });
      /* Only an explicit click counts as a language choice: an auto-detected
         language must not write the cookie the edge redirect looks at. */
      try { localStorage.setItem('nomoclub-lang', lang); } catch (e) {}
      if (explicit) rememberLang(lang);
      setCurrency(lang === 'nl' ? 'eur' : (localStorage.getItem('nomoclub-cur') || 'gbp'), lang !== 'nl');
    }
    toggleButtons.forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-lang'), true); });
    });
    setLang(savedLang, false);
  }
})();
