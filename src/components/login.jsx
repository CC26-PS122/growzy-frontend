import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email dan password wajib diisi!");
      return;
    }

    console.log("LOGIN DATA:", {
      email,
      password,
      emailType: typeof email,
      passwordType: typeof password
    });

    try {
      const res = await fetch("https://growzy-backend.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const text = await res.text();
      console.log("RAW RESPONSE:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!res.ok) {
        alert(data.message || "Login gagal");
        return;
      }

      console.log("PAYLOAD LOGIN:", { email, password });

      // 🔥 SIMPAN TOKEN (kalau ada)
      const token = data?.data?.session?.access_token;

      if (!token) {
        console.log("LOGIN RESPONSE:", data);
        alert("Login gagal (token tidak ada)");
        return;
      }

      localStorage.setItem("token", token);

      console.log("TOKEN:", token);

      onLogin(); // set isAuthenticated = true
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    }
  };

  return (
    <div className="min-h-screen bg-[#D2EEFF] flex items-start justify-center px-0 sm:px-4">

      <form
        onSubmit={handleLogin}
        className="bg-[#F7F7F7] 
        w-full max-w-xl 
        h-[75vh] sm:h-[70vh] 
        rounded-b-[40px] 
        px-6 sm:px-10 
        shadow-[0_-10px_30px_rgba(0,0,0,0.05)] 
        flex flex-col justify-end pb-16 items-center text-center"
      >

        <h2 className="text-xl sm:text-2xl font-medium text-gray-700 mb-4">
          Welcome Back
        </h2>

        <div className="w-full max-w-md space-y-3">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 px-4 py-3 rounded-full border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#0F3D5E]/30"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-2 px-4 py-3 rounded-full border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#0F3D5E]/30"
          />
        </div>

        <div className="w-full max-w-md text-right text-xs text-gray-400 mt-1 mb-4 cursor-pointer hover:underline">
          Forgot password?
        </div>

        <button
          type="submit"
          disabled={!email || !password}
          className="w-full max-w-md bg-[#0F3D5E] text-white py-3 rounded-full text-sm hover:opacity-90 transition disabled:opacity-50" >
          Login
        </button>

        <p className="text-xs sm:text-sm mt-4 text-gray-500">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-gray-600 font-semibold">
            Sign up here
          </Link>
        </p>

      </form>
    </div>
  );
}

export default Login;