import { Link } from "react-router-dom";
import Seo from "../components/Seo";

function NotFound() {
  return (
    <section className="wrap flex min-h-[80svh] flex-col justify-end pb-16 pt-[calc(var(--header-h)+6rem)]">
      <Seo title="Page not found" />
      <p className="intro-line text-fg-2" style={{ "--i": 0 }}>
        404
      </p>
      <h1 className="intro-line mt-4 max-w-[14ch] text-h1" style={{ "--i": 1 }}>
        Nothing here yet
        <span className="caret caret-blink" aria-hidden />
      </h1>
      <p className="intro-line mt-6 max-w-measure text-h4 text-fg-2" style={{ "--i": 2 }}>
        The link may be out of date, or the project may have moved.
      </p>
      <p className="intro-line mt-10" style={{ "--i": 3 }}>
        <Link to="/#work" viewTransition className="link text-h4">
          See all work
        </Link>
      </p>
    </section>
  );
}

export default NotFound;
