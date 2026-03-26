import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./components/login";
import Dashboard from "./components/Dashboard";

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