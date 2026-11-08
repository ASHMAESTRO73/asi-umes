<?php
/* ============================================
   ASI UMES — Inscription Convention 2027
   Envoie 2 emails :
     1. À contact@asi-umes.org (détails complets)
     2. Au participant (confirmation + montant)
   ============================================ */

// 1. Vérifier que c'est bien un envoi POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html');
    exit;
}

// 2. Récupérer et nettoyer les champs
$nom          = trim(strip_tags($_POST['nom']          ?? ''));
$prenoms      = trim(strip_tags($_POST['prenoms']      ?? ''));
$profession   = trim(strip_tags($_POST['profession']   ?? ''));
$email        = trim(strip_tags($_POST['email']        ?? ''));
$telephone    = trim(strip_tags($_POST['telephone']    ?? ''));
$statut       = trim(strip_tags($_POST['statut']       ?? ''));
$chapitre     = trim(strip_tags($_POST['chapitre']     ?? ''));
$pays         = trim(strip_tags($_POST['pays']         ?? ''));
$alimentation = trim(strip_tags($_POST['alimentation'] ?? ''));
$hebergement  = trim(strip_tags($_POST['hebergement']  ?? ''));
$tshirt       = trim(strip_tags($_POST['tshirt']       ?? ''));

// Montants calculés par le JS
$montant_inscription      = intval($_POST['montant_inscription']      ?? 45000);
$montant_hebergement_nuit = intval($_POST['montant_hebergement_nuit'] ?? 0);
$montant_hebergement_total= intval($_POST['montant_hebergement_total']?? 0);
$montant_options          = intval($_POST['montant_options']          ?? 0);
$montant_total            = intval($_POST['montant_total']            ?? 45000);
$montant_a_payer          = intval($_POST['montant_a_payer']          ?? 45000);
$montant_reste            = intval($_POST['montant_reste']            ?? 0);

// Options (checkboxes multiples)
$options = isset($_POST['options']) ? array_map('strip_tags', $_POST['options']) : [];

// 3. Vérifier les champs obligatoires
if (empty($nom) || empty($prenoms) || empty($email) || empty($telephone)) {
    header('Location: pages/inscription-convention-2027.html?erreur=champs');
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: pages/inscription-convention-2027.html?erreur=email');
    exit;
}

// 4. Formater les montants
function fmt($n) {
    return number_format($n, 0, ',', ' ');
}

// 5. Construire la liste des options
$options_texte = '';
if (!empty($options)) {
    foreach ($options as $opt) {
        $options_texte .= "  ✅ " . $opt . "\n";
    }
} else {
    $options_texte = "  Aucune option supplémentaire\n";
}

// =============================================
// EMAIL 1 : À ASI UMES (contact@asi-umes.org)
// =============================================
$destinataire = 'contact@asi-umes.org';
$objet_admin  = '[INSCRIPTION CONVENTION 2027] ' . $prenoms . ' ' . $nom;

$corps_admin  = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$corps_admin .= "  NOUVELLE INSCRIPTION — CONVENTION 2027\n";
$corps_admin .= "  14–17 Mai 2027 | Abidjan, Côte d'Ivoire\n";
$corps_admin .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$corps_admin .= "👤 INFORMATIONS PERSONNELLES\n";
$corps_admin .= "─────────────────────────────\n";
$corps_admin .= "Nom        : " . $nom . "\n";
$corps_admin .= "Prénoms    : " . $prenoms . "\n";
$corps_admin .= "Profession : " . $profession . "\n";
$corps_admin .= "Email      : " . $email . "\n";
$corps_admin .= "Téléphone  : " . $telephone . "\n";
$corps_admin .= "Statut     : " . $statut . "\n";
if (!empty($chapitre)) {
    $corps_admin .= "Chapitre   : " . $chapitre . "\n";
}
if (!empty($pays)) {
    $corps_admin .= "Pays       : " . $pays . "\n";
}
$corps_admin .= "\n";

$corps_admin .= "🏨 LOGISTIQUE\n";
$corps_admin .= "─────────────────────────────\n";
$corps_admin .= "Régime alimentaire : " . $alimentation . "\n";
$corps_admin .= "Hébergement        : " . $hebergement . "\n";
$corps_admin .= "T-shirt            : " . $tshirt . "\n\n";

$corps_admin .= "🎯 OPTIONS SUPPLÉMENTAIRES\n";
$corps_admin .= "─────────────────────────────\n";
$corps_admin .= $options_texte . "\n";

$corps_admin .= "💰 MONTANTS\n";
$corps_admin .= "─────────────────────────────\n";
$corps_admin .= "Inscription          : " . fmt($montant_inscription) . " FCFA\n";
if ($montant_hebergement_nuit > 0) {
    $corps_admin .= "Hébergement (3 nuits): " . fmt($montant_hebergement_total) . " FCFA\n";
    $corps_admin .= "  (soit " . fmt($montant_hebergement_nuit) . " FCFA / nuit)\n";
}
if ($montant_options > 0) {
    $corps_admin .= "Options              : " . fmt($montant_options) . " FCFA\n";
}
$corps_admin .= "─────────────────────────────\n";
$corps_admin .= "TOTAL                : " . fmt($montant_total) . " FCFA\n";
$corps_admin .= "À PAYER MAINTENANT   : " . fmt($montant_a_payer) . " FCFA\n";
$corps_admin .= "RESTE (avant 30/04)  : " . fmt($montant_reste) . " FCFA\n\n";

