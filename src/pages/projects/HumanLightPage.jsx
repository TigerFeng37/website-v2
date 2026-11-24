import React from "react";
import CaseStudy from "../../components/case-study/CaseStudy";
import ProjectDetails from "../../components/case-study/ProjectDetails";
import AwardBadge from "../../components/case-study/AwardBadge";
import plate1 from "../../assets/humanlight/human-light-1.jpg";
import plate2 from "../../assets/humanlight/human-light-2.jpg";
import plate3 from "../../assets/humanlight/human-light-3.jpg";
import plate4 from "../../assets/humanlight/human-light-4.jpg";
import plate5 from "../../assets/humanlight/human-light-5.jpg";

const PLATES = [plate1, plate2, plate3, plate4, plate5];

function HumanLightPage() {
  return (
    <CaseStudy
      slug="human-light"
      quote
      intro="“Architecture is the light of the human intellect.”"
    >
      <AwardBadge
        href="https://competition.adesignaward.com/gooddesign.php?ID=79803"
        category="Photography and Photo Manipulation Design Award"
        period="2018–2019"
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 mb-16">
        {PLATES.map((src, i) => (
          <figure key={src} className="mb-6 aspect-square rounded-lg overflow-hidden animate-on-scroll image-fade">
            <img
              src={src}
              alt={`Human Light, plate ${i + 1} of ${PLATES.length}: minimal architectural interior at the Pinakothek der Moderne`}
              className="w-full h-full object-cover"
              loading={i < 2 ? "eager" : "lazy"}
              decoding="async"
            />
          </figure>
        ))}
        <div className="mb-6 flex flex-col justify-end animate-on-scroll text-slide stagger-2">
          <p className="text-lg text-gray-300">
            The idea that architecture is the light of the human intellect sits at
            the center of this series. The interior and facade of the Pinakothek der
            Moderne in Munich offer a clean, minimal environment; isolating those
            elements turns each photograph into something closer to a meditation on
            the space.
          </p>
          <p className="text-lg text-gray-300 mt-6">
            The light here isn't only daylight. It is also the light of the people
            who designed the building.
          </p>
        </div>
      </div>

      <ProjectDetails
        items={[
          { label: "Project", value: "Human Light" },
          { label: "Year", value: "2018" },
          { label: "Scope", value: "Fine art photography" },
          { label: "Recognition", value: "A' Design Award" },
        ]}
      />
    </CaseStudy>
  );
}

export default HumanLightPage;
