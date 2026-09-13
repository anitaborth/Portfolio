/**
 * ScrollVelocity — vanilla JS port of React Bits' ScrollVelocity.
 * Reference: https://www.reactbits.dev/
 * Original source: react-bits — src/content/TextAnimations/ScrollVelocity/
 *   ScrollVelocity.jsx + ScrollVelocity.css
 *
 * The original is built on Motion's (Framer Motion) useScroll/useVelocity/
 * useSpring/useTransform/useAnimationFrame motion-value graph. None of that
 * is available here (no React, no Motion), so this reproduces the same
 * math by hand, following the same approach already used for this
 * project's other React Bits ports (FlowingMenu, SplitText):
 *   - window.scrollY sampled every rAF tick instead of useScroll
 *   - a hand-rolled critically-damped spring integrator (semi-implicit
 *     Euler, same damping/stiffness constants as the original defaults)
 *     instead of useSpring, to smooth the raw scroll velocity
 *   - the exact same velocityMapping / wrap() / direction-flip / inertia
 *     formula as the original's useAnimationFrame callback, just run from
 *     a plain requestAnimationFrame loop instead of Motion's frame loop
 *   - CSS transform (translate3d) applied directly instead of a motion
 *     value bound to a <motion.div>
 *   - visibilitychange pause + resize-driven copy-count recalculation,
 *     matching the perf/cleanup conventions used by splashCursor.js and
 *     flowing-menu.js
 *
 * Usage:
 *   <div class="open-to-work-banner"></div>
 *   ScrollVelocity.init({ selector: ".open-to-work-banner", text: "OPEN TO WORK ✦", velocity: 100 });
 *
 * This file also auto-runs the default banner setup once the DOM is ready,
 * so in the common case (the "Open to Work" banner) you don't need to call
 * it yourself. Call it manually for any additional/custom instance.
 */
(function () {
  'use strict';

  var DEFAULTS = {
    text: 'OPEN TO WORK ✦',
    velocity: 100, // px/sec base scroll speed
    damping: 50,
    stiffness: 400,
    velocityMapping: { input: [0, 1000], output: [0, 5] },
    minCopies: 6 // same floor as the original component's numCopies default
  };

  function wrap(min, max, v) {
    var range = max - min;
    var mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  function mapRange(value, inMin, inMax, outMin, outMax) {
    if (inMax === inMin) return outMin;
    var t = (value - inMin) / (inMax - inMin);
    return outMin + t * (outMax - outMin);
  }

  function createInstance(el, options) {
    el.innerHTML = '';
    el.classList.add('sv-parallax');

    var scroller = document.createElement('div');
    scroller.className = 'sv-scroller';
    el.appendChild(scroller);

    var copies = [];

    function buildCopies(count) {
      while (copies.length < count) {
        var span = document.createElement('span');
        span.className = 'sv-copy';
        span.textContent = options.text + ' ';
        scroller.appendChild(span);
        copies.push(span);
      }
      while (copies.length > count) {
        scroller.removeChild(copies.pop());
      }
    }

    var copyWidth = 0;

    function recalculate() {
      buildCopies(options.minCopies);
      copyWidth = copies[0] ? copies[0].offsetWidth : 0;
      if (!copyWidth) return;
      var needed = Math.ceil((el.offsetWidth + copyWidth) / copyWidth) + 1;
      buildCopies(Math.max(options.minCopies, needed));
      copyWidth = copies[0].offsetWidth;
    }

    // --- scroll velocity tracking (replaces Motion's useScroll/useVelocity) ---
    var lastScrollY = window.scrollY;
    var lastTime = null;
    var springVelocity = 0; // smoothed value (replaces useSpring output)
    var springAccel = 0; // spring's own internal velocity term

    // --- animation state (replaces baseX / directionFactor / useAnimationFrame) ---
    var posX = 0;
    var direction = options.velocity < 0 ? -1 : 1;
    var baseVelocity = Math.abs(options.velocity);
    var rafId = null;
    var running = false;

    function tick(now) {
      if (!running) return;
      if (lastTime === null) lastTime = now;
      var dt = (now - lastTime) / 1000;
      dt = Math.min(dt, 1 / 30); // guard against huge gaps (e.g. tab was throttled)
      lastTime = now;

      var scrollY = window.scrollY;
      var rawVelocity = dt > 0 ? (scrollY - lastScrollY) / dt : 0;
      lastScrollY = scrollY;

      // Semi-implicit Euler spring: pulls springVelocity toward rawVelocity,
      // same damping/stiffness roles as Motion's useSpring(scrollVelocity, {damping, stiffness}).
      var stiffness = options.stiffness;
      var damping = options.damping;
      springAccel += (stiffness * (rawVelocity - springVelocity) - damping * springAccel) * dt;
      springVelocity += springAccel * dt;

      var mapping = options.velocityMapping;
      var velocityFactor = mapRange(
        springVelocity,
        mapping.input[0],
        mapping.input[1],
        mapping.output[0],
        mapping.output[1]
      );

      if (velocityFactor < 0) direction = -1;
      else if (velocityFactor > 0) direction = 1;

      var moveBy = direction * baseVelocity * dt;
      moveBy += direction * moveBy * velocityFactor;
      posX += moveBy;

      if (copyWidth > 0) {
        var x = wrap(-copyWidth, 0, posX);
        scroller.style.transform = 'translate3d(' + x + 'px, 0, 0)';
      }

      rafId = requestAnimationFrame(tick);
    }

    function start() {
      if (running) return;
      running = true;
      lastTime = null;
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

    recalculate();
    window.addEventListener('resize', recalculate);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    start();

    return {
      destroy: function () {
        stop();
        window.removeEventListener('resize', recalculate);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
  }

  function init(userOptions) {
    var options = Object.assign({}, DEFAULTS, userOptions || {});
    options.velocityMapping = Object.assign(
      {},
      DEFAULTS.velocityMapping,
      (userOptions && userOptions.velocityMapping) || {}
    );

    var instances = [];
    document.querySelectorAll(options.selector).forEach(function (el) {
      instances.push(createInstance(el, options));
    });
    return instances;
  }

  window.ScrollVelocity = { init: init };

  function autoInit() {
    if (document.querySelector('.open-to-work-banner')) {
      init({ selector: '.open-to-work-banner', text: 'OPEN TO WORK ✦', velocity: 100 });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})();
