import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Intro from "./components/Intro";
import Survey from "./components/Survey";
import FeatureIntro from "./components/FeatureIntro";
import Login from "./components/login";
import Dashboard from "./components/Dashboard";
import Signup from "./components/signup";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Intro />} />

        <Route path="/survey" element={<Survey />} />

        <Route path="/features" element={<FeatureIntro />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/login"
          element={<Login onLogin={() => setIsAuthenticated(true)} />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          }
        />


        <Route path="" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;