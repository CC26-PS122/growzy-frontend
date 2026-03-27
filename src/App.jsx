import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Survey from "./components/Survey"; // 🔥 TAMBAH INI

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        
        <Route
          path="/login"
          element={<Login onLogin={() => setIsAuthenticated(true)} />}
        />

        
        <Route
          path="/survey"
          element={
            isAuthenticated ? <Survey /> : <Navigate to="/login" />
          }
        />

        
        <Route
          path="/"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;