import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ReligionPage from "./pages/ReligionPage";
import FigurePage from "./pages/FigurePage";
import ChantPage from "./pages/ChantPage";
import BlogIndexPage from "./pages/BlogIndexPage";
import BlogPostPage from "./pages/BlogPostPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<BlogIndexPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path=":religionId" element={<ReligionPage />} />
        <Route path=":religionId/:figureId" element={<FigurePage />} />
        <Route path=":religionId/:figureId/:chantId" element={<ChantPage />} />
      </Route>
    </Routes>
  );
}

export default App;
