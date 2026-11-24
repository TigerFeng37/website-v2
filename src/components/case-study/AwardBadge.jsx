import aLogo from "../../assets/a-logo.jpg";

/** Link-out card for an A' Design Award listing. */
function AwardBadge({ href, category, period }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group mb-6 flex items-center justify-between gap-6 rounded-lg bg-gray-200 text-black overflow-hidden animate-on-scroll text-slide stagger-2 transition-colors hover:bg-white"
    >
      <span className="flex items-center gap-4">
        <img src={aLogo} alt="" className="w-20 self-stretch object-cover" />
        <span className="flex flex-col py-3">
          <span className="text-sm md:text-base font-medium">A' Design Award Winner</span>
          <span className="text-sm hidden md:block">{category}</span>
          <span className="text-sm text-gray-500">{period}</span>
        </span>
      </span>
      <span className="pr-5 text-sm md:text-base whitespace-nowrap">
        View award <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden>→</span>
        <span className="sr-only"> (opens in new tab)</span>
      </span>
    </a>
  );
}

export default AwardBadge;
