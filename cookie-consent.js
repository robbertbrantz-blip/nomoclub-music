/* Cookie consent for nomoclub.com
   - Loads GA4 + Meta Pixel ONLY after the visitor accepts.
   - Banner language follows the site language (localStorage 'nomoclub-lang', default follows the page language, Dutch first).
   - Fires a "Lead" event when a contact channel is clicked (only if consent given).
   - Exposes window.nomoCookieSettings() to reopen the banner. No libraries. */
(function () {
  var GA_ID    = 'G-E1K69RVQRL';
  var PIXEL_ID = '778038775303295';
  var KEY      = 'nomo_cookie_consent';

  function texts() {
    var nl = (function () {
      var p = location.pathname;
      if (/^\/(en|stories|memorial-song|love-song|wedding-song|birthday-song)(\.html)?\/?$/.test(p)) return false;
      if (/^\/(contact|privacy|terms)(\.html)?\/?$/.test(p)) { try { return localStorage.getItem('nomoclub-lang') !== 'en'; } catch (e) { return true; } }
      return true;
    })();
    return nl
      ? { msg: 'We gebruiken cookies voor analyse en advertenties.',
          ok: 'Accepteren', no: 'Weigeren', more: 'Privacybeleid' }
      : { msg: 'We use cookies for analytics and advertising.',
          ok: 'Accept', no: 'Decline', more: 'Privacy policy' };
  }

  var loaded = false;
  function loadTrackers() {
    if (loaded) return; loaded = true;
    var g = document.createElement('script');
    g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID);
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
  }

  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function get()  { try { return localStorage.getItem(KEY); } catch (e) { return null; } }

  // ----- Lead event (only fires once trackers are loaded = consent given) -----
  function trackLead(method) {
    if (window.fbq)  { try { fbq('track', 'Lead', { method: method }); } catch (e) {} }
    if (window.gtag) { try { gtag('event', 'generate_lead', { method: method }); } catch (e) {} }
  }
  function setupLeadTracking() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href]') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      var m = null;
      if (/wa\.me|api\.whatsapp|whatsapp\.com/i.test(href)) m = 'whatsapp';
      else if (/m\.me|messenger\.com/i.test(href)) m = 'messenger';
      else if (/instagram\.com/i.test(href)) m = 'instagram';
      else if (/facebook\.com/i.test(href)) m = 'facebook';
      else if (/^mailto:/i.test(href)) m = 'email';
      if (m) trackLead(m);
    }, true);
  }

  function injectStyle() {
    if (document.getElementById('nomo-cc-style')) return;
    var css = document.createElement('style');
    css.id = 'nomo-cc-style';
    css.textContent =
      '#nomo-cc{position:fixed;left:0;right:0;bottom:0;z-index:99999;' +
      'background:#fff;border-top:1px solid #e5e5e5;box-shadow:0 -2px 12px rgba(0,0,0,.08);' +
      'padding:16px 20px;display:flex;flex-wrap:wrap;align-items:center;gap:12px;' +
      'font-family:inherit;font-size:15px;color:#222}' +
      '#nomo-cc p{margin:0;flex:1 1 260px;line-height:1.4}' +
      '#nomo-cc a{color:#c0392b;text-decoration:underline}' +
      '#nomo-cc .b{display:flex;gap:10px;flex:0 0 auto}' +
      '#nomo-cc button{cursor:pointer;border-radius:8px;padding:10px 18px;font-size:15px;' +
      'font-family:inherit;border:1px solid #c0392b}' +
      '#nomo-cc .ok{background:#c0392b;color:#fff}' +
      '#nomo-cc .no{background:#fff;color:#c0392b}';
    document.head.appendChild(css);
  }

  function render(bar) {
    var T = texts();
    bar.innerHTML =
      '<p>' + T.msg + ' <a href="privacy.html">' + T.more + '</a></p>' +
      '<div class="b">' +
      '<button class="no" type="button">' + T.no + '</button>' +
      '<button class="ok" type="button">' + T.ok + '</button>' +
      '</div>';
    bar.querySelector('.ok').onclick = function () { save('accepted'); bar.remove(); loadTrackers(); };
    bar.querySelector('.no').onclick = function () { save('declined'); bar.remove(); };
  }

  function build() {
    if (document.getElementById('nomo-cc')) return;
    injectStyle();
    var bar = document.createElement('div');
    bar.id = 'nomo-cc';
    document.body.appendChild(bar);
    render(bar);
    document.querySelectorAll('.langtoggle button').forEach(function (b) {
      b.addEventListener('click', function () {
        var open = document.getElementById('nomo-cc');
        if (open) setTimeout(function () { render(open); }, 0);
      });
    });
  }

  function show() { if (document.body) build(); else document.addEventListener('DOMContentLoaded', build); }

  window.nomoCookieSettings = function () { try { localStorage.removeItem(KEY); } catch (e) {} show(); };

  setupLeadTracking();

  var choice = get();
  if (choice === 'accepted') { loadTrackers(); return; }
  if (choice === 'declined') { return; }
  show();
})();
