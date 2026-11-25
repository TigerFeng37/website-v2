import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "@fontsource-variable/mona-sans/wght.css";
import "@fontsource-variable/mona-sans/wght-italic.css";
import "./index.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";

// Reveal styles only hide content once we know JS is running.
document.documentElement.classList.add("js");

// Every case study is its own chunk; the home page ships without them.
const page = (load) => () => load().then((m) => ({ Component: m.default }));

const CASE_STUDIES = {
  "nyc-subway-archive": () => import("./pages/projects/NycSubwayArchivePage"),
  "photos-by-feng": () => import("./pages/projects/PhotoFengWorksPage"),
  "alt-site": () => import("./pages/projects/AltPage"),
  pixstudio: () => import("./pages/projects/PixStudioPage"),
  aspecta: () => import("./pages/projects/AspectaPage"),
  eclair: () => import("./pages/projects/EclairPage"),
  "academy-records": () => import("./pages/projects/AcademyRecordsPage"),
  "tokyo-trackmap": () => import("./pages/projects/TokyoTrackmapPage"),
  "feng-works": () => import("./pages/projects/FengWorksPage"),
  urbanscape: () => import("./pages/projects/UrbanscapePage"),
  apex: () => import("./pages/projects/ApexPage"),
  "human-light": () => import("./pages/projects/HumanLightPage"),
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", lazy: page(() => import("./pages/AboutPage")) },
      ...Object.entries(CASE_STUDIES).map(([slug, load]) => ({
        path: `/works/${slug}`,
        lazy: page(load),
      })),
      { path: "/works/photo-feng-works", element: <Navigate to="/works/photos-by-feng" replace /> },
      { path: "*", lazy: page(() => import("./pages/NotFound")) },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
