/**
 * SplitText — vanilla JS/GSAP port of React Bits' SplitText.
 * Reference: https://www.reactbits.dev/
 * Original source: react-bits — src/content/TextAnimations/SplitText/SplitText.jsx
 *
 * The original relies on React state/refs, the paid GSAP "SplitText" plugin,
 * and GSAP ScrollTrigger. None of those are available here (no React, and
 * this project only loads the free GSAP core from a CDN), so this is a
 * from-scratch vanilla implementation that reproduces the same visual
 * result and the same animation settings (from/to values, ease, duration,
 * per-character stagger) using:
 *   - a small recursive DOM walker instead of the SplitText plugin, to wrap
 *     each non-space character in its own <span class="split-char">, while
 *     leaving existing markup (e.g. <strong>, <img>) exactly where it was —
 *     this is what "cleanly preserve the original HTML semantics" means here
 *   - a plain IntersectionObserver (threshold ~0.2) instead of React's
 *     lifecycle hooks + ScrollTrigger, disconnected right after the first
 *     (and only) time it fires
 *   - document.fonts.ready, gating the split until web fonts have loaded,
 *     same as the original
 *
 * Usage:
 *   <h1 class="split-text">Designing products that people actually enjoy using.</h1>
 *   SplitText.init(".split-text");
 *
 * This file also auto-runs SplitText.init(".split-text") once fonts are
 * ready, so in the common case you don't need to call it yourself — just
 * add the class. Call it manually with a different selector/options for
 * anything that needs a non-default setup.
 */
(function () {
  'use strict';

  var DEFAULTS = {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
    ease: 'power3.out',
    duration: 0.8,
    stagger: 0.04, // seconds between each character's start time
    threshold: 0.2, // ~20% of the element visible before it triggers
    rootMargin: '0px',
    onComplete: null
  };

  function whenFontsReady(cb) {
    if (!('fonts' in document)) {
      cb();
      return;
    }
    if (document.fonts.status === 'loaded') {
      cb();
    } else {
      document.fonts.ready.then(cb);
    }
  }

  // Recursively wraps every non-whitespace character in its own
  // <span class="split-char">, walking into child elements (rather than
  // flattening to textContent) so existing tags/attributes are untouched.
  function splitNode(node, charSpans) {
    Array.prototype.slice.call(node.childNodes).forEach(function (child) {
      if (child.nodeType === Node.TEXT_NODE) {
        var text = child.textContent;
        if (!text) return;
        var frag = document.createDocumentFragment();

        Array.prototype.forEach.call(Array.from(text), function (ch) {
          if (ch.trim() === '') {
            // Preserve spaces/newlines as plain text so normal word-wrap
            // and spacing keep working exactly as before.
            frag.appendChild(document.createTextNode(ch));
          } else {
            var span = document.createElement('span');
            span.className = 'split-char';
            span.setAttribute('aria-hidden', 'true');
            span.textContent = ch;
            frag.appendChild(span);
            charSpans.push(span);
          }
        });

        node.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        splitNode(child, charSpans);
      }
    });
  }

  function splitElement(el) {
    if (el.dataset.splitTextDone === 'true') return [];

    // Give assistive tech the original, unsplit text; the per-character
    // spans are marked aria-hidden above so they aren't announced twice.
    if (!el.hasAttribute('aria-label')) {
      el.setAttribute('aria-label', el.textContent.trim());
    }

    var charSpans = [];
    splitNode(el, charSpans);
    el.dataset.splitTextDone = 'true';
    return charSpans;
  }

  function animateElement(el, options) {
    var chars = splitElement(el);
    if (!chars.length) return;

    if (typeof gsap === 'undefined') {
      console.warn('[splitText] GSAP is not loaded — showing text without animation.');
      chars.forEach(function (span) {
        span.style.opacity = options.to.opacity;
        span.style.transform = 'translateY(' + options.to.y + 'px)';
      });
      return;
    }

    gsap.set(chars, { opacity: options.from.opacity, y: options.from.y });

    if (!('IntersectionObserver' in window)) {
      // No IntersectionObserver support: just animate immediately rather
      // than leaving the text permanently invisible.
      runAnimation();
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runAnimation();
            observer.unobserve(el);
            observer.disconnect();
          }
        });
      },
      { threshold: options.threshold, rootMargin: options.rootMargin }
    );
    observer.observe(el);

    function runAnimation() {
      gsap.to(chars, {
        opacity: options.to.opacity,
        y: options.to.y,
        duration: options.duration,
        ease: options.ease,
        stagger: options.stagger,
        onComplete: function () {
          el.classList.add('split-text--done');
          if (typeof options.onComplete === 'function') options.onComplete(el);
        }
      });
    }
  }

  function init(selector, userOptions) {
    var options = Object.assign({}, DEFAULTS, userOptions || {});
    options.from = Object.assign({}, DEFAULTS.from, (userOptions && userOptions.from) || {});
    options.to = Object.assign({}, DEFAULTS.to, (userOptions && userOptions.to) || {});

    whenFontsReady(function () {
      var elements = document.querySelectorAll(selector);
      elements.forEach(function (el) {
        animateElement(el, options);
      });
    });
  }

  window.SplitText = { init: init };

  function autoInit() {
    init('.split-text');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})();
