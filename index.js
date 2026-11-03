/* ============================================================
   ASI UMES — Page d'accueil (index.js)
   Particules carrées dorées + Compte à rebours Convention 2027
   Version corrigée : countdown autonome (sans dépendance ASI)
   ============================================================ */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* ============================================================
     1. PARTICULES CARRÉES DORÉES (GoldParticles)
     ============================================================ */
  class GoldParticles {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.particles = [];
      this.mouse = { x: null, y: null, radius: 140 };
      this.animationFrameId = null;

      this.colors = [
        "rgba(251, 191, 36, 0.85)",
        "rgba(245, 158, 11, 0.8)",
        "rgba(252, 211, 77, 0.75)",
        "rgba(234, 179, 8, 0.7)",
        "rgba(255, 255, 255, 0.4)",
      ];

      this.resize();
      this.createParticles();
      this.bindEvents();
      this.animate();
    }

    resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
      this.width = rect.width;
      this.height = rect.height;
    }

    createParticles() {
      const area = this.width * this.height;
      const count = Math.min(80, Math.max(30, Math.floor(area / 18000)));
      this.particles = [];
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 4 + 2;
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size,
          baseSize: size,
          speedX: (Math.random() - 0.5) * 0.35,
          speedY: (Math.random() - 0.5) * 0.35,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.012,
          opacity: Math.random() * 0.4 + 0.3,
          pulseSpeed: Math.random() * 0.02 + 0.008,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    }

    bindEvents() {
      let resizeTimer;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.resize();
          this.createParticles();
        }, 200);
      });

      this.canvas.addEventListener("mousemove", (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      });

      this.canvas.addEventListener("mouseleave", () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          cancelAnimationFrame(this.animationFrameId);
        } else {
          this.animate();
        }
      });
    }

    update(p, time) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;
      p.opacity = 0.3 + Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.25;

      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;
      if (p.y < -10) p.y = this.height + 10;
      if (p.y > this.height + 10) p.y = -10;

      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 2;
          p.y += Math.sin(angle) * force * 2;
          p.size = p.baseSize + force * 3;
          p.opacity = Math.min(1, p.opacity + force * 0.35);
        } else {
          p.size += (p.baseSize - p.size) * 0.08;
        }
      } else {
        p.size += (p.baseSize - p.size) * 0.08;
      }
    }

    draw(p) {
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.globalAlpha = p.opacity;
      this.ctx.shadowColor = "rgba(251, 191, 36, 0.5)";
      this.ctx.shadowBlur = 6;
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.ctx.restore();
    }

    drawConnections() {
      const maxDist = 120;
      const len = this.particles.length;
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(251, 191, 36, ${alpha})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
            this.ctx.stroke();
          }
        }
      }
    }

    animate(timestamp = 0) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      for (let i = 0; i < this.particles.length; i++) {
        this.update(this.particles[i], timestamp);
        this.draw(this.particles[i]);
      }
      this.drawConnections();
      this.animationFrameId = requestAnimationFrame((t) => this.animate(t));
    }
  }

  /* ============================================================
     2. COMPTE À REBOURS AUTONOME
        Ne dépend PAS de component-loader.js
        Cible : 14 Mai 2027 00:00:00
     ============================================================ */
  function startCountdown() {
    const container = document.getElementById("heroCountdown");
    if (!container) {
      console.warn("Countdown: élément #heroCountdown introuvable");
      return;
    }

    const $d = container.querySelector("[data-days]");
    const $h = container.querySelector("[data-hours]");
    const $m = container.querySelector("[data-minutes]");
    const $s = container.querySelector("[data-seconds]");

    if (!$d || !$h || !$m || !$s) {
      console.warn("Countdown: attributs data-* manquants");
      return;
    }

    const TARGET = new Date("2027-05-14T00:00:00").getTime();
    const pad = (n) => String(n).padStart(2, "0");

    function tick() {
      const diff = TARGET - Date.now();

      if (diff <= 0) {
        $d.textContent = "00";
        $h.textContent = "00";
        $m.textContent = "00";
        $s.textContent = "00";
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      $d.textContent = pad(days);
      $h.textContent = pad(hours);
      $m.textContent = pad(minutes);

      // Animation tick sur les secondes
      const newSecs = pad(seconds);
      if ($s.textContent !== newSecs) {
        $s.textContent = newSecs;
        $s.classList.add("tick");
        setTimeout(() => $s.classList.remove("tick"), 150);
      }
    }

    // Premier tick immédiat + intervalle toutes les secondes
    tick();
    const timer = setInterval(tick, 1000);
  }

  /* ============================================================
     3. LANCEMENT
     ============================================================ */

  // Particules dorées
  const heroCanvas = document.getElementById("heroCanvas");
  if (heroCanvas) {
    new GoldParticles(heroCanvas);
  }

  // Compte à rebours
  startCountdown();
});

/* ===== REVEAL ON SCROLL ===== */
(function () {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
  );

  reveals.forEach((el) => observer.observe(el));

  /* Sécurité : tout afficher après 2s quoi qu'il arrive */
  setTimeout(() => {
    reveals.forEach((el) => el.classList.add("revealed"));
  }, 2000);

  /* ---------- CARROUSEL HERO ---------- */
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-carousel__dot");
  const prevBtn = document.getElementById("heroPrev");
  const nextBtn = document.getElementById("heroNext");
  let currentSlide = 0;
  let autoPlay;

  function goToSlide(index) {
    slides.forEach((s) => s.classList.remove("hero-slide--active"));
    dots.forEach((d) => d.classList.remove("hero-carousel__dot--active"));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("hero-slide--active");
    dots[currentSlide].classList.add("hero-carousel__dot--active");
  }

  function startAutoPlay() {
    autoPlay = setInterval(() => goToSlide(currentSlide + 1), 6000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlay);
    startAutoPlay();
  }

  if (slides.length > 1) {
    if (prevBtn)
      prevBtn.addEventListener("click", () => {
        goToSlide(currentSlide - 1);
        resetAutoPlay();
      });
    if (nextBtn)
      nextBtn.addEventListener("click", () => {
        goToSlide(currentSlide + 1);
        resetAutoPlay();
      });
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        goToSlide(parseInt(dot.dataset.dot));
        resetAutoPlay();
      });
    });
    startAutoPlay();
  }

  /* ---------- COUNTDOWN CONVENTION 2027 ---------- */
  const targetDate = new Date("2027-05-14T08:00:00").getTime();
  const cdDays = document.getElementById("cdDays");
  const cdHours = document.getElementById("cdHours");
  const cdMins = document.getElementById("cdMins");
  const cdSecs = document.getElementById("cdSecs");

  function updateCountdown() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (cdDays) cdDays.textContent = "0";
      if (cdHours) cdHours.textContent = "00";
      if (cdMins) cdMins.textContent = "00";
      if (cdSecs) cdSecs.textContent = "00";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    if (cdDays) cdDays.textContent = d;
    if (cdHours) cdHours.textContent = String(h).padStart(2, "0");
    if (cdMins) cdMins.textContent = String(m).padStart(2, "0");
    if (cdSecs) cdSecs.textContent = String(s).padStart(2, "0");
  }

  if (cdDays) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
})();
