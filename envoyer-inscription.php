<?php
/* ============================================
   ASI UMES — Inscription Convention 2027
   Envoie l'inscription à contact@asi-umes.org
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
$pays         = trim(strip_tags($_POST['pays']         ?? ''));
$chapitre     = trim(strip_tags($_POST['chapitre']     ?? ''));
$statut       = trim(strip_tags($_POST['statut']       ?? ''));
$alimentation = trim(strip_tags($_POST['alimentation'] ?? ''));
$hebergement  = trim(strip_tags($_POST['hebergement']  ?? ''));

// Options (checkboxes multiples)
$options = isset($_POST['options']) ? array_map('strip_tags', $_POST['options']) : [];

// 3. Vérifier les champs obligatoires
if (empty($nom) || empty($prenoms) || empty($email) || empty($telephone) || empty($pays)) {
    header('Location: pages/inscription-convention-2027.html?erreur=champs');
    exit;
}

// 4. Vérifier que l'email est valide
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: pages/inscription-convention-2027.html?erreur=email');
    exit;
}

// 5. Construire l'email
$destinataire = 'contact@asi-umes.org';
$objet        = '[INSCRIPTION CONVENTION 2027] ' . $prenoms . ' ' . $nom;

$corps  = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$corps .= "  NOUVELLE INSCRIPTION — CONVENTION 2027\n";
$corps .= "  14–17 Mai 2027 | Abidjan, Côte d'Ivoire\n";
$corps .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$corps .= "👤 INFORMATIONS PERSONNELLES\n";
$corps .= "─────────────────────────────\n";
$corps .= "Nom        : " . $nom . "\n";
$corps .= "Prénoms    : " . $prenoms . "\n";
$corps .= "Profession : " . $profession . "\n";
$corps .= "Email      : " . $email . "\n";
$corps .= "Téléphone  : " . $telephone . "\n";
$corps .= "Pays       : " . $pays . "\n";
$corps .= "Chapitre   : " . $chapitre . "\n";
$corps .= "Statut     : " . $statut . "\n\n";

$corps .= "🏨 LOGISTIQUE\n";
$corps .= "─────────────────────────────\n";
$corps .= "Régime alimentaire : " . $alimentation . "\n";
$corps .= "Hébergement        : " . $hebergement . "\n\n";

if (!empty($options)) {
    $corps .= "🎯 OPTIONS SUPPLÉMENTAIRES\n";
    $corps .= "─────────────────────────────\n";
    foreach ($options as $opt) {
        $corps .= "  ✅ " . $opt . "\n";
    }
    $corps .= "\n";
} else {
    $corps .= "🎯 OPTIONS SUPPLÉMENTAIRES : Aucune\n\n";
}

$corps .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$corps .= "Inscription reçue le " . date('d/m/Y à H:i') . "\n";

$headers  = "From: Site ASI UMES <noreply@asi-umes.org>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// 6. Envoyer
$envoi = mail($destinataire, $objet, $corps, $headers);

// 7. Rediriger
if ($envoi) {
    header('Location: pages/merci-inscription.html');
} else {
    header('Location: pages/inscription-convention-2027.html?erreur=envoi');
}
exit;
?>