$corps_admin .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$corps_admin .= "Inscription reçue le " . date('d/m/Y à H:i') . "\n";

$headers_admin  = "From: Site ASI UMES <noreply@asi-umes.org>\r\n";
$headers_admin .= "Reply-To: " . $email . "\r\n";
$headers_admin .= "Content-Type: text/plain; charset=UTF-8\r\n";

$envoi_admin = mail($destinataire, $objet_admin, $corps_admin, $headers_admin);

// =============================================
// EMAIL 2 : AU PARTICIPANT (confirmation)
// =============================================
$objet_participant = 'Confirmation de votre inscription — Convention ASI UMES 2027';

$corps_participant  = "Bonjour " . $prenoms . " " . $nom . ",\n\n";
$corps_participant .= "Nous avons bien reçu votre inscription pour la Grande\n";
$corps_participant .= "Convention ASI UMES 2027. Merci pour votre confiance !\n\n";

$corps_participant .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$corps_participant .= "  RÉCAPITULATIF DE VOTRE INSCRIPTION\n";
$corps_participant .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$corps_participant .= "📅 Dates : 14 – 17 Mai 2027\n";
$corps_participant .= "📍 Lieu  : Hôtel Prunel, Jacqueville – Abidjan\n\n";

$corps_participant .= "👤 VOS INFORMATIONS\n";
$corps_participant .= "─────────────────────────────\n";
$corps_participant .= "Nom complet : " . $prenoms . " " . $nom . "\n";
$corps_participant .= "Email       : " . $email . "\n";
$corps_participant .= "Téléphone   : " . $telephone . "\n";
$corps_participant .= "Statut      : " . $statut . "\n";
if (!empty($chapitre)) {
    $corps_participant .= "Chapitre    : " . $chapitre . "\n";
}
if (!empty($pays)) {
    $corps_participant .= "Pays        : " . $pays . "\n";
}
$corps_participant .= "T-shirt     : " . $tshirt . "\n\n";

$corps_participant .= "🏨 HÉBERGEMENT (3 nuits)\n";
$corps_participant .= "─────────────────────────────\n";
$corps_participant .= "Chambre : " . $hebergement . "\n";
if ($montant_hebergement_nuit > 0) {
    $corps_participant .= "Tarif   : " . fmt($montant_hebergement_nuit) . " FCFA / nuit\n";
    $corps_participant .= "Total   : " . fmt($montant_hebergement_total) . " FCFA\n";
} else {
    $corps_participant .= "Hébergement autonome (non chiffré)\n";
}
$corps_participant .= "\n";

$corps_participant .= "🎯 OPTIONS SUPPLÉMENTAIRES\n";
$corps_participant .= "─────────────────────────────\n";
$corps_participant .= $options_texte . "\n";

$corps_participant .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$corps_participant .= "  💰 MONTANT TOTAL : " . fmt($montant_total) . " FCFA\n";
$corps_participant .= "     (≈ " . round($montant_total * 68 / 45000) . " EUR / ";
$corps_participant .= round($montant_total * 75 / 45000) . " USD)\n";
$corps_participant .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$corps_participant .= "⚠️ MODALITÉS DE PAIEMENT IMPORTANTES :\n\n";
$corps_participant .= "1️⃣  POUR VALIDER VOTRE INSCRIPTION :\n";
$corps_participant .= "   Vous devez verser MAINTENANT :\n";
$corps_participant .= "   → " . fmt($montant_a_payer) . " FCFA\n";
$corps_participant .= "   (Frais d'inscription + 1ère nuitée d'hébergement)\n\n";
$corps_participant .= "2️⃣  LE RESTE À PAYER :\n";
$corps_participant .= "   → " . fmt($montant_reste) . " FCFA\n";
$corps_participant .= "   À verser au plus tard le 30 Avril 2027\n";
$corps_participant .= "   (2 semaines avant le début de la convention)\n\n";

$corps_participant .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
$corps_participant .= "Pour toute question, contactez-nous :\n";
$corps_participant .= "📧 contact@asi-umes.org\n";
$corps_participant .= "📱 WhatsApp : +228 99 25 13 58\n\n";
$corps_participant .= "Au plaisir de vous accueillir en Mai 2027 !\n\n";
$corps_participant .= "Fraternellement,\n";
$corps_participant .= "L'équipe ASI UMES\n";

$headers_participant  = "From: ASI UMES <contact@asi-umes.org>\r\n";
$headers_participant .= "Reply-To: contact@asi-umes.org\r\n";
$headers_participant .= "Content-Type: text/plain; charset=UTF-8\r\n";

$envoi_participant = mail($email, $objet_participant, $corps_participant, $headers_participant);

// =============================================
// REDIRECTION
// =============================================
if ($envoi_admin) {
    header('Location: pages/merci-inscription.html');
} else {
    header('Location: pages/inscription-convention-2027.html?erreur=envoi');
}
exit;
?>