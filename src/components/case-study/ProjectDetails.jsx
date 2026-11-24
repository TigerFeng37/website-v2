/**
 * The closing "Project details" card shared by every case study.
 *
 * items: [{ label: "Year", value: "2024" | ["a", "b"], note?: "Work in progress" }]
 * link:  optional { label: "Live", href }
 */
function ProjectDetails({ items, link, footnote }) {
  const cols = items.length >= 5 ? "md:grid-cols-5" : "md:grid-cols-4";
  return (
    <section
      aria-labelledby="project-details-heading"
      className="bg-gray-900 p-6 md:p-8 rounded-lg animate-on-scroll image-fade"
    >
      <h2 id="project-details-heading" className="text-xl font-medium mb-6">
        Project details
      </h2>
      {link ? (
        <div className="mb-6 pb-6 border-b border-white/10">
          <h3 className="text-xs tracking-widest text-gray-400 mb-2 uppercase">{link.label}</h3>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#72EAE0] hover:underline underline-offset-2 transition-colors break-all"
          >
            {link.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            <span aria-hidden> ↗</span>
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      ) : null}
      <dl className={`grid grid-cols-2 ${cols} gap-x-4 gap-y-6`}>
        {items.map(({ label, value, note }) => (
          <div key={label}>
            <dt className="text-xs tracking-widest text-gray-400 mb-1 uppercase">{label}</dt>
            {(Array.isArray(value) ? value : [value]).map((v) => (
              <dd key={v}>{v}</dd>
            ))}
            {note ? <dd className="text-sm italic text-gray-500 mt-1">{note}</dd> : null}
          </div>
        ))}
      </dl>
      {footnote ? <p className="mt-6 text-sm text-gray-500">{footnote}</p> : null}
    </section>
  );
}

export default ProjectDetails;
