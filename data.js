// Guía Merindades en Familia — todos los datos del viaje.
// Los horarios son ORIENTATIVOS a propósito: la app los muestra como tales.
// Las imágenes son ilustraciones propias (assets/images). Para usar fotos
// reales basta con dejar el archivo en esa carpeta y cambiar aquí la ruta.
window.TRIP_DATA = {
  "trip": {
    "title": "Las Merindades en Familia",
    "dates": "12 - 13 septiembre 2026",
    "places": "Frías · Tobera · Puentedey · Ojo Guareña",
    "group": "2 parejas y 3 niñas (9, 7 y 3 años)",
    "hero": "assets/images/hero.svg",
    "hotel": {
      "name": "Hotel Rural La Torre de Bisjueces",
      "address": "C. San Juan 58, Bisjueces, Burgos",
      "lat": 42.8931,
      "lng": -3.5694
    },
    "returns": [
      { "label": "Ruta a Donostia", "query": "Donostia-San Sebastián" },
      { "label": "Ruta a Valladolid", "query": "Valladolid" }
    ],
    "weatherSpots": [
      { "id": "frias",     "label": "Frías / Tobera",         "date": "2026-09-12", "lat": 42.7631, "lng": -3.2972 },
      { "id": "puentedey", "label": "Puentedey / Ojo Guareña", "date": "2026-09-13", "lat": 42.9756, "lng": -3.6853 }
    ]
  },

  "days": [
    {
      "id": "day-1",
      "tab": "Sábado",
      "date": "Sábado 12 de septiembre",
      "title": "Frías y Tobera",
      "intro": "Un día entero en el mismo rincón: la villa por la mañana y las cascadas después de comer.",
      "weatherSpot": "frias",
      "route": {
        "label": "Ruta del sábado",
        "steps": ["Hotel", "Frías", "Tobera", "Hotel"],
        "origin": "42.8931,-3.5694",
        "waypoints": ["42.7631,-3.2972", "42.7561,-3.3105"],
        "destination": "42.8931,-3.5694"
      },
      "stops": [
        {
          "id": "frias",
          "kind": "destino",
          "name": "Frías",
          "image": "assets/images/frias.svg",
          "time": "10:30 aprox.",
          "duration": "2,5 - 3 h",
          "intro": "La villa más pequeña de España, colgada sobre la peña. Sin agenda: paseo, miradores y lo que apetezca.",
          "highlights": [
            "Castillo de los Velasco",
            "Casco medieval",
            "Casas colgadas",
            "Miradores",
            "Puente medieval sobre el Ebro"
          ],
          "tags": ["🥾 Terreno irregular", "🚼 Porteo recomendable"],
          "lat": 42.7631,
          "lng": -3.2972,
          "details": [
            { "title": "Con las niñas", "text": "Calles empinadas y empedradas: mejor de la mano, y la pequeña en porteo en las cuestas." },
            { "title": "El puente del Ebro", "text": "Queda algo apartado del casco, junto al río y con aparcamiento fácil. Entorno llano para estirar las piernas.", "map": { "lat": 42.7697, "lng": -3.2878, "label": "Ir al puente medieval" } }
          ]
        },
        {
          "id": "comida-sabado",
          "kind": "comida",
          "name": "Comer en Frías",
          "time": "13:30 - 14:00",
          "intro": "Somos 7. Conviene llamar antes para asegurar mesa.",
          "options": [
            { "name": "Ortiz Bar Restaurante", "note": "Primera opción · reservar para 7", "phone": "947 35 70 67", "tel": "+34947357067", "query": "Ortiz Bar Restaurante Frías Burgos" },
            { "name": "Restaurante A Fuego Lento", "phone": "651 90 76 06", "tel": "+34651907606", "query": "Restaurante A Fuego Lento Frías Burgos" },
            { "name": "Restaurante El Albergue", "phone": "627 63 50 60", "tel": "+34627635060", "query": "Restaurante El Albergue Frías Burgos" }
          ]
        },
        {
          "id": "tobera",
          "kind": "destino",
          "name": "Tobera",
          "image": "assets/images/tobera.svg",
          "time": "Después de comer",
          "duration": "1 - 1,5 h",
          "intro": "A cinco minutos de Frías: un desfiladero pequeño con cascadas, puentes y sombra.",
          "highlights": [
            "Ermita de Santa María de la Hoz",
            "Puente medieval",
            "Cascadas",
            "Paseo junto al río Molinar"
          ],
          "tags": ["👧 Fácil con niñas", "🥾 Pasarelas y escalones"],
          "lat": 42.7561,
          "lng": -3.3105,
          "details": [
            { "title": "Con las niñas", "text": "Paseo corto y muy agradecido. Hay escalones y pasarelas de madera: la pequeña de la mano o en porteo." }
          ]
        },
        {
          "id": "hotel-sabado",
          "kind": "descanso",
          "name": "Vuelta al hotel",
          "time": "Tarde / noche",
          "intro": "Regreso sin prisa a Bisjueces y el resto del día juntos, que era de lo que se trataba.",
          "lat": 42.8931,
          "lng": -3.5694
        }
      ]
    },

    {
      "id": "day-2",
      "tab": "Domingo",
      "date": "Domingo 13 de septiembre",
      "title": "Puentedey y Ojo Guareña",
      "intro": "Dos paradas por la mañana, comida de despedida y cada familia hacia casa.",
      "weatherSpot": "puentedey",
      "route": {
        "label": "Ruta del domingo",
        "steps": ["Hotel", "Puentedey", "Ojo Guareña"],
        "origin": "42.8931,-3.5694",
        "waypoints": ["42.9756,-3.6853"],
        "destination": "43.0336,-3.6644"
      },
      "stops": [
        {
          "id": "puentedey",
          "kind": "destino",
          "name": "Puentedey",
          "image": "assets/images/puentedey.svg",
          "time": "Por la mañana",
          "duration": "1 - 1,5 h",
          "intro": "El pueblo se asienta sobre un puente natural que el río Nela excavó en la roca. Se ve desde arriba y desde abajo.",
          "highlights": [
            "Puente natural sobre el Nela",
            "El pueblo",
            "Iglesia de San Pelayo",
            "Miradores",
            "Zona baja junto al río",
            "Paseo corto"
          ],
          "tags": ["👧 Fácil con niñas"],
          "lat": 42.9756,
          "lng": -3.6853,
          "swim": {
            "title": "Si hace bueno: posibilidad de baño",
            "text": "Podemos llevar bañador y decidir allí según temperatura, caudal, estado del río y señalización.",
            "pack": ["Bañadores", "Toallas", "Escarpines", "Muda para las niñas"]
          },
          "details": [
            { "title": "Con las niñas", "text": "La senda baja junto al Nela es cómoda; el resto del pueblo, terreno mixto." }
          ]
        },
        {
          "id": "ojoguarena",
          "kind": "destino",
          "name": "Ojo Guareña",
          "subtitle": "Cueva-ermita de San Bernabé",
          "image": "assets/images/ojoguarena.svg",
          "time": "Según reserva",
          "duration": "1 h aprox.",
          "intro": "Una ermita metida dentro de la roca, en uno de los mayores complejos kársticos de la península.",
          "highlights": [
            "Cueva-ermita de San Bernabé",
            "Pinturas y pasarela interior",
            "Mirador sobre el karst"
          ],
          "tags": ["🚼 Porteo recomendable"],
          "lat": 43.0336,
          "lng": -3.6644,
          "booking": {
            "title": "Reserva / horario pendiente de confirmar",
            "text": "La hora de esta visita depende de la reserva. Comprobar horario y disponibilidad antes de ir; en la app no hay hora fijada."
          },
          "details": [
            { "title": "Con las niñas", "text": "Dentro de la cueva la pequeña mejor en porteo o de la mano. Hace fresco todo el año: una chaqueta fina." }
          ]
        },
        {
          "id": "comida-domingo",
          "kind": "comida",
          "name": "Comida de despedida",
          "time": "Comida",
          "intro": "Sin elegir todavía: lo decidimos entre todos. El último rato todos juntos.",
          "open": true,
          "options": [
            { "name": "La Taxuela", "note": "Primera opción para una comida especial", "phone": "947 190 597", "tel": "+34947190597", "query": "La Taxuela restaurante Villarcayo" },
            { "name": "Mesón Restaurante El Cid", "note": "Villarcayo", "phone": "947 13 11 71", "tel": "+34947131171", "query": "Mesón Restaurante El Cid Villarcayo" },
            { "name": "RestoBar La Cucaña", "note": "En Puentedey · suele ser por orden de llegada", "phone": "654 15 05 15", "tel": "+34654150515", "query": "RestoBar La Cucaña Puentedey" }
          ]
        },
        {
          "id": "despedida",
          "kind": "despedida",
          "name": "Fin del fin de semana",
          "time": "Después de comer",
          "intro": "Desde aquí, cada familia empieza su camino de vuelta."
        }
      ]
    }
  ],

  "info": {
    "packing": [
      "Calzado cómodo",
      "Sudadera / chaqueta fina",
      "Agua",
      "Crema solar",
      "Gorras",
      "Batería externa",
      "Bañadores",
      "Toallas",
      "Escarpines",
      "Muda para las niñas",
      "Algo de picoteo",
      "Mochila de porteo si resulta útil para la pequeña"
    ],
    "reservas": [
      "Cueva-ermita de San Bernabé (Ojo Guareña): horario y reserva pendientes de confirmar.",
      "Comida del sábado en Frías: llamar para asegurar mesa para 7.",
      "Comida del domingo: sin restaurante elegido todavía."
    ],
    "bano": [
      "La opción es el río Nela, en Puentedey, y se decide allí mismo.",
      "Comprobar temperatura, caudal, estado del río y señalización antes de entrar.",
      "El agua puede estar fría, sobre todo por la mañana.",
      "En Tobera no está previsto bañarse."
    ],
    "emergencias": [
      { "label": "Emergencias", "value": "112", "tel": "112" }
    ],
    "notas": [
      "Los horarios son orientativos: la idea es no ir con prisa.",
      "La cobertura falla en cañones y valles; la guía funciona sin conexión.",
      "El teléfono del hotel no está en la app porque no lo tenemos confirmado."
    ]
  }
};
