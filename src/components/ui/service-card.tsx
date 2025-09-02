
'use client'
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from 'react-icons/fi';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  tools: string[];
  outcome: string;
  onClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  category,
  tools,
  outcome,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = -(y / rect.height) * 3; // Reduced for subtlety
      const rotateY = (x / rect.width) * 3;

      setRotation({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        width: "100%",
        height: "500px",
        transformStyle: "preserve-3d",
        backgroundColor: "hsl(var(--card))",
      }}
      initial={{ y: 0 }}
      animate={{
        y: isHovered ? -8 : 0,
        rotateX: rotation.x,
        rotateY: rotation.y,
        perspective: 1000,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {/* Glass reflection overlay */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.05) 100%)",
          backdropFilter: "blur(2px)",
        }}
        animate={{
          opacity: isHovered ? 0.8 : 0.6,
          rotateX: -rotation.x * 0.2,
          rotateY: -rotation.y * 0.2,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--card)) 100%)",
        }}
      />

      {/* Animated glow effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-10"
        style={{
          background: `
            radial-gradient(ellipse at bottom right, hsl(var(--primary) / 0.3) -10%, transparent 70%),
            radial-gradient(ellipse at bottom left, hsl(var(--accent) / 0.3) -10%, transparent 70%)
          `,
          filter: "blur(40px)",
        }}
        animate={{
          opacity: isHovered ? 0.9 : 0.7,
          y: isHovered ? rotation.x * 0.5 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl z-20"
        style={{
          border: "1px solid transparent",
          background: "linear-gradient(135deg, hsl(var(--border)), transparent) border-box",
        }}
        animate={{
          boxShadow: isHovered
            ? "0 0 30px 5px hsl(var(--primary) / 0.3), 0 0 60px 10px hsl(var(--accent) / 0.2)"
            : "0 0 20px 3px hsl(var(--primary) / 0.2), 0 0 40px 6px hsl(var(--accent) / 0.1)",
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      {/* Card content */}
      <motion.div
        className="relative flex flex-col h-full p-8 z-40"
        animate={{
          rotateX: isHovered ? -rotation.x * 0.1 : 0,
          rotateY: isHovered ? -rotation.y * 0.1 : 0
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      >
        {/* Number badge */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-5xl font-bold text-primary/30">
            {id.padStart(2, '0')}
          </span>
          <motion.div
            animate={{
              x: isHovered ? 8 : 0,
              rotate: isHovered ? 45 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <FiArrowRight className="text-2xl text-primary" />
          </motion.div>
        </motion.div>

        {/* Category */}
        <motion.span 
          className="text-sm font-medium text-primary uppercase tracking-wider mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {category}
        </motion.span>

        {/* Title */}
        <motion.h3
          className="text-2xl font-bold text-foreground mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-muted-foreground mb-6 flex-grow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {description}
        </motion.p>

        {/* Tools */}
        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {tools.slice(0, 4).map((tool, index) => (
            <span
              key={tool}
              className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {tool}
            </span>
          ))}
        </motion.div>

        {/* Outcome */}
        <motion.div
          className="text-lg font-semibold text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {outcome}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
