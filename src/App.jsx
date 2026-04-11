import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Intro from "./pages/Intro";
import Survey from "./pages/Survey";
import FeatureIntro from "./pages/FeatureIntro";
import Login from "./features/auth/login";
import Signup from "./features/auth/signup";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
// import Navbar from "./components/Navbar";
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