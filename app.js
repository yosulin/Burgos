/* Guía Merindades en Familia — JS vanilla, sin dependencias. */
(function () {
  'use strict';

  var DATA = window.TRIP_DATA;
  var K_DONE = 'merindades-2026:visitado';
  var K_PACK = 'merindades-2026:equipaje';
  var K_TAB  = 'merindades-2026:pestana';
  var K_BAR  = 'merindades-2026:aviso-instalar';


  /* ---------- utilidades ---------- */

  function $(s, ctx) { return (ctx || document).querySelector(s); }

  /* Escribe texto solo si el elemento existe: durante una actualización
     puede convivir momentáneamente un HTML antiguo con este script. */
  function txt(sel, value) {
    var n = $(sel);
    if (n) n.textContent = value;
    return n;
  }
  function attr(sel, name, value) {
    var n = $(sel);
    if (n) n.setAttribute(name, value);
    return n;
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var ICON = {
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>',
    tel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    chev: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>'
  };

  function mapsTo(lat, lng) {
    return 'https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng;
  }
  /* Los restaurantes se abren por búsqueda: no inventamos coordenadas. */
  function mapsFind(query) {
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
  }
  function mapsPlace(query) {
    return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(query);
  }
  /* ---------- almacenamiento ---------- */

  function load(key) {
    try { return JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { return {}; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* modo privado */ }
  }

  var visitado = load(K_DONE);
  var equipaje = load(K_PACK);

  function visitables() {
    var ids = [];
    DATA.days.forEach(function (d) {
      d.stops.forEach(function (s) { if (s.kind === 'destino') ids.push(s.id); });
    });
    return ids;
  }

  /* ---------- avisos ---------- */

  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 2000);
  }

  /* ---------- piezas ---------- */

  function btn(href, label, clase, icono) {
    return '<a class="btn ' + clase + '" href="' + href + '" target="_blank" rel="noopener">' +
      (icono || '') + '<span>' + esc(label) + '</span></a>';
  }
  function btnTel(tel, label) {
    return '<a class="btn btn--call btn--small" href="tel:' + esc(tel) + '">' + ICON.tel + '<span>' + esc(label) + '</span></a>';
  }

  /* ---------- tarjeta de destino ---------- */

  function stopDestino(stop) {
    var hecho = !!visitado[stop.id];

    var marcas = (stop.highlights || []).map(function (h) {
      return '<li><span class="tick">✓</span><span>' + esc(h) + '</span></li>';
    }).join('');

    var tags = (stop.tags || []).map(function (t) {
      return '<span class="tag">' + esc(t) + '</span>';
    }).join('');

    var bano = stop.swim ? '<div class="note note--swim">' +
        '<p class="note__title">🏊 <span>' + esc(stop.swim.title) + '</span></p>' +
        '<p class="note__text">' + esc(stop.swim.text) + '</p>' +
        '<div class="note__list">' + stop.swim.pack.map(function (p) {
          return '<span>' + esc(p) + '</span>'; }).join('') + '</div>' +
      '</div>' : '';

    var reserva = stop.booking ? '<div class="note note--book">' +
        '<p class="note__title">🎟 <span>' + esc(stop.booking.title) + '</span></p>' +
        '<p class="note__text">' + esc(stop.booking.text) + '</p>' +
      '</div>' : '';

    /* La información secundaria aparece solo si se pide. */
    var detalles = (stop.details || []).map(function (d) {
      return '<div><h3>' + esc(d.title) + '</h3><p>' + esc(d.text) + '</p>' +
        (d.map ? '<div class="actions"><a class="btn btn--soft btn--small" target="_blank" rel="noopener" href="' +
          mapsTo(d.map.lat, d.map.lng) + '">' + ICON.pin + '<span>' + esc(d.map.label) + '</span></a></div>' : '') +
      '</div>';
    }).join('');

    var art = document.createElement('article');
    art.className = 'stop rise' + (hecho ? ' stop--done' : '');
    art.id = 'stop-' + stop.id;
    var medios = stop.image
      ? '<div class="stop__media">' +
          '<img src="' + esc(stop.image) + '" alt="' + esc(stop.name) + '" loading="lazy" />' +
          (stop.duration ? '<span class="stop__badge">⏱ ' + esc(stop.duration) + '</span>' : '') +
          '<button class="stop__check" type="button" data-visit="' + esc(stop.id) + '"' +
            ' aria-pressed="' + hecho + '" aria-label="Marcar ' + esc(stop.name) + ' como visitado">' + ICON.check + '</button>' +
        '</div>'
      : '<div class="stop__media stop__media--vacio">' +
          (stop.duration ? '<span class="stop__badge">⏱ ' + esc(stop.duration) + '</span>' : '') +
          '<button class="stop__check" type="button" data-visit="' + esc(stop.id) + '"' +
            ' aria-pressed="' + hecho + '" aria-label="Marcar ' + esc(stop.name) + ' como visitado">' + ICON.check + '</button>' +
        '</div>';

    /* Cuando no tenemos coordenadas fiables (pistas forestales, sitios sin
       portal), el botón busca el lugar por su nombre en vez de llevar a un
       punto que puede estar a un kilómetro. */
    var comoLlegar = stop.query ? mapsFind(stop.query) : mapsTo(stop.lat, stop.lng);

    art.innerHTML =
      medios +
      '<div class="stop__body">' +
        '<p class="stop__time">' + esc(stop.time) + '</p>' +
        '<h2>' + esc(stop.name) + '</h2>' +
        (stop.subtitle ? '<p class="stop__sub">' + esc(stop.subtitle) + '</p>' : '') +
        '<p class="stop__intro">' + esc(stop.intro) + '</p>' +
        (marcas ? '<ul class="marks">' + marcas + '</ul>' : '') +
        (tags ? '<div class="tags">' + tags + '</div>' : '') +
        reserva + bano +
        (detalles ? '<div class="details" id="det-' + esc(stop.id) + '" hidden>' + detalles + '</div>' : '') +
        '<div class="actions' + (detalles ? ' actions--two' : '') + '">' +
          btn(comoLlegar, 'Abrir en Maps', 'btn--primary', ICON.pin) +
          (detalles ? '<button class="btn btn--ghost" type="button" data-toggle="' + esc(stop.id) + '"' +
            ' aria-expanded="false" aria-controls="det-' + esc(stop.id) + '">Ver detalles</button>' : '') +
        '</div>' +
      '</div>';
    return art;
  }

  /* ---------- tarjeta de comida ---------- */

  function stopComida(stop) {
    var art = document.createElement('article');
    art.className = 'eat rise';
    art.innerHTML =
      '<p class="eat__kicker">🍽 ' + esc(stop.time) + '</p>' +
      '<h2>' + esc(stop.name) + '</h2>' +
      '<p class="eat__intro">' + esc(stop.intro) + '</p>' +
      '<div class="eat__list">' + stop.options.map(function (o) {
        return '<div class="eat__row">' +
          '<p class="eat__name">' + esc(o.name) + '</p>' +
          (o.note ? '<p class="eat__note">' + esc(o.note) + '</p>' : '') +
          '<div class="eat__btns">' +
            btnTel(o.tel, o.phone) +
            '<a class="btn btn--ghost btn--small" target="_blank" rel="noopener" href="' + mapsFind(o.query) + '">' +
              ICON.pin + '<span>Maps</span></a>' +
          '</div></div>';
      }).join('') + '</div>';
    return art;
  }

  /* ---------- descanso y despedida ---------- */

  function stopSimple(stop) {
    var art = document.createElement('article');
    art.className = 'simple rise';
    art.innerHTML =
      '<p class="simple__time">' + esc(stop.time) + '</p>' +
      '<h2>' + esc(stop.name) + '</h2>' +
      '<p>' + esc(stop.intro) + '</p>' +
      (stop.lat != null ? '<div class="actions">' +
        btn(mapsTo(stop.lat, stop.lng), stop.mapLabel || 'Volver al hotel', 'btn--soft', ICON.pin) + '</div>' : '');
    return art;
  }

  function stopDespedida(stop) {
    var art = document.createElement('article');
    art.className = 'farewell rise';
    art.innerHTML =
      '<h2>👋 ' + esc(stop.name) + '</h2>' +
      '<p>' + esc(stop.intro) + '</p>' +
      '<div class="actions">' + DATA.trip.returns.map(function (r) {
        return btn(mapsPlace(r.query), '🚗 ' + r.label, 'btn--ghost');
      }).join('') + '</div>';
    return art;
  }

  /* ---------- vista de día ---------- */

  function renderDay(day) {
    var frag = document.createDocumentFragment();

    var head = document.createElement('div');
    head.className = 'day__head';
    head.innerHTML =
      '<p class="day__date">' + esc(day.date) + '</p>' +
      '<h2 class="day__title">' + esc(day.title) + '</h2>' +
      '<p class="day__intro">' + esc(day.intro) + '</p>';
    frag.appendChild(head);

    day.stops.forEach(function (s) {
      if (s.kind === 'destino') frag.appendChild(stopDestino(s));
      else if (s.kind === 'comida') frag.appendChild(stopComida(s));
      else if (s.kind === 'despedida') frag.appendChild(stopDespedida(s));
      else frag.appendChild(stopSimple(s));
    });

    var ids = visitables();
    var hechos = ids.filter(function (id) { return visitado[id]; }).length;
    var p = document.createElement('div');
    p.className = 'progress';
    p.innerHTML = '<span>' + hechos + '/' + ids.length + ' visitas</span>' +
      '<span class="progress__track"><span class="progress__fill" style="width:' +
      (ids.length ? Math.round(hechos / ids.length * 100) : 0) + '%"></span></span>';
    frag.appendChild(p);

    return frag;
  }

  /* ---------- pestaña Info ---------- */

  function acc(icono, titulo, contenido, abierto) {
    return '<section class="acc' + (abierto ? ' open' : '') + '">' +
      '<button class="acc__btn" type="button" aria-expanded="' + (abierto ? 'true' : 'false') + '">' +
        '<span class="acc__ico" aria-hidden="true">' + icono + '</span>' +
        '<span class="acc__ttl">' + esc(titulo) + '</span>' +
        '<span class="acc__chev" aria-hidden="true">' + ICON.chev + '</span>' +
      '</button>' +
      '<div class="acc__panel"' + (abierto ? '' : ' hidden') + '>' + contenido + '</div>' +
    '</section>';
  }

  function lista(items) {
    return '<ul>' + items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
  }

  function renderInfo() {
    var info = DATA.info;
    var host = document.createElement('div');
    var html = '';

    html += acc('🗺', 'Mapa del fin de semana',
      '<figure class="mapfig">' +
        '<img src="assets/images/mapa.svg" alt="Plano con Frías, Tobera y la cascada de Pedrosa de Tobalina el sábado, ' +
        'Ojo Guareña y Puentedey el domingo, y el alojamiento en Bisjueces." loading="lazy" />' +
        '<figcaption>Los puntos están en su posición real; los tiempos son en coche.</figcaption>' +
      '</figure>', true);

    var rest = '';
    DATA.days.forEach(function (d) {
      d.stops.forEach(function (s) {
        if (s.kind !== 'comida') return;
        rest += '<p><b>' + esc(d.tab) + ' · ' + esc(s.name) + '</b></p>' +
          s.options.map(function (o) {
            return '<div class="eat__row"><p class="eat__name">' + esc(o.name) + '</p>' +
              (o.note ? '<p class="eat__note">' + esc(o.note) + '</p>' : '') +
              '<div class="eat__btns">' + btnTel(o.tel, o.phone) +
              '<a class="btn btn--ghost btn--small" target="_blank" rel="noopener" href="' + mapsFind(o.query) + '">' +
              ICON.pin + '<span>Maps</span></a></div></div>';
          }).join('');
      });
    });
    html += acc('🍽', 'Restaurantes', rest);

    html += acc('🎟', 'Reservas', lista(info.reservas));
    html += acc('🏊', 'Baño', lista(info.bano));

    html += acc('🎒', 'Qué llevar',
      '<div class="pack">' + info.packing.map(function (item, i) {
        var on = !!equipaje[item];
        return '<button class="pack__item" type="button" data-pack="' + i + '" aria-pressed="' + on + '">' +
          '<span class="pack__box">' + ICON.check + '</span>' +
          '<span class="pack__txt">' + esc(item) + '</span></button>';
      }).join('') + '</div>');

    var tels = '';
    DATA.days.forEach(function (d) {
      d.stops.forEach(function (s) {
        (s.options || []).forEach(function (o) {
          tels += '<a class="phone-row" href="tel:' + esc(o.tel) + '"><span>' + esc(o.name) + '</span><b>' + esc(o.phone) + '</b></a>';
        });
      });
    });
    html += acc('📞', 'Teléfonos', tels +
      '<p style="font-size:12.5px">Solo los teléfonos que nos han confirmado.</p>');

    html += acc('🚗', 'Regreso',
      '<p>Después de comer el domingo, cada familia empieza su camino.</p>' +
      DATA.trip.returns.map(function (r) {
        return btn(mapsPlace(r.query), '🚗 ' + r.label, 'btn--soft');
      }).join(''));

    html += acc('🆘', 'Emergencias',
      info.emergencias.map(function (c) {
        return '<a class="btn btn--call" href="tel:' + esc(c.tel) + '">' + ICON.tel +
          '<span>' + esc(c.label) + ' · ' + esc(c.value) + '</span></a>';
      }).join(''));

    html += acc('📌', 'A tener en cuenta', lista(info.notas));

    html += '<div id="install-holder"></div>';

    host.className = 'info';
    host.innerHTML = html;
    return host;
  }

  /* ---------- pestañas ---------- */

  var TABS = DATA.days.map(function (d) { return { id: d.id, label: d.tab, day: d }; })
                      .concat([{ id: 'info', label: 'Info' }]);

  var actual = (function () {
    var s = localStorage.getItem(K_TAB);
    return TABS.some(function (t) { return t.id === s; }) ? s : TABS[0].id;
  })();

  function renderTabs() {
    var nav = $('#tabs');
    if (!nav) return;
    nav.innerHTML = '';
    TABS.forEach(function (t) {
      var b = document.createElement('button');
      b.className = 'tab';
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', t.id === actual ? 'true' : 'false');
      b.textContent = t.label;
      b.addEventListener('click', function () { irA(t.id); });
      nav.appendChild(b);
    });
  }

  function irA(id, scroll) {
    actual = id;
    try { localStorage.setItem(K_TAB, id); } catch (e) {}
    renderTabs();
    render();
    var holder = $('#tabs-holder');
    if (scroll !== false && holder) {
      window.scrollTo({ top: holder.offsetTop, behavior: 'smooth' });
    }
  }

  function render() {
    var main = $('#content');
    if (!main) return;
    main.innerHTML = '';
    var t = TABS.filter(function (x) { return x.id === actual; })[0];
    main.appendChild(t && t.day ? renderDay(t.day) : renderInfo());
    montarInstalacion();
  }

  /* ---------- interacciones (delegadas) ---------- */

  document.addEventListener('click', function (e) {
    var v = e.target.closest('[data-visit]');
    if (v) {
      var id = v.dataset.visit;
      if (visitado[id]) { delete visitado[id]; } else { visitado[id] = true; }
      save(K_DONE, visitado);
      toast(visitado[id] ? '✓ Visitado' : 'Sin marcar');
      render();
      return;
    }

    var tg = e.target.closest('[data-toggle]');
    if (tg) {
      var panel = document.getElementById('det-' + tg.dataset.toggle);
      var abierto = !panel.hidden;
      panel.hidden = abierto;
      tg.setAttribute('aria-expanded', String(!abierto));
      tg.textContent = abierto ? 'Ver detalles' : 'Ocultar detalles';
      return;
    }

    var pk = e.target.closest('[data-pack]');
    if (pk) {
      var item = DATA.info.packing[Number(pk.dataset.pack)];
      if (equipaje[item]) { delete equipaje[item]; } else { equipaje[item] = true; }
      save(K_PACK, equipaje);
      pk.setAttribute('aria-pressed', String(!!equipaje[item]));
      return;
    }

    var ab = e.target.closest('.acc__btn');
    if (ab) {
      var sec = ab.parentElement;
      var pan = $('.acc__panel', sec);
      var open = !pan.hidden;
      pan.hidden = open;
      sec.classList.toggle('open', !open);
      ab.setAttribute('aria-expanded', String(!open));
      return;
    }
  });

  /* ---------- instalación ---------- */

  var prompt = null;

  function yaInstalada() {
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
           navigator.standalone === true;
  }

  function esIOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent) ||
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  function avisoDescartado() {
    try { return localStorage.getItem(K_BAR) === '1'; } catch (e) { return false; }
  }

  function ocultarAviso(recordar) {
    var bar = $('#install-bar');
    if (bar) bar.hidden = true;
    if (recordar) { try { localStorage.setItem(K_BAR, '1'); } catch (e) {} }
  }

  /* El aviso solo aparece si la guía no está instalada, no se ha cerrado antes
     y hay forma de instalarla: el navegador nos ha ofrecido el diálogo, o
     estamos en iOS, donde se hace a mano desde Compartir. */
  function montarAviso() {
    var bar = $('#install-bar');
    if (!bar || yaInstalada() || avisoDescartado()) return;

    var cta = $('#install-bar-cta');
    if (prompt) {
      /* Chrome y derivados: el navegador nos deja lanzar su propio diálogo. */
      cta.hidden = false;
    } else {
      /* Safari, Firefox y compañía no ofrecen ese diálogo: solo cabe explicar
         dónde está la opción en cada sitio. */
      cta.hidden = true;
      txt('#install-bar-txt', esIOS()
        ? 'Para tenerla sin cobertura: Compartir → «Añadir a inicio».'
        : 'Para tenerla sin cobertura: menú del navegador → «Instalar app».');
    }
    bar.hidden = false;
  }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    prompt = e;
    montarAviso();
    montarInstalacion();
  });

  window.addEventListener('appinstalled', function () {
    prompt = null;
    ocultarAviso(true);
  });

  var barX = $('#install-bar-x');
  if (barX) barX.addEventListener('click', function () { ocultarAviso(true); });

  var barCta = $('#install-bar-cta');
  if (barCta) barCta.addEventListener('click', function () {
    if (!prompt) { ocultarAviso(true); return; }
    prompt.prompt();
    prompt.userChoice.then(function (r) {
      prompt = null;
      ocultarAviso(!!r && r.outcome === 'accepted');
    });
  });

  function montarInstalacion() {
    var holder = document.getElementById('install-holder');
    if (!holder || !prompt) return;
    holder.innerHTML = '<button class="btn btn--primary" type="button" style="width:100%">📲 Instalar la guía en el móvil</button>';
    holder.firstChild.addEventListener('click', function () {
      prompt.prompt();
      prompt.userChoice.then(function () { prompt = null; holder.innerHTML = ''; });
    });
  }

  /* ---------- conectividad ---------- */

  function estadoRed() {
    var c = $('#offline-chip');
    if (c) c.hidden = navigator.onLine;
  }
  window.addEventListener('online', estadoRed);
  window.addEventListener('offline', function () { estadoRed(); render(); });

  /* ---------- pestañas pegadas al salir de la portada ---------- */

  function observarPortada() {
    var holder = $('#tabs-holder');
    var portada = $('.hero__body');
    if (!holder || !portada || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        holder.classList.toggle('stuck', !en.isIntersecting);
      });
    }, { rootMargin: '-1px 0px 0px 0px', threshold: 0 }).observe(portada);
  }

  /* ---------- arranque ---------- */

  /* Si el HTML servido es de una versión anterior a este script, pedimos
     una recarga (una sola vez) para que ambos vengan de la misma versión. */
  function shellDesfasado() {
    if ($('#hero-title') && $('#tabs') && $('#content')) return false;
    try {
      if (!sessionStorage.getItem('merindades:recarga')) {
        sessionStorage.setItem('merindades:recarga', '1');
        location.reload();
        return true;
      }
    } catch (e) {}
    return true;
  }

  function init() {
    if (shellDesfasado()) return;
    try { sessionStorage.removeItem('merindades:recarga'); } catch (e) {}

    var t = DATA.trip;
    txt('#hero-title', t.title);
    txt('#hero-dates', t.dates);
    txt('#hero-places', t.places);
    var hi = $('#hero-img'); if (hi) hi.src = t.hero;
    txt('#foot', t.hotel.name + ' · ' + t.group);

    renderTabs();
    render();
    estadoRed();
    montarAviso();
    observarPortada();

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').catch(function (e) {
          console.warn('Service Worker no registrado:', e);
        });
      });
    }
  }

  if (!DATA) {
    var c = $('#content');
    if (c) c.innerHTML = '<p>No se han podido cargar los datos del viaje.</p>';
  } else {
    init();
  }
})();
