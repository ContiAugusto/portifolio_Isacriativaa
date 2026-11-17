(() => {
  "use strict";

  /* Ano atual no rodapé */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Cabeçalho com sombra ao rolar a página */
  const header = document.getElementById("header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Menu mobile */
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  const closeMenu = () => {
    if (!navToggle || !nav) return;
    navToggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    if (!navToggle || !nav) return;
    navToggle.setAttribute("aria-expanded", "true");
    nav.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  /* Destaque do link ativo no menu.
     Na home (anchors #sobre, #livros...) segue a seção visível na tela.
     Nas páginas internas (trabalhos.html, alule.html...) marca o link cujo
     href bate com o arquivo atual — então basta o nome do arquivo ser igual
     ao href do menu, não precisa mexer em JS para isso funcionar. */
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const isHome = document.body.classList.contains("home");

  if (isHome) {
    const sections = navLinks
      .map((link) => {
        const id = link.getAttribute("href");
        return id && id.startsWith("#") ? document.querySelector(id) : null;
      })
      .filter(Boolean);

    if (sections.length && "IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = `#${entry.target.id}`;
            navLinks.forEach((link) => {
              link.classList.toggle("is-active", link.getAttribute("href") === id);
            });
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );

      sections.forEach((section) => sectionObserver.observe(section));
    }
  } else {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      link.classList.toggle("is-active", href === currentPage);
    });
  }

  /* Variações e pequenos atrasos para a entrada dos elementos */
  const revealDirections = [
    [".hero__content, .about__visual, .music-section__visual", "reveal--left"],
    [".hero__visual, .about__content, .music-section__content", "reveal--right"],
    [".books__item", "reveal--zoom"],
  ];

  revealDirections.forEach(([selector, className]) => {
    document.querySelectorAll(selector).forEach((element) => element.classList.add(className));
  });

  const staggerGroups = [
    { selector: ".about__highlight", className: "reveal--pop", delay: 85 },
    { selector: ".books__item", className: "reveal--zoom", delay: 110 },
    { selector: ".contact__link", className: "reveal--left", delay: 80 },
    { selector: ".gallery__item", className: "reveal--zoom", delay: 55 },
  ];

  staggerGroups.forEach(({ selector, className, delay }) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add("reveal", className);
      element.style.setProperty("--reveal-delay", `${Math.min(index * delay, 330)}ms`);
    });
  });

  /* Revelar elementos suavemente ao entrar na tela */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /*
   * Trajetória: a linha é preenchida conforme a rolagem e o cartão mais
   * próximo do centro da tela recebe destaque. O cálculo usa requestAnimationFrame
   * para manter o movimento leve mesmo em celulares.
   */
  const timeline = document.querySelector(".timeline");
  const timelineSection = document.getElementById("trajetoria");
  const timelineItems = timeline ? Array.from(timeline.querySelectorAll(".timeline__item")) : [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let scrollFrameRequested = false;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const updateTimeline = () => {
    scrollFrameRequested = false;
    if (!timeline || !timelineSection) return;

    if (reduceMotion) {
      timeline.style.setProperty("--timeline-progress", "1");
      timelineSection.style.setProperty("--timeline-shift", "0px");
      return;
    }

    const viewportHeight = window.innerHeight;
    const timelineRect = timeline.getBoundingClientRect();
    const sectionRect = timelineSection.getBoundingClientRect();
    const progressStart = viewportHeight * 0.72;
    const progressDistance = Math.max(timelineRect.height - viewportHeight * 0.18, 1);
    const progress = clamp((progressStart - timelineRect.top) / progressDistance, 0, 1);
    timeline.style.setProperty("--timeline-progress", progress.toFixed(4));

    const parallax = clamp((viewportHeight * 0.5 - sectionRect.top) * 0.045, -18, 62);
    timelineSection.style.setProperty("--timeline-shift", `${parallax.toFixed(1)}px`);

    const focusLine = viewportHeight * 0.52;
    let closestItem = null;
    let closestDistance = Infinity;

    timelineItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const isOnScreen = rect.bottom > viewportHeight * 0.16 && rect.top < viewportHeight * 0.84;
      const distance = Math.abs(rect.top + rect.height / 2 - focusLine);
      if (isOnScreen && distance < closestDistance) {
        closestDistance = distance;
        closestItem = item;
      }
    });

    timelineItems.forEach((item) => item.classList.toggle("is-current", item === closestItem));
  };

  const requestTimelineUpdate = () => {
    if (scrollFrameRequested) return;
    scrollFrameRequested = true;
    window.requestAnimationFrame(updateTimeline);
  };

  if (timeline) {
    updateTimeline();
    window.addEventListener("scroll", requestTimelineUpdate, { passive: true });
    window.addEventListener("resize", requestTimelineUpdate);
  }
})();
