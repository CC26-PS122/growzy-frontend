import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Intro() {
  const navigate = useNavigate();

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
      <motion.div
        initial={{ scale: 1.5   }}
        animate={{ scale: 0.2, x: -24, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        className="absolute flex items-center justify-center border-8 border-white p-1 rounded-full shadow-md shadow-white/40"
      >
        <img src="/images/moodtracker.svg" alt="character" />
      </motion.div>

      {/* LOGO (muncul belakangan) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.7 }}
      >
        <img src="/images/growzy_logo.svg" alt="Growzy Logo" width={230} />
      </motion.div>

      {/* TAP TEXT */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 text-sm animate-pulse"
      >
        Tap anywhere to continue
      </motion.p>
    </div>
  );
}

export default Intro;