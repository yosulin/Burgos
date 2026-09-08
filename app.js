/* Ruta Merindades en Familia — lógica de la PWA (JS vanilla) */
(function () {
  'use strict';

  var DATA = window.TRIP_DATA;
  var STORE_KEY = 'merindades-2026:done';
  var PACK_KEY = 'merindades-2026:packing';
  var TAB_KEY = 'merindades-2026:tab';

  /* Tipos de tarjeta: icono, etiqueta y clase de color (styles.css). */
  var TYPES = {
    visita:     { icon: '🏰', label: 'Visita' },
    comida:     { icon: '🍽', label: 'Comida' },
    clima:      { icon: '🌤', label: 'Clima' },
    bano:       { icon: '🏊', label: 'Baño' },
    reserva:    { icon: '🎟', label: 'Reserva' },
    transporte: { icon: '🚗', label: 'Transporte' },
    relax:      { icon: '🧺', label: 'Descanso' }
  };

  /* Umbrales para sugerir bañador (nunca afirma que el baño sea seguro). */
  var SWIM_MIN_TEMP = 24;
  var SWIM_MAX_RAIN = 30;

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

  /* Para restaurantes usamos búsqueda por nombre en vez de coordenadas
     inventadas: Maps resuelve la ficha real del local. */
  function mapsSearch(query) {
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
  }

  function mapsPlace(query) {
    return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(query);
  }

  function mapsRoute(route) {
    var u = 'https://www.google.com/maps/dir/?api=1&origin=' + encodeURIComponent(route.origin) +
            '&destination=' + encodeURIComponent(route.destination) + '&travelmode=driving';
    if (route.waypoints && route.waypoints.length) {
      u += '&waypoints=' + encodeURIComponent(route.waypoints.join('|'));
    }
    return u;
  }

  function activityId(dayId, act) {
    return dayId + '|' + act.time + '|' + act.title;
  }

  /* ---------- estado persistente ---------- */

  function loadStore(key) {
    try { return JSON.parse(localStorage.getItem(key)) || {}; }
    catch (e) { return {}; }
  }

  function saveStore(key, state) {
    try { localStorage.setItem(key, JSON.stringify(state)); }
    catch (e) { /* modo privado o cuota llena: la app sigue funcionando */ }
  }

  var done = loadStore(STORE_KEY);
  var packed = loadStore(PACK_KEY);

  /* El baño es opcional: no cuenta para el progreso del fin de semana. */
  function countableActivities() {
    var list = [];
    DATA.days.forEach(function (d) {
      d.activities.forEach(function (a) {
        if (!a.optional) list.push(activityId(d.id, a));
      });
    });
    return list;
  }

  function refreshProgress() {
    var ids = countableActivities();
    var n = ids.filter(function (id) { return done[id]; }).length;
    var pct = ids.length ? Math.round((n / ids.length) * 100) : 0;
    $('#progress-bar').style.width = pct + '%';
    $('#progress-text').textContent = n + ' de ' + ids.length + ' momentos completados';
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

  /* ---------- clima ---------- */

  var weatherState = window.Weather ? window.Weather.get() : null;

  function spotForecast(spotId) {
    return weatherState && weatherState.spots ? weatherState.spots[spotId] : null;
  }

  function isSwimWeather(f) {
    return !!f && typeof f.max === 'number' && f.max >= SWIM_MIN_TEMP &&
           (typeof f.rain !== 'number' || f.rain <= SWIM_MAX_RAIN);
  }

  function weatherCardHtml(spotId, opts) {
    var f = spotForecast(spotId);
    var stale = weatherState && !navigator.onLine;
    var head = '<div class="flex items-center gap-2 mb-2">' +
        '<span class="type-chip inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide">🌤 Clima</span>' +
      '</div>';

    if (!f) {
      return '<section class="type-clima bg-white rounded-2xl ring-1 ring-slate-200 p-4 mb-4">' + head +
        '<p class="text-[13px] text-slate-400">Previsión no disponible.</p></section>';
    }

    var d = window.Weather.describe(f.code);
    var wind = (typeof f.wind === 'number' && f.wind >= 25)
      ? '<span class="text-[12px] text-slate-500">💨 ' + Math.round(f.wind) + ' km/h</span>' : '';

    var swim = (opts && opts.swimHint && isSwimWeather(f))
      ? '<p class="mt-3 text-[13px] bg-sky-50 text-sky-900 rounded-xl px-3 py-2 leading-relaxed">' +
        '🏊 Puede ser buen día para llevar bañador a Puentedey.</p>' : '';

    return '<section class="type-clima bg-white rounded-2xl ring-1 ring-slate-200 p-4 mb-4">' + head +
      '<div class="flex items-center gap-3">' +
        '<span class="text-4xl leading-none">' + d[0] + '</span>' +
        '<div class="min-w-0">' +
          '<p class="text-[15px] font-bold text-slate-900 leading-tight">' + esc(d[1]) + '</p>' +
          '<p class="text-[12px] text-slate-500">' + esc(f.label) + '</p>' +
        '</div>' +
        '<div class="ml-auto text-right">' +
          '<p class="text-[18px] font-black text-slate-900 tabular-nums">' + Math.round(f.max) + '°' +
            '<span class="text-[13px] font-semibold text-slate-400"> / ' + Math.round(f.min) + '°</span></p>' +
          '<p class="text-[12px] text-slate-500 tabular-nums">💧 ' +
            (typeof f.rain === 'number' ? f.rain + '%' : '—') + '</p>' +
        '</div>' +
      '</div>' +
      (wind ? '<div class="mt-2">' + wind + '</div>' : '') +
      swim +
      '<p class="mt-2 text-[11px] text-slate-400">' +
        (stale ? 'Sin conexión · última actualización: ' : 'Última actualización: ') +
        esc(window.Weather.updatedAt(weatherState)) + '</p>' +
    '</section>';
  }

  /* ---------- pestañas ---------- */

  var TABS = DATA.days.map(function (d) {
    return { id: d.id, label: d.short || d.label, day: d };
  }).concat([{ id: 'info', label: 'Info útil' }]);

  var currentTab = (function () {
    var saved = localStorage.getItem(TAB_KEY);
    return TABS.some(function (t) { return t.id === saved; }) ? saved : TABS[0].id;
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

  /* ---------- piezas reutilizables ---------- */

  function navButton(href, label, tone) {
    var cls = tone === 'light'
      ? 'bg-white text-slate-900 ring-1 ring-slate-300 active:bg-slate-100'
      : 'bg-slate-900 text-white active:bg-slate-700';
    return '<a href="' + href + '" target="_blank" rel="noopener"' +
      ' class="flex items-center justify-center gap-2 rounded-xl font-semibold py-3 text-[14px] transition ' + cls + '">' +
      '<svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>' +
      esc(label) + '</a>';
  }

  function callButton(tel, label) {
    return '<a href="tel:' + esc(tel) + '"' +
      ' class="flex items-center justify-center gap-2 rounded-xl bg-brand-700 text-white font-semibold py-3 text-[14px] active:bg-brand-600 transition">' +
      '<svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>' +
      esc(label) + '</a>';
  }

  /* Opciones de restaurante: llamar + abrir en Maps. */
  function optionsHtml(options) {
    return options.map(function (o) {
      return '<div class="rounded-xl bg-slate-50 ring-1 ring-slate-200 p-3">' +
        '<p class="text-[15px] font-bold text-slate-900">' + esc(o.name) + '</p>' +
        (o.note ? '<p class="mt-0.5 text-[12px] text-slate-500 leading-relaxed">' + esc(o.note) + '</p>' : '') +
        '<div class="mt-2.5 grid grid-cols-2 gap-2">' +
          callButton(o.tel, o.phone) +
          navButton(mapsSearch(o.query), 'Maps', 'light') +
        '</div>' +
      '</div>';
    }).join('');
  }

  function highlightsHtml(items) {
    return '<ul class="mt-3 grid gap-1">' + items.map(function (h) {
      return '<li class="flex gap-2 text-[13.5px] text-slate-700"><span class="type-bullet">•</span><span>' + esc(h) + '</span></li>';
    }).join('') + '</ul>';
  }

  /* ---------- tarjeta de actividad ---------- */

  function activityCard(dayId, a, isLast) {
    var id = activityId(dayId, a);
    var isDone = !!done[id];
    var type = TYPES[a.type] || TYPES.visita;
    var typeCls = 'type-' + (TYPES[a.type] ? a.type : 'visita');

    var wrap = el('article', 'relative pl-9 rise ' + typeCls + (isDone ? ' done' : ''));

    var rail = isLast ? '' : '<span class="absolute left-[13px] top-7 bottom-[-18px] w-[2px] type-rail rounded"></span>';
    var dot = '<span class="absolute left-[6px] top-4 w-4 h-4 rounded-full type-dot ring-4 ring-slate-100"></span>';

    var body = '';

    if (a.duration) {
      body += '<p class="mt-2 text-[12px] font-semibold text-slate-500">⏱ ' + esc(a.duration) + ' aprox.</p>';
    }
    if (a.description) {
      body += '<p class="mt-2 text-[14px] leading-relaxed text-slate-700">' + esc(a.description) + '</p>';
    }
    if (a.reserva) {
      body += '<p class="mt-3 rounded-xl bg-amber-50 ring-1 ring-amber-200 px-3 py-2.5 text-[13px] leading-relaxed text-amber-900">' +
        '<strong>🎟 Reserva necesaria / comprobar horario.</strong> ' + esc(a.reservaNote || '') + '</p>';
    }
    if (a.highlights) body += highlightsHtml(a.highlights);
    if (a.info) {
      body += '<p class="mt-3 text-[13px] leading-relaxed text-slate-600 bg-slate-50 rounded-xl px-3 py-2">' + esc(a.info) + '</p>';
    }
    if (a.notes) {
      body += '<ul class="mt-3 grid gap-1.5">' + a.notes.map(function (n) {
        return '<li class="flex gap-2 text-[13px] text-slate-600 leading-relaxed"><span class="text-slate-400">·</span><span>' + esc(n) + '</span></li>';
      }).join('') + '</ul>';
    }
    if (a.checklist) {
      body += '<div class="mt-3 rounded-xl bg-sky-50 ring-1 ring-sky-200 px-3 py-2.5">' +
        '<p class="text-[12px] font-bold text-sky-900 uppercase tracking-wide">🎒 ' + esc(a.checklistTitle || 'Llevar') + '</p>' +
        '<p class="mt-1 text-[13px] text-sky-900/90 leading-relaxed">' + a.checklist.map(esc).join(' · ') + '</p></div>';
    }
    if (a.options) {
      body += '<div class="mt-3 grid gap-2">' + optionsHtml(a.options) + '</div>';
      if (a.open) {
        body += '<p class="mt-2 text-[12px] text-slate-500">Sin elegir todavía: lo decidimos entre todos.</p>';
      }
    }
    if (a.logistics) {
      body += '<p class="mt-3 text-[12px] text-slate-500 leading-relaxed">👣 ' + esc(a.logistics) + '</p>';
    }

    /* Pie de la tarjeta: navegación. */
    var foot = '';
    if (a.farewell) {
      foot = '<div class="grid gap-2 p-3 pt-0">' +
        DATA.trip.returns.map(function (r) {
          return navButton(mapsPlace(r.query), '🚗 ' + r.label);
        }).join('') + '</div>';
    } else if (a.lat != null) {
      var links = [navButton(mapsUrl(a.lat, a.lng), 'Cómo llegar')];
      (a.extraLinks || []).forEach(function (x) {
        links.push(navButton(mapsUrl(x.lat, x.lng), x.label, 'light'));
      });
      foot = '<div class="grid gap-2 p-3 pt-0">' + links.join('') + '</div>';
    }

    wrap.innerHTML = rail + dot +
      '<div class="card bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden mb-4">' +
        '<div class="card-body p-4 pb-3">' +
          '<div class="flex items-start justify-between gap-3">' +
            '<div class="min-w-0">' +
              '<div class="flex items-center gap-2 flex-wrap">' +
                '<span class="text-[13px] font-bold text-slate-500">' + esc(a.time) + '</span>' +
                '<span class="type-chip inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide">' +
                  type.icon + ' ' + esc(type.label) + '</span>' +
                (a.optional ? '<span class="rounded-full bg-slate-100 text-slate-500 px-2 py-0.5 text-[11px] font-semibold">Opcional</span>' : '') +
              '</div>' +
              '<h3 class="card-title mt-1 text-[18px] font-bold leading-snug text-slate-900">' + esc(a.title) + '</h3>' +
              (a.location ? '<p class="text-[13px] text-slate-500 mt-0.5">📍 ' + esc(a.location) + '</p>' : '') +
            '</div>' +
            '<button type="button" data-action="toggle" aria-pressed="' + isDone + '" aria-label="Marcar como hecho"' +
              ' class="shrink-0 w-11 h-11 -mr-1 -mt-1 rounded-full grid place-items-center transition">' +
              '<span class="w-9 h-9 rounded-full grid place-items-center border-2 ' +
                (isDone ? 'bg-lime-500 border-lime-500 text-white' : 'border-slate-300 text-transparent') + '">' +
                '<svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>' +
              '</span>' +
            '</button>' +
          '</div>' + body +
        '</div>' + foot +
      '</div>';

    wrap.querySelector('[data-action="toggle"]').addEventListener('click', function () {
      if (done[id]) { delete done[id]; } else { done[id] = true; }
      saveStore(STORE_KEY, done);
      toast(done[id] ? '✅ ' + a.title : 'Marcado como pendiente');
      renderContent();
      refreshProgress();
    });

    return wrap;
  }

  /* ---------- vista de día ---------- */

  function renderDay(day) {
    var frag = document.createDocumentFragment();

    var head = el('div', 'mb-4 mt-4');
    head.innerHTML =
      '<h2 class="text-xl font-black text-slate-900 leading-tight">' + esc(day.label) + '</h2>' +
      '<p class="text-[13px] text-slate-500 mt-0.5">Horarios orientativos · sin prisa</p>';
    frag.appendChild(head);

    if (day.weatherSpot) {
      frag.appendChild(el('div', '', weatherCardHtml(day.weatherSpot, { swimHint: day.id === 'day-2' })));
    }

    if (day.route) {
      var r = el('section', 'mb-5 rounded-2xl bg-white ring-1 ring-slate-200 p-4');
      r.innerHTML =
        '<p class="text-[12px] font-bold uppercase tracking-wide text-slate-500">🚗 ' + esc(day.route.label) + '</p>' +
        '<p class="mt-1 text-[13px] text-slate-600">' + esc(day.route.note) + '</p>' +
        '<div class="mt-3">' + navButton(mapsRoute(day.route), 'Abrir ruta completa en Maps') + '</div>';
      frag.appendChild(r);
    }

    day.activities.forEach(function (a, i) {
      frag.appendChild(activityCard(day.id, a, i === day.activities.length - 1));
    });

    return frag;
  }

  /* ---------- pestaña Info útil ---------- */

  function section(icon, title, innerHtml, cls) {
    return '<section class="mt-4 rounded-2xl ring-1 p-4 ' + (cls || 'bg-white ring-slate-200') + '">' +
      '<h2 class="text-base font-bold text-slate-900 mb-3">' + icon + ' ' + esc(title) + '</h2>' +
      innerHtml + '</section>';
  }

  function bullets(items, cls) {
    return '<ul class="grid gap-2">' + items.map(function (i) {
      return '<li class="flex gap-2 text-[14px] leading-relaxed ' + (cls || 'text-slate-700') + '">' +
        '<span class="text-brand-600">•</span><span>' + esc(i) + '</span></li>';
    }).join('') + '</ul>';
  }

  function renderInfo() {
    var base = DATA.trip.base;
    var info = DATA.info || {};
    var host = el('div', '');
    var html = '';

    /* 🏠 Alojamiento */
    html += section('🏠', 'Alojamiento',
      '<p class="text-[15px] font-bold text-slate-900">' + esc(base.name) + '</p>' +
      '<p class="text-[13px] text-slate-600 mt-1">📍 ' + esc(base.address) + '</p>' +
      (DATA.trip.group ? '<p class="text-[13px] text-slate-500 mt-2">👨‍👩‍👧‍👧 ' + esc(DATA.trip.group) + '</p>' : '') +
      '<div class="mt-3">' + navButton(mapsUrl(base.lat, base.lng), 'Cómo llegar al alojamiento') + '</div>');

    /* 🍽 Restaurantes */
    var restHtml = '';
    DATA.days.forEach(function (d) {
      d.activities.forEach(function (a) {
        if (!a.options) return;
        restHtml += '<p class="text-[12px] font-bold uppercase tracking-wide text-slate-500 mt-3 first:mt-0">' +
          esc(d.short) + ' · ' + esc(a.title) + '</p>' +
          '<div class="mt-2 grid gap-2">' + optionsHtml(a.options) + '</div>';
      });
    });
    html += section('🍽', 'Restaurantes', restHtml);

    /* 🎟 Reservas */
    if (info.reservas) html += section('🎟', 'Reservas', bullets(info.reservas));

    /* 🌤 Tiempo */
    var wHtml = DATA.trip.weatherSpots.map(function (s) {
      return weatherCardHtml(s.id, { swimHint: false });
    }).join('') +
      '<button id="weather-refresh" type="button" class="w-full rounded-xl bg-slate-100 text-slate-700 font-semibold py-2.5 text-[13px] active:bg-slate-200">Actualizar previsión</button>';
    html += section('🌤', 'Tiempo', wHtml);

    /* 🏊 Baño */
    if (info.bano) html += section('🏊', 'Baño', bullets(info.bano));

    /* 🎒 Qué llevar (checklist propio) */
    html += section('🎒', 'Qué llevar',
      '<div class="grid gap-1.5" id="packing-list">' +
      info.packing.map(function (item, i) {
        var on = !!packed[item];
        return '<button type="button" data-pack="' + i + '" class="flex items-center gap-3 text-left rounded-xl px-3 py-2.5 transition ' +
          (on ? 'bg-lime-50' : 'bg-slate-50 active:bg-slate-100') + '">' +
          '<span class="shrink-0 w-6 h-6 rounded-md grid place-items-center border-2 ' +
            (on ? 'bg-lime-500 border-lime-500 text-white' : 'border-slate-300 text-transparent') + '">' +
            '<svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>' +
          '</span>' +
          '<span class="text-[14px] ' + (on ? 'text-slate-400 line-through' : 'text-slate-700') + '">' + esc(item) + '</span>' +
        '</button>';
      }).join('') + '</div>');

    /* ☎️ Teléfonos */
    var phones = [];
    DATA.days.forEach(function (d) {
      d.activities.forEach(function (a) {
        (a.options || []).forEach(function (o) {
          phones.push({ label: o.name, value: o.phone, tel: o.tel });
        });
      });
    });
    html += section('☎️', 'Teléfonos',
      '<div class="grid gap-2">' + phones.map(function (p) {
        return '<a href="tel:' + esc(p.tel) + '" class="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-3 active:bg-slate-100">' +
          '<span class="text-[14px] text-slate-700">' + esc(p.label) + '</span>' +
          '<span class="text-[14px] font-bold text-brand-700 tabular-nums whitespace-nowrap">' + esc(p.value) + '</span></a>';
      }).join('') + '</div>' +
      '<p class="mt-3 text-[12px] text-slate-400 leading-relaxed">Solo teléfonos confirmados. El del alojamiento no está en la app: añádelo en <code>data.js</code> cuando lo tengas.</p>');

    /* 🚗 Regreso */
    html += section('🚗', 'Regreso',
      '<p class="text-[14px] text-slate-700 leading-relaxed">Después de comer el domingo, cada familia empieza su camino.</p>' +
      '<div class="mt-3 grid gap-2">' +
        DATA.trip.returns.map(function (r) {
          return navButton(mapsPlace(r.query), '🚗 ' + r.label);
        }).join('') + '</div>');

    /* 🆘 Emergencias */
    html += section('🆘', 'Emergencias',
      '<div class="grid gap-2">' + (info.contacts || []).map(function (c) {
        return callButton(c.tel, c.label + ' · ' + c.value);
      }).join('') + '</div>', 'bg-rose-50 ring-rose-200');

    /* Notas + instalación */
    if (info.notes) {
      html += section('📌', 'A tener en cuenta', bullets(info.notes, 'text-amber-900/90'), 'bg-amber-50 ring-amber-200');
    }
    html += '<div class="mt-4">' +
      '<button id="install-btn" type="button" class="hidden w-full rounded-2xl bg-brand-700 text-white font-semibold py-3.5 shadow">📲 Instalar la app en el móvil</button>' +
      '<p class="mt-3 text-[12px] text-slate-500 leading-relaxed text-center">Funciona sin cobertura una vez abierta con conexión. En iPhone: <em>Compartir → Añadir a pantalla de inicio</em>.</p></div>';

    host.innerHTML = html;

    /* Interacciones de la pestaña */
    host.querySelectorAll('[data-pack]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = info.packing[Number(btn.dataset.pack)];
        if (packed[item]) { delete packed[item]; } else { packed[item] = true; }
        saveStore(PACK_KEY, packed);
        renderContent();
      });
    });

    var wr = host.querySelector('#weather-refresh');
    if (wr) {
      wr.addEventListener('click', function () {
        if (!navigator.onLine) { toast('Sin conexión'); return; }
        wr.textContent = 'Actualizando…';
        loadWeather().then(function () { toast('Previsión actualizada'); });
      });
    }

    return host;
  }

  function renderContent() {
    var main = $('#content');
    main.innerHTML = '';
    var tab = TABS.filter(function (t) { return t.id === currentTab; })[0];
    main.appendChild(tab && tab.day ? renderDay(tab.day) : renderInfo());
    wireInstallButton();
    syncHeaderOffset();
  }

  /* ---------- clima: carga asíncrona, nunca bloquea el arranque ---------- */

  function loadWeather() {
    if (!window.Weather) return Promise.resolve();
    return window.Weather.refresh(DATA.trip.weatherSpots).then(function (payload) {
      if (payload) {
        weatherState = payload;
        renderContent();
      }
    }).catch(function () { /* la app sigue funcionando sin previsión */ });
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

  /* ---------- cabecera fija ---------- */

  function syncHeaderOffset() {
    var h = document.querySelector('header').offsetHeight;
    $('#content').style.paddingTop = (h + 8) + 'px';
  }

  /* ---------- conectividad ---------- */

  function updateNet() {
    $('#net-badge').classList.toggle('hidden', navigator.onLine);
  }
  window.addEventListener('online', function () { updateNet(); loadWeather(); });
  window.addEventListener('offline', function () { updateNet(); renderContent(); });

  /* ---------- arranque ---------- */

  function init() {
    $('#trip-title').textContent = DATA.trip.title;
    $('#trip-dates').textContent = DATA.trip.dates;
    $('#base-nav').href = mapsUrl(DATA.trip.base.lat, DATA.trip.base.lng);

    $('#reset-btn').addEventListener('click', function () {
      if (!confirm('¿Reiniciar las marcas de momentos completados?')) return;
      done = {};
      saveStore(STORE_KEY, done);
      renderContent();
      refreshProgress();
      toast('Checklist reiniciado');
    });

    renderTabs();
    renderContent();
    refreshProgress();
    updateNet();
    window.addEventListener('resize', syncHeaderOffset);
    window.addEventListener('orientationchange', syncHeaderOffset);

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').catch(function (e) {
          console.warn('Service Worker no registrado:', e);
        });
      });
    }

    loadWeather();   // en segundo plano: la app ya está usable
  }

  if (!DATA) {
    document.getElementById('content').innerHTML =
      '<p class="mt-6 text-center text-slate-500">No se han podido cargar los datos del viaje.</p>';
  } else {
    init();
  }
})();
