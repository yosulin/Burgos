// Guía Merindades en Familia — todos los datos del viaje.
// Los horarios son ORIENTATIVOS a propósito: la app los muestra como tales.
// La única hora cerrada es el pase de la cueva-ermita de San Bernabé,
// domingo 13 a las 11:30, que ya está pagado.
// Las fotos están en assets/images. Las ilustraciones SVG originales siguen
// en esa carpeta por si alguna foto se quiere sustituir.
window.TRIP_DATA = {
  "trip": {
    "title": "Las Merindades en Familia",
    "dates": "12 - 13 septiembre 2026",
    "places": "Frías · Tobera · Tobalina · Ojo Guareña · Puentedey",
    "group": "2 parejas y 3 niñas (9, 7 y 3 años)",
    "hero": "assets/images/hero.svg",
    "hotel": {
      "name": "Hotel Rural La Torre de Bisjueces",
      "address": "C. San Juan 58, Bisjueces, Burgos",
      "phone": "656 74 17 92",
      "tel": "+34656741792",
      "lat": 42.8931,
      "lng": -3.5694
    },
    "returns": [
      { "label": "Ruta a Donostia", "query": "Donostia-San Sebastián" },
      { "label": "Ruta a Valladolid", "query": "Valladolid" }
    ],
  },

  "days": [
    {
      "id": "day-1",
      "tab": "Sábado",
      "date": "Sábado 12 de septiembre",
      "title": "Frías, Tobera y Tobalina",
      "intro": "Quedamos en Frías, mañana entre el pueblo y Tobera, y comemos allí. La tarde se decide sobre la marcha: Tobalina si apetece baño, o más Frías sin prisa. Dormimos en Bisjueces.",
      "stops": [
        {
          "id": "frias",
          "kind": "destino",
          "name": "Frías",
          "subtitle": "Aquí quedamos · mañana y lo que quede de tarde",
          "image": "assets/images/frias.jpg",
          "time": "10:30 aprox.",
          "duration": "2 h + tarde",
          "intro": "Punto de encuentro del fin de semana y centro del día. La villa más pequeña de España, colgada sobre la peña de toba. Sin agenda: paseo, miradores y lo que apetezca.",
          "highlights": [
            "Castillo de los Velasco",
            "Casco medieval",
            "Casas colgadas",
            "Miradores",
            "Puente medieval sobre el Ebro"
          ],
          "tags": ["🥾 Terreno irregular", "🚼 Porteo recomendable", "🎟 Castillo 2 €"],
          "lat": 42.7631,
          "lng": -3.2972,
          "details": [
            { "title": "Aparcar y quedar", "text": "Se aparca en la parte baja de la villa, que el casco es empinado y estrecho, y desde ahí ya todo a pie." },
            { "title": "Con las niñas", "text": "Calles empinadas y empedradas: mejor de la mano, y la pequeña en porteo en las cuestas. El carrito se queda en el coche." },
            { "title": "Castillo", "text": "Entrada 2 €, se saca en la oficina de turismo a pie de castillo (947 358 011). Abre de 10:30 a 14:00 y de 16:00 a 19:30, con el último acceso media hora antes de cada cierre: entra bien por la mañana antes de Tobera." },
            { "title": "El puente del Ebro", "text": "Queda algo apartado del casco, junto al río y con aparcamiento fácil. Entorno llano para estirar las piernas.", "map": { "lat": 42.7697, "lng": -3.2878, "label": "Ir al puente medieval" } }
          ]
        },
        {
          "id": "tobera",
          "kind": "destino",
          "name": "Tobera",
          "image": "assets/images/tobera.jpg",
          "subtitle": "A cinco minutos de Frías",
          "time": "11:45 aprox.",
          "duration": "1 - 1,5 h",
          "intro": "Un desfiladero pequeño con cascadas, puentes y sombra. Se aparca arriba, junto a la carretera, y se baja andando. Al acabar, de vuelta a Frías a comer.",
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
            { "title": "Con las niñas", "text": "Paseo corto y muy agradecido. Hay escalones y pasarelas de madera: la pequeña de la mano o en porteo." },
            { "title": "Cobertura", "text": "Abajo, en el desfiladero, la cobertura va y viene. Si el grupo se separa, quedad arriba en el aparcamiento." }
          ]
        },
        {
          "id": "comida-sabado",
          "kind": "comida",
          "name": "Comer en Frías",
          "time": "13:30 - 14:00",
          "intro": "Volvemos de Tobera, que está a cinco minutos. Somos 7 y es sábado de septiembre: conviene llamar antes para asegurar mesa.",
          "options": [
            { "name": "Ortiz Bar Restaurante", "note": "Primera opción · reservar para 7", "phone": "947 35 70 67", "tel": "+34947357067", "query": "Ortiz Bar Restaurante Frías Burgos" },
            { "name": "Mesón Fridas", "note": "C/ Mercado 10, bajo el castillo · menú de fin de semana ~25 €", "phone": "947 35 72 43", "tel": "+34947357243", "query": "Mesón Fridas Frías Burgos" },
            { "name": "Restaurante El Albergue", "note": "Junto al puente medieval · local amplio y aparcamiento propio", "phone": "627 63 50 60", "tel": "+34627635060", "query": "Restaurante El Albergue Frías Burgos" },
            { "name": "Restaurante A Fuego Lento", "phone": "651 90 76 06", "tel": "+34651907606", "query": "Restaurante A Fuego Lento Frías Burgos" }
          ]
        },
        {
          "id": "tobalina",
          "kind": "destino",
          "name": "Cascada de Pedrosa de Tobalina",
          "subtitle": "Tarde opcional · lo decidimos en la comida",
          "image": "assets/images/tobalina.webp",
          "time": "Media tarde, si apetece",
          "duration": "1,5 - 2 h",
          "intro": "El río Jerea se despeña unos 12 metros sobre una plataforma de roca de casi 100 metros de ancho, con una poza debajo que es zona de baño. A 25 minutos de Frías, al otro lado del valle.",
          "highlights": [
            "Salto del Peñón",
            "Poza del Jerea",
            "Merendero junto al río",
            "Aparcamiento a pie de cascada"
          ],
          "tags": ["🏊 Zona de baño", "⚠️ Roca resbaladiza", "🚗 25 min desde Frías"],
          "lat": 42.7876,
          "lng": -3.1957,
          "swim": {
            "title": "El baño del sábado, si el día acompaña",
            "text": "La poza al pie de la cascada es zona de baño. Se decide allí mismo según temperatura, caudal y señalización: en septiembre el Jerea baja con poca agua y fría.",
            "pack": ["Bañadores", "Toallas", "Escarpines", "Muda para las niñas"]
          },
          "details": [
            { "title": "Con las niñas", "text": "La roca junto al agua resbala bastante. De la mano a las mayores y la pequeña en la mochila mientras se baja al nivel del río." },
            { "title": "Lo que cuesta", "text": "Suma unos 50 km al día: 25 minutos desde Frías y hora y cuarto larga desde la cascada hasta Bisjueces. Si el grupo viene cansado, mejor tarde tranquila en Frías." },
            { "title": "Si sobra tiempo", "text": "A siete minutos, en Lomana, queda la torre de los Bonifaz (s. XV).", "map": { "lat": 42.7790, "lng": -3.2350, "label": "Ir a la torre de los Bonifaz" } }
          ]
        },
        {
          "id": "hotel-sabado",
          "kind": "descanso",
          "name": "A Bisjueces",
          "time": "Tarde / noche",
          "intro": "Desde Frías al hotel hay unos 50 km y cerca de una hora por Trespaderne y Villarcayo; si al final vais a la cascada, contad hora y cuarto largo desde allí. Villarcayo queda de paso a 8 minutos: última oportunidad para supermercado o farmacia. Cena y el resto del día juntos, que era de lo que se trataba.",
          "mapLabel": "Ir al hotel",
          "lat": 42.8931,
          "lng": -3.5694
        }
      ]
    },

    {
      "id": "day-2",
      "tab": "Domingo",
      "date": "Domingo 13 de septiembre",
      "title": "Ojo Guareña y Puentedey",
      "intro": "La cueva-ermita por la mañana, con pase reservado a las 11:30, y luego bajamos a Puentedey a comer y a despedirnos.",
      "stops": [
        {
          "id": "salida-domingo",
          "kind": "encuentro",
          "name": "Salida del hotel",
          "time": "09:45",
          "intro": "Del hotel a la cueva hay unos 35 km y cerca de 40 minutos, con curvas al final. Es la única hora del fin de semana que no se puede estirar: el pase es a las 11:30 y conviene estar en la taquilla sobre las 11:00. Meted la ruta en el navegador antes de arrancar, que el último tramo se queda sin cobertura.",
          "mapLabel": "Ir a la cueva de San Bernabé",
          "lat": 43.0336,
          "lng": -3.6644
        },
        {
          "id": "ojoguarena",
          "kind": "destino",
          "name": "Ojo Guareña",
          "subtitle": "Cueva-ermita de San Bernabé · pase de las 11:30",
          "image": "assets/images/ojoguarena.jpg",
          "time": "11:30 · entradas hechas",
          "duration": "45 min de visita",
          "intro": "Una ermita metida dentro de la roca, en uno de los mayores complejos kársticos de la península. Se recorren 400 metros de galerías y hay una proyección de 10 minutos.",
          "highlights": [
            "Cueva-ermita de San Bernabé",
            "Pinturas murales de 1705 y 1877",
            "Pila del Santo y galería de los Silos",
            "Mirador sobre el sumidero del Guareña"
          ],
          "tags": ["🎟 Pagado · 34,00 €", "🚼 Porteo obligatorio", "🧥 Hace fresco dentro"],
          "lat": 43.0336,
          "lng": -3.6644,
          "booking": {
            "title": "Entradas pagadas · 34,00 €",
            "text": "Pase del domingo 13 a las 11:30 para 7: 4 generales (6 € cada una) + 2 juveniles de 7 a 16 (5 €) + la pequeña, gratis por ser menor de 6. Llegar a la taquilla 20-30 minutos antes. Dudas o cambios: 645 490 288."
          },
          "details": [
            { "title": "Con las niñas", "text": "Dentro no entra el carrito: la pequeña en mochila de porteo. Para las de 7 y 9 el recorrido es fácil y de los que más gustan. Hace fresco todo el año: una chaqueta fina para las tres." },
            { "title": "Antes de entrar", "text": "Aseos en el aparcamiento, porque dentro no hay. Mientras se espera el pase da tiempo al mirador sobre el sumidero del río y a ver la fachada de la ermita encajada en la roca." },
            { "title": "Si llueve o sobra rato", "text": "La Casa del Parque de Quintanilla del Rebollar queda a cinco minutos y explica el karst con maquetas.", "map": { "lat": 43.0545, "lng": -3.6528, "label": "Ir a la Casa del Parque" } }
          ]
        },
        {
          "id": "comida-domingo",
          "kind": "comida",
          "name": "Comer en Puentedey",
          "time": "14:00 aprox.",
          "intro": "En el pueblo hay poca cosa y un domingo se llena: hay que llamar antes. Si no hay mesa, se come de camino y se baja a Puentedey ya sin prisa.",
          "open": true,
          "options": [
            { "name": "RestoBar La Cucaña", "note": "En Puentedey · suele ser por orden de llegada", "phone": "654 15 05 15", "tel": "+34654150515", "query": "RestoBar La Cucaña Puentedey" },
            { "name": "Bar La Montañesa", "note": "En Puentedey · C/ El Barrio 30", "phone": "653 13 23 53", "tel": "+34653132353", "query": "Bar La Montañesa Puentedey" },
            { "name": "Asador Cueva Kaite", "note": "Plan B · Villabáscones, a 5 min de la cueva", "phone": "947 13 86 80", "tel": "+34947138680", "query": "Asador Cueva Kaite Villabáscones de Sotoscueva" },
            { "name": "Restaurante Maygo", "note": "Plan B · Quintanilla de Sotoscueva, de camino", "phone": "947 13 87 44", "tel": "+34947138744", "query": "Restaurante Maygo Quintanilla de Sotoscueva" },
            { "name": "La Taxuela", "note": "Plan B · Villarcayo, a 20 min", "phone": "947 190 597", "tel": "+34947190597", "query": "La Taxuela restaurante Villarcayo" }
          ]
        },
        {
          "id": "puentedey",
          "kind": "destino",
          "name": "Puentedey",
          "image": "assets/images/puentedey.jpg",
          "time": "Después de comer",
          "duration": "1,5 h",
          "intro": "El pueblo se asienta sobre un puente natural que el río Nela excavó en la roca: 15 metros de alto, 34 de ancho y 75 de largo. Se ve desde arriba y desde abajo.",
          "highlights": [
            "Puente natural sobre el Nela",
            "Mirador del Espolón",
            "Iglesia de San Pelayo",
            "Palacio de los Brizuela",
            "Senda baja junto al río"
          ],
          "tags": ["👧 Fácil con niñas", "🚼 La senda baja admite carrito"],
          "lat": 42.9756,
          "lng": -3.6853,
          "swim": {
            "title": "Si hace bueno: posibilidad de baño",
            "text": "Podemos llevar bañador y decidir allí según temperatura, caudal, estado del río y señalización.",
            "pack": ["Bañadores", "Toallas", "Escarpines", "Muda para las niñas"]
          },
          "details": [
            { "title": "Con las niñas", "text": "La senda baja junto al Nela es llana y admite carrito; el mirador del Espolón tiene escalones. Se puede repartir el grupo: lo de abajo, pasando bajo el arco, es lo más espectacular." },
            { "title": "Aparcar", "text": "A la entrada del pueblo, en la parte alta. Desde ahí todo se hace a pie." }
          ]
        },
        {
          "id": "despedida",
          "kind": "despedida",
          "name": "Fin del fin de semana",
          "time": "Media tarde",
          "intro": "Merienda junto al río, foto de grupo bajo el arco y cada familia empieza su camino de vuelta. Repostad en Villarcayo antes de coger la autovía."
        }
      ]
    }
  ],

  "info": {
    "packing": [
      "Calzado cómodo",
      "Sudadera / chaqueta fina",
      "Chaqueta para la cueva",
      "Mochila de porteo",
      "Carrito (solo para Puentedey)",
      "Agua",
      "Crema solar",
      "Gorras",
      "Batería externa",
      "Bañadores",
      "Toallas",
      "Escarpines",
      "Muda para las niñas",
      "Algo de picoteo",
      "Justificante de las entradas de la cueva"
    ],
    "reservas": [
      "Cueva-ermita de San Bernabé: pase del domingo 13 a las 11:30 ya pagado, 34,00 € (4 generales a 6 €, 2 juveniles a 5 € y la pequeña gratis).",
      "Estar en la taquilla de la cueva sobre las 11:00, media hora antes del pase.",
      "Comida del sábado en Frías: llamar para asegurar mesa para 7.",
      "Comida del domingo en Puentedey: hay muy pocas mesas, llamar con antelación a La Cucaña o La Montañesa.",
      "Confirmar con el hotel la hora del desayuno del domingo: hay que salir a las 09:45."
    ],
    "bano": [
      "Dos opciones, las dos se deciden allí mismo: la poza del Jerea al pie de la cascada de Pedrosa (sábado por la tarde) y el río Nela en Puentedey (domingo).",
      "Comprobar temperatura, caudal, estado del río y señalización antes de entrar.",
      "El agua puede estar fría, sobre todo por la mañana.",
      "En Tobera no está previsto bañarse."
    ],
    "emergencias": [
      { "label": "Emergencias", "value": "112", "tel": "112" },
      { "label": "Hotel La Torre de Bisjueces", "value": "656 74 17 92", "tel": "+34656741792" },
      { "label": "Cuevas de Ojo Guareña", "value": "645 490 288", "tel": "+34645490288" },
      { "label": "Turismo de Frías", "value": "947 358 011", "tel": "+34947358011" }
    ],
    "notas": [
      "Los horarios son orientativos salvo el pase de la cueva: ese sí es a las 11:30.",
      "La tarde del sábado es abierta: en la comida se decide si se va a la cascada de Pedrosa o si el plan es Frías sin prisa.",
      "La cobertura falla en el valle del Nela, en Tobera y en el entorno del Monumento Natural; la guía funciona sin conexión, pero abrid la ruta en Maps antes de bajar al cañón.",
      "Si llueve: el castillo de Frías y la cueva son planes de interior. Las pasarelas de Tobera se ponen resbaladizas.",
      "Las coordenadas de bares y aparcamientos llevan al punto, no al portal exacto.",
      "Precios y horarios comprobados el 11/09/2026: confirmad por teléfono antes de salir."
    ]
  }
};
