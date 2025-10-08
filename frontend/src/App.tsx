import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PersonasPage from "./pages/PersonasPage";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/personas" element={<PersonasPage />} />
          <Route path="/personas/agregar" element={<PersonasPage isAdding />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
