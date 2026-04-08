import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

function Signup() {
    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    const [showVerifyNotif, setShowVerifyNotif] = useState(false);

    useEffect(() => {
        if (showVerifyNotif) {
            const timer = setTimeout(() => {
                navigate("/login");
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showVerifyNotif, navigate]);

    const [loading, setLoading] = useState(false);

    const getSetupData = async () => {
        const surveyDataRaw = localStorage.getItem("surveyData");
        const waterGoal = localStorage.getItem("waterGoal");

        if (!surveyDataRaw) {
            throw new Error("Survey data not found");
        }

        const surveyData = JSON.parse(surveyDataRaw);

        const res = await fetch("https://growzy-backend.vercel.app/api/survey/recommendation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                drink_answer: surveyData.drink,
                mood_answer: surveyData.mood,
                sleep_answer: surveyData.sleep
            })
        });

        const result = await res.json();

        if (!res.ok || !result.data) {
            throw new Error("Failed to get recommendation");
        }

        return {
            baseline_sleep_hours: result.data.baseline.sleep,
            baseline_water_ml: result.data.baseline.water,
            daily_sleep_target: result.data.recommendation.sleep,
            daily_water_target: waterGoal || result.data.recommendation.water,
            reminder_time: "07:00",
            name: "Moody",
            current_mood_state: result.data.recommendation.mood
        };
    };

    const handleSignup = async () => {
        setLoading(true);

        try {
            const setupData = await getSetupData();

            console.log("SEND:", {
                email: form.email,
                password: form.password,
                username: form.username,
                user_data: setupData
            });

            const payload = {
                email: form.email,
                password: form.password,
                username: form.username,
                user_data: setupData
            };

            console.log("FINAL SEND:", payload);

            const res = await fetch("https://growzy-backend.vercel.app/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                alert("Signup failed");
                return;
            }

            console.log("SUCCESS:", data);
            setShowVerifyNotif(true);

        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    console.log("surveyData:", localStorage.getItem("surveyData"));
    console.log("waterGoal:", localStorage.getItem("waterGoal"));

    return (
        <div className="min-h-screen bg-[#AFC6D6] flex items-center justify-center">

            <div className="bg-[#F7F7F7] w-full max-w-lg rounded-[30px] py-12 px-10 shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center">

                <h2 className="text-[18px] text-gray-700 mb-6">
                    Create Your Account
                </h2>

                <input
                    className="w-full mb-3 px-4 py-3 rounded-full border border-gray-200 bg-white text-sm outline-none"
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    className="w-full mb-3 px-4 py-3 rounded-full border border-gray-200 bg-white text-sm outline-none"
                    placeholder="Create Username"
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />

                <input
                    className="w-full mb-6 px-4 py-3 rounded-full border border-gray-200 bg-white text-sm outline-none"
                    placeholder="Create Password"
                    type="password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button
                    onClick={handleSignup}
                    disabled={loading}
                    className="bg-[#0F3D5E] text-white px-8 py-2 rounded-full text-sm hover:opacity-90 transition"
                >
                    {loading ? "Creating..." : "Sign In"}
                </button>

                <p className="text-sm mt-4 text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-800 cursor-pointer">
                        Login
                    </Link>
                </p>

            </div>

            {showVerifyNotif && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl p-6 w-[320px] text-center shadow-lg">

                        <h3 className="text-lg font-semibold mb-2 text-gray-800">
                            Verify Your Email 📩
                        </h3>

                        <p className="text-sm text-gray-600 mb-4">
                            We’ve sent a verification link to <b>{form.email}</b>.
                            Please verify within 1 hour.
                        </p>

                        {/* <button
                            onClick={() => navigate("/login")}
                            className="bg-[#0F3D5E] text-white px-6 py-2 rounded-full text-sm"
                        >
                            Go to Login
                        </button> */}

                    </div>
                </div>
            )}
        </div >

    );
}

export default Signup;