import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Intro from "./components/Intro";
import Survey from "./components/Survey";
import FeatureIntro from "./components/FeatureIntro"; 
import Login from "./components/login";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import Profile from "./components/Profile";

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>

      <Route path="/" element={<Intro />} />

      <Route path="/survey" element={<Survey />} />

      <Route path="/features" element={<FeatureIntro />} /> 

      <Route
        path="/login"
        element={<Login onLogin={() => setIsAuthenticated(true)} />}
      />

      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
        }
      />

      <Route
        path="/calendar"
        element={
          isAuthenticated ? <Calendar /> : <Navigate to="/login" />
        }
      />

      <Route
        path="/profile"
        element={
          isAuthenticated ? <Profile /> : <Navigate to="/login" />
        }
      />

      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default AppWrapper;