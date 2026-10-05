// Petits helpers localStorage. Toutes les clés du site sont préfixées
// pour ne pas se mélanger avec d'autres sites servis sur le même domaine.
// En navigation privée ou si le stockage est bloqué, on renvoie simplement la valeur par défaut.

const STORAGE_PREFIX = "oseloral.";

const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },
};
