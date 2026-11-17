/* ==========================================================================
   GALERIA DE MÍDIA
   Compartilhada por trabalhos.html, alule.html e aluleu.html.

   - Detecta imagens e vídeos automaticamente pela extensão do arquivo.
   - Preserva a proporção original da mídia (o CSS usa layout masonry).
   - Imagens abrem em um visualizador; vídeos têm controles nativos.
   - Também aceita `tipo: "video"` no arquivo data-*.js, se necessário.
   ========================================================================== */
(() => {
  "use strict";

  const container = document.getElementById("gallery");
  if (!container) return;

  const sourceName = container.dataset.fonte;
  const mediaItems = (sourceName && window[sourceName]) || [];
  const VIDEO_EXTENSION = /\.(mp4|webm|ogg|mov)(?:[?#].*)?$/i;

  if (!mediaItems.length) {
    container.innerHTML = '<p class="gallery__empty">Em breve, novas histórias por aqui. 🌻</p>';
    return;
  }

  const lightbox = createLightbox();

  mediaItems.forEach((item) => {
    const isVideo = item.tipo === "video" || VIDEO_EXTENSION.test(item.src);
    const figure = document.createElement("figure");
    figure.className = `gallery__item${isVideo ? " gallery__item--video" : ""}`;

    if (isVideo) {
      const video = document.createElement("video");
      video.src = item.src;
      video.controls = true;
      video.preload = "metadata";
      video.playsInline = true;
      if (item.poster) video.poster = item.poster;
      video.setAttribute("aria-label", item.alt || item.legenda || "Vídeo da galeria");
      figure.appendChild(video);
    } else {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "gallery__media-button";
      button.setAttribute("aria-label", `Ampliar: ${item.alt || item.legenda || "imagem"}`);

      const image = document.createElement("img");
      image.src = item.src;
      image.alt = item.alt || "";
      image.loading = "lazy";
      image.decoding = "async";
      image.addEventListener("error", () => {
        figure.hidden = true;
      });

      button.appendChild(image);
      button.addEventListener("click", () => openLightbox(lightbox, item, false));
      figure.appendChild(button);
    }

    if (item.legenda) {
      const caption = document.createElement("figcaption");
      caption.className = "gallery__caption";
      caption.textContent = item.legenda;
      figure.appendChild(caption);
    }

    container.appendChild(figure);
  });

  function createLightbox() {
    const dialog = document.createElement("div");
    dialog.className = "media-lightbox";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-label", "Visualizador de mídia");
    dialog.innerHTML = `
      <button class="media-lightbox__close" type="button" aria-label="Fechar visualizador">×</button>
      <div class="media-lightbox__content"></div>
      <p class="media-lightbox__caption"></p>
    `;

    const closeButton = dialog.querySelector(".media-lightbox__close");
    closeButton.addEventListener("click", () => closeLightbox(dialog));
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog || event.target.classList.contains("media-lightbox__content")) {
        closeLightbox(dialog);
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && dialog.classList.contains("is-open")) {
        closeLightbox(dialog);
      }
    });

    document.body.appendChild(dialog);
    return dialog;
  }

  function openLightbox(dialog, item, isVideo) {
    const content = dialog.querySelector(".media-lightbox__content");
    const caption = dialog.querySelector(".media-lightbox__caption");
    content.replaceChildren();

    const media = document.createElement(isVideo ? "video" : "img");
    media.src = item.src;
    if (isVideo) {
      media.controls = true;
      media.autoplay = true;
      media.playsInline = true;
    } else {
      media.alt = item.alt || "";
    }
    content.appendChild(media);
    caption.textContent = item.legenda || item.alt || "";
    dialog.classList.add("is-open");
    document.body.classList.add("has-lightbox");
    dialog.querySelector(".media-lightbox__close").focus();
  }

  function closeLightbox(dialog) {
    const video = dialog.querySelector("video");
    if (video) video.pause();
    dialog.classList.remove("is-open");
    document.body.classList.remove("has-lightbox");
  }
})();
