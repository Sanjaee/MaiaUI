import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Pages/Dashboard";
import LoginPage from "./components/Pages/LoginPage";
import RegisterPage from "./components/Pages/RegisterPage";
import Verify from "./components/Pages/VerivyPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/verify" element={<Verify />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
