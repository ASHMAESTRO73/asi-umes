/* ============================================
   DONNÉES DES ACTUALITÉS — ASI UMES
   Pour ajouter un article : copiez un bloc { }
   et collez-le dans le tableau ARTICLES.
   ============================================ */

const ARTICLES = [
  /* ---- ARTICLE 1 : Rapport Annuel 2025 ---- */
  {
    id: "rapport-2025",
    tag: "Rapport Annuel",
    tagColor: "blue",
    date: "Année 2025",
    source: "ASI-OCI UMES",
    titre: "Rapport Annuel 2025 : Bilan & Nouveaux Ministères",
    excerpt:
      "Découvrez les avancées majeures de l'ASI-OCI UMES en 2025, le bilan d'activité et la création de ministères de soutien affiliés.",
    images: ["actualite1.jpeg", "actualite2.jpeg"],
    badge: "Rapport Officiel ASI-OCI UMES",
    lieu: "Siège UMES — Lomé, Togo",
    sections: [
      {
        titre: "1. Contexte & Mandat de la Coordination",
        texte:
          "Désignée en août 2023 lors du comité de mi-année de l'Union Mission de l'Est du Sahel (UMES), la coordination ASI-OCI s'est vu confier pour mission de faire connaître l'ASI aux membres laïcs, cadres et entrepreneurs, et d'installer des bureaux exécutifs fonctionnels dans tous les champs de l'Union.\n\nNotons qu'au Togo, le bureau exécutif de l'ASI a été porté sur les fonts baptismaux le 27 février 2022. Une convention s'est également tenue à Aného du 30 mars au 1er avril 2024, réunissant des délégués de Côte d'Ivoire, la Présidente d'ASI Europe et l'ancien Président d'ASI France-Belgique.",
      },
      {
        titre: "2. Ministères de Soutien Affiliés en 2025",
        texte:
          "Malgré les défis de regroupement des entrepreneurs, deux ministères majeurs ont été structurés et affiliés avec succès cette année :",
        ministeres: [
          {
            nom: "Chorale « La Voix de l'Espérance »",
            desc: "Existe depuis plus de 24 ans. Lors de son assemblée générale de mars 2025, elle est devenue le premier ministère officiel affilié à l'ASI par les chants. Ses objectifs : sanctification des membres, animation des offices religieux, évangélisation par le chant et concerts grand public.",
          },
          {
            nom: "Ministère de Production de Documents (MPDE) BARUCH",
            desc: "Regroupe d'anciens colporteurs et laïcs. Ce ministère a déjà traduit 4 pamphlets de l'anglais vers le français et l'Ewé. L'ASI a mobilisé plus de 500 000 FCFA de fonds locaux pour l'impression de 12 000 pamphlets en français et 4 000 en Ewé destinés aux sorties missionnaires.",
          },
        ],
      },
      {
        titre: "3. Prochaines Étapes & Mobilisation",
        texte:
          "L'objectif principal demeure la mise en place de bureaux exécutifs ASI dans les 6 autres champs de l'Union Mission de l'Est du Sahel afin de continuer à unir les ressources spirituelles, financières et humaines des laïcs pour la proclamation de l'Évangile.",
        highlight: true,
      },
    ],
  },

  /* ---- ARTICLE 2 : Convention Aného 2024 ---- */
  {
    id: "convention-2024",
    tag: "Convention Passée",
    tagColor: "gold",
    date: "30 Mars – 1er Avril 2024",
    source: "",
    titre: "Rapport de la Convention ASI 2024 à Aného (Togo)",
    excerpt:
      "Retour sur la convention d'Aného ayant réuni la Présidente d'ASI Europe, des délégués de Côte d'Ivoire et les cadres du Togo.",
    images: ["actualite3.jpg", "actualite4.jpg"],
    badge: "Rapport Officiel de Convention",
    lieu: "Aného, Togo",
    sections: [
      {
        titre: "1. Contexte & Objectifs de la Convention",
        texte:
          "Suite au vote du comité de l'Union Mission de l'Est du Sahel (UMES) et à la mise en place du bureau exécutif de l'ASI au Togo le 27 février 2022, une convention régionale a été organisée dans la ville historique d'Aného du 30 mars au 1er avril 2024.\n\nCette rencontre avait pour objectif principal de sensibiliser, d'informer et de remobiliser les entrepreneurs, cadres et professionnels adventistes sur la vision et la mission de l'ASI dans notre sous-région.",
      },
      {
        titre: "2. Une Délégation Internationale de Haut Niveau",
        texte:
          "La convention d'Aného a réuni d'importants dirigeants et délégués laïcs internationaux et sous-régionaux :",
        delegues: [
          "Présidente d'ASI Europe — Présence d'honneur et soutien international.",
          "Ancien Président ASI France-Belgique — Partage d'expériences.",
          "Délégués de Côte d'Ivoire — Représentation sous-régionale.",
          "Dirigeants Éclésiastiques — Présidents de l'UMES et de la Fédération du Togo.",
        ],
      },
      {
        titre: "3. Impact & Résultats de l'Événement",
        texte:
          "Cette convention a permis de poser les bases de la structuration des laïcs au Togo et d'amorcer l'élan d'affiliation de plusieurs ministères de soutien qui s'est concrétisé tout au long de l'année 2025.",
        highlight: true,
      },
    ],
  },

  /* ---- AJOUTER UN NOUVEL ARTICLE ICI ---- */
  /*
  {
    id: "mon-nouvel-article",
    tag: "Catégorie",
    tagColor: "blue",
    date: "Date",
    source: "Source",
    titre: "Titre de l'article",
    excerpt: "Résumé court...",
    images: ["photo1.jpg"],
    badge: "Badge",
    lieu: "Lieu",
    sections: [
      { titre: "1. Introduction", texte: "Contenu..." }
    ]
  }
  */
];
