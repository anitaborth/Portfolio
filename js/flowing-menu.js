/**
 * Flowing Menu — vanilla JS/GSAP port of React Bits' FlowingMenu.
 * Reference: https://www.reactbits.dev/tools/background-studio
 * Original source: react-bits — src/content/Components/FlowingMenu/
 *   FlowingMenu.jsx + FlowingMenu.css
 *
 * What changed to make it framework-free:
 *   - No React import, no JSX, no hooks (useState/useRef/useEffect) — the
 *     whole menu is built with document.createElement calls from the
 *     menuItems array below, and per-item state (repetitions, the running
 *     GSAP tween) lives in a plain object per item instead of refs/state.
 *   - The mouseenter/mouseleave "closest edge" GSAP timeline and the
 *     infinite horizontal marquee tween are carried over unchanged —
 *     same easing ('expo'), same duration (0.6s), same edge-detection math.
 *   - Colors/typography are fixed in css/flowing-menu.css instead of being
 *     passed as component props, since this is a single, one-off instance
 *     rather than a reusable component.
 *   - The only element-level style set from JS is the per-item hover image
 *     (--fm-item-image custom property), since that's genuinely per-item
 *     data — everything else lives in the stylesheet, not inline styles.
 */
(function () {
  'use strict';

  /* `images` cycles across the marquee's repetitions, so a hovered item shows
     several stills rather than the same one four times. Profile carries the
     two photographs from its own hero, Work the project strips from
     work.html, and the last two a gradient each — built as SVG, so they scale
     to whatever the marquee gives them. */
  var menuItems = [
    {
      title: 'Profile',
      link: 'profile.html',
      images: ['assets/me.png', 'assets/compu.png']
    },
    {
      title: 'Work',
      link: 'work.html',
      images: [
        'assets/morpheus.png',
        'assets/amalgama.png',
        'assets/preguntados.png',
        'assets/orion/work-orion.png',
        'assets/arredo.png'
      ]
    },
    {
      title: 'Experiments',
      link: 'experiments.html',
      images: ['assets/gradient-experiments.svg']
    },
    {
      title: 'Resume',
      link: 'resume.html',
      images: ['assets/gradient-resume.svg']
    }
  ];

  var SPEED = 15; // seconds per full marquee loop — matches the original default
  var HOVER_ANIMATION_DEFAULTS = { duration: 0.6, ease: 'expo' };
  var MIN_REPETITIONS = 4;

  function distMetric(x, y, x2, y2) {
    var xDiff = x - x2;
    var yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  }

  function findClosestEdge(mouseX, mouseY, width, height) {
    var topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    var bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  }

  function buildMarqueePart(title, image) {
    var part = document.createElement('div');
    part.className = 'fm-marquee__part';

    var span = document.createElement('span');
    span.textContent = title;
    part.appendChild(span);

    var img = document.createElement('div');
    img.className = 'fm-marquee__img';
    // Left unset when the item has no artwork: the stylesheet then falls back
    // to the rounded swatch, rather than pointing at a file that is not there.
    //
    // Resolved to an absolute URL first. This custom property is consumed by
    // background-image in css/flowing-menu.css, and a relative url() inside a
    // stylesheet resolves against the stylesheet — "assets/x.png" would be
    // looked for in css/assets/. Going through document.baseURI also keeps it
    // correct when the site is served from a subpath.
    if (image) {
      img.style.setProperty(
        '--fm-item-image',
        'url("' + new URL(image, document.baseURI).href + '")'
      );
    }
    part.appendChild(img);

    return part;
  }

  function createMenuItem(item) {
    var li = document.createElement('div');
    li.className = 'fm-menu__item';

    var link = document.createElement('a');
    link.className = 'fm-menu__item-link';
    link.href = item.link;
    link.textContent = item.title;

    var marquee = document.createElement('div');
    marquee.className = 'fm-marquee';

    var marqueeInnerWrap = document.createElement('div');
    marqueeInnerWrap.className = 'fm-marquee__inner-wrap';

    var marqueeInner = document.createElement('div');
    marqueeInner.className = 'fm-marquee__inner';
    marqueeInner.setAttribute('aria-hidden', 'true');

    var images = item.images || [];
    for (var i = 0; i < MIN_REPETITIONS; i++) {
      var image = images.length ? images[i % images.length] : null;
      marqueeInner.appendChild(buildMarqueePart(item.title, image));
    }

    marqueeInnerWrap.appendChild(marqueeInner);
    marquee.appendChild(marqueeInnerWrap);
    li.appendChild(link);
    li.appendChild(marquee);

    var state = {
      el: li,
      link: link,
      marquee: marquee,
      marqueeInner: marqueeInner,
      scrollTween: null
    };

    function calculateRepetitions() {
      var part = marqueeInner.querySelector('.fm-marquee__part');
      if (!part) return;
      var contentWidth = part.offsetWidth;
      if (!contentWidth) return;
      var viewportWidth = window.innerWidth;
      var needed = Math.ceil(viewportWidth / contentWidth) + 2;
      var target = Math.max(MIN_REPETITIONS, needed);

      var current = marqueeInner.querySelectorAll('.fm-marquee__part').length;
      while (current < target) {
        marqueeInner.appendChild(buildMarqueePart(item.title, item.image));
        current++;
      }
      while (current > target) {
        marqueeInner.removeChild(marqueeInner.lastChild);
        current--;
      }
    }

    function setupScrollTween() {
      if (typeof gsap === 'undefined') return;
      var part = marqueeInner.querySelector('.fm-marquee__part');
      if (!part) return;
      var contentWidth = part.offsetWidth;
      if (!contentWidth) return;

      if (state.scrollTween) state.scrollTween.kill();
      state.scrollTween = gsap.to(marqueeInner, {
        x: -contentWidth,
        duration: SPEED,
        ease: 'none',
        repeat: -1
      });
    }

    function refreshMarquee() {
      calculateRepetitions();
      // Same 50ms warm-up as the original, so layout has settled before
      // measuring content width for both the repetition count and the tween.
      setTimeout(setupScrollTween, 50);
    }

    refreshMarquee();
    window.addEventListener('resize', refreshMarquee);

    function handleMouseEnter(ev) {
      if (typeof gsap === 'undefined') return;
      var rect = li.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;
      var edge = findClosestEdge(x, y, rect.width, rect.height);

      gsap
        .timeline({ defaults: HOVER_ANIMATION_DEFAULTS })
        .set(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
        .set(marqueeInner, { y: edge === 'top' ? '101%' : '-101%' }, 0)
        .to([marquee, marqueeInner], { y: '0%' }, 0);
    }

    function handleMouseLeave(ev) {
      if (typeof gsap === 'undefined') return;
      var rect = li.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;
      var edge = findClosestEdge(x, y, rect.width, rect.height);

      gsap
        .timeline({ defaults: HOVER_ANIMATION_DEFAULTS })
        .to(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
        .to(marqueeInner, { y: edge === 'top' ? '101%' : '-101%' }, 0);
    }

    link.addEventListener('mouseenter', handleMouseEnter);
    link.addEventListener('mouseleave', handleMouseLeave);

    return li;
  }

  function init() {
    var root = document.getElementById('fm-menu-root');
    if (!root) return;

    if (typeof gsap === 'undefined') {
      console.warn('[flowing-menu] GSAP did not load — menu will render without the hover/marquee animation.');
    }

    root.classList.add('fm-menu-wrap');

    var container = document.createElement('div');
    container.className = 'fm-menu-container';

    var nav = document.createElement('nav');
    nav.className = 'fm-menu';
    nav.setAttribute('aria-label', 'Primary');

    menuItems.forEach(function (item) {
      nav.appendChild(createMenuItem(item));
    });

    container.appendChild(nav);
    root.appendChild(container);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
