/**
 * VariableProximity — vanilla JS port of React Bits' VariableProximity.
 * Reference: https://www.reactbits.dev/
 * Original source: react-bits — src/content/TextAnimations/VariableProximity/
 *   VariableProximity.jsx + VariableProximity.css
 *
 * The original is built on React refs/hooks and Motion's `motion.span` +
 * useAnimationFrame. Neither is available here (no React, no Motion — per
 * the project's constraints), so this reproduces the same behavior by hand,
 * following the same approach as this project's other React Bits ports
 * (flowing-menu.js, splitText.js, scrollVelocity.js):
 *   - A recursive DOM walker (same shape as splitText.js's splitNode) wraps
 *     each word in a <span class="vp-word"> (inline-block, nowrap — this is
 *     what keeps words intact and preserves responsive wrapping/line breaks)
 *     and each letter inside it in <span class="vp-letter">, instead of
 *     splitting a plain `label` string prop.
 *   - Mouse/touch position is tracked exactly like the original's
 *     useMousePositionRef, relative to the target element's own
 *     getBoundingClientRect (used as both the split container and the
 *     proximity container, since this component's simplified API only
 *     takes a selector — no separate containerRef).
 *   - The rAF loop skips all work when the mouse hasn't moved since the
 *     last frame (identical short-circuit to the original), and — to avoid
 *     layout thrashing beyond that — reads every letter's rect first and
 *     only writes style.fontVariationSettings afterwards, and skips the
 *     write entirely for letters whose computed value hasn't changed.
 *   - Same calculateDistance/calculateFalloff formulas (linear / exponential
 *     / gaussian) and the same fromFontVariationSettings/
 *     toFontVariationSettings axis-parsing + interpolation as the original.
 *
 * IMPORTANT — this project's Switzer is loaded as five separate static
 * weight files (300/400/500/600/700; see the @font-face rules in
 * styles.css), not a single variable-font file with a "wght" axis. Setting
 * font-variation-settings on a static font has no visual effect, since
 * there's no axis to interpolate. To still produce a real, visible effect
 * today, this module ALSO snaps `font-weight` to the nearest of Switzer's
 * five available static weights using the same distance/falloff value —
 * that fallback is coarse (5 steps) rather than perfectly smooth, but it's
 * genuinely visible with the fonts currently installed. font-variation-
 * settings is still applied every frame alongside it: the moment an actual
 * Switzer Variable font file is added, the interpolation becomes smooth
 * automatically with no code changes.
 *
 * Usage:
 *   <h1 class="vp-hero">Curated Work</h1>
 *   VariableProximity.init({ selector: ".vp-hero", radius: 120 });
 *
 * This file also auto-runs against ".vp-hero" once the DOM is ready (same
 * auto-init convention as splitText.js/".split-text"), so the Work and
 * Profile hero headings need nothing beyond the class + these two files.
 */
