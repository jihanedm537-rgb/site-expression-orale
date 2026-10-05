// Chrono réutilisable par tous les jeux.
// mode "down" : compte à rebours depuis `duration` (en secondes) jusqu'à 0, puis appelle onEnd.
// mode "up"   : chrono qui monte depuis 0, sans fin.
// Basé sur l'horloge réelle (Date.now) pour rester juste même si l'onglet ralentit.

function createTimer({ mode = "down", duration = 60, onTick = () => {}, onEnd = () => {} } = {}) {
  let elapsedMs = 0;
  let startedAt = null;
  let intervalId = null;

  function currentElapsed() {
    return startedAt === null ? elapsedMs : elapsedMs + (Date.now() - startedAt);
  }

  function seconds() {
    const elapsed = Math.floor(currentElapsed() / 1000);
    return mode === "down" ? Math.max(duration - elapsed, 0) : elapsed;
  }

  function tick() {
    onTick(seconds());
    if (mode === "down" && currentElapsed() >= duration * 1000) {
      stop();
      onEnd();
    }
  }

  function stop() {
    elapsedMs = currentElapsed();
    startedAt = null;
    clearInterval(intervalId);
    intervalId = null;
  }

  return {
    start() {
      if (intervalId !== null) return;
      startedAt = Date.now();
      intervalId = setInterval(tick, 200);
    },
    pause: stop,
    reset(newDuration = duration) {
      stop();
      duration = newDuration;
      elapsedMs = 0;
      onTick(seconds());
    },
    isRunning: () => intervalId !== null,
    seconds,
    get duration() {
      return duration;
    },
  };
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${minutes}:${String(secs).padStart(2, "0")}`;
}

// Petit "bip" généré sans fichier audio. Un seul AudioContext est réutilisé,
// les navigateurs limitant le nombre de contextes ouverts.
let audioContext = null;

function beep(frequency = 880, duration = 0.8) {
  try {
    audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;
    osc.type = "sine";
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain).connect(audioContext.destination);
    osc.start(now);
    osc.stop(now + duration);
  } catch (e) {
    // pas de son disponible : le feedback visuel suffit
  }
}
