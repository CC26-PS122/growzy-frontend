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
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (showVerifyNotif && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }

        if (countdown === 0) {
            navigate("/login");
        }
    }, [countdown, showVerifyNotif]);

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
        <div className="min-h-screen bg-[#D2EEFF] flex items-end justify-center px-0 sm:px-4">

            <div className="bg-[#F7F7F7] 
                w-full max-w-xl 
                h-[75vh] sm:h-[70vh] 
                rounded-t-[40px] 
                px-6 sm:px-10 
                shadow-[0_-10px_30px_rgba(0,0,0,0.05)] 
                flex flex-col justify-start pt-16 items-center text-center
                ">

                <h2 className="text-xl sm:text-2xl font-medium text-gray-700 mb-4">
                    Create your Account
                </h2>

                <div className="w-full max-w-md space-y-3 mb-6">

                    <input
                        className="w-full px-4 py-3 rounded-full border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#0F3D5E]/30"
                        placeholder="Email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        className="w-full px-4 py-3 rounded-full border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#0F3D5E]/30"
                        placeholder="Create Username"
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                    />

                    <input
                        className="w-full px-4 py-3 rounded-full border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#0F3D5E]/30"
                        placeholder="Create Password"
                        type="password"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                </div>

                <button
                    onClick={handleSignup}
                    disabled={loading}
                    className="w-full max-w-md bg-[#0F3D5E] text-white py-3 rounded-full text-sm hover:opacity-90 transition disabled:opacity-50"
                >
                    {loading ? "Creating..." : "Sign Up"}
                </button>

                <p className="text-xs sm:text-sm mt-4 text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-gray-600 font-semibold">
                        Login
                    </Link>
                </p>

            </div>

            {showVerifyNotif && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-lg">

                        <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">
                            Verify Your Email 📩
                        </h3>

                        <p className="text-sm text-gray-600 mb-4 break-words">
                            We’ve sent a verification link to <b>{form.email}</b>.
                            Please verify within 1 hour.
                        </p>

                        <p className="text-xs text-gray-400 mt-2">
                            Redirecting in {countdown}...
                        </p>

                    </div>
                </div>
            )}
        </div >

    );
}

export default Signup;