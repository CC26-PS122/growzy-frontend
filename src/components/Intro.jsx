import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Intro() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/survey"); // pindah ke survey
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400 text-white">

      {step === 0 && (
        <div className="text-center">
          <div className="text-6xl mb-4">🙂</div>
        </div>
      )}

      {step === 1 && (
        <div className="text-center">
          <h1 className="text-3xl font-bold">Growzy</h1>
        </div>
      )}

      {step === 2 && (
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-2">
            Welcome to Growzy!
          </h1>
          <p className="text-sm text-blue-100 mb-4">
            Growzy will help you to track your sleep,
            drink, and mood everyday
          </p>

          <button
            onClick={nextStep}
            className="bg-white text-blue-600 px-6 py-2 rounded-full"
          >
            Continue
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="text-center max-w-md">
          <h1 className="text-xl mb-2">
            Before we start, we'd love to learn a bit about you:
          </h1>

          <button
            onClick={nextStep}
            className="bg-white text-blue-600 px-6 py-2 rounded-full mt-4"
          >
            Continue
          </button>
        </div>
      )}

      {step < 2 && (
        <button
          onClick={nextStep}
          className="absolute bottom-10 text-sm opacity-70"
        >
          Tap to continue →
        </button>
      )}

    </div>
  );
}

export default Intro;