/**
 * Splash Cursor — vanilla JS / WebGL port of React Bits' SplashCursor.
 * Source reference: https://www.reactbits.dev/tools/background-studio?bg=splash-cursor
 * (React Bits, github.com/DavidHDev/react-bits — SplashCursor.jsx)
 *
 * This is a straight adaptation: all shader source, WebGL setup, and the
 * fluid-simulation step/render pipeline are carried over unchanged from the
 * original component. What changed to make it framework-free:
 *   - No React import, no JSX, no hooks (useEffect/useRef) — the effect is
 *     started by calling init() once the DOM is ready, and animationFrameId /
 *     the canvas element are plain closure variables instead of refs.
 *   - The component's props object becomes a plain CONFIG object below.
 *   - The wrapper <div>/<canvas> JSX becomes a canvas created and appended
 *     via document.createElement/appendChild. Positioning (fixed, full
 *     viewport, behind content, non-interactive) lives in css/splashCursor.css.
 *   - Colors: RAINBOW_MODE is off by default and generateColor() picks from
 *     a small palette of lighter/darker shades generated from the site's
 *     accent color (#957DE2) instead of a random hue — the only behavioral
 *     change from upstream, everything else in the simulation is untouched.
 *   - Added a page-visibility pause and a destroy() teardown (removes all
 *     listeners/rAF and the canvas) for efficiency and clean unmounting,
 *     since there's no framework to do that automatically.
 */
