import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import DeityPage from "./pages/DeityPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="deity/:id" element={<DeityPage />} />
      </Route>
    </Routes>
  );
}

export default App;
