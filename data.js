// Datos del viaje. Editar aquí para actualizar la app.
// Nota: los horarios son ORIENTATIVOS y así se muestran en la interfaz.
window.TRIP_DATA = {
  "trip": {
    "title": "Las Merindades en Familia",
    "dates": "12 - 13 Septiembre 2026",
    "group": "2 parejas y 3 niñas (9, 7 y 3 años)",
    "base": {
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
      { "id": "frias",     "label": "Frías / Tobera",       "date": "2026-09-12", "lat": 42.7631, "lng": -3.2972 },
      { "id": "puentedey", "label": "Puentedey / Ojo Guareña", "date": "2026-09-13", "lat": 42.9756, "lng": -3.6853 }
    ]
  },

  "days": [
    {
      "id": "day-1",
      "date": "2026-09-12",
      "label": "Sábado 12: Frías y Tobera",
      "short": "Sábado 12",
      "weatherSpot": "frias",
      "route": {
        "label": "Ruta del sábado",
        "note": "Alojamiento → Frías → Tobera → alojamiento",
        "origin": "42.8931,-3.5694",
        "waypoints": ["42.7631,-3.2972", "42.7561,-3.3105"],
        "destination": "42.8931,-3.5694"
      },
      "activities": [
        {
          "time": "10:30 aprox.",
          "type": "visita",
          "title": "Frías",
          "location": "Villa medieval de Frías",
          "lat": 42.7631,
          "lng": -3.2972,
          "duration": "2,5 - 3 h",
          "highlights": [
            "Castillo de los Velasco",
            "Casco medieval",
            "Casas colgadas",
            "Miradores",
            "Puente medieval sobre el Ebro"
          ],
          "description": "Mañana tranquila paseando por la villa, sin prisa y parando donde apetezca.",
          "logistics": "Calles empinadas y empedradas: mejor de la mano y con calzado cómodo.",
          "extraLinks": [
            { "label": "Puente medieval sobre el Ebro", "lat": 42.7697, "lng": -3.2878 }
          ]
        },
        {
          "time": "13:30 - 14:00",
          "type": "comida",
          "title": "Comida en Frías",
          "location": "Frías",
          "lat": 42.7631,
          "lng": -3.2972,
          "description": "Tres alternativas en el pueblo. Conviene llamar antes para asegurar mesa para 7.",
          "options": [
            { "name": "Ortiz Bar Restaurante", "phone": "947 35 70 67", "tel": "+34947357067", "query": "Ortiz Bar Restaurante Frías Burgos", "note": "Primera opción." },
            { "name": "Restaurante A Fuego Lento", "phone": "651 90 76 06", "tel": "+34651907606", "query": "Restaurante A Fuego Lento Frías Burgos" },
            { "name": "Restaurante El Albergue", "phone": "627 63 50 60", "tel": "+34627635060", "query": "Restaurante El Albergue Frías Burgos" }
          ]
        },
        {
          "time": "Después de comer",
          "type": "visita",
          "title": "Tobera",
          "location": "Tobera (Frías)",
          "lat": 42.7561,
          "lng": -3.3105,
          "duration": "1 - 1,5 h",
          "highlights": [
            "Ermita de Santa María de la Hoz",
            "Puente medieval",
            "Cascadas",
            "Paseo junto al río Molinar"
          ],
          "description": "Paseo corto y muy agradecido con las niñas, a pocos minutos en coche de Frías.",
          "logistics": "Pasarelas y escalones: la pequeña, de la mano o en porteo."
        },
        {
          "time": "Tarde / noche",
          "type": "relax",
          "title": "Vuelta al alojamiento",
          "location": "Hotel Rural La Torre de Bisjueces",
          "lat": 42.8931,
          "lng": -3.5694,
          "description": "Regreso sin prisa y tarde/noche todos juntos en el alojamiento."
        }
      ]
    },

    {
      "id": "day-2",
      "date": "2026-09-13",
      "label": "Domingo 13: Puentedey y Ojo Guareña",
      "short": "Domingo 13",
      "weatherSpot": "puentedey",
      "route": {
        "label": "Ruta del domingo",
        "note": "Alojamiento → Puentedey → Ojo Guareña / San Bernabé",
        "origin": "42.8931,-3.5694",
        "waypoints": ["42.9756,-3.6853"],
        "destination": "43.0336,-3.6644"
      },
      "activities": [
        {
          "time": "Por la mañana",
          "type": "visita",
          "title": "Puentedey",
          "location": "Puentedey",
          "lat": 42.9756,
          "lng": -3.6853,
          "duration": "1 - 1,5 h",
          "highlights": [
            "Puente natural excavado por el río Nela",
            "El pueblo",
            "Iglesia de San Pelayo",
            "Miradores",
            "Zona baja junto al río",
            "Paseo corto"
          ],
          "description": "Primera parada del domingo, con tiempo para bajar al río y ver el puente natural desde abajo.",
          "logistics": "La senda baja junto al Nela es cómoda; el resto, terreno mixto."
        },
        {
          "time": "Opcional",
          "type": "bano",
          "optional": true,
          "title": "¿Hace bueno? Podemos bañarnos",
          "location": "Zona de baño del río Nela (Puentedey)",
          "lat": 42.9756,
          "lng": -3.6853,
          "description": "Si hace calor, llevamos bañador y toalla. Antes de entrar al agua comprobaremos caudal, temperatura, señalización y estado del río.",
          "notes": [
            "Es opcional: solo si apetece y las condiciones acompañan.",
            "El agua puede estar fría.",
            "Con las niñas, comprobar el estado del río al llegar.",
            "Si hubiera señalización que lo impida, no nos bañamos."
          ],
          "checklist": ["Bañadores", "Toallas", "Escarpines o calzado de agua", "Muda para las niñas"],
          "checklistTitle": "Llevar en el coche",
          "info": "Zona tradicional de baño junto al río Nela, con campa y mesas en el entorno de la bolera."
        },
        {
          "time": "Según reserva",
          "type": "visita",
          "title": "Ojo Guareña · Cueva-Ermita de San Bernabé",
          "location": "Monumento Natural de Ojo Guareña",
          "lat": 43.0336,
          "lng": -3.6644,
          "reserva": true,
          "reservaNote": "La visita depende del horario y de la reserva de San Bernabé. Comprobar antes de ir; no hay hora confirmada en la app.",
          "description": "Segunda visita del domingo: recorrido por la cueva-ermita excavada en la roca.",
          "logistics": "Dentro de la cueva, la pequeña mejor en porteo o de la mano."
        },
        {
          "time": "Comida",
          "type": "comida",
          "title": "¿Dónde comemos?",
          "location": "Por decidir",
          "open": true,
          "description": "Último momento todos juntos. Sin restaurante elegido todavía: decidimos sobre la marcha.",
          "options": [
            { "name": "La Taxuela", "phone": "947 190 597", "tel": "+34947190597", "query": "La Taxuela restaurante Villarcayo", "note": "Zona Villarcayo / Medina de Pomar. Primera opción para una comida especial de despedida." },
            { "name": "Mesón Restaurante El Cid", "phone": "947 13 11 71", "tel": "+34947131171", "query": "Mesón Restaurante El Cid Villarcayo" },
            { "name": "RestoBar La Cucaña", "phone": "654 15 05 15", "tel": "+34654150515", "query": "RestoBar La Cucaña Puentedey", "note": "En Puentedey. Normalmente sin reserva y por orden de llegada: puede no ser cómodo para 7 si está concurrido." }
          ]
        },
        {
          "time": "Después de comer",
          "type": "transporte",
          "title": "Fin del fin de semana",
          "location": "Cada familia hacia casa",
          "description": "Desde la comida, cada familia empieza su regreso.",
          "farewell": true
        }
      ]
    }
  ],

  "info": {
    "packing": [
      "Calzado cómodo",
      "Sudadera o chaqueta fina",
      "Agua",
      "Crema solar",
      "Gorras",
      "Batería externa",
      "Bañadores",
      "Toallas",
      "Escarpines",
      "Muda de las niñas",
      "Algo de picoteo",
      "Mochila de porteo si se considera útil para la pequeña"
    ],
    "reservas": [
      "Cueva-Ermita de San Bernabé (Ojo Guareña): comprobar horario y reserva antes de ir. La hora del domingo queda abierta a lo que se confirme.",
      "Comida del sábado en Frías: conviene llamar para asegurar mesa para 7.",
      "Comida del domingo: sin restaurante elegido todavía."
    ],
    "bano": [
      "Zona tradicional de baño junto al río Nela, en Puentedey, con campa y mesas en el entorno de la bolera.",
      "Es una opción, no un plan cerrado: decidimos al llegar.",
      "Comprobar caudal, temperatura, señalización y estado del río antes de entrar.",
      "El agua puede estar fría, sobre todo por la mañana.",
      "En Tobera no está previsto bañarse."
    ],
    "contacts": [
      { "label": "Emergencias", "value": "112", "tel": "112", "emergency": true }
    ],
    "notes": [
      "Los horarios son orientativos: la idea es no ir con prisa.",
      "Cobertura móvil irregular en cañones y valles: esta app funciona sin conexión.",
      "El sábado es Frías y Tobera; el domingo, Puentedey y Ojo Guareña."
    ]
  }
};
