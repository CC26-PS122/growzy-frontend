import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchPublic } from "../../utils/api";

function Signup() {
    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const [resendLoading, setResendLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    const [showVerifyNotif, setShowVerifyNotif] = useState(false);

    useEffect(() => {
        if (resendCooldown <= 0) return;

        const timer = setInterval(() => {
            setResendCooldown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [resendCooldown]);

    const handleResend = async () => {
        setResendLoading(true);

        try {
            const data = await fetchPublic("/resend-email", {
                method: "POST",
                body: JSON.stringify({
                    email: form.email
                })
            });

            console.log("RESEND SUCCESS:", data);

            // 🔥 optional: kasih feedback UI nanti
            setResendCooldown(30);

        } catch (err) {
            console.error(err);
            alert(err.message || "Failed to resend email");
        } finally {
            setResendLoading(false);
        }

        if (!form.email) {
            alert("Email is required!");
            return;
        }
    };

    const [loading, setLoading] = useState(false);

    const getSetupData = async () => {
        const surveyDataRaw = localStorage.getItem("surveyData");
        const waterGoal = localStorage.getItem("waterGoal");

        let surveyData = null;

        if (surveyDataRaw) {
            surveyData = JSON.parse(surveyDataRaw);
        }

        let result = null;

        if (surveyData) {
            result = await fetchPublic("/survey/recommendation", {
                method: "POST",
                body: JSON.stringify({
                    drink_answer: surveyData.drink,
                    mood_answer: surveyData.mood,
                    sleep_answer: surveyData.sleep
                })
            });
        }

        return {
            baseline_sleep_hours: result?.data?.baseline?.sleep || 8,
            baseline_water_ml: result?.data?.baseline?.water || 2000,
            daily_sleep_target: result?.data?.recommendation?.sleep || 8,
            daily_water_target: waterGoal || result?.data?.recommendation?.water || 2000,
            reminder_time: "07:00",
            name: "Moody",
            current_mood_state: result?.data?.recommendation?.mood || "neutral"
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

            const data = await fetchPublic("/register", {
                method: "POST",
                body: JSON.stringify(payload)
            });

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

                        {/* ❌ CLOSE BUTTON */}
                        <button
                            onClick={() => setShowVerifyNotif(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
                        >
                            ✕
                        </button>

                        <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">
                            Verify Your Email 📩
                        </h3>

                        <p className="text-sm text-gray-600 mb-4 break-words">
                            We’ve sent a verification link to <b>{form.email}</b>.
                            Please verify within 1 hour.
                        </p>

                        {/* 🔥 RESEND BUTTON */}
                        <button
                            onClick={handleResend}
                            disabled={!form.email || resendLoading || resendCooldown > 0}
                            className="w-full bg-blue-600 text-white py-2 rounded-full text-sm hover:opacity-90 transition disabled:opacity-50"
                        >
                            {resendLoading
                                ? "Sending..."
                                : resendCooldown > 0
                                    ? `Resend in ${resendCooldown}s`
                                    : "Resend Email"}
                        </button>

                        <button
                            onClick={() => navigate("/login")}
                            className="w-full mt-3 border border-gray-300 py-2 rounded-full text-sm hover:bg-gray-50 transition"
                        >
                            Go to Login
                        </button>

                        {resendCooldown > 0 && (
                            <p className="text-xs text-gray-400 mt-2">
                                You can resend again in {resendCooldown}s
                            </p>
                        )}

                    </div>
                </div>
            )}
        </div >

    );
}

export default Signup;