import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Calendar, Clock, Send, ChevronDown } from "lucide-react";

/**
 * Premium Sri Lankan Wedding Invitation Theme
 * Names: Naween & Nadeesha
 * Background: Cream/Sand
 * Accents: Green/Brown
 */

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
            key="video-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <video
              src="/intro_video.mp4"
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              onEnded={() => setIsOpened(true)}
              onError={() => setIsOpened(true)}
            />
            {/* Fallback button in case video doesn't play or user wants to skip */}
            <button
              onClick={() => setIsOpened(true)}
              className="absolute bottom-10 right-10 z-[110] px-6 py-2 bg-white/20 backdrop-blur-md text-white text-xs uppercase tracking-widest rounded-full border border-white/30 hover:bg-white/40 transition-all font-bold"
            >
              Skip Video
            </button>
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

            {/* Hero Section - Replaced with User Provided Image */}
            <section className="w-full relative flex flex-col bg-white overflow-hidden">
              <picture className="w-full flex items-start">
                <source media="(max-width: 768px)" srcSet="/Gemini_Generated_Image_sszfcfsszfcfsszf (1).png" />
                <img
                  src="/Gemini_Generated_Image_sszfcfsszfcfsszf (1).png"
                  alt="Wedding Invitation Hero"
                  className="w-full h-auto object-cover object-top md:object-contain md:object-top"
                />
              </picture>

              {/* Subtle Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
              >
                <div className="w-px h-12 bg-gradient-to-b from-[#87937a]/40 to-transparent rounded-full overflow-hidden">
                  <motion.div
                    animate={{ y: [-48, 48] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-1/2 bg-[#c5a059]/60"
                  />
                </div>
              </motion.div>
            </section>

            {/* Wedding Details Section */}
            {/* Wedding Details Section - Inspiration Redesign */}
            <section className="relative pt-12 md:pt-20 pb-24 md:pb-32 w-full flex flex-col items-center bg-[#ccbaa2]/10 overflow-hidden">
              {/* Subtle Paper Texture Background */}
              <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              {/* Ornate Frame Border Overlay */}
              <div className="absolute inset-4 md:inset-8 border-[1.5px] border-[#87937a]/30 pointer-events-none z-10" />
              <div className="absolute inset-5 md:inset-10 border-[0.5px] border-[#c1b199]/20 pointer-events-none z-10" />

              <div className="max-w-[1100px] w-full flex flex-col items-center text-center relative z-20 px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-16"
                >
                  <p className="text-[#87937a] text-[10px] md:text-[12px] tracking-[0.3em] md:tracking-[0.5em] uppercase font-bold text-center leading-loose max-w-2xl">
                    <span className="mb-4 block opacity-70">Mr. Monteague Sarachchandra & Mrs. Sarojini Nanayakkara<br />Together with<br />Mr. Prasanna Indrajith Hettiarachchi & Mrs. Manel Herath</span>
                    Request the honour of the presence of Mr. & Mrs./Miss/Family<br className="hidden md:block" /> to celebrate the marriage of their children
                  </p>
                </motion.div>

                {/* Overlapping Paper Cards Effect */}
                <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0 my-12 mb-24">
                  {/* Photo Card (Underneath) */}
                  <motion.div
                    initial={{ opacity: 0, x: -40, rotate: -3 }}
                    whileInView={{ opacity: 1, x: 0, rotate: -3 }}
                    viewport={{ once: true }}
                    className="relative z-10 w-[280px] h-[340px] md:w-[350px] md:h-[450px] bg-white p-4 shadow-[0_20px_50px_rgba(135,147,122,0.15)] border border-[#ccbaa2]/40 rotate-[-3deg] md:-mr-16"
                  >
                    <div className="w-full h-full overflow-hidden border border-[#ccbaa2]/20">
                      <img
                        src={brideGroomImage}
                        alt="Wedding"
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                      />
                    </div>
                  </motion.div>

                  {/* Names Card (Overlapping) */}
                  <motion.div
                    initial={{ opacity: 0, x: 40, y: 40 }}
                    whileInView={{ opacity: 1, x: 0, y: 20 }}
                    viewport={{ once: true }}
                    className="relative z-20 w-full max-w-[450px] bg-white p-8 md:p-14 shadow-[0_30px_70px_-15px_rgba(135,147,122,0.2)] border border-[#ccbaa2]/50 flex flex-col items-center justify-center text-center"
                  >
                    <div className="absolute inset-2 border-[0.5px] border-[#c5a059]/30 pointer-events-none" />

                    <div className="space-y-2 mb-8">
                      <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-[#87937a]/60">Loving daughter of</p>
                      <p className="text-[11px] font-cinzel text-[#87937a] tracking-wider">Mr. Monteague Sarachchandra<br />& Mrs. Sarojini Nanayakkara</p>
                      <h3 className="text-4xl md:text-6xl font-playball text-[#c5a059] pt-4 leading-none">Umayangana</h3>
                    </div>

                    <div className="py-6 flex items-center justify-center w-full">
                      <div className="h-px w-full bg-[#ccbaa2]/30" />
                      <span className="px-6 font-playball text-4xl text-[#c5a059] italic">&</span>
                      <div className="h-px w-full bg-[#ccbaa2]/30" />
                    </div>

                    <div className="space-y-2 mt-8">
                      <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-[#87937a]/60">Loving son of</p>
                      <p className="text-[11px] font-cinzel text-[#87937a] tracking-wider">Mr. Prasanna Indrajith Hettiarachchi<br />& Mrs. Manel Herath</p>
                      <h3 className="text-4xl md:text-6xl font-playball text-[#c5a059] pt-4 leading-none">Ashan</h3>
                    </div>
                  </motion.div>
                </div>

              </div>
            </section>

            {/* Event Details Image - Full Width */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="w-full overflow-hidden leading-[0]"
            >
              <img
                src="/Gemini_Generated_Image_4uj0w24uj0w24uj0.png"
                alt="Wedding Day Details"
                className="w-full h-auto block"
              />
            </motion.div>

            {/* Countdown Section - Inspiration Redesign */}
            <section className="relative py-24 md:py-36 bg-[#87937a]/5 flex flex-col items-center overflow-hidden">
              {/* Background Texture and Accent Orbs */}
              <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ccbaa2] blur-[120px] rounded-full opacity-20" />

              <div className="w-full max-w-[1000px] px-6 flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative mb-16"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[15vw] md:text-[180px] text-[#87937a]/5 whitespace-nowrap pointer-events-none select-none">
                    Eternity
                  </div>
                  <h2 className="font-cinzel text-3xl md:text-5xl text-[#c5a059] tracking-[0.2em] md:tracking-[0.3em] font-bold relative z-10 uppercase">
                    SAVE <span className="mx-4 text-[#87937a]">THE</span> DATE
                  </h2>
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <div className="h-[0.5px] w-12 bg-[#ccbaa2]" />
                    <span className="font-playball text-4xl text-[#87937a]">Wait for the magic</span>
                    <div className="h-[0.5px] w-12 bg-[#ccbaa2]" />
                  </div>
                </motion.div>

                <CountdownTimer />

                <p className="mt-16 text-[9px] uppercase tracking-[0.6em] text-[#87937a] font-bold opacity-60">
                  Counting down to our special day
                </p>
              </div>
            </section>

            {/* Venue Location Section - Inspiration Redesign */}
            <section className="relative py-24 md:py-36 bg-white overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-[1px] bg-[#87937a]" />
                        <span className="text-[#87937a] font-bold uppercase tracking-[0.4em] text-[10px]">T H E · V E N U E</span>
                      </div>
                      <h2 className="font-cinzel text-[2.5rem] md:text-[4rem] text-[#c5a059] leading-tight tracking-widest font-bold uppercase">
                        GRAND BALLROOM
                      </h2>
                      <p className="font-playball text-3xl md:text-5xl text-[#87937a] italic mt-2">Galleface Hotel</p>
                    </div>

                    <div className="space-y-8 pl-6 border-l border-[#ccbaa2]/40">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 text-[#87937a] mt-1 shrink-0" />
                        <p className="text-lg md:text-xl text-[#87937a] font-cinzel leading-relaxed tracking-wide">
                          Galleface Hotel, Colombo, Sri Lanka.
                        </p>
                      </div>
                      <p className="text-[#87937a]/70 text-sm md:text-base tracking-widest uppercase font-light leading-loose">
                        We look forward to welcoming you to this beautiful sanctuary to celebrate our special day amidst nature's elegance.
                      </p>
                    </div>

                    <button
                      onClick={() => window.open('https://maps.app.goo.gl/bJYHccKbNMgZMVar6', '_blank')}
                      className="group relative inline-flex items-center gap-4 px-10 py-5 bg-[#87937a] text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-[#7a866d]"
                    >
                      <MapPin className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                      Get Directions
                    </button>
                  </motion.div>

                  {/* Arched Map Card - Styled like a physical card */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative w-full aspect-[3/4] max-w-[450px] mx-auto bg-white p-3 shadow-[0_40px_80px_-20px_rgba(135,147,122,0.2)] border border-[#ccbaa2]/50"
                  >
                    <div className="absolute inset-2 border-[0.5px] border-[#c5a059]/30 pointer-events-none z-20" />
                    <div className="w-full h-full overflow-hidden bg-white relative">
                      <iframe
                        src="https://maps.google.com/maps?q=Grand%20Ballroom,%20Galle%20Face%20Hotel,%20Colombo,%20Sri%20Lanka&t=&z=16&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale-[0.8] contrast-110 sepia-[0.3] opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-1000"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* RSVP Section - Image-Inspired UI Redesign */}
            <section className="relative py-32 md:py-48 bg-[#f8f6f2] flex flex-col items-center overflow-hidden">
              {/* Subtle Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center relative z-10 w-full">
                {/* Heading exactly like image */}
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-cinzel text-2xl md:text-4xl text-slate-800 tracking-[0.3em] mb-12 uppercase text-center"
                >
                  FOR OUR BIG DAY
                </motion.h2>

                {/* Calla Lily Top Decoration (matches image) */}
                <div className="relative w-full max-w-[500px] md:max-w-[650px] h-56 md:h-80 z-20 -mb-28 md:-mb-44 opacity-100 flex justify-center pointer-events-none scale-110 md:scale-100">
                  <img
                    src="/images/12.png"
                    alt="Calla Lilies"
                    className="w-full h-full object-contain object-bottom"
                  />
                </div>

                {/* Envelope Container Wrapper */}
                <div className="relative w-full max-w-[550px] aspect-[4/5] flex items-center justify-center pt-24">

                  {/* Envelope Base Image */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src="/images/11.png"
                      alt="Envelope"
                      className="w-full h-full object-contain object-bottom drop-shadow-[0_40px_80px_rgba(0,0,0,0.3)]"
                    />
                  </div>

                  {/* RSVP Sheet Card (Coming out of envelope) */}
                  <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="relative z-10 w-[94%] md:w-[88%] bg-white p-4 md:p-8 shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col items-center"
                  >
                    {/* Inner rounded border frame exactly like the image mockup */}
                    <div className="w-full border border-slate-300 rounded-[1.5rem] p-6 md:p-8 flex flex-col items-center">
                      <h3 className="font-playball text-2xl md:text-4xl text-slate-800 mb-8 text-center">RSVP Confirmation</h3>

                      <form className="w-full space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 ml-1">Your Name</label>
                          <input
                            type="text"
                            placeholder="Type your name here..."
                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all font-cinzel text-base"
                          />
                        </div>

                        <div className="space-y-4 pt-2">
                          <label className="text-xs font-bold text-slate-500 ml-1">Will you join us on our big day?</label>

                          <button
                            type="button"
                            className="w-full bg-[#f3f3f3] hover:bg-slate-200 text-slate-700 py-5 md:py-6 rounded-xl font-cinzel text-[11px] md:text-sm tracking-wide transition-all shadow-sm flex items-center justify-center px-4 leading-relaxed active:scale-[0.98]"
                          >
                            Yes, I'll be there!
                          </button>

                          <button
                            type="button"
                            className="w-full bg-[#f3f3f3] hover:bg-slate-200 text-slate-700 py-5 md:py-6 rounded-xl font-cinzel text-[11px] md:text-sm tracking-wide transition-all shadow-sm flex items-center justify-center px-4 leading-relaxed active:scale-[0.98]"
                          >
                            Sadly I can't attend, but you're in my heart
                          </button>
                        </div>

                        <div className="pt-6">
                          <button className="w-full bg-[#708da9] text-white py-4 md:py-5 rounded-xl font-cinzel text-xs md:text-sm tracking-[0.2em] font-bold hover:bg-[#5d7d9a] transition-all shadow-md uppercase">
                            CLICK HERE TO CONFIRM
                          </button>
                          <p className="text-[10px] text-slate-400 mt-4 text-center leading-relaxed">No shared details will be public. Your response is private.</p>
                        </div>
                      </form>
                    </div>
                  </motion.div>

                </div>

                {/* Info info mirroring the clean aesthetic */}
                <div className="mt-32 flex flex-col items-center gap-6 text-center w-full max-w-xl">
                  <div className="h-px w-24 bg-slate-300" />
                  <p className="text-slate-500 text-[10px] tracking-[0.4em] font-bold uppercase mt-2">RSVP Contacts</p>
                  <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-slate-500 text-[10px] md:text-sm tracking-widest font-normal opacity-80 decoration-slate-300 underline-offset-4">
                    <p>Umayangana: 071 5396933</p>
                    <p>Ashan: 071 2727407</p>
                    <p>Mr. Sarachchandra: 071 4721366</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Wishing Section and Footer Wrapper - Inspiration Redesign */}
            <div className="relative bg-[#ccbaa2]/10">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <section className="relative py-24 md:py-36 flex flex-col items-center overflow-hidden">
                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#87937a]/10 mb-8 mt-4 shadow-sm border border-[#87937a]/20">
                      <Sparkles className="w-8 h-8 text-[#87937a]" />
                    </div>

                    <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-[#c5a059] mb-6 drop-shadow-sm leading-none">Best Wishes</h2>
                    <div className="h-px w-24 bg-[#ccbaa2] mb-8" />

                    <p className="text-[#87937a] text-sm md:text-lg leading-relaxed max-w-xl mx-auto mb-16 font-light tracking-[0.1em] px-4 uppercase">
                      Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a message, we would be delighted to read it!
                    </p>

                    {/* Physical Paper Form Styled wishing card */}
                    <div className="w-full max-w-2xl mx-auto bg-white p-8 md:p-14 shadow-[0_30px_70px_-15px_rgba(135,147,122,0.1)] border border-[#ccbaa2]/50 relative group">
                      <div className="absolute inset-2 border-[0.5px] border-[#c5a059]/20 pointer-events-none transition-colors duration-700" />

                      <form className="space-y-12 text-left relative z-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#87937a]/40">From</label>
                          <input
                            type="text"
                            placeholder="YOUR NAME"
                            className="w-full bg-transparent border-b border-[#ccbaa2]/40 px-0 py-4 text-[#87937a] placeholder:text-[#ccbaa2]/30 focus:outline-none focus:border-[#c5a059] transition-all font-cinzel text-lg tracking-widest"
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#87937a]/40">Message</label>
                          <textarea
                            rows={4}
                            placeholder="WISHES..."
                            className="w-full bg-transparent border-b border-[#ccbaa2]/40 px-0 py-4 text-[#87937a] placeholder:text-[#ccbaa2]/30 focus:outline-none focus:border-[#c5a059] transition-all font-cinzel text-lg tracking-widest resize-none"
                          />
                        </div>
                        <div className="pt-6 flex justify-center">
                          <button className="bg-[#87937a] text-white px-12 py-5 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-[#7a866d] transition-all duration-300 shadow-md">
                            Send Wishes
                          </button>
                        </div>
                      </form>
                    </div>

                  </motion.div>
                </div>
              </section>

              {/* Final Image Section - Full Width */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full overflow-hidden leading-[0]"
              >
                <img
                  src="/Gemini_Generated_Image_jar6bkjar6bkjar6.png"
                  alt="With Love Umayangana & Ashan"
                  className="w-full h-auto block"
                />
              </motion.div>

              {/* Minimalist Footer */}
              <footer className="py-12 border-t border-[#ccbaa2]/30 text-center relative z-10">
                <p className="text-[8px] md:text-[10px] uppercase tracking-[0.6em] text-[#87937a]/60 font-bold">
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
    </main>
  );
}
