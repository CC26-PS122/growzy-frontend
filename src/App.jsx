import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Intro from "./components/Intro";
import Survey from "./components/Survey";
import FeatureIntro from "./components/FeatureIntro";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import GuestRoute from "./routes/GuestRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {

  // const location = useLocation();

  // Halaman yang gak menampilkan navbar
  // const hideNavbarRoutes = ["/", "/login", "/signup", "/survey", "/features"];

  return (
    <>
      {/* 🔥 NAVBAR (KONDISIONAL) */}
      {/* {!hideNavbarRoutes.includes(location.pathname) && <Navbar />} */}

      <Routes>

        <Route
          path="/"
          element={
            <GuestRoute>
              <Intro />
            </GuestRoute>
          }
        />

        <Route
          path="/survey"
          element={
            <GuestRoute>
              <Survey />
            </GuestRoute>
          }
        />

        <Route
          path="/features"
          element={
            <GuestRoute>
              <FeatureIntro />
            </GuestRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />

        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </>
  );
}

export default AppWrapper;