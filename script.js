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
const tabMap={'city':'City Tour','fuego':'Tierra del Fuego','fuerte':'Fuerte Bulnes','reserva-mag':'Res. Magallanes','magdalena':'Isla Magdalena','rey':'Pingüino Rey','faro':'Faro San Isidro','pali':'Pali Aike','ballenas':'Ballenas'};
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