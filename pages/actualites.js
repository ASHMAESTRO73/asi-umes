/* ===== ACTUALITÉS — Grille dynamique + Reveal ===== */
document.addEventListener("DOMContentLoaded", () => {
  /* 1. Générer la grille d'articles */
  const grid = document.getElementById("newsGrid");

  if (grid && typeof ARTICLES !== "undefined") {
    let html = "";

    ARTICLES.forEach((article) => {
      const img =
        article.images && article.images.length ? article.images[0] : "";
      const sourceHTML = article.source
        ? "<span>•</span><span>📄 " + article.source + "</span>"
        : "";

      html += '<article class="news-card reveal">';
      html += '  <div class="news-card__media">';
      if (img)
        html +=
          '    <img src="../assets/images/' +
          img +
          '" alt="' +
          article.titre +
          '" loading="lazy">';
      html +=
        '    <span class="news-card__tag news-card__tag--' +
        article.tagColor +
        '">' +
        article.tag +
        "</span>";
      html += "  </div>";
      html += '  <div class="news-card__body">';
      html +=
        '    <div class="news-card__meta"><span>📅 ' +
        article.date +
        "</span>" +
        sourceHTML +
        "</div>";
      html += '    <h2 class="news-card__title">' + article.titre + "</h2>";
      html += '    <p class="news-card__excerpt">' + article.excerpt + "</p>";
      html += "  </div>";
      html += '  <div class="news-card__footer">';
      html +=
        '    <a href="actualite-detail.html?id=' +
        article.id +
        '" class="btn btn--blue news-card__btn">En savoir plus →</a>';
      html += "  </div>";
      html += "</article>";
    });

    /* Carte placeholder "Prochainement" */
    html += '<article class="news-card news-card--premium reveal">';
    html +=
      '  <span class="news-card__tag news-card__tag--premium">Prochainement</span>';
    html += '  <div class="news-card__premium-icon">✨</div>';
    html += "  <h3>Actualité à venir</h3>";
    html +=
      "  <p>Les comptes-rendus des événements à venir et la préparation de la Convention 2027 seront publiés ici.</p>";
    html +=
      '  <div class="news-card__premium-footer"><span>⏱️ Publication imminente</span></div>';
    html += "</article>";

    grid.innerHTML = html;
  }

  /* 2. Reveal on scroll */
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
