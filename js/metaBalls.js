/**
 * MetaBalls — vanilla JS port of React Bits' MetaBalls.
 * Reference: https://www.reactbits.dev/
 * Original source: react-bits — src/content/Animations/MetaBalls/
 *   MetaBalls.jsx + MetaBalls.css
 *
 * Like CircularGallery, the original component's actual effect (shader,
 * ball physics, pointer tracking, render loop) is already plain JS built
 * on OGL — only the outer React useRef/useEffect wrapper is React-specific.
 * This port:
 *   - keeps the parseHexColor/hash31/hash33 helpers, vertex/fragment
 *     shaders, and per-ball hashing/animation math verbatim, since that's
 *     what preserves "the same animation and interaction behavior" the
 *     task asked for
 *   - replaces the React mount/unmount wrapper with a plain
 *     MetaBalls.init(options) function, following the same reusable-module
 *     convention as this project's other React Bits ports (flowing-menu.js,
 *     splitText.js, scrollVelocity.js, variableProximity.js, masonry.js)
 *   - defaults color/cursorBallColor to #000000 rather than the original's
 *     #ffffff: the Profile hero this renders into has a white background
 *     (see .hero-zone in styles.css), so white balls with transparency
 *     would be invisible — dark balls keep the exact same shapes, motion,
 *     and mouse interaction while actually being visible on this page
 *
 * OGL doesn't ship on npm CDNs as a single bundled file — its own entry
 * point (src/index.js) is a barrel of ~20+ relative imports, which as a
 * static `import` becomes ~20+ separate chained network requests before
 * anything can render. Any one of those failing (flaky connection,
 * ad-blocker/extension rule, corporate proxy) silently breaks the whole
 * module graph with no visible error. Instead this loads jsDelivr's `+esm`
 * endpoint, which server-side-bundles the package into a single file (same
 * CDN, still no npm/bundler step) — and loads it via a dynamic `import()`
 * inside a try/catch so a failure shows a visible message in the container
 * instead of silently rendering nothing.
 *
 * Usage:
 *   <div class="metaballs-container"></div>
 *   MetaBalls.init({ selector: '.metaballs-container', ... });
 *
 * Auto-runs against every ".metaballs-container" element present in the
 * DOM once the module loads.
 */
const OGL_URL = 'https://cdn.jsdelivr.net/npm/ogl@1.0.11/+esm';
let Renderer, Program, Mesh, Triangle, Transform, Vec3, Camera;
let oglLoadPromise = null;
function loadOGL() {
  if (!oglLoadPromise) {
    oglLoadPromise = import(/* @vite-ignore */ OGL_URL).then((mod) => {
      ({ Renderer, Program, Mesh, Triangle, Transform, Vec3, Camera } = mod);
    });
  }
  return oglLoadPromise;
}

function showError(container, message) {
  container.innerHTML = '';
  const el = document.createElement('div');
  el.textContent = message;
  el.style.cssText =
    'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;' +
    'padding:1.25rem;text-align:center;color:#fff;background:#b91c1c;' +
    'font:13px/1.5 monospace;white-space:pre-wrap;';
  container.appendChild(el);
}

function parseHexColor(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  return [r, g, b];
}

function fract(x) {
  return x - Math.floor(x);
}

function hash31(p) {
  let r = [p * 0.1031, p * 0.103, p * 0.0973].map(fract);
  const r_yzx = [r[1], r[2], r[0]];
  const dotVal = r[0] * (r_yzx[0] + 33.33) + r[1] * (r_yzx[1] + 33.33) + r[2] * (r_yzx[2] + 33.33);
  for (let i = 0; i < 3; i++) {
    r[i] = fract(r[i] + dotVal);
  }
  return r;
}

function hash33(v) {
  let p = [v[0] * 0.1031, v[1] * 0.103, v[2] * 0.0973].map(fract);
  const p_yxz = [p[1], p[0], p[2]];
  const dotVal = p[0] * (p_yxz[0] + 33.33) + p[1] * (p_yxz[1] + 33.33) + p[2] * (p_yxz[2] + 33.33);
  for (let i = 0; i < 3; i++) {
    p[i] = fract(p[i] + dotVal);
  }
  const p_xxy = [p[0], p[0], p[1]];
  const p_yxx = [p[1], p[0], p[0]];
  const p_zyx = [p[2], p[1], p[0]];
  const result = [];
  for (let i = 0; i < 3; i++) {
    result[i] = fract((p_xxy[i] + p_yxx[i]) * p_zyx[i]);
  }
  return result;
}

