/**
 * NARE VIGNESH - PORTFOLIO INTERACTION ENGINE (2026 AI ENGINEER)
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initNavbarScrollSpy();
  initMobileMenu();
  initCertificateModal();
  initContactForm();
  initCardTilt();
  initCodeEditor();
});

/* ==========================================================================
   0. CODE EDITOR RENDERING (FORMAT-IMMUNE & RESPONSIVE)
   ========================================================================== */
function initCodeEditor() {
  const editorBody = document.querySelector('.editor-body');
  if (!editorBody) return;

  const codeLines = [
    '<span class="token-keyword">const</span> <span class="token-variable">developer</span> = {',
    '  <span class="token-property">name</span>: <span class="token-string">"Nare Vignesh"</span>,',
    '  <span class="token-property">role</span>: <span class="token-string">"AI Engineer"</span>,',
    '  <span class="token-property">secondaryRole</span>: <span class="token-string">"Full Stack Developer"</span>,',
    '  <span class="token-property">focus</span>: [',
    '    <span class="token-string">"Generative AI"</span>, <span class="token-string">"RAG Systems"</span>,',
    '    <span class="token-string">"AI Agents"</span>, <span class="token-string">"Machine Learning"</span>,',
    '    <span class="token-string">"Full Stack Development"</span>',
    '  ],',
    '  <span class="token-property">stack</span>: [',
    '    <span class="token-string">"Python"</span>, <span class="token-string">"LangChain"</span>, <span class="token-string">"LangGraph"</span>,',
    '    <span class="token-string">"FastAPI"</span>, <span class="token-string">"Django"</span>, <span class="token-string">"React"</span>,',
    '    <span class="token-string">"MySQL"</span>, <span class="token-string">"MongoDB"</span>',
    '  ],',
    '  <span class="token-property">goal</span>: <span class="token-string">"Building intelligent and scalable real-world applications."</span>',
    '};'
  ];

  editorBody.innerHTML = codeLines.map((content, index) => {
    const lineNum = String(index + 1).padStart(2, '0');
    const isLast = index === codeLines.length - 1;
    const cursor = isLast ? '<span class="cursor-blink"></span>' : '';
    return `<div class="code-line"><span class="line-number">${lineNum}</span>${content}${cursor}</div>`;
  }).join('');
}

/* ==========================================================================
   1. NEURAL PARTICLE CANVAS
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
  const maxDistance = 140;

  const mouse = {
    x: null,
    y: null,
    radius: 120
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.color = Math.random() > 0.4 ? '#38bdf8' : '#818cf8';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const directionX = (dx / dist) * force * 2.5;
          const directionY = (dy / dist) * force * 2.5;
          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Connect particles with neural network lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const opacity = (1 - dist / maxDistance) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. NAVBAR SCROLL & ACTIVE LINK SPY
   ========================================================================== */
function initNavbarScrollSpy() {
  const navContainer = document.querySelector('.nav-container');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Scrolled class for blur & elevation
    if (navContainer) {
      if (scrollY > 40) {
        navContainer.classList.add('scrolled');
      } else {
        navContainer.classList.remove('scrolled');
      }
    }

    // Active Section Spy
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('nav-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileDrawer) return;

  toggleBtn.addEventListener('click', () => {
    mobileDrawer.classList.toggle('open');
    const isOpen = mobileDrawer.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen
      ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
      : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!mobileDrawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      mobileDrawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    }
  });
}

/* ==========================================================================
   4. CERTIFICATE LIGHTBOX MODAL WITH ZOOM & PAN
   ========================================================================== */
function initCertificateModal() {
  const modal = document.getElementById('cert-modal');
  const openBtns = document.querySelectorAll('.open-cert-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const zoomInBtn = document.getElementById('zoom-in-btn');
  const zoomOutBtn = document.getElementById('zoom-out-btn');
  const zoomResetBtn = document.getElementById('zoom-reset-btn');
  const zoomContainer = document.getElementById('cert-zoom-container');

  if (!modal || !zoomContainer) return;

  let zoomLevel = 1;
  const zoomStep = 0.25;
  const maxZoom = 3;
  const minZoom = 0.75;

  function updateZoom() {
    zoomContainer.style.transform = `scale(${zoomLevel})`;
  }

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    zoomLevel = 1;
    updateZoom();
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach((btn) => btn.addEventListener('click', openModal));

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      if (zoomLevel < maxZoom) {
        zoomLevel += zoomStep;
        updateZoom();
      }
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      if (zoomLevel > minZoom) {
        zoomLevel -= zoomStep;
        updateZoom();
      }
    });
  }

  if (zoomResetBtn) {
    zoomResetBtn.addEventListener('click', () => {
      zoomLevel = 1;
      updateZoom();
    });
  }

  // Wheel zoom inside modal
  zoomContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0 && zoomLevel < maxZoom) {
      zoomLevel = Math.min(maxZoom, zoomLevel + 0.15);
    } else if (e.deltaY > 0 && zoomLevel > minZoom) {
      zoomLevel = Math.max(minZoom, zoomLevel - 0.15);
    }
    updateZoom();
  });
}

/* ==========================================================================
   5. CONTACT FORM & QUICK ACTIONS
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notice');

  window.showToast = function (message) {
    if (!toast) return;
    toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  };

  window.copyToClipboard = function (text, label) {
    navigator.clipboard.writeText(text).then(() => {
      window.showToast(`${label} copied to clipboard!`);
    }).catch(() => {
      window.showToast(`Selected: ${text}`);
    });
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject')?.value.trim() || 'AI / Full Stack Opportunity';
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        window.showToast('Please fill out all fields.');
        return;
      }

      // Safe mailto fallback
      const mailtoUrl = `mailto:vigneshnaidu022@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Contact] ${subject} from ${name}`
      )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      window.location.href = mailtoUrl;
      window.showToast('Opening default email client...');
      form.reset();
    });
  }
}

/* ==========================================================================
   6. 3D TILT INTERACTION FOR CARDS
   ========================================================================== */
function initCardTilt() {
  const tiltCards = document.querySelectorAll('.project-card, .skill-card, .timeline-card');
  if (window.innerWidth < 768) return; // Disable on touch/small screens

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}
