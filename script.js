/* =============================================================================
   Ana Borthagaray — Portfolio Home / interactions
   -----------------------------------------------------------------------------
   Written as small, independent modules. Each module is a self-contained
   factory `initX(root)` that no-ops gracefully if its target is absent, so the
   page degrades cleanly and modules can be reused or removed in isolation.
============================================================================= */
(function () {
  "use strict";

  /** Honour the user's motion preference. */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------------------------
     Module: seamless marquee
     Clones the visible group so the CSS keyframes can translate by -50% and
     loop without a visible seam, regardless of viewport width.
  --------------------------------------------------------------------------- */
  function initMarquee(track) {
    if (!track || prefersReducedMotion) return;

    const group = track.querySelector(".marquee__group");
    if (!group) return;

    const clone = group.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  }

  /* ---------------------------------------------------------------------------
     Module: mobile navigation toggle
     Manages aria-expanded + an `.is-open` class, and closes on link click,
     Escape, or when resizing back to desktop.
  --------------------------------------------------------------------------- */
  function initNavToggle(button) {
    if (!button) return;

    const navId = button.getAttribute("aria-controls");
    const nav = navId && document.getElementById(navId);
    if (!nav) return;

    const setOpen = (open) => {
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute(
        "aria-label",
        open ? "Close navigation menu" : "Open navigation menu"
      );
      nav.classList.toggle("is-open", open);
    };

    button.addEventListener("click", () => {
      setOpen(button.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", (e) => {
      if (e.target.closest(".nav__link")) setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });

    window
      .matchMedia("(min-width: 601px)")
      .addEventListener("change", (e) => {
        if (e.matches) setOpen(false);
      });
  }

  /* ---------------------------------------------------------------------------
     Module: reveal-on-scroll
     Adds a subtle fade/translate as elements enter the viewport. Uses
     IntersectionObserver; falls back to showing everything if unsupported.
  --------------------------------------------------------------------------- */
  function initReveal(elements) {
    if (!elements.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    // Opt into the hidden start-state only now that we can animate it.
    document.documentElement.classList.add("js");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((el) => {
      el.classList.add("reveal-init");
      const r = el.getBoundingClientRect();
      // If already in viewport at load time, reveal immediately (avoids one-frame flash).
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add("is-visible");
      } else {
        observer.observe(el);
      }
    });
  }

  /* ---------------------------------------------------------------------------
     Module: work-card entrance animations
     Observes the curated-work list as a single trigger; when the list enters
     the viewport all cards get their visible class simultaneously, and CSS
     uses a --stagger custom property to create per-card delays.
  --------------------------------------------------------------------------- */
  function initWorkCards() {
    const cards = Array.from(document.querySelectorAll(".work-card"));
    if (!cards.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("js");

    cards.forEach((card, i) => {
      card.style.setProperty("--stagger", i);
      card.classList.add("work-card--hidden");
    });

    const list = document.querySelector(".curated-work__list");
    if (!list) return;

    const reveal = () => {
      cards.forEach((card) => {
        card.classList.remove("work-card--hidden");
        card.classList.add("work-card--visible");
      });
    };

    // Already in view at page load — reveal without observer
    const r = list.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(list);
  }

  /* ---------------------------------------------------------------------------
     Module: project modals
     Opens a two-panel modal (sidebar metadata + scrollable content) when a
     work-card is clicked. Closes on button, Esc, or overlay click.
  --------------------------------------------------------------------------- */
  /* Case-study data lives in js/case-studies/*.js, each registering itself on
     window.PROJECTS. Those files are loaded before this one in work.html. */
  const PROJECTS = window.PROJECTS || {};

  /* ---------------------------------------------------------------------------
     Module: video modal
     A lightbox video player (process/Instagram videos) opened via the
     "open-video-modal" custom event — kept decoupled from whichever UI
     triggers it (see initProjectModals) so either module works standalone.
  --------------------------------------------------------------------------- */
  function initVideoModal() {
    const overlay = document.getElementById("video-modal");
    if (!overlay) return;

    const closeBtn = overlay.querySelector(".video-modal__close");
    const player = overlay.querySelector(".video-modal__player");
    let lastFocused = null;

    function openVideo(src, label) {
      if (!src) return;
      lastFocused = document.activeElement;
      player.src = src;
      player.setAttribute("aria-label", label || "Process video");
      overlay.removeAttribute("aria-hidden");
      overlay.classList.add("is-open");

      player.currentTime = 0;
      const playPromise = player.play();
      if (playPromise && playPromise.catch) {
        // Autoplay with sound can be blocked — retry muted per browser policy.
        playPromise.catch(() => {
          player.muted = true;
          player.play().catch(() => {});
        });
      }
      closeBtn.focus();
    }

    function closeVideo() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      player.pause();
      player.removeAttribute("src");
      player.load();
      if (lastFocused) lastFocused.focus();
    }

    document.addEventListener("open-video-modal", (e) => {
      openVideo(e.detail && e.detail.src, e.detail && e.detail.label);
    });

    closeBtn.addEventListener("click", closeVideo);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeVideo();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) {
        // Registered before initProjectModals' Escape handler (see init()),
        // so this fires first — stop it here to avoid also closing the
        // project modal underneath in the same keystroke.
        e.stopImmediatePropagation();
        closeVideo();
      }
    });
  }

  /* ---------------------------------------------------------------------------
     Module: experiments calendar
     Opens a lightweight preview modal for each populated calendar day. Reads
     content straight off the button's data-* attributes, so new days can be
     added to experiments.html without touching this file.
  --------------------------------------------------------------------------- */
  function initProjectModals() {
    const cards   = document.querySelectorAll(".work-card[data-project]");
    const overlay = document.getElementById("project-modal");
    if (!cards.length || !overlay) return;

    const closeBtn  = overlay.querySelector(".modal__close");
    const titleEl   = overlay.querySelector("#modal-title");
    const heroEl    = overlay.querySelector(".modal__hero");
    const bodyEl    = overlay.querySelector(".modal__body");
    const contentEl = overlay.querySelector(".modal__content");

    let lastFocused = null;

    const linkEl = overlay.querySelector("[data-link-el]");
    const linkCard = overlay.querySelector("#modal-link-card");

    const videoEl = overlay.querySelector("[data-video-link]");
    const videoCard = overlay.querySelector("#modal-video-card");

    const qrCard = overlay.querySelector("#modal-qr-card");
    const qrImgEl = overlay.querySelector("[data-qr-img]");
    const qrCaptionEl = overlay.querySelector("[data-qr-caption]");
    const qrLinkEl = overlay.querySelector("[data-qr-link]");

    function openModal(id) {
      const data = PROJECTS[id];
      if (!data) return;

      // Sidebar title
      titleEl.textContent = data.name;

      // Sidebar meta fields — show optional rows only when non-empty
      overlay.querySelectorAll("[data-field]").forEach((el) => {
        const value = data.meta[el.dataset.field] || "";
        el.textContent = value;
        const row = el.closest("[data-optional]");
        if (row) row.classList.toggle("is-visible", !!value);
      });

      // Sidebar project link card
      if (linkCard && linkEl) {
        if (data.link) {
          linkEl.href = data.link.href;
          linkEl.textContent = data.link.label;
          linkCard.hidden = false;
        } else {
          linkCard.hidden = true;
        }
      }

      // Sidebar process video card
      if (videoCard && videoEl) {
        if (data.video) {
          videoEl.href = data.video.href || "#";
          videoEl.textContent = data.video.label;
          videoEl.dataset.videoSrc = data.video.src || "";
          // target="_blank" is only appropriate for a real external link —
          // when we open an in-page video lightbox instead, drop it, since
          // some browsers begin the new-tab navigation before our JS
          // click handler's preventDefault() can cancel it.
          if (data.video.src) {
            videoEl.removeAttribute("target");
            videoEl.removeAttribute("rel");
          } else {
            videoEl.setAttribute("target", "_blank");
            videoEl.setAttribute("rel", "noopener");
          }
          videoCard.hidden = false;
        } else {
          videoCard.hidden = true;
          videoEl.dataset.videoSrc = "";
        }
      }

      // Sidebar live product / QR card
      if (qrCard && qrImgEl && qrCaptionEl && qrLinkEl) {
        if (data.qr) {
          qrImgEl.src = data.qr.image;
          qrImgEl.alt = data.qr.alt || "";
          qrCaptionEl.textContent = data.qr.caption || "";
          qrLinkEl.href = data.qr.downloadHref;
          qrLinkEl.textContent = data.qr.downloadLabel;
          qrCard.hidden = false;
        } else {
          qrCard.hidden = true;
        }
      }

      // Content hero + body
      heroEl.innerHTML = data.image
        ? `<img class="modal__hero-img" src="${data.image}" alt="${data.name}" />`
        : "";
      bodyEl.innerHTML = data.body || "";

      // Wire up old-app hover preview if present in this modal
      const hoverTrigger = bodyEl.querySelector(".cs-old-app-hover__trigger");
      if (hoverTrigger) {
        const fp = document.createElement("div");
        fp.className = "cs-hover-preview";
        fp.innerHTML = `<img src="${hoverTrigger.dataset.previewSrc}" alt="" />`;
        document.body.appendChild(fp);

        hoverTrigger.addEventListener("mouseenter", () => fp.classList.add("is-visible"));
        hoverTrigger.addEventListener("mouseleave", () => fp.classList.remove("is-visible"));
        hoverTrigger.addEventListener("mousemove", (e) => {
          const w = 340, gap = 20;
          let left = e.clientX + gap;
          let top  = e.clientY - 180;
          if (left + w > window.innerWidth - 16) left = e.clientX - w - gap;
          if (top < 16) top = e.clientY + gap;
          fp.style.left = left + "px";
          fp.style.top  = top  + "px";
        });

        // Stash reference so closeModal can remove it
        overlay._hoverPreview = fp;
      }

      contentEl.scrollTop = 0;
      document.body.classList.add("js-body-locked");
      overlay.removeAttribute("aria-hidden");
      overlay.classList.add("is-open");
      closeBtn.focus();
    }

    function closeModal() {
      overlay.classList.remove("is-open");
      document.body.classList.remove("js-body-locked");
      overlay.setAttribute("aria-hidden", "true");
      if (overlay._hoverPreview) {
        overlay._hoverPreview.remove();
        overlay._hoverPreview = null;
      }
      if (lastFocused) lastFocused.focus();
    }

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        lastFocused = card;
        openModal(card.dataset.project);
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          lastFocused = card;
          openModal(card.dataset.project);
        }
      });
    });

    closeBtn.addEventListener("click", closeModal);

    // Open the process video in a lightbox instead of navigating away,
    // when the current project provides a local video src.
    if (videoEl) {
      videoEl.addEventListener("click", (e) => {
        const src = videoEl.dataset.videoSrc;
        if (!src) return;
        e.preventDefault();
        document.dispatchEvent(
          new CustomEvent("open-video-modal", {
            detail: { src, label: videoEl.textContent },
          })
        );
      });
    }

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  /* ---------------------------------------------------------------------------
     Generic hover-preview (profile page bio images + any [data-hover-preview])
  --------------------------------------------------------------------------- */
  function initHoverPreviews() {
    // No hover on touch-only devices
    if (window.matchMedia("(hover: none)").matches) return;

    const triggers = document.querySelectorAll("[data-hover-preview]");
    if (!triggers.length) return;

    const fp = document.createElement("div");
    fp.className = "cs-hover-preview";
    const fpImg = document.createElement("img");
    fpImg.alt = "";
    fp.appendChild(fpImg);
    document.body.appendChild(fp);

    triggers.forEach((trigger) => {
      trigger.addEventListener("mouseenter", () => {
        fpImg.src = trigger.dataset.hoverPreview;
        fp.classList.add("is-visible");
      });
      trigger.addEventListener("mouseleave", () => {
        fp.classList.remove("is-visible");
      });
      trigger.addEventListener("mousemove", (e) => {
        const w = fp.offsetWidth || 380;
        const gap = 20;
        let left = e.clientX + gap;
        let top  = e.clientY - 160;
        if (left + w > window.innerWidth - 16) left = e.clientX - w - gap;
        if (top < 16) top = e.clientY + gap;
        fp.style.left = left + "px";
        fp.style.top  = top  + "px";
      });
    });
  }

  /* ---------------------------------------------------------------------------
     Bootstrap
  --------------------------------------------------------------------------- */
  function init() {
    initMarquee(document.querySelector("[data-marquee]"));
    initNavToggle(document.querySelector(".nav-toggle"));
    initReveal(Array.from(document.querySelectorAll("[data-reveal]")));
    initWorkCards();
    initVideoModal();
    initProjectModals();
    initHoverPreviews();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
