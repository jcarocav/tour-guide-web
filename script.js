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
  "img/City tour 2.jpg",
  "img/Tierra del Fuego.png",
  "img/Pinguino Rey.jpeg",
  "img/fuerte bulnes.jpeg"
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