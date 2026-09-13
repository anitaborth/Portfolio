/* ---------------------------------------------------------------------------
   Case study: Arredo
   Data for the project modal in work.html. Registered on window.PROJECTS,
   which script.js reads when building the modal. Load before script.js.
--------------------------------------------------------------------------- */
(function () {
  window.PROJECTS = window.PROJECTS || {};

  window.PROJECTS.arredo = {
      name: "E-commerce",
      meta: {
        client: "Arredo",
        type: "UI design",
        year: "2016 - 2019",
        role: "UI designer",
        tools: "Figma",
      },
      image: "assets/arredo/secondimg.png",
      body: `
        <div class="cs-img-row cs-img-row--square">
          <div class="cs-img-stack">
            <img src="assets/arredo/colorpalette.png" alt="Arredo brand color palette — purple, pink, white, green and black" />
            <img src="assets/arredo/compu.png" alt="Arredo materials page shown on a laptop mockup" />
          </div>
          <img src="assets/arredo/website.png" alt="Arredo e-commerce homepage — full scrolling desktop screenshot" />
        </div>

        <img src="assets/arredo/iphone.png" alt="Arredo mobile navigation, Jardines category, and Inspírate section on iPhone" class="cs-full-img" style="margin-top:0; border-radius:0" />

        <div class="cs-img-row cs-img-row--square">
          <img src="assets/arredo/rebajas.png" alt="Seasonal sale homepage concept annotated with UX notes" />
          <img src="assets/arredo/deco.png" alt="Home décor lifestyle photography — lantern and candles" />
        </div>
      `,
  };
})();
