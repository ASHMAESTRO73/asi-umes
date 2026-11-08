document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;
  const isInPages = path.includes("/pages/");
  const prefix = isInPages ? "../" : "";

  /* ===== 1. CHARGEMENT HEADER + FOOTER ===== */
  async function loadComponent(placeholderId, componentPath) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;
    try {
      const response = await fetch(prefix + componentPath);
      if (!response.ok) throw new Error("Fichier introuvable");
      let html = await response.text();
      html = html.replace(/src="assets\//g, `src="${prefix}assets/`);
      html = html.replace(/href="index\.html"/g, `href="${prefix}index.html"`);
      html = html.replace(/href="pages\//g, `href="${prefix}pages/`);
      placeholder.innerHTML = html;
    } catch (err) {
      console.error(`Erreur chargement ${componentPath}:`, err);
    }
  }

  await loadComponent("header-placeholder", "components/header.html");
  await loadComponent("footer-placeholder", "components/footer.html");

  /* ===== 2. HEADER SCROLL ===== */
  const header = document.querySelector(".header, .site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  /* ===== 3. HAMBURGER MOBILE ===== */
  const hamburger =
    document.getElementById("hamburger") ||
    document.querySelector(".header__hamburger");
  const nav =
    document.getElementById("headerNav") ||
    document.querySelector(".header__nav");
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        nav.classList.remove("active");
      });
    });
  }

  /* ===== 4. ACTIVE LINK ===== */
  const currentPage = path.split("/").pop() || "index.html";
  document
    .querySelectorAll(".header__link, .header__nav-link")
    .forEach((link) => {
      link.classList.remove("header__link--active", "active");
      const href = link.getAttribute("href");
      if (href) {
        const linkPage = href.split("/").pop();
        if (linkPage === currentPage) {
          link.classList.add("header__link--active", "active");
        }
      }
    });

  /* ===== 5. FAVICON SVG "ASI" ===== */
  const faviconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="%23233287"/><text x="16" y="22" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="13" fill="%23DAA520">ASI</text></svg>`;
  let favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) {
    favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/svg+xml";
    document.head.appendChild(favicon);
  }
  favicon.href = "data:image/svg+xml," + faviconSVG;

  /* ===== 6. BACK TO TOP ===== */
  const backBtn = document.getElementById("backToTop");
  if (backBtn) {
    window.addEventListener("scroll", () => {
      backBtn.classList.toggle("visible", window.scrollY > 400);
    });
    backBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* Bannière Cookies */
    const cookieBanner = document.getElementById("cookieBanner");
    const cookieAccept = document.getElementById("cookieAccept");
    if (cookieBanner && cookieAccept) {
      if (localStorage.getItem("asi_cookies") === "accepted") {
        cookieBanner.classList.add("hidden");
      }
      cookieAccept.addEventListener("click", () => {
        localStorage.setItem("asi_cookies", "accepted");
        cookieBanner.classList.add("hidden");
      });
    }
  }
});

/* ============================================
   GOOGLE TRANSLATE — TOGGLE FR / ANG
   ============================================ */
(function () {
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement(
      { pageLanguage: "fr", includedLanguages: "fr,en", autoDisplay: false },
      "google_translate_element",
    );
  };

  var c = document.createElement("div");
  c.id = "google_translate_element";
  c.style.display = "none";
  document.body.appendChild(c);

  var s = document.createElement("script");
  s.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.head.appendChild(s);

  function getLang() {
    return document.cookie.indexOf("googtrans=/fr/en") !== -1 ? "en" : "fr";
  }

  function init() {
    var actions = document.querySelector(".header__actions");
    if (!actions || actions.querySelector(".lang-toggle")) return;

    var donBtn = actions.querySelector(".btn--gold");
    if (!donBtn) return;

    /* Wrapper vertical : bouton don + toggle */
    var col = document.createElement("div");
    col.className = "header__cta-col";
    actions.insertBefore(col, donBtn);
    col.appendChild(donBtn);

    /* Toggle avec VRAIES images de drapeaux */
    var btn = document.createElement("div");
    btn.className = "lang-toggle";
    col.appendChild(btn);

    function update() {
      if (getLang() === "en") {
        btn.innerHTML =
          '<span class="lang-toggle__label">Langues</span><img src="https://flagcdn.com/24x18/fr.png" alt="FR" width="20" height="15"><span class="lang-toggle__label">FR</span>';
        btn.title = "Passer en fran\u00e7ais";
      } else {
        btn.innerHTML =
          '<span class="lang-toggle__label">Langues</span><img src="https://flagcdn.com/24x18/gb.png" alt="ANG" width="20" height="15"><span class="lang-toggle__label">ANG</span>';
        btn.title = "Switch to English";
      }
    }

    update();

    btn.addEventListener("click", function () {
      if (getLang() === "fr") {
        document.cookie = "googtrans=/fr/en;path=/";
      } else {
        document.cookie =
          "googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie =
          "googtrans=;path=/;domain=" +
          location.hostname +
          ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      location.reload();
    });
  }

  /* Supprimer la barre Google Translate dès qu'elle apparaît */
  function killBanner() {
    var banner = document.querySelector(".goog-te-banner-frame");
    if (banner) banner.style.display = "none";
    document.body.style.top = "0";
  }

  var observer = new MutationObserver(function () {
    killBanner();
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });

  setInterval(killBanner, 2000);

  if (document.readyState === "complete") {
    setTimeout(init, 500);
  } else {
    window.addEventListener("load", function () {
      setTimeout(init, 500);
    });
  }
})();
