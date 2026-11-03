/* ===== CHAPITRES — Reveal on Scroll ===== */
document.addEventListener("DOMContentLoaded", () => {
  /* --- Liens des chapitres (à compléter plus tard) --- */
  const chapterLinks = {
    benin: "#", // ← Remplacer par https://asi-benin.org
    burkina: "#", // ← Remplacer par https://asi-burkina.org
    civ: "#", // ← Remplacer par https://asi-cotedivoire.org
    niger: "#", // ← Remplacer par https://asi-niger.org
    togo: "#", // ← Remplacer par https://asi-togo.org
  };

  document.querySelectorAll(".chap-card[data-chapitre]").forEach((card) => {
    const key = card.getAttribute("data-chapitre");
    if (chapterLinks[key] && chapterLinks[key] !== "#") {
      card.href = chapterLinks[key];
      card.target = "_blank";
      card.rel = "noopener";
    } else {
      /* Pas encore de lien : on empêche la navigation */
      card.addEventListener("click", (e) => {
        e.preventDefault();
      });
      card.style.cursor = "default";
    }
  });

  /* --- Reveal --- */
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
