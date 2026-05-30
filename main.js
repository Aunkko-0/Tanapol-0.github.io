/* ============================================================
   PORTFOLIO — ธนพล ทองประยูร
   main.js
   ============================================================ */

/* ─── 1. CUSTOM CURSOR ───────────────────────────────────── */
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY  + 'px';
});

document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });

/* ─── 2. NAV SCROLL EFFECT ───────────────────────────────── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── 3. MOBILE HAMBURGER ────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.querySelector('.nav__links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

/* ─── 4. INTERSECTION OBSERVER (animate on scroll) ──────── */
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate soft skill bars
      entry.target.querySelectorAll('.soft-bar__fill').forEach(bar => {
        bar.classList.add('animated');
      });
    }
  });
}, observerOptions);

// Observe timeline items and project cards
document.querySelectorAll('[data-animate], .project-card, .timeline__item').forEach(el => {
  observer.observe(el);
});

// Also observe the whole skills section to trigger bars
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
  const skillObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.soft-bar__fill').forEach(bar => {
        bar.classList.add('animated');
      });
    }
  }, { threshold: 0.2 });
  skillObserver.observe(skillsSection);
}

/* ─── 5. SMOOTH ACTIVE NAV LINK ──────────────────────────── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });

  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = 'var(--clr-accent)';
    }
  });
}, { passive: true });

/* ─── 6. STAGGER DELAY FOR PROJECT CARDS ────────────────── */
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.12}s`;
});

document.querySelectorAll('.timeline__item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.15}s`;
});

/* ─── 7. TYPING EFFECT IN HERO ROLE ─────────────────────── */
const roleEl = document.querySelector('.hero__role');
if (roleEl) {
  const text  = 'IT Support / Helpdesk';
  const delay = 800; // wait after page load
  roleEl.textContent = '';

  setTimeout(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        roleEl.textContent = text.slice(0, ++i);
      } else {
        clearInterval(interval);
        // Add the styled slash back
        roleEl.innerHTML = 'IT Support <span class="slash">/</span> Helpdesk';
      }
    }, 45);
  }, delay);
}

/* ─── 8. SKILL PILL HOVER SOUND (visual ripple) ─────────── */
document.querySelectorAll('.skill-pill').forEach(pill => {
  pill.addEventListener('mouseenter', function() {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute; border-radius: 50%;
      width: 80px; height: 80px;
      background: radial-gradient(circle, rgba(0,212,255,0.12), transparent);
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.5s ease, opacity 0.5s ease;
      pointer-events: none; left: 50%; top: 50%;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.transform = 'translate(-50%, -50%) scale(3)';
      ripple.style.opacity   = '0';
    });
    setTimeout(() => ripple.remove(), 500);
  });
});

console.log('✨ Portfolio loaded — ธนพล ทองประยูร');
