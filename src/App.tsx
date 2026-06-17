import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Calendar, Clock, Send, ChevronDown } from "lucide-react";

const INVITATION = {
  couple: {
    bride: "Himasha",
    groom: "Ganindu",
    brideFull: "Himasha Liyangasthenne",
    groomFull: "Ganindu Amarasinghe",
  },
  date: {
    displayNumeric: "20 . 07 . 2026",
    displayLong: "Monday, 20 July 2026",
    countdownTarget: "July 20, 2026 17:00:00",
  },
  time: {
    ceremony: "05:00 PM",
    reception: "06:00 PM",
  },
  venue: {
    name: "Waters Edge - Eagle Banquet",
    city: "Battaramulla",
    mapQuery: "Waters Edge, Battaramulla",
    googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Waters+Edge+Battaramulla",
  },
  rsvpContacts: [
    "Ganindu: ",
    "Himasha: ",
    "Family: ",
  ],
} as const;

const backgroundMusic = "/Brooklyn Duo - A Thousand Years [WEDDING VERSION].mp3";
const googleScriptUrl = "https://script.google.com/macros/s/AKfycbyHN1BshRvxx96eATyW9C0rtkaNFXAoNAe9lh0TiO1uJ-eKzlwXTKglqTUSz5ZH-CoKqA/exec";

const publicImagePath = (fileName: string) => `/images/${fileName.replaceAll(" ", "%20")}`;

const HERO_BACKGROUND_IMAGE = "/IMG_2149.JPEG";


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

    const colors = ["#F08787", "#F2AE66", "#fb923c", "#FD8A6B", "#ff8c69"];
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
          className="absolute drop-shadow-[0_2px_10px_rgba(195, 14, 89, 0.3)]"
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

function CountdownTimer({ isDark = false }: { isDark?: boolean }) {
  const targetDate = new Date(INVITATION.date.countdownTarget).getTime();
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
          <div className={`relative w-[5.5rem] h-[8rem] sm:w-24 sm:h-36 md:w-32 md:h-44 rounded-t-full shadow-[0_15px_35px_-10px_rgba(0,0,0,0.15)] border flex flex-col items-center justify-center overflow-hidden transition-all duration-700 group-hover:-translate-y-3 ${isDark ? "bg-[#d53f8c] border-white/20" : "bg-white border-theme-100/60"
            }`}>
            <div className={`absolute inset-1.5 sm:inset-2 md:inset-3 border-[0.5px] rounded-t-full pointer-events-none ${isDark ? "border-white/30" : "border-theme-300/50"
              }`} />

            {/* The Number */}
            <span className={`text-4xl sm:text-5xl md:text-5xl font-playball leading-none relative z-10 drop-shadow-sm mt-3 sm:mt-4 md:mt-6 transition-transform duration-500 group-hover:scale-110 ${isDark ? "text-white" : "text-theme-800"
              }`}>
              {Math.max(0, stat.value).toString().padStart(2, '0')}
            </span>

            {/* The Label */}
            <div className="w-full flex justify-center mt-2 sm:mt-3 md:mt-6 mb-1 sm:mb-2 relative z-10">
              <span className={`text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border shadow-sm whitespace-nowrap ${isDark ? "bg-white/10 text-white border-white/20" : "bg-stone-50 text-stone-500 border-theme-100/50"
                }`}>
                {stat.label}
              </span>
            </div>

            {/* Bottom decoration */}
            <div className={`absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-[3px] h-[3px] sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rotate-45 ${isDark ? "bg-white/40" : "bg-theme-300"
              }`} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}


