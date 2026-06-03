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
  // NAV
  'Tours':                          'Tours',
  'Cuándo ir':                      'When to go',
  'Cómo llegar':                    'How to get here',
  'Confianza':                      'Why us',
  'Reservar':                       'Book now',
  'Por qué elegirme':               'Why choose me',
  'FAQ':                            'FAQ',
  '📲 Reservar ahora':              '📲 Book now',

  // HERO
  'La Patagonia':                   'The Patagonia',
  'auténtica':                      'authentic',
  'te espera':                      'awaits you',
  'Tours de aventura, historia y naturaleza guiados por un experto local certificado. Experiencias únicas, personalizadas y auténticas.':
    'Adventure, history and nature tours guided by a certified local expert. Unique, personalized and authentic experiences.',
  'Reservar por WhatsApp':          'Book via WhatsApp',
  'Ver todos los tours →':          'See all tours →',
  'TripAdvisor':                    'TripAdvisor',
  'Destinos':                       'Destinations',
  'Personas':                       'People',
  'Personalizado':                  'Customized',
  'Guía Oficial':                   'Official Guide',
  'Certificado':                    'Certified',

  // URGENCIA
  'Temporada alta: quedan':         'High season: only',
  'pocas plazas disponibles':       'few spots available',
  'para Diciembre – Febrero':       'for December – February',
  'Consultar disponibilidad →':     'Check availability →',

  // SECCIÓN TOURS
  'Experiencias disponibles':       'Available experiences',
  'Todos los':                      'All',
  'tours':                          'tours',
  'Haz click en cualquier tour para ver su itinerario completo, precio y reserva.':
    'Click on any tour to see its full itinerary, price and booking.',
  'Tour Estrella':                  'Star Tour',
  'Nivel: Bajo':                    'Level: Easy',
  'Nivel: Medio':                   'Level: Moderate',
  'Ver itinerario y precio →':      'See itinerary & price →',
  'A domicilio':                    'Hotel pickup',
  'Full Day':                       'Full Day',
  'Histórico':                      'Historic',
  'Naturaleza':                     'Nature',
  'Wildlife':                       'Wildlife',
  'Reserva anticipada':             'Advance booking',
  'Aventura':                       'Adventure',

  // TOUR NOMBRES Y DESCRIPCIONES
  'Historia, arquitectura y cultura de Punta Arenas con fechas especiales del año.':
    'History, architecture and culture of Punta Arenas with special dates of the year.',
  'Pingüineras, Bahía Inútil y almuerzo local. El tour más épico de la región.':
    'Penguin colonies, Bahía Inútil and local lunch. The most epic tour in the region.',
  'El primer asentamiento chileno del Estrecho de Magallanes. Historia del siglo XIX.':
    'The first Chilean settlement on the Strait of Magellan. 19th century history.',
  'Bosques de lenga con panorama del Estrecho. Naturaleza virgen a 15 min del centro.':
    'Lenga forests with views of the Strait. Virgin nature 15 min from the center.',
  'La colonia más austral del mundo. Un espectáculo que pocos viajeros presencian.':
    'The world\'s southernmost colony. A spectacle few travelers ever witness.',
  'Uno de los faros más remotos del mundo. Paisajes únicos en la Ruta Y-71.':
    'One of the world\'s most remote lighthouses. Unique landscapes on Route Y-71.',

  // SECCIÓN QUÉ TRAER
  'Prepárate bien':                 'Be prepared',
  '¿Qué':                           'What to',
  'traer':                          'bring',
  'al tour?':                       'on tour?',
  'En Patagonia el clima cambia en minutos. Estas listas te aseguran una experiencia cómoda y segura.':
    'In Patagonia the weather changes in minutes. These lists ensure a comfortable and safe experience.',

  // CUÁNDO IR
  'Planifica tu viaje':             'Plan your trip',
  '¿Cuándo es el mejor':            'When is the best',
  'momento para':                   'time to',
  'venir':                          'visit',
  'Punta Arenas tiene algo especial en cada estación. Saber cuándo venir cambia toda la experiencia.':
    'Punta Arenas has something special in every season. Knowing when to come changes the whole experience.',
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

  // TESTIMONIOS
  'Viajeros que ya estuvieron aquí': 'Travelers who have been here',
  'Lo que dicen quienes':            'What those who',
  'vivieron':                        'lived',
  'la experiencia':                  'the experience say',
  'via TripAdvisor':                 'via TripAdvisor',
  'via WhatsApp':                    'via WhatsApp',
  'Viajeros atendidos':              'Travelers served',
  'Destinos únicos':                 'Unique destinations',
  'Años de experiencia':             'Years of experience',
  'Satisfacción garantizada':        'Guaranteed satisfaction',

  // CONFIANZA
  'Por qué elegirnos':              'Why choose us',
  'Lo que nos':                     'What sets us',
  'destaca':                        'apart',
  'Cancela o reprograma':           'Cancel or reschedule',
  'Si el clima no permite el tour: reembolso completo o reprogramación sin costo. Siempre.':
    'If weather prevents the tour: full refund or free rescheduling. Always.',
  'Guía certificado oficialmente':  'Officially certified guide',
  '100% personalizado':             '100% personalized',
  'Recogida a domicilio':           'Hotel pickup',
  'Fotos propias de alta calidad':  'High quality original photos',
  'Rutas fuera de lo común':        'Off the beaten path',

  // FAQ
  'Preguntas frecuentes':           'Frequently asked questions',
  'Todo lo que necesitas':          'Everything you need',
  'saber':                          'to know',
  'antes de reservar':              'before booking',

  // RESERVA
  '¿Listo para partir?':            'Ready to go?',
  'Reserva tu tour':                'Book your tour',
  'ahora':                          'now',
  'Sin formularios, sin esperas. Escríbeme por WhatsApp y en minutos coordinamos tu experiencia en la Patagonia.':
    'No forms, no waiting. Message me on WhatsApp and in minutes we\'ll coordinate your Patagonia experience.',
  'Escribir por WhatsApp':          'Message on WhatsApp',
  'WhatsApp directo':               'Direct WhatsApp',
  'Idiomas disponibles':            'Available languages',
  'Respuesta rápida':               'Quick response',
  'Normalmente en horas':           'Usually within hours',

  // FOOTER
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