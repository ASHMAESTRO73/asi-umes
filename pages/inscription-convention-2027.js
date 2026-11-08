/* ===== INSCRIPTION CONVENTION 2027 — ASI UMES ===== */
document.addEventListener("DOMContentLoaded", () => {
  /* ========================================
     1. COUNTDOWN (30 Mars 2027)
     ======================================== */
  const target = new Date("2027-03-30T23:59:59").getTime();
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");

  function updateCountdown() {
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    daysEl.textContent = String(d).padStart(2, "0");
    hoursEl.textContent = String(h).padStart(2, "0");
    minsEl.textContent = String(m).padStart(2, "0");
    secsEl.textContent = String(s).padStart(2, "0");
  }

  if (daysEl) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ========================================
     2. STATUT → CHAPITRE / PAYS (conditionnel)
     ======================================== */
  const statutSelect = document.getElementById("inscStatut");
  const chapitreGroup = document.getElementById("chapitreGroup");
  const chapitreSelect = document.getElementById("inscChapitre");
  const paysGroup = document.getElementById("paysGroup");
  const paysInput = document.getElementById("inscPays");

  function toggleStatutFields() {
    if (!statutSelect) return;
    const val = statutSelect.value;

    if (val === "Membre ASI") {
      // Afficher chapitre, masquer pays
      if (chapitreGroup) chapitreGroup.style.display = "flex";
      if (chapitreSelect) chapitreSelect.setAttribute("required", "required");
      if (paysGroup) paysGroup.style.display = "none";
      if (paysInput) {
        paysInput.removeAttribute("required");
        paysInput.value = "";
      }
    } else if (val !== "") {
      // Afficher pays, masquer chapitre
      if (paysGroup) paysGroup.style.display = "flex";
      if (paysInput) paysInput.setAttribute("required", "required");
      if (chapitreGroup) chapitreGroup.style.display = "none";
      if (chapitreSelect) {
        chapitreSelect.removeAttribute("required");
        chapitreSelect.value = "";
      }
    } else {
      // Aucun statut choisi → masquer les deux
      if (chapitreGroup) chapitreGroup.style.display = "none";
      if (paysGroup) paysGroup.style.display = "none";
      if (chapitreSelect) {
        chapitreSelect.removeAttribute("required");
        chapitreSelect.value = "";
      }
      if (paysInput) {
        paysInput.removeAttribute("required");
        paysInput.value = "";
      }
    }
  }

  if (statutSelect) {
    statutSelect.addEventListener("change", toggleStatutFields);
    toggleStatutFields();
  }

  /* ========================================
     3. CALCUL AUTOMATIQUE DU MONTANT
     ======================================== */
  const INSCRIPTION = 45000;
  const NUITS = 3;

  const hebergementSelect = document.getElementById("inscHebergement");
  const recapHebergement = document.getElementById("recapHebergement");
  const recapHebergementVal = document.getElementById("recapHebergementVal");
  const recapOptions = document.getElementById("recapOptions");
  const recapOptionsVal = document.getElementById("recapOptionsVal");
  const recapTotal = document.getElementById("recapTotal");
  const recapPayNow = document.getElementById("recapPayNow");
  const recapPayLater = document.getElementById("recapPayLater");

  function formatPrice(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " F";
  }

  function recalc() {
    // Prix hébergement par nuit
    let prixNuit = 0;
    if (hebergementSelect && hebergementSelect.selectedOptions[0]) {
      prixNuit =
        parseInt(hebergementSelect.selectedOptions[0].dataset.price) || 0;
    }

    const hebergementTotal = prixNuit * NUITS;

    // Options
    let optionsTotal = 0;
    const optionChecks = document.querySelectorAll(
      'input[data-calc="option"]:checked',
    );
    optionChecks.forEach((cb) => {
      optionsTotal += parseInt(cb.dataset.price) || 0;
    });

    // Totaux
    const total = INSCRIPTION + hebergementTotal + optionsTotal;
    const payNow = INSCRIPTION + prixNuit;
    const payLater = prixNuit * (NUITS - 1) + optionsTotal;

    // === Mise à jour SIDEBAR (en haut) ===
    if (recapHebergement) {
      if (prixNuit > 0) {
        recapHebergement.style.display = "flex";
        if (recapHebergementVal)
          recapHebergementVal.textContent = formatPrice(hebergementTotal);
      } else {
        recapHebergement.style.display = "none";
      }
    }

    if (recapOptions) {
      if (optionsTotal > 0) {
        recapOptions.style.display = "flex";
        if (recapOptionsVal)
          recapOptionsVal.textContent = formatPrice(optionsTotal);
      } else {
        recapOptions.style.display = "none";
      }
    }

    if (recapTotal) recapTotal.textContent = formatPrice(total);
    if (recapPayNow) recapPayNow.textContent = formatPrice(payNow);
    if (recapPayLater) recapPayLater.textContent = formatPrice(payLater);

    // === Mise à jour RÉCAP FINAL (en bas, avant le bouton) ===
    const finalHebergement = document.getElementById("finalHebergement");
    const finalHebergementVal = document.getElementById("finalHebergementVal");
    const finalOptions = document.getElementById("finalOptions");
    const finalOptionsVal = document.getElementById("finalOptionsVal");
    const finalTotal = document.getElementById("finalTotal");
    const finalPayNow = document.getElementById("finalPayNow");
    const finalPayLater = document.getElementById("finalPayLater");

    if (finalHebergement) {
      if (prixNuit > 0) {
        finalHebergement.style.display = "flex";
        if (finalHebergementVal)
          finalHebergementVal.textContent = formatPrice(hebergementTotal);
      } else {
        finalHebergement.style.display = "none";
      }
    }

    if (finalOptions) {
      if (optionsTotal > 0) {
        finalOptions.style.display = "flex";
        if (finalOptionsVal)
          finalOptionsVal.textContent = formatPrice(optionsTotal);
      } else {
        finalOptions.style.display = "none";
      }
    }

    if (finalTotal) finalTotal.textContent = formatPrice(total);
    if (finalPayNow) finalPayNow.textContent = formatPrice(payNow);
    if (finalPayLater) finalPayLater.textContent = formatPrice(payLater);
  }

  // Écouter les changements
  if (hebergementSelect) {
    hebergementSelect.addEventListener("change", recalc);
  }

  const allOptionChecks = document.querySelectorAll(
    'input[data-calc="option"]',
  );
  allOptionChecks.forEach((cb) => {
    cb.addEventListener("change", recalc);
  });

  // Calcul initial
  recalc();

  /* ========================================
     4. INJECTER MONTANTS AVANT SOUMISSION
     ======================================== */
  const form = document.getElementById("inscriptionForm");

  if (form) {
    form.addEventListener("submit", () => {
      // Récupérer les montants calculés
      let prixNuit = 0;
      if (hebergementSelect && hebergementSelect.selectedOptions[0]) {
        prixNuit =
          parseInt(hebergementSelect.selectedOptions[0].dataset.price) || 0;
      }
      let optionsTotal = 0;
      document
        .querySelectorAll('input[data-calc="option"]:checked')
        .forEach((cb) => {
          optionsTotal += parseInt(cb.dataset.price) || 0;
        });
      const total = INSCRIPTION + prixNuit * NUITS + optionsTotal;
      const payNow = INSCRIPTION + prixNuit;
      const payLater = prixNuit * (NUITS - 1) + optionsTotal;

      // Créer des champs cachés pour le PHP
      const hiddenFields = {
        montant_inscription: INSCRIPTION,
        montant_hebergement_nuit: prixNuit,
        montant_hebergement_total: prixNuit * NUITS,
        montant_options: optionsTotal,
        montant_total: total,
        montant_a_payer: payNow,
        montant_reste: payLater,
      };

      for (const [name, value] of Object.entries(hiddenFields)) {
        let input = form.querySelector('input[name="' + name + '"]');
        if (!input) {
          input = document.createElement("input");
          input.type = "hidden";
          input.name = name;
          form.appendChild(input);
        }
        input.value = value;
      }
    });
  }

  /* ========================================
     5. REVEAL ON SCROLL
     ======================================== */
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
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
    );
    reveals.forEach((el) => observer.observe(el));
    setTimeout(() => {
      reveals.forEach((el) => el.classList.add("revealed"));
    }, 2000);
  }
});
