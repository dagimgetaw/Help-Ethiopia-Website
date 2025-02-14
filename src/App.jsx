import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./Pages/HomePage";
import NotFound from "./Components/NotFound/NotFound";
import AboutPage from "./Pages/AboutPage";
import TeamPage from "./Pages/TeamPage";
import WhatWeDo from "./Pages/WhatWeDo";
import ContactPage from "./Pages/ContactPage";
import DonatePage from "./Pages/DonatePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/our-team" element={<TeamPage />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/donate" element={<DonatePage />} />
        </Route>
      </Routes>
    </Router>
  );
}
