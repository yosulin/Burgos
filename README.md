# Las Merindades en Familia 🌿

Guía PWA del fin de semana familiar por **Las Merindades (Burgos)**,
**12-13 de septiembre de 2026**. Dos parejas y tres niñas (9, 7 y 3 años).

👉 **App publicada: https://yosulin.github.io/Burgos/**

Base del viaje: **Hotel Rural La Torre de Bisjueces** (C. San Juan 58, Bisjueces).

- **Sábado 12** — encuentro en Frías · Tobera · comida en Frías · tarde abierta
  (cascada de Pedrosa de Tobalina, con baño, o más Frías) · noche en Bisjueces
- **Domingo 13** — cueva-ermita de San Bernabé (pase reservado 11:30, 34 €) ·
  comida en Puentedey · puente natural del Nela · despedida

## Qué hace

- **Portada** con el viaje de un vistazo.
- **Plano** del fin de semana en la pestaña Info: los seis puntos en su posición
  real, coloreados por día, con tiempos en coche y escala.
- **Tarjeta grande por destino:** ilustración, duración, horario orientativo,
  qué ver y botón a Maps. Lo secundario se despliega con *Ver detalles*.
- **Comer** en tarjeta propia, con botones de llamar y Maps por restaurante.
- **Rutas de regreso** a Donostia y a Valladolid.
- **Offline:** una vez abierta con conexión funciona sin cobertura.
- **Instalable** en el móvil: aviso arriba del todo mientras no lo esté, que
  se puede cerrar con la ✕ y no vuelve a salir. Checklist de visitas y de
  equipaje guardados en el propio dispositivo.

## Estructura

```
index.html          Shell: portada y pestañas
app.js              Render de días, tarjetas, info y PWA
data.js             ⬅️ Todo el contenido del viaje (editar aquí)
styles.css          Sistema visual (tokens propios, sin framework)
sw.js               Service Worker
manifest.json       Manifiesto PWA
assets/images/      Ilustraciones de los destinos
assets/icons/       Iconos de la app
```

Sin dependencias ni paso de compilación: se edita y se sube.

## Imágenes

`assets/images/` contiene las **fotos de cada destino** (`frias.jpg`,
`tobera.jpg`, `tobalina.webp`, `ojoguarena.jpg`, `puentedey.jpg`), recortadas
a 16:9 y comprimidas para que entren en la caché offline sin engordar la app.
La portada y el plano siguen siendo SVG propios, y las ilustraciones
originales de cada destino se conservan por si se quiere volver a ellas.

Para cambiar una foto: deja el archivo en esa carpeta, actualiza la ruta en
`data.js` y, si cambia el nombre, la lista `CORE` de `sw.js`.

**Pendiente:** falta añadir los créditos (autor y licencia) de cada
fotografía en la pestaña Info.

## Editar el viaje

Todo está en **`data.js`**: horarios, textos, qué ver, restaurantes, teléfonos
y coordenadas. Los horarios son deliberadamente orientativos
(`10:30 aprox.`, `Después de comer`, `Según reserva`).

Al publicar cambios, **sube la versión de caché** en `sw.js`
(`merindades-v11` → `v12`) y el `?v=11` de `index.html`, para que los móviles
que ya tengan la app instalada recojan la versión nueva.

## Publicar

Ya está activo en **https://yosulin.github.io/Burgos/**, sirviendo la raíz de la
rama `claude/pwa-merindades-familia-kumae5` (*Settings → Pages → Deploy from a
branch*). Cada push a esa rama se republica en 1-2 minutos.

## En local

```bash
npm start     # http://localhost:8080
```

El Service Worker necesita `http://` o `https://`: no funciona abriendo el
archivo directamente.
