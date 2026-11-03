/* ===== INSCRIPTION CONVENTION 2027 ===== */
document.addEventListener("DOMContentLoaded", () => {
  /* --- Countdown inscription (30 Mars 2027) --- */
  const target = new Date("2027-03-30T23:59:59").getTime();
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");

  function updateCountdown() {
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    daysEl.textContent = String(d).padStart(2, "0");
    hoursEl.textContent = String(h).padStart(2, "0");
    minsEl.textContent = String(m).padStart(2, "0");
    secsEl.textContent = String(s).padStart(2, "0");
  }

  if (daysEl) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* --- Formulaire : soumission --- */
  const form = document.getElementById("inscriptionForm");
  const formSection = document.querySelector(".insc-form-section");
  const successSection = document.getElementById("inscSuccess");
  const backBtn = document.getElementById("backToForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (formSection) formSection.style.display = "none";
      if (successSection) successSection.style.display = "flex";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (successSection) successSection.style.display = "none";
      if (formSection) formSection.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* --- Reveal on scroll --- */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
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
    setTimeout(() => {
      reveals.forEach((el) => el.classList.add("revealed"));
    }, 2000);
  }
});
