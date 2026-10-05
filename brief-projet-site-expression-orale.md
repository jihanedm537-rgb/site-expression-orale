# Brief projet — Site de jeux d'expression orale

## 1. Concept

Un site web gratuit proposant des mini-jeux pour s'entraîner à l'expression orale et à la prise de parole : parler de manière structurée, spontanée, sans filet, et progresser avec une méthode. Inspiré du concept d'anaisliving.com, mais avec sa propre identité (nom à définir plus tard) et vocation à être enrichi au fil du temps.

**Public cible :** toute personne qui veut progresser à l'oral (étudiants, professionnels, préparation d'entretiens/oraux, créateurs de contenu, personnes qui veulent juste s'amuser à parler).

**Ton :** chaleureux, personnel, motivant, un peu ludique. Écrit à la première personne comme si le créateur du site s'adressait directement au joueur. Pas corporate, pas scolaire.

**V1 : pas de compte, pas de capture d'email, pas de backend.** Tout tourne côté client (localStorage pour sauvegarder une progression si besoin). L'email/newsletter et les comptes utilisateurs sont prévus pour une phase ultérieure (voir section 6).

---

## 2. Les 4 jeux (fonctionnalités V1)

### 2.1 Recherche Express ("Deep Research")
- Un sujet est tiré au hasard dans une banque de thèmes (voir section 3).
- Un chrono de 15 minutes démarre : le joueur a ce temps pour "chercher" et préparer une mini-présentation sur le sujet (dans la vraie vie, il va chercher des infos ailleurs — le site ne fournit pas de contenu de recherche, juste le cadre et le minuteur).
- À la fin du chrono (ou quand le joueur clique "J'ai fini"), passage en mode "présentation" : un écran simple avec le sujet affiché en grand et un chrono qui tourne, pour qu'il s'entraîne à présenter à voix haute (seul, face caméra, ou devant quelqu'un).
- Bouton pour tirer un nouveau sujet et recommencer.

**États de l'écran :** tirage du sujet → phase recherche (compte à rebours 15 min, pause possible) → phase présentation (chrono qui monte, bouton "terminer") → écran de fin avec récap (sujet, temps de présentation) et bouton rejouer.

### 2.2 Roulette de sujets ("Topic Roulette")
- Un bouton "Lancer la roulette" tire un sujet aléatoire dans la banque de thèmes.
- Le joueur doit en parler immédiatement, sans préparation, pendant une durée libre ou chronométrée (proposer un chrono optionnel de 1 à 3 min, réglable).
- Utilisable seul (s'entraîner à l'improvisation) ou en groupe (chacun son tour tire un sujet).
- Variante simple à prévoir : bouton "sujet suivant" pour enchaîner rapidement plusieurs tours.

### 2.3 Parle ou Perds
- Mécanique de pression temporelle : le joueur doit parler en continu sur un sujet tiré au hasard, sans s'arrêter, sans "euh" ni silence trop long.
- Chrono qui monte tant que le joueur "tient" (fonctionnement déclaratif : un bouton "je parle toujours" ou un chrono qui continue tant qu'on ne clique pas sur "stop/j'ai perdu").
- Objectif : battre son propre record de temps. Possibilité de garder le meilleur score en localStorage ("Ton record : 1min32").
- Ambiance un peu "jeu" : compte à rebours sonore ou visuel avant le départ, feedback ludique à la fin (ex: "Pas mal ! Essaie de battre ça 🔥").

### 2.4 Ma Routine
- Pas un jeu à tirage aléatoire, mais un guide en 6 étapes qui présente une méthode pour progresser à l'oral.
- Format : une page avec les 6 étapes affichées comme un parcours/checklist, chaque étape dépliable avec son explication.
- Le joueur peut cocher les étapes qu'il a faites (sauvegarde locale via localStorage) pour suivre sa progression dans la routine.
- Contenu des 6 étapes à écrire (exemples de structure à adapter) :
  1. Échauffement vocal (articulation, respiration)
  2. Choisir un sujet du jour (lien vers Roulette de sujets)
  3. Parler 2 minutes sans interruption dessus
  4. Se réécouter ou se faire un retour
  5. Identifier un point à améliorer
  6. Refaire un essai en corrigeant ce point

---

## 3. Contenu nécessaire : banques de sujets

Les jeux 2.1, 2.2 et 2.3 piochent dans une liste de sujets. Prévoir une banque d'au moins 50-100 sujets variés, répartis en catégories (pour pouvoir filtrer plus tard : société, tech, lifestyle, fun, pro...). Exemples de départ à utiliser/compléter :

**Société & actualité**
- Le télétravail devrait-il devenir la norme ?
- Faut-il interdire les réseaux sociaux aux moins de 16 ans ?
- La semaine de 4 jours : bonne ou mauvaise idée ?

**Tech & futur**
- L'IA va-t-elle remplacer la créativité humaine ?
- Faut-il avoir peur des voitures autonomes ?
- Le métavers, effet de mode ou vraie révolution ?

**Lifestyle & perso**
- Le voyage que tu referais sans hésiter
- Une habitude qui a changé ta vie
- Le meilleur conseil qu'on t'ait donné

**Fun & léger**
- Chat ou chien, et pourquoi
- Le plat que tu pourrais manger tous les jours
- Si tu devais vivre dans un film, lequel ?

**Pro & carrière**
- La compétence la plus sous-estimée au travail
- Un bon manager, c'est quoi pour toi ?
- Le métier que tu ferais si l'argent n'existait pas

*(À développer largement avant le lancement — plus la banque est variée, plus le site reste intéressant à réutiliser.)*

---

## 4. Expérience & navigation

- Page d'accueil : présentation courte du concept + les 4 jeux sous forme de cartes cliquables (nom du jeu, icône, une phrase d'accroche, bouton "Jouer").
- Chaque jeu dans sa propre page/route (ou vue en single-page app).
- Design simple, mobile-first (beaucoup de gens vont jouer depuis leur téléphone en se préparant pour un oral).
- Pas de friction : aucun compte requis pour jouer dès l'arrivée sur le site.

---

## 5. Style visuel

- Identité pas encore définie : couleurs et nom à choisir (placeholder pour commencer, facile à changer ensuite).
- Ton chaleureux et motivant dans les textes d'interface (ex: "Vas-y, lance-toi !" plutôt que "Démarrer la session").
- Préférence pour quelque chose de vivant et ludique plutôt que corporate/minimaliste froid — mais à ajuster selon les goûts une fois une direction choisie.

---

## 6. Roadmap après la V1 (fonctionnalités à ajouter plus tard)

Ne pas développer tout de suite, mais garder le code structuré pour pouvoir ajouter facilement :
- Capture d'email / newsletter (actuellement volontairement absente de la V1)
- Comptes utilisateurs + sauvegarde de progression en ligne (plutôt qu'en localStorage uniquement)
- Statistiques de progression (nombre de sessions, temps total parlé, records)
- Mode multijoueur / défi entre amis
- Possibilité d'enregistrer sa voix pour se réécouter
- Nouvelles banques de sujets thématiques (entretien d'embauche, pitch, débat...)
- Partage des résultats sur les réseaux sociaux

---

## 7. Stack technique suggérée

Pour un projet solo à construire avec Claude Code, en gardant les choses simples pour itérer vite :
- **Option simple (recommandée pour démarrer) :** HTML/CSS/JS vanilla, un fichier par jeu ou une petite SPA sans framework. Facile à comprendre, déployable immédiatement (Vercel, Netlify, GitHub Pages).
- **Option si tu veux un code plus structuré dès le départ :** React (Vite) — plus confortable quand tu ajouteras des fonctionnalités (comptes, sauvegarde en ligne) plus tard.
- Stockage local : `localStorage` pour les records et la progression de "Ma Routine" en V1.
- Pas de backend nécessaire pour la V1.

### Structure de fichiers proposée (option simple)
```
/
├── index.html          (page d'accueil avec les 4 cartes de jeux)
├── recherche-express.html
├── roulette.html
├── parle-ou-perds.html
├── ma-routine.html
├── css/
│   └── style.css
├── js/
│   ├── sujets.js        (banque de sujets, exportée en tableau)
│   ├── timer.js          (logique de chrono réutilisable)
│   └── storage.js        (helpers localStorage)
└── assets/
```

---

## 8. Pour démarrer avec Claude Code

Exemple de premier message à donner à Claude Code une fois le dossier de projet créé :

> "Voici le brief d'un site de jeux d'expression orale (brief-projet-site-expression-orale.md, à lire en premier). Commence par me créer la structure de base en HTML/CSS/JS vanilla avec la page d'accueil et le jeu 'Roulette de sujets' fonctionnel, en suivant le ton et le style décrits dans le brief. On ajoutera les autres jeux ensuite."

Garder ce fichier à la racine du projet pour que Claude Code puisse s'y référer à chaque nouvelle fonctionnalité ajoutée.
