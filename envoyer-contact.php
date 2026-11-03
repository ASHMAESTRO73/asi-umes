<?php
/* ============================================
   ASI UMES — Formulaire de Contact
   Envoie le message à contact@asi-umes.org
   ============================================ */

// 1. Vérifier que c'est bien un envoi POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html');
    exit;
}

// 2. Récupérer et nettoyer les champs
$nom     = trim(strip_tags($_POST['name']    ?? ''));
$email   = trim(strip_tags($_POST['email']   ?? ''));
$sujet   = trim(strip_tags($_POST['sujet']   ?? ''));
$message = trim(strip_tags($_POST['message'] ?? ''));

// 3. Vérifier que tout est rempli
if (empty($nom) || empty($email) || empty($sujet) || empty($message)) {
    header('Location: pages/contact.html?erreur=champs');
    exit;
}

// 4. Vérifier que l'email est valide
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: pages/contact.html?erreur=email');
    exit;
}

// 5. Construire l'email
$destinataire = 'contact@asi-umes.org';
$objet        = '[Site ASI UMES] ' . $sujet;

$corps  = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$corps .= "  NOUVEAU MESSAGE — SITE ASI UMES\n";
$corps .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
$corps .= "Nom    : " . $nom . "\n";
$corps .= "Email  : " . $email . "\n";
$corps .= "Sujet  : " . $sujet . "\n\n";
$corps .= "Message :\n" . $message . "\n\n";
$corps .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$corps .= "Envoyé le " . date('d/m/Y à H:i') . "\n";

$headers  = "From: " . $nom . " <" . $email . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// 6. Envoyer
$envoi = mail($destinataire, $objet, $corps, $headers);

// 7. Rediriger
if ($envoi) {
    header('Location: pages/merci-contact.html');
} else {
    header('Location: pages/contact.html?erreur=envoi');
}
exit;
?>