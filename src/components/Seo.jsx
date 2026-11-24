// React 19 hoists <title> and <meta> rendered anywhere in the tree into <head>.
const SITE = "Yicheng Feng";
const DEFAULT_DESCRIPTION =
  "Yicheng Feng is a New York–based multidisciplinary designer working across brand identity, UI/UX and creative technology.";

function Seo({ title, description = DEFAULT_DESCRIPTION }) {
  const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — Design & Creative Technology`;
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
