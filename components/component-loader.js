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
