/* PC Centre — motion layer. Loads after app.js. Does nothing if the visitor prefers reduced motion. */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var raf = window.requestAnimationFrame.bind(window);

  if (reduce) { root.classList.remove('motion'); var h0 = $('.hero'); if (h0) h0.classList.add('is-in'); return; }
  root.classList.add('motion');

  /* ---------- scroll progress + header state ---------- */
  var bar = document.createElement('div'); bar.className = 'scroll-progress'; bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  var header = $('.site-header'), lastY = window.scrollY, ticking = false;
  var scrollFns = [];
  function onScroll() {
    var y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
    if (header) {
      header.classList.toggle('is-scrolled', y > 20);
      var navOpen = $('#main-nav.open');
      if (!navOpen && y > 240 && y > lastY + 4) header.classList.add('is-hidden');
      else if (y < lastY - 4 || y < 240) header.classList.remove('is-hidden');
    }
    scrollFns.forEach(function (fn) { fn(y); });
    lastY = y; ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; raf(onScroll); } }, { passive: true });

  /* ---------- hero intro ---------- */
  var hero = $('.hero');
  if (hero) {
    var h1 = $('.display', hero);
    if (h1 && !h1.dataset.split) {
      var words = h1.textContent.trim().split(/\s+/);
      h1.setAttribute('aria-label', h1.textContent.trim());
      h1.innerHTML = words.map(function (w, i) { return '<span class="w" aria-hidden="true"><span style="--i:' + i + '">' + w + '</span></span>'; }).join(' ');
      h1.dataset.split = '1';
    }
    var lead = $('.lead', hero), form = $('.hero-search', hero), quick = $('.hero-quick', hero);
    [[lead, 550], [form, 700], [quick, 850]].forEach(function (p) { if (p[0]) { p[0].classList.add('intro-fade'); p[0].style.setProperty('--d', p[1]); } });
    var glow = document.createElement('div'); glow.className = 'hero-glow'; glow.setAttribute('aria-hidden', 'true'); hero.appendChild(glow);
    if (!$('.scroll-cue', hero)) { var cue = document.createElement('span'); cue.className = 'scroll-cue'; cue.setAttribute('aria-hidden', 'true'); hero.appendChild(cue); }
    raf(function () { raf(function () { hero.classList.add('is-in'); }); });

    if (finePointer) hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      glow.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      glow.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
    var video = $('video', hero), wrap = $('.wrap', hero);
    scrollFns.push(function (y) {
      var hgt = hero.offsetHeight; if (y > hgt) return;
      var p = y / hgt;
      if (video && hero.classList.contains('is-in')) video.style.transform = 'translateY(' + (y * 0.35) + 'px) scale(' + (1.02 + p * 0.08) + ')';
      if (wrap) { wrap.style.transform = 'translateY(' + (y * 0.18) + 'px)'; wrap.style.opacity = String(1 - p * 1.1); }
    });

    /* rotating placeholder that "types" suggestions */
    var input = $('#hero-q');
    if (input) {
      var ideas = ['Search for a gaming laptop…', 'Search for a 1TB SSD…', 'Search for a 144Hz monitor…', 'Search for DDR5 RAM…', 'Search for a UPS…'];
      var wi = 0, ci = 0, del = false, typer;
      var tick = function () {
        if (document.activeElement === input || input.value) { typer = setTimeout(tick, 600); return; }
        var word = ideas[wi];
        ci += del ? -1 : 1;
        input.setAttribute('placeholder', word.slice(0, ci) + (ci < word.length || del ? '▏' : ''));
        var wait = del ? 28 : 55;
        if (!del && ci === word.length) { del = true; wait = 1800; }
        else if (del && ci === 0) { del = false; wi = (wi + 1) % ideas.length; wait = 300; }
        typer = setTimeout(tick, wait);
      };
      setTimeout(tick, 1600);
      input.addEventListener('blur', function () { if (!input.value) input.setAttribute('placeholder', ideas[wi]); });
    }
  }

  /* ---------- scroll reveal ---------- */
  var revealMap = [
    ['.section-head', 'up'], ['.trust li', 'up'], ['.cat-rack a', 'zoom'], ['#featured .p-card', 'up'],
    ['.deal-main', 'left'], ['.deal', 'right'], ['.marquee, .brands:not(.marquee .brands)', 'up'],
    ['.split > *:first-child', 'left'], ['.split > *:last-child', 'right'], ['.dealer-list li', 'up'],
    ['.review', 'up'], ['.cta', 'zoom'], ['.values > div', 'up'], ['.member', 'up'], ['.timeline li', 'right'],
    ['.faq details', 'up'], ['.aside-card', 'right'], ['.contact-list li', 'right'], ['.panel', 'up'],
    ['.filters', 'left'], ['.tabs', 'up'], ['.site-footer .cols > div', 'up']
  ];
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var t = en.target; t.classList.add('is-visible'); io.unobserve(t);
      /* hand the element back to its own hover transitions once it has arrived */
      setTimeout(function () { t.removeAttribute('data-reveal'); t.classList.remove('is-visible'); t.dataset.revealed = '1'; }, 1700);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) : null;
  function reveal(el, dir, idx) {
    if (el.hasAttribute('data-reveal') || el.dataset.revealed) return;
    el.setAttribute('data-reveal', dir === 'up' ? '' : dir);
    el.style.setProperty('--stagger', Math.min(idx, 6));
    if (io) io.observe(el); else el.classList.add('is-visible');
  }
  function scanReveals() {
    revealMap.forEach(function (m) {
      $$(m[0]).forEach(function (el) {
        var sibs = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        reveal(el, m[1], sibs);
      });
    });
  }
  /* footer is rendered by app.js before this script, so scanning now catches everything */
  scanReveals();

  /* ---------- dynamic grids (filters, tabs, related) ---------- */
  function animateCards(container) {
    $$('.p-card, .cat-item', container).forEach(function (c, i) {
      if (c.hasAttribute('data-reveal') || c.dataset.revealed) return;
      c.classList.remove('enter'); void c.offsetWidth;
      c.style.setProperty('--stagger', Math.min(i, 12)); c.classList.add('enter');
    });
  }
  ['#product-grid', '#brand-panel', '#related'].forEach(function (sel) {
    var el = $(sel); if (!el) return;
    animateCards(el);
    new MutationObserver(function () { animateCards(el); }).observe(el, { childList: true });
  });

  /* ---------- 3D tilt + glare on cards ---------- */
  if (finePointer) {
    var active = null;
    document.addEventListener('pointermove', function (e) {
      var c = e.target.closest && e.target.closest('.p-card, .cat-item');
      if (active && active !== c) { active.style.transform = ''; active.classList.remove('is-tilting'); active = null; }
      if (!c) return;
      /* keep buttons still under the cursor so they're easy to hit */
      if (e.target.closest('button')) return;
      if (!c.querySelector(':scope > .glare')) { var g = document.createElement('span'); g.className = 'glare'; g.setAttribute('aria-hidden', 'true'); c.appendChild(g); }
      var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.classList.add('is-tilting'); active = c;
      c.style.transform = 'rotateX(' + ((0.5 - y) * 10).toFixed(2) + 'deg) rotateY(' + ((x - 0.5) * 12).toFixed(2) + 'deg) translateY(-6px)';
      c.style.setProperty('--gx', (x * 100) + '%'); c.style.setProperty('--gy', (y * 100) + '%');
    }, { passive: true });
    document.addEventListener('pointerleave', function () { if (active) { active.style.transform = ''; active.classList.remove('is-tilting'); active = null; } });
  }

  /* ---------- fly to cart ---------- */
  function cartTarget() {
    var b = $$('[data-open-cart]').filter(function (x) { return x.offsetParent !== null; })[0];
    return b || null;
  }
  function flyToCart(img) {
    var target = cartTarget(); if (!img || !target) return;
    if (header) header.classList.remove('is-hidden');
    var s = img.getBoundingClientRect(), t = target.getBoundingClientRect();
    if (!s.width) return;
    var size = Math.min(s.width, s.height, 220);
    var sx = s.left + s.width / 2 - size / 2, sy = s.top + s.height / 2 - size / 2;
    var tx = t.left + t.width / 2 - size / 2, ty = t.top + t.height / 2 - size / 2;
    var clone = document.createElement('img');
    clone.src = img.currentSrc || img.src; clone.className = 'fly-img'; clone.alt = '';
    clone.style.cssText = 'left:' + sx + 'px;top:' + sy + 'px;width:' + size + 'px;height:' + size + 'px;padding:' + Math.round(size * 0.08) + 'px';
    document.body.appendChild(clone);
    var midX = (tx - sx) * 0.55, midY = Math.min(ty - sy, 0) - 140;
    var anim = clone.animate([
      { transform: 'translate(0,0) scale(1) rotate(0)', opacity: 1 },
      { transform: 'translate(' + midX + 'px,' + midY + 'px) scale(.62) rotate(-12deg)', opacity: 1, offset: 0.45 },
      { transform: 'translate(' + (tx - sx) + 'px,' + (ty - sy) + 'px) scale(.12) rotate(8deg)', opacity: .35 }
    ], { duration: 900, easing: 'cubic-bezier(.5,0,.3,1)' });
    anim.onfinish = function () {
      clone.remove();
      target.classList.remove('shake'); void target.offsetWidth; target.classList.add('shake');
      var badge = $('[data-cart-count]', target);
      if (badge) { badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump'); }
    };
  }
  document.addEventListener('click', function (e) {
    var add = e.target.closest('[data-add]');
    if (add) { var cardEl = add.closest('.p-card'); flyToCart(cardEl ? $('.media img', cardEl) : null); }
    if (e.target.closest('#pd-add')) flyToCart($('#main-img'));
    var w = e.target.closest('[data-wish]');
    if (w) setTimeout(function () { w.classList.remove('pop'); void w.offsetWidth; w.classList.add('pop'); }, 0);
  }, true);

  /* ---------- button ripple + magnetic CTAs ---------- */
  document.addEventListener('pointerdown', function (e) {
    var b = e.target.closest('.btn'); if (!b) return;
    var r = b.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2.2;
    var s = document.createElement('span'); s.className = 'ripple';
    s.style.cssText = 'width:' + d + 'px;height:' + d + 'px;left:' + (e.clientX - r.left - d / 2) + 'px;top:' + (e.clientY - r.top - d / 2) + 'px';
    b.appendChild(s); setTimeout(function () { s.remove(); }, 700);
  });
  if (finePointer) {
    $$('.hero .btn-primary, .cta .btn, .deal-main .btn, .band .btn').forEach(function (b) {
      b.classList.add('magnetic');
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.25) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.35) + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
  }

  /* ---------- brand marquee ---------- */
  $$('.marquee .brands').forEach(function (track) {
    if (track.dataset.cloned) return;
    $$('a', track).forEach(function (a) { var c = a.cloneNode(true); c.setAttribute('aria-hidden', 'true'); c.tabIndex = -1; track.appendChild(c); });
    track.dataset.cloned = '1';
  });

  /* ---------- spotlight on dark bands ---------- */
  if (finePointer) $$('.band').forEach(function (b) {
    b.addEventListener('pointermove', function (e) {
      var r = b.getBoundingClientRect();
      b.style.setProperty('--sx', (e.clientX - r.left) + 'px'); b.style.setProperty('--sy', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- count-up numbers ---------- */
  function countUp(el) {
    var m = el.textContent.match(/^(\D*)(\d[\d,]*)(.*)$/); if (!m) return;
    var end = parseInt(m[2].replace(/,/g, ''), 10), start = performance.now(), dur = 1400;
    el.setAttribute('aria-label', el.textContent);
    (function step(now) {
      var p = Math.min(1, (now - start) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 4)));
      el.textContent = m[1] + v.toLocaleString('en-PK') + m[3];
      if (p < 1) raf(step);
    })(start);
  }
  var counters = $$('.stat-row strong');
  if (counters.length && io) {
    var cio = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { countUp(en.target); cio.unobserve(en.target); } }); }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ---------- timeline progress (About) ---------- */
  var tl = $('.timeline');
  if (tl) scrollFns.push(function () {
    var r = tl.getBoundingClientRect(), vh = window.innerHeight;
    var p = Math.max(0, Math.min(1, (vh * 0.75 - r.top) / r.height));
    tl.style.setProperty('--tl', p.toFixed(3));
  });

  /* ---------- sliding tab ink (Catalogue) ---------- */
  var tabs = $('#brand-tabs');
  if (tabs) {
    var ink = document.createElement('span'); ink.className = 'tab-ink'; ink.setAttribute('aria-hidden', 'true');
    tabs.appendChild(ink); tabs.classList.add('has-ink');
    var place = function () { var sel = $('[aria-selected="true"]', tabs); if (sel) { ink.style.left = (sel.offsetLeft - tabs.scrollLeft) + 'px'; ink.style.width = sel.offsetWidth + 'px'; } };
    tabs.addEventListener('click', function () { setTimeout(place, 0); });
    tabs.addEventListener('keydown', function () { setTimeout(place, 0); });
    tabs.addEventListener('scroll', place, { passive: true });
    window.addEventListener('resize', place);
    document.fonts && document.fonts.ready.then(place);
    place();
  }

  /* ---------- product detail: crossfade + zoom ---------- */
  var pd = $('#pd');
  if (pd) {
    $$('.info > *', pd).forEach(function (el, i) { el.style.setProperty('--i', Math.min(i, 12)); });
    var main = $('#main-img');
    if (main) {
      pd.addEventListener('click', function (e) {
        if (e.target.closest('[data-img]')) {
          main.classList.add('swap');
          var done = function () { setTimeout(function () { main.classList.remove('swap'); }, 120); };
          main.complete ? setTimeout(done, 140) : main.addEventListener('load', done, { once: true });
        }
      }, true);
      var box = main.parentElement;
      if (finePointer) {
        box.addEventListener('click', function () { box.classList.toggle('zoomed'); if (!box.classList.contains('zoomed')) main.style.transformOrigin = ''; });
        box.addEventListener('pointermove', function (e) {
          if (!box.classList.contains('zoomed')) return;
          var r = box.getBoundingClientRect();
          main.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + '% ' + ((e.clientY - r.top) / r.height * 100) + '%';
        });
        box.addEventListener('pointerleave', function () { box.classList.remove('zoomed'); main.style.transformOrigin = ''; });
      }
    }
  }

  onScroll();
})();
