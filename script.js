/* ========================= script.js ========================= */
// Устанавливаем текущий год в подвале
const yel = document.getElementById('year');
if (yEl) {
  yEl.textContent = new Date().getFullYear();
}

// Плавный скролл по клику в меню
for (const a of document.querySelectorAll('.menu a[href^="#"]')) {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Подсветка активного пункта меню при скролле
window.addEventListener('scroll', () => {
  const top = scrollY + 80;
  document.querySelectorAll('.menu a').forEach(link => {
    const id = link.getAttribute('href');
    const section = id && document.querySelector(id);
    if (section &&
        section.offsetTop <= top &&
        section.offsetTop + section.offsetHeight > top) {
      document.querySelectorAll('.menu a').forEach(x => x.classList.remove('active'));
      link.classList.add('active');
    }
  });
});
/* ========================= script.js ========================= */
// Год в подвале
const yEl=document.getElementById('year'); if(yEl) yEl.textContent=new Date().getFullYear();
// Плавный скролл по меню и активное состояние
for(const a of document.querySelectorAll('.menu a[href^="#"]')){
  a.addEventListener('click',e=>{const id=a.getAttribute('href');const el=document.querySelector(id);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});}})
}
window.addEventListener('scroll',()=>{const top=scrollY+80;document.querySelectorAll('.menu a').forEach(l=>{const id=l.getAttribute('href');const s=id&&document.querySelector(id);if(s&&s.offsetTop<=top&&s.offsetTop+s.offsetHeight>top){document.querySelectorAll('.menu a').forEach(x=>x.classList.remove('active'));l.classList.add('active')}})})

// Сообщаем CSS, что JS включен
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('#services');
  if (!section) return;

  const title = section.querySelector('.section-title');
  const cards = Array.from(section.querySelectorAll('.services-grid .svc'));

  // Если нет карт — выйти
  if (!cards.length) {
    title && title.classList.add('show');
    return;
  }

  // CSS-қа JS барын хабарлаймыз
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('#services');
  if (!section) return;

  const title = section.querySelector('.section-title');
  const cards = Array.from(section.querySelectorAll('.services-grid .svc'));
  if (!cards.length) { title && title.classList.add('show'); return; }

  // Топтық сценарий: 1-і жеке, сосын топ-топпен 3-тен
  const GROUP_SIZE     = 3;    // топтағы карта саны
  const FIRST_DELAY    = 220;  // 1-картаға дейінгі кідіріс (мс)
  const GROUP_DELAY    = 520;  // топтар арасындағы кідіріс (мс)
  const IN_GROUP_STEP  = 120;  // топ ішіндегі көрші карталар арасындағы кідіріс (мс)

  function runSequence(){
    // Тақырып
    if (title) title.classList.add('show');

    // 1-карта
    if (cards[0]) {
      cards[0].style.setProperty('--stagger', FIRST_DELAY + 'ms');
      cards[0].classList.add('show');
    }

    // Қалғандары: 3-тен топ-топпен
    const rest = cards.slice(1);
    rest.forEach((card, idx) => {
      const groupIndex = Math.floor(idx / GROUP_SIZE);     // 0,1,2...
      const idxInGroup = idx % GROUP_SIZE;                 // 0..2
      const delay = FIRST_DELAY + GROUP_DELAY * (groupIndex + 1) + IN_GROUP_STEP * idxInGroup;
      card.style.setProperty('--stagger', delay + 'ms');
      // таймермен «show» қосу — CSS transition-delay іске қосылады
      setTimeout(() => card.classList.add('show'), delay);
    });
  }

  // Егер секция қазірдің өзінде көрінсе — бірден іске қосамыз
  function isInView(el){
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.75 && r.bottom > 0;
  }

  // IntersectionObserver бар болса — соны қолданамыз
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries, obs) => {
      if (entries.some(e => e.isIntersecting)) {
        runSequence();
        obs.disconnect();
      }
    }, { threshold: 0.25, rootMargin: '0px 0px -10% 0' });

    io.observe(section);

    // Қауіпсіздік: егер секция load кезінде-ақ көрініп тұрса
    if (isInView(section)) {
      runSequence();
      io.disconnect();
    }
  } else {
    // Fallback: IO жоқ болса да, 300мс кейін іске қос
    setTimeout(runSequence, 300);
  }
});