(function () {
  'use strict';

  var ACCENT_COLOR = '#957DE2';

  function hexToRgbInt(hex) {
    var val = hex.replace('#', '');
    if (val.length === 3) {
      val = val[0] + val[0] + val[1] + val[1] + val[2] + val[2];
    }
    return {
      r: parseInt(val.slice(0, 2), 16),
      g: parseInt(val.slice(2, 4), 16),
      b: parseInt(val.slice(4, 6), 16)
    };
  }

  function rgbIntToHex(r, g, b) {
    function clamp(n) {
      return Math.max(0, Math.min(255, Math.round(n)));
    }
    function toHex(n) {
      var h = clamp(n).toString(16);
      return h.length === 1 ? '0' + h : h;
    }
    return '#' + toHex(r) + toHex(g) + toHex(b);
  }

  // Lighten (percent > 0) or darken (percent < 0) a hex color by mixing
  // it toward white or black, keeping the same hue/feel as ACCENT_COLOR.
  function shadeHexColor(hex, percent) {
    var rgb = hexToRgbInt(hex);
    var amt = percent / 100;
    function mix(channel) {
      return amt >= 0 ? channel + (255 - channel) * amt : channel * (1 + amt);
    }
    return rgbIntToHex(mix(rgb.r), mix(rgb.g), mix(rgb.b));
  }

  var ACCENT_PALETTE = [
    shadeHexColor(ACCENT_COLOR, -45), // darker
    shadeHexColor(ACCENT_COLOR, -25), // dark
    ACCENT_COLOR, // base
    shadeHexColor(ACCENT_COLOR, 25), // light
    shadeHexColor(ACCENT_COLOR, 45) // lighter
  ];

  var DEFAULT_CONFIG = {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1440,
    CAPTURE_RESOLUTION: 512,
    DENSITY_DISSIPATION: 3.5,
    VELOCITY_DISSIPATION: 2,
    PRESSURE: 0.1,
    PRESSURE_ITERATIONS: 20,
    CURL: 3,
    SPLAT_RADIUS: 0.2,
    SPLAT_FORCE: 6000,
    SHADING: true,
    COLOR_UPDATE_SPEED: 10,
    BACK_COLOR: { r: 0.5, g: 0, b: 0 },
    TRANSPARENT: true,
    RAINBOW_MODE: false,
    COLOR: ACCENT_COLOR,
    PALETTE: ACCENT_PALETTE
  };

  var canvas = null;
  var animationFrameId = null;
  var isActive = false;
  var teardownFns = [];

  function init(userConfig) {
    if (canvas) return; // already running

    canvas = document.createElement('canvas');
    canvas.id = 'splash-cursor-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    isActive = true;

    function pointerPrototype() {
      this.id = -1;
      this.texcoordX = 0;
      this.texcoordY = 0;
      this.prevTexcoordX = 0;
      this.prevTexcoordY = 0;
      this.deltaX = 0;
      this.deltaY = 0;
      this.down = false;
      this.moved = false;
      this.color = [0, 0, 0];
    }

    var config = Object.assign({}, DEFAULT_CONFIG, userConfig);
    config.PAUSED = false;

    var pointers = [new pointerPrototype()];

    var glContext = getWebGLContext(canvas);
    var gl = glContext.gl;
    var ext = glContext.ext;
    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
    }

    function getWebGLContext(canvasEl) {
      var params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false
      };
      var glLocal = canvasEl.getContext('webgl2', params);
      var isWebGL2 = !!glLocal;
      if (!isWebGL2) {
        glLocal =
          canvasEl.getContext('webgl', params) ||
          canvasEl.getContext('experimental-webgl', params);
      }

      var halfFloat;
      var supportLinearFiltering;
      if (isWebGL2) {
        glLocal.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = glLocal.getExtension('OES_texture_float_linear');
      } else {
        halfFloat = glLocal.getExtension('OES_texture_half_float');
        supportLinearFiltering = glLocal.getExtension('OES_texture_half_float_linear');
      }
      glLocal.clearColor(0.0, 0.0, 0.0, 1.0);

      var halfFloatTexType = isWebGL2
        ? glLocal.HALF_FLOAT
        : halfFloat && halfFloat.HALF_FLOAT_OES;
      var formatRGBA;
      var formatRG;
      var formatR;

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(glLocal, glLocal.RGBA16F, glLocal.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(glLocal, glLocal.RG16F, glLocal.RG, halfFloatTexType);
        formatR = getSupportedFormat(glLocal, glLocal.R16F, glLocal.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(glLocal, glLocal.RGBA, glLocal.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(glLocal, glLocal.RGBA, glLocal.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(glLocal, glLocal.RGBA, glLocal.RGBA, halfFloatTexType);
      }

      return {
        gl: glLocal,
        ext: {
          formatRGBA: formatRGBA,
          formatRG: formatRG,
          formatR: formatR,
          halfFloatTexType: halfFloatTexType,
          supportLinearFiltering: supportLinearFiltering
        }
      };
    }

    function getSupportedFormat(glArg, internalFormat, format, type) {
      if (!supportRenderTextureFormat(glArg, internalFormat, format, type)) {
        switch (internalFormat) {
          case glArg.R16F:
            return getSupportedFormat(glArg, glArg.RG16F, glArg.RG, type);
          case glArg.RG16F:
            return getSupportedFormat(glArg, glArg.RGBA16F, glArg.RGBA, type);
          default:
            return null;
        }
      }
      return { internalFormat: internalFormat, format: format };
    }

    function supportRenderTextureFormat(glArg, internalFormat, format, type) {
      var texture = glArg.createTexture();
      glArg.bindTexture(glArg.TEXTURE_2D, texture);
      glArg.texParameteri(glArg.TEXTURE_2D, glArg.TEXTURE_MIN_FILTER, glArg.NEAREST);
      glArg.texParameteri(glArg.TEXTURE_2D, glArg.TEXTURE_MAG_FILTER, glArg.NEAREST);
      glArg.texParameteri(glArg.TEXTURE_2D, glArg.TEXTURE_WRAP_S, glArg.CLAMP_TO_EDGE);
      glArg.texParameteri(glArg.TEXTURE_2D, glArg.TEXTURE_WRAP_T, glArg.CLAMP_TO_EDGE);
      glArg.texImage2D(glArg.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      var fbo = glArg.createFramebuffer();
      glArg.bindFramebuffer(glArg.FRAMEBUFFER, fbo);
      glArg.framebufferTexture2D(glArg.FRAMEBUFFER, glArg.COLOR_ATTACHMENT0, glArg.TEXTURE_2D, texture, 0);
      var status = glArg.checkFramebufferStatus(glArg.FRAMEBUFFER);
      return status === glArg.FRAMEBUFFER_COMPLETE;
    }

    function Material(vertexShader, fragmentShaderSource) {
      this.vertexShader = vertexShader;
      this.fragmentShaderSource = fragmentShaderSource;
      this.programs = [];
      this.activeProgram = null;
      this.uniforms = [];
    }
    Material.prototype.setKeywords = function (keywords) {
      var hash = 0;
      for (var i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);
      var program = this.programs[hash];
      if (program == null) {
        var fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
        program = createProgram(this.vertexShader, fragmentShader);
        this.programs[hash] = program;
      }
      if (program === this.activeProgram) return;
      this.uniforms = getUniforms(program);
      this.activeProgram = program;
    };
    Material.prototype.bind = function () {
      gl.useProgram(this.activeProgram);
    };

    function Program(vertexShader, fragmentShader) {
      this.uniforms = {};
      this.program = createProgram(vertexShader, fragmentShader);
      this.uniforms = getUniforms(this.program);
    }
    Program.prototype.bind = function () {
      gl.useProgram(this.program);
    };

    function createProgram(vertexShader, fragmentShader) {
      var program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.trace(gl.getProgramInfoLog(program));
      }
      return program;
    }

    function getUniforms(program) {
      var uniforms = [];
      var uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (var i = 0; i < uniformCount; i++) {
        var uniformName = gl.getActiveUniform(program, i).name;
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
      }
      return uniforms;
    }

    function compileShader(type, source, keywords) {
      source = addKeywords(source, keywords);
      var shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.trace(gl.getShaderInfoLog(shader));
      }
      return shader;
    }

    function addKeywords(source, keywords) {
      if (!keywords) return source;
      var keywordsString = '';
      keywords.forEach(function (keyword) {
        keywordsString += '#define ' + keyword + '\n';
      });
      return keywordsString + source;
    }

    var baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      '\n        precision highp float;\n        attribute vec2 aPosition;\n        varying vec2 vUv;\n        varying vec2 vL;\n        varying vec2 vR;\n        varying vec2 vT;\n        varying vec2 vB;\n        uniform vec2 texelSize;\n\n        void main () {\n            vUv = aPosition * 0.5 + 0.5;\n            vL = vUv - vec2(texelSize.x, 0.0);\n            vR = vUv + vec2(texelSize.x, 0.0);\n            vT = vUv + vec2(0.0, texelSize.y);\n            vB = vUv - vec2(0.0, texelSize.y);\n            gl_Position = vec4(aPosition, 0.0, 1.0);\n        }\n      '
    );

    var copyShader = compileShader(
      gl.FRAGMENT_SHADER,
      '\n        precision mediump float;\n        precision mediump sampler2D;\n        varying highp vec2 vUv;\n        uniform sampler2D uTexture;\n\n        void main () {\n            gl_FragColor = texture2D(uTexture, vUv);\n        }\n      '
    );

    var clearShader = compileShader(
      gl.FRAGMENT_SHADER,
      '\n        precision mediump float;\n        precision mediump sampler2D;\n        varying highp vec2 vUv;\n        uniform sampler2D uTexture;\n        uniform float value;\n\n        void main () {\n            gl_FragColor = value * texture2D(uTexture, vUv);\n        }\n      '
    );

    var displayShaderSource =
      '\n      precision highp float;\n      precision highp sampler2D;\n      varying vec2 vUv;\n      varying vec2 vL;\n      varying vec2 vR;\n      varying vec2 vT;\n      varying vec2 vB;\n      uniform sampler2D uTexture;\n      uniform sampler2D uDithering;\n      uniform vec2 ditherScale;\n      uniform vec2 texelSize;\n\n      vec3 linearToGamma (vec3 color) {\n          color = max(color, vec3(0));\n          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));\n      }\n\n      void main () {\n          vec3 c = texture2D(uTexture, vUv).rgb;\n          #ifdef SHADING\n              vec3 lc = texture2D(uTexture, vL).rgb;\n              vec3 rc = texture2D(uTexture, vR).rgb;\n              vec3 tc = texture2D(uTexture, vT).rgb;\n              vec3 bc = texture2D(uTexture, vB).rgb;\n\n              float dx = length(rc) - length(lc);\n              float dy = length(tc) - length(bc);\n\n              vec3 n = normalize(vec3(dx, dy, length(texelSize)));\n              vec3 l = vec3(0.0, 0.0, 1.0);\n\n              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);\n              c *= diffuse;\n          #endif\n\n          float a = max(c.r, max(c.g, c.b));\n          gl_FragColor = vec4(c, a);\n      }\n    ';

    var splatShader = compileShader(
      gl.FRAGMENT_SHADER,
      '\n        precision highp float;\n        precision highp sampler2D;\n        varying vec2 vUv;\n        uniform sampler2D uTarget;\n        uniform float aspectRatio;\n        uniform vec3 color;\n        uniform vec2 point;\n        uniform float radius;\n\n        void main () {\n            vec2 p = vUv - point.xy;\n            p.x *= aspectRatio;\n            vec3 splat = exp(-dot(p, p) / radius) * color;\n            vec3 base = texture2D(uTarget, vUv).xyz;\n            gl_FragColor = vec4(base + splat, 1.0);\n        }\n      '
    );

    var advectionShader = compileShader(
      gl.FRAGMENT_SHADER,
      '\n        precision highp float;\n        precision highp sampler2D;\n        varying vec2 vUv;\n        uniform sampler2D uVelocity;\n        uniform sampler2D uSource;\n        uniform vec2 texelSize;\n        uniform vec2 dyeTexelSize;\n        uniform float dt;\n        uniform float dissipation;\n\n        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {\n            vec2 st = uv / tsize - 0.5;\n            vec2 iuv = floor(st);\n            vec2 fuv = fract(st);\n\n            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);\n            vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);\n            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);\n            vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);\n\n            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);\n        }\n\n        void main () {\n            #ifdef MANUAL_FILTERING\n                vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;\n                vec4 result = bilerp(uSource, coord, dyeTexelSize);\n            #else\n                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\n                vec4 result = texture2D(uSource, coord);\n            #endif\n            float decay = 1.0 + dissipation * dt;\n            gl_FragColor = result / decay;\n        }\n      ',
      ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']
    );

    var divergenceShader = compileShader(
      gl.FRAGMENT_SHADER,
      '\n        precision mediump float;\n        precision mediump sampler2D;\n        varying highp vec2 vUv;\n        varying highp vec2 vL;\n        varying highp vec2 vR;\n        varying highp vec2 vT;\n        varying highp vec2 vB;\n        uniform sampler2D uVelocity;\n\n        void main () {\n            float L = texture2D(uVelocity, vL).x;\n            float R = texture2D(uVelocity, vR).x;\n            float T = texture2D(uVelocity, vT).y;\n            float B = texture2D(uVelocity, vB).y;\n\n            vec2 C = texture2D(uVelocity, vUv).xy;\n            if (vL.x < 0.0) { L = -C.x; }\n            if (vR.x > 1.0) { R = -C.x; }\n            if (vT.y > 1.0) { T = -C.y; }\n            if (vB.y < 0.0) { B = -C.y; }\n\n            float div = 0.5 * (R - L + T - B);\n            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\n        }\n      '
    );

    var curlShader = compileShader(
      gl.FRAGMENT_SHADER,
      '\n        precision mediump float;\n        precision mediump sampler2D;\n        varying highp vec2 vUv;\n        varying highp vec2 vL;\n        varying highp vec2 vR;\n        varying highp vec2 vT;\n        varying highp vec2 vB;\n        uniform sampler2D uVelocity;\n\n        void main () {\n            float L = texture2D(uVelocity, vL).y;\n            float R = texture2D(uVelocity, vR).y;\n            float T = texture2D(uVelocity, vT).x;\n            float B = texture2D(uVelocity, vB).x;\n            float vorticity = R - L - T + B;\n            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);\n        }\n      '
    );

    var vorticityShader = compileShader(
      gl.FRAGMENT_SHADER,
      '\n        precision highp float;\n        precision highp sampler2D;\n        varying vec2 vUv;\n        varying vec2 vL;\n        varying vec2 vR;\n        varying vec2 vT;\n        varying vec2 vB;\n        uniform sampler2D uVelocity;\n        uniform sampler2D uCurl;\n        uniform float curl;\n        uniform float dt;\n\n        void main () {\n            float L = texture2D(uCurl, vL).x;\n            float R = texture2D(uCurl, vR).x;\n            float T = texture2D(uCurl, vT).x;\n            float B = texture2D(uCurl, vB).x;\n            float C = texture2D(uCurl, vUv).x;\n\n            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));\n            force /= length(force) + 0.0001;\n            force *= curl * C;\n            force.y *= -1.0;\n\n            vec2 velocity = texture2D(uVelocity, vUv).xy;\n            velocity += force * dt;\n            velocity = min(max(velocity, -1000.0), 1000.0);\n            gl_FragColor = vec4(velocity, 0.0, 1.0);\n        }\n      '
    );

    var pressureShader = compileShader(
      gl.FRAGMENT_SHADER,
      '\n        precision mediump float;\n        precision mediump sampler2D;\n        varying highp vec2 vUv;\n        varying highp vec2 vL;\n        varying highp vec2 vR;\n        varying highp vec2 vT;\n        varying highp vec2 vB;\n        uniform sampler2D uPressure;\n        uniform sampler2D uDivergence;\n\n        void main () {\n            float L = texture2D(uPressure, vL).x;\n            float R = texture2D(uPressure, vR).x;\n            float T = texture2D(uPressure, vT).x;\n            float B = texture2D(uPressure, vB).x;\n            float C = texture2D(uPressure, vUv).x;\n            float divergence = texture2D(uDivergence, vUv).x;\n            float pressure = (L + R + B + T - divergence) * 0.25;\n            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\n        }\n      '
    );

    var gradientSubtractShader = compileShader(
      gl.FRAGMENT_SHADER,
      '\n        precision mediump float;\n        precision mediump sampler2D;\n        varying highp vec2 vUv;\n        varying highp vec2 vL;\n        varying highp vec2 vR;\n        varying highp vec2 vT;\n        varying highp vec2 vB;\n        uniform sampler2D uPressure;\n        uniform sampler2D uVelocity;\n\n        void main () {\n            float L = texture2D(uPressure, vL).x;\n            float R = texture2D(uPressure, vR).x;\n            float T = texture2D(uPressure, vT).x;\n            float B = texture2D(uPressure, vB).x;\n            vec2 velocity = texture2D(uVelocity, vUv).xy;\n            velocity.xy -= vec2(R - L, T - B);\n            gl_FragColor = vec4(velocity, 0.0, 1.0);\n        }\n      '
    );

    var blit = (function () {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);
      return function (target, clear) {
        if (target == null) {
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
          gl.viewport(0, 0, target.width, target.height);
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        if (clear) {
          gl.clearColor(0.0, 0.0, 0.0, 1.0);
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    var dye, velocity, divergence, curl, pressure;

    var copyProgram = new Program(baseVertexShader, copyShader);
    var clearProgram = new Program(baseVertexShader, clearShader);
    var splatProgram = new Program(baseVertexShader, splatShader);
    var advectionProgram = new Program(baseVertexShader, advectionShader);
    var divergenceProgram = new Program(baseVertexShader, divergenceShader);
    var curlProgram = new Program(baseVertexShader, curlShader);
    var vorticityProgram = new Program(baseVertexShader, vorticityShader);
    var pressureProgram = new Program(baseVertexShader, pressureShader);
    var gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);
    var displayMaterial = new Material(baseVertexShader, displayShaderSource);

    function initFramebuffers() {
      var simRes = getResolution(config.SIM_RESOLUTION);
      var dyeRes = getResolution(config.DYE_RESOLUTION);
      var texType = ext.halfFloatTexType;
      var rgba = ext.formatRGBA;
      var rg = ext.formatRG;
      var r = ext.formatR;
      var filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
      gl.disable(gl.BLEND);

      if (!dye) {
        dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
      } else {
        dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
      }

      if (!velocity) {
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
      } else {
        velocity = resizeDoubleFBO(
          velocity,
          simRes.width,
          simRes.height,
          rg.internalFormat,
          rg.format,
          texType,
          filtering
        );
      }

      divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    }

    function createFBO(w, h, internalFormat, format, type, param) {
      gl.activeTexture(gl.TEXTURE0);
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

      var fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      var texelSizeX = 1.0 / w;
      var texelSizeY = 1.0 / h;
      return {
        texture: texture,
        fbo: fbo,
        width: w,
        height: h,
        texelSizeX: texelSizeX,
        texelSizeY: texelSizeY,
        attach: function (id) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        }
      };
    }

    function createDoubleFBO(w, h, internalFormat, format, type, param) {
      var fbo1 = createFBO(w, h, internalFormat, format, type, param);
      var fbo2 = createFBO(w, h, internalFormat, format, type, param);
      return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read() {
          return fbo1;
        },
        set read(value) {
          fbo1 = value;
        },
        get write() {
          return fbo2;
        },
        set write(value) {
          fbo2 = value;
        },
        swap: function () {
          var temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        }
      };
    }

    function resizeFBO(target, w, h, internalFormat, format, type, param) {
      var newFBO = createFBO(w, h, internalFormat, format, type, param);
      copyProgram.bind();
      gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
      blit(newFBO);
      return newFBO;
    }

    function resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {
      if (target.width === w && target.height === h) return target;
      target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
      target.write = createFBO(w, h, internalFormat, format, type, param);
      target.width = w;
      target.height = h;
      target.texelSizeX = 1.0 / w;
      target.texelSizeY = 1.0 / h;
      return target;
    }

    function updateKeywords() {
      var displayKeywords = [];
      if (config.SHADING) displayKeywords.push('SHADING');
      displayMaterial.setKeywords(displayKeywords);
    }

    updateKeywords();
    initFramebuffers();
    var lastUpdateTime = Date.now();
    var colorUpdateTimer = 0.0;

    function updateFrame() {
      if (!isActive) return;
      var dt = calcDeltaTime();
      if (resizeCanvas()) initFramebuffers();
      updateColors(dt);
      applyInputs();
      step(dt);
      render(null);
      animationFrameId = requestAnimationFrame(updateFrame);
    }

    function calcDeltaTime() {
      var now = Date.now();
      var dt = (now - lastUpdateTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastUpdateTime = now;
      return dt;
    }

    function resizeCanvas() {
      var width = scaleByPixelRatio(canvas.clientWidth);
      var height = scaleByPixelRatio(canvas.clientHeight);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }
      return false;
    }

    function updateColors(dt) {
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
      if (colorUpdateTimer >= 1) {
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
        pointers.forEach(function (p) {
          p.color = generateColor();
        });
      }
    }

    function applyInputs() {
      pointers.forEach(function (p) {
        if (p.moved) {
          p.moved = false;
          splatPointer(p);
        }
      });
    }

    function step(dt) {
      gl.disable(gl.BLEND);
      curlProgram.bind();
      gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl);

      vorticityProgram.bind();
      gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();

      divergenceProgram.bind();
      gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);

      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
      blit(pressure.write);
      pressure.swap();

      pressureProgram.bind();
      gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
      for (var i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }

      gradienSubtractProgram.bind();
      gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      advectionProgram.bind();
      gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (!ext.supportLinearFiltering) {
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      }
      var velocityId = velocity.read.attach(0);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      if (!ext.supportLinearFiltering) {
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      }
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(dye.write);
      dye.swap();
    }

    function render(target) {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      drawDisplay(target);
    }

    function drawDisplay(target) {
      var width = target == null ? gl.drawingBufferWidth : target.width;
      var height = target == null ? gl.drawingBufferHeight : target.height;
      displayMaterial.bind();
      if (config.SHADING) gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);
      gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
      blit(target);
    }

    function splatPointer(pointer) {
      var dx = pointer.deltaX * config.SPLAT_FORCE;
      var dy = pointer.deltaY * config.SPLAT_FORCE;
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    }

    function clickSplat(pointer) {
      var color = generateColor();
      color.r *= 10.0;
      color.g *= 10.0;
      color.b *= 10.0;
      var dx = 10 * (Math.random() - 0.5);
      var dy = 30 * (Math.random() - 0.5);
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
    }

    function splat(x, y, dx, dy, color) {
      splatProgram.bind();
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(splatProgram.uniforms.point, x, y);
      gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
      gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
      blit(dye.write);
      dye.swap();
    }

    function correctRadius(radius) {
      var aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) radius *= aspectRatio;
      return radius;
    }

    function updatePointerDownData(pointer, id, posX, posY) {
      pointer.id = id;
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor();
    }

    function updatePointerMoveData(pointer, posX, posY, color) {
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
      pointer.color = color;
    }

    function updatePointerUpData(pointer) {
      pointer.down = false;
    }

    function correctDeltaX(delta) {
      var aspectRatio = canvas.width / canvas.height;
      if (aspectRatio < 1) delta *= aspectRatio;
      return delta;
    }

    function correctDeltaY(delta) {
      var aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) delta /= aspectRatio;
      return delta;
    }

    function hexToRGB(hex) {
      var val = hex.replace('#', '');
      if (val.length === 3) val = val[0] + val[0] + val[1] + val[1] + val[2] + val[2];
      var r = parseInt(val.slice(0, 2), 16) / 255;
      var g = parseInt(val.slice(2, 4), 16) / 255;
      var b = parseInt(val.slice(4, 6), 16) / 255;
      return { r: r * 0.15, g: g * 0.15, b: b * 0.15 };
    }

    // Adapted: instead of a fully random rainbow hue, pick a random shade
    // from the accent-color palette (lighter/darker variations of #957DE2)
    // when RAINBOW_MODE is off, so the fluid stays on-brand.
    function generateColor() {
      if (config.RAINBOW_MODE) {
        var c = HSVtoRGB(Math.random(), 1.0, 1.0);
        c.r *= 0.15;
        c.g *= 0.15;
        c.b *= 0.15;
        return c;
      }
      var palette = config.PALETTE && config.PALETTE.length ? config.PALETTE : [config.COLOR];
      var hex = palette[Math.floor(Math.random() * palette.length)];
      return hexToRGB(hex);
    }

    function HSVtoRGB(h, s, v) {
      var r, g, b, i, f, p, q, t;
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
        default:
          break;
      }
      return { r: r, g: g, b: b };
    }

    function wrap(value, min, max) {
      var range = max - min;
      if (range === 0) return min;
      return ((value - min) % range) + min;
    }

    function getResolution(resolution) {
      var aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
      var min = Math.round(resolution);
      var max = Math.round(resolution * aspectRatio);
      if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min };
      else return { width: min, height: max };
    }

    function scaleByPixelRatio(input) {
      var pixelRatio = window.devicePixelRatio || 1;
      return Math.floor(input * pixelRatio);
    }

    function hashCode(s) {
      if (s.length === 0) return 0;
      var hash = 0;
      for (var i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0;
      }
      return hash;
    }

    function handleMouseDown(e) {
      var pointer = pointers[0];
      var posX = scaleByPixelRatio(e.clientX);
      var posY = scaleByPixelRatio(e.clientY);
      updatePointerDownData(pointer, -1, posX, posY);
      clickSplat(pointer);
    }

    var firstMouseMoveHandled = false;
    function handleMouseMove(e) {
      var pointer = pointers[0];
      var posX = scaleByPixelRatio(e.clientX);
      var posY = scaleByPixelRatio(e.clientY);
      if (!firstMouseMoveHandled) {
        var color = generateColor();
        updatePointerMoveData(pointer, posX, posY, color);
        firstMouseMoveHandled = true;
      } else {
        updatePointerMoveData(pointer, posX, posY, pointer.color);
      }
    }

    function handleTouchStart(e) {
      var touches = e.targetTouches;
      var pointer = pointers[0];
      for (var i = 0; i < touches.length; i++) {
        var posX = scaleByPixelRatio(touches[i].clientX);
        var posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);
      }
    }

    function handleTouchMove(e) {
      var touches = e.targetTouches;
      var pointer = pointers[0];
      for (var i = 0; i < touches.length; i++) {
        var posX = scaleByPixelRatio(touches[i].clientX);
        var posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerMoveData(pointer, posX, posY, pointer.color);
      }
    }

    function handleTouchEnd(e) {
      var touches = e.changedTouches;
      for (var i = 0; i < touches.length; i++) {
        updatePointerUpData(pointers[0]);
      }
    }

    // Pause the simulation loop while the tab isn't visible — not part of
    // the original component, added purely for efficiency since there's no
    // framework lifecycle to gate this.
    function handleVisibilityChange() {
      if (document.hidden) {
        isActive = false;
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else if (!isActive) {
        isActive = true;
        lastUpdateTime = Date.now();
        animationFrameId = requestAnimationFrame(updateFrame);
      }
    }

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, false);
    window.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    updateFrame();

    teardownFns.push(function () {
      isActive = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    });
  }

  function destroy() {
    teardownFns.forEach(function (fn) {
      fn();
    });
    teardownFns = [];
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
    canvas = null;
  }

  function start() {
    init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  // Exposed in case the effect ever needs to be restarted or torn down
  // (e.g. from dev tools, or a future settings toggle).
  window.SplashCursor = { init: init, destroy: destroy };
})();
