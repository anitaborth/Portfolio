/* ---------------------------------------------------------------------------
   Case study: Embassy — Amalgama design system
   Data for the project modal in work.html. Registered on window.PROJECTS,
   which script.js reads when building the modal. Load before script.js.
--------------------------------------------------------------------------- */
(function () {
  window.PROJECTS = window.PROJECTS || {};

  window.PROJECTS["design-system"] = {
      name: "Embassy Design System",
      meta: {
        client: "Amalgama",
        type: "Design System - UI - AI",
        year: "2023 - Present",
        role: "Sr. UI designer",
        tools: "Figma, Claude",
      },
      link: { label: "Check Website Project", href: "#" },
      image: "assets/embassy/hero.png",
      body: `
        <div>
          <span class="cs-label-gray">DESIGN SYSTEM</span>
          <h3 class="cs-heading">Foundations</h3>

          <div class="cs-cols-3">
            <div class="cs-col">
              <span class="cs-label-gray">Problem Statement</span>
              <p class="cs-text">Every new product started from a blank canvas. Without a single source of truth for UI decisions, teams re-derived the same components project after project &mdash; and once AI entered the workflow, generated screens had nothing consistent to reference, so output rarely matched our design language.</p>
            </div>
            <div class="cs-col">
              <span class="cs-label-gray">GOAL</span>
              <p class="cs-text">Build a design system covering every core component needed to start a Desktop or Mobile product without opening Figma, while keeping every screen aligned with our UI guidelines from the very first commit.</p>
            </div>
            <div class="cs-col">
              <span class="cs-label-gray">THE CHALLENGE</span>
              <p class="cs-text">Make the system legible to AI, not just to designers &mdash; so color, typography, and spacing tokens get applied correctly even when a screen is generated from a prompt instead of drawn in Figma.</p>
            </div>
          </div>
        </div>

        <!-- The plugin: the system reaching a project before its first screen -->
        <div class="cs-blue-box">
          <span class="cs-callout-label">Plugin</span>
          <div>
            <p>Embassy also ships as a Claude Code plugin, so the system reaches a project before its first screen exists. Anyone at Amalgama installs it and calls the skill they need &mdash; the design system arrives with the work instead of being looked up afterwards.</p>
            <ul class="cs-skill-list">
              <li>
                <code>embassy:start</code>
                <span>Opens a new project. Builds its design system from ours, or adapts the one the project already has &mdash; and is also what you call to correct what is already there.</span>
              </li>
              <li>
                <code>embassy:screen</code>
                <span>Builds new screens, desktop and mobile, against whichever system the project is on.</span>
              </li>
              <li>
                <code>embassy:review</code>
                <span>Reviews a screen against that system.</span>
              </li>
              <li>
                <code>embassy:eval</code>
                <span>Evaluates the system as a whole.</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="cs-block">
          <span class="cs-label-gray">OVERVIEW</span>
          <h3 class="cs-heading">What Embassy is, and how it's organized</h3>
          <p class="cs-text cs-text-2col">Embassy is Amalgama's single source of truth for product UI: the tokens, components, and usage guidelines every team pulls from, whether they're designing in Figma, prototyping with AI, or shipping code. We structured the documentation around three questions &mdash; what the system is, who it serves, and how to use it &mdash; so a new teammate, or a language model reading the docs, can get oriented in minutes instead of days.</p>
          <img src="assets/embassy/quees.png" alt="Embassy documentation home — what the system is, who it's for, and how to use the docs" class="cs-full-img" />
        </div>

        <div>

          <!-- 01 FOUNDATIONS -->
          <details class="cs-accordion">
            <summary>
              <div class="cs-accordion-left">
                <span class="cs-accordion-num">01</span>
                <span class="cs-accordion-title">Foundations</span>
              </div>
              <span class="cs-accordion-icon">+</span>
            </summary>
            <div class="cs-accordion__body">

              <div class="cs-feature-block">
                <div class="cs-feature-header">
                  <div class="cs-feature-header-left">
                    <span class="cs-label-gray">KEY CHALLENGE</span>
                    <h3 class="cs-feature-title">Design Tokens</h3>
                    <p class="cs-feature-subtitle">We defined the token structure and naming convention from the ground up, adapting Material Design 3's model to fit Embassy's own needs rather than adopting it wholesale.</p>
                  </div>
                  <div class="cs-feature-header-right">
                    <span class="cs-label-gray">GOALS</span>
                    <ul class="cs-goals-list">
                      <li>Document what design tokens are, and why every team needs to work from them.</li>
                      <li>Define token types and a naming structure that reads the same way in Figma and in code.</li>
                      <li>Map each token to the contexts it's meant to be used in.</li>
                    </ul>
                  </div>
                </div>
                <img src="assets/embassy/tokens1.png" alt="Embassy documentation — how a design token's name is structured (system, category, descriptive role)" class="cs-full-img" />
                <img src="assets/embassy/tokens2.png" alt="Embassy documentation — Primary color tokens with light and dark values and recommended usage" class="cs-full-img" />
              </div>

            </div>
          </details>

          <!-- 02 STYLES -->
          <details class="cs-accordion">
            <summary>
              <div class="cs-accordion-left">
                <span class="cs-accordion-num">02</span>
                <span class="cs-accordion-title">Styles</span>
              </div>
              <span class="cs-accordion-icon">+</span>
            </summary>
            <div class="cs-accordion__body">

              <div class="cs-feature-block">
                <div class="cs-feature-header">
                  <div class="cs-feature-header-left">
                    <span class="cs-label-gray">KEY CHALLENGE</span>
                    <h3 class="cs-feature-title">Color Baseline</h3>
                    <p class="cs-feature-subtitle">We defined Embassy's primitive palettes &mdash; the raw color scales every semantic token is built from &mdash; and a consistent way to document and preview them.</p>
                  </div>
                  <div class="cs-feature-header-right">
                    <span class="cs-label-gray">GOALS</span>
                    <ul class="cs-goals-list">
                      <li>Establish a primitive scale (50 to 900) for Primary, Secondary, and Tertiary, so every future token traces back to one palette.</li>
                      <li>Keep contrast and step spacing consistent across scales, so palettes can evolve without breaking accessibility.</li>
                      <li>Preview every step directly in the documentation, instead of linking out to a separate Figma file.</li>
                    </ul>
                  </div>
                </div>
                <img src="assets/embassy/color1.png" alt="Embassy documentation — Primary Navy primitive color scale from 50 to 900 with hex values" class="cs-full-img" />
              </div>

              <div class="cs-feature-block">
                <div class="cs-feature-header">
                  <div class="cs-feature-header-left">
                    <span class="cs-label-gray">KEY CHALLENGE</span>
                    <h3 class="cs-feature-title">Color Roles</h3>
                    <p class="cs-feature-subtitle">On top of the primitive scale, we layered semantic color roles &mdash; Primary, Surface, Outline, and more &mdash; so a component always reads its color from meaning rather than a raw hex step.</p>
                  </div>
                  <div class="cs-feature-header-right">
                    <span class="cs-label-gray">GOALS</span>
                    <ul class="cs-goals-list">
                      <li>Give every semantic role a clear behavior: what it's for, and where it should &mdash; and shouldn't &mdash; be used.</li>
                      <li>Support Light and Dark mode from the same token, so switching themes never requires a design handoff.</li>
                      <li>Show each role applied to real components, so the abstraction stays grounded in something designers actually build.</li>
                    </ul>
                  </div>
                </div>
                <img src="assets/embassy/color2.png" alt="Embassy documentation — semantic color roles for Brand, Error, Surface, and Utility" class="cs-full-img" />
                <img src="assets/embassy/roles.png" alt="Embassy documentation — color roles applied to real components in Light and Dark mode" class="cs-full-img" />
              </div>

            </div>
          </details>

          <!-- 03 COMPONENTS -->
          <details class="cs-accordion">
            <summary>
              <div class="cs-accordion-left">
                <span class="cs-accordion-num">03</span>
                <span class="cs-accordion-title">Components</span>
              </div>
              <span class="cs-accordion-icon">+</span>
            </summary>
            <div class="cs-accordion__body">

              <div class="cs-feature-block">
                <div class="cs-feature-header">
                  <div class="cs-feature-header-left">
                    <span class="cs-label-gray">KEY COMPONENTS</span>
                    <h3 class="cs-feature-title">Buttons</h3>
                    <p class="cs-feature-subtitle">Five color treatments and five sizes cover every priority level a screen needs, without ever introducing a one-off variant.</p>
                  </div>
                  <div class="cs-feature-header-right">
                    <span class="cs-label-gray">GOALS</span>
                    <ul class="cs-goals-list">
                      <li>Diverge deliberately from Material Design 3 where it served the brand better &mdash; full-radius pill shapes stay reserved for chips and badges, not buttons.</li>
                      <li>Scale corner radius with size (XS/SM &rarr; 4px, MD/LG &rarr; 8px, XL &rarr; 12px), so larger buttons still read as buttons.</li>
                      <li>Move past Material's 40px "small" baseline to a 24&ndash;52px height scale that matches our own density and platform conventions.</li>
                    </ul>
                  </div>
                </div>
                <img src="assets/embassy/buttons.png" alt="Embassy documentation — button variants, sizes, and design decisions versus Material Design 3" class="cs-full-img" />
              </div>

              <div class="cs-feature-block">
                <div class="cs-feature-header">
                  <div class="cs-feature-header-left">
                    <span class="cs-label-gray">KEY COMPONENTS</span>
                    <h3 class="cs-feature-title">Chips</h3>
                    <p class="cs-feature-subtitle">Chips needed to stay visually lightweight while covering four distinct jobs, so we gave each variant its own icon language instead of leaning on color alone.</p>
                  </div>
                  <div class="cs-feature-header-right">
                    <span class="cs-label-gray">GOALS</span>
                    <ul class="cs-goals-list">
                      <li>Support four variants &mdash; Assist, Filter, Input, and Suggestion &mdash; each mapped to a specific interaction pattern.</li>
                      <li>Default to zero elevation, reserving shadow for the rare case where a chip needs to separate from a busy background.</li>
                      <li>Keep labels and icons interchangeable, so filters and quick actions can be built from the same component.</li>
                    </ul>
                  </div>
                </div>
                <img src="assets/embassy/chips.png" alt="Embassy documentation — Assist, Filter, Input, and Suggestion chip variants" class="cs-full-img" />
              </div>

            </div>
          </details>

        </div>

        <div>
          <span class="cs-label-gray">SOLUTION</span>
          <h3 class="cs-heading">One library, every surface</h3>
          <p class="cs-text cs-text-2col">Today Embassy ships 30 documented components &mdash; from foundational buttons and inputs to complex patterns like data tables, bottom sheets, and empty states &mdash; each with usage guidelines, accessibility notes, and code-ready specs. It's the same library whether a designer opens Figma or an engineer prompts an AI assistant to scaffold a screen.</p>
          <div class="cs-comp-grid">
            ${[
              ["App bar", "Top and bottom app bars."],
              ["Avatar", "User avatar with initials and image variants."],
              ["Badges", "Status, priority, and label badges."],
              ["Buttons", "Primary, ghost, danger, and icon buttons."],
              ["Cards", "Content container with variants."],
              ["Carousels", "Horizontally scrollable item collections."],
              ["Checkbox", "Single and group checkbox selection."],
              ["Chips", "Assist, filter, input, and suggestion chips."],
              ["Date Picker", "Calendar for a single date or a date range."],
              ["Dialog", "Prompt dialogs and confirmation modals."],
              ["Divider", "Horizontal and vertical dividers."],
              ["Empty State", "Empty state illustrations and CTAs."],
              ["Input", "Text input with states and variants."],
              ["Lists", "Single-line and multi-line list items."],
              ["Loading and progress", "Spinners, progress bars, and skeletons."],
              ["Menu", "Dropdown and context menus."],
              ["Navigation", "Sidebar navigation with groups and items."],
              ["Nav Card", "Navigation cards for section overview grids."],
              ["Person Card", "Compact candidate/person card."],
              ["Radio button", "Single-select radio button groups."],
              ["Search", "Search bar, docked and full-screen."],
              ["Select", "Dropdown select with options."],
              ["Bottom Sheets", "Panel anchored to the bottom edge."],
              ["Side Sheets", "Panel anchored to a side."],
              ["Sliders", "Continuous and discrete value sliders."],
              ["Snackbars", "Brief bottom-of-screen notifications."],
              ["Switch", "Binary on/off toggle control."],
              ["Table", "Data table with sorting and pagination."],
              ["Tabs", "Tab navigation with active panel."],
              ["Textarea", "Multi-line text area input."],
            ]
              .map(
                ([title, desc]) => `
            <div class="cs-comp-card">
              <div class="cs-comp-card__head">
                <span class="cs-comp-tag">Component</span>
                <span class="cs-comp-arrow" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                </span>
              </div>
              <h4 class="cs-comp-title">${title}</h4>
              <p class="cs-comp-desc">${desc}</p>
            </div>`
              )
              .join("")}
          </div>
        </div>

        <div>
          <span class="cs-label-gray">REFLECTION</span>
          <h3 class="cs-heading">Takeaways and if I had more time,</h3>
          <ol class="cs-takeaways-list">
            <li>Extend token coverage into motion and elevation, so animation timing and shadow depth are as systematized as color and type.</li>
            <li>Audit AI-generated screens against the library, to measure how often components and tokens get picked correctly outside of Figma.</li>
            <li>Build lightweight adoption metrics per team, to see where Embassy is driving speed &mdash; and where it's still being worked around.</li>
          </ol>
        </div>
      `,
  };
})();
