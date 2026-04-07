import { useState } from "react";

function Signup() {
    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const getSetupData = async () => {
        const surveyDataRaw = localStorage.getItem("surveyData");
        const waterGoal = localStorage.getItem("waterGoal");

        if (!surveyDataRaw) {
            throw new Error("Survey data not found");
        }

        const surveyData = JSON.parse(surveyDataRaw);

        const res = await fetch("https://growzy-backend.vercel.app/api/survey/recommend", {
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
            name: "User",
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

            const res = await fetch("https://growzy-backend.vercel.app/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                    username: form.username,

                    baseline_sleep_hours: setupData.baseline_sleep_hours,
                    baseline_water_ml: setupData.baseline_water_ml,
                    daily_sleep_target: setupData.daily_sleep_target,
                    daily_water_target: setupData.daily_water_target,
                    reminder_time: setupData.reminder_time,
                    name: setupData.name,
                    current_mood_state: setupData.current_mood_state
                })
            });

            const data = await res.json();

            if (!res.ok) {
                alert("Signup failed");
                return;
            }

            console.log("SUCCESS:", data);
            alert("Signup success!");

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
        <div className="min-h-screen flex items-center justify-center bg-[#AFC6D6]">
            <div className="bg-white p-10 rounded-2xl w-full max-w-md text-center shadow-md">

                <h2 className="text-xl font-semibold mb-6">Create Your Account</h2>

                <input
                    className="w-full mb-3 p-3 rounded-full border"
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    className="w-full mb-3 p-3 rounded-full border"
                    placeholder="Create Username"
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />

                <input
                    className="w-full mb-6 p-3 rounded-full border"
                    placeholder="Create Password"
                    type="password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button
                    onClick={handleSignup}
                    disabled={loading}
                    className="bg-blue-800 text-white px-6 py-3 rounded-full w-full"
                >
                    {loading ? "Creating..." : "Sign Up"}
                </button>

            </div>
        </div>
    );
}

export default Signup;