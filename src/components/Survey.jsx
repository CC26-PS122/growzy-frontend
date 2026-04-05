import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "./QuestionCard";

function Survey() {
  const [step, setStep] = useState(0);

  const [answers, setAnswers] = useState({
    sleep: "",
    drink: "",
    mood: "",
  });

  const navigate = useNavigate();

  const handleSelect = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleFinish = () => {
    localStorage.setItem("surveyData", JSON.stringify(answers));
    navigate("/register");
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  // 🔥 CONFIG STEP (CLEAN BANGET)
  const stepsConfig = {
    2: {
      key: "sleep",
      icon: <img src={'/images/sleeptracker.svg'} className="w-10 h-10" />,
      question: "How many hours do you usually sleep?",
      options: [
        "Less than 4 hours",
        "4 - 5 hours",
        "6 - 8 hours",
        "More than 8 hours",
      ],
    },
    3: {
      key: "drink",
      icon: <img src={'/images/watertracker.svg'} className="w-10 h-10" />,
      question: "How much do you usually drink in a day?",
      options: [
        "Less than 4 glasses",
        "4 - 5 glasses",
        "6 - 8 glasses",
        "More than 8 glasses",
      ],
    },
    4: {
      key: "mood",
      icon: <img src={'/images/moodtracker.svg'} className="w-10 h-10" />,
      question: "How have you been feeling lately?",
      options: [
        "Mostly good",
        "Just okay",
        "Often tired or stressed",
        "My mood changes a lot",
      ],
    },
  };

  const currentStep = stepsConfig[step];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EAF6FF]">
      <div className="w-full text-center relative">

        {/* {step > 1 && (
          <button
            onClick={handleBack}
            className="absolute top-4 left-6 px-3 py-2 rounded-full text-xl z-50"
          >
            ←
          </button>
        )} */}

        {/* STEP 0: WELCOME */}
        {step === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[400px] rounded-xl">
            <h1 className="text-3xl font-semibold text-[#1D3557] mb-2">
              Welcome to Growzy!
            </h1>
            <p className="text-[#457B9D] mb-8 max-w-xs">
              Growzy will help you to track your sleep, drink, and mood everyday
            </p>
            <button
              onClick={() => setStep(1)}
              className="bg-[#004E7C] text-white px-10 py-3 rounded-full"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 1: PRE */}
        {step === 1 && (
          <div className="flex flex-col items-center justify-center min-h-[400px] rounded-xl">
            <p className="text-sm text-gray-400 mb-2">
              Step {step} of 5
            </p>
            <p className="text-[#1D3557] text-xl mb-8 max-w-sm">
              Before we start, we'd love to learn a bit about you.
            </p>
            <button
              onClick={() => setStep(2)}
              className="bg-[#004E7C] text-white px-10 py-3 rounded-full"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2–4: QUESTIONS (REUSABLE 🔥) */}
        {currentStep && (
          <QuestionCard
            step={step}
            icon={currentStep.icon}
            question={currentStep.question}
            options={currentStep.options}
            selectedOption={answers[currentStep.key]}
            onSelect={(value) =>
              handleSelect(currentStep.key, value)
            }
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* STEP 5: DONE */}
        {step === 5 && (
          <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
            <p className="text-sm text-gray-400 mb-2">
              Step {step} of 5
            </p>
            <h2 className="text-xl mb-4">
              Got it! Now let’s see how we can help you
            </h2>
            <button
              onClick={handleFinish}
              className="bg-[#004E7C] text-white px-10 py-3 rounded-full"
            >
              Continue
            </button>
            <p className="text-sm text-gray-400 cursor-pointer mt-3" onClick={handleBack}>
              Back to previous question
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Survey;