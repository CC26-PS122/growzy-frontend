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
    <div className="min-h-screen bg-[#AFC6D6] flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="bg-[#F7F7F7] w-full max-w-lg rounded-[30px] py-12 px-10 shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center"
      >

        <h2 className="text-[18px] text-gray-700 mb-6">
          Welcome Back
        </h2>

        <input
          type="text"
          placeholder="Email/Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-3 rounded-full border border-gray-200 bg-white text-sm outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-2 px-4 py-3 rounded-full border border-gray-200 bg-white text-sm outline-none"
        />

        <div className="text-right text-xs text-gray-400 mb-4">
          Forgot password?
        </div>

        <button
          type="submit"
          disabled={!email || !password}
          className="bg-[#0F3D5E] text-white px-8 py-2 rounded-full text-sm hover:opacity-90 transition"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-gray-500 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-800 cursor-pointer">
            Sign up here
          </Link>
        </p>

      </form>
    </div>
  );
}

export default Login;