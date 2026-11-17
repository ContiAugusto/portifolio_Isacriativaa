/* ==========================================================================
   PLAYER DE MÚSICA E VINIL
   A lista continua sendo alimentada somente por js/data-musica.js.

   O estado do áudio controla o disco, a agulha, as notas, o botão ativo,
   o texto "tocando agora" e a barra de progresso.
   ========================================================================== */
(() => {
  "use strict";

  const player = document.getElementById("player");
  const disc = document.getElementById("disc");
  const stage = document.getElementById("vinylStage");
  const vinylStatus = document.getElementById("vinylStatus");
  const tracks = window.DADOS_MUSICA || [];

  if (!player || !tracks.length) return;

  const COLORS = {
    green: ["--color-green-new", "--color-green-new-rgb"],
    yellow: ["--color-yellow-new", "--color-yellow-new-rgb"],
    pink: ["--color-pink-new", "--color-pink-new-rgb"],
    blue: ["--color-blue-new", "--color-blue-new-rgb"],
    purple: ["--color-purple-new", "--color-purple-new-rgb"],
    red: ["--color-red-new", "--color-red-new-rgb"],
    orange: ["--color-orange-new", "--color-orange-new-rgb"],
    cyan: ["--color-cyan-new", "--color-cyan-new-rgb"],
  };

  const audio = new Audio();
  audio.preload = "metadata";
  let activeButton = null;
  let activeTrack = null;

  const status = document.createElement("div");
  status.className = "player__status";
  status.innerHTML = `
    <span class="player__status-name">Escolha uma faixa</span>
    <span class="player__time">0:00 / 0:00</span>
    <span class="player__progress" aria-hidden="true"><span class="player__progress-fill"></span></span>
  `;

  const trackList = document.createElement("div");
  trackList.className = "player__tracks";
  player.append(status, trackList);

  const statusName = status.querySelector(".player__status-name");
  const time = status.querySelector(".player__time");
  const progress = status.querySelector(".player__progress-fill");

  const playIcon = '<svg class="icon-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg>';
  const pauseIcon = '<svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z"></path></svg>';

  tracks.forEach((track, index) => {
    const [colorVar, colorRgbVar] = COLORS[track.cor] || COLORS.pink;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "player__track";
    button.dataset.index = String(index);
    button.style.setProperty("--track-accent", `var(${colorVar})`);
    button.style.setProperty("--track-accent-rgb", `var(${colorRgbVar})`);
    button.setAttribute("aria-label", `Tocar ${track.titulo}`);
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = `
      <span class="player__icon">${playIcon}${pauseIcon}</span>
      <span class="player__track-copy">
        <span class="player__name">${track.titulo}</span>
        <span class="player__meta">${track.estilo || "Canção educativa"}</span>
      </span>
    `;
    button.addEventListener("click", () => toggleTrack(button, track));
    trackList.appendChild(button);
  });

  function toggleTrack(button, track) {
    if (activeButton === button) {
      if (audio.paused) {
        audio.play().catch(() => showAudioError(track));
      } else {
        audio.pause();
      }
      return;
    }

    setActiveTrack(button, track);
    audio.src = track.arquivo;
    audio.currentTime = 0;
    audio.play().catch(() => showAudioError(track));
  }

  function setActiveTrack(button, track) {
    trackList.querySelectorAll(".player__track").forEach((item) => {
      item.classList.remove("is-active", "is-playing");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");
    activeButton = button;
    activeTrack = track;
    statusName.textContent = track.titulo;
    setAccent(button);
  }

  function setAccent(button) {
    const accent = button.style.getPropertyValue("--track-accent");
    [disc, stage, status].filter(Boolean).forEach((element) => {
      element.style.setProperty("--track-accent", accent);
    });
  }

  function setPlayingState(isPlaying) {
    disc?.classList.toggle("is-playing", isPlaying);
    stage?.classList.toggle("is-playing", isPlaying);
    activeButton?.classList.toggle("is-playing", isPlaying);

    if (activeTrack && vinylStatus) {
      vinylStatus.textContent = isPlaying ? `Tocando: ${activeTrack.titulo}` : `Pausado: ${activeTrack.titulo}`;
    }
    if (activeButton) {
      activeButton.setAttribute("aria-label", `${isPlaying ? "Pausar" : "Continuar"} ${activeTrack.titulo}`);
    }
  }

  function showAudioError(track) {
    setPlayingState(false);
    statusName.textContent = "Não foi possível reproduzir esta faixa";
    if (vinylStatus) vinylStatus.textContent = `Áudio indisponível: ${track.titulo}`;
  }

  function formatTime(value) {
    if (!Number.isFinite(value)) return "0:00";
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  audio.addEventListener("playing", () => setPlayingState(true));
  audio.addEventListener("pause", () => setPlayingState(false));
  audio.addEventListener("timeupdate", () => {
    const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    progress.style.width = `${percent}%`;
    time.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
  });
  audio.addEventListener("loadedmetadata", () => {
    time.textContent = `0:00 / ${formatTime(audio.duration)}`;
  });
  audio.addEventListener("ended", () => {
    setPlayingState(false);
    progress.style.width = "0%";
    time.textContent = `0:00 / ${formatTime(audio.duration)}`;
    if (vinylStatus) vinylStatus.textContent = "Faixa finalizada — escolha outra música";
  });
  audio.addEventListener("error", () => {
    if (activeTrack) showAudioError(activeTrack);
  });
})();
