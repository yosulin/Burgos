/* Previsión meteorológica con Open-Meteo (sin API key, sin backend).
   Offline-first: se guarda la última previsión válida en localStorage y,
   si no hay red, se muestra esa. Un fallo aquí nunca debe romper la app. */
window.Weather = (function () {
  'use strict';

  var STORE_KEY = 'merindades-2026:weather';
  var ENDPOINT = 'https://api.open-meteo.com/v1/forecast';
  var TIMEOUT_MS = 8000;

  // Códigos WMO -> icono y descripción corta.
  var CODES = {
    0:  ['☀️', 'Despejado'],
    1:  ['🌤️', 'Poco nuboso'],
    2:  ['⛅', 'Parcialmente nublado'],
    3:  ['☁️', 'Nublado'],
    45: ['🌫️', 'Niebla'],
    48: ['🌫️', 'Niebla helada'],
    51: ['🌦️', 'Llovizna débil'],
    53: ['🌦️', 'Llovizna'],
    55: ['🌦️', 'Llovizna intensa'],
    56: ['🌧️', 'Llovizna helada'],
    57: ['🌧️', 'Llovizna helada'],
    61: ['🌧️', 'Lluvia débil'],
    63: ['🌧️', 'Lluvia'],
    65: ['🌧️', 'Lluvia fuerte'],
    66: ['🌧️', 'Lluvia helada'],
    67: ['🌧️', 'Lluvia helada'],
    71: ['🌨️', 'Nieve débil'],
    73: ['🌨️', 'Nieve'],
    75: ['🌨️', 'Nieve intensa'],
    77: ['🌨️', 'Granos de nieve'],
    80: ['🌦️', 'Chubascos'],
    81: ['🌦️', 'Chubascos'],
    82: ['🌦️', 'Chubascos fuertes'],
    85: ['🌨️', 'Chubascos de nieve'],
    86: ['🌨️', 'Chubascos de nieve'],
    95: ['⛈️', 'Tormenta'],
    96: ['⛈️', 'Tormenta con granizo'],
    99: ['⛈️', 'Tormenta con granizo']
  };

  function describe(code) {
    return CODES[code] || ['🌡️', 'Sin datos'];
  }

  function readCache() {
    try {
      var raw = JSON.parse(localStorage.getItem(STORE_KEY));
      if (raw && raw.spots && raw.ts) return raw;
    } catch (e) {}
    return null;
  }

  function writeCache(payload) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(payload)); } catch (e) {}
  }

  /* Una sola petición para todos los puntos (Open-Meteo acepta
     coordenadas separadas por comas y devuelve un array). */
  function buildUrl(spots) {
    var dates = spots.map(function (s) { return s.date; }).sort();
    var params = [
      'latitude=' + spots.map(function (s) { return s.lat; }).join(','),
      'longitude=' + spots.map(function (s) { return s.lng; }).join(','),
      'daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max',
      'timezone=Europe%2FMadrid',
      'start_date=' + dates[0],
      'end_date=' + dates[dates.length - 1]
    ];
    return ENDPOINT + '?' + params.join('&');
  }

  function parse(json, spots) {
    var blocks = Array.isArray(json) ? json : [json];
    var out = {};
    spots.forEach(function (spot, i) {
      var block = blocks[i];
      if (!block || !block.daily || !block.daily.time) return;
      var idx = block.daily.time.indexOf(spot.date);
      if (idx === -1) return;
      var d = block.daily;
      out[spot.id] = {
        label: spot.label,
        date: spot.date,
        code: d.weather_code[idx],
        max: d.temperature_2m_max[idx],
        min: d.temperature_2m_min[idx],
        rain: d.precipitation_probability_max[idx],
        wind: d.wind_speed_10m_max[idx]
      };
    });
    return out;
  }

  function fetchWithTimeout(url) {
    if (typeof AbortController === 'undefined') return fetch(url);
    var ctrl = new AbortController();
    var t = setTimeout(function () { ctrl.abort(); }, TIMEOUT_MS);
    return fetch(url, { signal: ctrl.signal }).then(function (r) {
      clearTimeout(t);
      return r;
    }, function (e) {
      clearTimeout(t);
      throw e;
    });
  }

  /* Descarga la previsión. Resuelve siempre (nunca rechaza) con
     { spots, ts, stale } o null si no hay nada que mostrar. */
  function refresh(spots) {
    if (!navigator.onLine || typeof fetch !== 'function') {
      return Promise.resolve(get());
    }
    return fetchWithTimeout(buildUrl(spots))
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (json) {
        var parsed = parse(json, spots);
        if (!Object.keys(parsed).length) throw new Error('sin datos');
        var payload = { spots: parsed, ts: Date.now() };
        writeCache(payload);
        return payload;
      })
      .catch(function (err) {
        console.warn('Previsión no disponible:', err && err.message);
        return get();   // última previsión guardada, si existe
      });
  }

  function get() {
    return readCache();
  }

  function updatedAt(payload) {
    if (!payload || !payload.ts) return '';
    var d = new Date(payload.ts);
    var hh = String(d.getHours()).padStart(2, '0');
    var mm = String(d.getMinutes()).padStart(2, '0');
    var today = new Date();
    var sameDay = d.toDateString() === today.toDateString();
    var day = sameDay ? '' : String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + ' ';
    return day + hh + ':' + mm;
  }

  return { refresh: refresh, get: get, describe: describe, updatedAt: updatedAt };
})();
