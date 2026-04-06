import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function FeatureIntro() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const MIN_WATER = 500;
  const MAX_WATER = 5000;
  const [waterGoal, setWaterGoal] = useState(2000); // default ml

  const steps = [
    {
      type: "info",
      icon: <img src="/images/sleepy_char.svg" className="w-32 h-32" />,
      text: "Meet your little buddy. They'll change based on your habit",
      button: "Tap to say hi!",
    },
    {
      type: "bubble",
      icon: <img src="/images/happy_char.svg" className="w-32 h-32" />,
      text: "Hi there! This is me when you keep up with all your habits",
      button: "Continue",
    },
    {
      type: "bubble",
      icon: <img src="/images/happy_char.svg" className="w-32 h-32" />,
      text: "Now, let's see what affect how I look",
      button: "Continue",
    },
    {
      type: "info",
      text: <p>We'll track how long you <b>sleep</b> each night.</p>,
      button: "Continue",
    },
    {
      type: "info",
      icon: <img src="/images/sleeptracker.svg" className="w-16 h-16" />,
      text: "Getting around 8 hours of sleep helps your character stay looking good",
      button: "Got it!",
    },
    {
      type: "info",
      text: <p>We’ll help you track your <b>water intake</b></p>,
      button: "Continue",
    },
    {
      type: "input",
      icon: <img src="/images/watertracker.png" className="h-16" />,
      text: "Set your daily water goal",
      button: "Set Goal",
    },
    {
      type: "info",
      text: <p>Alright! Your water goal is set.</p>,
      button: "Continue",
    },
    {
      type: "info",
      icon: <img src="/images/moodtracker.svg" className="w-16 h-16" />,
      text: "Take care of your mood to keep your character happy",
      button: "Got it!",
    },
    {
      type: "info",
      text: "Well done! Now, let's start your journey",
      button: "Continue",
    },
  ];

  const current = steps[step];
  const [animate, setAnimate] = useState(true);

  const nextStep = () => {
    if (current.type === "input") {
      localStorage.setItem("waterGoal", waterGoal);
    }

    // start fade out
    setAnimate(false);

    setTimeout(() => {
      if (step < steps.length - 1) {
        setStep(step + 1);
        setAnimate(true); // fade in lagi
      } else {
        navigate("/login");
      }
    }, 300); // durasi keluar
  };

  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayedText("");

    if (typeof current.text === "string") {
      setIsTyping(true);

      const interval = setInterval(() => {
        i++;
        setDisplayedText(current.text.slice(0, i));

        if (i >= current.text.length) {
          clearInterval(interval);

          setTimeout(() => {
            setIsTyping(false);
          }, 300); // delay dikit biar lebih natural
        }
      }, 25);

      return () => clearInterval(interval);
    } else {
      setDisplayedText(current.text);
      setIsTyping(false);
    }
  }, [step]);


  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-[#D2EEFF] p-6 text-center">


      <div className="flex-1 flex items-center justify-center w-full">
        <div
          className={`bg-white rounded-2xl p-8 shadow-md max-w-md w-full flex flex-col items-center gap-6 transition-all duration-300 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >

          {/* === BUBBLE MODE === */}
          {current.type === "bubble" ? (
            <div className="flex flex-col items-center gap-4">

              {/* Bubble Chat */}
              <div className="bg-gray-100 px-4 py-2 rounded-xl text-sm text-gray-700 relative min-h-[40px] shadow">
                {displayedText}
                {isTyping && <span className="ml-1 animate-pulse">...</span>}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-100 rotate-45"></div>
              </div>

              {/* Character */}
              {current.icon}

            </div>
          ) : (
            <>
              {/* === NORMAL MODE === */}
              {current.icon && (
                <div className="w-20 h-20 bg-[#F0F9FF] rounded-full flex items-center justify-center">
                  {current.icon}
                </div>
              )}

              <p className="text-lg text-[#1D3557] max-w-xs">
                {current.text}
              </p>
            </>
          )}

          {current.type === "input" && (
            <div className="flex flex-col items-center gap-4 mt-4">

              {/* COUNTER */}
              <div className="flex items-center gap-6">

                <button
                  onClick={() =>
                    setWaterGoal((prev) => Math.max(MIN_WATER, prev - 250))
                  }
                  disabled={waterGoal <= MIN_WATER}
                  className="w-10 h-10 rounded-full bg-gray-200 disabled:opacity-30"
                >
                  −
                </button>

                <div className="text-2xl font-semibold text-[#1D3557]">
                  {waterGoal} mL
                </div>

                <button
                  onClick={() =>
                    setWaterGoal((prev) => Math.min(MAX_WATER, prev + 250))
                  }
                  disabled={waterGoal >= MAX_WATER}
                  className="w-10 h-10 rounded-full bg-[#004A78] text-white disabled:opacity-30"
                >
                  +
                </button>

              </div>

              {/* HINT */}
              <p className="text-xs text-gray-400">
                Adjust based on your daily needs
              </p>

            </div>
          )}

          <div className="w-full mt-4">
            <button
              onClick={nextStep}
              className="bg-[#004A78] text-white px-6 py-3 rounded-full w-full disabled:opacity-50"
              disabled={
                (current.type === "bubble" && isTyping) ||
                (current.type === "input" && !waterGoal)
              }
            >
              {current.button}
            </button>
          </div>

        </div>
      </div>


      {/* <button
        onClick={nextStep}
        className="bg-blue-500 text-white px-6 py-3 rounded-full w-full max-w-xs"
        disabled={current.type === "input" && !waterGoal}
      >
        {current.button}
      </button> */}

    </div>
  );
}

export default FeatureIntro;