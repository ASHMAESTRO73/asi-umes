/* ============================================================
   QUI SOMMES-NOUS — Scroll reveal animations
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // --- Scroll Reveal avec IntersectionObserver ---
  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((el) => observer.observe(el));
});
