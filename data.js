// Datos del viaje. Editar aquí para actualizar la app.
window.TRIP_DATA = {
  "trip": {
    "title": "Las Merindades en Familia",
    "dates": "12 - 13 Septiembre 2026",
    "base": {
      "name": "Hotel Rural La Torre de Bisjueces",
      "address": "C. San Juan 58, Bisjueces, Burgos",
      "lat": 42.8931,
      "lng": -3.5694
    }
  },
  "days": [
    {
      "id": "day-1",
      "date": "2026-09-12",
      "label": "Sábado 12: Cuevas y Naturaleza",
      "short": "Sábado 12",
      "activities": [
        {
          "time": "10:00",
          "title": "Salida hacia Ojo Guareña",
          "location": "Bisjueces → Cueva de San Bernabé",
          "category": "logistica",
          "lat": 43.0336,
          "lng": -3.6644,
          "babyStroller": false,
          "carrier": false,
          "terrain": "asfalto",
          "logisticsTip": "Trayecto en coche de aprox. 25 min.",
          "description": "Salida desde el hotel hacia el aparcamiento habilitado del Monumento Natural."
        },
        {
          "time": "11:00",
          "title": "Cueva Ermita de San Bernabé",
          "location": "Monumento Natural de Ojo Guareña",
          "category": "cultura",
          "lat": 43.0336,
          "lng": -3.6644,
          "babyStroller": false,
          "carrier": true,
          "terrain": "mixto",
          "logisticsTip": "Sin carrito dentro de la cueva. Porteo obligatorio para la peque de 2 años. Fácil para 7 y 9 años.",
          "description": "Recorrido de 400 m por pasarela iluminada con pinturas rupestres y ermita en roca. Entrada con reserva previa."
        },
        {
          "time": "13:30",
          "title": "Comida familiar",
          "location": "Espinosa de los Monteros / Villarcayo",
          "category": "comida",
          "lat": 42.9383,
          "lng": -3.5714,
          "babyStroller": true,
          "carrier": false,
          "terrain": "llano",
          "logisticsTip": "Plazas peatonales con soportales y espacio seguro para correr.",
          "description": "Almuerzo tranquilo en terraza o mesón tradicional."
        },
        {
          "time": "16:30",
          "title": "Puentedey y Paseo Fluvial",
          "location": "Puentedey",
          "category": "naturaleza",
          "lat": 42.9756,
          "lng": -3.6853,
          "babyStroller": true,
          "carrier": false,
          "terrain": "mixto",
          "logisticsTip": "Apto para carrito en la senda baja junto al río Nela.",
          "description": "Impresionante puente natural de roca caliza tallado por el río. Paseo llano, merendero y parada para fotos."
        },
        {
          "time": "19:30",
          "title": "Vuelta y descanso en Bisjueces",
          "location": "Hotel Rural La Torre de Bisjueces",
          "category": "relax",
          "lat": 42.8931,
          "lng": -3.5694,
          "babyStroller": true,
          "carrier": false,
          "terrain": "llano",
          "logisticsTip": "Regreso a 15 min en coche de Puentedey.",
          "description": "Paseo tranquilo por la plaza y portada renacentista del pueblo antes de cenar."
        }
      ]
    },
    {
      "id": "day-2",
      "date": "2026-09-13",
      "label": "Domingo 13: Cascadas y Villa Medieval",
      "short": "Domingo 13",
      "activities": [
        {
          "time": "10:30",
          "title": "Cascadas de Tobera",
          "location": "Tobera (Frías)",
          "category": "naturaleza",
          "lat": 42.7561,
          "lng": -3.3105,
          "babyStroller": false,
          "carrier": true,
          "terrain": "mixto",
          "logisticsTip": "Pasarelas de madera y escalones. Usar porteo para 2 años; muy ameno para 7 y 9 años.",
          "description": "Paseo fluvial de menos de 1 km junto al río Molinar, puentes de madera y ermita de Santa María de la Hoz."
        },
        {
          "time": "12:15",
          "title": "Villa Medieval y Castillo de Frías",
          "location": "Frías",
          "category": "cultura",
          "lat": 42.7631,
          "lng": -3.2972,
          "babyStroller": false,
          "carrier": true,
          "terrain": "empinado",
          "logisticsTip": "Calles empinadas y empedradas. Carro practicable pero exigente; mejor porteo y mano.",
          "description": "Paseo por las casas colgadas sobre la toba, vistas panorámicas y exterior/interior del castillo roquero."
        },
        {
          "time": "14:00",
          "title": "Comida en Frías",
          "location": "Casco de Frías",
          "category": "comida",
          "lat": 42.7631,
          "lng": -3.2972,
          "babyStroller": true,
          "carrier": false,
          "terrain": "llano",
          "logisticsTip": "Reserva de mesa previa recomendada.",
          "description": "Gastronomía local castellana antes del viaje de regreso."
        },
        {
          "time": "16:30",
          "title": "Puente Medieval de Frías y despedida",
          "location": "Río Ebro (Frías)",
          "category": "relax",
          "lat": 42.7697,
          "lng": -3.2878,
          "babyStroller": true,
          "carrier": false,
          "terrain": "llano",
          "logisticsTip": "Entorno llano, pradera de césped junto al río y fácil aparcamiento.",
          "description": "Último paseo llano con carritos y despedida del grupo antes de emprender regreso a Valladolid y casa."
        }
      ]
    }
  ],
  "info": {
    "packing": [
      "Mochila de porteo (imprescindible: cueva de San Bernabé y Tobera)",
      "Carrito ligero para Puentedey, Villarcayo y el puente del Ebro",
      "Calzado cerrado con suela agarre (pasarelas húmedas)",
      "Chaqueta fina: la cueva ronda los 12 ºC todo el año",
      "Gorras, crema solar y agua",
      "Snacks y muda de recambio para la peque",
      "Batería externa y descarga de mapas offline"
    ],
    "notes": [
      "Reserva previa obligatoria para la Cueva Ermita de San Bernabé (aforo limitado).",
      "Cobertura móvil irregular en cañones y valles: esta app funciona sin conexión.",
      "Los horarios son estimados; margen de 20-30 min entre hitos.",
      "Comidas: reservar mesa el sábado en Espinosa/Villarcayo y el domingo en Frías."
    ],
    "contacts": [
      {
        "label": "Emergencias",
        "value": "112",
        "tel": "112"
      },
      {
        "label": "Hotel La Torre de Bisjueces",
        "value": "947 13 13 20",
        "tel": "+34947131320"
      },
      {
        "label": "Oficina Turismo Villarcayo",
        "value": "947 13 19 30",
        "tel": "+34947131930"
      }
    ]
  }
};