export default function WeddingInvitation() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    guests: "1",
  });
  const [wishForm, setWishForm] = useState({
    name: "",
    message: "",
  });
  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [wishStatus, setWishStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const introVideoRef = React.useRef<HTMLVideoElement>(null);

  const submitToGoogleSheet = async (payload: Record<string, string>) => {
    if (!googleScriptUrl) {
      throw new Error("Google Script URL is not configured");
    }

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      body: new URLSearchParams(payload),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rsvpForm.name.trim()) {
      setRsvpStatus("error");
      return;
    }

    setRsvpStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "rsvp",
        name: rsvpForm.name.trim(),
        guests: rsvpForm.guests,
        dietaryNotes: "",
      });
      setRsvpStatus("success");
      setRsvpForm({ name: "", guests: "1" });
    } catch {
      setRsvpStatus("error");
    }
  };

  const handleWishSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!wishForm.name.trim() || !wishForm.message.trim()) {
      setWishStatus("error");
      return;
    }

    setWishStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "wish",
        name: wishForm.name.trim(),
        message: wishForm.message.trim(),
      });
      setWishStatus("success");
      setWishForm({ name: "", message: "" });
    } catch {
      setWishStatus("error");
    }
  };

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

  const [hasAttemptedAutoplay, setHasAttemptedAutoplay] = useState(false);

  useEffect(() => {
    if (isOpened && !isPlaying && !hasAttemptedAutoplay && audioRef.current) {
      setHasAttemptedAutoplay(true);

      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          const playOnInteraction = () => {
            if (audioRef.current && !isPlaying) {
              audioRef.current
                .play()
                .then(() => {
                  setIsPlaying(true);
                  window.removeEventListener("click", playOnInteraction);
                })
                .catch(() => { });
            }
          };

          window.addEventListener("click", playOnInteraction);
        });
    }
  }, [isOpened, isPlaying, hasAttemptedAutoplay]);

  return (
    <main
      className={`h-[100dvh] w-full bg-gradient-to-br from-[#fff0eb] to-[#ffe4e6] transition-all duration-1000 ${isOpened ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden flex items-center justify-center"
        } relative font-montserrat scroll-smooth`}
    >
      <FloatingPetals />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="video-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          >
            <video
              ref={introVideoRef}
              src="/intro_video.mp4"
              muted={!hasStarted}
              playsInline
              preload="auto"
              className={`w-full h-full object-cover transition-all duration-[2000ms] ease-out ${!hasStarted ? "blur-xl scale-110 opacity-60" : "blur-0 scale-100 opacity-100"
                }`}
              onEnded={() => setIsOpened(true)}
              onError={() => setIsOpened(true)}
            />

            {!hasStarted && (
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center z-[120] bg-black/60 backdrop-blur-[2px] bg-cover bg-center"
                style={{ backgroundImage: 'url("/back.jpeg")' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-12"
                  >
                    <h2 className="font-cinzel text-xl md:text-2xl text-white mb-4 tracking-[0.3em] uppercase drop-shadow-2xl">A Celebration Of Love</h2>
                    <p 
                      className="font-cinzel text-xl md:text-2xl font-bold text-yellow-400 tracking-[0.3em] uppercase drop-shadow-lg"
                      style={{ color: "#facc15", WebkitTextFillColor: "#facc15", WebkitTextStroke: "1px white" }}
                    >
                      {INVITATION.couple.bride} & {INVITATION.couple.groom}
                    </p>
                  </motion.div>

                  <button
                    onClick={() => {
                      setHasStarted(true);
                      if (introVideoRef.current) {
                        introVideoRef.current.muted = false;
                        introVideoRef.current.currentTime = 0;
                        introVideoRef.current.play();
                      }
                    }}
                    className="group relative px-12 py-5 overflow-hidden rounded-full transition-all duration-500 hover:scale-105 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-[#F2AE66] opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative z-10 font-cinzel font-bold text-black text-sm tracking-[0.4em] uppercase">View Invitation</span>
                  </button>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 1.5 }}
                    className="mt-8 text-white/50 text-[10px] uppercase tracking-[0.4em]"
                  >
                    Click to begin
                  </motion.div>
                </motion.div>
              </div>
            )}

            {hasStarted && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-start pt-[35vh] md:pt-48 pl-16 md:pl-0 z-[105] pointer-events-none text-center px-6"
                >
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.8 }}
                    className="font-cinzel font-bold text-base md:text-3xl text-white mb-6 tracking-[0.3em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                  >
                    Together With Love
                  </motion.h2>
                  
                  <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 2, delay: 1.2 }}
                      className="font-cinzel text-2xl md:text-6xl text-white tracking-[0.3em] uppercase font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                    >
                      {INVITATION.couple.bride}
                    </motion.p>
                    
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2, delay: 1.5 }}
                      className="font-playball text-2xl md:text-4xl text-white/80 italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] my-1"
                    >
                      &
                    </motion.span>
                    
                    <motion.p
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 2, delay: 1.8 }}
                      className="font-cinzel text-2xl md:text-4xl text-white/90 tracking-[0.4em] uppercase font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                    >
                      {INVITATION.couple.groom}
                    </motion.p>
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setIsOpened(true)}
                  className="absolute bottom-10 right-10 z-[110] px-8 py-3 bg-white/10 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.4em] rounded-full border border-white/20 hover:bg-white/20 transition-all font-bold"
                >
                  Skip Intro
                </motion.button>
              </>
            )}
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
            <section className="flex w-full relative items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFF5F0] via-white to-[#FFF0EB] min-h-[85vh]">


              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url("${HERO_BACKGROUND_IMAGE}")` }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/50 to-[#FFE4E1]/30" aria-hidden="true" />
              <div className="relative z-10 w-full max-w-5xl px-6 py-12 md:py-24 text-center flex flex-col items-center">
                
                {/* Top subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  className="font-cinzel text-xs md:text-sm tracking-[0.3em] text-[#C30E59] uppercase font-bold"
                >
                  A Celebration Of Love
                </motion.p>
                
                {/* Decorative separator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="mt-3 mb-6 flex items-center justify-center gap-2"
                >
                  <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C30E59]/50 to-transparent"></div>
                </motion.div>

                {/* Names */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="flex flex-col items-center"
                >
                  <h1 className="font-playball text-[5rem] sm:text-[6rem] md:text-[8rem] text-[#FD8A6B] leading-none drop-shadow-sm">
                    {INVITATION.couple.bride}
                  </h1>
                  
                  <div className="flex items-center justify-center gap-4 my-2 md:my-0">
                    <div className="w-8 md:w-16 h-[1px] bg-[#C30E59]/30"></div>
                    <span className="font-playball text-4xl md:text-5xl text-[#C30E59]">&</span>
                    <div className="w-8 md:w-16 h-[1px] bg-[#C30E59]/30"></div>
                  </div>
                  
                  <div className="relative">
                    <h1 className="font-playball text-[5rem] sm:text-[6rem] md:text-[8rem] text-[#FD8A6B] leading-none drop-shadow-sm pr-8">
                      {INVITATION.couple.groom}
                    </h1>
                  </div>
                </motion.div>

                {/* Gap for background image couple */}
                <div className="h-[10vh] md:h-[30vh]"></div>

                {/* Date and Time block */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="flex flex-col items-center text-[#C30E59]"
                >
                  <p className="font-cinzel text-sm md:text-base tracking-[0.3em] uppercase font-bold mb-2">
                    MONDAY
                  </p>
                  
                  <div className="flex items-center gap-4 md:gap-6 mb-4">
                    <div className="flex items-center gap-2">
                       <span className="font-cinzel text-6xl md:text-7xl font-bold">20</span>
                    </div>
                    <div className="w-[1.5px] h-12 md:h-16 bg-[#C30E59]/40"></div>
                    <div className="flex flex-col items-start justify-center">
                      <span className="font-cinzel text-xl md:text-2xl font-bold tracking-[0.2em] leading-tight">JULY</span>
                      <span className="font-cinzel text-xl md:text-2xl font-bold tracking-[0.2em] leading-tight">2026</span>
                    </div>
                  </div>

                  <p className="font-cinzel text-sm md:text-base tracking-[0.2em] font-bold flex items-center gap-2">
                    {INVITATION.time.reception}
                  </p>
                </motion.div>

                {/* Footer text */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mt-4 md:mt-8 flex flex-col items-center"
                >
                  {/* Decorative separator */}
                  <div className="mb-6 flex items-center justify-center gap-2">
                    <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#C30E59]/50 to-transparent"></div>
                  </div>

                  <a
                    href="#details"
                    className="relative group mt-2 px-10 py-4 bg-[#C30E59] text-white text-[11px] md:text-xs font-bold uppercase tracking-[0.3em] rounded-md transition-all hover:bg-black shadow-[0_5px_15px_rgba(195,14,89,0.4)] border border-[#c49b63]"
                  >
                    <div className="absolute inset-1 border border-[#c49b63]/50 rounded pointer-events-none group-hover:border-[#c49b63]/80 transition-colors"></div>
                    <span className="flex items-center gap-3">
                      <span className="text-[#c49b63]">♥</span> BEGIN OUR FOREVER <span className="text-[#c49b63]">♥</span>
                    </span>
                  </a>
                </motion.div>
              </div>

              {/* Subtle Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 1.1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
              >
                <div className="w-px h-14 bg-gradient-to-b from-[#C30E59]/30 to-transparent rounded-full overflow-hidden">
                  <motion.div
                    animate={{ y: [-56, 56] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-1/2 bg-[#FD8A6B]/45"
                  />
                </div>
              </motion.div>
            </section>



            <section id="details" className="relative pt-0 md:pt-16 pb-12 md:pb-32 w-full flex flex-col items-center bg-gradient-to-b from-[#FFF0EB] via-white to-[#FFE4E1]/40 overflow-hidden">
              {/* Watermark Background */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.20] mix-blend-multiply bg-top bg-no-repeat bg-[length:100%_auto] md:bg-center md:bg-cover"
                style={{ backgroundImage: 'url("/IMG_2154.JPEG")' }}
              />

              {/* Ornate Frame Border Overlay */}
              <div className="hidden md:block absolute inset-4 md:inset-8 border-[1.5px] border-[#4a5d23]/30 pointer-events-none z-10" />
              <div className="hidden md:block absolute inset-5 md:inset-10 border-[0.5px] border-[#c1b199]/20 pointer-events-none z-10" />

              <div className="max-w-[1100px] w-full flex flex-col items-center text-center relative z-20 px-0 md:px-6">


                {/* Names Card */}
                <div className="relative w-full flex flex-col items-center justify-center my-8 mb-12 md:mb-24 px-4 md:px-0">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-20 w-full max-w-[700px] bg-white p-8 md:p-16 shadow-[0_30px_70px_-15px_rgba(195,14,89,0.15)] flex flex-col items-center justify-center text-center bg-cover bg-center overflow-hidden rounded-[2rem] md:rounded-[3rem]"
                    style={{ backgroundImage: 'url("/IMG_2154.JPEG")' }}
                  >
                    {/* Background Overlay to reduce image colors */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0EB]/85 to-white/90" />

                    {/* Floral Corners */}
                    <img src="/images/44.png" className="absolute top-0 right-0 w-32 md:w-48 opacity-60 pointer-events-none mix-blend-multiply" alt="" />
                    <img src="/images/f.png" className="absolute bottom-0 left-0 w-32 md:w-48 opacity-60 pointer-events-none mix-blend-multiply" alt="" />

                    {/* Sunset Border */}
                    <div className="absolute inset-3 md:inset-5 border-[1.5px] border-[#FD8A6B]/30 pointer-events-none rounded-[1.5rem] md:rounded-[2.5rem]" />
                    <div className="absolute inset-4 md:inset-6 border-[0.5px] border-[#C30E59]/20 pointer-events-none rounded-[1.5rem] md:rounded-[2.5rem]" />
                    
                    <div className="relative z-10 w-full flex flex-col items-center">
                      
                      {/* Top Heart & Text */}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#C30E59] mb-4 drop-shadow-sm">
                        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" className="opacity-20"/>
                        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="currentColor" strokeWidth="1" fill="none"/>
                      </svg>
                      
                      <div className="flex items-center gap-3 mb-12">
                        <span className="font-cinzel text-[#C30E59] text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase">Two Families</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#C30E59] to-[#FD8A6B]"></div>
                        <span className="font-cinzel text-[#C30E59] text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase">One Heart</span>
                      </div>

                      {/* Groom Section */}
                      <div className="mb-8 w-full flex flex-col items-center">
                        <h3 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif mb-6 leading-tight bg-gradient-to-r from-[#C30E59] to-[#FD8A6B] bg-clip-text text-transparent font-bold">
                          {INVITATION.couple.groomFull}
                        </h3>
                        
                        <div className="flex items-center justify-center gap-3 mb-4 w-full max-w-[200px]">
                          <div className="h-px flex-grow bg-gradient-to-r from-transparent to-[#FD8A6B]/60"></div>
                          <span className="font-cinzel text-[#C30E59]/80 text-[9px] uppercase tracking-[0.4em] font-bold whitespace-nowrap">Son Of</span>
                          <div className="h-px flex-grow bg-gradient-to-l from-transparent to-[#FD8A6B]/60"></div>
                        </div>
                        
                        <p className="font-serif text-[#C30E59]/90 text-sm md:text-base leading-relaxed tracking-wide">
                          Mr. Hemasiri Amarasinghe &<br />Mrs. Gnana Hettiarachchi
                        </p>
                      </div>

                      {/* Ampersand */}
                      <div className="flex items-center justify-center gap-6 my-4 w-full max-w-[200px]">
                        <div className="h-px flex-grow bg-gradient-to-r from-transparent to-[#FD8A6B]/60"></div>
                        <span className="font-playball text-4xl md:text-5xl text-[#FD8A6B] transform -rotate-3">&</span>
                        <div className="h-px flex-grow bg-gradient-to-l from-transparent to-[#FD8A6B]/60"></div>
                      </div>

                      {/* Bride Section */}
                      <div className="mt-8 mb-12 w-full flex flex-col items-center">
                        <h3 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif mb-6 leading-tight bg-gradient-to-r from-[#FD8A6B] to-[#C30E59] bg-clip-text text-transparent font-bold">
                          {INVITATION.couple.brideFull}
                        </h3>
                        
                        <div className="flex items-center justify-center gap-3 mb-4 w-full max-w-[200px]">
                          <div className="h-px flex-grow bg-gradient-to-r from-transparent to-[#FD8A6B]/60"></div>
                          <span className="font-cinzel text-[#C30E59]/80 text-[9px] uppercase tracking-[0.4em] font-bold whitespace-nowrap">Daughter Of</span>
                          <div className="h-px flex-grow bg-gradient-to-l from-transparent to-[#FD8A6B]/60"></div>
                        </div>
                        
                        <p className="font-serif text-[#C30E59]/90 text-sm md:text-base leading-relaxed tracking-wide">
                          Mr. Chaminda Liyangasthenne (Late) &<br />Mrs. Himali Koralage
                        </p>
                      </div>

                      {/* Bottom Celebration Text */}
                      <div className="flex flex-col items-center mt-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#C30E59] mb-4 drop-shadow-sm transform rotate-180">
                          <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" className="opacity-20"/>
                          <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="currentColor" strokeWidth="1" fill="none"/>
                        </svg>
                        
                        <div className="flex items-center justify-center gap-3 mb-3 w-full max-w-[200px]">
                          <div className="h-px flex-grow bg-gradient-to-r from-transparent to-[#FD8A6B]/60"></div>
                          <span className="font-cinzel text-[#C30E59] text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold whitespace-nowrap">Wedding</span>
                          <div className="h-px flex-grow bg-gradient-to-l from-transparent to-[#FD8A6B]/60"></div>
                        </div>
                        
                        <span className="font-cinzel text-[#C30E59] text-xl md:text-3xl uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold mt-2">Celebration</span>
                        
                        <div className="flex items-center justify-center gap-2 mt-6">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FD8A6B]/60"></div>
                          <div className="w-2 h-2 rounded-full bg-[#C30E59]"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FD8A6B]/60"></div>
                        </div>
                      </div>
                      
                    </div>
                  </motion.div>
                </div>

                {/* Save the Date Card */}
                <div className="relative w-full flex flex-col items-center justify-center mb-8 md:mb-12 px-4 md:px-0">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-20 w-full max-w-[400px] bg-gradient-to-b from-[#FFF0EB] via-white to-[#FFE4E1]/80 px-8 py-16 md:px-12 md:py-20 shadow-[0_40px_80px_-20px_rgba(195,14,89,0.2)] flex flex-col items-center rounded-t-full rounded-b-[2.5rem] border border-[#FD8A6B]/20 overflow-hidden"
                  >
                    {/* Double Border Frame */}
                    <div className="absolute inset-3 border border-[#FD8A6B]/30 rounded-t-full rounded-b-3xl pointer-events-none" />
                    <div className="absolute inset-4 border-[0.5px] border-[#C30E59]/20 rounded-t-full rounded-b-3xl pointer-events-none" />
                    
                    {/* Top Decorative Element */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
                      <div className="w-1 h-1 rounded-full bg-[#C30E59]" />
                      <div className="w-0.5 h-6 bg-gradient-to-b from-[#C30E59] to-transparent" />
                    </div>

                    {/* Title */}
                    <div className="mt-12 mb-6 text-center w-full relative z-10">
                       <h2 className="font-playball text-[4.5rem] md:text-[5.5rem] bg-gradient-to-r from-[#C30E59] to-[#FD8A6B] bg-clip-text text-transparent leading-[0.8] mb-2 drop-shadow-sm transform -rotate-2">
                         Save
                       </h2>
                       <div className="font-serif italic text-xl md:text-2xl text-[#C30E59]/80 -mt-2 mb-1">
                         the
                       </div>
                       <h2 className="font-playball text-[4.5rem] md:text-[5.5rem] bg-gradient-to-r from-[#FD8A6B] to-[#C30E59] bg-clip-text text-transparent leading-[0.8] drop-shadow-sm transform -rotate-2 ml-4">
                         Date
                       </h2>
                    </div>

                    {/* Separator */}
                    <div className="flex items-center gap-3 mb-6 w-full max-w-[200px] justify-center opacity-70">
                      <div className="h-px flex-grow bg-gradient-to-r from-transparent to-[#C30E59]"></div>
                      <Sparkles className="w-3 h-3 text-[#C30E59]" />
                      <div className="h-px flex-grow bg-gradient-to-l from-transparent to-[#C30E59]"></div>
                    </div>

                    {/* Names */}
                    <div className="text-center font-cinzel text-sm md:text-base uppercase tracking-[0.2em] font-bold text-[#C30E59] mb-10 leading-relaxed">
                      Himasha <br/>
                      <span className="font-playball text-2xl text-[#FD8A6B] lowercase block my-1">&</span> 
                      Ganindu
                    </div>

                    {/* Calendar block */}
                    <div className="flex flex-col items-center mb-10 w-full max-w-[260px] mx-auto bg-white/50 p-6 rounded-3xl border border-[#C30E59]/10 shadow-[inset_0_2px_10px_rgba(195,14,89,0.03)] backdrop-blur-sm relative">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFF0EB] px-4 py-1 rounded-full border border-[#C30E59]/20 text-[10px] uppercase tracking-widest font-bold text-[#C30E59]">
                        July 2026
                      </div>
                      
                      <div className="grid grid-cols-7 gap-x-2 gap-y-3 w-full text-center font-serif text-xs md:text-sm text-[#4a5568] mt-4">
                        {/* Days Header */}
                        <span className="font-bold text-[#C30E59]/50 text-[10px] uppercase">M</span>
                        <span className="font-bold text-[#C30E59]/50 text-[10px] uppercase">T</span>
                        <span className="font-bold text-[#C30E59]/50 text-[10px] uppercase">W</span>
                        <span className="font-bold text-[#C30E59]/50 text-[10px] uppercase">T</span>
                        <span className="font-bold text-[#C30E59]/50 text-[10px] uppercase">F</span>
                        <span className="font-bold text-[#FD8A6B]/70 text-[10px] uppercase">S</span>
                        <span className="font-bold text-[#FD8A6B]/70 text-[10px] uppercase">S</span>
                        
                        {/* Empty days for July 2026 (Starts on Wednesday) */}
                        <span></span><span></span>
                        
                        {/* Days 1-31 */}
                        {[...Array(31)].map((_, i) => {
                          const day = i + 1;
                          const isWeddingDay = day === 20;
                          return (
                            <div key={day} className="relative flex justify-center items-center h-6 w-6 mx-auto">
                              {isWeddingDay ? (
                                <>
                                  <svg className="absolute w-8 h-8 text-[#C30E59] fill-current drop-shadow-md transform scale-[1.2] -translate-y-[1px]" viewBox="0 0 24 24">
                                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"/>
                                  </svg>
                                  <span className="relative z-10 text-white font-bold text-xs">{day}</span>
                                </>
                              ) : (
                                <span className="opacity-80 text-[#333]">{day}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom Details */}
                    <div className="text-center font-serif text-[11px] md:text-xs text-[#C30E59]/80 leading-relaxed mt-2 px-4">
                      <span className="font-cinzel tracking-widest uppercase text-[10px] font-bold text-[#C30E59] mb-1.5 block">Waters Edge - Eagle Banquet</span>
                      Battaramulla<br/>
                      <span className="italic mt-1 block opacity-80 font-playball text-lg text-[#FD8A6B]">at 6:00 PM</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>



            {/* Timeline Section */}
            <section className="relative py-16 md:py-32 bg-gradient-to-b from-[#FFE4E1]/40 via-[#FFF5F0] to-[#FFE4E1]/60 overflow-hidden">
              {/* Subtle background sparkles */}
              <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay bg-noise" />

              <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="max-w-4xl mx-auto flex flex-col items-center bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2.5rem] md:rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(195,14,89,0.15)] p-6 py-12 md:p-16 lg:p-24 relative overflow-hidden"
                >
                  {/* Elegant Double Border Frame */}
                  <div className="absolute inset-4 border border-[#FD8A6B]/30 rounded-[2rem] md:rounded-[3.5rem] pointer-events-none" />
                  <div className="absolute inset-5 border-[0.5px] border-[#C30E59]/20 rounded-[2rem] md:rounded-[3.5rem] pointer-events-none" />
                  
                  {/* Top floral accent */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-60">
                    <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#C30E59]" />
                    <Sparkles className="w-4 h-4 text-[#C30E59]" />
                    <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#C30E59]" />
                  </div>

                  {/* Header */}
                  <div className="text-center mb-12 md:mb-24 flex flex-col items-center w-full mt-6 relative z-10">
                    <span className="font-cinzel text-[10px] md:text-xs tracking-[0.5em] uppercase text-[#C30E59]/70 mb-4 font-bold">Wedding</span>
                    <h2 className="font-playball text-[4.5rem] md:text-[8rem] bg-gradient-to-r from-[#C30E59] to-[#FD8A6B] bg-clip-text text-transparent leading-[1.2] py-4 mb-2 transform -rotate-2 drop-shadow-sm">Timeline</h2>
                    <div className="font-cinzel text-xs md:text-sm tracking-[0.4em] uppercase text-[#C30E59] font-bold mb-4 opacity-90">Himasha & Ganindu</div>
                    <div className="font-serif text-sm md:text-base text-[#FD8A6B] italic">July 20, 2026</div>
                  </div>

                  {/* Timeline Container */}
                  <div className="relative w-full max-w-2xl mx-auto z-10">
                    {/* Central Vertical Glowing Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#C30E59]/30 to-transparent -translate-x-1/2 shadow-[0_0_15px_rgba(195,14,89,0.3)]"></div>
                    
                    <div className="flex flex-col w-full gap-8 md:gap-14">
                      
                      {/* Event 1: Poruwa */}
                      <div className="relative flex justify-center items-center w-full group">
                         <div className="w-1/2 flex justify-end pr-6 md:pr-12 text-right relative">
                           {/* Connecting Line with Dot */}
                           <div className="absolute right-0 top-1/2 w-6 md:w-12 h-[2px] bg-gradient-to-l from-[#C30E59]/40 to-transparent"></div>
                           <div className="absolute right-0 top-1/2 w-2 h-2 rounded-full bg-[#C30E59] transform translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#C30E59]"></div>
                           
                           {/* Pill */}
                           <div className="flex items-center gap-3 md:gap-5 z-10 bg-white/90 backdrop-blur-md shadow-[0_8px_20px_rgba(195,14,89,0.1)] rounded-full px-3 py-1.5 md:px-6 md:py-3 border border-white hover:scale-105 transition-transform duration-500">
                             <div className="flex flex-col justify-center">
                               <span className="font-serif text-[13px] md:text-lg text-[#C30E59] tracking-wide mb-0.5">Poruwa</span>
                               <span className="font-cinzel text-[9px] md:text-xs tracking-widest font-bold text-[#FD8A6B] uppercase">05:00 PM</span>
                             </div>
                             <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#C30E59] to-[#FD8A6B] flex items-center justify-center shadow-[0_4px_12px_rgba(195,14,89,0.3)] shrink-0 text-white group-hover:rotate-12 transition-transform duration-500">
                               <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                 <path d="M12 2L2 12h3v8h14v-8h3L12 2z"/>
                               </svg>
                             </div>
                           </div>
                         </div>
                         <div className="w-1/2"></div>
                      </div>

                      {/* Event 2: We do */}
                      <div className="relative flex justify-center items-center w-full group">
                         <div className="w-1/2"></div>
                         <div className="w-1/2 flex justify-start pl-6 md:pl-12 text-left relative">
                           <div className="absolute left-0 top-1/2 w-6 md:w-12 h-[2px] bg-gradient-to-r from-[#C30E59]/40 to-transparent"></div>
                           <div className="absolute left-0 top-1/2 w-2 h-2 rounded-full bg-[#C30E59] transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#C30E59]"></div>
                           
                           <div className="flex items-center gap-3 md:gap-5 z-10 bg-white/90 backdrop-blur-md shadow-[0_8px_20px_rgba(195,14,89,0.1)] rounded-full px-3 py-1.5 md:px-6 md:py-3 border border-white hover:scale-105 transition-transform duration-500">
                             <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#FD8A6B] to-[#C30E59] flex items-center justify-center shadow-[0_4px_12px_rgba(195,14,89,0.3)] shrink-0 text-white group-hover:-rotate-12 transition-transform duration-500">
                               <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                 <circle cx="9" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                                 <circle cx="15" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                               </svg>
                             </div>
                             <div className="flex flex-col justify-center">
                               <span className="font-serif text-[13px] md:text-lg text-[#C30E59] tracking-wide mb-0.5">We Do</span>
                               <span className="font-cinzel text-[9px] md:text-xs tracking-widest font-bold text-[#FD8A6B] uppercase">05:30 PM</span>
                             </div>
                           </div>
                         </div>
                      </div>

                      {/* Event 3: We drink */}
                      <div className="relative flex justify-center items-center w-full group">
                         <div className="w-1/2 flex justify-end pr-6 md:pr-12 text-right relative">
                           <div className="absolute right-0 top-1/2 w-6 md:w-12 h-[2px] bg-gradient-to-l from-[#C30E59]/40 to-transparent"></div>
                           <div className="absolute right-0 top-1/2 w-2 h-2 rounded-full bg-[#C30E59] transform translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#C30E59]"></div>
                           
                           <div className="flex items-center gap-3 md:gap-5 z-10 bg-white/90 backdrop-blur-md shadow-[0_8px_20px_rgba(195,14,89,0.1)] rounded-full px-3 py-1.5 md:px-6 md:py-3 border border-white hover:scale-105 transition-transform duration-500">
                             <div className="flex flex-col justify-center">
                               <span className="font-serif text-[13px] md:text-lg text-[#C30E59] tracking-wide mb-0.5">We Drink</span>
                               <span className="font-cinzel text-[9px] md:text-xs tracking-widest font-bold text-[#FD8A6B] uppercase">(Bar Open) 06:00 PM</span>
                             </div>
                             <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#C30E59] to-[#FD8A6B] flex items-center justify-center shadow-[0_4px_12px_rgba(195,14,89,0.3)] shrink-0 text-white group-hover:rotate-12 transition-transform duration-500">
                               <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                 <path d="M8 22h8M12 15v7M8 2v7c0 2 2 4 4 6 2-2 4-4 4-6V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                               </svg>
                             </div>
                           </div>
                         </div>
                         <div className="w-1/2"></div>
                      </div>

                      {/* Event 4: Dinner */}
                      <div className="relative flex justify-center items-center w-full group">
                         <div className="w-1/2"></div>
                         <div className="w-1/2 flex justify-start pl-6 md:pl-12 text-left relative">
                           <div className="absolute left-0 top-1/2 w-6 md:w-12 h-[2px] bg-gradient-to-r from-[#C30E59]/40 to-transparent"></div>
                           <div className="absolute left-0 top-1/2 w-2 h-2 rounded-full bg-[#C30E59] transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#C30E59]"></div>
                           
                           <div className="flex items-center gap-3 md:gap-5 z-10 bg-white/90 backdrop-blur-md shadow-[0_8px_20px_rgba(195,14,89,0.1)] rounded-full px-3 py-1.5 md:px-6 md:py-3 border border-white hover:scale-105 transition-transform duration-500">
                             <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#FD8A6B] to-[#C30E59] flex items-center justify-center shadow-[0_4px_12px_rgba(195,14,89,0.3)] shrink-0 text-white group-hover:-rotate-12 transition-transform duration-500">
                               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                 <path d="M3 2v7c0 1.1.9 2 2 2h4v11"/>
                                 <path d="M21 2v20"/>
                                 <path d="M21 7h-4"/>
                                 <circle cx="12" cy="12" r="4"/>
                               </svg>
                             </div>
                             <div className="flex flex-col justify-center">
                               <span className="font-serif text-[13px] md:text-lg text-[#C30E59] tracking-wide mb-0.5">Dinner</span>
                               <span className="font-cinzel text-[9px] md:text-xs tracking-widest font-bold text-[#FD8A6B] uppercase">(Buffet Open) 07:30 PM</span>
                             </div>
                           </div>
                         </div>
                      </div>

                      {/* Event 5: Cake cutting */}
                      <div className="relative flex justify-center items-center w-full group">
                         <div className="w-1/2 flex justify-end pr-6 md:pr-12 text-right relative">
                           <div className="absolute right-0 top-1/2 w-6 md:w-12 h-[2px] bg-gradient-to-l from-[#C30E59]/40 to-transparent"></div>
                           <div className="absolute right-0 top-1/2 w-2 h-2 rounded-full bg-[#C30E59] transform translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#C30E59]"></div>
                           
                           <div className="flex items-center gap-3 md:gap-5 z-10 bg-white/90 backdrop-blur-md shadow-[0_8px_20px_rgba(195,14,89,0.1)] rounded-full px-3 py-1.5 md:px-6 md:py-3 border border-white hover:scale-105 transition-transform duration-500">
                             <div className="flex flex-col justify-center">
                               <span className="font-serif text-[13px] md:text-lg text-[#C30E59] tracking-wide mb-0.5">Cake Cutting</span>
                               <span className="font-cinzel text-[9px] md:text-xs tracking-widest font-bold text-[#FD8A6B] uppercase">08:30 PM</span>
                             </div>
                             <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#C30E59] to-[#FD8A6B] flex items-center justify-center shadow-[0_4px_12px_rgba(195,14,89,0.3)] shrink-0 text-white group-hover:rotate-12 transition-transform duration-500">
                               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                 <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/>
                                 <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2 1 2 1"/>
                                 <path d="M2 21h20"/>
                                 <path d="M7 8v2"/>
                                 <path d="M12 8v2"/>
                                 <path d="M17 8v2"/>
                                 <path d="M7 4h.01"/>
                                 <path d="M12 4h.01"/>
                                 <path d="M17 4h.01"/>
                               </svg>
                             </div>
                           </div>
                         </div>
                         <div className="w-1/2"></div>
                      </div>

                      {/* Event 6: We dance */}
                      <div className="relative flex justify-center items-center w-full group">
                         <div className="w-1/2"></div>
                         <div className="w-1/2 flex justify-start pl-6 md:pl-12 text-left relative">
                           <div className="absolute left-0 top-1/2 w-6 md:w-12 h-[2px] bg-gradient-to-r from-[#C30E59]/40 to-transparent"></div>
                           <div className="absolute left-0 top-1/2 w-2 h-2 rounded-full bg-[#C30E59] transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#C30E59]"></div>
                           
                           <div className="flex items-center gap-3 md:gap-5 z-10 bg-white/90 backdrop-blur-md shadow-[0_8px_20px_rgba(195,14,89,0.1)] rounded-full px-3 py-1.5 md:px-6 md:py-3 border border-white hover:scale-105 transition-transform duration-500">
                             <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#FD8A6B] to-[#C30E59] flex items-center justify-center shadow-[0_4px_12px_rgba(195,14,89,0.3)] shrink-0 text-white group-hover:-rotate-12 transition-transform duration-500">
                               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                 <path d="M9 18V5l12-2v13"/>
                                 <path d="M9 9l12-2"/>
                                 <circle cx="6" cy="18" r="3"/>
                                 <circle cx="18" cy="16" r="3"/>
                               </svg>
                             </div>
                             <div className="flex flex-col justify-center">
                               <span className="font-serif text-[13px] md:text-lg text-[#C30E59] tracking-wide mb-0.5">We Dance</span>
                               <span className="font-cinzel text-[9px] md:text-xs tracking-widest font-bold text-[#FD8A6B] uppercase">09:00 PM</span>
                             </div>
                           </div>
                         </div>
                      </div>

                      {/* Event 7: Newly weds depart */}
                      <div className="relative flex justify-center items-center w-full group">
                         <div className="w-1/2 flex justify-end pr-6 md:pr-12 text-right relative">
                           <div className="absolute right-0 top-1/2 w-6 md:w-12 h-[2px] bg-gradient-to-l from-[#C30E59]/40 to-transparent"></div>
                           <div className="absolute right-0 top-1/2 w-2 h-2 rounded-full bg-[#C30E59] transform translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#C30E59]"></div>
                           
                           <div className="flex items-center gap-3 md:gap-5 z-10 bg-white/90 backdrop-blur-md shadow-[0_8px_20px_rgba(195,14,89,0.1)] rounded-full px-3 py-1.5 md:px-6 md:py-3 border border-white hover:scale-105 transition-transform duration-500">
                             <div className="flex flex-col justify-center">
                               <span className="font-serif text-[13px] md:text-lg text-[#C30E59] tracking-wide mb-0.5">Newlyweds Depart</span>
                               <span className="font-cinzel text-[9px] md:text-xs tracking-widest font-bold text-[#FD8A6B] uppercase">11:30 PM</span>
                             </div>
                             <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#C30E59] to-[#FD8A6B] flex items-center justify-center shadow-[0_4px_12px_rgba(195,14,89,0.3)] shrink-0 text-white group-hover:rotate-12 transition-transform duration-500">
                               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                 <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
                                 <circle cx="7" cy="17" r="2"/>
                                 <path d="M9 17h6"/>
                                 <circle cx="17" cy="17" r="2"/>
                               </svg>
                             </div>
                           </div>
                         </div>
                         <div className="w-1/2"></div>
                      </div>
                      
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Countdown Section */}
            <section className="relative py-16 md:py-32 bg-[#C30E59] flex flex-col items-center overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Decorative Shapes */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                className="absolute -top-24 -right-24 w-96 h-96 bg-white blur-[100px] rounded-full pointer-events-none"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                className="absolute -bottom-24 -left-24 w-96 h-96 bg-white blur-[100px] rounded-full pointer-events-none"
              />

              <div className="w-full max-w-[1200px] px-6 flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="relative mb-12 md:mb-20"
                >
                  {/* Backdrop Title */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[18vw] md:text-[220px] text-white/5 whitespace-nowrap pointer-events-none select-none tracking-wider">
                    Eternity
                  </div>

                  {/* Main Title Container */}
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "80px" }}
                      viewport={{ once: true }}
                      className="h-px bg-white/40 mb-8"
                    />

                    <h2 className="font-cinzel text-3xl md:text-6xl text-white tracking-[0.25em] md:tracking-[0.4em] font-bold uppercase leading-tight">
                      SAVE <span className="mx-2 md:mx-4 text-[#F2AE66]">THE</span> DATE
                    </h2>

                    <div className="mt-10 flex items-center justify-center gap-6">
                      <div className="h-[0.5px] w-8 md:w-16 bg-[#F2AE66]/50" />
                      <span className="font-playball text-3xl md:text-5xl text-[#F2AE66] drop-shadow-md">{INVITATION.date.displayNumeric}</span>
                      <div className="h-[0.5px] w-8 md:w-16 bg-[#F2AE66]/50" />
                    </div>
                  </div>
                </motion.div>

                {/* Countdown Component with Dark Theme */}
                <CountdownTimer isDark={true} />

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.8 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="mt-12 md:mt-20 flex flex-col items-center gap-4"
                >
                  <p className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] text-white font-bold text-center">
                    Wait for the magic
                  </p>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                        className="w-1 h-1 bg-[#F2AE66] rotate-45"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>


            {/* Venue Location Section */}
            <section className="relative py-16 md:py-32 bg-gradient-to-b from-[#FFE4E1]/60 via-white to-[#FFF0EB] overflow-hidden">
              {/* Floral Decorations */}
              <img src="/images/44.png" className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 z-20 pointer-events-none opacity-80" alt="" />
              <img src="/images/f.png" className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 z-20 pointer-events-none opacity-80" alt="" />

              {/* Decorative Geometric Elements (CSS-Based UI Decorations) */}
              <div className="absolute -top-24 -left-24 w-[500px] h-[500px] border border-[#FD8A6B]/10 rounded-full flex items-center justify-center opacity-30 pointer-events-none">
                <div className="w-[80%] h-[80%] border border-[#C30E59]/10 rounded-full" />
                <div className="w-[60%] h-[60%] border border-[#FD8A6B]/10 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#FD8A6B]/20 to-transparent rotate-45" />
              </div>

              <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-10 mb-12 md:mb-24"
                >
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-[#C30E59] font-bold uppercase tracking-[0.8em] text-[10px] md:text-xs opacity-40">T H E · V E N U E</span>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className={`w-1.5 h-1.5 rotate-45 ${i === 2 ? "bg-[#FD8A6B]" : "bg-[#C30E59]/20"}`} />
                      ))}
                    </div>
                  </div>

                  <h2 className="font-cinzel text-5xl md:text-9xl bg-gradient-to-br from-[#FD8A6B] to-[#c2410c] bg-clip-text text-transparent leading-tight font-light uppercase tracking-tight relative">
                    {INVITATION.venue.name.split(" - ")[0].toUpperCase()} <span className="block md:inline font-playball normal-case text-4xl md:text-8xl bg-gradient-to-r from-[#C30E59] to-[#FD8A6B] bg-clip-text text-transparent md:-ml-8 relative z-10 translate-y-4 md:translate-y-0 italic drop-shadow-sm"> - {INVITATION.venue.name.split(" - ")[1]}</span>
                  </h2>

                  <div className="max-w-xl mx-auto pt-10 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-[#F08787]" />
                    <p className="text-[#C30E59]/80 text-sm md:text-base tracking-[0.2em] font-medium uppercase font-cinzel leading-loose pt-8">
                      WHERE TRADITION MEETS THE BEAUTY OF NEW BEGINNINGS
                    </p>
                  </div>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-10 lg:gap-24 items-center">
                  {/* Left: Atmospheric Location Card */}
                  <div className="lg:col-span-5 text-left order-2 lg:order-1 flex justify-center lg:justify-start">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2 }}
                      className="relative w-full max-w-[400px] aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(135,147,122,0.3)] bg-white p-2 md:p-3"
                    >
                      <img 
                        src="https://www.watersedge.lk/wp-content/uploads/2026/03/waters-edge-new-igh-1536x969.jpg"
                        alt="Waters Edge"
                        className="w-full h-full object-cover rounded-[1.5rem]"
                      />
                    </motion.div>
                  </div>

                  {/* Right: Architectural Map Frame */}
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "circOut" }}
                      className="relative w-full aspect-[4/3] md:aspect-video lg:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-[0_80px_150px_-30px_rgba(0,0,0,0.25)] group bg-white"
                    >
                      {/* The Map */}
                      <iframe
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(INVITATION.venue.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full grayscale-[0.85] contrast-150 sepia-[0.2] brightness-[1.05] hover:grayscale-0 hover:sepia-0 hover:contrast-100 transition-all duration-1000 scale-[1.02] group-hover:scale-100"
                      />

                      {/* Decorative Frame Overlays */}
                      <div className="absolute inset-0 pointer-events-none border-[15px] md:border-[25px] border-white/95 rounded-[3rem]" />
                      <div className="absolute inset-8 md:inset-12 pointer-events-none border border-white/20 rounded-[2.5rem]" />

                      {/* Arched Corner Floating Element (No image used) */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center rounded-bl-full shadow-2xl p-8 transform translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-700">
                        <MapPin className="w-8 h-8 text-[#C30E59] mb-2 opacity-80" />
                        <span className="text-[8px] font-bold uppercase tracking-widest text-[#C30E59]/50">Explore</span>
                      </div>

                      {/* Subtle lens flare overlay */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#FD8A6B]/5 to-transparent mix-blend-overlay" />
                    </motion.div>

                    {/* Bottom Floating Card Decoration */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                      className="inline-flex items-center gap-4 mt-8 px-8 py-3 bg-white border border-[#F08787]/40 shadow-lg rounded-full"
                    >
                      <Sparkles className="w-4 h-4 text-[#FD8A6B]" />
                      <span className="text-[10px] md:text-xs font-bold text-[#C30E59] uppercase tracking-widest">{INVITATION.venue.city}</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {/* RSVP Section (No Images) */}
            <section className="relative py-16 md:py-32 bg-gradient-to-b from-[#FFF0EB] via-[#FFF5F0] to-[#FFE4E1]/50 flex flex-col items-center overflow-hidden">
              <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center relative z-10 w-full">
                {/* Heading exactly like image */}
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-cinzel text-2xl md:text-4xl text-slate-800 tracking-[0.3em] mb-8 md:mb-12 uppercase text-center"
                >
                  RSVP
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="relative w-full max-w-[650px] bg-white p-6 md:p-10 shadow-[0_40px_100px_-25px_rgba(0,0,0,0.12)] border border-slate-100 flex flex-col items-center"
                >
                  {/* Inner rounded border frame exactly like the image mockup */}
                  <div className="w-full border border-slate-300 rounded-[1.5rem] p-6 md:p-8 flex flex-col items-center">
                    <h3 className="font-playball text-2xl md:text-4xl text-slate-800 mb-8 text-center">RSVP Confirmation</h3>

                    <form className="w-full space-y-6 text-left" onSubmit={handleRsvpSubmit}>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 ml-1">Your Name</label>
                        <input
                          type="text"
                          placeholder="Type your name here..."
                          value={rsvpForm.name}
                          onChange={(e) => {
                            setRsvpStatus("idle");
                            setRsvpForm((prev) => ({ ...prev, name: e.target.value }));
                          }}
                          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all font-cinzel text-base"
                          required
                        />
                      </div>

                      <div className="space-y-4 pt-2">
                        <label className="text-xs font-bold text-slate-500 ml-1">Will you join us on our big day?</label>

                        <button
                          type="button"
                          onClick={() => {
                            setRsvpStatus("idle");
                            setRsvpForm((prev) => ({ ...prev, guests: "1" }));
                          }}
                          aria-pressed={rsvpForm.guests !== "0"}
                          className="w-full bg-[#f3f3f3] hover:bg-slate-200 text-slate-700 py-5 md:py-6 rounded-xl font-cinzel text-[11px] md:text-sm tracking-wide transition-all shadow-sm flex items-center justify-center px-4 leading-relaxed active:scale-[0.98]"
                        >
                          Yes, I'll be there!
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setRsvpStatus("idle");
                            setRsvpForm((prev) => ({ ...prev, guests: "0" }));
                          }}
                          aria-pressed={rsvpForm.guests === "0"}
                          className="w-full bg-[#f3f3f3] hover:bg-slate-200 text-slate-700 py-5 md:py-6 rounded-xl font-cinzel text-[11px] md:text-sm tracking-wide transition-all shadow-sm flex items-center justify-center px-4 leading-relaxed active:scale-[0.98]"
                        >
                          Sadly I can't attend, but you're in my heart
                        </button>
                      </div>

                      {(rsvpStatus === "success" || rsvpStatus === "error") && (
                        <p className={`text-[10px] text-center font-semibold ${rsvpStatus === "success" ? "text-emerald-600" : "text-red-500"}`}>
                          {rsvpStatus === "success" ? "RSVP sent successfully." : "Please enter your name and try again."}
                        </p>
                      )}

                      <div className="pt-6">
                        <button
                          type="submit"
                          disabled={rsvpStatus === "sending"}
                          className="w-full bg-[#C30E59] text-white py-4 md:py-5 rounded-xl font-cinzel text-xs md:text-sm tracking-[0.2em] font-bold hover:bg-[#1a5c4a] transition-all shadow-md uppercase disabled:opacity-70"
                        >
                          {rsvpStatus === "sending" ? "SENDING..." : "CLICK HERE TO CONFIRM"}
                        </button>
                        <p className="text-[10px] text-slate-400 mt-4 text-center leading-relaxed">No shared details will be public. Your response is private.</p>
                      </div>
                    </form>
                  </div>
                </motion.div>

                {/* Info info mirroring the clean aesthetic */}
                <div className="mt-16 md:mt-32 flex flex-col items-center gap-6 text-center w-full max-w-xl">
                  <div className="h-px w-24 bg-slate-300" />
                  <p className="text-slate-500 text-[10px] tracking-[0.4em] font-bold uppercase mt-2">RSVP Contacts</p>
                  <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-slate-500 text-[10px] md:text-sm tracking-widest font-normal opacity-80 decoration-slate-300 underline-offset-4">
                    {INVITATION.rsvpContacts.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Wishing Section */}
            <section className="relative py-16 md:py-32 bg-gradient-to-b from-[#FFE4E1]/50 via-white to-[#FFF5F0] overflow-hidden">
              {/* Floral Decorations */}
              <img src="/images/44.png" className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 z-20 pointer-events-none opacity-80" alt="" />
              <img src="/images/f.png" className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 z-20 pointer-events-none opacity-80" alt="" />

              {/* Large Background Text Ornament */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[15vw] text-[#FD8A6B]/5 whitespace-nowrap pointer-events-none select-none italic">
                Sweet Messages
              </div>

              <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6 mb-10 md:mb-20"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-[#C30E59] font-bold uppercase tracking-[0.6em] text-[10px] md:text-xs opacity-50">GUESTBOOK</span>
                    <div className="h-px w-16 bg-[#FD8A6B]/30" />
                  </div>

                  <h2 className="font-playball text-5xl md:text-8xl bg-gradient-to-r from-[#FD8A6B] via-[#C30E59] to-[#FD8A6B] bg-clip-text text-transparent leading-none drop-shadow-sm italic">
                    Best Wishes
                  </h2>

                  <p className="text-[#C30E59]/70 text-xs md:text-sm tracking-[0.3em] font-medium uppercase font-cinzel max-w-xl mx-auto pt-4 leading-loose">
                    Your love and presence are the greatest gifts. If you wish to leave a note, we'd be honored.
                  </p>
                </motion.div>

                {/* Refined Stationery Form */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="max-w-3xl mx-auto"
                >
                  <div className="bg-white p-10 md:p-20 shadow-[0_40px_100px_-20px_rgba(135,147,122,0.15)] border border-[#F08787]/40 relative overflow-hidden">
                    {/* Inner elegant border */}
                    <div className="absolute inset-4 border border-[#F08787]/20 pointer-events-none" />
                    <div className="absolute inset-6 border-[0.5px] border-[#FD8A6B]/10 pointer-events-none" />

                    {/* Corner Ornaments */}
                    <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-[#FD8A6B]/40 rounded-tl-xl" />
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-[#FD8A6B]/40 rounded-br-xl" />

                    <form className="space-y-10 md:space-y-16 text-left relative z-10" onSubmit={handleWishSubmit}>
                      <div className="space-y-6 group">
                        <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C30E59]/40 group-focus-within:text-[#FD8A6B] transition-colors">
                          From
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="YOUR NAME"
                            value={wishForm.name}
                            onChange={(e) => {
                              setWishStatus("idle");
                              setWishForm((prev) => ({ ...prev, name: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b border-[#F08787]/60 px-0 py-4 text-[#C30E59] placeholder:text-[#F08787]/30 focus:outline-none focus:border-[#C30E59] transition-all font-cinzel text-xl tracking-widest uppercase"
                            required
                          />
                          <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C30E59] transition-all duration-500 group-focus-within:w-full" />
                        </div>
                      </div>

                      <div className="space-y-6 group">
                        <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C30E59]/40 group-focus-within:text-[#FD8A6B] transition-colors">
                          Your Message
                        </label>
                        <div className="relative">
                          <textarea
                            rows={4}
                            placeholder="WISHES FOR THE NEWLYWEDS..."
                            value={wishForm.message}
                            onChange={(e) => {
                              setWishStatus("idle");
                              setWishForm((prev) => ({ ...prev, message: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b border-[#F08787]/60 px-0 py-4 text-[#C30E59] placeholder:text-[#F08787]/30 focus:outline-none focus:border-[#C30E59] transition-all font-cinzel text-lg tracking-widest resize-none leading-relaxed"
                            required
                          />
                          <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C30E59] transition-all duration-500 group-focus-within:w-full" />
                        </div>
                      </div>

                      {/* Success/Error States */}
                      <AnimatePresence>
                        {(wishStatus === "success" || wishStatus === "error") && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`text-[10px] text-center font-bold tracking-widest uppercase ${wishStatus === "success" ? "text-emerald-600" : "text-red-500"}`}
                          >
                            {wishStatus === "success" ? "Message sent with love" : "Please complete the form"}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <div className="pt-8 flex justify-center">
                        <button
                          type="submit"
                          disabled={wishStatus === "sending"}
                          className="group relative px-16 py-6 bg-[#C30E59] text-white font-bold uppercase tracking-[0.5em] text-[10px] hover:bg-slate-900 transition-all duration-500 shadow-xl disabled:opacity-70 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                          <span className="relative z-10 flex items-center gap-3">
                            <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            {wishStatus === "sending" ? "Sending..." : "Send Wishes"}
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Closing Section (No Images) */}
            <section className="w-full relative overflow-hidden bg-gradient-to-b from-[#FFF5F0] to-[#FFE4E1] py-12 md:py-24">
              <div className="container mx-auto px-6 max-w-5xl text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-center gap-3 opacity-70">
                    <div className="h-px w-10 bg-[#C30E59]/20" />
                    <Sparkles className="w-4 h-4 text-[#FD8A6B]" />
                    <div className="h-px w-10 bg-[#C30E59]/20" />
                  </div>

                  <h2 className="font-playball text-5xl md:text-7xl bg-gradient-to-r from-[#FD8A6B] via-[#C30E59] to-[#FD8A6B] bg-clip-text text-transparent italic">Thank You</h2>
                  <p className="text-[#C30E59]/70 text-xs md:text-sm tracking-[0.25em] font-medium uppercase font-cinzel leading-loose max-w-3xl mx-auto">
                    We look forward to celebrating with you.
                  </p>

                  <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#C30E59]/50 font-bold">
                    © 2026 {INVITATION.couple.bride} & {INVITATION.couple.groom}
                  </p>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src={backgroundMusic} loop />

      {/* Music Control Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-[60] bg-white text-[#87937a] p-3 rounded-full shadow-lg border border-[#ccbaa2]/40 hover:bg-[#87937a]/10 transition-colors"
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
          background: #ccbaa233;
        }
        ::-webkit-scrollbar-thumb {
          background: #87937a66;
          border-radius: 10px;
        }
      `}} />
    </main >
  );
}
