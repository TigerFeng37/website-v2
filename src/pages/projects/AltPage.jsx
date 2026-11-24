import React from "react";
import CaseStudy from "../../components/case-study/CaseStudy";
import ProjectDetails from "../../components/case-study/ProjectDetails";
import hero from "../../assets/alt-page/hero.png";

const LIVE_BUILD_URL = "https://v0-feng-works.vercel.app/";
/** Served from `public/media/alt-page/` */
const INTERACTION_VIDEO_MP4 = "/media/alt-page/interaction.mp4";

function AltPage() {
  return (
    <CaseStudy slug="alt-site">
      <div className="mb-8 rounded-lg overflow-hidden animate-on-scroll image-fade stagger-2">
        <div className="w-full aspect-video bg-[#0c1014]">
          <img
            src={hero}
            alt="alt · site landing page built during the v0 × Contra hackathon"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      <div className="mb-16 flex justify-center animate-on-scroll text-slide stagger-2">
        <a
          href={LIVE_BUILD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/50 bg-[#72EAE0]/5 px-5 py-2.5 font-mono text-sm font-medium text-white hover:border-[#72EAE0] hover:bg-[#72EAE0]/10 transition-colors sm:text-base"
        >
          v0-feng-works.vercel.app
          <span className="text-xs opacity-90" aria-hidden>↗</span>
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      </div>

      <div className="mb-16 animate-on-scroll image-fade stagger-3">
        <div className="mb-4">
          <h2 className="text-2xl font-medium">Interaction</h2>
          <p className="text-gray-400 text-sm mt-1 max-w-2xl">
            Screen recording of navigation and motion in the live build.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden border border-white/10 bg-black aspect-video flex items-center justify-center">
          <video
            className="w-full h-full object-contain"
            controls
            playsInline
            preload="metadata"
            autoPlay
            muted
            loop
            poster={hero}
          >
            <source src={INTERACTION_VIDEO_MP4} type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="animate-on-scroll text-slide stagger-1">
          <h2 className="text-2xl font-medium mb-6">The build</h2>
          <p className="text-lg text-gray-300">
            alt · site was made at the v0 × Contra hackathon as a focused exercise:
            conceive and code a new interaction inside a strict{" "}
            <span className="text-white">75-minute</span> build, using v0, a tool I
            hadn't used before (I normally work in Cursor). The goal wasn't polish
            for its own sake, but to see how far an idea could go when time,
            tooling and intent were all constrained at once.
          </p>
        </div>
        <div className="animate-on-scroll text-slide stagger-2">
          <h2 className="text-2xl font-medium mb-6">Why v0</h2>
          <p className="text-lg text-gray-300">
            Using v0 was part of the brief, so I used the session to pressure-test
            it: could it interpret an interaction I came up with on the spot and
            turn it into a presentable landing page? The experiment was to push v0
            to the edge of a tight brief and see how well it carried a specific
            design vision end to end.
          </p>
        </div>
      </div>

      <blockquote className="max-w-2xl mr-auto mb-16 pl-6 md:pl-8 border-l-4 border-[#72EAE0]/60 text-gray-300 text-lg md:text-xl italic animate-on-scroll text-slide">
        In 75 minutes, the question was less &ldquo;is this production-ready?&rdquo;
        and more &ldquo;can this toolchain keep up with a deliberate interaction
        bet, fast enough to learn from it while the idea is still hot?&rdquo;
      </blockquote>

      <ProjectDetails
        link={{ label: "Live build", href: LIVE_BUILD_URL }}
        items={[
          { label: "Context", value: "v0 × Contra Hackathon" },
          { label: "Result", value: "First place" },
          { label: "Time box", value: "75 minutes" },
          { label: "Scope", value: ["Interaction design", "Landing narrative", "v0-assisted build"] },
        ]}
      />
    </CaseStudy>
  );
}

export default AltPage;