const vertex = `#version 300 es
precision highp float;
layout(location = 0) in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMouse;
uniform vec3 iColor;
uniform vec3 iCursorColor;
uniform float iAnimationSize;
uniform int iBallCount;
uniform float iCursorBallSize;
uniform vec3 iMetaBalls[50];
uniform float iClumpFactor;
uniform bool enableTransparency;
out vec4 outColor;
const float PI = 3.14159265359;

float getMetaBallValue(vec2 c, float r, vec2 p) {
  vec2 d = p - c;
  float dist2 = dot(d, d);
  return (r * r) / dist2;
}

void main() {
  vec2 fc = gl_FragCoord.xy;
  float scale = iAnimationSize / iResolution.y;
  vec2 coord = (fc - iResolution.xy * 0.5) * scale;
  vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;
  float m1 = 0.0;
  for (int i = 0; i < 50; i++) {
    if (i >= iBallCount) break;
    m1 += getMetaBallValue(iMetaBalls[i].xy, iMetaBalls[i].z, coord);
  }
  float m2 = getMetaBallValue(mouseW, iCursorBallSize, coord);
  float total = m1 + m2;
  float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));
  vec3 cFinal = vec3(0.0);
  if (total > 0.0) {
    float alpha1 = m1 / total;
    float alpha2 = m2 / total;
    cFinal = iColor * alpha1 + iCursorColor * alpha2;
  }
  outColor = vec4(cFinal * f, enableTransparency ? f : 1.0);
}
`;

function createMetaBalls(container, options) {
  const {
    color,
    speed,
    enableMouseInteraction,
    hoverSmoothness,
    animationSize,
    ballCount,
    clumpFactor,
    cursorBallSize,
    cursorBallColor,
    enableTransparency
  } = options;

  const dpr = 1;
  const renderer = new Renderer({ dpr, alpha: true, premultipliedAlpha: false });
  const gl = renderer.gl;
  if (!renderer.isWebgl2) {
    // This effect's shaders are GLSL ES 300 (WebGL2-only) — OGL silently
    // falls back to a WebGL1 context when WebGL2 isn't available, which
    // fails shader compilation with no visible error beyond a console
    // warning, leaving the container looking like a plain colored box.
    // Surface a message directly in the page so this is diagnosable
    // without opening DevTools.
    console.warn('MetaBalls: WebGL2 is not available in this browser — the effect requires it and will not render.');
    showError(container, 'MetaBalls needs WebGL2, which this browser doesn\'t support (or has disabled).');
    return null;
  }
  gl.clearColor(0, 0, 0, enableTransparency ? 0 : 1);
  container.appendChild(gl.canvas);

  const camera = new Camera(gl, {
    left: -1,
    right: 1,
    top: 1,
    bottom: -1,
    near: 0.1,
    far: 10
  });
  camera.position.z = 1;

  const geometry = new Triangle(gl);
  const [r1, g1, b1] = parseHexColor(color);
  const [r2, g2, b2] = parseHexColor(cursorBallColor);

  const metaBallsUniform = [];
  for (let i = 0; i < 50; i++) {
    metaBallsUniform.push(new Vec3(0, 0, 0));
  }

  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new Vec3(0, 0, 0) },
      iMouse: { value: new Vec3(0, 0, 0) },
      iColor: { value: new Vec3(r1, g1, b1) },
      iCursorColor: { value: new Vec3(r2, g2, b2) },
      iAnimationSize: { value: animationSize },
      iBallCount: { value: ballCount },
      iCursorBallSize: { value: cursorBallSize },
      iMetaBalls: { value: metaBallsUniform },
      iClumpFactor: { value: clumpFactor },
      enableTransparency: { value: enableTransparency }
    }
  });

  const mesh = new Mesh(gl, { geometry, program });
  const scene = new Transform();
  mesh.setParent(scene);

  const maxBalls = 50;
  const effectiveBallCount = Math.min(ballCount, maxBalls);
  const ballParams = [];
  for (let i = 0; i < effectiveBallCount; i++) {
    const idx = i + 1;
    const h1 = hash31(idx);
    const st = h1[0] * (2 * Math.PI);
    const dtFactor = 0.1 * Math.PI + h1[1] * (0.4 * Math.PI - 0.1 * Math.PI);
    const baseScale = 5.0 + h1[1] * (10.0 - 5.0);
    const h2 = hash33(h1);
    const toggle = Math.floor(h2[0] * 2.0);
    const radiusVal = 0.5 + h2[2] * (2.0 - 0.5);
    ballParams.push({ st, dtFactor, baseScale, toggle, radius: radiusVal });
  }

  const mouseBallPos = { x: 0, y: 0 };
  let pointerInside = false;
  let pointerX = 0;
  let pointerY = 0;

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    // Guard against a 0×0 container (e.g. a layout/CSS timing race on
    // first paint) — skip rather than feeding NaN into the camera aspect;
    // the ResizeObserver below re-fires once the container has real size.
    if (!width || !height) return;
    renderer.setSize(width * dpr, height * dpr);
    gl.canvas.style.width = width + 'px';
    gl.canvas.style.height = height + 'px';
    program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, 0);
  }
  window.addEventListener('resize', resize);
  // Covers layout changes a window "resize" event won't fire for — the
  // container's own size settling late (CSS/font timing) or its clamp()-based
  // width changing without the viewport itself resizing.
  let resizeObserver;
  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
  }
  resize();

  function onPointerMove(e) {
    if (!enableMouseInteraction) return;
    const rect = container.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    pointerX = (px / rect.width) * gl.canvas.width;
    pointerY = (1 - py / rect.height) * gl.canvas.height;
  }
  function onPointerEnter() {
    if (!enableMouseInteraction) return;
    pointerInside = true;
  }
  function onPointerLeave() {
    if (!enableMouseInteraction) return;
    pointerInside = false;
  }
  container.addEventListener('pointermove', onPointerMove);
  container.addEventListener('pointerenter', onPointerEnter);
  container.addEventListener('pointerleave', onPointerLeave);

  const startTime = performance.now();
  let animationFrameId;
  function update(t) {
    animationFrameId = window.requestAnimationFrame(update);
    const elapsed = (t - startTime) * 0.001;
    program.uniforms.iTime.value = elapsed;

    for (let i = 0; i < effectiveBallCount; i++) {
      const p = ballParams[i];
      const dt = elapsed * speed * p.dtFactor;
      const th = p.st + dt;
      const x = Math.cos(th);
      const y = Math.sin(th + dt * p.toggle);
      const posX = x * p.baseScale * clumpFactor;
      const posY = y * p.baseScale * clumpFactor;
      metaBallsUniform[i].set(posX, posY, p.radius);
    }

    let targetX, targetY;
    if (pointerInside) {
      targetX = pointerX;
      targetY = pointerY;
    } else {
      const cx = gl.canvas.width * 0.5;
      const cy = gl.canvas.height * 0.5;
      const rx = gl.canvas.width * 0.15;
      const ry = gl.canvas.height * 0.15;
      targetX = cx + Math.cos(elapsed * speed) * rx;
      targetY = cy + Math.sin(elapsed * speed) * ry;
    }
    mouseBallPos.x += (targetX - mouseBallPos.x) * hoverSmoothness;
    mouseBallPos.y += (targetY - mouseBallPos.y) * hoverSmoothness;
    program.uniforms.iMouse.value.set(mouseBallPos.x, mouseBallPos.y, 0);

    renderer.render({ scene, camera });
  }
  animationFrameId = window.requestAnimationFrame(update);

  return {
    destroy() {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      resizeObserver?.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerenter', onPointerEnter);
      container.removeEventListener('pointerleave', onPointerLeave);
      if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
  };
}

