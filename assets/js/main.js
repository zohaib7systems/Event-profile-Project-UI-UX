
(function(){
  const select = (q, all=false) => all ? document.querySelectorAll(q) : document.querySelector(q);

  // Navbar shrink
  const nav = select('#mainNav');
  const onScroll = () => {
    if(window.scrollY > 10) nav.classList.add('navbar-shrink');
    else nav.classList.remove('navbar-shrink');
  };
  onScroll();
  window.addEventListener('scroll', onScroll);

  // Active nav links
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    if(a.getAttribute('href') === path) a.classList.add('active');
  });

  // CountUp on intersection
  const counters = document.querySelectorAll('.countup');
  let counted = false;
  const runCounters = () => {
    counters.forEach(el => {
      const target = +el.getAttribute('data-target');
      const duration = 1200;
      const startTime = performance.now();
      const step = (now) => {
        const p = Math.min((now - startTime)/duration, 1);
        el.textContent = Math.floor(p * target);
        if(p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting && !counted){ counted = true; runCounters(); }
    });
  }, {threshold: 0.2});
  counters.forEach(c => io.observe(c));

  // Newsletter faux submit
  const news = document.getElementById('newsletterForm');
  if(news){
    news.addEventListener('submit', (e)=>{
      e.preventDefault();
      alert('Thanks for subscribing!');
      e.target.reset();
    });
  }

  // Contact form validation + toast
  const contact = document.getElementById('contactForm');
  if(contact){
    contact.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(!contact.checkValidity()){
        e.stopPropagation();
        contact.classList.add('was-validated');
        return;
      }
      const toastEl = document.getElementById('formToast');
      const t = new bootstrap.Toast(toastEl);
      t.show();
      contact.reset();
      contact.classList.remove('was-validated');
    });
  }

  // Footer year
  const y = document.getElementById('year');
  if(y){ y.textContent = new Date().getFullYear(); }

  // AOS init
  if(window.AOS){ AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic'}); }
})();
