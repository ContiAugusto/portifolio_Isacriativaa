/* =========================================================================
   PLAYER DE MÚSICA — disco de vinil
   Lê window.DADOS_MUSICA (js/data-musica.js) e monta a lista de faixas
   dentro de #player. Ao clicar numa faixa:
     - toca o MP3 do começo ao fim (o "trecho" é o próprio arquivo cortado)
     - o disco (#disc) ganha a classe .is-playing e gira (CSS cuida disso)
     - clicar na faixa que já está tocando pausa ela e para o disco
   Nada disso depende do HTML/CSS mudar — só do array em data-musica.js.
   ========================================================================= */
(() => {
  "use strict";

  const player = document.getElementById("player");
  const disc = document.getElementById("disc");
  const faixas = window.DADOS_MUSICA || [];

  if (!player || !faixas.length) return;

  const CORES = {
    green: ["--color-green", "--color-green-rgb"],
    yellow: ["--color-yellow", "--color-yellow-rgb"],
    pink: ["--color-pink", "--color-pink-rgb"],
    blue: ["--color-blue", "--color-blue-rgb"],
    purple: ["--color-purple", "--color-purple-rgb"],
    red: ["--color-red", "--color-red-rgb"],
  };

  const audio = new Audio();
  audio.preload = "none";
  let faixaAtiva = null;

  const iconePlay =
    '<svg class="icon-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>';
  const iconePause =
    '<svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"></path></svg>';

  /* Monta a lista de botões a partir dos dados */
  faixas.forEach((faixa, indice) => {
    const [corVar, corRgbVar] = CORES[faixa.cor] || CORES.pink;

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "player__track";
    botao.dataset.index = String(indice);
    botao.style.setProperty("--track-accent", `var(${corVar})`);
    botao.style.setProperty("--track-accent-rgb", `var(${corRgbVar})`);
    botao.setAttribute(
      "aria-label",
      `Tocar trecho de ${faixa.titulo}`
    );

    botao.innerHTML = `
      <span class="player__icon">${iconePlay}${iconePause}</span>
      <span>
        <span class="player__name" style="display:block;">${faixa.titulo}</span>
        <span class="player__meta">${faixa.estilo || ""}</span>
      </span>
    `;

    botao.addEventListener("click", () => tocarOuPausar(botao, faixa));
    player.appendChild(botao);
  });

  function pararTudo() {
    audio.pause();
    if (disc) disc.classList.remove("is-playing");
    player.querySelectorAll(".player__track").forEach((track) => {
      track.classList.remove("is-active");
    });
    faixaAtiva = null;
  }

  function tocarOuPausar(botao, faixa) {
    // clicou na faixa que já está tocando -> pausa
    if (faixaAtiva === botao && !audio.paused) {
      pararTudo();
      return;
    }

    audio.src = faixa.arquivo;
    audio.currentTime = 0;

    audio
      .play()
      .then(() => {
        player.querySelectorAll(".player__track").forEach((track) => {
          track.classList.remove("is-active");
        });
        botao.classList.add("is-active");
        if (disc) {
          disc.classList.add("is-playing");
          disc.style.setProperty("--track-accent", botao.style.getPropertyValue("--track-accent"));
        }
        faixaAtiva = botao;
      })
      .catch(() => {
        // o MP3 dessa faixa ainda não foi colocado em assets/audio/
        console.warn("Áudio não encontrado: " + faixa.arquivo);
        pararTudo();
      });
  }

  audio.addEventListener("ended", pararTudo);
})();
