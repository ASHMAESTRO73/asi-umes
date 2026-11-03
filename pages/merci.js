/* ============================================
   PAGES DE CONFIRMATION — ASI UMES
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
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
    { threshold: 0.1 },
  );

  reveals.forEach((el) => observer.observe(el));

  setTimeout(() => {
    reveals.forEach((el) => el.classList.add("revealed"));
  }, 2000);
});
