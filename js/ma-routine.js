// "Ma Routine" : checklist de 6 étapes, progression sauvegardée en localStorage.

(() => {
  const STORAGE_KEY = "maRoutine.etapesFaites"; // tableau des data-step cochés

  const steps = Array.from(document.querySelectorAll(".step"));
  const progressText = document.getElementById("progress-text");
  const progressBar = document.getElementById("progress-bar");
  const completeBox = document.getElementById("routine-complete");
  const resetBtn = document.getElementById("reset-btn");

  function loadDone() {
    const saved = storage.get(STORAGE_KEY, []);
    return Array.isArray(saved) ? saved : [];
  }

  function saveDone() {
    const done = steps
      .filter((step) => step.querySelector("input").checked)
      .map((step) => step.dataset.step);
    storage.set(STORAGE_KEY, done);
  }

  function render() {
    const doneCount = steps.filter((step) => {
      const checked = step.querySelector("input").checked;
      step.classList.toggle("is-done", checked);
      return checked;
    }).length;

    progressText.textContent = doneCount === 0
      ? `0 étape sur ${steps.length} : on commence quand tu veux !`
      : `${doneCount} étape${doneCount > 1 ? "s" : ""} sur ${steps.length}`;
    progressBar.style.width = `${(doneCount / steps.length) * 100}%`;

    const allDone = doneCount === steps.length;
    if (allDone && completeBox.hidden) {
      completeBox.hidden = false;
      completeBox.classList.remove("is-landed");
      void completeBox.offsetWidth; // relance l'animation
      completeBox.classList.add("is-landed");
    } else if (!allDone) {
      completeBox.hidden = true;
    }
  }

  // Restaure les cases cochées lors d'une visite précédente
  const done = loadDone();
  steps.forEach((step) => {
    const input = step.querySelector("input");
    input.checked = done.includes(step.dataset.step);
    input.addEventListener("change", () => {
      saveDone();
      render();
    });
  });

  resetBtn.addEventListener("click", () => {
    steps.forEach((step) => {
      step.querySelector("input").checked = false;
    });
    saveDone();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  render();
})();
