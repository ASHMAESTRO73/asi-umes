/* ===== PAIEMENT — CONVENTION ASI UMES 2027 ===== */
document.addEventListener("DOMContentLoaded", () => {

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
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
    setTimeout(() => {
      reveals.forEach((el) => el.classList.add("revealed"));
    }, 2000);
  }

  /* --- Copier le numéro de compte au clic --- */
  const highlightValues = document.querySelectorAll(".pay-card__value--highlight");
  highlightValues.forEach((el) => {
    el.style.cursor = "pointer";
    el.title = "Cliquer pour copier";
    el.addEventListener("click", () => {
      const text = el.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        const original = el.textContent;
        el.textContent = "✅ Copié !";
        el.style.color = "#16a34a";
        setTimeout(() => {
          el.textContent = original;
          el.style.color = "";
        }, 2000);
      });
    });
  });
});