/* =========================================================================
   GALERIA DE FOTOS — genérico
   Usado em trabalhos.html, alule.html e aluleu.html. Cada página só
   precisa de uma <div class="gallery" id="gallery" data-fonte="NOME_DO_ARRAY">
   vazia no HTML — este arquivo lê o array certo (window[NOME_DO_ARRAY],
   definido em js/data-trabalhos.js, js/data-alule.js ou js/data-aluleu.js)
   e monta as fotos. Pra trocar fotos, edite só o arquivo de dados da
   página — nunca este arquivo nem o HTML.
   ========================================================================= */
(() => {
  "use strict";

  const container = document.getElementById("gallery");
  if (!container) return;

  const nomeFonte = container.dataset.fonte;
  const fotos = (nomeFonte && window[nomeFonte]) || [];

  if (!fotos.length) {
    container.innerHTML =
      '<p class="gallery__empty">Em breve, fotos por aqui. 🌻</p>';
    return;
  }

  const fallbackSvg = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
      <rect x="3" y="3" width="18" height="18" rx="3"></rect>
      <circle cx="9" cy="9" r="1.8"></circle>
      <path d="m21 15-5-5L5 21"></path>
    </svg>
  `;

  fotos.forEach((foto) => {
    const item = document.createElement("figure");
    item.className = "gallery__item";

    const legenda = foto.legenda
      ? `<figcaption class="gallery__caption">${foto.legenda}</figcaption>`
      : "";

    item.innerHTML = `
      <img
        src="${foto.src}"
        alt="${foto.alt || ""}"
        loading="lazy"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      />
      <div class="hero__photo-fallback" aria-hidden="true" style="display:none;">
        ${fallbackSvg}
      </div>
      ${legenda}
    `;

    container.appendChild(item);
  });
})();
