import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Intro() {
  const [animate, setAnimate] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // mulai animasi shrink
    const timer1 = setTimeout(() => {
      setAnimate(true);
    }, 1500);

    // munculin logo sedikit setelah shrink mulai
    const timer2 = setTimeout(() => {
      setShowLogo(true);
    }, 1700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleClick = () => {
    localStorage.setItem("hasSeenIntro", "true");
    navigate("/survey");
  };

  return (
    <div
      onClick={handleClick}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400 text-white cursor-pointer relative overflow-hidden"
    >

      {/* CHARACTER */}
      <div
        className={`absolute transition-all duration-700 ease-out shadow-lg shadow-white/40 rounded-full
        flex items-center justify-center
          ${animate
            ? "scale-[0.2] -translate-x-6 -translate-y-0 border-8 border-white p-1 rounded-full shadow-md"
            : "scale-150 border-0"
          }`}
      >
        <img src="/images/moodtracker.svg" alt="character" />
      </div>

      {/* LOGO (muncul belakangan) */}
      <div
        className={`transition-opacity duration-700
        ${showLogo ? "opacity-100" : "opacity-0"}`}
      >
        <img src="/images/growzy_logo.svg" alt="Growzy Logo" width={230} />
      </div>

      {/* TAP TEXT */}
      {showLogo && (
        <p className="absolute bottom-10 text-sm opacity-70 animate-pulse">
          Tap anywhere to continue
        </p>
      )}
    </div>
  );
}

export default Intro;