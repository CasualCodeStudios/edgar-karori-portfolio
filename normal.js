gsap.registerPlugin(ScrollTrigger);

// ===== CURSOR =====
const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1 });
});

// Smooth ring follow
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  gsap.set(cursorRing, { x: ringX, y: ringY });
  requestAnimationFrame(animateRing);
}
animateRing();

// Cursor hover states
document.querySelectorAll("a, button, .service-card, .testi-card").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(2.5)";
    cursorRing.style.transform = "translate(-50%, -50%) scale(1.6)";
    cursorRing.style.borderColor = "rgba(56, 189, 248, 0.8)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursorRing.style.transform = "translate(-50%, -50%) scale(1)";
    cursorRing.style.borderColor = "rgba(56, 189, 248, 0.5)";
  });
});

// ===== TYPING EFFECT =====
const texts = [
  "Edgar Karori",
  "a Physiotherapist",
  "a Rugby Player",
  "a Proud Kenyan",
  "a 'Humble' Gen-Z",
  "out-going AF..."
];

let index = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing");

function typeEffect() {
  if (!typingElement) return;
  const currentText = texts[index];

  if (isDeleting) { charIndex--; }
  else { charIndex++; }

  typingElement.textContent = currentText.substring(0, charIndex);

  let speed = isDeleting ? 60 : 90;

  if (!isDeleting && charIndex === currentText.length) {
    speed = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % texts.length;
    speed = 500;
  }

  setTimeout(typeEffect, speed);
}
typeEffect();

// ===== HERO ENTRANCE ANIMATION =====
gsap.timeline({ delay: 0.2 })
  .from(".hero-eyebrow", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" })
  .from(".heroH1", { y: 50, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.4")
  .from(".hero-tagline", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
  .from(".typing-row", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
  .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
  .from(".hero-stats", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
  .from(".img-main", { x: 60, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
  .from(".img-secondary", { x: -40, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.7")
  .from(".hero-float-card", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.5")
  .from(".scroll-hint", { opacity: 0, duration: 0.6 }, "-=0.2");

// ===== PARALLAX ON HERO IMAGES =====
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const imgMain = document.querySelector(".img-main");
  const imgSec = document.querySelector(".img-secondary");
  if (imgMain) imgMain.style.transform = `translateY(${scrolled * 0.05}px)`;
  if (imgSec) imgSec.style.transform = `translateY(${scrolled * 0.08}px)`;
});

// ===== SERVICE CARDS TILT =====
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    card.style.transform = `translateY(-8px) rotateX(${y}deg) rotateY(${x}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
  });
});

// ===== TESTIMONIAL CARD HOVER =====
document.querySelectorAll('.testi-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card.querySelector('.testi-quote'), { opacity: 0.45, duration: 0.3 });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card.querySelector('.testi-quote'), { opacity: 0.2, duration: 0.3 });
  });
});


// Sidebar
  function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.querySelector('.sidebar-overlay').classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  }
  function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.querySelector('.sidebar-overlay').classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  // Modal
  function openModal() {
    const overlay = document.getElementById('modalOverlay');
    const panel = document.getElementById('modalPanel');
    overlay.classList.add('open');
    document.body.classList.add('no-scroll');
    setTimeout(() => panel.classList.add('visible'), 10);
  }
  function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    const panel = document.getElementById('modalPanel');
    panel.classList.remove('visible');
    setTimeout(() => { overlay.classList.remove('open'); document.body.classList.remove('no-scroll'); }, 400);
  }
  function handleOverlayClick(e) {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  }

  // Form submit
  function submitForm() {
    const btn = document.querySelector('.submit-btn');
    btn.textContent = '✓ Request Sent!';
    btn.style.background = '#38bdf8';
    setTimeout(() => { closeModal(); btn.textContent = 'Confirm Appointment →'; btn.style.background = ''; }, 2500);
  }

  // Header scroll
  window.addEventListener('scroll', () => {
    const header = document.getElementById('mainHeader');
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  // GSAP Scroll Animations
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.reveal-up').forEach(el => {
    gsap.from(el, { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
  });
  document.querySelectorAll('.reveal-left').forEach(el => {
    gsap.from(el, { x: -80, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%' } });
  });
  document.querySelectorAll('.reveal-right').forEach(el => {
    gsap.from(el, { x: 80, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%' } });
  });
  document.querySelectorAll('.reveal-card').forEach(el => {
    const delay = parseInt(el.dataset.delay || 0) / 1000;
    gsap.from(el, { y: 50, opacity: 0, duration: 0.9, delay, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });

