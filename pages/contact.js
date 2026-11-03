/* ===== CONTACT — Formulaire + Reveal ===== */
document.addEventListener("DOMContentLoaded", () => {
  /* --- Formulaire --- */
  const form = document.getElementById("contactForm");
  const success = document.getElementById("contactSuccess");
  const resetBtn = document.getElementById("contactReset");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.style.display = "none";
      if (success) success.style.display = "block";
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (success) success.style.display = "none";
      if (form) {
        form.style.display = "flex";
        form.reset();
      }
    });
  }

  /* --- Reveal on scroll --- */
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

  setTimeout(() => {
    reveals.forEach((el) => el.classList.add("revealed"));
  }, 2000);
});
