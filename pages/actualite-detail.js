/* ===== DÉTAIL ACTUALITÉ — Moteur dynamique ===== */
document.addEventListener("DOMContentLoaded", () => {
  /* 1. Lire l'ID dans l'URL */
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get("id");

  if (!articleId) {
    showError();
    return;
  }

  /* 2. Chercher l'article dans les données */
  const article = ARTICLES.find((a) => a.id === articleId);

  if (!article) {
    showError();
    return;
  }

  /* 3. Remplir le banner */
  document.title = article.titre + " — ASI UMES";
  document.getElementById("artBadge").textContent = article.badge;
  document.getElementById("artTitle").textContent = article.titre;

  let metaHTML = "<span>📅 " + article.date + "</span>";
  if (article.lieu)
    metaHTML += "<span>•</span><span>📍 " + article.lieu + "</span>";
  document.getElementById("artMeta").innerHTML = metaHTML;

  /* 4. Remplir la galerie */
  const gallery = document.getElementById("artGallery");
  if (article.images && article.images.length) {
    article.images.forEach((img) => {
      gallery.innerHTML +=
        '<div class="art-gallery__item"><img src="../assets/images/' +
        img +
        '" alt="' +
        article.titre +
        '" loading="lazy"></div>';
    });
  } else {
    gallery.style.display = "none";
  }

  /* 5. Remplir le corps */
  const body = document.getElementById("artBody");
  let bodyHTML = "";

  article.sections.forEach((section) => {
    const highlightClass = section.highlight ? " art-section--highlight" : "";
    bodyHTML += '<div class="art-section' + highlightClass + '">';
    bodyHTML += "<h2>" + section.titre + "</h2>";

    /* Paragraphes (séparés par \n\n) */
    const paragraphs = section.texte.split("\n\n");
    paragraphs.forEach((p) => {
      bodyHTML += "<p>" + p + "</p>";
    });

    /* Ministères (si présents) */
    if (section.ministeres) {
      section.ministeres.forEach((m) => {
        bodyHTML += '<div class="art-ministry">';
        bodyHTML += "<h3>✅ " + m.nom + "</h3>";
        bodyHTML += "<p>" + m.desc + "</p>";
        bodyHTML += "</div>";
      });
    }

    /* Délégués (si présents) */
    if (section.delegues) {
      bodyHTML += '<div class="art-delegues">';
      section.delegues.forEach((d) => {
        bodyHTML +=
          '<div class="art-delegue"><span class="art-delegue__check">✅</span><span>' +
          d +
          "</span></div>";
      });
      bodyHTML += "</div>";
    }

    bodyHTML += "</div>";
  });

  body.innerHTML = bodyHTML;
});

function showError() {
  document.querySelector(".art-hero").style.display = "none";
  document.querySelector(".art-content:not(#artError)").style.display = "none";
  document.getElementById("artError").style.display = "block";
}