const instances = new Map();

async function init(userOptions = {}) {
  const options = Object.assign(
    {
      selector: '.metaballs-container',
      // Black — the Profile hero has a white background (see .hero-zone in
      // styles.css), so white balls with transparency would be invisible.
      color: '#000000',
      speed: 0.3,
      enableMouseInteraction: true,
      hoverSmoothness: 0.05,
      animationSize: 30,
      ballCount: 15,
      clumpFactor: 1,
      cursorBallSize: 3,
      cursorBallColor: '#000000',
      enableTransparency: true
    },
    userOptions
  );

  const containers = document.querySelectorAll(options.selector);
  if (!containers.length) return [];

  try {
    await loadOGL();
  } catch (err) {
    console.error('MetaBalls: failed to load OGL from CDN', err);
    containers.forEach((container) =>
      showError(container, 'MetaBalls failed to load its WebGL library (OGL) from the CDN.\nCheck your network/ad-blocker and the console for details.')
    );
    return [];
  }

  const created = [];
  containers.forEach((container) => {
    if (instances.has(container)) {
      instances.get(container)?.destroy();
      instances.delete(container);
    }
    let instance = null;
    try {
      instance = createMetaBalls(container, options);
    } catch (err) {
      console.error('MetaBalls: failed to initialize', err);
      showError(container, 'MetaBalls failed to render.\nSee the console for details.');
    }
    if (instance) {
      instances.set(container, instance);
      created.push(instance);
    }
  });
  return created;
}

window.MetaBalls = { init };

function autoInit() {
  if (document.querySelector('.metaballs-container')) {
    init({ selector: '.metaballs-container' });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoInit);
} else {
  autoInit();
}
