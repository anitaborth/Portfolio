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
        year: "2024 - Present",
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
        <div class="cs-tabs" role="tablist" aria-label="Morpheus sections" data-cs-tablist>
          <button type="button" class="cs-tab" role="tab" id="cs-tab-morpheus-general" aria-controls="cs-panel-morpheus-general" aria-selected="true" data-cs-tab="general">General presentation</button>
          <button type="button" class="cs-tab" role="tab" id="cs-tab-morpheus-mobile" aria-controls="cs-panel-morpheus-mobile" aria-selected="false" data-cs-tab="mobile">Mobile App</button>
          <button type="button" class="cs-tab" role="tab" id="cs-tab-morpheus-website" aria-controls="cs-panel-morpheus-website" aria-selected="false" data-cs-tab="website">Website</button>
        </div>

        <!-- ===================== GENERAL PRESENTATION ===================== -->
        <section class="cs-tabpanel" role="tabpanel" id="cs-panel-morpheus-general" aria-labelledby="cs-tab-morpheus-general" data-cs-panel="general">
          <!-- The case-study presentation, reproduced from the original page.
               Its stylesheet ships scoped to .cs-embed-morpheus (see
               embeds/morpheus/scoped.css) so a full foreign token system and
               three typefaces cannot reach the portfolio's own cascade.

               It was an iframe until videos deep in the document stopped
               playing: a frame sized to its full content height never scrolls,
               and the browser only decodes media near the frame's own origin,
               so anything past roughly 4000px stayed frozen. Inlined here the
               videos live in the page that actually scrolls. -->
          <div class="cs-embed-morpheus">
