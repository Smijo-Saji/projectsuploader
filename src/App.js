import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AllProjects from "./pages/AllProjects";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentication" element={<Auth />} />
        <Route path="/register" element={<Auth register />} />
        <Route path="/allprojects" element={<AllProjects />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
