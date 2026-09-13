/**
 * Masonry — vanilla JS port of React Bits' Masonry.
 * Reference: https://www.reactbits.dev/
 * Original source: react-bits — src/content/Components/Masonry/
 *   Masonry.jsx + Masonry.css
 *
 * The original component is really two things bundled together: (1) a
 * free-form column-packing layout engine (absolute-positioned items,
 * recalculated per breakpoint) and (2) a GSAP entrance/hover animation
 * treatment (fade + blur + slide-in on load, scale on hover). The
 * Experiments page needed only the second half — the task was explicit
 * about keeping the existing calendar's CSS Grid structure ("Replace only
 * the animation and interaction with the Masonry behavior"), not adopting
 * Masonry's own layout math. So this port:
 *   - keeps the entrance animation verbatim in spirit: per-item GSAP
 *     `fromTo` (opacity 0→1, blur(10px)→blur(0), translateY(+40px)→0),
 *     staggered by index, `power3.out` easing — matching the reference's
 *     `animateFrom: 'bottom'` + `blurToFocus` defaults
 *   - keeps the hover treatment (scale down slightly on mouseenter, back to
 *     1 on mouseleave) at a smaller, subtler scale than the reference's
 *     default (0.95) to match "keep hover interactions subtle and premium"
 *     for cards this size
 *   - drops the useMedia/useMeasure/column-packing engine entirely — the
 *     calendar's own CSS Grid (see .calendar__grid in styles.css) already
 *     positions every cell; this file only ever touches opacity/transform/
 *     filter, never layout
 *   - respects prefers-reduced-motion: skips both the entrance animation
 *     and the hover scale, leaving the CSS-only border/shadow hover in
 *     styles.css as the whole interaction in that case
 *
 * Uses GSAP from the same CDN script this project already loads on other
 * pages (see index.html) — regular classic script, not an ES module.
 *
 * Usage:
 *   Masonry.init({ selector: '.calendar__day' });
 *
 * Auto-runs against every ".calendar__day" element once the page's own
 * classic scripts run (this script itself uses `defer`, so the DOM is
 * already parsed by the time it executes).
 */
function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function init(userOptions = {}) {
  const options = Object.assign(
    {
      selector: '.calendar__day',
      stagger: 0.05,
      duration: 0.8,
      distance: 40,
      hoverScale: 0.96
    },
    userOptions
  );

  const items = Array.from(document.querySelectorAll(options.selector));
  if (!items.length) return;

  const reduced = prefersReducedMotion();
  const gsapAvailable = typeof window.gsap !== 'undefined';

  if (!reduced && gsapAvailable) {
    window.gsap.fromTo(
      items,
      {
        opacity: 0,
        y: options.distance,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: options.duration,
        ease: 'power3.out',
        stagger: options.stagger
      }
    );
  }

  if (reduced || !gsapAvailable) return;

  items.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      window.gsap.to(item, { scale: options.hoverScale, duration: 0.3, ease: 'power2.out' });
    });
    item.addEventListener('mouseleave', () => {
      window.gsap.to(item, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
  });
}

window.Masonry = { init };

function autoInit() {
  if (document.querySelector('.calendar__day')) {
    init({ selector: '.calendar__day' });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoInit);
} else {
  autoInit();
}
