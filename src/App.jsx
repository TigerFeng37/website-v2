import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
// Import individual project pages
import AcademyRecordsPage from "./pages/projects/AcademyRecordsPage";
import TokyoTrackmapPage from "./pages/projects/TokyoTrackmapPage";
import AspectaPage from "./pages/projects/AspectaPage";
import EclairPage from "./pages/projects/EclairPage";
import NotFound from "./pages/NotFound";

import hero1 from "./assets/Academy-Records-Hero.png";
import hero2 from "./assets/Tokyo-Trackmap-Hero.png";
import hero3 from "./assets/Aspecta-Hero.png";
import hero4 from "./assets/Eclair-Hero.png";

function App() {
  const location = useLocation();

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/project/academy-records" element={<AcademyRecordsPage />} />
        <Route path="/project/tokyo-trackmap" element={<TokyoTrackmapPage />} />
        <Route path="/project/aspecta" element={<AspectaPage />} />
        <Route path="/project/eclair" element={<EclairPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {location.pathname === '/' && <Footer />}
    </div>
  );
}

export default App; 