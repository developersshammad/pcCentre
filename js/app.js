/* PC Centre — shared site behaviour (no dependencies) */
(function () {
  'use strict';
  var PCC = window.PCC;
  var WHATSAPP = '923001234567';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- helpers ---------- */
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem('pcc_' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('pcc_' + k, JSON.stringify(v)); } catch (e) {} }
  };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function num(price) { return typeof price === 'number' ? price : parseInt(String(price).replace(/[^\d]/g, ''), 10) || 0; }
  function pkr(n) { return 'Rs ' + Number(n).toLocaleString('en-PK'); }
  function src(path) { return encodeURI(path).replace(/#/g, '%23').replace(/\+/g, '%2B'); }

  var all = [];
  Object.keys(PCC.products).forEach(function (cat) {
    PCC.products[cat].forEach(function (p) { p.cat = cat; p.value = num(p.price); all.push(p); });
  });
  PCC.all = all;
  function byId(id) { for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i]; return null; }
  function catTitle(id) { for (var i = 0; i < PCC.categories.length; i++) if (PCC.categories[i].id === id) return PCC.categories[i].title; return ''; }
  function keySpec(p) { var k = Object.keys(p.specs || {}); return k.slice(0, 2).map(function (x) { return p.specs[x]; }).join(', '); }

  /* ---------- toast ---------- */
  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i><span>' + esc(msg) + '</span>';
    toastEl.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  /* ---------- header & footer ---------- */
  var links = [
    ['index.html', 'Home'], ['products.html', 'Products'], ['catalogue.html', 'Catalogue'],
    ['faqs.html', 'Help & FAQs'], ['about.html', 'About'], ['contact.html', 'Contact']
  ];
  var page = (location.pathname.split('/').pop() || 'index.html').replace(/\?.*$/, '');
  if (page === '' ) page = 'index.html';
  if (page.indexOf('.html') === -1) page += '.html';
  if (page === 'product-detail.html') page = 'products.html';

  function renderHeader() {
    var host = $('#site-header'); if (!host) return;
    var user = store.get('user', null);
    host.className = 'site-header';
    host.innerHTML =
      '<div class="wrap">' +
        '<a class="logo" href="index.html" aria-label="PC Centre home"><span class="pc">PC</span><span class="bar" aria-hidden="true"></span><span>Centre</span></a>' +
        '<nav class="nav" id="main-nav" aria-label="Main">' +
          links.map(function (l) { return '<a href="' + l[0] + '"' + (l[0] === page ? ' aria-current="page"' : '') + '>' + l[1] + '</a>'; }).join('') +
          '<a href="' + (user ? '#' : 'login.html') + '" class="mobile-account" data-account>' + (user ? 'Sign out (' + esc(user.name) + ')' : 'Log in') + '</a>' +
        '</nav>' +
        '<div class="header-actions">' +
          (user ? '<a href="#" class="account" data-account title="Sign out">Hi, ' + esc(user.name) + '</a>' : '<a href="login.html" class="account">Log in</a>') +
          '<a class="icon-btn" href="products.html?focus=search" aria-label="Search products"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i></a>' +
          '<button class="icon-btn" type="button" data-open-cart aria-label="Open cart"><i class="fa-solid fa-cart-shopping" aria-hidden="true"></i><span class="badge" data-cart-count data-count="0">0</span></button>' +
          '<button class="icon-btn menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Menu"><i class="fa-solid fa-bars" aria-hidden="true"></i></button>' +
        '</div>' +
      '</div>';
    var nav = $('#main-nav'), tog = $('.menu-toggle', host);
    tog.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      tog.setAttribute('aria-expanded', open);
      tog.innerHTML = '<i class="fa-solid ' + (open ? 'fa-xmark' : 'fa-bars') + '" aria-hidden="true"></i>';
    });
    $$('[data-account]', host).forEach(function (a) {
      if (!user) return;
      a.addEventListener('click', function (e) { e.preventDefault(); store.set('user', null); toast('Signed out'); setTimeout(function () { location.reload(); }, 600); });
    });
  }

  function renderFooter() {
    var host = $('#site-footer'); if (!host) return;
    host.className = 'site-footer';
    host.innerHTML =
      '<div class="wrap">' +
        '<div class="cols">' +
          '<div><a class="logo" href="index.html"><span class="pc">PC</span><span class="bar" aria-hidden="true"></span><span>Centre</span></a>' +
          '<p>Laptops, monitors, parts and accessories from authorized dealers in Karachi, Lahore, Islamabad and Rawalpindi.</p>' +
          '<div class="socials"><a href="https://wa.me/' + WHATSAPP + '" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a><a href="mailto:info@pccentre.com" aria-label="Email"><i class="fa-solid fa-envelope"></i></a><a href="tel:+923001234567" aria-label="Phone"><i class="fa-solid fa-phone"></i></a></div></div>' +
          '<div><h3>Shop</h3><ul>' +
            ['notebooks', 'displays', 'storage', 'memory', 'accessories'].map(function (c) { return '<li><a href="products.html?cat=' + c + '">' + esc(catTitle(c)) + '</a></li>'; }).join('') +
          '</ul></div>' +
          '<div><h3>Company</h3><ul><li><a href="about.html">About us</a></li><li><a href="catalogue.html">Brand catalogues</a></li><li><a href="faqs.html">Help & FAQs</a></li><li><a href="contact.html">Contact</a></li></ul></div>' +
          '<div><h3>Visit us</h3><p>Main Tech Market, Saddar<br>Karachi, Pakistan</p><p>Mon–Sat, 11am – 9pm<br><a href="tel:+923001234567">+92 300 1234567</a></p></div>' +
        '</div>' +
        '<div class="bottom"><span>&copy; ' + new Date().getFullYear() + ' PC Centre. All rights reserved.</span><span>Prices in Pakistani rupees and may vary by dealer.</span></div>' +
      '</div>';
  }

  /* ---------- cart ---------- */
  var cart = store.get('cart', []);
  function saveCart() { store.set('cart', cart); updateCartUI(); }
  function addToCart(id, qty) {
    qty = qty || 1;
    var line = cart.filter(function (l) { return l.id === id; })[0];
    if (line) line.qty += qty; else cart.push({ id: id, qty: qty });
    saveCart();
    var p = byId(id); toast((p ? p.title : 'Item') + ' added to cart');
  }
  function cartCount() { return cart.reduce(function (s, l) { return s + l.qty; }, 0); }
  function cartTotal() { return cart.reduce(function (s, l) { var p = byId(l.id); return s + (p ? p.value * l.qty : 0); }, 0); }

  function buildDrawer() {
    var bd = document.createElement('div'); bd.className = 'drawer-backdrop'; bd.setAttribute('data-close-cart', '');
    var d = document.createElement('aside'); d.className = 'drawer'; d.setAttribute('aria-label', 'Shopping cart'); d.setAttribute('aria-hidden', 'true'); d.id = 'cart-drawer'; d.tabIndex = -1;
    d.innerHTML = '<header><h2>Your cart</h2><button class="icon-btn" type="button" data-close-cart aria-label="Close cart"><i class="fa-solid fa-xmark"></i></button></header>' +
      '<div class="items" data-cart-items></div>' +
      '<footer data-cart-footer><div class="total"><span>Total</span><span class="price" data-cart-total></span></div>' +
      '<a class="btn btn-primary btn-block" data-checkout href="#"><i class="fa-brands fa-whatsapp"></i> Order on WhatsApp</a>' +
      '<button class="btn btn-ghost btn-block" type="button" data-clear-cart>Empty cart</button></footer>';
    document.body.appendChild(bd); document.body.appendChild(d);
  }
  var lastFocus;
  function openCart() { lastFocus = document.activeElement; document.body.classList.add('drawer-open'); $('#cart-drawer').setAttribute('aria-hidden', 'false'); $('#cart-drawer').focus(); }
  function closeCart() { document.body.classList.remove('drawer-open'); $('#cart-drawer').setAttribute('aria-hidden', 'true'); if (lastFocus) lastFocus.focus(); }

  function updateCartUI() {
    $$('[data-cart-count]').forEach(function (b) { var c = cartCount(); b.textContent = c; b.setAttribute('data-count', c); });
    var box = $('[data-cart-items]'); if (!box) return;
    var foot = $('[data-cart-footer]');
    if (!cart.length) {
      box.innerHTML = '<div class="empty-cart"><i class="fa-solid fa-cart-shopping"></i><p>Your cart is empty.</p><a class="btn btn-ghost" href="products.html">Browse products</a></div>';
      foot.hidden = true; return;
    }
    foot.hidden = false;
    box.innerHTML = cart.map(function (l) {
      var p = byId(l.id); if (!p) return '';
      return '<div class="cart-line" data-id="' + p.id + '"><img src="' + src(p.img[0]) + '" alt="">' +
        '<div><strong>' + esc(p.title) + '</strong><span class="price">' + pkr(p.value * l.qty) + '</span>' +
        '<div class="mini-qty"><button type="button" data-step="-1" aria-label="Decrease quantity">−</button><span>' + l.qty + '</span><button type="button" data-step="1" aria-label="Increase quantity">+</button></div></div>' +
        '<button class="remove" type="button" data-remove aria-label="Remove ' + esc(p.title) + '"><i class="fa-solid fa-trash-can"></i></button></div>';
    }).join('');
    $('[data-cart-total]').textContent = pkr(cartTotal());
    var msg = 'Hi PC Centre, I would like to order:%0A' + cart.map(function (l) { var p = byId(l.id); return p ? encodeURIComponent('• ' + p.title + ' x' + l.qty + ' (' + pkr(p.value * l.qty) + ')') : ''; }).join('%0A') + '%0A' + encodeURIComponent('Total: ' + pkr(cartTotal()));
    $('[data-checkout]').href = 'https://wa.me/' + WHATSAPP + '?text=' + msg;
  }

  /* ---------- wishlist ---------- */
  var wish = store.get('wish', []);
  function isWished(id) { return wish.indexOf(id) !== -1; }
  function toggleWish(id) {
    var i = wish.indexOf(id);
    if (i === -1) { wish.push(id); toast('Saved to your list'); } else { wish.splice(i, 1); toast('Removed from your list'); }
    store.set('wish', wish);
    $$('[data-wish="' + id + '"]').forEach(function (b) { b.setAttribute('aria-pressed', isWished(id)); b.innerHTML = heart(id); });
    document.dispatchEvent(new CustomEvent('pcc:wish'));
  }
  function heart(id) { return '<i class="fa-' + (isWished(id) ? 'solid' : 'regular') + ' fa-heart" aria-hidden="true"></i>'; }

  /* ---------- product card ---------- */
  function card(p) {
    return '<article class="p-card">' +
      '<a class="media" href="product-detail.html?id=' + p.id + '" tabindex="-1" aria-hidden="true"><img loading="lazy" src="' + src(p.img[0]) + '" alt=""></a>' +
      '<button class="wish" type="button" data-wish="' + p.id + '" aria-pressed="' + isWished(p.id) + '" aria-label="Save ' + esc(p.title) + '">' + heart(p.id) + '</button>' +
      '<div class="body"><span class="cat">' + esc(catTitle(p.cat)) + '</span>' +
      '<h3><a href="product-detail.html?id=' + p.id + '">' + esc(p.title) + '</a></h3>' +
      '<p class="key">' + esc(keySpec(p)) + '</p>' +
      '<div class="foot"><span class="price">' + pkr(p.value) + '</span>' +
      '<button class="add-btn" type="button" data-add="' + p.id + '" aria-label="Add ' + esc(p.title) + ' to cart"><i class="fa-solid fa-cart-plus" aria-hidden="true"></i></button></div></div>' +
    '</article>';
  }
  PCC.card = card;

  /* ---------- global events ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-add],[data-wish],[data-open-cart],[data-close-cart],[data-remove],[data-step],[data-clear-cart]');
    if (!t) return;
    if (t.hasAttribute('data-add')) { addToCart(t.getAttribute('data-add')); }
    else if (t.hasAttribute('data-wish')) { toggleWish(t.getAttribute('data-wish')); }
    else if (t.hasAttribute('data-open-cart')) { openCart(); }
    else if (t.hasAttribute('data-close-cart')) { closeCart(); }
    else if (t.hasAttribute('data-clear-cart')) { cart = []; saveCart(); }
    else {
      var id = t.closest('.cart-line').getAttribute('data-id');
      var line = cart.filter(function (l) { return l.id === id; })[0];
      if (t.hasAttribute('data-remove')) cart = cart.filter(function (l) { return l.id !== id; });
      else { line.qty += parseInt(t.getAttribute('data-step'), 10); if (line.qty < 1) cart = cart.filter(function (l) { return l.id !== id; }); }
      saveCart();
    }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.body.classList.contains('drawer-open')) closeCart(); });

  /* ---------- pages ---------- */
  var pages = {};

  pages.home = function () {
    var rack = $('#home-cats');
    if (rack) rack.innerHTML = PCC.categories.map(function (c) {
      var info = PCC.categoryInfo[c.id] || {};
      return '<a href="products.html?cat=' + c.id + '"><i class="fa-solid ' + info.icon + '" aria-hidden="true"></i><span>' + esc(c.title) + '</span><small>' + PCC.products[c.id].length + ' products</small></a>';
    }).join('');
    var feat = $('#featured');
    if (feat) feat.innerHTML = ['n4', 'd7', 's6', 'n7', 'inp1', 'snd2', 'm2', 'u5'].map(function (id) { return card(byId(id)); }).join('');
    var deals = $('#deal-list');
    if (deals) deals.innerHTML = PCC.news.map(function (n) {
      return '<a class="deal" href="' + n.link + '"><span class="tag">' + esc(n.tag) + '</span><h3>' + esc(n.title) + '</h3><p>' + esc(n.text) + '</p></a>';
    }).join('');
    var dl = $('#dealer-list');
    if (dl) dl.innerHTML = PCC.dealers.map(function (d) {
      return '<li><strong>' + d.city + '</strong><span>' + d.area + '</span><a href="tel:' + d.phone.replace(/\s/g, '') + '">' + d.phone + '</a></li>';
    }).join('');
    var form = $('#hero-search');
    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault(); var q = $('input', form).value.trim();
      location.href = 'products.html' + (q ? '?q=' + encodeURIComponent(q) : '');
    });
    var v = $('.hero video');
    if (v && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.removeAttribute('autoplay'); v.pause(); }
  };

  pages.products = function () {
    var params = new URLSearchParams(location.search);
    var state = { cat: params.get('cat') || 'all', q: params.get('q') || '', sort: 'featured' };
    var list = $('#product-grid'), line = $('#result-line'), q = $('#q'), sort = $('#sort');
    var cats = [{ id: 'all', title: 'All products', icon: 'fa-border-all' }].concat(PCC.categories.map(function (c) { return { id: c.id, title: c.title, icon: (PCC.categoryInfo[c.id] || {}).icon }; }))
      .concat([{ id: 'saved', title: 'Saved items', icon: 'fa-heart' }]);
    function countFor(id) { return id === 'all' ? all.length : id === 'saved' ? wish.length : PCC.products[id].length; }
    function renderFilters() {
      $('#filters').innerHTML = '<h2>Categories</h2>' + cats.map(function (c) {
        return '<button type="button" data-cat="' + c.id + '" aria-pressed="' + (state.cat === c.id) + '"><i class="fa-solid ' + c.icon + '" aria-hidden="true"></i>' + esc(c.title) + '<span class="count">' + countFor(c.id) + '</span></button>';
      }).join('');
      $('#cat-chips').innerHTML = cats.map(function (c) { return '<button type="button" data-cat="' + c.id + '" aria-pressed="' + (state.cat === c.id) + '">' + esc(c.title) + '</button>'; }).join('');
    }
    function render() {
      var term = state.q.toLowerCase();
      var items = all.filter(function (p) {
        if (state.cat === 'saved') { if (!isWished(p.id)) return false; }
        else if (state.cat !== 'all' && p.cat !== state.cat) return false;
        if (!term) return true;
        var hay = (p.title + ' ' + catTitle(p.cat) + ' ' + Object.keys(p.specs).map(function (k) { return p.specs[k]; }).join(' ') + ' ' + (p.features || []).join(' ')).toLowerCase();
        return term.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
      });
      if (state.sort === 'low') items.sort(function (a, b) { return a.value - b.value; });
      if (state.sort === 'high') items.sort(function (a, b) { return b.value - a.value; });
      if (state.sort === 'name') items.sort(function (a, b) { return a.title.localeCompare(b.title); });
      var catName = state.cat === 'all' ? 'all categories' : state.cat === 'saved' ? 'your saved items' : catTitle(state.cat);
      line.textContent = items.length + ' product' + (items.length === 1 ? '' : 's') + ' in ' + catName + (state.q ? ' matching “' + state.q + '”' : '');
      var head = $('#cat-heading'), blurb = $('#cat-blurb');
      head.textContent = state.cat === 'all' ? 'All products' : state.cat === 'saved' ? 'Saved items' : catTitle(state.cat);
      blurb.textContent = state.cat === 'all' ? 'Browse 108 products across 12 categories, sold through authorized dealers.' : state.cat === 'saved' ? 'Products you saved with the heart button. Your list stays on this device.' : (PCC.categoryInfo[state.cat] || {}).blurb;
      if (!items.length) {
        list.innerHTML = '<div class="empty" style="grid-column:1/-1"><i class="fa-solid fa-magnifying-glass"></i><p>' +
          (state.cat === 'saved' && !state.q ? 'You haven’t saved anything yet. Tap the heart on any product to keep it here.' : 'No products match “' + esc(state.q) + '”. Try a brand name like Dell or a type like SSD.') +
          '</p><button class="btn btn-ghost" type="button" id="reset">Show all products</button></div>';
        $('#reset').onclick = function () { state.cat = 'all'; state.q = ''; q.value = ''; sync(); };
      } else list.innerHTML = items.map(card).join('');
    }
    function sync() {
      var u = new URLSearchParams(); if (state.cat !== 'all') u.set('cat', state.cat); if (state.q) u.set('q', state.q);
      history.replaceState(null, '', 'products.html' + (u.toString() ? '?' + u : ''));
      renderFilters(); render();
    }
    document.addEventListener('click', function (e) { var b = e.target.closest('[data-cat]'); if (b) { state.cat = b.getAttribute('data-cat'); sync(); } });
    document.addEventListener('pcc:wish', function () { renderFilters(); if (state.cat === 'saved') render(); });
    var t; q.value = state.q;
    q.addEventListener('input', function () { clearTimeout(t); t = setTimeout(function () { state.q = q.value.trim(); sync(); }, 150); });
    $('#search-form').addEventListener('submit', function (e) { e.preventDefault(); state.q = q.value.trim(); sync(); });
    sort.addEventListener('change', function () { state.sort = sort.value; render(); });
    if (params.get('focus') === 'search') q.focus();
    sync();
  };

  pages.detail = function () {
    var id = new URLSearchParams(location.search).get('id');
    var p = byId(id), root = $('#pd');
    if (!p) {
      root.innerHTML = '<div class="empty"><i class="fa-solid fa-box-open"></i><p>We couldn’t find that product. It may have been removed from the catalogue.</p><a class="btn btn-primary" href="products.html">Browse products</a></div>';
      return;
    }
    document.title = p.title + ' — PC Centre';
    $('#crumb-cat').textContent = catTitle(p.cat); $('#crumb-cat').href = 'products.html?cat=' + p.cat;
    $('#crumb-name').textContent = p.title;
    var qty = 1;
    root.innerHTML =
      '<div class="gallery"><div class="main"><img id="main-img" src="' + src(p.img[0]) + '" alt="' + esc(p.title) + '"></div>' +
        '<div class="thumbs">' + p.img.map(function (im, i) { return '<button type="button" data-img="' + i + '" aria-current="' + (i === 0) + '" aria-label="Show image ' + (i + 1) + '"><img src="' + src(im) + '" alt=""></button>'; }).join('') + '</div></div>' +
      '<div class="info"><span class="muted">' + esc(catTitle(p.cat)) + '</span><h1>' + esc(p.title) + '</h1>' +
        '<p class="price">' + pkr(p.value) + '</p><p class="stock"><i class="fa-solid fa-circle-check"></i> Available at partner dealers</p>' +
        '<div class="pd-meta"><div><i class="fa-solid fa-shield-halved"></i>' + esc(p.specs.Warranty || 'Manufacturer warranty') + '</div><div><i class="fa-solid fa-truck-fast"></i>Delivery in 2–4 days</div><div><i class="fa-solid fa-store"></i>Store pickup</div></div>' +
        '<div class="buy-row"><div class="qty" role="group" aria-label="Quantity"><button type="button" data-q="-1" aria-label="Decrease">−</button><output id="qty-val">1</output><button type="button" data-q="1" aria-label="Increase">+</button></div>' +
        '<button class="btn btn-primary" type="button" id="pd-add"><i class="fa-solid fa-cart-plus"></i> Add to cart</button>' +
        '<button class="btn btn-ghost square" type="button" data-wish="' + p.id + '" aria-pressed="' + isWished(p.id) + '" aria-label="Save to list">' + heart(p.id) + '</button></div>' +
        '<h2 class="h-small" style="font-size:1.15rem">Highlights</h2><ul class="features">' + (p.features || []).map(function (f) { return '<li><i class="fa-solid fa-check"></i>' + esc(f) + '</li>'; }).join('') + '</ul>' +
        '<h2 style="font-size:1.15rem">Specifications</h2><table class="specs"><tbody>' + Object.keys(p.specs).map(function (k) { return '<tr><th scope="row">' + esc(k) + '</th><td>' + esc(p.specs[k]) + '</td></tr>'; }).join('') + '</tbody></table>' +
      '</div>';
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-img]');
      if (b) { $('#main-img').src = src(p.img[+b.getAttribute('data-img')]); $$('[data-img]', root).forEach(function (x) { x.setAttribute('aria-current', x === b); }); }
      var s = e.target.closest('[data-q]');
      if (s) { qty = Math.max(1, Math.min(10, qty + parseInt(s.getAttribute('data-q'), 10))); $('#qty-val').textContent = qty; }
      if (e.target.closest('#pd-add')) addToCart(p.id, qty);
    });
    var rel = PCC.products[p.cat].filter(function (x) { return x.id !== p.id; }).slice(0, 4);
    $('#related').innerHTML = rel.map(card).join('');
    $('#related-title').textContent = 'More in ' + catTitle(p.cat);
  };

  pages.catalogue = function () {
    var brands = Object.keys(PCC.catalogue), tabs = $('#brand-tabs'), panel = $('#brand-panel');
    var names = { dell: 'Dell', hp: 'HP', acer: 'Acer', asus: 'Asus', toshiba: 'Toshiba' };
    function show(b) {
      $$('[role=tab]', tabs).forEach(function (t) { var on = t.getAttribute('data-brand') === b; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; });
      panel.setAttribute('aria-labelledby', 'tab-' + b);
      panel.innerHTML = '<div class="grid">' + PCC.catalogue[b].map(function (m) {
        return '<article class="cat-item"><div class="media"><img loading="lazy" src="' + src(m.img) + '" alt="' + esc(m.name) + '"></div><div class="body"><h3>' + esc(m.name) + '</h3><p class="spec">' + esc(m.spec) + '</p><span class="price">' + pkr(m.price) + '</span><span class="dealer"><i class="fa-solid fa-location-dot"></i>Dealer in ' + m.city + '</span></div></article>';
      }).join('') + '</div>';
    }
    tabs.innerHTML = brands.map(function (b) { return '<button role="tab" type="button" id="tab-' + b + '" data-brand="' + b + '" aria-controls="brand-panel">' + names[b] + '</button>'; }).join('');
    tabs.addEventListener('click', function (e) { var t = e.target.closest('[role=tab]'); if (t) { show(t.getAttribute('data-brand')); history.replaceState(null, '', '#' + t.getAttribute('data-brand')); } });
    tabs.addEventListener('keydown', function (e) {
      var ts = $$('[role=tab]', tabs), i = ts.indexOf(document.activeElement);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); var n = ts[(i + (e.key === 'ArrowRight' ? 1 : -1) + ts.length) % ts.length]; n.focus(); n.click(); }
    });
    var h = location.hash.slice(1); show(brands.indexOf(h) !== -1 ? h : 'dell');
    var dl = $('#dealer-list');
    if (dl) dl.innerHTML = PCC.dealers.map(function (d) { return '<li><strong>' + d.city + '</strong><span>' + d.area + '</span><a href="tel:' + d.phone.replace(/\s/g, '') + '">' + d.phone + '</a></li>'; }).join('');
  };

  /* simple form validation used by contact / login / signup */
  function validate(form, rules) {
    var ok = true;
    Object.keys(rules).forEach(function (id) {
      var el = form.querySelector('#' + id), f = el.closest('.field'), msg = rules[id](el.value.trim(), el);
      if (f) { f.classList.toggle('invalid', !!msg); var er = f.querySelector('.error'); if (er) er.textContent = msg || ''; }
      el.setAttribute('aria-invalid', !!msg);
      if (msg && ok) { el.focus(); ok = false; }
    });
    return ok;
  }
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function pwToggles() {
    $$('[data-toggle-pw]').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = b.previousElementSibling, show = i.type === 'password';
        i.type = show ? 'text' : 'password';
        b.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
        b.innerHTML = '<i class="fa-regular ' + (show ? 'fa-eye-slash' : 'fa-eye') + '"></i>';
      });
    });
  }

  pages.contact = function () {
    var form = $('#contact-form'), note = $('#contact-note');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form, {
        name: function (v) { return v ? '' : 'Enter your name.'; },
        email: function (v) { return emailRe.test(v) ? '' : 'Enter an email like name@example.com.'; },
        message: function (v) { return v.length >= 10 ? '' : 'Write at least 10 characters so we can help.'; }
      })) return;
      var topic = $('#topic').value;
      var body = encodeURIComponent($('#message').value + '\n\n— ' + $('#name').value + ' (' + $('#email').value + ')');
      location.href = 'mailto:info@pccentre.com?subject=' + encodeURIComponent('[' + topic + '] Message from ' + $('#name').value) + '&body=' + body;
      note.className = 'notice ok show';
      note.textContent = 'Your email app is opening with the message ready. Prefer chat? Use the WhatsApp button.';
    });
  };

  pages.login = function () {
    pwToggles();
    var form = $('#login-form'), note = $('#auth-note');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form, {
        email: function (v) { return emailRe.test(v) ? '' : 'Enter the email you signed up with.'; },
        password: function (v) { return v.length >= 8 ? '' : 'Password must be at least 8 characters.'; }
      })) return;
      var users = store.get('users', {}), em = $('#email').value.trim().toLowerCase(), u = users[em];
      if (!u || u.pw !== $('#password').value) { note.className = 'notice err show'; note.textContent = 'That email and password don’t match an account on this device. Check them or create an account.'; return; }
      store.set('user', { name: u.first, email: em });
      note.className = 'notice ok show'; note.textContent = 'Logged in. Taking you to products…';
      setTimeout(function () { location.href = 'products.html'; }, 800);
    });
  };

  pages.signup = function () {
    pwToggles();
    var form = $('#signup-form'), note = $('#auth-note');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form, {
        first: function (v) { return v ? '' : 'Enter your first name.'; },
        last: function (v) { return v ? '' : 'Enter your last name.'; },
        email: function (v) { return emailRe.test(v) ? '' : 'Enter an email like name@example.com.'; },
        phone: function (v) { return /^(\+92|0)3\d{2}[\s-]?\d{7}$/.test(v.replace(/\s/g, '')) ? '' : 'Enter a mobile number like 0300 1234567.'; },
        password: function (v) { return v.length >= 8 ? '' : 'Use at least 8 characters.'; },
        confirm: function (v) { return v && v === $('#password').value ? '' : 'Passwords don’t match.'; },
        terms: function (v, el) { return el.checked ? '' : 'Accept the terms to create an account.'; }
      })) return;
      var users = store.get('users', {}), em = $('#email').value.trim().toLowerCase();
      if (users[em]) { note.className = 'notice err show'; note.innerHTML = 'An account with this email already exists. <a href="login.html">Log in instead</a>.'; return; }
      users[em] = { first: $('#first').value.trim(), pw: $('#password').value };
      store.set('users', users); store.set('user', { name: users[em].first, email: em });
      note.className = 'notice ok show'; note.textContent = 'Account created. Welcome, ' + users[em].first + '!';
      setTimeout(function () { location.href = 'products.html'; }, 900);
    });
  };

  /* ---------- boot ---------- */
  renderHeader(); renderFooter(); buildDrawer(); updateCartUI();
  if (!$('.wa-float')) {
    var wa = document.createElement('a'); wa.className = 'wa-float'; wa.href = 'https://wa.me/' + WHATSAPP; wa.target = '_blank'; wa.rel = 'noopener';
    wa.setAttribute('aria-label', 'Chat with us on WhatsApp'); wa.innerHTML = '<i class="fa-brands fa-whatsapp"></i>'; document.body.appendChild(wa);
  }
  var pg = document.body.getAttribute('data-page');
  if (pages[pg]) pages[pg]();
})();
