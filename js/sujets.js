// Banque de sujets partagée par les jeux (Roulette, Recherche Express, Parle ou Perds).
// Chargée en script classique (pas en module) pour que le site marche aussi
// en ouvrant directement les fichiers HTML, sans serveur.
// Pour ajouter un sujet : une ligne { texte, categorie } dans le tableau.

const CATEGORIES = {
  societe: { label: "Société & actualité", emoji: "🌍" },
  tech: { label: "Tech & futur", emoji: "🚀" },
  lifestyle: { label: "Lifestyle & perso", emoji: "🌻" },
  fun: { label: "Fun & léger", emoji: "🎈" },
  pro: { label: "Pro & carrière", emoji: "💼" },
};

const SUJETS = [
  // Société & actualité
  { categorie: "societe", texte: "Le télétravail devrait-il devenir la norme ?" },
  { categorie: "societe", texte: "Faut-il interdire les réseaux sociaux aux moins de 16 ans ?" },
  { categorie: "societe", texte: "La semaine de 4 jours : bonne ou mauvaise idée ?" },
  { categorie: "societe", texte: "Faut-il rendre le vote obligatoire ?" },
  { categorie: "societe", texte: "Les transports en commun devraient-ils être gratuits ?" },
  { categorie: "societe", texte: "Faut-il supprimer les devoirs à la maison ?" },
  { categorie: "societe", texte: "Le service civique devrait-il être obligatoire pour les jeunes ?" },
  { categorie: "societe", texte: "Peut-on encore prendre l'avion sans culpabiliser ?" },
  { categorie: "societe", texte: "La ville ou la campagne : où vit-on le mieux ?" },
  { categorie: "societe", texte: "Faut-il limiter la publicité dans l'espace public ?" },
  { categorie: "societe", texte: "Le sport à l'école devrait-il compter autant que les maths ?" },
  { categorie: "societe", texte: "Faut-il apprendre à cuisiner à l'école ?" },

  // Tech & futur
  { categorie: "tech", texte: "L'IA va-t-elle remplacer la créativité humaine ?" },
  { categorie: "tech", texte: "Faut-il avoir peur des voitures autonomes ?" },
  { categorie: "tech", texte: "Le métavers, effet de mode ou vraie révolution ?" },
  { categorie: "tech", texte: "Devrait-on avoir un droit à la déconnexion le week-end ?" },
  { categorie: "tech", texte: "Irais-tu vivre sur Mars si tu en avais l'occasion ?" },
  { categorie: "tech", texte: "Les smartphones nous rendent-ils moins attentifs ?" },
  { categorie: "tech", texte: "Faut-il apprendre à coder dès l'école primaire ?" },
  { categorie: "tech", texte: "L'argent liquide va-t-il disparaître ?" },
  { categorie: "tech", texte: "Une invention qui n'existe pas encore et qui changerait ta vie" },
  { categorie: "tech", texte: "Les robots domestiques : rêve ou cauchemar ?" },
  { categorie: "tech", texte: "Peut-on vraiment protéger sa vie privée en ligne ?" },
  { categorie: "tech", texte: "La technologie qui t'a le plus impressionné ces dernières années" },

  // Lifestyle & perso
  { categorie: "lifestyle", texte: "Le voyage que tu referais sans hésiter" },
  { categorie: "lifestyle", texte: "Une habitude qui a changé ta vie" },
  { categorie: "lifestyle", texte: "Le meilleur conseil qu'on t'ait donné" },
  { categorie: "lifestyle", texte: "Ta journée idéale, du réveil au coucher" },
  { categorie: "lifestyle", texte: "Un livre, un film ou une série qui t'a marqué" },
  { categorie: "lifestyle", texte: "Ce que tu dirais à toi-même il y a 10 ans" },
  { categorie: "lifestyle", texte: "Un endroit où tu te sens vraiment bien" },
  { categorie: "lifestyle", texte: "La chose la plus courageuse que tu aies faite" },
  { categorie: "lifestyle", texte: "Un petit plaisir du quotidien que tu ne négocies pas" },
  { categorie: "lifestyle", texte: "Une compétence que tu aimerais apprendre cette année" },
  { categorie: "lifestyle", texte: "Ton souvenir d'enfance préféré" },
  { categorie: "lifestyle", texte: "Lève-tôt ou couche-tard : défends ton camp" },

  // Fun & léger
  { categorie: "fun", texte: "Chat ou chien, et pourquoi" },
  { categorie: "fun", texte: "Le plat que tu pourrais manger tous les jours" },
  { categorie: "fun", texte: "Si tu devais vivre dans un film, lequel ?" },
  { categorie: "fun", texte: "Le super-pouvoir que tu choisirais (et ce que tu en ferais)" },
  { categorie: "fun", texte: "Si tu pouvais dîner avec trois personnes, vivantes ou non" },
  { categorie: "fun", texte: "Convaincs-moi que l'ananas a sa place sur une pizza (ou pas)" },
  { categorie: "fun", texte: "Ce que tu ferais si tu gagnais au loto demain" },
  { categorie: "fun", texte: "L'objet le plus inutile que tu possèdes" },
  { categorie: "fun", texte: "Si les animaux pouvaient parler, lequel serait le plus bavard ?" },
  { categorie: "fun", texte: "Invente une nouvelle fête et explique comment on la célèbre" },
  { categorie: "fun", texte: "Vends-moi un stylo comme si c'était l'objet du siècle" },
  { categorie: "fun", texte: "Le pire job d'été imaginable" },

  // Pro & carrière
  { categorie: "pro", texte: "La compétence la plus sous-estimée au travail" },
  { categorie: "pro", texte: "Un bon manager, c'est quoi pour toi ?" },
  { categorie: "pro", texte: "Le métier que tu ferais si l'argent n'existait pas" },
  { categorie: "pro", texte: "Présente-toi en deux minutes comme en entretien d'embauche" },
  { categorie: "pro", texte: "Un échec qui t'a appris quelque chose" },
  { categorie: "pro", texte: "Faut-il rester longtemps dans la même entreprise ?" },
  { categorie: "pro", texte: "Open space ou bureau fermé ?" },
  { categorie: "pro", texte: "Comment gères-tu une journée où tout part de travers ?" },
  { categorie: "pro", texte: "La réunion parfaite, ça ressemble à quoi ?" },
  { categorie: "pro", texte: "Être son propre patron : liberté ou galère ?" },
  { categorie: "pro", texte: "Le conseil que tu donnerais à quelqu'un qui commence sa carrière" },
  { categorie: "pro", texte: "Pitch une idée de start-up en moins de deux minutes" },
];

// Paquet de sujets à piocher sans répétition : on vide un "sac" mélangé
// avant de le remplir à nouveau. Chaque jeu crée son propre paquet.
function createTopicDeck(topics = SUJETS) {
  let bag = [];
  let lastTopic = null;

  function shuffle(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  return {
    draw() {
      if (bag.length === 0) {
        bag = shuffle(topics);
        // évite de retomber sur le même sujet juste après un nouveau mélange
        if (bag[bag.length - 1] === lastTopic) bag.unshift(bag.pop());
      }
      lastTopic = bag.pop();
      return lastTopic;
    },
  };
}

// Un sujet quelconque, sans mémoire (utile pour les animations de défilement).
function randomTopic(topics = SUJETS) {
  return topics[Math.floor(Math.random() * topics.length)];
}
