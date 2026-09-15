/* ---------------------------------------------------------------------------
   Case study: Orion
   Data for the project modal in work.html. Registered on window.PROJECTS,
   which script.js reads when building the modal. Load before script.js.
--------------------------------------------------------------------------- */
(function () {
  window.PROJECTS = window.PROJECTS || {};

  window.PROJECTS.orion = {
      name: "Orion",
      meta: {
        client: "Accenture",
        type: "Product Design · UX UI · Video",
        year: "2019 - 2021",
        role: "Senior Creative Designer",
      },
      image: "assets/orion/hero.png",
      body: `
        <div>
          <span class="cs-label-gray">OBJECTIVE</span>
          <h3 class="cs-heading">Objective</h3>
          <div class="cs-blue-box">
            <span class="cs-callout-label">Objective</span>
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
  };
})();
