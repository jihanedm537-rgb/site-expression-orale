// Jeu "Roulette de sujets" : tirage aléatoire + chrono optionnel.

(() => {
  const spinBtn = document.getElementById("spin-btn");
  const topicText = document.getElementById("topic-text");
  const topicCategory = document.getElementById("topic-category");
  const topicCard = topicText.closest(".topic-card");

  const timerBox = document.getElementById("timer");
  const timerDisplay = document.getElementById("timer-display");
  const timerBarFill = document.getElementById("timer-bar-fill");
  const timerMessage = document.getElementById("timer-message");
  const timerStartBtn = document.getElementById("timer-start");
  const timerResetBtn = document.getElementById("timer-reset");
  const durationInputs = document.querySelectorAll('input[name="duration"]');

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const deck = createTopicDeck();

  function showTopic(topic) {
    const cat = CATEGORIES[topic.categorie];
    topicCategory.textContent = `${cat.emoji} ${cat.label}`;
    topicCategory.hidden = false;
    topicText.textContent = topic.texte;
  }

  // --- Roulette ---

  function spin() {
    spinBtn.disabled = true;
    resetTimer();
    const finalTopic = deck.draw();

    if (reduceMotion) {
      landOn(finalTopic);
      return;
    }

    // défilement rapide qui ralentit, comme une vraie roulette
    topicCard.classList.add("is-spinning");
    let delay = 50;
    const roll = () => {
      showTopic(randomTopic());
      delay *= 1.15;
      if (delay < 300) {
        setTimeout(roll, delay);
      } else {
        landOn(finalTopic);
      }
    };
    roll();
  }

  function landOn(topic) {
    showTopic(topic);
    topicCard.classList.remove("is-spinning");
    topicCard.classList.remove("is-landed");
    void topicCard.offsetWidth; // relance l'animation à chaque tirage
    topicCard.classList.add("is-landed");
    spinBtn.textContent = "Sujet suivant →";
    spinBtn.disabled = false;
  }

  spinBtn.addEventListener("click", spin);

  // --- Chrono optionnel ---

  const timer = createTimer({
    mode: "down",
    duration: 60,
    onTick: renderTimer,
    onEnd: () => {
      timerMessage.textContent = "Temps écoulé ! Bravo, tu as tenu jusqu'au bout 🎉";
      timerStartBtn.textContent = "C'est parti !";
      timerBox.classList.add("is-done");
      beep();
    },
  });

  function renderTimer(secondsLeft) {
    timerDisplay.textContent = formatTime(secondsLeft);
    timerBarFill.style.width = `${(1 - secondsLeft / timer.duration) * 100}%`;
  }

  function resetTimer(newDuration) {
    timer.reset(newDuration);
    timerStartBtn.textContent = "C'est parti !";
    timerMessage.textContent = "";
    timerBox.classList.remove("is-done");
  }

  function selectedDuration() {
    return Number(document.querySelector('input[name="duration"]:checked').value);
  }

  durationInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const duration = selectedDuration();
      timerBox.hidden = duration === 0;
      resetTimer(duration || 60);
    });
  });

  timerStartBtn.addEventListener("click", () => {
    if (timer.isRunning()) {
      timer.pause();
      timerStartBtn.textContent = "Reprendre";
      return;
    }
    if (timer.seconds() === 0) resetTimer();
    timerMessage.textContent = "";
    timer.start();
    timerStartBtn.textContent = "Pause";
  });

  timerResetBtn.addEventListener("click", () => resetTimer());
})();
