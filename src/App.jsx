import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Intro from "./components/Intro";
import Login from "./components/login";
import Dashboard from "./components/Dashboard";
import Survey from "./components/Survey";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>

        
        <Route path="/" element={<Intro />} />

        
        <Route path="/survey" element={<Survey />} />

        
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;