(function () {
  'use strict';

  var DEFAULTS = {
    fromFontVariationSettings: "'wght' 400",
    toFontVariationSettings: "'wght' 700",
    radius: 120,
    falloff: 'gaussian' // 'linear' | 'exponential' | 'gaussian'
  };

  // Switzer's available static instances (see styles.css @font-face rules) —
  // used only for the font-weight fallback described above.
  var AVAILABLE_STATIC_WEIGHTS = [300, 400, 500, 600, 700];

  function nearestStaticWeight(value) {
    var closest = AVAILABLE_STATIC_WEIGHTS[0];
    var closestDiff = Math.abs(value - closest);
    for (var i = 1; i < AVAILABLE_STATIC_WEIGHTS.length; i++) {
      var diff = Math.abs(value - AVAILABLE_STATIC_WEIGHTS[i]);
      if (diff < closestDiff) {
        closest = AVAILABLE_STATIC_WEIGHTS[i];
        closestDiff = diff;
      }
    }
    return closest;
  }

  function parseFontVariationSettings(str) {
    return str
      .split(',')
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean)
      .map(function (s) {
        var parts = s.split(' ');
        return { axis: parts[0].replace(/['"]/g, ''), value: parseFloat(parts[1]) };
      });
  }

  function buildAxisPairs(fromStr, toStr) {
    var fromSettings = parseFontVariationSettings(fromStr);
    var toSettings = parseFontVariationSettings(toStr);
    return fromSettings.map(function (entry) {
      var match = toSettings.filter(function (t) {
        return t.axis === entry.axis;
      })[0];
      return { axis: entry.axis, fromValue: entry.value, toValue: match ? match.value : entry.value };
    });
  }

  // --- text splitting (same recursive shape as splitText.js's splitNode) ---
  function splitTextNode(textNode, letters) {
    var text = textNode.textContent;
    if (!text) return;
    var parent = textNode.parentNode;
    var frag = document.createDocumentFragment();

    // Split into whitespace-vs-word tokens, keeping the whitespace runs as
    // plain text so spacing/wrapping between words is completely untouched.
    var tokens = text.split(/(\s+)/);
    tokens.forEach(function (token) {
      if (token === '') return;
      if (/^\s+$/.test(token)) {
        frag.appendChild(document.createTextNode(token));
        return;
      }
      var wordSpan = document.createElement('span');
      wordSpan.className = 'vp-word';
      Array.from(token).forEach(function (ch) {
        var letterSpan = document.createElement('span');
        letterSpan.className = 'vp-letter';
        letterSpan.setAttribute('aria-hidden', 'true');
        letterSpan.textContent = ch;
        wordSpan.appendChild(letterSpan);
        letters.push(letterSpan);
      });
      frag.appendChild(wordSpan);
    });

    parent.replaceChild(frag, textNode);
  }

  function splitNode(node, letters) {
    Array.prototype.slice.call(node.childNodes).forEach(function (child) {
      if (child.nodeType === Node.TEXT_NODE) {
        splitTextNode(child, letters);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        splitNode(child, letters);
      }
    });
  }

  function splitElement(el) {
    if (el.dataset.vpDone === 'true') return [];
    var originalText = el.textContent.trim();
    var letters = [];
    splitNode(el, letters);

    var srOnly = document.createElement('span');
    srOnly.className = 'vp-sr-only';
    srOnly.textContent = originalText;
    el.appendChild(srOnly);

    el.dataset.vpDone = 'true';
    return letters;
  }

  function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  function calculateFalloff(distance, radius, falloff) {
    var norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    switch (falloff) {
      case 'exponential':
        return norm * norm;
      case 'gaussian':
        return Math.exp(-Math.pow(distance / (radius / 2), 2) / 2);
      case 'linear':
      default:
        return norm;
    }
  }

  function createInstance(el, options) {
    var letters = splitElement(el);
    if (!letters.length) return null;

    var axisPairs = buildAxisPairs(options.fromFontVariationSettings, options.toFontVariationSettings);
    var restSettings = options.fromFontVariationSettings;

    var mouseX = -999999;
    var mouseY = -999999;
    var lastMouseX = null;
    var lastMouseY = null;
    var lastAppliedSettings = new Array(letters.length);
    var lastAppliedWeight = new Array(letters.length);
    var rafId = null;
    var running = false;

    function updateMousePosition(clientX, clientY) {
      var rect = el.getBoundingClientRect();
      mouseX = clientX - rect.left;
      mouseY = clientY - rect.top;
    }

    function handleMouseMove(ev) {
      updateMousePosition(ev.clientX, ev.clientY);
    }

    function handleTouchMove(ev) {
      var touch = ev.touches[0];
      if (touch) updateMousePosition(touch.clientX, touch.clientY);
    }

    function tick() {
      if (!running) return;

      if (lastMouseX !== mouseX || lastMouseY !== mouseY) {
        lastMouseX = mouseX;
        lastMouseY = mouseY;

        var containerRect = el.getBoundingClientRect();

        // Pass 1 — reads only (no style writes yet), avoids interleaving
        // layout reads with writes across letters (layout thrashing).
        var plan = letters.map(function (letterEl) {
          var rect = letterEl.getBoundingClientRect();
          var centerX = rect.left + rect.width / 2 - containerRect.left;
          var centerY = rect.top + rect.height / 2 - containerRect.top;
          var dist = calculateDistance(mouseX, mouseY, centerX, centerY);
          return { el: letterEl, dist: dist };
        });

        // Pass 2 — writes only.
        plan.forEach(function (item, index) {
          if (item.dist >= options.radius) {
            if (lastAppliedSettings[index] !== restSettings) {
              item.el.style.fontVariationSettings = restSettings;
              item.el.style.fontWeight = '';
              lastAppliedSettings[index] = restSettings;
              lastAppliedWeight[index] = null;
            }
            return;
          }

          var f = calculateFalloff(item.dist, options.radius, options.falloff);
          var settings = axisPairs
            .map(function (pair) {
              var value = pair.fromValue + (pair.toValue - pair.fromValue) * f;
              return "'" + pair.axis + "' " + value;
            })
            .join(', ');

          if (lastAppliedSettings[index] !== settings) {
            item.el.style.fontVariationSettings = settings;
            lastAppliedSettings[index] = settings;
          }

          // Graceful fallback for this project's static (non-variable)
          // Switzer files — see file header comment.
          var wghtPair = axisPairs.filter(function (p) {
            return p.axis === 'wght';
          })[0];
          if (wghtPair) {
            var targetWeight = nearestStaticWeight(wghtPair.fromValue + (wghtPair.toValue - wghtPair.fromValue) * f);
            if (lastAppliedWeight[index] !== targetWeight) {
              item.el.style.fontWeight = String(targetWeight);
              lastAppliedWeight[index] = targetWeight;
            }
          }
        });
      }

      rafId = requestAnimationFrame(tick);
    }

    function start() {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    function handleVisibilityChange() {
      if (document.hidden) stop();
      else start();
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    start();

    return {
      destroy: function () {
        stop();
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
  }

  function init(userOptions) {
    var options = Object.assign({}, DEFAULTS, userOptions || {});
    var instances = [];
    document.querySelectorAll(options.selector).forEach(function (el) {
      var instance = createInstance(el, options);
      if (instance) instances.push(instance);
    });
    return instances;
  }

  window.VariableProximity = { init: init };

  function autoInit() {
    if (document.querySelector('.vp-hero')) {
      init({ selector: '.vp-hero', radius: 120 });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})();
