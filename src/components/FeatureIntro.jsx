import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FeatureIntro() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const nextStep = () => {
    if (step < 10) {
      setStep(step + 1);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-blue-100 p-6 text-center">

      
      <div className="flex flex-col items-center justify-center flex-1 gap-4">

        
        {step === 0 && (
          <p className="text-lg max-w-xs">
            Got it! Now let's see how we can help you
          </p>
        )}

        
        {step === 1 && (
          <>
            <div className="text-6xl">🌚</div>
            <p className="text-lg max-w-xs">
              Meet your little buddy. They'll change based on your habit
            </p>
          </>
        )}

        
        {step === 2 && (
          <>
            <div className="text-6xl">😀</div>
            <p className="text-lg max-w-xs">
              Hi there! This is me when you keep up with all your habits
            </p>
          </>
        )}

        
        {step === 3 && (
          <>
            <div className="text-6xl">😀</div>
            <p className="text-lg max-w-xs">
              Now, let's see what affect how I look
            </p>
          </>
        )}

        
        {step === 4 && (
          <p className="text-lg max-w-xs">
            We'll track how long you sleep each night.
          </p>
        )}

        
        {step === 5 && (
          <>
            <div className="text-6xl">🌜</div>
            <p className="text-lg max-w-xs">
              Getting around 8 hours of sleep helps your character stay looking good
            </p>
          </>
        )}

        
        {step === 6 && (
          <p className="text-lg max-w-xs">
            We'll help you track your water intake
          </p>
        )}

        
        {step === 7 && (
          <>
            <div className="text-6xl">💧</div>
            <p className="text-lg max-w-xs">
              Set your daily water goal
            </p>
          </>
        )}

        
        {step === 8 && (
          <p className="text-lg max-w-xs">
            Alright! Your water goal is set.
          </p>
        )}

        
        {step === 9 && (
          <>
            <div className="text-6xl">😊</div>
            <p className="text-lg max-w-xs">
              Take care of your mood to keep your character happy
            </p>
          </>
        )}

       
        {step === 10 && (
          <p className="text-lg font-semibold max-w-xs">
            Well done! Now, let's start your journey
          </p>
        )}

      </div>

      
      <button
        onClick={nextStep}
        className="bg-blue-500 text-white px-6 py-3 rounded-full w-full max-w-xs"
      >
        {step === 1
          ? "Tap to say hi!"
          : step === 5
          ? "Got it!"
          : step === 7
          ? "Set Goal"
          : step === 9
          ? "Got it!"
          : "Continue"}
      </button>

    </div>
  );
}

export default FeatureIntro;