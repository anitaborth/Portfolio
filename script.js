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
      link: { label: "Check Website Project →", href: "https://morpheus-website-brown.vercel.app/" },
      video: {
        label: "Watch Instagram video →",
        href: "#",
        src: "assets/morpheus/promo-video.mp4",
      },
      qr: {
        image: "assets/morpheus/qr-appstore.svg",
        alt: "QR code — download Morpheus on the App Store",
        caption: "Scan to download Morpheus from the App Store.",
        downloadLabel: "Download on the App Store →",
        downloadHref: "https://apps.apple.com/us/app/morpheus-training/id1259741445",
      },
      image: "assets/morpheus/header.png",
      body: `
        <!-- ===================== WEBSITE ===================== -->
        <details class="cs-project">
          <summary class="cs-project__summary">
            <span class="cs-project__pill">Website</span>
            <span class="cs-project__chevron" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>
          </summary>
          <div class="cs-project__body">
            <div>
              <video class="cs-full-img" controls playsinline style="margin-top:0; border-radius:20px;">
                <source src="assets/morpheus/website-video.mp4" type="video/mp4" />
              </video>
              <a href="https://morpheus-website-brown.vercel.app/" target="_blank" rel="noopener noreferrer" class="cs-prototype-cta__link cta-link" style="display:inline-block; margin-top:20px;">Check Website Project &rarr;</a>
            </div>
          </div>
        </details>

        <!-- ===================== MOBILE APP ===================== -->
        <details class="cs-project" open>
          <summary class="cs-project__summary">
            <span class="cs-project__pill">Mobile App</span>
            <span class="cs-project__chevron" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>
          </summary>
          <div class="cs-project__body">

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

        <video class="cs-full-img" autoplay loop muted playsinline style="margin-top:0; border-radius:20px;">
          <source src="assets/morpheus/videos-morpheus.mp4" type="video/mp4" />
        </video>

        <div class="cs-old-app-hover">
          <span class="cs-label-gray">PREVIOUS VERSION</span>
          <button
            class="cs-old-app-hover__trigger"
            type="button"
            data-preview-src="assets/morpheus/oldapp.png"
            aria-label="Preview previous Morpheus app"
          >View old app ↗</button>
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

        <div class="cs-feature-block">
          <div class="cs-feature-header">
            <div class="cs-feature-header-left">
              <span class="cs-label-gray">KEY FEATURE 4</span>
              <h3 class="cs-feature-title">Challenge</h3>
              <p class="cs-feature-subtitle">Users participate in a monthly challenge where they can compare their progress on various metrics, including Recovery, Sleep, Steps, and Workouts, with other users. They can also earn points by reading daily posts.</p>
            </div>
            <div class="cs-feature-header-right">
              <span class="cs-label-gray">GOALS</span>
              <ul class="cs-goals-list">
                <li>Redesign the flow by enhancing the UI and the information architecture of each screen.</li>
                <li>Boost engagement with this new look and feel.</li>
                <li>Refine the communication of progress.</li>
                <li>Improve the explanations of how the points work.</li>
              </ul>
            </div>
          </div>
          <div class="cs-phone-cards">
            <div class="cs-phone-card"><img src="assets/morpheus/challenge1.png" alt="Challenge screen 1" /></div>
            <div class="cs-phone-card"><img src="assets/morpheus/challenge2.png" alt="Challenge screen 2" /></div>
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
              <p class="cs-prototype-cta__text">An interactive prototype of the AI Insights feature above &mdash; not the full Morpheus app.</p>
            </div>
            <a href="https://www.figma.com/make/lqrzeSDp624s3JreXlor38/AI-Mobile-App---V2?fullscreen=1&t=OMpqJS5wWPVAiTj1-1&code-node-id=0-9" target="_blank" rel="noopener noreferrer" class="cs-prototype-cta__link cta-link">Try the AI Insights prototype →</a>
          </div>
        </div>

          </div>
        </details>
      `,
    },
    "design-system": {
      name: "Embassy Design System",
      meta: {
        client: "Amalgama",
        type: "Design System - UI - AI",
        year: "2026",
        role: "Sr. UI designer",
        tools: "Figma, Claude",
      },
      link: { label: "Check Website Project", href: "#" },
      image: "assets/embassy/hero.png",
      body: `
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

        <div class="cs-block">
          <span class="cs-label-gray">OVERVIEW</span>
          <h3 class="cs-heading">What Embassy is, and how it's organized</h3>
          <p class="cs-text">Embassy is Amalgama's single source of truth for product UI: the tokens, components, and usage guidelines every team pulls from, whether they're designing in Figma, prototyping with AI, or shipping code. We structured the documentation around three questions &mdash; what the system is, who it serves, and how to use it &mdash; so a new teammate, or a language model reading the docs, can get oriented in minutes instead of days.</p>
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
          <p class="cs-text">Today Embassy ships 30 documented components &mdash; from foundational buttons and inputs to complex patterns like data tables, bottom sheets, and empty states &mdash; each with usage guidelines, accessibility notes, and code-ready specs. It's the same library whether a designer opens Figma or an engineer prompts an AI assistant to scaffold a screen.</p>
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
              <div class="cs-blue-box">
                <p>Tested with players in Argentina and iterated with US players via Playtest and A/B tests. We applied Social Proof and Von Restorff Effect to restructure the shop into scannable modules — making the best offers impossible to miss.</p>
                <details class="cs-old-design-toggle">
                  <summary>See old design</summary>
                  <img src="assets/etermax/old-shop.png" alt="Old Trivia Crack shop screen" class="cs-full-img" style="margin-top:16px" />
                </details>
              </div>
            </div>

            <div class="cs-cols-3">
              <div class="cs-col">
                <span class="cs-label-gray">Problem Statement</span>
                <p class="cs-text">Only 7% of players made a purchase through the shop &mdash; they found the design unappealing and hard to navigate. With products buried in a single long list, most left without exploring what was on offer.</p>
              </div>
              <div class="cs-col">
                <span class="cs-label-gray">GOAL</span>
                <p class="cs-text">Improve the shopping experience and turn it into a growth driver.</p>
                <ul class="cs-goals-list">
                  <li>Present offers as self-contained modules, with daily gifts to build a return habit.</li>
                  <li>Lift shop conversion by 10&ndash;15% and grow ARPPU through repeat purchases.</li>
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
                  <li>Communicate each benefit clearly &mdash; no ads, free wheel, unlimited lives.</li>
                  <li>Lower the barrier with a 3-day trial to lift conversion 8&ndash;12% and Day 30 retention.</li>
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
              <details class="cs-accordion">
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
                      <p class="cs-text">The membership bundles together the perks players value most:</p>
                      <ul class="cs-goals-list">
                        <li>An ad-free experience.</li>
                        <li>Free rewards from the prize wheel.</li>
                        <li>Unlimited lives.</li>
                        <li>A 3-day free trial.</li>
                      </ul>
                    </div>
                    <div>
                      <p class="cs-text">We benchmarked how successful apps present premium memberships to shape the VIP offer:</p>
                      <ul class="cs-goals-list">
                        <li>Coin Master</li>
                        <li>Duolingo</li>
                        <li>Clash Royale</li>
                      </ul>
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

              <details class="cs-accordion">
                <summary>
                  <div class="cs-accordion-left">
                    <span class="cs-accordion-num">02</span>
                    <span class="cs-accordion-title">Define</span>
                  </div>
                  <span class="cs-accordion-icon">+</span>
                </summary>
                <div class="cs-accordion__body">
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

              <details class="cs-accordion">
                <summary>
                  <div class="cs-accordion-left">
                    <span class="cs-accordion-num">03</span>
                    <span class="cs-accordion-title">Ideate</span>
                  </div>
                  <span class="cs-accordion-icon">+</span>
                </summary>
                <div class="cs-accordion__body">

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

              <details class="cs-accordion">
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
            <span class="cs-project__pill">Project 2 | Onboarding</span>
            <span class="cs-project__chevron" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>
          </summary>
          <div class="cs-project__body">

            <div class="cs-cols-3">
              <div class="cs-col">
                <span class="cs-label-gray">Problem Statement</span>
                <p class="cs-text">A significant percentage of users dropped off in their first few days. Playtests showed new players felt overwhelmed by the content immediately after installing and didn't know where to begin.</p>
              </div>
              <div class="cs-col">
                <span class="cs-label-gray">GOAL</span>
                <p class="cs-text">Improve Day 7 retention through a progressive onboarding based on Goal Gradient Effect and Progressive Disclosure — guiding players through short daily objectives over their first seven days. Target: lift Day 7 retention by 8–12% and reduce first-session drop-off.</p>
              </div>
              <div class="cs-col">
                <span class="cs-label-gray">THE CHALLENGE</span>
                <p class="cs-text">Design a gamified onboarding journey of short, rewarding missions introducing each game mode one at a time, culminating in a reward chest — leaving players confident enough to explore on their own.</p>
              </div>
            </div>

            <img src="assets/etermax/onboarding.png" alt="Trivia Crack onboarding — staged missions introducing each game mode" class="cs-full-img" style="margin-top:0" />
          </div>
        </details>

        <!-- ===================== PROJECT 3 ===================== -->
        <details class="cs-project" open>
          <summary class="cs-project__summary">
            <span class="cs-project__pill">Project 3 | Quick Profile Update</span>
            <span class="cs-project__chevron" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>
          </summary>
          <div class="cs-project__body">

            <div class="cs-block">
              <span class="cs-label-gray">FTUE</span>
              <h3 class="cs-heading">Sign-in</h3>
            </div>

            <div class="cs-cols-3">
              <div class="cs-col">
                <span class="cs-label-gray">Problem</span>
                <p class="cs-text">New players often dropped off during their first session because creating an account and setting up a profile felt like an extra step before they could start playing. Playtests showed confusion around what information was required and when.</p>
              </div>
              <div class="cs-col">
                <span class="cs-label-gray">Goal</span>
                <p class="cs-text">Create a frictionless first-time experience by making sign-in optional when possible, simplifying profile creation, and helping players reach gameplay faster &mdash; targeting a 10&ndash;15% lift in account-creation completion and a meaningful cut in first-session drop-off.</p>
              </div>
              <div class="cs-col">
                <span class="cs-label-gray">Challenge</span>
                <p class="cs-text">Balance business needs &mdash; account creation and retention &mdash; with a lightweight onboarding experience that minimizes friction while still encouraging players to complete their profile.</p>
              </div>
            </div>

            <img src="assets/etermax/profile-mockup.png" alt="Quick Profile Update modal — Hi, Peter Hackman, pick your favorite avatar" class="cs-full-img" style="margin-top:0" />

            <div class="cs-cols-2">
              <div>
                <ul class="cs-goals-list">
                  <li>Remote Playtests with new US players, plus a benchmark of how competitors solved the same problem.</li>
                  <li>Players wanted to change their nickname quickly — many preferred not to reveal their real identity.</li>
                </ul>
              </div>
              <div>
                <ul class="cs-goals-list">
                  <li>Players were starting matches frustrated because they couldn't update their details fast enough.</li>
                  <li>They expected the change to feel instant — no digging through settings menus.</li>
                </ul>
              </div>
            </div>

            <div class="cs-blue-box">
              <p>We tested the low-fidelity prototype in the office with players in Argentina. From the results, we built a <strong>cost/benefit</strong> map to set <strong>priorities and next iterations</strong>, then moved into the <strong>high-fidelity version</strong> to bring into the onboarding.</p>
            </div>

            <img src="assets/etermax/signin-flow.png" alt="Quick Profile Update flow across three screens" class="cs-full-img" style="margin-top:0" />
          </div>
        </details>

        <!-- ===================== PROJECT 4 ===================== -->
        <details class="cs-project" open>
          <summary class="cs-project__summary">
            <span class="cs-project__pill">Project 4 | UI Animations</span>
            <span class="cs-project__chevron" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>
          </summary>
          <div class="cs-project__body">

            <div class="cs-block">
              <span class="cs-label-gray">MOTION</span>
              <h3 class="cs-heading">UI Animations</h3>
              <div class="cs-cols-3">
                <div class="cs-col">
                  <span class="cs-label-gray">FEEDBACK</span>
                  <p class="cs-text">Clear signals on purchases and rewards so players follow through on key actions.</p>
                </div>
                <div class="cs-col">
                  <span class="cs-label-gray">ATTENTION</span>
                  <p class="cs-text">Motion guides the eye to important moments and CTAs, improving adoption of the wheel and daily rewards.</p>
                </div>
                <div class="cs-col">
                  <span class="cs-label-gray">DELIGHT</span>
                  <p class="cs-text">Purposeful animations that reinforce Trivia Crack's playful personality without slowing players down.</p>
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
      image: "assets/orion/hero.png",
      body: `
        <div>
          <span class="cs-label-gray">OBJECTIVE</span>
          <h3 class="cs-heading">Objective</h3>
          <div class="cs-blue-box">
            <p>Help users learn how to use a complex workplace tool through gamification, making the learning experience more engaging, accessible, and enjoyable.</p>
          </div>
        </div>

        <div class="cs-cols-2">
          <div class="cs-col">
            <span class="cs-label-gray">CHALLENGES</span>
            <ul class="cs-goals-list">
              <li>Simplify complex product knowledge and transform it into an intuitive game experience.</li>
              <li>Encourage employees to adopt the learning platform regularly instead of relying on traditional documentation.</li>
            </ul>
          </div>
          <div class="cs-col">
            <span class="cs-label-gray">USER NEEDS</span>
            <p class="cs-text">Previously, users had to learn the tool through lengthy PowerPoint presentations that were difficult to follow and ineffective for knowledge retention. They needed a more engaging and interactive way to learn the platform.</p>
          </div>
        </div>

        <div class="cs-block">
          <span class="cs-label-gray">HOW WE SOLVED IT</span>
          <h3 class="cs-heading">A game that teaches through play</h3>
          <div class="cs-cols-2">
            <p class="cs-text">We designed a progression system with levels based on the different areas of the tool, allowing users to learn through a structured journey. To increase engagement, we introduced a leaderboard that encouraged friendly competition among coworkers.</p>
            <p class="cs-text">Before development, we tested interactive prototypes with internal team members to validate the user experience and identify usability issues early. We also conducted face-to-face user interviews to observe how people interacted with the game, understand their behavior, and gather qualitative feedback. Based on these insights, we iterated on the experience before releasing it to production.</p>
          </div>
        </div>

        <div>
          <span class="cs-label-gray">RESULTS</span>
          <h3 class="cs-heading">The impact</h3>
          <div class="cs-stats-grid">
            <div class="cs-stat">
              <span class="cs-stat-number">+20%</span>
              <p class="cs-stat-label">Increase in tool adoption</p>
            </div>
            <div class="cs-stat">
              <span class="cs-stat-number">80%</span>
              <p class="cs-stat-label">Of users completed all learning levels</p>
            </div>
            <div class="cs-stat">
              <span class="cs-stat-number">+50%</span>
              <p class="cs-stat-label">More content learned vs. the previous training method</p>
            </div>
          </div>
        </div>
      `,
    },
    arredo: {
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
    },
  };

  /* ---------------------------------------------------------------------------
     Module: video modal
     A lightbox video player (process/Instagram videos) opened via the
     "open-video-modal" custom event — kept decoupled from whichever UI
     triggers it (see initProjectModals) so either module works standalone.
  --------------------------------------------------------------------------- */
  function initVideoModal() {
    const overlay = document.getElementById("video-modal");
    if (!overlay) return;

    const closeBtn = overlay.querySelector(".video-modal__close");
    const player = overlay.querySelector(".video-modal__player");
    let lastFocused = null;

    function openVideo(src, label) {
      if (!src) return;
      lastFocused = document.activeElement;
      player.src = src;
      player.setAttribute("aria-label", label || "Process video");
      overlay.removeAttribute("aria-hidden");
      overlay.classList.add("is-open");

      player.currentTime = 0;
      const playPromise = player.play();
      if (playPromise && playPromise.catch) {
        // Autoplay with sound can be blocked — retry muted per browser policy.
        playPromise.catch(() => {
          player.muted = true;
          player.play().catch(() => {});
        });
      }
      closeBtn.focus();
    }

    function closeVideo() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      player.pause();
      player.removeAttribute("src");
      player.load();
      if (lastFocused) lastFocused.focus();
    }

    document.addEventListener("open-video-modal", (e) => {
      openVideo(e.detail && e.detail.src, e.detail && e.detail.label);
    });

    closeBtn.addEventListener("click", closeVideo);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeVideo();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) {
        // Registered before initProjectModals' Escape handler (see init()),
        // so this fires first — stop it here to avoid also closing the
        // project modal underneath in the same keystroke.
        e.stopImmediatePropagation();
        closeVideo();
      }
    });
  }

  /* ---------------------------------------------------------------------------
     Module: experiments calendar
     Opens a lightweight preview modal for each populated calendar day. Reads
     content straight off the button's data-* attributes, so new days can be
     added to experiments.html without touching this file.
  --------------------------------------------------------------------------- */
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

    const videoEl = overlay.querySelector("[data-video-link]");
    const videoCard = overlay.querySelector("#modal-video-card");

    const qrCard = overlay.querySelector("#modal-qr-card");
    const qrImgEl = overlay.querySelector("[data-qr-img]");
    const qrCaptionEl = overlay.querySelector("[data-qr-caption]");
    const qrLinkEl = overlay.querySelector("[data-qr-link]");

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

      // Sidebar process video card
      if (videoCard && videoEl) {
        if (data.video) {
          videoEl.href = data.video.href || "#";
          videoEl.textContent = data.video.label;
          videoEl.dataset.videoSrc = data.video.src || "";
          // target="_blank" is only appropriate for a real external link —
          // when we open an in-page video lightbox instead, drop it, since
          // some browsers begin the new-tab navigation before our JS
          // click handler's preventDefault() can cancel it.
          if (data.video.src) {
            videoEl.removeAttribute("target");
            videoEl.removeAttribute("rel");
          } else {
            videoEl.setAttribute("target", "_blank");
            videoEl.setAttribute("rel", "noopener");
          }
          videoCard.hidden = false;
        } else {
          videoCard.hidden = true;
          videoEl.dataset.videoSrc = "";
        }
      }

      // Sidebar live product / QR card
      if (qrCard && qrImgEl && qrCaptionEl && qrLinkEl) {
        if (data.qr) {
          qrImgEl.src = data.qr.image;
          qrImgEl.alt = data.qr.alt || "";
          qrCaptionEl.textContent = data.qr.caption || "";
          qrLinkEl.href = data.qr.downloadHref;
          qrLinkEl.textContent = data.qr.downloadLabel;
          qrCard.hidden = false;
        } else {
          qrCard.hidden = true;
        }
      }

      // Content hero + body
      heroEl.innerHTML = data.image
        ? `<img class="modal__hero-img" src="${data.image}" alt="${data.name}" />`
        : "";
      bodyEl.innerHTML = data.body || "";

      // Wire up old-app hover preview if present in this modal
      const hoverTrigger = bodyEl.querySelector(".cs-old-app-hover__trigger");
      if (hoverTrigger) {
        const fp = document.createElement("div");
        fp.className = "cs-hover-preview";
        fp.innerHTML = `<img src="${hoverTrigger.dataset.previewSrc}" alt="" />`;
        document.body.appendChild(fp);

        hoverTrigger.addEventListener("mouseenter", () => fp.classList.add("is-visible"));
        hoverTrigger.addEventListener("mouseleave", () => fp.classList.remove("is-visible"));
        hoverTrigger.addEventListener("mousemove", (e) => {
          const w = 340, gap = 20;
          let left = e.clientX + gap;
          let top  = e.clientY - 180;
          if (left + w > window.innerWidth - 16) left = e.clientX - w - gap;
          if (top < 16) top = e.clientY + gap;
          fp.style.left = left + "px";
          fp.style.top  = top  + "px";
        });

        // Stash reference so closeModal can remove it
        overlay._hoverPreview = fp;
      }

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
      if (overlay._hoverPreview) {
        overlay._hoverPreview.remove();
        overlay._hoverPreview = null;
      }
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

    // Open the process video in a lightbox instead of navigating away,
    // when the current project provides a local video src.
    if (videoEl) {
      videoEl.addEventListener("click", (e) => {
        const src = videoEl.dataset.videoSrc;
        if (!src) return;
        e.preventDefault();
        document.dispatchEvent(
          new CustomEvent("open-video-modal", {
            detail: { src, label: videoEl.textContent },
          })
        );
      });
    }

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
     Generic hover-preview (profile page bio images + any [data-hover-preview])
  --------------------------------------------------------------------------- */
  function initHoverPreviews() {
    // No hover on touch-only devices
    if (window.matchMedia("(hover: none)").matches) return;

    const triggers = document.querySelectorAll("[data-hover-preview]");
    if (!triggers.length) return;

    const fp = document.createElement("div");
    fp.className = "cs-hover-preview";
    const fpImg = document.createElement("img");
    fpImg.alt = "";
    fp.appendChild(fpImg);
    document.body.appendChild(fp);

    triggers.forEach((trigger) => {
      trigger.addEventListener("mouseenter", () => {
        fpImg.src = trigger.dataset.hoverPreview;
        fp.classList.add("is-visible");
      });
      trigger.addEventListener("mouseleave", () => {
        fp.classList.remove("is-visible");
      });
      trigger.addEventListener("mousemove", (e) => {
        const w = fp.offsetWidth || 380;
        const gap = 20;
        let left = e.clientX + gap;
        let top  = e.clientY - 160;
        if (left + w > window.innerWidth - 16) left = e.clientX - w - gap;
        if (top < 16) top = e.clientY + gap;
        fp.style.left = left + "px";
        fp.style.top  = top  + "px";
      });
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
    initVideoModal();
    initProjectModals();
    initHoverPreviews();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
