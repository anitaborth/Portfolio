/* ---------------------------------------------------------------------------
   Case study: Morpheus
   Data for the project modal in work.html. Registered on window.PROJECTS,
   which script.js reads when building the modal. Load before script.js.
--------------------------------------------------------------------------- */
(function () {
  window.PROJECTS = window.PROJECTS || {};

  window.PROJECTS.morpheus = {
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
  };
})();
