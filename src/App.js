import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AllProjects from "./pages/AllProjects";
import DashBoard from "./pages/DashBoard";
import EditProject from "./components/EditProject";
import { useContext } from "react";
import { tokenAuthContext } from "./services/AuthContext";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const { isAuth } = useContext(tokenAuthContext);
  console.log(isAuth);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentication" element={<Auth />} />
        <Route path="/register" element={<Auth register />} />
        <Route path="/allprojects" element={<AllProjects />} />
        <Route
          path="/dashboard"
          element={isAuth ? <DashBoard /> : <Navigate to={"/authentication"} />}
        />
        <Route path="/editproject" element={<EditProject />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
