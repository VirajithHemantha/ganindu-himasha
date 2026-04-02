import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Calendar, Clock } from "lucide-react";

/**
 * Premium Sri Lankan Wedding Invitation Theme
 * Names: Naween & Nadeesha
 * Background: Cream/Sand
 * Accents: Green/Brown
 */

const topLeftImage = "/top left.png";
const downRightImage = "/down right.png";
const footerFloralImage = "/images/footer_floral.png";
const floralCornerImage = "/images/floral_corner.png";
const mandalaImage = "/images/mandala_gold.png";
const brideGroomImage = "/images/10.png";
const backgroundMusic = "/01-Alex_Warren_-_Ordinary_(Wedding_version).mp3";


function FloatingPetals() {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<Array<{
    id: number;
    x: number;
    size: number;
    rotation: number;
    duration: number;
    delay: number;
    color: string;
    drift: number;
  }>>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    const colors = ["#fdf5eb", "#f9ede0", "#f0e1cf", "#fefaf6"];
    const petalCount = isMobile ? 10 : 18;
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 7 + 7,
      rotation: Math.random() * 360,
      duration: Math.random() * 11 + 16,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 24 - 12,
    }));

    setPetals(newPetals);
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""}`}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_2px_6px_rgba(227,207,172,0.4)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function CountdownTimer() {
  const targetDate = new Date("May 08, 2026 09:30:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const stats = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-8 justify-center w-full max-w-4xl mx-auto mt-8 md:mt-16 z-20 px-2">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
          className="relative group"
        >
          {/* Ornamental Frame container */}
          <div className="relative w-[4.5rem] h-[6.5rem] sm:w-20 sm:h-28 md:w-32 md:h-44 bg-white rounded-t-full shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] border border-theme-100/60 flex flex-col items-center justify-center overflow-hidden transition-transform duration-700 group-hover:-translate-y-3">
            <div className="absolute top-0 right-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] w-full h-full pointer-events-none" />
            <div className="absolute inset-1.5 sm:inset-2 md:inset-3 border-[0.5px] border-theme-300/50 rounded-t-full pointer-events-none" />

            {/* The Number */}
            <span className="text-2xl sm:text-3xl md:text-5xl font-playball text-theme-800 leading-none relative z-10 drop-shadow-sm mt-3 sm:mt-4 md:mt-6 transition-transform duration-500 group-hover:scale-110">
              {Math.max(0, stat.value).toString().padStart(2, '0')}
            </span>

            {/* The Label */}
            <div className="w-full flex justify-center mt-2 sm:mt-3 md:mt-6 mb-1 sm:mb-2 relative z-10">
              <span className="text-[5px] sm:text-[6px] md:text-[8px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-stone-500 font-bold px-2 sm:px-3 py-1 sm:py-1.5 bg-stone-50 rounded-full border border-theme-100/50 shadow-sm whitespace-nowrap">
                {stat.label}
              </span>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-[3px] h-[3px] sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rotate-45 bg-theme-300" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function WeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (isOpened && !isPlaying) {
      audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => { });
    }
  }, [isOpened]);

  return (
    <main
      className={`h-[100dvh] w-full bg-[#fdfaf5] transition-all duration-1000 ${isOpened ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden flex items-center justify-center"
        } relative font-montserrat scroll-smooth`}
    >
      <FloatingPetals />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="envelope-stage"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.1,
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
            className="flex flex-col items-center justify-center p-6 relative z-10 w-full"
          >
            {/* Title */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
              <span className="inline-block px-5 py-2 rounded-full bg-theme-50 border border-theme-200 text-[10px] uppercase tracking-[0.5em] text-theme-700 font-bold mb-6">
                Save the Date
              </span>
              <h1 className="font-cinzel text-4xl md:text-5xl text-stone-800 mb-4 tracking-tight">
                Umayangana & Ashan
              </h1>
              <p className="text-stone-500 text-sm tracking-[0.2em] font-light">MAY 08, 2026</p>
            </motion.div>

            {/* Gatefold Envelope */}
            <div
              className="relative w-full max-w-[430px] aspect-[1/1.42] flex items-center justify-center group cursor-pointer perspective-1000"
              onClick={() => setIsOpened(true)}
            >
              <div className="absolute -inset-8 bg-[radial-gradient(circle,_rgba(227,207,172,0.25)_0%,_rgba(249,237,224,0.15)_45%,_transparent_75%)] blur-3xl opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#fffefb] via-[#fdf9f2] to-[#f9f3ea] rounded-[1.4rem] shadow-[0_28px_80px_-20px_rgba(77,65,47,0.15)] border border-theme-200/80 overflow-hidden" />
              <div className="absolute inset-[10px] rounded-[1.05rem] border border-theme-300/45 pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.07] bg-[url('https://www.transparenttextures.com/patterns/rice-paper-3.png')]" />

              <motion.div
                initial={{ opacity: 0.15, x: -140 }}
                animate={{ opacity: [0.08, 0.2, 0.08], x: [-160, 260, -160] }}
                transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-lg z-20 pointer-events-none"
              />

              <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 w-[88%] h-[44%] bg-gradient-to-b from-theme-100/90 to-theme-50/60 clip-path-envelope z-10" />
              <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-[84%] h-[39%] border border-theme-300/45 clip-path-envelope z-10 opacity-60" />

              {/* Left Flap */}
              <motion.div
                className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-[#4d412f] via-[#6e5d43] to-[#3a3123] z-30 shadow-[8px_0_28px_rgba(40,34,25,0.35)] origin-left flex items-center justify-end pr-4 overflow-hidden rounded-l-[1.2rem]"
                whileHover={{ rotateY: -14 }}
                transition={{ type: "spring", stiffness: 110, damping: 16 }}
              >
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-theme-200 via-theme-400 to-theme-200" />
                <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-tr from-black/25 via-transparent to-white/10" />

                {/* Envelope Illustrations */}
                <img
                  src={mandalaImage}
                  className="absolute -top-20 md:-top-28 -left-20 md:-left-28 w-56 md:w-72 h-56 md:h-72 opacity-55 mix-blend-screen"
                  alt=""
                />
                <img
                  src={mandalaImage}
                  className="absolute -bottom-20 md:-bottom-28 -left-20 md:-left-28 w-56 md:w-72 h-56 md:h-72 opacity-50 mix-blend-screen -rotate-90"
                  alt=""
                />

                <div className="text-theme-100/35 rotate-90 whitespace-nowrap text-xs tracking-[0.55em] uppercase font-bold relative z-10">
                  UMAYANGANA & ASHAN
                </div>
              </motion.div>

              {/* Right Flap */}
              <motion.div
                className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-[#4d412f] via-[#6e5d43] to-[#3a3123] z-30 shadow-[-8px_0_28px_rgba(40,34,25,0.35)] origin-right flex items-center justify-start pl-4 overflow-hidden rounded-r-[1.2rem]"
                whileHover={{ rotateY: 14 }}
                transition={{ type: "spring", stiffness: 110, damping: 16 }}
              >
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-theme-200 via-theme-400 to-theme-200" />
                <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-tl from-black/25 via-transparent to-white/10" />


                {/* Envelope Illustrations */}
                <img
                  src={mandalaImage}
                  className="absolute -top-20 md:-top-28 -right-20 md:-right-28 w-56 md:w-72 h-56 md:h-72 opacity-55 mix-blend-screen rotate-90"
                  alt=""
                />
                <img
                  src={mandalaImage}
                  className="absolute -bottom-20 md:-bottom-28 -right-20 md:-right-28 w-56 md:w-72 h-56 md:h-72 opacity-50 mix-blend-screen rotate-180"
                  alt=""
                />
              </motion.div>

              {/* The Seal Button */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: -6 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-28 h-28 rounded-full bg-gradient-to-br from-theme-100 via-white to-theme-200 shadow-[0_20px_45px_-10px_rgba(110,93,67,0.35)] border-[5px] border-[#4d412f] flex items-center justify-center group-hover:shadow-theme-400/40"
              >
                <div className="absolute inset-1.5 rounded-full border border-theme-400/50" />
                <div className="absolute inset-3 rounded-full border border-theme-500/30" />
                <div className="text-center relative z-10">
                  <p className="font-cinzel text-[1.7rem] font-bold text-stone-800 leading-none">U&A</p>
                  <div className="h-px w-12 bg-stone-400 mx-auto my-1.5" />
                  <p className="text-[8px] uppercase tracking-[0.35em] font-bold text-stone-600">Open</p>
                </div>
              </motion.div>

              {/* Card Preview inside (Mandala) */}
              <div className="absolute inset-10 opacity-45 flex items-center justify-center z-10">
                <img src={mandalaImage} alt="" className="w-full h-auto animate-spin-slow mix-blend-multiply" style={{ animationDuration: '24s' }} />
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 text-[8px] uppercase tracking-[0.45em] text-theme-700/80 font-bold bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-theme-200/80 shadow-sm">
                Tap Seal To Open
              </div>
            </div>

            <p className="mt-8 text-[11px] uppercase tracking-[0.6em] text-stone-400 font-bold animate-pulse">
              Tap to Reveal
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
          >

            {/* Sticky Return Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsOpened(false)}
              className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-theme-100 text-theme-800 hover:bg-theme-50 transition-colors"
            >
              <div className="flex flex-col items-center">
                <div className="text-[8px] uppercase tracking-widest font-bold">Close</div>
              </div>
            </motion.button>

            {/* Hero Section */}
            <section className="min-h-[100dvh] w-full flex items-center justify-center p-4 md:p-12 relative overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#fdfaf5] to-theme-50/40">
              {/* Premium Background Elements */}
              <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

              {/* Elegant glow orbs for modern feel */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] min-w-[300px] min-h-[300px] bg-theme-100/40 blur-[100px] rounded-full mix-blend-multiply"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] min-w-[400px] min-h-[400px] bg-theme-200/30 blur-[120px] rounded-full mix-blend-multiply"
              />

              {/* Large Watermark Monogram - Made sleeker */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.03, scale: 1 }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[45vw] text-theme-900 pointer-events-none whitespace-nowrap leading-none select-none z-0"
              >
                U & A
              </motion.div>

              {/* Central Premium Arch Card - modernized */}
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.4, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                className="relative z-10 w-full max-w-[420px] min-h-[550px] h-[85vh] md:h-[82vh] bg-white/40 backdrop-blur-2xl rounded-t-full rounded-b-[2.5rem] shadow-[0_30px_80px_-20px_rgba(110,93,67,0.1)] border border-white/80 flex flex-col items-center overflow-hidden p-6 pt-12 md:p-10 md:pt-16 group"
              >
                {/* 3D Floral Background from generated image */}
                <div className="absolute inset-0 z-0 opacity-100 mix-blend-normal">
                  <img
                    src="/images/cream-floral-frame.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Modern Inner Frame */}
                <div className="absolute inset-2 border-[0.5px] border-theme-300/40 rounded-t-full rounded-b-[2rem] pointer-events-none transition-all duration-1000 group-hover:inset-3 group-hover:border-theme-400/60 z-10" />
                <div className="absolute inset-0 bg-white/30 rounded-t-full rounded-b-[2.5rem] pointer-events-none z-0" />

                {/* Minimalist Graphic Replacement for Mandala */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "60px" }}
                  transition={{ duration: 1, delay: 1 }}
                  className="w-px bg-gradient-to-b from-transparent via-theme-500 to-transparent mb-8 relative z-10 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 45 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className="w-2 h-2 bg-theme-600 absolute shadow-[0_0_15px_rgba(188,95,153,0.6)]"
                  />
                </motion.div>

                <div className="flex flex-col items-center text-center space-y-2 flex-1 w-full relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                  >
                    <span className="block text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-theme-900 font-extrabold mb-4 bg-theme-400/30 px-8 py-2.5 rounded-full border border-theme-400/50 shadow-[0_4px_12px_rgba(110,93,67,0.2)] backdrop-blur-md">
                      We Are Getting Married
                    </span>
                  </motion.div>

                  <div className="space-y-0 py-6 flex-1 flex flex-col justify-center items-center w-full relative">
                    <motion.h1
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                      className="font-playball text-[3rem] sm:text-[3.8rem] md:text-[4.8rem] text-stone-800 leading-[1] drop-shadow-md z-10 relative -mr-4"
                    >
                      Umayangana
                    </motion.h1>

                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                      className="font-cinzel text-5xl md:text-7xl text-theme-400 italic font-light my-1 md:my-0 z-0 relative opacity-40 mix-blend-multiply"
                    >
                      &
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                      className="font-playball text-[3rem] sm:text-[3.8rem] md:text-[4.8rem] text-stone-800 leading-[1] drop-shadow-md z-10 relative -ml-4"
                    >
                      Ashan
                    </motion.h1>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="mt-6 md:mt-auto pb-6 md:pb-4 w-full flex flex-col items-center"
                  >
                    <div className="flex items-center justify-center gap-6 mb-8 opacity-80 w-full px-8">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-theme-400 to-transparent" />
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <p className="font-cinzel text-lg md:text-xl text-stone-800 tracking-[0.3em] md:tracking-[0.4em] font-bold">08 MAY 2026</p>
                      <p className="text-[9px] md:text-[10px] text-theme-800 tracking-[0.3em] md:tracking-[0.4em] uppercase font-extrabold bg-white/70 px-6 py-2 rounded-full border border-theme-200/60 shadow-sm backdrop-blur-md">Grand Ballroom, Galleface Hotel</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-20 group"
              >
                <span className="hidden md:block text-[8px] md:text-[9px] uppercase tracking-[0.5em] text-theme-800/60 font-bold group-hover:text-theme-800 transition-colors">Scroll to explore</span>
                <div className="w-px h-12 md:h-16 relative overflow-hidden bg-theme-200/50 rounded-full">
                  <motion.div
                    animate={{ y: [-40, 60] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="w-full h-8 bg-theme-400 rounded-full shadow-[0_0_10px_rgba(110,93,67,0.4)]"
                  />
                </div>
              </motion.div>
            </section>

            {/* Wedding Details Section */}
            <section className="cv-auto py-24 md:py-32 w-full flex flex-col items-center px-4 relative">
              <div className="section-floral-overlay absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <img src={topLeftImage} className="absolute -left-12 md:-left-6 -top-12 md:-top-6 w-[250px] md:w-[450px] h-auto mix-blend-multiply opacity-25" alt="" />
                <img src={downRightImage} className="absolute -right-16 md:-right-8 -bottom-16 md:-bottom-8 w-[270px] md:w-[470px] h-auto mix-blend-multiply opacity-25" alt="" />
              </div>


              <div className="max-w-[1000px] w-full flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-8 md:mb-16"
                >
                  <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent to-theme-400 mb-6 md:mb-10" />
                  <p className="text-theme-700 text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.25em] uppercase font-bold text-center leading-loose max-w-2xl px-4">
                    <span className="mb-4 block">Mr. Monteague Sarachchandra & Mrs. Sarojini Nanayakkara<br />Together with<br />Mr. Prasanna Indrajith Hettiarachchi & Mrs. Manel Herath</span>
                    Request the honour of the presence of Mr. & Mrs./Miss/Family<br className="hidden md:block" /> to celebrate the marriage of their children
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative mb-10 md:mb-14"
                >
                  <div className="absolute -inset-3 md:-inset-4 rounded-[2rem] bg-theme-100/35 blur-xl" />
                  <div className="relative bg-white/90 p-2.5 md:p-3 rounded-[2rem] border border-theme-200 shadow-[0_20px_50px_-20px_rgba(110,93,67,0.15)]">
                    <img
                      src={brideGroomImage}
                      alt="Bride and groom wedding illustration"
                      className="w-[200px] h-[240px] md:w-[270px] md:h-[320px] object-cover rounded-[1.6rem] border border-theme-100"
                    />
                  </div>
                </motion.div>

                <div className="relative w-full flex flex-col md:flex-row items-center justify-center md:items-stretch gap-6 md:gap-10 my-12 md:my-20 z-10 px-2 lg:px-8">

                  {/* Nimmi's Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-white w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-theme-100/50 rounded-tl-[100px] rounded-br-[100px] md:rounded-tl-[130px] md:rounded-br-[130px] overflow-hidden group flex flex-col justify-center text-center items-center"
                  >
                    <div className="absolute inset-2 border border-theme-200/50 rounded-tl-[90px] rounded-br-[90px] md:rounded-tl-[120px] md:rounded-br-[120px] pointer-events-none" />
                    <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
                    <div className="relative z-10 space-y-4 py-8 md:py-12">
                      <div className="space-y-2">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-bold text-stone-400">Loving daughter of</p>
                        <p className="text-sm md:text-base font-cinzel text-stone-600 tracking-wider leading-relaxed">Mr. Monteague Sarachchandra<br />& Mrs. Sarojini Nanayakkara</p>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-playball text-theme-800 group-hover:scale-110 transition-transform duration-700 pt-6 drop-shadow-sm">Umayangana</h3>
                    </div>
                  </motion.div>

                  {/* Vertical Divider / AMPERSAND */}
                  <div className="flex flex-row md:flex-col items-center justify-center gap-4 py-4 md:py-0 relative z-20">
                    <div className="hidden md:block w-px h-32 bg-gradient-to-t from-theme-300 to-transparent" />
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                      className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-theme-400 to-theme-600 rounded-full flex items-center justify-center shadow-xl shadow-theme-800/10 border-4 border-[#fffdfb]"
                    >
                      <span className="text-3xl md:text-5xl font-playball text-white md:-mt-1 drop-shadow-md">&</span>
                    </motion.div>
                    <div className="hidden md:block w-px h-32 bg-gradient-to-b from-theme-300 to-transparent" />
                  </div>

                  {/* Rishan's Card - Offset structurally on desktop */}
                  <motion.div
                    initial={{ opacity: 0, x: 30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="relative bg-white w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-theme-100/50 rounded-tr-[100px] rounded-bl-[100px] md:rounded-tr-[130px] md:rounded-bl-[130px] overflow-hidden group flex flex-col justify-center text-center items-center md:mt-24"
                  >
                    <div className="absolute inset-2 border border-theme-200/50 rounded-tr-[90px] rounded-bl-[90px] md:rounded-tr-[120px] md:rounded-bl-[120px] pointer-events-none" />
                    <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
                    <div className="relative z-10 space-y-4 py-8 md:py-12">
                      <div className="space-y-2">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-bold text-stone-400">Loving son of</p>
                        <p className="text-sm md:text-base font-cinzel text-stone-600 tracking-wider leading-relaxed">Mr. Prasanna Indrajith Hettiarachchi<br />& Mrs. Manel Herath</p>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-playball text-theme-800 group-hover:scale-110 transition-transform duration-700 pt-6 drop-shadow-sm">Ashan</h3>
                    </div>
                  </motion.div>
                </div>

                {/* Date & Time Luxury Layout */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center space-y-10 mt-4 md:mt-16 w-full"
                >
                  <div className="w-1.5 h-1.5 rotate-45 bg-theme-300/40" />

                  <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 text-center w-full max-w-4xl px-4">
                    <div className="flex flex-col items-center flex-1">
                      <Calendar className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 font-bold mb-3">The Date</p>
                      <p className="font-cinzel text-xl md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">FRIDAY, 08 MAY</p>
                      <p className="font-cinzel text-lg md:text-xl text-theme-600 tracking-[0.3em] font-normal mt-2">2026</p>
                    </div>

                    <div className="hidden md:flex flex-col items-center gap-3">
                      <div className="w-px h-12 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="w-px h-12 bg-theme-200" />
                    </div>

                    <div className="md:hidden flex flex-row items-center gap-3">
                      <div className="h-px w-10 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="h-px w-10 bg-theme-200" />
                    </div>

                    <div className="flex flex-col items-center flex-1">
                      <Clock className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 font-bold mb-3">The Time</p>
                      <p className="font-cinzel text-xl md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">09:30 AM</p>
                      <p className="font-cinzel text-xs md:text-sm text-theme-600 tracking-[0.2em] mt-3 uppercase">To 03:30 PM</p>
                    </div>
                  </div>

                  <div className="pt-8 w-full px-4">
                    <div className="relative inline-flex items-center justify-center w-full max-w-md mx-auto group">
                      <div className="absolute inset-0 bg-theme-100 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                      <p className="relative text-theme-800 bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] text-[9px] md:text-[11px] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase px-6 lg:px-10 py-4 lg:py-5 rounded-full border border-theme-200 flex items-center justify-center gap-4 w-full md:w-auto">
                        <span className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                        <span className="whitespace-nowrap">Poruwa Ceremony at 09:57 AM</span>
                        <span className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Countdown Section */}
            <section className="cv-auto py-24 md:py-36 bg-[#fffcf5] relative border-y border-theme-100/30 flex flex-col items-center overflow-hidden">
              {/* Premium Background Elements */}
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-theme-100 blur-[120px] rounded-full opacity-30 pointer-events-none" />

              <div className="w-full max-w-[1000px] px-4 flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative w-full flex flex-col items-center"
                >
                  {/* Watermark text */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[12vw] md:text-[140px] text-theme-100/50 whitespace-nowrap pointer-events-none z-0 select-none">
                    Forever
                  </div>

                  <div className="flex items-center gap-4 md:gap-8 justify-center relative z-10 w-full mb-6 mt-4 opacity-70">
                    <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-theme-400" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                    <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-theme-400" />
                  </div>

                  <h2 className="font-cinzel text-3xl md:text-5xl text-theme-900 mb-8 relative z-10 tracking-widest font-bold drop-shadow-sm px-4 leading-[1.4]">
                    Wait for the <span className="font-playball text-theme-700 italic lowercase tracking-normal text-4xl md:text-7xl ml-2">magic</span>
                  </h2>

                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-theme-600 font-bold bg-white/80 backdrop-blur-sm px-8 py-3 rounded-full border border-theme-200/50 inline-flex items-center gap-3 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] relative z-10">
                    <span className="w-1 h-1 rounded-full bg-theme-300 animate-pulse" />
                    Counting Down
                    <span className="w-1 h-1 rounded-full bg-theme-300 animate-pulse" />
                  </p>
                </motion.div>

                <CountdownTimer />
              </div>
            </section>

            {/* Venue Location Section */}
            <section className="cv-auto py-24 md:py-36 bg-[#fefaf6] relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-theme-100 blur-[150px] rounded-full opacity-20 pointer-events-none" />

              <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8 flex flex-col items-start"
                  >
                    <div className="flex flex-col items-start gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-px bg-theme-400" />
                        <span className="text-theme-600 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[11px]">The Venue</span>
                      </div>
                      <h2 className="font-playball text-[3rem] sm:text-[3.5rem] md:text-[5rem] text-theme-900 leading-[1.1] drop-shadow-sm ml-[-4px]">
                        Grand Ballroom,<br className="hidden md:block" /> Galleface Hotel
                      </h2>
                    </div>

                    <div className="space-y-6 pt-4 relative">
                      <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-theme-300 to-transparent" />

                      <div className="pl-8 space-y-4">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-theme-100 absolute -left-5 top-0">
                          <MapPin className="w-4 h-4 text-theme-500" />
                        </div>
                        <p className="text-lg md:text-xl text-stone-700 font-cinzel font-medium leading-relaxed tracking-wide">
                          Grand Ballroom,<br /> Galleface Hotel,<br /> Colombo, Sri Lanka.
                        </p>
                      </div>

                      <div className="pl-8 space-y-4 pt-4 text-stone-500 text-sm md:text-base tracking-wide font-light leading-relaxed">
                        We look forward to welcoming you to this beautiful sanctuary to celebrate our special day amidst nature's elegance.
                      </div>
                    </div>

                    <div className="pt-8 w-full md:w-auto">
                      <button
                        onClick={() => window.open('https://maps.app.goo.gl/bJYHccKbNMgZMVar6', '_blank')}
                        className="w-full md:w-auto flex items-center justify-center gap-4 bg-theme-800 text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-theme-900 hover:shadow-xl hover:shadow-theme-900/20 transition-all duration-300 group"
                      >
                        <MapPin className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                        Get Directions
                      </button>
                    </div>
                  </motion.div>

                  {/* Arched Map Container */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative w-full max-w-[450px] mx-auto aspect-[4/5] md:aspect-[3/4] rounded-t-full rounded-b-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-[12px] border-white bg-theme-100 overflow-hidden group"
                  >
                    <div className="absolute inset-0 border border-theme-200 rounded-t-full rounded-b-[1.5rem] pointer-events-none z-10" />

                    {/* The Maps iframe */}
                    <div className="absolute inset-0 w-full h-full scale-[1.2] group-hover:scale-[1.15] transition-transform duration-[2s]">
                      <iframe
                        src="https://maps.google.com/maps?q=Grand%20Ballroom,%20Galle%20Face%20Hotel,%20Colombo,%20Sri%20Lanka&t=&z=16&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                      />
                    </div>

                    {/* Elegant fade overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/80 to-transparent h-32 pointer-events-none z-10 flex items-end justify-center pb-6">
                      <p className="text-[8px] uppercase tracking-widest text-stone-500 font-bold bg-white/90 px-5 py-2 rounded-full shadow-sm backdrop-blur-md inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-theme-400 animate-pulse" />
                        View on Map
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* RSVP Section */}
            <section className="cv-auto py-24 md:py-36 bg-[#2c2a26] text-white relative overflow-hidden flex flex-col items-center">
              {/* Opulent dark background */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
              <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] bg-theme-900 blur-[150px] rounded-full opacity-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[800px] bg-[#1a1816] blur-[150px] rounded-full opacity-40 pointer-events-none" />

              <div className="container mx-auto px-4 max-w-2xl text-center relative z-10 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <p className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] md:tracking-[0.8em] text-theme-300 font-bold mb-6">Will You Join Us?</p>
                  <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-white mb-6 drop-shadow-md">RSVP</h2>
                  <div className="flex items-center gap-4 justify-center w-full mb-8 opacity-60">
                    <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-theme-300" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-white" />
                    <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-theme-300" />
                  </div>
                  <p className="text-stone-300 text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-4 tracking-wide font-light">
                    We would be absolutely thrilled to celebrate with you. RSVP (Regrets Only).
                  </p>
                  <div className="flex flex-col gap-2 text-[10px] md:text-sm text-theme-200/80 uppercase tracking-widest font-bold mb-16 px-4">
                    <p>Umayangana: 071 5396933 | Ashan: 071 2727407</p>
                    <p>Mr. Sarachchandra: 071 4721366 | Mrs. Hettiarachchi: 071 7571002</p>
                  </div>

                  {/* Premium RSVP Form */}
                  <div className="w-full bg-white/5 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]">
                    <form className="space-y-8 text-left" onSubmit={(e) => e.preventDefault()}>
                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">Full Name</label>
                        <input
                          type="text"
                          placeholder="John & Jane Doe"
                          className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-theme-300 transition-colors font-cinzel text-lg md:text-xl tracking-wide"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">Guests</label>
                        <div className="relative">
                          <select
                            defaultValue="1"
                            className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white focus:outline-none focus:border-theme-300 transition-colors font-cinzel text-lg md:text-xl tracking-wide appearance-none cursor-pointer"
                          >
                            <option value="1" className="bg-[#2c2a26] text-white">1 Guest (Just Me)</option>
                            <option value="2" className="bg-[#2c2a26] text-white">2 Guests</option>
                            <option value="3" className="bg-[#2c2a26] text-white">3 Guests</option>
                            <option value="4" className="bg-[#2c2a26] text-white">4 Guests</option>
                            <option value="0" className="bg-[#2c2a26] text-theme-300">Regretfully Decline</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <div className="w-2 h-2 border-r border-b border-theme-300 rotate-45 transform -translate-y-[25%]" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">Dietary Notes</label>
                        <input
                          type="text"
                          placeholder="Allergies, Vegan, etc."
                          className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-theme-300 transition-colors font-cinzel text-lg md:text-xl tracking-wide"
                        />
                      </div>

                      <div className="pt-10">
                        <button
                          className="w-full bg-theme-200 text-stone-900 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 group inline-flex justify-center items-center gap-4"
                        >
                          <span className="w-1.5 h-1.5 bg-stone-900 rotate-45 group-hover:scale-150 transition-transform" />
                          Send RSVP
                          <span className="w-1.5 h-1.5 bg-stone-900 rotate-45 group-hover:scale-150 transition-transform" />
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Wishing Section and Footer Wrapper */}
            <div className="relative bg-[#fdfaf5]">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <section className="cv-auto py-24 md:py-36 relative flex flex-col items-center overflow-hidden">
                <img src={topLeftImage} alt="" className="absolute top-0 right-0 w-[40vw] max-w-[500px] opacity-[0.08] mix-blend-multiply translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <img src={downRightImage} alt="" className="absolute bottom-16 left-1/2 w-[38vw] max-w-[360px] opacity-[0.15] mix-blend-multiply -translate-x-1/2 pointer-events-none" />


                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-theme-100/50 mb-8 mt-4 shadow-sm border border-theme-200/50">
                      <Sparkles className="w-8 h-8 text-theme-500" />
                    </div>

                    <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-theme-800 mb-6 drop-shadow-sm leading-none">Best Wishes</h2>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-theme-400 to-transparent mb-8" />

                    <p className="text-stone-500 text-sm md:text-lg leading-relaxed max-w-xl mx-auto mb-16 font-light tracking-wide px-4">
                      Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a message, we would be delighted to read it!
                    </p>

                    {/* Premium Wishing Form */}
                    <div className="w-full max-w-2xl mx-auto bg-white p-6 sm:p-8 md:p-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-theme-100/50 rounded-tr-[4rem] rounded-bl-[4rem] relative group">
                      {/* Decorative internal lines */}
                      <div className="absolute inset-2 md:inset-4 border-[0.5px] border-theme-200/50 rounded-tr-[3.5rem] rounded-bl-[3.5rem] pointer-events-none transition-colors duration-700 group-hover:border-theme-300/80" />

                      <form className="space-y-8 text-left relative z-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-3">
                          <label className="text-[7px] md:text-[9px] uppercase tracking-[0.4em] font-bold text-stone-400 ml-2">Your Name</label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full bg-stone-50/50 border-b border-theme-200 px-4 py-4 text-theme-900 placeholder:text-stone-300 focus:outline-none focus:border-theme-400 focus:bg-white transition-all font-cinzel text-lg tracking-wide rounded-t-lg"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[7px] md:text-[9px] uppercase tracking-[0.4em] font-bold text-stone-400 ml-2">Your Message</label>
                          <textarea
                            rows={4}
                            placeholder="Wishing you a lifetime of happiness..."
                            className="w-full bg-stone-50/50 border-b border-theme-200 px-4 py-4 text-theme-900 placeholder:text-stone-300 focus:outline-none focus:border-theme-400 focus:bg-white transition-all font-cinzel text-lg tracking-wide resize-none rounded-t-lg"
                          />
                        </div>
                        <div className="pt-6 flex justify-center">
                          <button className="bg-theme-800 text-white px-12 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-theme-900 hover:shadow-xl hover:shadow-theme-900/20 transition-all duration-300 group/btn inline-flex items-center gap-4">
                            <span className="w-1.5 h-1.5 bg-white rotate-45 group-hover/btn:scale-150 transition-transform" />
                            Send Wishes
                            <span className="w-1.5 h-1.5 bg-white rotate-45 group-hover/btn:scale-150 transition-transform" />
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="mt-32 md:mt-48 space-y-6 flex flex-col items-center relative w-full">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[22vw] md:text-[220px] text-theme-100/40 whitespace-nowrap pointer-events-none z-0 select-none">
                        Thank You
                      </div>
                      <p className="text-[9px] md:text-[11px] uppercase tracking-[0.8em] text-theme-600 font-bold relative z-10 bg-[#fdfaf5] px-6 py-2 rounded-full border border-theme-100/50 shadow-sm">With Love</p>
                      <h3 className="font-playball text-[3.2rem] sm:text-6xl md:text-8xl text-theme-900 relative z-10 drop-shadow-sm px-4 pt-4 leading-none">Umayangana & Ashan</h3>

                      <motion.img
                        initial={{ opacity: 0, y: 24, scale: 0.95 }}
                        whileInView={{ opacity: 0.9, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        src={footerFloralImage}
                        alt=""
                        className="relative z-10 mt-12 w-48 h-48 md:w-64 md:h-64 object-contain mix-blend-multiply"
                      />
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Footer */}
              <footer className="py-12 border-t border-theme-200/30 text-center relative z-10">
                <p className="text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold">
                  © 2026 Umayangana & Ashan. <span className="hidden md:inline">|</span><br className="md:hidden block mt-2" /> All rights reserved.
                </p>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src={backgroundMusic} loop />

      {/* Music Control Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-[60] bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-theme-200 text-theme-800 hover:bg-theme-50 transition-colors"
      >
        <div className="flex flex-col items-center">
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
          )}
        </div>
      </motion.button>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #fdfaf5;
        }
        ::-webkit-scrollbar-thumb {
          background: #e3cfac;
          border-radius: 10px;
        }
      `}} />
    </main>
  );
}
