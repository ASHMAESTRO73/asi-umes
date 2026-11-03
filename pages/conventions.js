/* ===== CONVENTIONS — Reveal on Scroll ===== */
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
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
  );

  reveals.forEach((el) => observer.observe(el));

  /* Sécurité : tout afficher après 2s */
  setTimeout(() => {
    reveals.forEach((el) => el.classList.add("revealed"));
  }, 2000);

  /* ---------- CARROUSEL ABIDJAN ---------- */
  const abjTrack = document.getElementById("abidjanTrack");
  const abjPrev = document.getElementById("abjPrev");
  const abjNext = document.getElementById("abjNext");
  const abjDotsContainer = document.getElementById("abjDots");

  if (abjTrack && abjDotsContainer) {
    const abjSlides = abjTrack.querySelectorAll(".abidjan-carousel__slide");
    let abjCurrent = 0;
    let abjAuto;

    /* Créer les dots */
    abjSlides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className =
        "abidjan-carousel__dot" +
        (i === 0 ? " abidjan-carousel__dot--active" : "");
      dot.setAttribute("aria-label", "Photo " + (i + 1));
      dot.addEventListener("click", () => {
        abjGoTo(i);
        abjResetAuto();
      });
      abjDotsContainer.appendChild(dot);
    });

    const abjDots = abjDotsContainer.querySelectorAll(".abidjan-carousel__dot");

    function abjGoTo(index) {
      abjCurrent = (index + abjSlides.length) % abjSlides.length;
      abjTrack.style.transform = "translateX(-" + abjCurrent * 100 + "%)";
      abjDots.forEach((d) =>
        d.classList.remove("abidjan-carousel__dot--active"),
      );
      abjDots[abjCurrent].classList.add("abidjan-carousel__dot--active");
    }

    function abjStartAuto() {
      abjAuto = setInterval(() => abjGoTo(abjCurrent + 1), 4000);
    }

    function abjResetAuto() {
      clearInterval(abjAuto);
      abjStartAuto();
    }

    if (abjPrev)
      abjPrev.addEventListener("click", () => {
        abjGoTo(abjCurrent - 1);
        abjResetAuto();
      });
    if (abjNext)
      abjNext.addEventListener("click", () => {
        abjGoTo(abjCurrent + 1);
        abjResetAuto();
      });

    abjStartAuto();
  }
});
