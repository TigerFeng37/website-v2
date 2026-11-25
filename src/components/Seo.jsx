// React 19 hoists <title> and <meta> rendered anywhere in the tree into <head>.
const SITE = "Yicheng Feng";
const DEFAULT_DESCRIPTION =
  "Yicheng Feng is a New York–based designer and creative technologist making brands, interfaces and the software behind them.";

function Seo({ title, description = DEFAULT_DESCRIPTION }) {
  const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — Designer & Creative Technologist`;
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
    </>
  );
}

export default Seo;
