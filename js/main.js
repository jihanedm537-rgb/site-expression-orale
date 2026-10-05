// Script commun à toutes les pages.
// Les modules partagés (sujets.js, timer.js, storage.js) viendront s'ajouter dans ce dossier.

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
