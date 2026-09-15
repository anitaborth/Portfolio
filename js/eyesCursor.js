/* =============================================================================
   Eyes cursor
   -----------------------------------------------------------------------------
   Stands in for the native cursor inside [data-eyes-cursor], following the
   pointer and glancing towards it. Scoped to that one section on purpose: a
   custom cursor across a whole page costs more in lost affordance on links and
   buttons than it gives back.

   Only runs for a real pointing device. A touch screen has no cursor to
   replace, and a coarse pointer would leave the eyes stranded wherever the
   last tap landed.
============================================================================= */
(function () {
  "use strict";

  var host = document.querySelector("[data-eyes-cursor]");
  if (!host) return;

  var eyes = host.querySelector(".eyes-cursor");
  if (!eyes) return;

  var finePointer =
    window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!finePointer) return;

  host.classList.add("has-eyes-cursor");

  var pupils = eyes.querySelectorAll(".eyes-cursor__pupil");
  var reduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var targetX = 0, targetY = 0;
  var x = 0, y = 0;
  var visible = false;
  var frame = null;

  function paint() {
    eyes.style.transform =
      "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0) translate(-50%,-50%)";
  }

  function place() {
    frame = null;
    // Trailing slightly behind the pointer reads as weight; with reduced
    // motion the eyes sit exactly under it instead.
    var ease = reduced ? 1 : 0.18;
    x += (targetX - x) * ease;
    y += (targetY - y) * ease;
    paint();

    if (!reduced && (Math.abs(targetX - x) > 0.4 || Math.abs(targetY - y) > 0.4)) {
      frame = requestAnimationFrame(place);
    }
  }

  function schedule() {
    if (frame === null) frame = requestAnimationFrame(place);
  }

  host.addEventListener("pointermove", function (e) {
    if (e.pointerType !== "mouse") return;

    var r = host.getBoundingClientRect();
    targetX = e.clientX - r.left;
    targetY = e.clientY - r.top;

    if (!visible) {
      // Jump to the pointer the first time rather than sliding in from 0,0,
      // and paint it now rather than on the next frame: if rAF is throttled —
      // a backgrounded tab, a hidden preview — the eyes would otherwise appear
      // stranded in the corner.
      x = targetX;
      y = targetY;
      visible = true;
      paint();
      eyes.classList.add("is-visible");
    }

    // Glance towards the pointer: the pupils lean a little off centre.
    var dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
    var dy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
    for (var i = 0; i < pupils.length; i++) {
      pupils[i].setAttribute("transform", "translate(" + (dx * 2.2).toFixed(2) + " " + (dy * 1.6).toFixed(2) + ")");
    }

    schedule();
  });

  host.addEventListener("pointerleave", function () {
    visible = false;
    eyes.classList.remove("is-visible");
  });
})();
