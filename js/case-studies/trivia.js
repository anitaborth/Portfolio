/* ---------------------------------------------------------------------------
   Case study: Preguntados / Trivia Crack
   Data for the project modal in work.html. Registered on window.PROJECTS,
   which script.js reads when building the modal. Load before script.js.
--------------------------------------------------------------------------- */
(function () {
  window.PROJECTS = window.PROJECTS || {};

  window.PROJECTS.trivia = {
      name: "Trivia Crack",
      meta: {
        client: "Etermax",
        type: "Product Game - UI - UX - Illustration",
        year: "2021 - 2023",
        role: "Sr. UI designer",
        tools: "Figma",
      },
      image: "assets/etermax/hero.png",
      body: `
        <div class="cs-tabs" role="tablist" aria-label="Trivia Crack projects" data-cs-tablist>
          <button type="button" class="cs-tab" role="tab" id="cs-tab-trivia-project-1" aria-controls="cs-panel-trivia-project-1" aria-selected="true" data-cs-tab="project-1">Project 1 | Shop Redesign and VIP Membership</button>
          <button type="button" class="cs-tab" role="tab" id="cs-tab-trivia-project-2" aria-controls="cs-panel-trivia-project-2" aria-selected="false" data-cs-tab="project-2">Project 2 | Onboarding</button>
          <button type="button" class="cs-tab" role="tab" id="cs-tab-trivia-project-3" aria-controls="cs-panel-trivia-project-3" aria-selected="false" data-cs-tab="project-3">Project 3 | Quick Profile Update</button>
          <button type="button" class="cs-tab" role="tab" id="cs-tab-trivia-project-4" aria-controls="cs-panel-trivia-project-4" aria-selected="false" data-cs-tab="project-4">Project 4 | UI Animations</button>
        </div>

        <!-- ===================== PROJECT 1 | SHOP REDESIGN AND VIP MEMBERSHIP ===================== -->
        <section class="cs-tabpanel" role="tabpanel" id="cs-panel-trivia-project-1" aria-labelledby="cs-tab-trivia-project-1" data-cs-panel="project-1">

            <!-- SHOP / Redesign -->
            <div class="cs-block">
              <span class="cs-label-gray">SHOP</span>
              <h3 class="cs-heading">Redesign</h3>
            </div>

            <div class="cs-cols-3">
              <div class="cs-col">
                <span class="cs-label-gray">Problem Statement</span>
                <p class="cs-text">Only 7% of players made a purchase through the shop &mdash; they found the design unappealing and hard to navigate. With products buried in a single long list, most left without exploring what was on offer.</p>
              </div>
              <div class="cs-col">
                <span class="cs-label-gray">GOAL</span>
                <p class="cs-text">Improve the shopping experience and turn it into a growth driver: present offers as self-contained modules, with daily gifts to build a return habit, and lift shop conversion by 10&ndash;15% while growing ARPPU through repeat purchases.</p>
              </div>
              <div class="cs-col">
                <span class="cs-label-gray">THE CHALLENGE</span>
                <p class="cs-text">Make it intuitive for players to enter the shop and complete a purchase, while building genuine desire for the featured products. The shop also had to feel like a rewarding part of the game rather than a separate storefront.</p>
              </div>
            </div>

            <div class="cs-blue-box">
              <span class="cs-callout-label">Approach</span>
              <p>Tested with players in Argentina and iterated with US players via Playtest and A/B tests. We applied Social Proof and Von Restorff Effect to restructure the shop into scannable modules — making the best offers impossible to miss.</p>
              <details class="cs-old-design-toggle">
                <summary>See old design</summary>
                <img src="assets/etermax/old-shop.png" alt="Old Trivia Crack shop screen" class="cs-full-img" style="margin-top:16px" />
              </details>
            </div>

            <img src="assets/etermax/new-shop.png" alt="Redesigned Trivia Crack shop with Special Offer, Right Answers, Credits, Coins and Daily Deals" class="cs-full-img" />

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
                <p class="cs-text">Make premium value clear and encourage more players to upgrade: communicate each benefit clearly &mdash; no ads, free wheel, unlimited lives &mdash; and lower the barrier with a 3-day trial to lift conversion 8&ndash;12% and Day 30 retention.</p>
              </div>
              <div class="cs-col">
                <span class="cs-label-gray">THE CHALLENGE</span>
                <p class="cs-text">Present the membership as a compelling, trustworthy upgrade without disrupting the core game experience. The offer had to feel like a natural benefit rather than an aggressive paywall, so players stayed engaged whether or not they subscribed.</p>
              </div>
            </div>

            <img src="assets/etermax/vip-mockup.png" alt="Trivia Crack PRIME membership screen with Monthly and Yearly plans" class="cs-full-img" />

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
                      <ul class="cs-chip-list">
                        <li>Ad-free experience</li>
                        <li>Free prize wheel rewards</li>
                        <li>Unlimited lives</li>
                        <li>3-day free trial</li>
                      </ul>
                    </div>
                    <div>
                      <p class="cs-text">We benchmarked how leading apps present their memberships:</p>
                      <ul class="cs-chip-list">
                        <li>Coin Master</li>
                        <li>Duolingo</li>
                        <li>Clash Royale</li>
                      </ul>
                    </div>
                  </div>
                  <div class="cs-blue-box">
                    <span class="cs-callout-label">Insights</span>
                    <p>Surface the membership from within the Shop, offer a free trial for the first week, and keep the choice simple with just two plans.</p>
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
        </section>

        <!-- ===================== PROJECT 2 | ONBOARDING ===================== -->
        <section class="cs-tabpanel" role="tabpanel" id="cs-panel-trivia-project-2" aria-labelledby="cs-tab-trivia-project-2" data-cs-panel="project-2">

            <div class="cs-block">
              <span class="cs-label-gray">ONBOARDING</span>
              <h3 class="cs-heading">First seven days</h3>
            </div>

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

            <img src="assets/etermax/onboarding.png" alt="Trivia Crack onboarding — staged missions introducing each game mode" class="cs-full-img" />
        </section>

        <!-- ===================== PROJECT 3 | QUICK PROFILE UPDATE ===================== -->
        <section class="cs-tabpanel" role="tabpanel" id="cs-panel-trivia-project-3" aria-labelledby="cs-tab-trivia-project-3" data-cs-panel="project-3">

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

            <img src="assets/etermax/profile-mockup.png" alt="Quick Profile Update modal — Hi, Peter Hackman, pick your favorite avatar" class="cs-full-img" />

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
              <span class="cs-callout-label">Validation</span>
              <p>We tested the low-fidelity prototype in the office with players in Argentina. From the results, we built a <strong>cost/benefit</strong> map to set <strong>priorities and next iterations</strong>, then moved into the <strong>high-fidelity version</strong> to bring into the onboarding.</p>
            </div>

            <img src="assets/etermax/signin-flow.png" alt="Quick Profile Update flow across three screens" class="cs-full-img" />
        </section>

        <!-- ===================== PROJECT 4 | UI ANIMATIONS ===================== -->
        <section class="cs-tabpanel" role="tabpanel" id="cs-panel-trivia-project-4" aria-labelledby="cs-tab-trivia-project-4" data-cs-panel="project-4">

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
        </section>
      `,
  };
})();
