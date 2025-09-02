
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- Helper Components ---

/**
 * Renders the central logo using an image.
 * Now larger and with a hover effect applied in the main component.
 */
const CentralLogo = () => (
  <img
    src="/lovable-uploads/458a241a-28d9-418f-8133-06bae642c34a.png"
    alt="Logo"
    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
    onError={(e) => { 
      const target = e.target as HTMLImageElement;
      target.onerror = null; 
      target.src = 'https://placehold.co/96x96/27272a/ffffff?text=Logo'; 
    }}
  />
);

/**
 * Main Text Arc Effect Component
 *
 * This component displays text along a circular path with a central logo.
 * It's responsive and automatically adapts to the system's light or dark theme.
 *
 * @param {string} text - The text to display in an arc.
 * @param {number} diameter - The diameter of the text circle.
 */
const TextArc = ({ text, diameter = 200 }: { text: string; diameter?: number }) => {
    const characters = text.split('');
    const radius = diameter / 2;
    const angleStep = 360 / characters.length;

    return (
        <div className="relative" style={{ width: diameter, height: diameter }}>
            {characters.map((char, index) => {
                const angle = angleStep * index;
                const charStyle: React.CSSProperties = {
                    position: 'absolute' as const,
                    height: `${radius}px`,
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: 'bottom center',
                    top: 0,
                    left: '50%',
                    marginLeft: '-0.5em',
                };

                return (
                    <div key={index} style={charStyle}>
                        <span className="text-sm md:text-base font-bold font-pixelated text-white">
                            {char}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export function Component() {
    const text = " THANK YOU • FOR VISITING •";
    const [diameter, setDiameter] = useState(200);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setDiameter(180);
            } else {
                setDiameter(200);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex items-center justify-center w-full bg-transparent">
            <div className="relative flex items-center justify-center">
                {/* Simplified rotating animation */}
                <motion.div
                    className="absolute pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: 'linear',
                    }}
                >
                    <TextArc text={text} diameter={diameter} />
                </motion.div>

                {/* Central Logo with simplified hover animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                >
                    <CentralLogo />
                </motion.div>
            </div>

            {/* Simplified custom styles */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
                
                .font-pixelated {
                    font-family: 'VT323', monospace;
                }
            `}</style>
        </div>
    );
}
