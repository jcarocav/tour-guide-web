window.addEventListener('scroll',()=>{ document.getElementById('mainNav').classList.toggle('scrolled',window.scrollY>60); });
const ham=document.getElementById('hamburger'), mobileNav=document.getElementById('mobileNav');
ham.addEventListener('click',()=>{
  const open=ham.classList.toggle('open');
  ham.setAttribute('aria-expanded',open);
  mobileNav.setAttribute('aria-hidden',!open);
  if(open){mobileNav.style.display='block';requestAnimationFrame(()=>mobileNav.classList.add('open'));}
  else{mobileNav.classList.remove('open');setTimeout(()=>{if(!mobileNav.classList.contains('open'))mobileNav.style.display='none';},300);}
});
function closeMenu(){ham.classList.remove('open');ham.setAttribute('aria-expanded','false');mobileNav.classList.remove('open');mobileNav.setAttribute('aria-hidden','true');setTimeout(()=>{mobileNav.style.display='none';},300);}
const waFloat=document.getElementById('waFloat'), reservaSection=document.getElementById('reserva');
new IntersectionObserver(entries=>entries.forEach(e=>waFloat.classList.toggle('hidden',e.isIntersecting)),{threshold:0.15}).observe(reservaSection);
const tabMap={'city':'City Tour','fuego':'Tierra del Fuego','fuerte':'Fuerte Bulnes','reserva-mag':'Res. Magallanes','rey':'Pingüino Rey','faro':'Faro San Isidro','pali':'Pali Aike'};
function switchTab(id,btn){
  document.querySelectorAll('.iti-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.iti-tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('iti-'+id).classList.add('active');
  if(btn)btn.classList.add('active');
  else document.querySelectorAll('.iti-tab').forEach(t=>{if(t.textContent.trim()===tabMap[id])t.classList.add('active');});
}
function activateIti(id,e){
  e.preventDefault(); switchTab(id,null);
  setTimeout(()=>{
    const offset=document.getElementById('itinerarios').getBoundingClientRect().top+window.scrollY-70;
    window.scrollTo({top:offset,behavior:'smooth'});
    const at=document.querySelector('.iti-tab.active');
    if(at)at.scrollIntoView({inline:'center',behavior:'smooth'});
  },50);
}
function toggleFaq(el){el.classList.toggle('open');}

// ── SLIDESHOW AUTOMÁTICO EN SECCIÓN #cuando ──
const cuandoBgs = [
  "img/Tierra del Fuego.png",    // Verano
  "img/fuerte bulnes.jpeg",      // Otoño
  "img/City tour 2.jpg",         // Invierno
  "img/Pinguino Rey.jpeg"        // Primavera
];

(function initCuandoSlideshow() {
  const sec = document.getElementById('cuando');
  if (!sec) return;

  let current = 0;

  function changeBg() {
    // 1. Fade out
    sec.classList.remove('bg-visible');

    setTimeout(() => {
      // 2. Cambia imagen mientras es invisible
      current = (current + 1) % cuandoBgs.length;
      sec.style.setProperty('--cuando-bg', `url('${cuandoBgs[current]}')`);
      sec.querySelector(':scope::before'); // fuerza reflow (ver nota)
      sec.style.cssText += ''; // flush

      // Aplica la imagen al ::before vía custom property
      sec.style.setProperty('--cuando-bg', `url('${cuandoBgs[current]}')`);

      // 3. Fade in
      requestAnimationFrame(() => sec.classList.add('bg-visible'));
    }, 1000); // espera que termine el fade out (coincide con transition: 1s)
  }

  // Imagen inicial
  sec.style.setProperty('--cuando-bg', `url('${cuandoBgs[0]}')`);
  requestAnimationFrame(() => sec.classList.add('bg-visible'));

  setInterval(changeBg, 3000); // cambia cada 3s (1s fade + 2s visible)
})();
// ── SLIDESHOW AUTOMÁTICO EN SECCIÓN #confianza ──
const confianzaBgs = [
  "img/Grupal-1.jpeg",
  "img/Grupal-2.jpeg",
  "img/Grupal-3.jpeg",
  "img/Grupal-4.jpeg"
];

(function initConfianzaSlideshow() {
  const sec = document.getElementById('confianza');
  if (!sec) return;

  let current = 0;

  function changeBg() {
    sec.classList.remove('bg-visible');
    setTimeout(() => {
      current = (current + 1) % confianzaBgs.length;
      sec.style.setProperty('--confianza-bg', `url('${confianzaBgs[current]}')`);
      requestAnimationFrame(() => sec.classList.add('bg-visible'));
    }, 1000);
  }

  sec.style.setProperty('--confianza-bg', `url('${confianzaBgs[0]}')`);
  requestAnimationFrame(() => sec.classList.add('bg-visible'));

  setInterval(changeBg, 3000);
})();

// ── TRADUCTOR ES ↔ EN ──
// Nombres de lugares, marcas y coloquialismos están EXCLUIDOS de la traducción
const translations = {

  // ── NAV ──
  'Cuándo ir':                      'When to go',
  'Cómo llegar':                    'How to get here',
  'Confianza':                      'Why us',
  'Reservar':                       'Book now',
  'Por qué elegirme':               'Why choose me',
  '📲 Reservar ahora':              '📲 Book now',
  'Itinerarios':                    'Itineraries',

  // ── HERO ──
  'La Patagonia':                   'Patagonia',
  'auténtica':                      'authentic',
  'te espera':                      'awaits you',
  'Tours de aventura, historia y naturaleza guiados por un experto local certificado. Experiencias únicas, personalizadas y auténticas.':
    'Adventure, history and nature tours guided by a certified local expert. Unique, personalized and authentic experiences.',
  'Reservar por WhatsApp':          'Book via WhatsApp',
  'Ver todos los tours →':          'See all tours →',
  'Destinos':                       'Destinations',
  'Personas':                       'People',
  'Personalizado':                  'Customized',
  'Guía Oficial':                   'Official Guide',
  'Certificado':                    'Certified',

  // ── URGENCIA ──
  'Temporada alta: quedan':         'High season: only',
  'pocas plazas disponibles':       'few spots left',
  'para Diciembre – Febrero':       'for December – February',
  'Consultar disponibilidad →':     'Check availability →',

  // ── SECCIÓN TOURS ──
  'Experiencias disponibles':       'Available experiences',
  'Todos los':                      'All',
  'Haz click en cualquier tour para ver su itinerario completo, precio y reserva.':
    'Click any tour to see the full itinerary, price and booking.',
  'Tour Estrella':                  'Star Tour',
  'Nivel: Bajo':                    'Level: Easy',
  'Nivel: Medio':                   'Level: Moderate',
  'Ver itinerario y precio →':      'See itinerary & price →',
  'A domicilio':                    'Hotel pickup',
  'Histórico':                      'Historic',
  'Reserva anticipada':             'Advance booking required',
  'Arqueológico':                   'Archaeological',

  // ── DESCRIPCIONES TOUR CARDS ──
  'Historia, arquitectura y cultura de Punta Arenas con fechas especiales del año.':
    'History, architecture and culture of Punta Arenas with special seasonal dates.',
  'Pingüineras, Bahía Inútil y almuerzo local. El tour más épico de la región.':
    'Penguin colonies, Bahía Inútil and local lunch. The most epic tour in the region.',
  'El primer asentamiento chileno del Estrecho de Magallanes. Historia del siglo XIX.':
    'The first Chilean settlement on the Strait of Magellan. 19th century history.',
  'Bosques de lenga con panorama del Estrecho. Naturaleza virgen a 15 min del centro.':
    'Lenga forests with views of the Strait. Virgin nature 15 min from downtown.',
  'La colonia más austral del mundo. Un espectáculo que pocos viajeros presencian.':
    'The world\'s southernmost colony. A spectacle few travelers ever witness.',
  'Uno de los faros más remotos del mundo. Paisajes únicos en la Ruta Y-71.':
    'One of the world\'s most remote lighthouses. Unique landscapes on Route Y-71.',

  // ── SECCIÓN ITINERARIOS ──
  'Paso a paso':                    'Step by step',
  'Itinerarios, precios':           'Itineraries, prices',
  'y':                              'and',
  'reservas':                       'bookings',
  'Haz click en cualquier tour de arriba para ir directo a su itinerario. También puedes navegar por las pestañas.':
    'Click any tour above to go directly to its itinerary. You can also browse the tabs.',
  'Res. Magallanes':                'Mag. Reserve',

  // ── ITINERARIO CITY TOUR ──
  'Recogida a domicilio':           'Hotel pickup',
  'Todas las edades':               'All ages',
  'Recorrido histórico y cultural por Punta Arenas, adaptado a tus intereses. Van privada desde tu alojamiento con fechas y eventos especiales según la temporada.':
    'Historical and cultural tour of Punta Arenas, tailored to your interests. Private van from your accommodation with special seasonal dates and events.',
  'Precio por persona':             'Price per person',
  'Mín. 2 personas · Máx. 25 personas':  'Min. 2 people · Max. 25 people',
  'Consultar tarifas grupales':     'Ask about group rates',
  'Reservar este tour':             'Book this tour',
  '✓ Incluido':                     '✓ Included',
  '✗ No incluido':                  '✗ Not included',
  'Van privada con calefacción':    'Heated private van',
  'Guía certificado':               'Certified guide',
  'Entradas a museos':              'Museum entrance fees',
  'Alimentación':                   'Food & drinks',
  'Binoculares':                    'Binoculars',
  'Recogida en tu hotel':           'Hotel pickup',
  'Van privada, cómoda y calefaccionada.': 'Comfortable heated private van.',
  'Plaza de Armas y centro histórico': 'Main Square and historic center',
  'Monumento a Hernando de Magallanes, edificios patrimoniales, relatos históricos únicos.':
    'Monument to Hernando de Magallanes, heritage buildings, unique historical stories.',
  'Historia patagónica desde los pueblos originarios hasta hoy.':
    'Patagonian history from indigenous peoples to the present day.',
  'Cerro La Cruz — mirador panorámico': 'Cerro La Cruz — panoramic viewpoint',
  'La mejor vista sobre la ciudad y el Estrecho de Magallanes.':
    'The best view over the city and the Strait of Magellan.',
  'Cementerio Municipal (opcional)': 'Municipal Cemetery (optional)',
  'Monumento Nacional, uno de los más llamativos de Sudamérica.':
    'National Monument, one of the most striking in South America.',
  'Regreso a tu alojamiento':       'Return to your accommodation',
  'Con recomendaciones personalizadas para el resto de tu estadía.':
    'With personalized recommendations for the rest of your stay.',

  // ── ITINERARIO TIERRA DEL FUEGO ──
  'Reserva de almuerzo incluida':   'Lunch reservation included',
  'Un día completo cruzando hacia Tierra del Fuego. Pingüineras, Bahía Inútil y gastronomía magallánica auténtica. El tour más épico de la región.':
    'A full day crossing into Tierra del Fuego. Penguin colonies, Bahía Inútil and authentic Magellanic cuisine. The most epic tour in the region.',
  'Almuerzo a cargo del viajero':   'Lunch at traveler\'s expense',
  'Traslado completo ida y vuelta': 'Full round-trip transfer',
  'Reserva en restaurante local':   'Local restaurant reservation',
  'Costo del almuerzo':             'Lunch cost',
  'Entradas a parques':             'Park entrance fees',
  'Recogida a domicilio (máximo)':  'Hotel pickup (earliest)',
  'Salida temprana para aprovechar toda la luz del día patagónico.':
    'Early departure to make the most of the long Patagonian day.',
  'Pingüineras en Tierra del Fuego': 'Penguin colonies in Tierra del Fuego',
  'Colonias de pingüinos de Magallanes en su hábitat natural.':
    'Magellanic penguin colonies in their natural habitat.',
  'Almuerzo en restaurante local':  'Lunch at a local restaurant',
  'Gastronomía magallánica auténtica. Reserva coordinada por Daniel.':
    'Authentic Magellanic cuisine. Reservation coordinated by Daniel.',
  'Bahía Inútil y recorrido costero': 'Bahía Inútil and coastal drive',
  'Paisajes únicos en el planeta con oportunidades fotográficas excepcionales.':
    'Unique landscapes on the planet with exceptional photo opportunities.',
  'Inicio del regreso':             'Start of return journey',
  'Llegada a tu alojamiento':       'Arrival at your accommodation',

  // ── ITINERARIO FUERTE BULNES ──
  'Horario flexible':               'Flexible schedule',
  'El primer asentamiento chileno en el Estrecho de Magallanes, fundado en 1843. Historia en estado puro con vistas espectaculares al Estrecho.':
    'The first Chilean settlement on the Strait of Magellan, founded in 1843. Pure history with spectacular views of the Strait.',
  'Mín. 2 personas · Máx. 25 personas': 'Min. 2 people · Max. 25 people',
  'Traslado privado':               'Private transfer',
  'Guía histórico-cultural':        'Historical-cultural guide',
  'Entrada al parque':              'Park entrance fee',
  'Horario a coordinar según preferencias del grupo.':
    'Schedule to be arranged according to group preferences.',
  'Paradas panorámicas en el Estrecho': 'Panoramic stops at the Strait',
  'Oportunidades fotográficas únicas en la carretera costera.':
    'Unique photo opportunities on the coastal road.',
  'Reconstrucción histórica del fuerte original. Relatos del Chile del siglo XIX.':
    'Historical reconstruction of the original fort. Stories of 19th century Chile.',
  'Vuelta a la ciudad con paradas opcionales': 'Return to the city with optional stops',
  'Flexible':                       'Flexible',
  'En ruta':                        'En route',
  'Llegada':                        'Arrival',
  'Regreso':                        'Return',

  // ── ITINERARIO RESERVA MAGALLANES ──
  'Senderos entre bosques de lenga y coigüe con panorama del Estrecho. Naturaleza a 15 minutos del centro de Punta Arenas.':
    'Trails through lenga and coigüe forests with views of the Strait. Nature 15 minutes from downtown Punta Arenas.',
  'Guía naturalista':               'Naturalist guide',
  'Entrada a la reserva':           'Reserve entrance fee',
  'Alimentación y bebidas':         'Food and drinks',
  'Explicación de flora y fauna':   'Flora and fauna explanation',
  'Lenga, coigüe, zorros, cóndores. Contexto ecológico del bosque austral.':
    'Lenga, coigüe, foxes, condors. Ecological context of the southern forest.',
  'Mirador panorámico 360°':        '360° panoramic viewpoint',
  'Vista de Punta Arenas, el Estrecho y Tierra del Fuego en días despejados.':
    'Views of Punta Arenas, the Strait and Tierra del Fuego on clear days.',
  'Bajada por sendero alternativo': 'Descent via alternative trail',
  'Con posibilidad de paradas para fotografía.': 'With possible stops for photography.',
  'Cumbre':                         'Summit',

  // ── ITINERARIO PINGÜINO REY ──
  'La colonia de pingüinos rey más austral del mundo, ubicada en Tierra del Fuego. Un espectáculo exclusivo que pocos viajeros en el mundo tienen el privilegio de presenciar.':
    'The world\'s southernmost king penguin colony, located in Tierra del Fuego. An exclusive spectacle that few travelers in the world have the privilege of witnessing.',
  'Consultar':                      'Check',
  'precio':                         'price',
  'Requiere reserva anticipada':    'Advance booking required',
  'Disponibilidad limitada por temporada': 'Limited seasonal availability',
  'Consultar disponibilidad':       'Check availability',
  'Traslado completo':              'Full transfer',
  'Entrada al parque privado':      'Private park entrance fee',
  'Salida muy temprana por la distancia a la colonia.':
    'Very early departure due to distance to the colony.',
  'Cruce a Tierra del Fuego':       'Crossing to Tierra del Fuego',
  'Por el ferry Melinka o Punta Delgada.': 'Via the Melinka ferry or Punta Delgada.',
  'Parque con colonia de Pingüino Rey': 'Park with King Penguin colony',
  'La colonia más austral del mundo. Observación con guía.':
    'The world\'s southernmost colony. Guided observation.',
  'Tarde':                          'Afternoon',

  // ── ITINERARIO FARO SAN ISIDRO ──
  'Uno de los faros más remotos del mundo. Paisajes únicos al final de la Ruta Y-71, con el Estrecho de Magallanes en todo su esplendor.':
    'One of the world\'s most remote lighthouses. Unique landscapes at the end of Route Y-71, with the Strait of Magellan in all its splendor.',
  'Guía con contexto histórico':    'Guide with historical context',
  'Entrada si aplica':              'Entrance fee if applicable',
  'Ruta costera con paradas panorámicas': 'Coastal route with panoramic stops',
  'Vistas sobre el canal Señoret y el Estrecho.': 'Views over the Señoret channel and the Strait.',
  'Historia del faro, relatos de náufragos, fotografía única.':
    'Lighthouse history, shipwreck stories, unique photography.',
  'Vuelta por ruta alternativa':    'Return via alternative route',

  // ── ITINERARIO PALI AIKE ──
  'Sitio arqueológico de fama mundial. Los primeros vestigios humanos en la Patagonia, con más de 11.000 años de historia en un paisaje de estepa volcánica incomparable.':
    'World-famous archaeological site. The first human traces in Patagonia, with over 11,000 years of history in an incomparable volcanic steppe landscape.',
  'Reserva anticipada requerida':   'Advance booking required',
  'Guía arqueológico-cultural':     'Archaeological-cultural guide',
  'Salida temprana — el sitio está a ~200 km.':
    'Early departure — the site is ~200 km away.',
  'Estepa magallánica y fauna':     'Magellanic steppe and wildlife',
  'Guanacos, ñandúes, zorros y cóndores.': 'Guanacos, rheas, foxes and condors.',
  'Cueva con 11.000+ años de historia humana.':
    'Cave with 11,000+ years of human history.',

  // ── QUÉ TRAER ──
  'Prepárate bien':                 'Be well prepared',
  'City Tour (medio día)':          'City Tour (half day)',
  'Tours Full Day / Naturaleza':    'Full Day / Nature Tours',
  'Tours de Fauna Silvestre':       'Wildlife Tours',
  'Consejos esenciales':            'Essential tips',
  'En Patagonia el clima cambia en minutos. Estas listas te aseguran una experiencia cómoda y segura.':
    'In Patagonia the weather changes in minutes. These lists ensure a comfortable and safe experience.',
  'Chaqueta abrigada — el viento es impredecible incluso en verano':
    'Warm jacket — the wind is unpredictable even in summer',
  'Zapatos cómodos con suela antideslizante': 'Comfortable shoes with non-slip soles',
  'Efectivo CLP para artesanías y entradas': 'CLP cash for crafts and entrance fees',
  'Cámara o teléfono con batería cargada': 'Camera or phone with charged battery',
  'Ropa en capas: polar + chaqueta impermeable': 'Layered clothing: fleece + waterproof jacket',
  'Zapatos impermeables o botas de trekking': 'Waterproof shoes or trekking boots',
  'Snacks y botella de agua de 1+ litro': 'Snacks and 1+ liter water bottle',
  'Lentes de sol y bloqueador (el sur quema)': 'Sunglasses and sunscreen (the southern sun burns)',
  'Binoculares (no incluidos en el tour)': 'Binoculars (not included in the tour)',
  'Capa de lluvia compacta':        'Compact rain jacket',
  'Actitud tranquila: el silencio acerca más a los animales':
    'Calm attitude: silence brings you closer to the animals',
  'Botiquín básico personal':       'Basic personal first aid kit',
  '"En Patagonia, si no te gusta el clima, espera 5 minutos." Siempre lleva abrigo extra.':
    '"In Patagonia, if you don\'t like the weather, wait 5 minutes." Always bring an extra layer.',
  'La mayoría de tours son aptos para niños y adultos mayores.':
    'Most tours are suitable for children and older adults.',
  'Recogida a domicilio — solo estar listo a la hora acordada.':
    'Hotel pickup — just be ready at the agreed time.',
  'Dudas de último momento: escríbele a Daniel por WhatsApp.':
    'Last-minute questions: message Daniel on WhatsApp.',

  // ── CUÁNDO IR ──
  'Planifica tu viaje':             'Plan your trip',
  'momento para':                   'time to',
  'venir':                          'visit',
  'Punta Arenas tiene algo especial en cada estación. Saber cuándo venir cambia toda la experiencia.':
    'Punta Arenas has something special every season. Knowing when to come changes the whole experience.',
  'Temporada alta. Días de hasta 18 hrs de luz, pingüinos en crianza, clima más cálido (8–15°C).':
    'High season. Days up to 18 hrs of daylight, breeding penguins, warmer weather (8–15°C).',
  'Bosques de lenga en rojos y dorados. Menos turistas, precios bajos, colores espectaculares.':
    'Lenga forests in reds and golds. Fewer tourists, lower prices, spectacular colors.',
  'Invierno austral. Paisajes nevados únicos, pocos turistas. Ciudad con encanto especial.':
    'Austral winter. Unique snowy landscapes, few tourists. City with special charm.',
  'Primavera. Los pingüinos vuelven, flores silvestres y clima progresivamente mejor.':
    'Spring. Penguins return, wildflowers and progressively better weather.',
  '✓ Pingüinos, ballenas, fulldays':  '✓ Penguins, whales, full days',
  '✓ Naturaleza, fotografía':         '✓ Nature, photography',
  '✓ City tour, historia':            '✓ City tour, history',
  '✓ Fauna, aventura, tours completos': '✓ Wildlife, adventure, full tours',

  // ── GUÍAS / EXPERTOS ──
  'Conoce a nuestros':              'Meet our',
  'expertos':                       'experts',
  'El equipo local que te acompañará en el fin del mundo':
    'The local team that will accompany you at the end of the world',
  'Guía Especialista en Trekking':  'Trekking Specialist Guide',
  'Experto en Fuerte Bulnes, historia regional y rutas de senderismo austral.':
    'Expert in Fuerte Bulnes, regional history and southern trekking routes.',
  'Próximo Guía':                   'Coming Soon',
  'Especialista en Fauna Marina':   'Marine Wildlife Specialist',
  'Navegación al Estrecho de Magallanes y avistamiento de pingüinos en Isla Magdalena.':
    'Navigation on the Strait of Magellan and penguin watching at Isla Magdalena.',

  // ── CÓMO LLEGAR ──
  'Planifica tu llegada':           'Plan your arrival',
  'Punta Arenas queda en el extremo sur del mundo, pero llegar es más sencillo de lo que parece.':
    'Punta Arenas is at the far south of the world, but getting here is easier than it seems.',
  'En avión desde Santiago':        'By plane from Santiago',
  'LATAM y Sky tienen vuelos directos diarios desde Santiago (SCL) al Aeropuerto Carlos Ibáñez (PUQ). Vuelo de aprox. 3h 30min.':
    'LATAM and Sky have daily direct flights from Santiago (SCL) to Carlos Ibáñez Airport (PUQ). Flight approx. 3h 30min.',
  'En ferry desde Puerto Montt':    'By ferry from Puerto Montt',
  'Navimag opera una ruta de 4 días por los fiordos patagónicos desde Puerto Montt hasta Puerto Natales. Una experiencia en sí misma.':
    'Navimag operates a 4-day route through the Patagonian fjords from Puerto Montt to Puerto Natales. An experience in itself.',
  'Desde Argentina':                'From Argentina',
  'Conexión en bus desde Río Gallegos en ~4 horas, cruzando el Estrecho en ferry. También hay vuelos desde Buenos Aires vía El Calafate.':
    'Bus connection from Río Gallegos in ~4 hours, crossing the Strait by ferry. There are also flights from Buenos Aires via El Calafate.',
  'Todos los tours incluyen recogida a domicilio desde tu hotel':
    'All tours include hotel pickup from your accommodation',
  'Consulta disponibilidad de traslados especiales desde el aeropuerto al reservar por WhatsApp.':
    'Ask about special airport transfers when booking via WhatsApp.',

  // ── CONFIANZA ──
  'Por qué elegirnos':              'Why choose us',
  'Lo que nos':                     'What sets us',
  'destaca':                        'apart',
  'Cancela o reprograma':           'Cancel or reschedule',
  'Si el clima no permite el tour: reembolso completo o reprogramación sin costo. Siempre.':
    'If weather prevents the tour: full refund or free rescheduling. Always.',
  'Guía certificado oficialmente':  'Officially certified guide',
  'Licencia de guía oficial de Magallanes, primeros auxilios de alta montaña y habilitación Torres del Paine.':
    'Official Magallanes guide license, high mountain first aid and Torres del Paine certification.',
  'Cada tour se adapta a ti. No existe el "paquete estándar". Grupos de 2 a 25 personas.':
    'Every tour adapts to you. There is no "standard package". Groups of 2 to 25 people.',
  'Te busco en tu hotel. Sin puntos de encuentro desconocidos ni preocupaciones de transporte.':
    'I pick you up at your hotel. No unknown meeting points or transport worries.',
  'Con formación en fotografía turística. Todo lo que ves en esta web son fotos reales de los tours.':
    'With tourism photography training. Everything you see on this website is real tour photography.',
  '10+ destinos incluyendo lugares que los buses turísticos nunca visitan.':
    '10+ destinations including places tourist buses never visit.',
  'Excelente calificación en TripAdvisor': 'Excellent rating on TripAdvisor',
  'Reseñas verificadas de viajeros reales': 'Verified reviews from real travelers',
  'Busca "Daniel Guía Punta Arenas"': 'Search "Daniel Guía Punta Arenas"',
  'en TripAdvisor':                 'on TripAdvisor',

  // ── FAQ ──
  'Preguntas frecuentes':           'Frequently asked questions',
  'Todo lo que necesitas':          'Everything you need',
  'antes de reservar':              'before booking',
  '¿Qué pasa si llueve o el clima es malo? ':
    'What happens if it rains or the weather is bad? ',
  'En Patagonia el clima es parte de la aventura, pero si las condiciones hacen el tour imposible, tienes dos opciones: reembolso completo o reprogramación sin costo. Tú eliges.':
    'In Patagonia weather is part of the adventure, but if conditions make the tour impossible, you have two options: full refund or free rescheduling. You choose.',
  '¿Cuántas personas pueden ir? ':  'How many people can join? ',
  'Mínimo 2 y máximo 25 personas. Si viajas solo, consulta por WhatsApp — a veces hay plazas en grupos ya formados.':
    'Minimum 2 and maximum 25 people. If traveling alone, ask via WhatsApp — sometimes there are spots in existing groups.',
  '¿El seguro médico está incluido? ': 'Is medical insurance included? ',
  'No. Se recomienda contratar un seguro de viaje con cobertura de aventura. Daniel cuenta con primeros auxilios de alta montaña y protocolos de emergencia.':
    'No. Travel insurance with adventure coverage is recommended. Daniel has high mountain first aid training and emergency protocols.',
  '¿Dónde es el punto de encuentro? ': 'Where is the meeting point? ',
  '¡En la puerta de tu hotel! Recogida a domicilio en todos los tours. Para tours marítimos se coordina el punto de embarque al confirmar.':
    'At your hotel door! Hotel pickup for all tours. For maritime tours the boarding point is coordinated upon confirmation.',
  '¿Son aptos para niños y adultos mayores? ': 'Are tours suitable for children and seniors? ',
  'La mayoría sí. Cada tour muestra su nivel de dificultad (Bajo/Medio/Alto) en las tarjetas y el itinerario. El City Tour y tours marítimos son para todas las edades.':
    'Most are. Each tour shows its difficulty level (Low/Medium/High) on the cards and itinerary. The City Tour and maritime tours are for all ages.',
  '¿Cómo se reserva y se paga? ':   'How do I book and pay? ',
  'Todo por WhatsApp — simple y directo. Me escribes con el tour, fecha y número de personas. Coordino disponibilidad y los métodos de pago. Sin formularios complicados.':
    'All via WhatsApp — simple and direct. Message me with the tour, date and number of people. I\'ll coordinate availability and payment methods. No complicated forms.',
  '¿En qué idiomas se dan los tours? ': 'In what languages are tours given? ',
  'Principalmente en español. Para grupos angloparlantes hay disponibilidad limitada en inglés — consulta al reservar.':
    'Mainly in Spanish. For English-speaking groups there is limited availability in English — ask when booking.',
  '¿Qué diferencia a Daniel de las grandes agencias? ': 'What sets Daniel apart from big agencies? ',
  'Experiencia 100% personalizada. Con una agencia grande eres uno más. Aquí el tour se adapta a tus intereses, tu ritmo y tus preguntas. Accedes a lugares y relatos que los buses turísticos jamás te mostrarán.':
    '100% personalized experience. With a big agency you\'re just another tourist. Here the tour adapts to your interests, your pace and your questions. You access places and stories that tourist buses will never show you.',

  // ── TESTIMONIOS ──
  'Viajeros que ya estuvieron aquí': 'Travelers who have been here',
  'Lo que dicen quienes':           'What those who',
  'vivieron':                       'lived',
  'la experiencia':                 'the experience say',
  'via TripAdvisor':                'via TripAdvisor',
  'via WhatsApp':                   'via WhatsApp',
  'Viajeros atendidos':             'Travelers served',
  'Destinos únicos':                'Unique destinations',
  'Años de experiencia':            'Years of experience',
  'Satisfacción garantizada':       'Guaranteed satisfaction',

  // ── SECCIÓN RESERVA FINAL ──
  '¿Listo para partir?':            'Ready to go?',
  'Sin formularios, sin esperas. Escríbeme por WhatsApp y en minutos coordinamos tu experiencia en la Patagonia.':
    'No forms, no waiting. Message me on WhatsApp and in minutes we\'ll coordinate your Patagonia experience.',
  'Escribir por WhatsApp':          'Message on WhatsApp',
  'WhatsApp directo':               'Direct WhatsApp',
  'Idiomas disponibles':            'Available languages',
  'Respuesta rápida':               'Quick response',
  'Normalmente en horas':           'Usually within hours',

  // ── FOOTER ──
  'Punta Arenas, Región de Magallanes, Chile': 'Punta Arenas, Magallanes Region, Chile',
  '© 2025 Road\'sEnd Patagonia. Todos los derechos reservados.':
    '© 2025 Road\'sEnd Patagonia. All rights reserved.',
};

let currentLang = 'es';

function toggleLang() {
  currentLang = currentLang === 'es' ? 'en' : 'es';

  // Cambia textos traducibles (excluye translate="no")
  translateNodes(document.body);

  // Cambia indicador del botón
  document.querySelectorAll('.lang-es').forEach(el => el.style.display = currentLang === 'es' ? '' : 'none');
  document.querySelectorAll('.lang-en').forEach(el => el.style.display = currentLang === 'en' ? '' : 'none');

  // Cambia lang del html para accesibilidad y SEO
  document.documentElement.lang = currentLang;
}

function translateNodes(root) {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        // Excluye nodos dentro de translate="no" o script/style
        let parent = node.parentElement;
        while (parent) {
          if (parent.getAttribute('translate') === 'no') return NodeFilter.FILTER_REJECT;
          if (['SCRIPT','STYLE','CODE','PRE'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
          parent = parent.parentElement;
        }
        return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    }
  );

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach(node => {
    const text = node.textContent;
    if (currentLang === 'en') {
      // ES → EN
      for (const [es, en] of Object.entries(translations)) {
        if (text.includes(es)) {
          node.textContent = text.replace(es, en);
          return;
        }
      }
    } else {
      // EN → ES
      for (const [es, en] of Object.entries(translations)) {
        if (text.includes(en)) {
          node.textContent = text.replace(en, es);
          return;
        }
      }
    }
  });
}