/* Ruta Merindades en Familia — lógica de la PWA (JS vanilla) */
(function () {
  'use strict';

  var DATA = window.TRIP_DATA;
  var STORE_KEY = 'merindades-2026:done';
  var TAB_KEY = 'merindades-2026:tab';

  var CATEGORIES = {
    cultura:    { label: 'Cultura',    icon: '🏰' },
    naturaleza: { label: 'Naturaleza', icon: '🌿' },
    comida:     { label: 'Comida',     icon: '🍽️' },
    logistica:  { label: 'Logística',  icon: '🚗' },
    relax:      { label: 'Relax',      icon: '🧺' }
  };

  var TERRAIN = {
    llano:    { label: 'Terreno llano',   icon: '🛣️' },
    mixto:    { label: 'Terreno mixto',   icon: '🥾' },
    empinado: { label: 'Cuestas y adoquín', icon: '⛰️' },
    asfalto:  { label: 'En coche',        icon: '🚙' }
  };

  /* ---------- utilidades ---------- */

  function $(sel) { return document.querySelector(sel); }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function mapsUrl(lat, lng) {
    return 'https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng;
  }

  function activityId(dayId, act) {
    return dayId + '|' + act.time + '|' + act.title;
  }

  /* ---------- estado persistente ---------- */

  function loadDone() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch (e) { return {}; }
  }

  function saveDone(state) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
    catch (e) { /* modo privado o cuota: la app sigue funcionando */ }
  }

  var done = loadDone();

  function totalActivities() {
    return DATA.days.reduce(function (n, d) { return n + d.activities.length; }, 0);
  }

  function doneCount() {
    var ids = {};
    DATA.days.forEach(function (d) {
      d.activities.forEach(function (a) { ids[activityId(d.id, a)] = true; });
    });
    return Object.keys(done).filter(function (k) { return done[k] && ids[k]; }).length;
  }

  function refreshProgress() {
    var total = totalActivities();
    var n = doneCount();
    var pct = total ? Math.round((n / total) * 100) : 0;
    $('#progress-bar').style.width = pct + '%';
    $('#progress-text').textContent = n + ' de ' + total + ' hitos completados';
  }

  /* ---------- toast ---------- */

  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.add('hidden'); }, 2200);
  }

  /* ---------- pestañas ---------- */

  var TABS = DATA.days.map(function (d) {
    return { id: d.id, label: d.short || d.label, day: d };
  }).concat([{ id: 'info', label: 'Info útil' }]);

  var currentTab = (function () {
    var saved = localStorage.getItem(TAB_KEY);
    var valid = TABS.some(function (t) { return t.id === saved; });
    return valid ? saved : TABS[0].id;
  })();

  function renderTabs() {
    var nav = $('#tabs');
    nav.innerHTML = '';
    TABS.forEach(function (t) {
      var active = t.id === currentTab;
      var b = el('button',
        'flex-1 px-2 py-3 text-[13px] font-semibold border-b-[3px] transition ' +
        (active ? 'border-lime-300 text-white' : 'border-transparent text-brand-100/80'),
        esc(t.label));
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', active ? 'true' : 'false');
      b.addEventListener('click', function () {
        currentTab = t.id;
        try { localStorage.setItem(TAB_KEY, t.id); } catch (e) {}
        renderTabs();
        renderContent();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      nav.appendChild(b);
    });
  }

  /* ---------- tarjetas de actividad ---------- */

  function badge(text, cls) {
    return '<span class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ' + cls + '">' + text + '</span>';
  }

  function logisticsBadges(a) {
    var out = [];
    if (a.babyStroller) {
      out.push(badge('🍼 Apto carrito', 'bg-emerald-100 text-emerald-800'));
    } else {
      out.push(badge('🚫 Sin carrito', 'bg-rose-100 text-rose-800'));
    }
    if (a.carrier) out.push(badge('🎒 Mochila de porteo', 'bg-amber-100 text-amber-900'));
    var t = TERRAIN[a.terrain];
    if (t) out.push(badge(t.icon + ' ' + t.label, 'bg-slate-100 text-slate-700'));
    return out.join('');
  }

  function activityCard(dayId, a, isLast) {
    var id = activityId(dayId, a);
    var isDone = !!done[id];
    var cat = CATEGORIES[a.category] || { label: a.category || 'Plan', icon: '📍' };
    var catCls = CATEGORIES[a.category] ? 'cat-' + a.category : 'cat-default';

    var wrap = el('article', 'relative pl-9 rise ' + catCls + (isDone ? ' done' : ''));
    wrap.dataset.id = id;

    // Raíl del timeline
    var rail = '';
    if (!isLast) rail = '<span class="absolute left-[13px] top-7 bottom-[-18px] w-[2px] cat-rail rounded"></span>';
    var dot = '<span class="absolute left-[6px] top-4 w-4 h-4 rounded-full cat-dot ring-4 ring-slate-100"></span>';

    wrap.innerHTML = rail + dot +
      '<div class="card bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden mb-4">' +
        '<div class="card-body p-4">' +
          '<div class="flex items-start justify-between gap-3">' +
            '<div class="min-w-0">' +
              '<div class="flex items-center gap-2 flex-wrap">' +
                '<span class="text-base font-black tabular-nums text-slate-900">' + esc(a.time) + '</span>' +
                '<span class="cat-chip inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide">' +
                  cat.icon + ' ' + esc(cat.label) +
                '</span>' +
              '</div>' +
              '<h3 class="card-title mt-1.5 text-[17px] font-bold leading-snug text-slate-900">' + esc(a.title) + '</h3>' +
              '<p class="text-[13px] text-slate-500 mt-0.5">📍 ' + esc(a.location) + '</p>' +
            '</div>' +
            '<button type="button" data-action="toggle" aria-pressed="' + isDone + '" aria-label="Marcar como completado"' +
              ' class="shrink-0 w-9 h-9 rounded-full grid place-items-center border-2 transition ' +
              (isDone ? 'bg-lime-500 border-lime-500 text-white' : 'border-slate-300 text-transparent hover:border-slate-400') + '">' +
              '<svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>' +
            '</button>' +
          '</div>' +

          '<p class="mt-3 text-[14px] leading-relaxed text-slate-700">' + esc(a.description) + '</p>' +

          '<div class="mt-3 flex flex-wrap gap-1.5">' + logisticsBadges(a) + '</div>' +

          (a.logisticsTip ?
            '<p class="mt-3 text-[13px] leading-relaxed bg-slate-50 border-l-4 border-slate-300 rounded-r-lg px-3 py-2 text-slate-600">' +
              '<strong class="text-slate-800">Con las niñas:</strong> ' + esc(a.logisticsTip) +
            '</p>' : '') +
        '</div>' +

        '<a href="' + mapsUrl(a.lat, a.lng) + '" target="_blank" rel="noopener"' +
          ' class="btn flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold py-3 text-[14px] active:bg-slate-700 transition">' +
          '<svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>' +
          'Cómo llegar' +
        '</a>' +
      '</div>';

    wrap.querySelector('[data-action="toggle"]').addEventListener('click', function () {
      if (done[id]) { delete done[id]; } else { done[id] = true; }
      saveDone(done);
      toast(done[id] ? '✅ ' + a.title : 'Marcado como pendiente');
      renderContent();
      refreshProgress();
    });

    return wrap;
  }

  /* ---------- vistas ---------- */

  function renderDay(day) {
    var frag = document.createDocumentFragment();

    var head = el('div', 'mb-4 mt-4');
    head.innerHTML =
      '<h2 class="text-xl font-black text-slate-900 leading-tight">' + esc(day.label) + '</h2>' +
      '<p class="text-[13px] text-slate-500 mt-0.5">' + esc(day.activities.length) + ' hitos · ' + esc(day.date) + '</p>';
    frag.appendChild(head);

    day.activities.forEach(function (a, i) {
      frag.appendChild(activityCard(day.id, a, i === day.activities.length - 1));
    });

    return frag;
  }

  function renderInfo() {
    var base = DATA.trip.base;
    var info = DATA.info || {};
    var frag = document.createDocumentFragment();

    var host = el('section', 'mt-4 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden');
    host.innerHTML =
      '<div class="p-4">' +
        '<p class="text-[11px] font-bold uppercase tracking-wide text-brand-700">Alojamiento base</p>' +
        '<h2 class="mt-1 text-lg font-bold text-slate-900">' + esc(base.name) + '</h2>' +
        '<p class="text-[14px] text-slate-600 mt-1">📍 ' + esc(base.address) + '</p>' +
      '</div>' +
      '<a href="' + mapsUrl(base.lat, base.lng) + '" target="_blank" rel="noopener"' +
        ' class="btn flex items-center justify-center gap-2 bg-brand-700 text-white font-semibold py-3 text-[14px]">Cómo llegar al hotel</a>';
    frag.appendChild(host);

    if (info.contacts && info.contacts.length) {
      var c = el('section', 'mt-4 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-4');
      c.innerHTML =
        '<h2 class="text-base font-bold text-slate-900 mb-3">Teléfonos útiles</h2>' +
        '<div class="grid gap-2">' +
          info.contacts.map(function (k) {
            return '<a href="tel:' + esc(k.tel) + '" class="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 active:bg-slate-100">' +
              '<span class="text-[14px] text-slate-700">' + esc(k.label) + '</span>' +
              '<span class="text-[14px] font-semibold text-brand-700">' + esc(k.value) + '</span></a>';
          }).join('') +
        '</div>';
      frag.appendChild(c);
    }

    if (info.packing && info.packing.length) {
      var p = el('section', 'mt-4 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-4');
      p.innerHTML =
        '<h2 class="text-base font-bold text-slate-900 mb-3">🎒 Qué llevar</h2>' +
        '<ul class="space-y-2">' +
          info.packing.map(function (i) {
            return '<li class="flex gap-2 text-[14px] text-slate-700"><span class="text-brand-600">•</span><span>' + esc(i) + '</span></li>';
          }).join('') +
        '</ul>';
      frag.appendChild(p);
    }

    if (info.notes && info.notes.length) {
      var n = el('section', 'mt-4 bg-amber-50 rounded-2xl ring-1 ring-amber-200 p-4');
      n.innerHTML =
        '<h2 class="text-base font-bold text-amber-900 mb-3">⚠️ No olvidar</h2>' +
        '<ul class="space-y-2">' +
          info.notes.map(function (i) {
            return '<li class="text-[14px] text-amber-900/90 leading-relaxed">' + esc(i) + '</li>';
          }).join('') +
        '</ul>';
      frag.appendChild(n);
    }

    var install = el('section', 'mt-4');
    install.innerHTML =
      '<button id="install-btn" type="button" class="hidden w-full rounded-2xl bg-brand-700 text-white font-semibold py-3.5 shadow">' +
        '📲 Instalar la app en el móvil</button>' +
      '<p class="mt-3 text-[12px] text-slate-500 leading-relaxed text-center">' +
        'Esta guía funciona sin cobertura una vez abierta con conexión. En iPhone: <em>Compartir → Añadir a pantalla de inicio</em>.</p>';
    frag.appendChild(install);

    return frag;
  }

  function renderContent() {
    var main = $('#content');
    main.innerHTML = '';
    var tab = TABS.filter(function (t) { return t.id === currentTab; })[0];
    main.appendChild(tab && tab.day ? renderDay(tab.day) : renderInfo());
    wireInstallButton();
  }

  /* ---------- instalación PWA ---------- */

  var deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    wireInstallButton();
  });

  function wireInstallButton() {
    var btn = document.getElementById('install-btn');
    if (!btn || !deferredPrompt) return;
    btn.classList.remove('hidden');
    btn.onclick = function () {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function () {
        deferredPrompt = null;
        btn.classList.add('hidden');
      });
    };
  }

  /* ---------- ajuste del alto de la cabecera fija ---------- */

  function syncHeaderOffset() {
    var h = document.querySelector('header').offsetHeight;
    $('#content').style.paddingTop = (h + 8) + 'px';
  }

  /* ---------- conectividad ---------- */

  function updateNet() {
    $('#net-badge').classList.toggle('hidden', navigator.onLine);
  }
  window.addEventListener('online', updateNet);
  window.addEventListener('offline', updateNet);

  /* ---------- arranque ---------- */

  function init() {
    $('#trip-title').textContent = DATA.trip.title;
    $('#trip-dates').textContent = DATA.trip.dates;
    $('#base-nav').href = mapsUrl(DATA.trip.base.lat, DATA.trip.base.lng);

    $('#reset-btn').addEventListener('click', function () {
      if (!confirm('¿Reiniciar todas las marcas de actividades completadas?')) return;
      done = {};
      saveDone(done);
      renderContent();
      refreshProgress();
      toast('Checklist reiniciado');
    });

    renderTabs();
    renderContent();
    refreshProgress();
    updateNet();
    syncHeaderOffset();
    window.addEventListener('resize', syncHeaderOffset);
    window.addEventListener('orientationchange', syncHeaderOffset);

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').catch(function (e) {
          console.warn('Service Worker no registrado:', e);
        });
      });
    }
  }

  if (!DATA) {
    document.getElementById('content').innerHTML =
      '<p class="mt-6 text-center text-slate-500">No se han podido cargar los datos del viaje.</p>';
  } else {
    init();
  }
})();
