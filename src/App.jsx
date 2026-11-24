import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavbarGlass from "./components/NavbarGlass";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import NycSubwayArchivePage from "./pages/projects/NycSubwayArchivePage";
import PhotoFengWorksPage from "./pages/projects/PhotoFengWorksPage";
import AltPage from "./pages/projects/AltPage";
import PixStudioPage from "./pages/projects/PixStudioPage";
import AspectaPage from "./pages/projects/AspectaPage";
import EclairPage from "./pages/projects/EclairPage";
import AcademyRecordsPage from "./pages/projects/AcademyRecordsPage";
import TokyoTrackmapPage from "./pages/projects/TokyoTrackmapPage";
import FengWorksPage from "./pages/projects/FengWorksPage";
import UrbanscapePage from "./pages/projects/UrbanscapePage";
import ApexPage from "./pages/projects/ApexPage";
import HumanLightPage from "./pages/projects/HumanLightPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100001] focus:px-4 focus:py-2 focus:bg-[#72EAE0] focus:text-black focus:rounded"
      >
        Skip to content
      </a>
      <NavbarGlass />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/works/nyc-subway-archive" element={<NycSubwayArchivePage />} />
          <Route path="/works/photos-by-feng" element={<PhotoFengWorksPage />} />
          <Route path="/works/photo-feng-works" element={<Navigate to="/works/photos-by-feng" replace />} />
          <Route path="/works/alt-site" element={<AltPage />} />
          <Route path="/works/pixstudio" element={<PixStudioPage />} />
          <Route path="/works/aspecta" element={<AspectaPage />} />
          <Route path="/works/eclair" element={<EclairPage />} />
          <Route path="/works/academy-records" element={<AcademyRecordsPage />} />
          <Route path="/works/tokyo-trackmap" element={<TokyoTrackmapPage />} />
          <Route path="/works/feng-works" element={<FengWorksPage />} />
          <Route path="/works/urbanscape" element={<UrbanscapePage />} />
          <Route path="/works/apex" element={<ApexPage />} />
          <Route path="/works/human-light" element={<HumanLightPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
