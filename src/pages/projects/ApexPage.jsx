import React from "react";
import CaseStudy from "../../components/case-study/CaseStudy";
import ProjectDetails from "../../components/case-study/ProjectDetails";
import AwardBadge from "../../components/case-study/AwardBadge";
import apex1 from "../../assets/apex/apex-1.jpg";
import apex2 from "../../assets/apex/apex-2.jpg";
import apex3 from "../../assets/apex/apex-3.jpg";
import apex4 from "../../assets/apex/apex-4.jpg";
import apex5 from "../../assets/apex/apex-5.jpg";

const PLATES = [apex1, apex2, apex3, apex4, apex5];

function ApexPage() {
  return (
    <CaseStudy
      slug="apex"
      quote
      intro="“Juxtaposition between ordered complexity and simplicity.”"
    >
      <AwardBadge
        href="https://competition.adesignaward.com/gooddesign.php?ID=112465"
        category="Photography and Photo Manipulation Design Award"
        period="2020–2021"
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 mb-16">
        {PLATES.map((src, i) => (
          <figure key={src} className="mb-6 rounded-lg overflow-hidden animate-on-scroll image-fade">
            <img
              src={src}
              alt={`Apex, plate ${i + 1} of ${PLATES.length}: mountain landscape`}
              className="w-full h-full object-cover"
              loading={i < 2 ? "eager" : "lazy"}
              decoding="async"
            />
          </figure>
        ))}
        <div className="mb-6 flex flex-col justify-end animate-on-scroll text-slide stagger-2">
          <p className="text-lg text-gray-300">
            Apex is a fine-art landscape series about the order and chaos within
            natural forms, set against the uniformity of social structures and
            routine life. The photographs present those forms in a setting meant
            to feel serene and still.
          </p>
          <p className="text-lg text-gray-300 mt-6">
            The facets of a mountain hold that tension in a single shape: ordered
            complexity and simplicity at once, and a different way of looking at
            natural beauty.
          </p>
        </div>
      </div>

      <ProjectDetails
        items={[
          { label: "Project", value: "Apex" },
          { label: "Year", value: "2020" },
          { label: "Scope", value: "Fine art photography" },
          { label: "Recognition", value: "A' Design Award" },
        ]}
      />
    </CaseStudy>
  );
}

export default ApexPage;