<div class="caseStudyShell-module__aYh07q__page MorpheusTemplate-module__ALvbFG__morpheus" data-cs-header-bar="true"><section class="caseStudyShell-module__aYh07q__hero caseStudyShell-module__aYh07q__light"><div class="caseStudyShell-module__aYh07q__headerBar" aria-hidden="true"></div><div class="CaseStudyContainer-module__mRr3Za__container CaseStudyContainer-module__mRr3Za__content caseStudyShell-module__aYh07q__heroInner"><div class="caseStudyShell-module__aYh07q__heroBreadcrumb"><a class="CaseStudyBreadcrumb-module__IDBEQG__breadcrumb" aria-disabled="true"><span class="CaseStudyBreadcrumb-module__IDBEQG__arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M20 12H4m0 0 6-6m-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Case studies</a></div><div class="caseStudyShell-module__aYh07q__projectHeader"><div class="CaseStudyProjectHeader-module__Ds9JDW__header"><h1 class="CaseStudyProjectHeader-module__Ds9JDW__title"><span class="CaseStudyProjectHeader-module__Ds9JDW__titleLead">Morpheus</span></h1><div class="CaseStudyProjectHeader-module__Ds9JDW__aside"><div><p class="CaseStudyProjectHeader-module__Ds9JDW__label">Solutions</p><ul class="CaseStudyProjectHeader-module__Ds9JDW__solutionList"><li>Artificial Intelligence</li><li>Performance</li><li>Development</li></ul></div><div><p class="CaseStudyProjectHeader-module__Ds9JDW__label">download & share</p><div class="CaseStudyProjectHeader-module__Ds9JDW__shareButtons"><button type="button" class="CaseStudyProjectHeader-module__Ds9JDW__shareButton CaseStudyProjectHeader-module__Ds9JDW__storeButton" aria-label="App Store"><span class="CaseStudyProjectHeader-module__Ds9JDW__storeGlyph" style="width:29.688px;height:29.688px;left:4.79px;top:5.21px;border-radius:7.617px"><img alt="" loading="lazy" width="89" height="89" decoding="async" data-nimg="1" style="color:transparent;width:100%;height:100%;left:0;top:0" src="embeds/morpheus/ui/store/store-apple.png"/></span></button><button type="button" class="CaseStudyProjectHeader-module__Ds9JDW__shareButton CaseStudyProjectHeader-module__Ds9JDW__storeButton" aria-label="Google Play"><span class="CaseStudyProjectHeader-module__Ds9JDW__storeGlyph" style="width:29px;height:30px;left:5.55px;top:4.45px;border-radius:11px"><img alt="" loading="lazy" width="87" height="90" decoding="async" data-nimg="1" style="color:transparent;width:165.71%;height:156.76%;left:-28.57%;top:-29.73%" src="embeds/morpheus/ui/store/store-google-play.png"/></span></button></div></div></div></div></div><div class="caseStudyShell-module__aYh07q__heroMedia"><div style="transform-origin:center;will-change:transform"><div class="CaseStudyHeroMedia-module__01m9Cq__hero"><div class="CaseStudyVideo-module__9CBNgW__ambilight"><video class="CaseStudyVideo-module__9CBNgW__glow" poster="embeds/morpheus/images/morpheus-hero-poster.jpg" preload="metadata" muted="" loop="" playsInline="" tabindex="-1" aria-hidden="true" src="embeds/morpheus/videos/morpheus-hero-work-as-one.mp4"></video><div class="CaseStudyVideo-module__9CBNgW__frame" style="aspect-ratio:1015 / 569;border-radius:0"><video class="CaseStudyVideo-module__9CBNgW__video CaseStudyHeroMedia-module__01m9Cq__media" poster="embeds/morpheus/images/morpheus-hero-poster.jpg" preload="metadata" muted="" loop="" playsInline="" tabindex="-1" aria-hidden="true" src="embeds/morpheus/videos/morpheus-hero-work-as-one.mp4"></video></div></div></div></div></div></div></section><section class="caseStudyShell-module__aYh07q__padTopLg caseStudyShell-module__aYh07q__padBottomLg caseStudyShell-module__aYh07q__dark"><div class="CaseStudyContainer-module__mRr3Za__container CaseStudyContainer-module__mRr3Za__content"><div class="CaseStudyIntro-module__9vNgAq__intro"><dl class="CaseStudyIntro-module__9vNgAq__meta"><div class="CaseStudyIntro-module__9vNgAq__metaItem"><dt data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal CaseStudyIntro-module__9vNgAq__metaLabel">Client</dt><dd data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal CaseStudyIntro-module__9vNgAq__metaValue">Morpheus Training</dd></div><div class="CaseStudyIntro-module__9vNgAq__metaItem"><dt data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal CaseStudyIntro-module__9vNgAq__metaLabel">Technology</dt><dd data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal CaseStudyIntro-module__9vNgAq__metaValue">React, Node js.</dd></div><div class="CaseStudyIntro-module__9vNgAq__metaItem"><dt data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal CaseStudyIntro-module__9vNgAq__metaLabel">Services</dt><dd data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal CaseStudyIntro-module__9vNgAq__metaValue">Product Design</dd><dd data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal CaseStudyIntro-module__9vNgAq__metaValue">Development</dd></div><div class="CaseStudyIntro-module__9vNgAq__metaItem"><dt data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal CaseStudyIntro-module__9vNgAq__metaLabel">Industry</dt><dd data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal CaseStudyIntro-module__9vNgAq__metaValue">Health & Wellness</dd></div></dl><p data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal CaseStudyIntro-module__9vNgAq__copy">The end of one-size-fits-all training. Morpheus is the only system designed to build your cardio sustainably — for life.</p></div></div></section><section class="caseStudyShell-module__aYh07q__padTopSection caseStudyShell-module__aYh07q__padBottomSection caseStudyShell-module__aYh07q__light"><div class="CaseStudyContainer-module__mRr3Za__container CaseStudyContainer-module__mRr3Za__content"><div class="MorpheusTemplate-module__ALvbFG__feature"><div class="MorpheusTemplate-module__ALvbFG__featurePair"><div data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal MorpheusTemplate-module__ALvbFG__featureCol"><div class="MorpheusTemplate-module__ALvbFG__featureDeviceBlock"><div class="CaseStudyVideo-module__9CBNgW__ambilight"><video class="CaseStudyVideo-module__9CBNgW__glow" poster="embeds/morpheus/images/morpheus-feature-device-poster.jpg" preload="metadata" muted="" loop="" playsInline="" tabindex="-1" aria-hidden="true" src="embeds/morpheus/videos/morpheus-feature-device.mp4"></video><div class="CaseStudyVideo-module__9CBNgW__frame" style="aspect-ratio:608 / 885;border-radius:0"><video class="CaseStudyVideo-module__9CBNgW__video MorpheusTemplate-module__ALvbFG__featureDeviceMedia" poster="embeds/morpheus/images/morpheus-feature-device-poster.jpg" preload="metadata" muted="" loop="" playsInline="" tabindex="-1" aria-hidden="true" src="embeds/morpheus/videos/morpheus-feature-device.mp4"></video></div></div><div class="MorpheusTemplate-module__ALvbFG__featureText"><h2 data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal MorpheusTemplate-module__ALvbFG__featureHeading">Personalized system to improve your fitness</h2><p data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal MorpheusTemplate-module__ALvbFG__featureBody">Most wearables use five static heart rate zones. Morpheus uses three zones built for how your body actually creates energy.</p></div></div></div><div data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal MorpheusTemplate-module__ALvbFG__featureCol"><div class="CaseStudyImage-module__rnJlDa__frame" style="aspect-ratio:608 / 885;border-radius:0"><img alt="" loading="lazy" decoding="async" data-nimg="fill" class="CaseStudyImage-module__rnJlDa__img" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" src="embeds/morpheus/images/morpheus-feature-athlete.png"/></div></div></div></div><div class="MorpheusTemplate-module__ALvbFG__overviewGroup" data-has-feature="true"><div data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal"><section id="overview" class="CaseStudySection-module__R0w6WG__section"><h2 data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal CaseStudySection-module__R0w6WG__label">Overview</h2><div class="CaseStudySection-module__R0w6WG__content"><p data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal MorpheusTemplate-module__ALvbFG__lead">Morpheus keeps an eye on your data with a chest strap, so you can easily check your recovery and HR zones daily to train smarter.</p></div></section></div></div></div></section><section class="caseStudyShell-module__aYh07q__padTopSection caseStudyShell-module__aYh07q__padBottomNone caseStudyShell-module__aYh07q__dark MorpheusTemplate-module__ALvbFG__challengeSection"><div class="CaseStudyContainer-module__mRr3Za__container CaseStudyContainer-module__mRr3Za__content"><div data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal"><div class="MorpheusTemplate-module__ALvbFG__overviewMediaRow"><figure class="MorpheusTemplate-module__ALvbFG__overviewMediaItem"><div class="CaseStudyImage-module__rnJlDa__frame" style="aspect-ratio:674 / 762;border-radius:0"><img alt="Morpheus smart device worn on a chest strap" loading="lazy" decoding="async" data-nimg="fill" class="CaseStudyImage-module__rnJlDa__img" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" src="embeds/morpheus/images/morpheus-overview-man-holding-device.jpeg"/></div></figure><figure class="MorpheusTemplate-module__ALvbFG__overviewMediaItem undefined"><div class="CaseStudyVideo-module__9CBNgW__ambilight"><video class="CaseStudyVideo-module__9CBNgW__glow" poster="embeds/morpheus/images/morpheus-overview-app-poster.jpg" preload="metadata" muted="" loop="" playsInline="" tabindex="-1" aria-hidden="true" src="embeds/morpheus/videos/morpheus-overview-app.mp4"></video><div class="CaseStudyVideo-module__9CBNgW__frame" style="aspect-ratio:674 / 762;border-radius:0"><video class="CaseStudyVideo-module__9CBNgW__video MorpheusTemplate-module__ALvbFG__overviewAppVideo" poster="embeds/morpheus/images/morpheus-overview-app-poster.jpg" preload="metadata" muted="" loop="" playsInline="" tabindex="-1" aria-hidden="true" src="embeds/morpheus/videos/morpheus-overview-app.mp4"></video></div></div><figcaption class="MorpheusTemplate-module__ALvbFG__glassLabel MorpheusTemplate-module__ALvbFG__glassLabelBottomCenter" style="backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)">data over time</figcaption></figure></div></div><div data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal MorpheusTemplate-module__ALvbFG__challengeText"><section id="challenge" class="CaseStudySection-module__R0w6WG__section"><h2 data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal CaseStudySection-module__R0w6WG__label">The challenge</h2><div class="CaseStudySection-module__R0w6WG__content"><div class="MorpheusTemplate-module__ALvbFG__columns"><p data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal MorpheusTemplate-module__ALvbFG__challengeBody">The client approached Amalgama with a primary issue: the app was not intuitive, appeared outdated, and required a fresh look along with a cohesive design system. We proposed creating a survey to better understand the users&#x27; problems. Once we understood this, we could analyze what was a priority to work on.</p><p data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal MorpheusTemplate-module__ALvbFG__challengeBody">The challenge was to integrate the device into the React Native app and also integrate Garmin, Apple Health, and other platforms so that all users could have a better experience.</p></div></div></section></div></div><div class="CaseStudyContainer-module__mRr3Za__container CaseStudyContainer-module__mRr3Za__bleed MorpheusTemplate-module__ALvbFG__challengePano"><div data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal"><div class="GlassLens-module__7mXbUG__root"><div class="CaseStudyImage-module__rnJlDa__frame" style="aspect-ratio:2600 / 1302;border-radius:0"><img alt="" loading="lazy" decoding="async" data-nimg="fill" class="CaseStudyImage-module__rnJlDa__img" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" src="embeds/morpheus/images/morpheus-challenge-hyrox-panorama.png"/></div><div class="GlassLens-module__7mXbUG__lens" aria-hidden="true"><div class="GlassLens-module__7mXbUG__magnifier"><img alt="" class="GlassLens-module__7mXbUG__copy" draggable="false"/></div><div class="GlassLens-module__7mXbUG__magnifier GlassLens-module__7mXbUG__rim"><img alt="" class="GlassLens-module__7mXbUG__copy" draggable="false"/></div><span class="GlassLens-module__7mXbUG__sheen"></span><svg class="GlassLens-module__7mXbUG__arrow" viewBox="0 0 21 26" fill="none"><path d="M10.5 0v24M2 16l8.5 9 8.5-9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></div></div></div></section><section class="caseStudyShell-module__aYh07q__padTopApproach caseStudyShell-module__aYh07q__padBottomXs caseStudyShell-module__aYh07q__light"><div class="CaseStudyContainer-module__mRr3Za__container CaseStudyContainer-module__mRr3Za__content"><div data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal"><section id="approach" class="CaseStudySection-module__R0w6WG__section"><h2 data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal CaseStudySection-module__R0w6WG__label">The approach</h2><div class="CaseStudySection-module__R0w6WG__content"><p data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal MorpheusTemplate-module__ALvbFG__readBody">After understanding the main issues, we moved on to create a development plan using Agile methodologies, specifically with two-week sprints that allow us to demonstrate progress and value delivered to the client week by week. We started by uploading everything to staging to test with the client and the team while we continued designing new features. When we had a completed feature, we set up user interviews to test the adjustments and review if we needed to update anything after the discussions.</p></div></section></div></div><div class="CaseStudyContainer-module__mRr3Za__container CaseStudyContainer-module__mRr3Za__wide MorpheusTemplate-module__ALvbFG__exploreGap"><div class="ExploreMorpheus-module__OukJ5q__scene" data-in><div class="ExploreMorpheus-module__OukJ5q__sceneZoom"><div class="ExploreMorpheus-module__OukJ5q__bg" aria-hidden="true"></div><div class="ExploreMorpheus-module__OukJ5q__glow ExploreMorpheus-module__OukJ5q__glowLeft" aria-hidden="true"></div><div class="ExploreMorpheus-module__OukJ5q__glow ExploreMorpheus-module__OukJ5q__glowRight" aria-hidden="true"></div><div class="ExploreMorpheus-module__OukJ5q__rings" aria-hidden="true"><!--$!--><template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template><!--/$--></div><p class="ExploreMorpheus-module__OukJ5q__title"><span class="ExploreMorpheus-module__OukJ5q__titleWord">Explore</span> <span class="ExploreMorpheus-module__OukJ5q__titleWord ExploreMorpheus-module__OukJ5q__titleAccent">Morpheus</span></p><div class="ExploreMorpheus-module__OukJ5q__card ExploreMorpheus-module__OukJ5q__cardTl" aria-hidden="true"><div class="ExploreMorpheus-module__OukJ5q__cardFloat"><img alt="" loading="lazy" width="235" height="237" decoding="async" data-nimg="1" class="ExploreMorpheus-module__OukJ5q__cardImg" style="color:transparent" src="embeds/morpheus/images/morpheus-explore-card-hr-82bpm.png"/></div></div><div class="ExploreMorpheus-module__OukJ5q__card ExploreMorpheus-module__OukJ5q__cardTr" aria-hidden="true"><div class="ExploreMorpheus-module__OukJ5q__cardFloat"><img alt="" loading="lazy" width="261" height="261" decoding="async" data-nimg="1" class="ExploreMorpheus-module__OukJ5q__cardImg" style="color:transparent" src="embeds/morpheus/images/morpheus-explore-card-improvement-85.png"/></div></div><div class="ExploreMorpheus-module__OukJ5q__card ExploreMorpheus-module__OukJ5q__cardMl" aria-hidden="true"><div class="ExploreMorpheus-module__OukJ5q__cardFloat"><img alt="" loading="lazy" width="228" height="229" decoding="async" data-nimg="1" class="ExploreMorpheus-module__OukJ5q__cardImg" style="color:transparent" src="embeds/morpheus/images/morpheus-explore-card-hr-80bpm.png"/></div></div><div class="ExploreMorpheus-module__OukJ5q__card ExploreMorpheus-module__OukJ5q__cardMr" aria-hidden="true"><div class="ExploreMorpheus-module__OukJ5q__cardFloat"><img alt="" loading="lazy" width="231" height="231" decoding="async" data-nimg="1" class="ExploreMorpheus-module__OukJ5q__cardImg" style="color:transparent" src="embeds/morpheus/images/morpheus-explore-card-recovery-85.png"/></div></div><div class="ExploreMorpheus-module__OukJ5q__phone"><img class="ExploreMorpheus-module__OukJ5q__phoneImg" data-active src="embeds/morpheus/images/morpheus-explore-phone-home.png" alt="Morpheus app running on a phone" data-active="true" loading="eager" decoding="async" draggable="false"/><img class="ExploreMorpheus-module__OukJ5q__phoneImg" src="embeds/morpheus/images/morpheus-explore-phone-challenges.png" alt="" aria-hidden="true" loading="eager" decoding="async" draggable="false"/><img class="ExploreMorpheus-module__OukJ5q__phoneImg" src="embeds/morpheus/images/morpheus-explore-phone-train.png" alt="" aria-hidden="true" loading="eager" decoding="async" draggable="false"/><img class="ExploreMorpheus-module__OukJ5q__phoneImg" src="embeds/morpheus/images/morpheus-explore-phone-learn.png" alt="" aria-hidden="true" loading="eager" decoding="async" draggable="false"/><img class="ExploreMorpheus-module__OukJ5q__phoneImg" src="embeds/morpheus/images/morpheus-explore-phone-menu.png" alt="" aria-hidden="true" loading="eager" decoding="async" draggable="false"/></div><nav class="ExploreMorpheus-module__OukJ5q__navbar" aria-label="Morpheus app navigation" style="backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)"><button type="button" class="ExploreMorpheus-module__OukJ5q__navItem " data-active="true" aria-pressed="true"><span class="ExploreMorpheus-module__OukJ5q__navIcon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5M5.5 9.5V20a1 1 0 0 0 1 1H17.5a1 1 0 0 0 1-1V9.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><span class="ExploreMorpheus-module__OukJ5q__navLabel">Home</span></button><button type="button" class="ExploreMorpheus-module__OukJ5q__navItem " aria-pressed="false"><span class="ExploreMorpheus-module__OukJ5q__navIcon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 4h10v3a5 5 0 0 1-10 0V4ZM7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3M9 15h6M10 15v-2M14 15v-2M8 20h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><span class="ExploreMorpheus-module__OukJ5q__navLabel">Challenges</span></button><button type="button" class="ExploreMorpheus-module__OukJ5q__navItem ExploreMorpheus-module__OukJ5q__navTrain" aria-pressed="false"><span class="ExploreMorpheus-module__OukJ5q__navIcon"><span class="ExploreMorpheus-module__OukJ5q__navTrainLabel">TRAIN</span></span></button><button type="button" class="ExploreMorpheus-module__OukJ5q__navItem " aria-pressed="false"><span class="ExploreMorpheus-module__OukJ5q__navIcon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 6c-1.8-1.3-4-2-6.5-2H4v14h1.5c2.5 0 4.7.7 6.5 2 1.8-1.3 4-2 6.5-2H20V4h-1.5C16 4 13.8 4.7 12 6ZM12 6v14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><span class="ExploreMorpheus-module__OukJ5q__navLabel">Learn</span></button><button type="button" class="ExploreMorpheus-module__OukJ5q__navItem " aria-pressed="false"><span class="ExploreMorpheus-module__OukJ5q__navIcon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path></svg></span><span class="ExploreMorpheus-module__OukJ5q__navLabel">Menu</span></button></nav></div></div></div></section><section class="caseStudyShell-module__aYh07q__padTopLg caseStudyShell-module__aYh07q__padBottomImpact caseStudyShell-module__aYh07q__dark MorpheusTemplate-module__ALvbFG__showcaseSection"><div class="CaseStudyContainer-module__mRr3Za__container CaseStudyContainer-module__mRr3Za__content"><div data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal"><section id="outcome" class="CaseStudySection-module__R0w6WG__section"><h2 data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal CaseStudySection-module__R0w6WG__label">The outcome</h2><div class="CaseStudySection-module__R0w6WG__content"><p data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal MorpheusTemplate-module__ALvbFG__outcomeHeadline">We provide essential data in an intuitive way, including daily metrics and targets, making training easier.</p><p data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal MorpheusTemplate-module__ALvbFG__bodyIndented">Users can view their progress weekly, monthly, and annually, allowing them to easily track how many minutes they need to reach their weekly targets in each zone. This ultimately leads to improved longevity and quality of life.</p></div></section></div></div><div class="CaseStudyContainer-module__mRr3Za__container CaseStudyContainer-module__mRr3Za__content MorpheusTemplate-module__ALvbFG__benefitsGap"><div data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal"><div class="MorpheusTemplate-module__ALvbFG__benefitsMedia"><div style="transform-origin:center;will-change:transform"><div class="CaseStudyVideo-module__9CBNgW__ambilight"><video class="CaseStudyVideo-module__9CBNgW__glow" preload="metadata" muted="" loop="" playsInline="" tabindex="-1" aria-hidden="true" src="embeds/morpheus/videos/morpheus-benefits.mp4"></video><div class="CaseStudyVideo-module__9CBNgW__frame" style="aspect-ratio:1280 / 720;border-radius:0"><video class="CaseStudyVideo-module__9CBNgW__video" preload="metadata" muted="" loop="" playsInline="" tabindex="-1" aria-hidden="true" src="embeds/morpheus/videos/morpheus-benefits.mp4"></video></div></div></div></div></div></div><div class="CaseStudyContainer-module__mRr3Za__container CaseStudyContainer-module__mRr3Za__bleed MorpheusTemplate-module__ALvbFG__showcaseBlockGap"><div class="MorpheusCarousel-module__0Zt3ja__stage" style="perspective:1800px" aria-label="Morpheus product gallery"><div class="MorpheusCarousel-module__0Zt3ja__depth"><div class="MorpheusCarousel-module__0Zt3ja__ring"><div class="MorpheusCarousel-module__0Zt3ja__card" style="transform:rotateY(0deg) translateZ(var(--radius))"><img class="MorpheusCarousel-module__0Zt3ja__img" src="embeds/morpheus/images/carousel/morpheus-carousel-wristband.png" alt="" draggable="false"/></div><div class="MorpheusCarousel-module__0Zt3ja__card" style="transform:rotateY(20deg) translateZ(var(--radius))"><img class="MorpheusCarousel-module__0Zt3ja__img" src="embeds/morpheus/images/carousel/morpheus-carousel-app-recovery.png" alt="" draggable="false"/></div><div class="MorpheusCarousel-module__0Zt3ja__card" style="transform:rotateY(40deg) translateZ(var(--radius))"><img class="MorpheusCarousel-module__0Zt3ja__img" src="embeds/morpheus/images/carousel/morpheus-carousel-chest-strap.png" alt="" draggable="false"/></div><div class="MorpheusCarousel-module__0Zt3ja__card" style="transform:rotateY(60deg) translateZ(var(--radius))"><img class="MorpheusCarousel-module__0Zt3ja__img" src="embeds/morpheus/images/carousel/morpheus-carousel-app-hr-zones.png" alt="" draggable="false"/></div><div class="MorpheusCarousel-module__0Zt3ja__card" style="transform:rotateY(80deg) translateZ(var(--radius))"><video class="MorpheusCarousel-module__0Zt3ja__img MorpheusCarousel-module__0Zt3ja__cover" src="embeds/morpheus/videos/morpheus-carousel-app-iphone-720.mp4" poster="embeds/morpheus/images/carousel/morpheus-carousel-app-iphone-poster.jpg" muted="" loop="" playsInline="" preload="metadata" tabindex="-1" aria-hidden="true"></video></div><div class="MorpheusCarousel-module__0Zt3ja__card" style="transform:rotateY(100deg) translateZ(var(--radius))"><video class="MorpheusCarousel-module__0Zt3ja__img MorpheusCarousel-module__0Zt3ja__cover" src="embeds/morpheus/videos/morpheus-carousel-iphone-rotation-720.mp4" poster="embeds/morpheus/images/carousel/morpheus-carousel-iphone-rotation-poster.jpg" muted="" loop="" playsInline="" preload="metadata" tabindex="-1" aria-hidden="true"></video></div><div class="MorpheusCarousel-module__0Zt3ja__card" style="transform:rotateY(120deg) translateZ(var(--radius))" aria-hidden="true"><img class="MorpheusCarousel-module__0Zt3ja__img" src="embeds/morpheus/images/carousel/morpheus-carousel-wristband.png" alt="" draggable="false"/></div><div class="MorpheusCarousel-module__0Zt3ja__card" style="transform:rotateY(140deg) translateZ(var(--radius))" aria-hidden="true"><img class="MorpheusCarousel-module__0Zt3ja__img" src="embeds/morpheus/images/carousel/morpheus-carousel-app-recovery.png" alt="" draggable="false"/></div><div class="MorpheusCarousel-module__0Zt3ja__card" style="transform:rotateY(160deg) translateZ(var(--radius))" aria-hidden="true"><img class="MorpheusCarousel-module__0Zt3ja__img" src="embeds/morpheus/images/carousel/morpheus-carousel-chest-strap.png" alt="" draggable="false"/></div><div class="MorpheusCarousel-module__0Zt3ja__card" style="transform:rotateY(180deg) translateZ(var(--radius))" aria-hidden="true"><img class="MorpheusCarousel-module__0Zt3ja__img" src="embeds/morpheus/images/carousel/morpheus-carousel-app-hr-zones.png" alt="" draggable="false"/></div><div class="MorpheusCarousel-module__0Zt3ja__card" style="transform:rotateY(200deg) translateZ(var(--radius))" aria-hidden="true"><video class="MorpheusCarousel-module__0Zt3ja__img MorpheusCarousel-module__0Zt3ja__cover" src="embeds/morpheus/videos/morpheus-carousel-app-iphone-720.mp4" poster="embeds/morpheus/images/carousel/morpheus-carousel-app-iphone-poster.jpg" muted="" loop="" playsInline="" preload="metadata" tabindex="-1" aria-hidden="true"></video></div><div class="MorpheusCarousel-module__0Zt3ja__card" style="transform:rotateY(220deg) translateZ(var(--radius))" aria-hidden="true"><video class="MorpheusCarousel-module__0Zt3ja__img MorpheusCarousel-module__0Zt3ja__cover" src="embeds/morpheus/videos/morpheus-carousel-iphone-rotation-720.mp4" poster="embeds/morpheus/images/carousel/morpheus-carousel-iphone-rotation-poster.jpg" muted="" loop="" playsInline="" preload="metadata" tabindex="-1" aria-hidden="true"></video></div><div class="MorpheusCarousel-module__0Zt3ja__card" style="transform:rotateY(240deg) translateZ(var(--radius))" aria-hidden="true"><img class="MorpheusCarousel-module__0Zt3ja__img" src="embeds/morpheus/images/carousel/morpheus-carousel-wristband.png" alt="" draggable="false"/></div><div class="MorpheusCarousel-module__0Zt3ja__card" style="transform:rotateY(260deg) translateZ(var(--radius))" aria-hidden="true"><img class="MorpheusCarousel-module__0Zt3ja__img" src="embeds/morpheus/images/carousel/morpheus-carousel-app-recovery.png" alt="" draggable="false"/></div><div class="MorpheusCarousel-module__0Zt3ja__card" style="transform:rotateY(280deg) translateZ(var(--radius))" aria-hidden="true"><img class="MorpheusCarousel-module__0Zt3ja__img" src="embeds/morpheus/images/carousel/morpheus-carousel-chest-strap.png" alt="" draggable="false"/></div><div class="MorpheusCarousel-module__0Zt3ja__card" style="transform:rotateY(300deg) translateZ(var(--radius))" aria-hidden="true"><img class="MorpheusCarousel-module__0Zt3ja__img" src="embeds/morpheus/images/carousel/morpheus-carousel-app-hr-zones.png" alt="" draggable="false"/></div><div class="MorpheusCarousel-module__0Zt3ja__card" style="transform:rotateY(320deg) translateZ(var(--radius))" aria-hidden="true"><video class="MorpheusCarousel-module__0Zt3ja__img MorpheusCarousel-module__0Zt3ja__cover" src="embeds/morpheus/videos/morpheus-carousel-app-iphone-720.mp4" poster="embeds/morpheus/images/carousel/morpheus-carousel-app-iphone-poster.jpg" muted="" loop="" playsInline="" preload="metadata" tabindex="-1" aria-hidden="true"></video></div><div class="MorpheusCarousel-module__0Zt3ja__card" style="transform:rotateY(340deg) translateZ(var(--radius))" aria-hidden="true"><video class="MorpheusCarousel-module__0Zt3ja__img MorpheusCarousel-module__0Zt3ja__cover" src="embeds/morpheus/videos/morpheus-carousel-iphone-rotation-720.mp4" poster="embeds/morpheus/images/carousel/morpheus-carousel-iphone-rotation-poster.jpg" muted="" loop="" playsInline="" preload="metadata" tabindex="-1" aria-hidden="true"></video></div></div></div></div></div><div class="CaseStudyContainer-module__mRr3Za__container CaseStudyContainer-module__mRr3Za__content MorpheusTemplate-module__ALvbFG__showcaseBlockGap"><div data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal"><section id="impact" class="CaseStudySection-module__R0w6WG__section"><h2 data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal CaseStudySection-module__R0w6WG__label">Impact</h2><div class="CaseStudySection-module__R0w6WG__content"><ul class="CaseStudyStats-module__FC8Fpq__stats"><li class="CaseStudyStats-module__FC8Fpq__stat"><span class="CaseStudyStats-module__FC8Fpq__value" data-count-up="true">+8.000</span><span class="CaseStudyStats-module__FC8Fpq__label">users around the world</span></li><li class="CaseStudyStats-module__FC8Fpq__stat"><span class="CaseStudyStats-module__FC8Fpq__value" data-count-up="true">+10%</span><span class="CaseStudyStats-module__FC8Fpq__label">retention</span></li><li class="CaseStudyStats-module__FC8Fpq__stat"><span class="CaseStudyStats-module__FC8Fpq__value" data-count-up="true">+20%</span><span class="CaseStudyStats-module__FC8Fpq__label">adoption</span></li><li class="CaseStudyStats-module__FC8Fpq__stat"><span class="CaseStudyStats-module__FC8Fpq__value" data-count-up="true">-70%</span><span class="CaseStudyStats-module__FC8Fpq__label">crashes</span></li><li class="CaseStudyStats-module__FC8Fpq__stat"><span class="CaseStudyStats-module__FC8Fpq__value" data-count-up="true">+20%</span><span class="CaseStudyStats-module__FC8Fpq__label">user feedback</span></li></ul></div></section></div></div></section><section class="caseStudyShell-module__aYh07q__padTopLg caseStudyShell-module__aYh07q__padBottomMd caseStudyShell-module__aYh07q__light"><div class="CaseStudyContainer-module__mRr3Za__container CaseStudyContainer-module__mRr3Za__content"><div data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal"><section id="takeaway" class="CaseStudySection-module__R0w6WG__section"><h2 data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal CaseStudySection-module__R0w6WG__label">Takeaway</h2><div class="CaseStudySection-module__R0w6WG__content"><p data-reveal="true" data-revealed="false" class="Reveal-module__T9JUMG__reveal MorpheusTemplate-module__ALvbFG__readBody">As a takeaway, we can say that the time we took to develop the app was useful in ensuring that users are happy with the result, having listened to their needs. The development also helped significantly reduce bugs and crashes by modifying the underlying code. The connection with the wearable was a challenge that ended up being utilized by various apps like Garmin, Apple Health, etc.</p></div></section></div></div><div class="CaseStudyContainer-module__mRr3Za__container CaseStudyContainer-module__mRr3Za__bleed MorpheusTemplate-module__ALvbFG__takeawayMarquee"><div class="EditorialMarquee-module__ZMpybW__section" aria-hidden="true"><div class="EditorialMarquee-module__ZMpybW__row"><div class="EditorialMarquee-module__ZMpybW__track"><span class="EditorialMarquee-module__ZMpybW__text">Train at</span><span class="EditorialMarquee-module__ZMpybW__pill"><video src="embeds/morpheus/videos/morpheus-takeaway-woman-training-720.mp4" poster="embeds/morpheus/images/takeaway/morpheus-takeaway-woman-training-poster.jpg" muted="" loop="" playsInline="" preload="metadata" tabindex="-1" aria-hidden="true"></video></span><span class="EditorialMarquee-module__ZMpybW__text">the right intensity</span><span class="EditorialMarquee-module__ZMpybW__pill"><img src="embeds/morpheus/images/takeaway/morpheus-takeaway-hyrox.png" alt="" draggable="false"/></span><span class="EditorialMarquee-module__ZMpybW__text">using Morpheus</span><span class="EditorialMarquee-module__ZMpybW__text">Train at</span><span class="EditorialMarquee-module__ZMpybW__pill"><video src="embeds/morpheus/videos/morpheus-takeaway-woman-training-720.mp4" poster="embeds/morpheus/images/takeaway/morpheus-takeaway-woman-training-poster.jpg" muted="" loop="" playsInline="" preload="metadata" tabindex="-1" aria-hidden="true"></video></span><span class="EditorialMarquee-module__ZMpybW__text">the right intensity</span><span class="EditorialMarquee-module__ZMpybW__pill"><img src="embeds/morpheus/images/takeaway/morpheus-takeaway-hyrox.png" alt="" draggable="false"/></span><span class="EditorialMarquee-module__ZMpybW__text">using Morpheus</span></div></div><div class="EditorialMarquee-module__ZMpybW__row"><div class="EditorialMarquee-module__ZMpybW__track"><span class="EditorialMarquee-module__ZMpybW__text">Improving your cardiorespiratory fitness is one of the most evidence-backed</span><span class="EditorialMarquee-module__ZMpybW__pill"><video src="embeds/morpheus/videos/morpheus-feature-athlete.mp4" poster="embeds/morpheus/images/morpheus-feature-athlete-poster.jpg" muted="" loop="" playsInline="" preload="metadata" tabindex="-1" aria-hidden="true"></video></span><span class="EditorialMarquee-module__ZMpybW__text">interventions for extending the years you actually perform at your best — and it’s trainable at any age.</span><span class="EditorialMarquee-module__ZMpybW__text">Improving your cardiorespiratory fitness is one of the most evidence-backed</span><span class="EditorialMarquee-module__ZMpybW__pill"><video src="embeds/morpheus/videos/morpheus-feature-athlete.mp4" poster="embeds/morpheus/images/morpheus-feature-athlete-poster.jpg" muted="" loop="" playsInline="" preload="metadata" tabindex="-1" aria-hidden="true"></video></span><span class="EditorialMarquee-module__ZMpybW__text">interventions for extending the years you actually perform at your best — and it’s trainable at any age.</span></div></div></div></div></section></div>
          </div>
        </section>

        <!-- ===================== MOBILE APP ===================== -->
        <section class="cs-tabpanel" role="tabpanel" id="cs-panel-morpheus-mobile" aria-labelledby="cs-tab-morpheus-mobile" data-cs-panel="mobile">

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

        <video class="cs-full-img" loop muted playsinline style="border-radius:20px;">
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
                  <span class="cs-callout-label">Focus</span>
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

        </section>

        <!-- ===================== WEBSITE ===================== -->
        <section class="cs-tabpanel" role="tabpanel" id="cs-panel-morpheus-website" aria-labelledby="cs-tab-morpheus-website" data-cs-panel="website">
            <div>
              <video class="cs-full-img" controls playsinline style="margin-top:0; border-radius:20px;">
                <source src="assets/morpheus/website-video.mp4" type="video/mp4" />
              </video>
              <a href="https://morpheus-website-brown.vercel.app/" target="_blank" rel="noopener noreferrer" class="cs-prototype-cta__link cta-link" style="display:inline-block; margin-top:20px;">Check Website Project &rarr;</a>
            </div>
        </section>
      `,
  };
})();
