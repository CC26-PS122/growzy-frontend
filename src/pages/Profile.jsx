import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchWithAuth } from "../utils/api";
import { getMoodIcon } from "../utils/helpers";

// --- KOMPONEN LOADING POPUP ---
const LoadingPopup = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-md">
    <div className="bg-white/90 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-5 border border-white">

      {/* ICON MUTER-MUTER */}
      <div className="relative w-20 h-20">
        <img
          src="/images/char_happy.svg"
          alt="Loading..."
          className="w-full h-full animate-spin"
          style={{ animationDuration: '3s' }} // Biar muternya elegan, nggak bikin pusing
        />
      </div>

      {/* TEXT MENARIK */}
      <div className="text-center">
        <h3 className="text-[#004A78] font-bold text-lg">Hang tight!</h3>
        <p className="text-gray-500 text-sm font-medium animate-pulse">
          Moody is syncing your data...
        </p>
      </div>

    </div>
  </div>
);

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 🔥 State Loading awal true
  const [todayLog, setTodayLog] = useState(null);

  const handleLogout = () => {
    localStorage.clear(); // langsung semua

    navigate("/login", { replace: true }); // biar ga bisa back
  };

  const moodIcon = getMoodIcon(todayLog);

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    sleepGoal: "",
    waterGoal: "",
  });

  useEffect(() => {

    const cachedUser = localStorage.getItem("user");
    const cachedProfile = localStorage.getItem("profile");

    const fetchTodayMood = async () => {
      setIsLoading(true); // 🔥 Set loading tiap kali fetch (misal saat onSaved)
      try {
        const res = await fetchWithAuth("/auth/daily-logs");

        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        const todayData = res.data.find(
          (log) => log.log_date === todayStr
        );

        setTodayLog(todayData); // ✅ FIX
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false); // 🔥 Matikan loading apapun hasilnya
      }
    };

    fetchTodayMood();

    if (cachedUser && cachedProfile) {
      setUser(JSON.parse(cachedUser));
      setProfile(JSON.parse(cachedProfile));
    }

    const fetchData = async () => {
      try {
        const userData = await fetchWithAuth("/auth/user");
        const profileData = await fetchWithAuth("/auth/profile"); // ✅ FIX

        setUser(userData.data);
        setProfile(profileData.data);

        // ✅ simpan ke cache
        localStorage.setItem("user", JSON.stringify(userData.data));
        localStorage.setItem("profile", JSON.stringify(profileData.data));

        setForm({
          username: userData.data.username || "",
          email: userData.data.email || "",
          sleepGoal: profileData.data.daily_sleep_target || "",
          waterGoal: profileData.data.daily_water_target || "",
        });

      } catch (err) {
        console.error(err);

        // 🔥 kalau token invalid → kick ke login
        if (err.message.includes("Unauthorized")) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "waterGoal") {
      // Biarkan user ngetik apa aja dulu (asal angka)
      // Kita hapus logic "if val < 500" di sini
      setForm((prev) => ({
        ...prev,
        waterGoal: value, // Simpan mentah-mentah sebagai string/number dulu
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    // Balikin isi form ke data yang ada di state (data asli dari API/Cache)
    setForm({
      username: user.username || "",
      email: user.email || "",
      sleepGoal: profile.daily_sleep_target || "",
      waterGoal: profile.daily_water_target || "",
    });
    setIsEditing(false); // Matiin mode edit
  };

  const handleSave = async () => {
    const water = Number(form.waterGoal);
    // Validasi dilakukan HANYA saat tombol Save diklik
    if (isNaN(water) || water < 500 || water > 5000) {
      alert("Water goal must be between 500 mL and 5000 mL");
      return;
    }

    setIsLoading(true); // 🔥 Hidupin loading pas proses simpan
    try {
      await fetchWithAuth("/auth/user", {
        method: "PUT",
        body: JSON.stringify({ username: form.username }),
      });

      await fetchWithAuth("/auth/profile", {
        method: "PUT",
        body: JSON.stringify({
          daily_sleep_target: 8,
          daily_water_target: water,
        }),
      });

      setUser((prev) => ({
        ...prev,
        username: form.username,
      }));

      setProfile((prev) => ({
        ...prev,
        daily_sleep_target: 8,
        daily_water_target: water,
      }));

      setIsEditing(false);
      // alert("Saved successfully!"); // Opsional karena visual sudah ganti
    } catch (err) {
      console.error(err);
      alert("Failed save");
    } finally {
      setIsLoading(false); // 🔥 Matikan loading setelah selesai
    }
  };

  return (
    <div className="min-h-screen bg-[#D2EEFF] flex justify-center items-start md:items-center px-4 pb-12 md:pt-0">

      {/* 1. LOADING POPUP: Muncul jika sedang fetch atau data belum ada */}
      {(isLoading || !user || !profile) && <LoadingPopup />}

      {/* 2. KONTEN UTAMA: Dipagar agar tidak error 'null' */}
      {user && profile && (
        <div className="w-full max-w-5xl">

          <div className="block lg:hidden mb-4">
            <Navbar />
          </div>

          <div className="hidden lg:flex items-center gap-2 mb-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm text-[#0F3D5E] hover:underline"
            >
              ← Back to Dashboard
            </button>
            <span className="text-gray-400">|</span>
            <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
          </div>

          <h1 className="lg:hidden text-2xl text-center font-semibold text-gray-700 mb-4">
            Profile
          </h1>

          <div className="mb-6 flex justify-center lg:justify-start">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-full shadow-md overflow-hidden">
              <img
                src={`/${moodIcon}`}
                onError={(e) => { e.target.src = "/images/sleepy_char.svg"; }}
                className="w-full h-full object-cover"
                alt="Avatar"
              />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-2xl p-4 md:p-6 shadow-md mb-6">
            {!isEditing ? (
              <>
                <div className="mb-3 flex justify-between">
                  <p className="text-gray-400 text-sm mb-1">Username</p>
                  <p className="text-gray-600 text-sm">
                    {isEditing ? form.username : user.username}
                  </p>
                </div>
                <hr className="border-[#B5B5B5] mb-3" />
                <div className="flex justify-between">
                  <p className="text-gray-400 text-sm mb-1">Email</p>
                  <p className="text-gray-600 text-sm break-all">{user.email}</p>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <p className="text-gray-400 text-sm mb-1">Username</p>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full bg-blue-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Email (Read Only)</p>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-400 outline-none"
                  />
                </div>
              </>
            )}
          </div>

          <div className="bg-white/80 backdrop-blur rounded-2xl p-4 md:p-6 shadow-md mb-8">
            <h2 className="text-center text-gray-500 mb-4 text-sm font-semibold">
              Your Goals
            </h2>
            {!isEditing ? (
              <>
                <div className="mb-3 flex justify-between">
                  <p className="text-gray-400 text-sm mb-1">Sleep Goal</p>
                  <p className="text-gray-600 text-sm">{profile.daily_sleep_target || "8"} hours</p>
                </div>
                <hr className="border-[#B5B5B5] mb-3" />
                <div className="flex justify-between">
                  <p className="text-gray-400 text-sm mb-1">Water Goal</p>
                  <p className="text-gray-600 text-sm">{profile.daily_water_target || "2000"} ml</p>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3 flex justify-between">
                  <p className="text-gray-400 text-sm mb-1">Sleep Goal</p>
                  <p className="text-gray-600 text-sm">8 hours (Standard)</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Water Goal (mL)</p>
                  <input
                    type="number"
                    name="waterGoal"
                    value={form.waterGoal}
                    onChange={handleChange}
                    min="500"
                    max="5000"
                    className="w-full bg-blue-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col items-center gap-2 w-full md:w-auto">
            {/* BUTTON UTAMA: SAVE atau EDIT */}
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="bg-[#0F3D5E] text-white px-10 py-2 rounded-full text-sm shadow hover:bg-[#0a2b42] transition w-full md:w-auto"
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>

            {/* BUTTON SECONDARY: CANCEL (saat edit) atau LOGOUT (saat view) */}
            {isEditing ? (
              <button
                onClick={handleCancel}
                className="text-red-500 text-sm hover:underline mt-2 font-medium"
              >
                Cancel Edit
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="text-gray-500 text-sm hover:underline mt-2"
              >
                Logout
              </button>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

export default Profile;