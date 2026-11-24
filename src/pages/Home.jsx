import React from "react";
import GridItem from "../components/GridItem";
import HomeHero from "../components/HomeHero";
import Seo from "../components/Seo";
import { projects } from "../data/projects";

function Home() {
  return (
    <>
      <Seo />
      <HomeHero />

      {/* Work index */}
      <section
        id="works"
        aria-labelledby="works-heading"
        className="flex flex-col w-full pb-16 pt-10 bg-[#141618] border-t border-white/10 scroll-mt-24"
      >
        <div className="flex items-baseline justify-between px-4 mb-8">
          <h2 id="works-heading" className="text-sm tracking-widest uppercase text-gray-400">
            Selected work
          </h2>
          <span className="text-sm tracking-widest uppercase text-gray-500 tabular-nums">
            {String(projects.filter((p) => !p.comingSoon).length).padStart(2, "0")} projects
          </span>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 px-4 w-full">
          {projects.map((project) => (
            <GridItem key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
