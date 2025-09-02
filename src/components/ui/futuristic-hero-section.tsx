import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useMotionTemplate, useMotionValue, motion, animate, AnimatePresence } from "framer-motion";
const COLORS_TOP = ["#00FFFF", "#0066FF", "#FF0066", "#00FF66"];
const DYNAMIC_TEXTS = ["What If?", "Break Boundaries", "Launch Big", "Dream Bigger", "Ready?"];
export const SABHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 8,
      repeat: Infinity,
      repeatType: "mirror"
    });
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % DYNAMIC_TEXTS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, hsl(var(--sab-dark)) 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <motion.section style={{
    backgroundImage
  }} className="relative grid min-h-screen place-content-center overflow-hidden px-4 py-24 text-foreground">
      <div className="relative z-10 flex flex-col items-center">
        <motion.span initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.5
      }} className="mb-8 inline-block rounded-full bg-muted/20 px-6 py-2 text-sm font-medium border border-electric/20">
          The No-Code Era Has a Name
        </motion.span>
        
        {/* Clean SAB text with solid color fill */}
        <motion.div initial={{
        opacity: 0,
        y: 50
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.8,
        duration: 1
      }} className="relative max-w-6xl text-center mb-8">
          {/* Main SAB text filled with current color */}
          <motion.h1 className="sab-hero-text text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] leading-none font-black relative" style={{
          color: color,
          filter: useMotionTemplate`drop-shadow(0 0 40px ${color}60)`
        }}>
            SAB
          </motion.h1>

          {/* Subtle glow background */}
          <motion.div className="absolute inset-0 -z-10" style={{
          background: useMotionTemplate`radial-gradient(ellipse at center, ${color}25 0%, transparent 70%)`,
          filter: "blur(100px)"
        }} animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.5, 0.8, 0.5]
        }} transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }} />
        </motion.div>
        
        <motion.p initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 1.2
      }} className="sab-body-text my-8 max-w-2xl text-center text-lg md:text-xl leading-relaxed text-muted-foreground">
          Creative technologist building digital futures that are meaningful, 
          emotionally intelligent, and disruptive by design.
        </motion.p>
        
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 1.5
      }} className="flex flex-col sm:flex-row gap-4 items-center">
          <motion.button onClick={handleContactClick} style={{
          border,
          boxShadow
        }} whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} className="sab-magnetic group relative flex items-center gap-2 rounded-sm bg-background/80 px-8 py-4 text-foreground font-medium transition-all hover:bg-background/90 backdrop-blur-sm">
            <div className="relative overflow-hidden h-6 flex items-center min-w-[140px]">
              <AnimatePresence mode="wait">
                <motion.span key={currentTextIndex} initial={{
                y: 20,
                opacity: 0
              }} animate={{
                y: 0,
                opacity: 1
              }} exit={{
                y: -20,
                opacity: 0
              }} transition={{
                duration: 0.3,
                ease: "easeInOut"
              }} className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-foreground font-semibold">
                  {DYNAMIC_TEXTS[currentTextIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={100} count={3000} factor={6} fade speed={1} />
        </Canvas>
      </div>
      
      {/* Ambient light trails */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '1s'
      }}></div>
      </div>
    </motion.section>;
};