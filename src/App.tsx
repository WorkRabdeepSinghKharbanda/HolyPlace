import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ReligionPage from "./pages/ReligionPage";
import FigurePage from "./pages/FigurePage";
import ChantPage from "./pages/ChantPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=":religionId" element={<ReligionPage />} />
        <Route path=":religionId/:figureId" element={<FigurePage />} />
        <Route path=":religionId/:figureId/:chantId" element={<ChantPage />} />
      </Route>
    </Routes>
  );
}

export default App;
