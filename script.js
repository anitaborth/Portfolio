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
     Case-study section tabs
     Some case studies split their body into several sections shown as filter
     chips (Morpheus: general presentation / mobile app / website). Called after
     the modal body is injected, so it re-binds on every open.

     Pausing video on hidden panels matters: a <video> keeps playing audio when
     its container is display:none, which would otherwise bleed across tabs.
  --------------------------------------------------------------------------- */
  /* Start a muted loop video, retrying once it has buffered.
     Calling play() on a freshly injected <video> whose readyState is still 0
     rejects, and the browser does not honour the autoplay attribute for
     elements inserted via innerHTML after load — so without the retry the
     background videos sit frozen on their first frame. */
  function playWhenReady(video) {
    const attempt = () => {
      const p = video.play();
      return p && typeof p.catch === "function" ? p : null;
    };
    const p = attempt();
    if (p) {
      p.catch(() => {
        video.addEventListener("canplay", attempt, { once: true });
      });
    }
  }

  /* ---------------------------------------------------------------------------
     Morpheus carousel
     The cards ship their own rotateY/translateZ from the server, but three
     things came from the original page's bundle and are absent here: the
     --radius they are pushed out to, the ring's rotation, and a per-card
     opacity that fades the ones turning away. Without them the cards sit on
     too small a cylinder, motionless, at full opacity.

     Measured on the published page:
       radius   = stage width x 0.995
       rotation = a steady 9.5 deg/s; scrolling does not drive it
       opacity  = 0.55 + 0.45 * cos(angle), 0 once past 90 degrees
     The opacity formula reproduces every sampled card to three decimals.

     Opacity has to be recomputed every frame, not once: it depends on each
     card's angle plus the ring's current rotation. The ring can also be
     dragged, as on the original, which is what `cursor: grab` advertises.
  --------------------------------------------------------------------------- */
  function initMorpheusCarousel(root) {
    const stage = root.querySelector('[class*="MorpheusCarousel"][class*="stage"]');
    if (!stage) return;
    const ring = stage.querySelector('[class*="ring"]');
    if (!ring) return;

    const cards = Array.from(ring.children);
    if (!cards.length) return;

    const AUTO_DEG_PER_SEC = 9.5;
    const DRAG_DEG_PER_PX = 0.2;

    const baseAngle = cards.map((card) => {
      const m = (card.getAttribute("style") || "").match(/rotateY\((-?[\d.]+)deg\)/);
      return m ? parseFloat(m[1]) : 0;
    });

    let rotation = 0;
    let frame = null;
    let last = 0;
    let dragging = false;
    let dragX = 0;

    const sizeStage = () => {
      const w = stage.getBoundingClientRect().width;
      if (w) stage.style.setProperty("--radius", w * 0.995 + "px");
    };

    const paint = () => {
      ring.style.transform = "rotateY(" + rotation.toFixed(3) + "deg)";
      cards.forEach((card, i) => {
        const eff = ((((baseAngle[i] + rotation) % 360) + 540) % 360) - 180;
        const o = Math.abs(eff) >= 90 ? 0 : 0.55 + 0.45 * Math.cos((eff * Math.PI) / 180);
        card.style.opacity = Math.max(0, Math.min(1, o)).toFixed(3);
      });
    };

    const step = (now) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;  // cap after a stall
      last = now;
      if (!dragging) rotation += AUTO_DEG_PER_SEC * dt;
      paint();
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (frame === null && !prefersReducedMotion) {
        last = 0;
        frame = requestAnimationFrame(step);
      }
    };
    const stop = () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    };

    /* Drag to spin. pointer events cover mouse and touch alike; the stage
       declares touch-action: pan-y, so vertical scrolling still belongs to
       the page and only horizontal movement reaches us. */
    stage.addEventListener("pointerdown", (e) => {
      dragging = true;
      dragX = e.clientX;
      stage.style.cursor = "grabbing";
      stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      rotation += (e.clientX - dragX) * DRAG_DEG_PER_PX;
      dragX = e.clientX;
      paint();
    });
    const endDrag = (e) => {
      if (!dragging) return;
      dragging = false;
      stage.style.cursor = "";
      if (e.pointerId !== undefined && stage.hasPointerCapture(e.pointerId)) {
        stage.releasePointerCapture(e.pointerId);
      }
    };
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);

    sizeStage();
    paint();

    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(sizeStage).observe(stage);
    } else {
      window.addEventListener("resize", sizeStage);
    }

    // Spin only while the carousel is actually on screen.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => entries.forEach((e) => (e.isIntersecting ? start() : stop())),
        { root: root.closest(".modal__content"), rootMargin: "200px 0px" }
      ).observe(stage);
    } else {
      start();
    }
  }

  /* ---------------------------------------------------------------------------
     Morpheus takeaway marquee
     The two rows of drifting text at the end are moved by the original page's
     bundle, which writes a transform on every frame — there is no CSS
     animation to inherit, so without this they sit still.

     Each track holds its content duplicated exactly twice, so translating by
     one half and wrapping gives a seamless loop. Directions and speeds are the
     ones measured on the published page: the top row drifts left, the lower
     row right, at slightly different rates.
  --------------------------------------------------------------------------- */
  function initMorpheusMarquee(root) {
    const marquee = root.querySelector('[class*="takeawayMarquee"]');
    if (!marquee || prefersReducedMotion) return;

    const tracks = Array.from(marquee.querySelectorAll('[class*="__track"]'));
    if (!tracks.length) return;

    const SPEEDS = [-34, 26];   // px/s, measured on the published page

    const rows = tracks.map((track, i) => ({
      track,
      speed: SPEEDS[i] !== undefined ? SPEEDS[i] : i % 2 ? 26 : -34,
      offset: 0,
      span: track.offsetWidth / 2,
    }));

    let last = 0;
    let frame = null;

    const step = (now) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;  // cap after a stall
      last = now;

      rows.forEach((row) => {
        if (!row.span) return;
        let o = (row.offset + row.speed * dt) % row.span;
        if (o > 0) o -= row.span;            // keep it in (-span, 0]
        row.offset = o;
        row.track.style.transform = "translate3d(" + o.toFixed(2) + "px, 0, 0)";
      });

      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (frame === null) {
        last = 0;
        frame = requestAnimationFrame(step);
      }
    };
    const stop = () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    };

    window.addEventListener("resize", () => {
      rows.forEach((row) => { row.span = row.track.offsetWidth / 2; });
    });

    // Only run while it is actually on screen.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => entries.forEach((e) => (e.isIntersecting ? start() : stop())),
        { root: root.closest(".modal__content"), rootMargin: "200px 0px" }
      ).observe(marquee);
    } else {
      start();
    }
  }

  function initEmbedVideos(root) {
    const embed = root.querySelector(".cs-embed-morpheus");
    if (!embed || prefersReducedMotion) return;

    const videos = Array.from(embed.querySelectorAll("video"));
    if (!videos.length) return;

    const play = (v) => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    if (!("IntersectionObserver" in window)) {
      videos.forEach(play);
      return;
    }

    const scroller = root.closest(".modal__content");
    const inView = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            inView.add(entry.target);
            play(entry.target);
          } else {
            inView.delete(entry.target);
            if (!entry.target.paused) entry.target.pause();
          }
        });
      },
      { root: scroller, rootMargin: "200px 0px", threshold: 0.05 }
    );

    videos.forEach((v) => observer.observe(v));

    /* A hidden document (background tab, or a preview pane that is not being
       displayed) has its media suspended by the browser: play() resolves and
       the video is paused again immediately. Nothing restarts it on its own,
       so the ones still in view are resumed when the page comes back. */
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState !== "visible") return;
      inView.forEach((v) => {
        if (v.paused) play(v);
      });
    });
  }

  function initCaseStudyTabs(root) {
    const tablist = root.querySelector("[data-cs-tablist]");
    if (!tablist) return;

    const tabs   = Array.from(tablist.querySelectorAll("[data-cs-tab]"));
    const panels = Array.from(root.querySelectorAll("[data-cs-panel]"));
    if (!tabs.length || !panels.length) return;

    function select(name, { focus = false } = {}) {
      tabs.forEach((tab) => {
        const on = tab.dataset.csTab === name;
        tab.setAttribute("aria-selected", on ? "true" : "false");
        tab.tabIndex = on ? 0 : -1;
        if (on && focus) tab.focus();
      });

      panels.forEach((panel) => {
        const on = panel.dataset.csPanel === name;
        panel.hidden = !on;

        panel.querySelectorAll("video").forEach((v) => {
          if (!on) {
            // A <video> keeps playing (and keeps its audio) inside a
            // display:none container, so hidden panels must be paused.
            if (!v.paused) v.pause();
          } else if (v.autoplay && v.paused && !prefersReducedMotion) {
            // Re-arm the looping background videos we paused on the way out;
            // without this they stay frozen when the viewer comes back.
            playWhenReady(v);
          }
        });
      });
    }

    tablist.addEventListener("click", (e) => {
      const tab = e.target.closest("[data-cs-tab]");
      if (tab) select(tab.dataset.csTab);
    });

    // Roving-tabindex arrow-key navigation, per the WAI-ARIA tabs pattern.
    tablist.addEventListener("keydown", (e) => {
      const i = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
      if (i < 0) return;
      let next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      else if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === "Home") next = tabs[0];
      else if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) {
        e.preventDefault();
        select(next.dataset.csTab, { focus: true });
      }
    });

    const initial = tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0];
    select(initial.dataset.csTab);
  }

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

      // Wire up section tabs (filter chips) if this case study uses them
      initCaseStudyTabs(bodyEl);
      initMorpheusCarousel(bodyEl);
      initEmbedVideos(bodyEl);
      initMorpheusMarquee(bodyEl);

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
