(function () {
  var saved = localStorage.getItem('nomoclub-lang') || 'nl';
  setLang(saved);

  document.querySelectorAll('.langtoggle button').forEach(function (b) {
    b.addEventListener('click', function () {
      setLang(b.getAttribute('data-lang'));
    });
  });

  function setLang(lang) {
    if (lang !== 'en') lang = 'nl';
    document.body.classList.toggle('lang-en', lang === 'en');
    document.body.classList.toggle('lang-nl', lang === 'nl');
    document.documentElement.lang = lang;
    document.querySelectorAll('.langtoggle button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    localStorage.setItem('nomoclub-lang', lang);
  }
})();
