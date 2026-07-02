/* =============================================================================
   Ana Borthagaray — Portfolio Home / interactions
   -----------------------------------------------------------------------------
   Written as small, independent modules. Each module is a self-contained
   factory `initX(root)` that no-ops gracefully if its target is absent, so the
   page degrades cleanly and modules can be reused or removed in isolation.
============================================================================= */
(function () {
  "use strict";

  /** Honour the user's motion preference. */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------------------------
     Module: seamless marquee
     Clones the visible group so the CSS keyframes can translate by -50% and
     loop without a visible seam, regardless of viewport width.
  --------------------------------------------------------------------------- */
  function initMarquee(track) {
    if (!track || prefersReducedMotion) return;

    const group = track.querySelector(".marquee__group");
    if (!group) return;

    const clone = group.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  }

  /* ---------------------------------------------------------------------------
     Module: mobile navigation toggle
     Manages aria-expanded + an `.is-open` class, and closes on link click,
     Escape, or when resizing back to desktop.
  --------------------------------------------------------------------------- */
  function initNavToggle(button) {
    if (!button) return;

    const navId = button.getAttribute("aria-controls");
    const nav = navId && document.getElementById(navId);
    if (!nav) return;

    const setOpen = (open) => {
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute(
        "aria-label",
        open ? "Close navigation menu" : "Open navigation menu"
      );
      nav.classList.toggle("is-open", open);
    };

    button.addEventListener("click", () => {
      setOpen(button.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", (e) => {
      if (e.target.closest(".nav__link")) setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });

    window
      .matchMedia("(min-width: 601px)")
      .addEventListener("change", (e) => {
        if (e.matches) setOpen(false);
      });
  }

  /* ---------------------------------------------------------------------------
     Module: reveal-on-scroll
     Adds a subtle fade/translate as elements enter the viewport. Uses
     IntersectionObserver; falls back to showing everything if unsupported.
  --------------------------------------------------------------------------- */
  function initReveal(elements) {
    if (!elements.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    // Opt into the hidden start-state only now that we can animate it.
    document.documentElement.classList.add("js");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((el) => {
      el.classList.add("reveal-init");
      const r = el.getBoundingClientRect();
      // If already in viewport at load time, reveal immediately (avoids one-frame flash).
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add("is-visible");
      } else {
        observer.observe(el);
      }
    });
  }

  /* ---------------------------------------------------------------------------
     Module: work-card entrance animations
     Observes the curated-work list as a single trigger; when the list enters
     the viewport all cards get their visible class simultaneously, and CSS
     uses a --stagger custom property to create per-card delays.
  --------------------------------------------------------------------------- */
  function initWorkCards() {
    const cards = Array.from(document.querySelectorAll(".work-card"));
    if (!cards.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("js");

    cards.forEach((card, i) => {
      card.style.setProperty("--stagger", i);
      card.classList.add("work-card--hidden");
    });

    const list = document.querySelector(".curated-work__list");
    if (!list) return;

    const reveal = () => {
      cards.forEach((card) => {
        card.classList.remove("work-card--hidden");
        card.classList.add("work-card--visible");
      });
    };

    // Already in view at page load — reveal without observer
    const r = list.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(list);
  }

  /* ---------------------------------------------------------------------------
     Module: project modals
     Opens a two-panel modal (sidebar metadata + scrollable content) when a
     work-card is clicked. Closes on button, Esc, or overlay click.
  --------------------------------------------------------------------------- */
  const PROJECTS = {
    morpheus: {
      name: "Morpheus",
      meta: {
        client: "Amalgama",
        type: "Product Design - Fitness design - UX/UI - Prototyping - AI",
        year: "2024 - 2026",
        role: "Sr. Product designer, UX researcher, UI designer",
        tools: "Figma, Claude",
      },
      link: { label: "Check Website Project", href: "#" },
      image: "assets/morpheus/header.png",
      body: `
        <div class="cs-cols-3">
          <div class="cs-col">
            <span class="cs-label-gray">Problem Statement</span>
            <p class="cs-text">The client came to Amalgama with a main issue: the app wasn't intuitive, looked outdated, and needed a fresh look along with a cohesive design system.</p>
          </div>
          <div class="cs-col">
            <span class="cs-label-gray">GOAL</span>
            <p class="cs-text">Increase Day 7 retention by 10% by improving the first-time user experience through a redesigned onboarding and more personalized interactions. Reduce user drop-off during the early stages of the journey by simplifying key flows and improving overall usability.</p>
          </div>
          <div class="cs-col">
            <span class="cs-label-gray">THE CHALLENGE</span>
            <p class="cs-text">Redesign Morpheus's experience and UI to make the app more appealing and easier to use. Test with users before development and iterate based on user needs and product goals.</p>
          </div>
        </div>

        <div class="cs-photo-pair">
          <img src="assets/morpheus/Frame 1410127966.png" alt="Morpheus device" />
          <img src="assets/morpheus/gemini2.jpg" alt="Morpheus workout" />
        </div>

        <div>
          <div class="cs-section-header">
            <span class="cs-label-gray">Intro</span>
            <h3 class="cs-heading">Old App</h3>
          </div>
          <img src="assets/morpheus/oldapp.png" alt="Old app" class="cs-full-img" style="margin-top:0" />
        </div>

        <div>
          <div class="cs-section-header">
            <span class="cs-label-gray">PROCESS</span>
            <h3 class="cs-heading">Design Methodology</h3>
          </div>
          <div class="cs-methodology-grid">
            <div class="cs-method-step">
              <span class="cs-method-num">01</span>
              <h4 class="cs-method-title">Empathize</h4>
              <p class="cs-method-desc">Understand the user's needs, experiences, and challenges.</p>
            </div>
            <div class="cs-method-step">
              <span class="cs-method-num">02</span>
              <h4 class="cs-method-title">Define</h4>
              <p class="cs-method-desc">Clearly articulate the problem you are trying to solve based on insights gathered during the Empathize stage.</p>
            </div>
            <div class="cs-method-step">
              <span class="cs-method-num">03</span>
              <h4 class="cs-method-title">Ideate</h4>
              <p class="cs-method-desc">Brainstorm and generate a wide range of ideas to solve the defined problem.</p>
            </div>
            <div class="cs-method-step">
              <span class="cs-method-num">04</span>
              <h4 class="cs-method-title">Prototype</h4>
              <p class="cs-method-desc">Create scaled-down versions or models of your ideas to explore potential solutions.</p>
            </div>
            <div class="cs-method-step">
              <span class="cs-method-num">05</span>
              <h4 class="cs-method-title">Test</h4>
              <p class="cs-method-desc">Evaluate the prototypes by testing them with users, gathering feedback, and refining the solutions.</p>
            </div>
          </div>
        </div>

        <div class="cs-feature-block">
          <div class="cs-feature-header">
            <div class="cs-feature-header-left">
              <span class="cs-label-gray">KEY FEATURE 1</span>
              <h3 class="cs-feature-title">Sign-in</h3>
              <p class="cs-feature-subtitle">We modified the sign-in process to clarify the steps needed before creating an account.</p>
            </div>
            <div class="cs-feature-header-right">
              <span class="cs-label-gray">GOALS</span>
              <ul class="cs-goals-list">
                <li>Define objectives to set baseline metrics.</li>
                <li>Different flows depending on whether the device was purchased or not.</li>
                <li>Ensure a straightforward, frictionless experience.</li>
              </ul>
            </div>
          </div>
          <div class="cs-phone-cards">
            <div class="cs-phone-card"><img src="assets/morpheus/signin1.png" alt="Sign-in screen 1" /></div>
            <div class="cs-phone-card"><img src="assets/morpheus/signin2.png" alt="Sign-in screen 2" /></div>
          </div>
        </div>

        <div class="cs-feature-block">
          <div class="cs-feature-header">
            <div class="cs-feature-header-left">
              <span class="cs-label-gray">KEY FEATURE 2</span>
              <h3 class="cs-feature-title">Home Screen</h3>
              <p class="cs-feature-subtitle">We redesigned the homepage by adding a toggle in the header to check metrics over time.</p>
            </div>
            <div class="cs-feature-header-right">
              <span class="cs-label-gray">GOALS</span>
              <ul class="cs-goals-list">
                <li>Add more contextual information for users.</li>
                <li>Enhance the UX of weekly targets.</li>
                <li>Make workouts more visible. Increase visibility of heart rate zones.</li>
              </ul>
            </div>
          </div>
          <div class="cs-phone-cards">
            <div class="cs-phone-card"><img src="assets/morpheus/home.png" alt="Home screen 1" /></div>
            <div class="cs-phone-card"><img src="assets/morpheus/home2.png" alt="Home screen 2" /></div>
          </div>
        </div>

        <div class="cs-feature-block">
          <div class="cs-feature-header">
            <div class="cs-feature-header-left">
              <span class="cs-label-gray">KEY FEATURE 3</span>
              <h3 class="cs-feature-title">Train</h3>
              <p class="cs-feature-subtitle">We redesigned the UI to make it more user-friendly for screen interactions.</p>
            </div>
            <div class="cs-feature-header-right">
              <span class="cs-label-gray">GOALS</span>
              <ul class="cs-goals-list">
                <li>Redesign the main action buttons.</li>
                <li>Allow screen sharing through social media.</li>
                <li>We added more notifications with snackbars and bottom sheets to keep users informed about what's happening.</li>
              </ul>
            </div>
          </div>
          <div class="cs-phone-cards">
            <div class="cs-phone-card"><img src="assets/morpheus/train.png" alt="Train screen 1" /></div>
            <div class="cs-phone-card"><img src="assets/morpheus/train2.png" alt="Train screen 2" /></div>
          </div>
        </div>

        <div>

          <!-- 01 EMPATHIZE -->
          <details class="cs-accordion">
            <summary>
              <div class="cs-accordion-left">
                <span class="cs-accordion-num">01</span>
                <span class="cs-accordion-title">Empathize</span>
              </div>
              <span class="cs-accordion-icon">+</span>
            </summary>
            <div class="cs-accordion__body">
              <div>
                <h3 class="cs-heading">Research finding</h3>
                <div class="cs-cols-2">
                  <p class="cs-text">Before we started designing, we decided to conduct a survey with users to better understand the main issues with the product beyond customer perception. This would help us define the problem more clearly and prioritize what we should tackle first.</p>
                  <p class="cs-text">Most of our hypotheses were validated, except for three related to the difficulty users faced in understanding how to use the various features. Based on this, we concluded that the main issue was that users encountered challenges in grasping Morpheus during their initial experience.</p>
                </div>
                <div class="cs-hypothesis-card">
                  <h4 class="cs-hypothesis-heading">Hypothesis</h4>
                  <div class="cs-hyp-rows">

                    <div class="cs-hyp-row">
                      <p class="cs-hyp-text">Lack of clarity on the core Morpheus experience needed to improve fitness – Test, train, hit weekly targets, improve</p>
                      <div class="cs-hyp-verdict">
                        <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 11L11 20L28 2" stroke="#7DC86B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </div>
                      <p class="cs-hyp-insight"></p>
                    </div>

                    <div class="cs-hyp-row">
                      <p class="cs-hyp-text">Too many features that are difficult to discover: zone-based interval training, workout history, graphs, etc.</p>
                      <div class="cs-hyp-verdict">
                        <svg width="36" height="14" viewBox="0 0 36 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 7H32M32 7L26 1.5M32 7L26 12.5" stroke="#C87A3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </div>
                      <p class="cs-hyp-insight">Difficulty on understading <strong>how to use</strong> them and <strong>see progress</strong></p>
                    </div>

                    <div class="cs-hyp-row">
                      <p class="cs-hyp-text">Difficult for non-tech savvy users to get started</p>
                      <div class="cs-hyp-verdict">
                        <svg width="36" height="14" viewBox="0 0 36 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 7H32M32 7L26 1.5M32 7L26 12.5" stroke="#C87A3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </div>
                      <p class="cs-hyp-insight">The majority of our users feel <strong>comfortable</strong> with technology</p>
                    </div>

                    <div class="cs-hyp-row">
                      <p class="cs-hyp-text">Not enough clear reward/benefit for different user behaviors – recovery test, post-workout, hitting weekly training goals, etc.</p>
                      <div class="cs-hyp-verdict">
                        <svg width="36" height="14" viewBox="0 0 36 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 7H32M32 7L26 1.5M32 7L26 12.5" stroke="#C87A3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </div>
                      <p class="cs-hyp-insight">This <strong>was not</strong> a <strong>particular issue</strong> with the answers on the survey</p>
                    </div>

                    <div class="cs-hyp-row">
                      <p class="cs-hyp-text">Use of Morpheus M7 and integration with other wearable devices too confusing</p>
                      <div class="cs-hyp-verdict">
                        <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 11L11 20L28 2" stroke="#7DC86B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </div>
                      <p class="cs-hyp-insight"></p>
                    </div>

                    <div class="cs-hyp-row">
                      <p class="cs-hyp-text">Need for additional daily and weekly insights and recommendations to drive engagement</p>
                      <div class="cs-hyp-verdict">
                        <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 11L11 20L28 2" stroke="#7DC86B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </div>
                      <p class="cs-hyp-insight"></p>
                    </div>

                  </div>
                  <div class="cs-hypothesis-footer">
                    <span class="cs-hyp-tag">UX/UI design</span>
                    <span class="cs-hyp-date">Ago - Oct 2024</span>
                  </div>
                </div>
              </div>

              <div style="margin-top:60px">
                <span class="cs-label-purple">DISCOVER THE PROBLEM</span>
                <h3 class="cs-heading">What I Learned After The Survey</h3>
                <p class="cs-text cs-text-2col">We gained a deeper understanding of the real issues users face beyond the client's perspective, which is why we created a HMW dynamic to prioritize the problems that need solving. The survey made it clear that the biggest friction wasn't missing features, but how hard it was for users to interpret their health data and see how each tool supported their progress. Framing those findings as How Might We statements turned scattered pain points into clear, rankable opportunities that set the direction for the redesign.</p>
                <div class="cs-hmw-grid-card">
                  <h4 class="cs-hmw-grid-title">How might we...</h4>
                  <div class="cs-hmw-grid">

                    <div class="cs-hmw-grid-item">
                      <span class="cs-hmw-priority-lbl">Priority 1</span>
                      <span class="cs-hmw-grid-num">01</span>
                      <p><strong>How might we</strong> help users track and monitor their HRV, HR, and Recovery progress by providing clear and detailed averages and trends over specific periods like weeks, months, and years?</p>
                    </div>

                    <div class="cs-hmw-grid-item">
                      <span class="cs-hmw-priority-lbl">Priority 2</span>
                      <span class="cs-hmw-grid-num">02</span>
                      <p><strong>How might we</strong> guide users with clear, easy-to-understand explanations to help them interpret their HR, HRV, and recovery data?</p>
                    </div>

                    <div class="cs-hmw-grid-item">
                      <span class="cs-hmw-priority-lbl">Priority 3</span>
                      <span class="cs-hmw-grid-num">03</span>
                      <p><strong>How might we</strong> redesign the Zone-based interval training interface and training guidance to be more intuitive and user-friendly, ensuring it effectively supports users in achieving their fitness goals?</p>
                    </div>

                    <div class="cs-hmw-grid-item">
                      <span class="cs-hmw-priority-lbl">Priority 4</span>
                      <span class="cs-hmw-grid-num">04</span>
                      <p><strong>How might we</strong> provide personalized training recommendations that align with users' progress and weekly training zone targets to help them achieve their fitness goals?</p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </details>

          <!-- 02 DEFINE -->
          <details class="cs-accordion">
            <summary>
              <div class="cs-accordion-left">
                <span class="cs-accordion-num">02</span>
                <span class="cs-accordion-title">Define</span>
              </div>
              <span class="cs-accordion-icon">+</span>
            </summary>
            <div class="cs-accordion__body">
              <div>
                <span class="cs-label-purple">DEFINE</span>
                <h3 class="cs-heading">Persona</h3>
                <p class="cs-text cs-text-2col">The personas were previously defined by the client, but as a team, we refined their characteristics further. Ultimately, we have three types of personas: Fitness Enthusiasts, Athletes, and Coaches (though the latter are in the minority). Sharpening these profiles kept every decision grounded in real motivations and goals rather than assumptions. Each one surfaced distinct needs around data clarity and guidance, which directly shaped how we prioritized features and framed the first-time experience.</p>
                <div class="cs-persona-pair">
                  <img src="assets/morpheus/persona-1.png" alt="Persona 1" />
                  <img src="assets/morpheus/persona-2.png" alt="Persona 2" />
                </div>
              </div>

              <div style="margin-top:60px">
                <span class="cs-label-purple">DEFINE A PROBLEM</span>
                <h3 class="cs-heading">Define a Problem</h3>
                <div class="cs-hmw-card">
                  <div class="cs-hmw-layout">

                    <div class="cs-hmw-left">
                      <div>
                        <span class="cs-hmw-section-label">Conclusion</span>
                        <p class="cs-hmw-conclusion">Users encounter challenges in fully understanding Morpheus during their first user experience.</p>
                      </div>
                      <div class="cs-hmw-priority-box">
                        <span class="cs-hmw-priority-label">High Priority</span>
                        <p class="cs-hmw-priority-text">Working on helping users read and digest their health data, guiding their workouts based on their metrics, will maximize the app's experience and improve user satisfaction.</p>
                      </div>
                    </div>

                    <div class="cs-hmw-right">

                      <div class="cs-hmw-finding">
                        <div class="cs-hmw-finding-header">
                          <span class="cs-hmw-badge">High Priority</span>
                          <h5 class="cs-hmw-finding-title">Historical Data Visualization</h5>
                        </div>
                        <ul class="cs-hmw-finding-list">
                          <li>Lack of proper historical data (HRV, HR, recovery): Need for averages and long-term data to track progress by week/month/year.</li>
                          <li>Difficulty to find Workout history</li>
                        </ul>
                        <p class="cs-hmw-justification">Need of a new structure of data to showcase it over time</p>
                      </div>

                      <div class="cs-hmw-finding">
                        <div class="cs-hmw-finding-header">
                          <span class="cs-hmw-badge">High Priority</span>
                          <h5 class="cs-hmw-finding-title">Limited Comprehension of Data and Features</h5>
                        </div>
                        <ul class="cs-hmw-finding-list">
                          <li>Difficulty to understand data: Meaning of HR, HRV, Recovery, Zone-based interval training, Weekly Training Zone Target.</li>
                          <li>Difficulty to understand Zone-based interval training programs — simplify to improve comprehension.</li>
                          <li>Interface and design not aligned with the science behind the programs.</li>
                        </ul>
                        <p class="cs-hmw-justification">Need to clarify data and metrics concepts and provide clear guidance to ensure users take full advantage of Morpheus potential.</p>
                      </div>

                      <div class="cs-hmw-finding">
                        <div class="cs-hmw-finding-header">
                          <span class="cs-hmw-badge">High Priority</span>
                          <h5 class="cs-hmw-finding-title">Training Personalization and Recommendations</h5>
                        </div>
                        <ul class="cs-hmw-finding-list">
                          <li>Concrete plans for meeting fitness goals: Enhance training suggestions based on progress.</li>
                          <li>Associate Zone-based interval training with users' weekly training zone targets for better workout recommendations.</li>
                        </ul>
                        <p class="cs-hmw-justification">Essential for improving user experience with tailored recommendations and actionable goals.</p>
                      </div>

                    </div>
                  </div>
                  <div class="cs-hypothesis-footer">
                    <span class="cs-hyp-tag">UX/UI design</span>
                    <span class="cs-hyp-date">Ago - Oct 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </details>

          <!-- 03 IDEATE -->
          <details class="cs-accordion">
            <summary>
              <div class="cs-accordion-left">
                <span class="cs-accordion-num">03</span>
                <span class="cs-accordion-title">Ideate</span>
              </div>
              <span class="cs-accordion-icon">+</span>
            </summary>
            <div class="cs-accordion__body">
              <p class="cs-text cs-text-2col">We first mapped the information architecture for all the flows that needed to be redesigned, and then created wireflows to illustrate the new user journeys and interactions. Working at low fidelity let us pressure-test the structure early, remove redundant steps, and confirm that every screen had a clear purpose before visual design. It also kept iteration fast, so we could align with the team and validate the flow well before moving into prototyping.</p>

              <div style="margin-top:60px">
                <span class="cs-label-purple">POSSIBLE SOLUTION</span>
                <h3 class="cs-heading">Goal</h3>
                <div class="cs-blue-box">
                  <p>Working on helping users read and digest their health data, guiding their workouts based on their metrics, will maximize the app's experience and improve user satisfaction.</p>
                </div>
              </div>

              <div style="margin-top:60px">
                <img src="assets/morpheus/flow.png" alt="User flow and wireflows" class="cs-full-img" style="margin-top:0" />
              </div>
            </div>
          </details>

          <!-- 04 PROTOTYPE -->
          <details class="cs-accordion">
            <summary>
              <div class="cs-accordion-left">
                <span class="cs-accordion-num">04</span>
                <span class="cs-accordion-title">Prototype</span>
              </div>
              <span class="cs-accordion-icon">+</span>
            </summary>
            <div class="cs-accordion__body"></div>
          </details>

          <!-- 05 TEST -->
          <details class="cs-accordion">
            <summary>
              <div class="cs-accordion-left">
                <span class="cs-accordion-num">05</span>
                <span class="cs-accordion-title">Test</span>
              </div>
              <span class="cs-accordion-icon">+</span>
            </summary>
            <div class="cs-accordion__body">
              <p class="cs-text">We also held interviews, which were primarily user testing sessions aimed at validating the changes we implemented in the app.</p>
            </div>
          </details>

        </div>

        <div>
          <span class="cs-label-gray">SOLUTION</span>
          <h3 class="cs-heading">Design system</h3>
          <p class="cs-text">We created a UI kit in Figma that includes all the necessary components, their variants, color tokens, typography tokens, margins, and more.</p>
          <div class="cs-ds-card">
            <img src="assets/morpheus/ds.png" alt="Design system" />
          </div>
        </div>

        <div>
          <span class="cs-label-gray">REFLECTION</span>
          <h3 class="cs-heading">Takeaways and If I had more time,</h3>
          <ol class="cs-takeaways-list">
            <li>Implement AI feature adding insights.</li>
            <li>Test it with users and analyze first user experience adding this feature.</li>
            <li>Implement a subscription service and track conversion rates, with a focus on retaining premium users.</li>
          </ol>
          <img src="assets/morpheus/aifeature.png" alt="AI feature" class="cs-full-img" />
          <div class="cs-prototype-cta">
            <div class="cs-prototype-cta__left">
              <span class="cs-label-gray">PROTOTYPE</span>
              <p class="cs-prototype-cta__text">Explore the AI insights feature in the interactive prototype.</p>
            </div>
            <a href="#" target="_blank" rel="noopener" class="cs-prototype-cta__link">Try the prototype →</a>
          </div>
        </div>

        <div class="cs-instagram-card">
          <span class="cs-label-gray">INSTAGRAM VIDEO</span>
          <a href="#" target="_blank" rel="noopener">Watch process video</a>
        </div>

        <div class="cs-qr-section">
          <div class="cs-qr-section__left">
            <span class="cs-label-purple">LIVE PRODUCT</span>
            <h3 class="cs-qr-heading">Try Morpheus</h3>
            <p class="cs-qr-text">The redesigned app is live on the App Store. Scan the QR code or tap the link to download Morpheus and explore the new design firsthand.</p>
            <a href="https://apps.apple.com/us/app/morpheus-training/id1259741445" target="_blank" rel="noopener" class="cs-appstore-link">Download on the App Store →</a>
          </div>
          <div class="cs-qr-section__qr">
            <img src="assets/morpheus/qr-appstore.svg" alt="QR code — download Morpheus on the App Store" class="cs-qr-code" />
          </div>
        </div>
      `,
    },
    "design-system": {
      name: "Design System",
      meta: {
        client: "Amalgama",
        type: "Design System · Tokens · Components",
        year: "2023 — 2026",
        role: "Product Design Lead",
      },
      image: "assets/amalgama.png",
      body: `<p class="cs-text">Building the visual foundation that scales across every product we ship. Defining tokens, component library, motion principles, and the documentation that keeps every team aligned.</p>`,
    },
    trivia: {
      name: "Trivia Crack",
      meta: {
        client: "Etermax",
        type: "Product Game - UI - UX - Illustration",
        year: "2021-2023",
        role: "Sr. UI designer",
        tools: "Figma",
      },
      image: "assets/etermax/hero.png",
      body: `
        <!-- ===================== PROJECT 1 ===================== -->
        <details class="cs-project" open>
          <summary class="cs-project__summary">
            <span class="cs-project__pill">Project 1 | Shop Redesign and VIP Membership</span>
            <span class="cs-project__chevron" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>
          </summary>
          <div class="cs-project__body">

            <!-- SHOP / Redesign -->
            <div class="cs-block">
              <span class="cs-label-gray">SHOP</span>
              <h3 class="cs-heading">Redesign</h3>
              <div class="cs-split">
                <p class="cs-text">We started with a prototype and tested it with players in Argentina, then iterated and validated the design with US players through Playtest and an A/B test. Throughout, we leaned on well-established cognitive biases &mdash; such as Social Proof and the Von Restorff Effect &mdash; to steer players toward the most relevant offers.<br><br>The old shop buried every offer in one long list, making it hard for players to compare products or spot the best value at a glance. We restructured it into clear, scannable modules &mdash; Special Offer, Right Answers, Credits, Coins and Daily Deals &mdash; so each product type had its own space and visual priority.<br><br>Highlighting the most popular pack and framing each price against its original value gave players a clearer sense of what to buy, while the refreshed UI made the whole experience feel more trustworthy and far easier to navigate.</p>
                <img src="assets/etermax/old-shop.png" alt="Old Trivia Crack shop screen" />
              </div>
            </div>

            <div class="cs-cols-3">
              <div class="cs-col">
                <span class="cs-label-gray">Problem Statement</span>
                <p class="cs-text">Only 7% of players made a purchase through the shop &mdash; they found the design unappealing and hard to navigate. With products buried in a single long list, most left without exploring what was on offer.</p>
              </div>
              <div class="cs-col">
                <span class="cs-label-gray">GOAL</span>
                <p class="cs-text">Improve the shopping experience.</p>
                <ul class="cs-goals-list">
                  <li>Present offers as clear, self-contained modules.</li>
                  <li>Introduce daily gifts to build a habit of returning.</li>
                  <li>Rework the UI and navigation structure.</li>
                </ul>
              </div>
              <div class="cs-col">
                <span class="cs-label-gray">THE CHALLENGE</span>
                <p class="cs-text">Make it intuitive for players to enter the shop and complete a purchase, while building genuine desire for the featured products. The shop also had to feel like a rewarding part of the game rather than a separate storefront.</p>
              </div>
            </div>

            <img src="assets/etermax/new-shop.png" alt="Redesigned Trivia Crack shop with Special Offer, Right Answers, Credits, Coins and Daily Deals" class="cs-full-img" style="margin-top:0" />

            <div class="cs-media-grid">
              <div class="cs-media-item">
                <span class="cs-label-purple">UI elements</span>
                <img src="assets/etermax/ui-elements.png" alt="Shop UI elements" />
              </div>
              <div class="cs-media-item">
                <span class="cs-label-purple">Logos</span>
                <img src="assets/etermax/logos.png" alt="Promotion logos — Starter Pack, Angels &amp; Demons, Willy's Offer, Rush Sale" />
              </div>
              <div class="cs-media-item">
                <span class="cs-label-purple">Popup offers</span>
                <img src="assets/etermax/popup-offers.png" alt="Popup offer screens" />
              </div>
              <div class="cs-media-item">
                <span class="cs-label-purple">Illustrations</span>
                <img src="assets/etermax/illustrations.png" alt="Pet illustrations across the app" />
              </div>
            </div>

            <!-- SHOP / VIP Membership -->
            <div class="cs-block">
              <span class="cs-label-gray">SHOP</span>
              <h3 class="cs-heading">VIP Membership</h3>
              <div class="cs-cols-2">
                <p class="cs-text">With the redesigned shop in place, we introduced a VIP Membership &mdash; Trivia Crack Prime &mdash; giving committed players an ad-free, more rewarding experience. We prototyped the flow, tested it with players in Argentina, and refined it with US players through Playtest and an A/B test.</p>
                <p class="cs-text">To make the membership's value easy to grasp, we drew on proven cognitive biases such as Social Proof and the Von Restorff Effect, so the premium benefits felt both desirable and clear.</p>
              </div>
            </div>

            <div class="cs-cols-3">
              <div class="cs-col">
                <span class="cs-label-gray">Problem Statement</span>
                <p class="cs-text">Premium benefits were hard to discover and their value wasn't obvious, so few players understood why the membership was worth it. Without a clear moment to explain what an upgrade included, most never seriously considered it.</p>
              </div>
              <div class="cs-col">
                <span class="cs-label-gray">GOAL</span>
                <p class="cs-text">Make premium value clear and encourage more players to upgrade.</p>
                <ul class="cs-goals-list">
                  <li>Surface the membership at the right moments in the journey.</li>
                  <li>Communicate each benefit clearly &mdash; no ads, free wheel, unlimited lives.</li>
                  <li>Lower the barrier with a 3-day free trial.</li>
                </ul>
              </div>
              <div class="cs-col">
                <span class="cs-label-gray">THE CHALLENGE</span>
                <p class="cs-text">Present the membership as a compelling, trustworthy upgrade without disrupting the core game experience. The offer had to feel like a natural benefit rather than an aggressive paywall, so players stayed engaged whether or not they subscribed.</p>
              </div>
            </div>

            <img src="assets/etermax/vip-mockup.png" alt="Trivia Crack PRIME membership screen with Monthly and Yearly plans" class="cs-full-img" style="margin-top:0" />

            <!-- Design-thinking sub-steps -->
            <div>
              <details class="cs-accordion" open>
                <summary>
                  <div class="cs-accordion-left">
                    <span class="cs-accordion-num">01</span>
                    <span class="cs-accordion-title">Emphasize</span>
                  </div>
                  <span class="cs-accordion-icon">+</span>
                </summary>
                <div class="cs-accordion__body">
                  <div class="cs-cols-2">
                    <div>
                      <h3 class="cs-heading">Scope</h3>
                      <p class="cs-text">The membership bundles together the perks players value most:</p>
                      <ul class="cs-goals-list">
                        <li>An ad-free experience.</li>
                        <li>Free rewards from the prize wheel.</li>
                        <li>Unlimited lives.</li>
                        <li>A 3-day free trial.</li>
                      </ul>
                    </div>
                    <div>
                      <h3 class="cs-heading">Benchmark</h3>
                      <p class="cs-text">To shape the VIP Membership, we studied how successful products present premium memberships &mdash; how they communicate value and encourage players to upgrade:</p>
                      <ul class="cs-goals-list">
                        <li>Coin Master</li>
                        <li>Duolingo</li>
                        <li>Clash Royale</li>
                      </ul>
                      <p class="cs-text" style="margin-top:24px">These learnings informed the redesigned Shop and the new VIP Membership, making premium benefits more visible and easier to understand.</p>
                    </div>
                  </div>
                  <div class="cs-blue-box">
                    <p><strong>Insights:</strong> Surface the membership from within the Shop, offer a free trial for the first week, and keep the choice simple with just two plans.</p>
                  </div>
                  <table class="cs-insights-table">
                    <thead>
                      <tr>
                        <th>Insight</th>
                        <th>Recurrence</th>
                        <th>Criticality</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>"I subscribe because otherwise I wouldn't be able to access the exclusive content."</td>
                        <td>100%<br>(5/5)</td>
                        <td><span class="cs-crit" style="background:#f5333f">5</span></td>
                      </tr>
                      <tr>
                        <td>"The version without ads is worth it because I spend so much time in the app."</td>
                        <td>90%<br>(4/5)</td>
                        <td><span class="cs-crit" style="background:#f5a623">2.5</span></td>
                      </tr>
                      <tr>
                        <td>"I don't buy anything in the game because I don't see the value in paying for something I can get for free."</td>
                        <td>75%<br>(3/5)</td>
                        <td><span class="cs-crit" style="background:#f5333f">5</span></td>
                      </tr>
                      <tr>
                        <td>"My pet frustrates me &mdash; it's hard to feed and it doesn't feel connected to the trivia itself."</td>
                        <td>64%<br>(2/5)</td>
                        <td><span class="cs-crit" style="background:#f08c8c">4</span></td>
                      </tr>
                      <tr>
                        <td>"I buy the Trivia Pass when the cost-to-benefit ratio feels right."</td>
                        <td>30%<br>(2/5)</td>
                        <td><span class="cs-crit" style="background:#ffc93c">3</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </details>

              <details class="cs-accordion" open>
                <summary>
                  <div class="cs-accordion-left">
                    <span class="cs-accordion-num">02</span>
                    <span class="cs-accordion-title">Define</span>
                  </div>
                  <span class="cs-accordion-icon">+</span>
                </summary>
                <div class="cs-accordion__body">
                  <span class="cs-label-purple">DEFINE</span>
                  <h3 class="cs-heading">Persona</h3>
                  <p class="cs-text">Who are our players, how do they think, and what's their context? What do they need, and where do they struggle?</p>
                  <div class="cs-persona-card">
                    <div class="cs-persona-grid">

                      <div class="cs-persona-problem">
                        <span class="cs-hmw-section-label">Problem Statement</span>
                        <ol class="cs-persona-steps">
                          <li class="cs-persona-step">
                            <span class="cs-persona-num">01</span>
                            <p>Premium players need reassurance that they won't lose their unlimited ad-free access, since they spend so much time in the app.</p>
                          </li>
                          <li class="cs-persona-step">
                            <span class="cs-persona-num">02</span>
                            <p>Paying players want exclusive content &mdash; it's one of the main reasons they spend money in the free version.</p>
                          </li>
                          <li class="cs-persona-step">
                            <span class="cs-persona-num">03</span>
                            <p>Paying players need a clearer Trivia Pass design, since its timing is confusing in the free version.</p>
                          </li>
                        </ol>
                      </div>

                      <div class="cs-persona-profile">
                        <div class="cs-persona-head">
                          <div class="cs-persona-id">
                            <span class="cs-persona-name">Sandra Grant</span>
                            <span class="cs-persona-role">Art Teacher</span>
                          </div>
                          <ul class="cs-persona-facts">
                            <li>60 years</li>
                            <li>Retired</li>
                            <li>Divorced</li>
                            <li>Chicago</li>
                          </ul>
                        </div>
                        <div class="cs-persona-traits">
                          <div class="cs-persona-trait">
                            <span class="cs-persona-trait-label">Engagement</span>
                            <p>She enjoys playing without ads &mdash; a benefit she's happy to pay for.</p>
                          </div>
                          <div class="cs-persona-trait">
                            <span class="cs-persona-trait-label">Personality</span>
                            <p>A music lover (Queen, The Beatles) and part of the 60+ audience.</p>
                          </div>
                          <div class="cs-persona-trait">
                            <span class="cs-persona-trait-label">Goals</span>
                            <p>Friendly, social competition and steadily improving her skills.</p>
                          </div>
                          <div class="cs-persona-trait">
                            <span class="cs-persona-trait-label">Frustrations</span>
                            <p>Interruptions &mdash; especially not being able to finish a match after running out of lives.</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </details>

              <details class="cs-accordion" open>
                <summary>
                  <div class="cs-accordion-left">
                    <span class="cs-accordion-num">03</span>
                    <span class="cs-accordion-title">Ideate</span>
                  </div>
                  <span class="cs-accordion-icon">+</span>
                </summary>
                <div class="cs-accordion__body">
                  <span class="cs-label-purple">IDEATE</span>
                  <h3 class="cs-heading">Wireflow</h3>
                  <p class="cs-text">Before designing and prototyping, we mapped how players would move through the feature to reach each goal.</p>

                  <div class="cs-objectives">
                    <div class="cs-objective">
                      <span class="cs-objective-num">01</span>
                      <p>Convert more players into payers</p>
                    </div>
                    <div class="cs-objective">
                      <span class="cs-objective-num">02</span>
                      <p>Improve retention among those players</p>
                    </div>
                    <div class="cs-objective">
                      <span class="cs-objective-num">03</span>
                      <p>Increase repeat purchases</p>
                    </div>
                  </div>

                  <div class="cs-wireflow">
                    <div class="cs-wireflow-head">
                      <h4 class="cs-wireflow-title">Basic Plan Wireflow</h4>
                      <div class="cs-legend">
                        <span class="cs-legend-item"><span class="cs-legend-swatch" style="background:#4c9af5"></span>Screen</span>
                        <span class="cs-legend-item"><span class="cs-legend-swatch" style="background:#9b5cf0"></span>Action</span>
                        <span class="cs-legend-item"><span class="cs-legend-swatch" style="background:#8b93a3"></span>Condition</span>
                      </div>
                    </div>
                                        <div class="cs-flow-canvas">
                      <svg viewBox="0 0 1520 900" role="img" xmlns="http://www.w3.org/2000/svg" font-family="Switzer, sans-serif" aria-label="Basic Plan Wireflow for the VIP Membership: entry points (Shop, Dashboard, Ruleta, Classic, Profile) surface the PRIME offer; Tap, Buy and Cancel decisions lead through a 3-day free trial to being charged, with a Profile path to manage the plan."><defs><marker id="ar-green" markerWidth="9" markerHeight="9" refX="6.5" refY="3.2" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L7,3.2 L0,6.4 Z" fill="#3fa03f"/></marker><marker id="ar-red" markerWidth="9" markerHeight="9" refX="6.5" refY="3.2" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L7,3.2 L0,6.4 Z" fill="#ef5b3d"/></marker><marker id="ar-blue" markerWidth="9" markerHeight="9" refX="6.5" refY="3.2" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L7,3.2 L0,6.4 Z" fill="#4c9af5"/></marker><marker id="ar-purple" markerWidth="9" markerHeight="9" refX="6.5" refY="3.2" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L7,3.2 L0,6.4 Z" fill="#9b5cf0"/></marker><filter id="nsh" x="-25%" y="-25%" width="150%" height="150%"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0b1830" flood-opacity="0.16"/></filter></defs><path d="M406.0,300.0 L478.0,300.0" fill="none" stroke="#4c9af5" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar-blue)"/><path d="M808.0,300.0 L861.0,300.0" fill="none" stroke="#4c9af5" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar-blue)"/><path d="M1194.0,300.0 L1210.0,300.0" fill="none" stroke="#4c9af5" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar-blue)"/><path d="M1100.0,346.0 L1100.0,410.0" fill="none" stroke="#4c9af5" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar-blue)"/><path d="M520.0,258.0 L520.0,234.0 Q520.0,222.0 532.0,222.0 L698.0,222.0 Q710.0,222.0 710.0,234.0 L710.0,252.0" fill="none" stroke="#3fa03f" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar-green)"/><path d="M905.0,256.0 L905.0,234.0 Q905.0,222.0 917.0,222.0 L1088.0,222.0 Q1100.0,222.0 1100.0,234.0 L1100.0,252.0" fill="none" stroke="#3fa03f" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar-green)"/><path d="M1258.0,254.0 L1258.0,104.0 Q1258.0,92.0 1246.0,92.0 L333.0,92.0 Q321.0,92.0 321.0,104.0 L321.0,148.0" fill="none" stroke="#3fa03f" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar-green)"/><path d="M710.0,682.0 L710.0,348.0" fill="none" stroke="#3fa03f" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar-green)"/><path d="M380.0,460.0 L710.0,460.0" fill="none" stroke="#3fa03f" stroke-width="2.2" stroke-linecap="round"/><path d="M378.0,580.0 L710.0,580.0" fill="none" stroke="#3fa03f" stroke-width="2.2" stroke-linecap="round"/><path d="M176.0,682.0 L710.0,682.0" fill="none" stroke="#4c9af5" stroke-width="2.2" stroke-linecap="round"/><path d="M165.0,300.0 L232.0,300.0" fill="none" stroke="#ef5b3d" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar-red)"/><path d="M520.0,342.0 L520.0,370.0 Q520.0,382.0 508.0,382.0 L312.0,382.0 Q300.0,382.0 300.0,370.0 L300.0,340.0" fill="none" stroke="#ef5b3d" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar-red)"/><path d="M905.0,344.0 L905.0,398.0 Q905.0,410.0 893.0,410.0 L357.0,410.0 Q345.0,410.0 345.0,398.0 L345.0,340.0" fill="none" stroke="#ef5b3d" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar-red)"/><path d="M1304.0,300.0 L1336.0,300.0" fill="none" stroke="#ef5b3d" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar-red)"/><path d="M338.0,502.0 L338.0,512.0 Q338.0,522.0 328.0,522.0 L102.0,522.0 Q90.0,522.0 90.0,510.0 L90.0,484.0" fill="none" stroke="#ef5b3d" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar-red)"/><path d="M338.0,620.0 L338.0,629.0 Q338.0,638.0 329.0,638.0 L102.0,638.0 Q90.0,638.0 90.0,626.0 L90.0,604.0" fill="none" stroke="#ef5b3d" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar-red)"/><path d="M165.0,800.0 L258.0,800.0" fill="none" stroke="#9b5cf0" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar-purple)"/><path d="M422.0,800.0 L442.0,800.0 Q454.0,800.0 454.0,788.0 L454.0,763.0 Q454.0,751.0 466.0,751.0 L484.0,751.0" fill="none" stroke="#9b5cf0" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar-purple)"/><path d="M422.0,800.0 L451.0,800.0 Q454.0,800.0 454.0,803.0 L454.0,803.0 Q454.0,806.0 457.0,806.0 L484.0,806.0" fill="none" stroke="#9b5cf0" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar-purple)"/><path d="M422.0,800.0 L442.0,800.0 Q454.0,800.0 454.0,812.0 L454.0,846.0 Q454.0,858.0 466.0,858.0 L484.0,858.0" fill="none" stroke="#9b5cf0" stroke-width="2.2" stroke-linecap="round" marker-end="url(#ar-purple)"/><rect x="15" y="278" width="150" height="44" rx="22" fill="#9b5cf0" filter="url(#nsh)"/><text x="90" y="304.9" text-anchor="middle" fill="#fff" font-size="14" font-weight="500"><tspan x="90" dy="0">Shop</tspan></text><rect x="15" y="438" width="150" height="44" rx="22" fill="#9b5cf0" filter="url(#nsh)"/><text x="90" y="464.4" text-anchor="middle" fill="#fff" font-size="12.5" font-weight="500"><tspan x="90" dy="0">Dashboard - Lives</tspan></text><rect x="15" y="558" width="150" height="44" rx="22" fill="#9b5cf0" filter="url(#nsh)"/><text x="90" y="584.9" text-anchor="middle" fill="#fff" font-size="14" font-weight="500"><tspan x="90" dy="0">Ruleta</tspan></text><rect x="12" y="654" width="164" height="56" rx="20" fill="#9b5cf0" filter="url(#nsh)"/><text x="94" y="678.9" text-anchor="middle" fill="#fff" font-size="11" font-weight="500"><tspan x="94" dy="0">Classic - game interruption</tspan><tspan x="94" dy="14">due to lack of lives</tspan></text><rect x="15" y="778" width="150" height="44" rx="22" fill="#9b5cf0" filter="url(#nsh)"/><text x="90" y="804.9" text-anchor="middle" fill="#fff" font-size="14" font-weight="500"><tspan x="90" dy="0">Profile</tspan></text><rect x="1012" y="412" width="180" height="60" rx="12" fill="#9b5cf0" filter="url(#nsh)"/><text x="1102" y="432.5" text-anchor="middle" fill="#fff" font-size="10" font-weight="500"><tspan x="1102" dy="0">After X days, a notification is sent</tspan><tspan x="1102" dy="13">reminding you that the free time through</tspan><tspan x="1102" dy="13">AppleStore ends in 1 day</tspan></text><rect x="236" y="150" width="170" height="40" rx="12" fill="#4c9af5" filter="url(#nsh)"/><text x="321" y="167.0" text-anchor="middle" fill="#fff" font-size="10" font-weight="500"><tspan x="321" dy="0">CTA changes to</tspan><tspan x="321" dy="13">“Reactive TriviaCrack Prime”</tspan></text><rect x="236" y="262" width="170" height="76" rx="12" fill="#4c9af5" filter="url(#nsh)"/><text x="321" y="288.6" text-anchor="middle" fill="#fff" font-size="13" font-weight="500"><tspan x="321" dy="0">We offer PRIME</tspan><tspan x="321" dy="16">Membership Section for</tspan><tspan x="321" dy="16">basic plan</tspan></text><rect x="612" y="254" width="196" height="92" rx="12" fill="#4c9af5" filter="url(#nsh)"/><text x="710" y="282.9" text-anchor="middle" fill="#fff" font-size="11" font-weight="500"><tspan x="710" dy="0">informative popup of the basic plan</tspan><tspan x="710" dy="14">with 3-day Free Trial</tspan><tspan x="710" dy="14">The user gives the card details</tspan><tspan x="710" dy="14">through Apple Store/Google Play</tspan></text><rect x="1006" y="254" width="188" height="92" rx="12" fill="#4c9af5" filter="url(#nsh)"/><text x="1100" y="289.2" text-anchor="middle" fill="#fff" font-size="12" font-weight="500"><tspan x="1100" dy="0">Get Free Trial x 3 days of Basic Plan</tspan><tspan x="1100" dy="15">Access to NoAds, Free Roulette and</tspan><tspan x="1100" dy="15">unlimited lives</tspan></text><rect x="1338" y="228" width="166" height="146" rx="12" fill="#4c9af5" filter="url(#nsh)"/><text x="1421" y="255.8" text-anchor="middle" fill="#fff" font-size="11" font-weight="500"><tspan x="1421" dy="0">You are charged for the</tspan><tspan x="1421" dy="14">PlanBasic and the shop access</tspan><tspan x="1421" dy="14">disappears until we have the</tspan><tspan x="1421" dy="14">gold plan with the upgrade:</tspan><tspan x="1421" dy="14"> </tspan><tspan x="1421" dy="14">Unlimited lives appear on the</tspan><tspan x="1421" dy="14">dashboard and free roulette in</tspan><tspan x="1421" dy="14">the shop</tspan></text><rect x="262" y="778" width="160" height="44" rx="12" fill="#4c9af5" filter="url(#nsh)"/><text x="342" y="804.2" text-anchor="middle" fill="#fff" font-size="12" font-weight="500"><tspan x="342" dy="0">Tab TriviaCrackPrime</tspan></text><rect x="486" y="726" width="150" height="50" rx="12" fill="#4c9af5" filter="url(#nsh)"/><text x="561" y="747.8" text-anchor="middle" fill="#fff" font-size="11.5" font-weight="500"><tspan x="561" dy="0">Information about the</tspan><tspan x="561" dy="14.5">current plan</tspan></text><rect x="486" y="784" width="150" height="44" rx="12" fill="#4c9af5" filter="url(#nsh)"/><text x="561" y="810.0" text-anchor="middle" fill="#fff" font-size="11.5" font-weight="500"><tspan x="561" dy="0">Plan Gold (upgrade)</tspan></text><rect x="486" y="836" width="150" height="44" rx="12" fill="#4c9af5" filter="url(#nsh)"/><text x="561" y="862.0" text-anchor="middle" fill="#fff" font-size="11.5" font-weight="500"><tspan x="561" dy="0">Unsubscribe</tspan></text><polygon points="520,258 562,300 520,342 478,300" fill="#8b93a3" filter="url(#nsh)"/><text x="520" y="304.6" text-anchor="middle" fill="#fff" font-size="13" font-weight="600"><tspan x="520" dy="0">Tap?</tspan></text><polygon points="905,256 949,300 905,344 861,300" fill="#8b93a3" filter="url(#nsh)"/><text x="905" y="304.6" text-anchor="middle" fill="#fff" font-size="13" font-weight="600"><tspan x="905" dy="0">Buy?</tspan></text><polygon points="1258,254 1304,300 1258,346 1212,300" fill="#8b93a3" filter="url(#nsh)"/><text x="1258" y="297.9" text-anchor="middle" fill="#fff" font-size="11" font-weight="600"><tspan x="1258" dy="0">Cancel</tspan><tspan x="1258" dy="12">suscri...</tspan></text><polygon points="338,418 380,460 338,502 296,460" fill="#8b93a3" filter="url(#nsh)"/><text x="338" y="457.9" text-anchor="middle" fill="#fff" font-size="11" font-weight="600"><tspan x="338" dy="0">Tap Live</tspan><tspan x="338" dy="12">icon?</tspan></text><polygon points="338,540 378,580 338,620 298,580" fill="#8b93a3" filter="url(#nsh)"/><text x="338" y="577.7" text-anchor="middle" fill="#fff" font-size="12" font-weight="600"><tspan x="338" dy="0">See</tspan><tspan x="338" dy="13">ad?</tspan></text><text x="600" y="213" text-anchor="middle" font-size="12.5" font-weight="700" paint-order="stroke" stroke="#ffffff" stroke-width="3.5" stroke-linejoin="round" fill="#3fa03f">yes</text><text x="1000" y="213" text-anchor="middle" font-size="12.5" font-weight="700" paint-order="stroke" stroke="#ffffff" stroke-width="3.5" stroke-linejoin="round" fill="#3fa03f">yes</text><text x="800" y="84" text-anchor="middle" font-size="12.5" font-weight="700" paint-order="stroke" stroke="#ffffff" stroke-width="3.5" stroke-linejoin="round" fill="#3fa03f">yes</text><text x="690" y="452" text-anchor="middle" font-size="12.5" font-weight="700" paint-order="stroke" stroke="#ffffff" stroke-width="3.5" stroke-linejoin="round" fill="#3fa03f">yes</text><text x="688" y="572" text-anchor="middle" font-size="12.5" font-weight="700" paint-order="stroke" stroke="#ffffff" stroke-width="3.5" stroke-linejoin="round" fill="#3fa03f">yes</text><text x="410" y="375" text-anchor="middle" font-size="12.5" font-weight="700" paint-order="stroke" stroke="#ffffff" stroke-width="3.5" stroke-linejoin="round" fill="#ef5b3d">No</text><text x="628" y="403" text-anchor="middle" font-size="12.5" font-weight="700" paint-order="stroke" stroke="#ffffff" stroke-width="3.5" stroke-linejoin="round" fill="#ef5b3d">No</text><text x="1322" y="287" text-anchor="middle" font-size="12.5" font-weight="700" paint-order="stroke" stroke="#ffffff" stroke-width="3.5" stroke-linejoin="round" fill="#ef5b3d">No</text><text x="210" y="515" text-anchor="middle" font-size="12.5" font-weight="700" paint-order="stroke" stroke="#ffffff" stroke-width="3.5" stroke-linejoin="round" fill="#ef5b3d">No</text><text x="210" y="631" text-anchor="middle" font-size="12.5" font-weight="700" paint-order="stroke" stroke="#ffffff" stroke-width="3.5" stroke-linejoin="round" fill="#ef5b3d">No</text><text x="432" y="672" text-anchor="middle" font-size="9" font-weight="700" paint-order="stroke" stroke="#ffffff" stroke-width="3.5" stroke-linejoin="round" fill="#6b6b6b">The membership bottom sheet is automatically triggered with content “Get unlimited lives and more rewards”</text></svg>
                    </div>
                  </div>
                </div>
              </details>

              <details class="cs-accordion">
                <summary>
                  <div class="cs-accordion-left">
                    <span class="cs-accordion-num">04</span>
                    <span class="cs-accordion-title">Prototype</span>
                  </div>
                  <span class="cs-accordion-icon">+</span>
                </summary>
                <div class="cs-accordion__body"></div>
              </details>

              <details class="cs-accordion" open>
                <summary>
                  <div class="cs-accordion-left">
                    <span class="cs-accordion-num">05</span>
                    <span class="cs-accordion-title">Test</span>
                  </div>
                  <span class="cs-accordion-icon">+</span>
                </summary>
                <div class="cs-accordion__body">
                  <p class="cs-text">Testing documentation is in progress &mdash; stay tuned.</p>
                </div>
              </details>
            </div>
          </div>
        </details>

        <!-- ===================== PROJECT 2 ===================== -->
        <details class="cs-project" open>
          <summary class="cs-project__summary">
            <span class="cs-project__pill">Project 2 | Quick Profile Update</span>
            <span class="cs-project__chevron" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>
          </summary>
          <div class="cs-project__body">

            <div class="cs-block">
              <span class="cs-label-gray">FTUE</span>
              <h3 class="cs-heading">Sign-in</h3>
              <p class="cs-text">We reworked the sign-in process to clarify the steps players take before creating an account, reducing confusion for first-time players and setting clear expectations from the very first screen. We mapped the different entry flows &mdash; depending on whether the device had already been purchased &mdash; and defined clear objectives and baseline metrics up front, so we could keep the experience frictionless while measuring its impact on the business.</p>
              <div class="cs-cols-2">
                <div>
                  <span class="cs-label-gray">User experience goals</span>
                  <ul class="cs-goals-list">
                    <li>Make the path to creating an account clear and predictable.</li>
                    <li>Support both purchased-device and new-device flows.</li>
                    <li>Keep every step straightforward and frictionless.</li>
                    <li>Let players personalize their profile quickly &mdash; nickname and avatar.</li>
                  </ul>
                </div>
                <div>
                  <span class="cs-label-gray">Business objectives</span>
                  <ul class="cs-goals-list">
                    <li>Increase Day 7 retention by improving the first-time experience.</li>
                    <li>Reduce onboarding drop-off by simplifying sign-in and account creation.</li>
                    <li>Lift sign-in and account-creation completion rates.</li>
                    <li>Move more players through onboarding and into the core experience.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="cs-cols-3">
              <div class="cs-col">
                <span class="cs-label-gray">Problem Statement</span>
                <p class="cs-text">New players had no simple way to set or update their basic profile &mdash; nickname and avatar &mdash; during their first session, which added friction right at the start.</p>
              </div>
              <div class="cs-col">
                <span class="cs-label-gray">GOAL</span>
                <p class="cs-text">Improve the first-time experience by letting players easily set their personal information the first time they open the app, so their profile feels personal from the very start.</p>
              </div>
              <div class="cs-col">
                <span class="cs-label-gray">THE CHALLENGE</span>
                <p class="cs-text">Design a simple, friendly solution that asks for just the right amount of information &mdash; without overwhelming new players.</p>
              </div>
            </div>

            <img src="assets/etermax/profile-mockup.png" alt="Quick Profile Update modal — Hi, Peter Hackman, pick your favorite avatar" class="cs-full-img" style="margin-top:0" />

            <div class="cs-cols-2">
              <div>
                <h3 class="cs-heading">Research Analysis</h3>
                <p class="cs-text">We analyzed the results together with Etermax's UX Research team.</p>
                <ul class="cs-goals-list">
                  <li>We ran remote Playtests with new players in the US.</li>
                  <li>We chose this approach because we needed fast input from new US players within our time and budget.</li>
                  <li>We ran a <strong>benchmark</strong> to see how competitors solved the same problem.</li>
                </ul>
              </div>
              <div>
                <h3 class="cs-heading">User Needs</h3>
                <ul class="cs-goals-list">
                  <li>We found that <strong>players wanted to change their nickname quickly</strong>, since <strong>many preferred not to reveal their real identity</strong> to other players.</li>
                  <li>This mattered: <strong>players were starting matches frustrated and anxious</strong> because they couldn't find a fast way to update their details.</li>
                  <li>They also expected the change to feel instant &mdash; with no need to dig through settings menus.</li>
                </ul>
              </div>
            </div>

            <div class="cs-blue-box">
              <p>We tested the low-fidelity prototype in the office with players in Argentina. From the results, we built a <strong>cost/benefit</strong> map to set <strong>priorities and next iterations</strong>, then moved into the <strong>high-fidelity version</strong> to bring into the onboarding.</p>
            </div>

            <img src="assets/etermax/signin-flow.png" alt="Quick Profile Update flow across three screens" class="cs-full-img" style="margin-top:0" />
          </div>
        </details>

        <!-- ===================== PROJECT 3 ===================== -->
        <details class="cs-project" open>
          <summary class="cs-project__summary">
            <span class="cs-project__pill">Project 3 | UI Animations</span>
            <span class="cs-project__chevron" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>
          </summary>
          <div class="cs-project__body">

            <div class="cs-block">
              <span class="cs-label-gray">MOTION</span>
              <h3 class="cs-heading">UI Animations</h3>
              <div class="cs-cols-2">
                <p class="cs-text">To bring the redesigned screens to life, I added a layer of motion across key flows &mdash; subtle, purposeful animations that make interactions feel responsive and reinforce Trivia Crack's playful personality. The final deliverables below cover the win &amp; claim moment, the question round, the game lobby, a loading transition, and the category wheel, showing how each interaction came to life.</p>
                <div>
                  <span class="cs-label-gray">GOALS</span>
                  <ul class="cs-goals-list">
                    <li>Give clear feedback on key actions like purchases and rewards.</li>
                    <li>Guide attention toward important moments and calls to action.</li>
                    <li>Add delight without slowing players down.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="cs-anim-grid">
              <img class="cs-anim" src="assets/etermax/anim-won.gif" alt="Animated “You won” results screen with the reward claiming in" loading="lazy" />
              <img class="cs-anim" src="assets/etermax/anim-quiz.gif" alt="Animated quiz question with its answer options" loading="lazy" />
              <img class="cs-anim" src="assets/etermax/anim-play.gif" alt="Animated game lobby with the Play button" loading="lazy" />
              <img class="cs-anim" src="assets/etermax/anim-modal.gif" alt="Loading transition animation" loading="lazy" />
              <img class="cs-anim" src="assets/etermax/anim-wheel.gif" alt="Category wheel spinning into a question round" loading="lazy" />
            </div>
          </div>
        </details>
      `,
    },
    orion: {
      name: "Orion",
      meta: {
        client: "Accenture",
        type: "Product Design · UX UI · Video",
        year: "2019 — 2021",
        role: "Senior Creative Designer",
      },
      image: null,
      body: `<p class="cs-text">Video and identity design system for enterprise clients. Creative direction, brand identity, and digital campaigns ensuring visual coherence across multiple accounts and agile methodologies.</p>`,
    },
    arredo: {
      name: "Ecommerce",
      meta: {
        client: "Arredo",
        type: "Product Design · UX UI",
        year: "2016 — 2019",
        role: "UX/UI Designer",
      },
      image: "assets/arredo.png",
      body: `<p class="cs-text">Designing the ecommerce experience for one of Argentina's leading furniture brands—homepage to checkout, optimising conversion, product discovery, and the full mobile experience.</p>`,
    },
  };

  function initProjectModals() {
    const cards   = document.querySelectorAll(".work-card[data-project]");
    const overlay = document.getElementById("project-modal");
    if (!cards.length || !overlay) return;

    const closeBtn  = overlay.querySelector(".modal__close");
    const titleEl   = overlay.querySelector("#modal-title");
    const heroEl    = overlay.querySelector(".modal__hero");
    const bodyEl    = overlay.querySelector(".modal__body");
    const contentEl = overlay.querySelector(".modal__content");

    let lastFocused = null;

    const linkEl = overlay.querySelector("[data-link-el]");
    const linkCard = overlay.querySelector("#modal-link-card");

    function openModal(id) {
      const data = PROJECTS[id];
      if (!data) return;

      // Sidebar title
      titleEl.textContent = data.name;

      // Sidebar meta fields — show optional rows only when non-empty
      overlay.querySelectorAll("[data-field]").forEach((el) => {
        const value = data.meta[el.dataset.field] || "";
        el.textContent = value;
        const row = el.closest("[data-optional]");
        if (row) row.classList.toggle("is-visible", !!value);
      });

      // Sidebar project link card
      if (linkCard && linkEl) {
        if (data.link) {
          linkEl.href = data.link.href;
          linkEl.textContent = data.link.label;
          linkCard.hidden = false;
        } else {
          linkCard.hidden = true;
        }
      }

      // Content hero + body
      heroEl.innerHTML = data.image
        ? `<img class="modal__hero-img" src="${data.image}" alt="${data.name}" />`
        : "";
      bodyEl.innerHTML = data.body || "";

      contentEl.scrollTop = 0;
      document.body.classList.add("js-body-locked");
      overlay.removeAttribute("aria-hidden");
      overlay.classList.add("is-open");
      closeBtn.focus();
    }

    function closeModal() {
      overlay.classList.remove("is-open");
      document.body.classList.remove("js-body-locked");
      overlay.setAttribute("aria-hidden", "true");
      if (lastFocused) lastFocused.focus();
    }

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        lastFocused = card;
        openModal(card.dataset.project);
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          lastFocused = card;
          openModal(card.dataset.project);
        }
      });
    });

    closeBtn.addEventListener("click", closeModal);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  /* ---------------------------------------------------------------------------
     Bootstrap
  --------------------------------------------------------------------------- */
  function init() {
    initMarquee(document.querySelector("[data-marquee]"));
    initNavToggle(document.querySelector(".nav-toggle"));
    initReveal(Array.from(document.querySelectorAll("[data-reveal]")));
    initWorkCards();
    initProjectModals();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
