
'use client'
import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

interface Project {
  id: string;
  title: string;
  description: string;
  tools: string[];
  category: string;
  outcome: string;
  icon: string;
}

interface StackCardProps {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  cardStart: number;
  cardEnd: number;
  onClick: () => void;
}

export const StackCard: React.FC<StackCardProps> = ({
  project,
  index,
  total,
  progress,
  cardStart,
  cardEnd,
  onClick
}) => {
  // Transform values for the stacking animation
  const scale = useTransform(
    progress,
    [cardStart, cardStart + 0.1, cardEnd - 0.1, cardEnd],
    [1 - (index * 0.05), 1, 1, 0.8]
  );

  const y = useTransform(
    progress,
    [cardStart, cardStart + 0.1, cardEnd - 0.1, cardEnd],
    [index * 20, 0, 0, -50]
  );

  const rotate = useTransform(
    progress,
    [cardStart, cardStart + 0.1, cardEnd - 0.1, cardEnd],
    [index * 2, 0, 0, -5]
  );

  const opacity = useTransform(
    progress,
    [cardStart - 0.1, cardStart, cardEnd - 0.1, cardEnd],
    [0, 1, 1, 0]
  );

  const zIndex = total - index;

  return (
    <motion.div
      style={{
        scale,
        y,
        rotate,
        opacity,
        zIndex
      }}
      className="absolute w-full max-w-2xl h-[600px] cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative w-full h-full rounded-3xl overflow-hidden bg-card border border-primary/20 shadow-2xl">
        {/* Background gradient */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--card)) 100%)`,
          }}
        />

        {/* Animated glow effect */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2/3 z-10"
          style={{
            background: `
              radial-gradient(ellipse at bottom right, hsl(var(--primary) / 0.3) -10%, transparent 70%),
              radial-gradient(ellipse at bottom left, hsl(var(--accent) / 0.3) -10%, transparent 70%)
            `,
            filter: "blur(40px)",
          }}
        />

        {/* Border glow */}
        <div
          className="absolute inset-0 rounded-3xl z-20 border border-primary/30"
          style={{
            boxShadow: "0 0 30px 5px hsl(var(--primary) / 0.2), 0 0 60px 10px hsl(var(--accent) / 0.1)"
          }}
        />

        {/* Card content */}
        <div className="relative flex flex-col h-full p-8 z-40">
          {/* Number badge and arrow */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-6xl font-bold text-primary/30">
              {project.id.padStart(2, '0')}
            </span>
            <motion.div
              whileHover={{ x: 8, rotate: 45 }}
              transition={{ duration: 0.3 }}
            >
              <FiArrowRight className="text-3xl text-primary" />
            </motion.div>
          </div>

          {/* Category */}
          <span className="text-sm font-medium text-primary uppercase tracking-wider mb-6">
            {project.category}
          </span>

          {/* Title */}
          <h3 className="text-4xl font-bold text-foreground mb-6 leading-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground mb-8 flex-grow text-lg leading-relaxed">
            {project.description}
          </p>

          {/* Bottom section with tools and outcome */}
          <div className="flex justify-between items-end">
            {/* Tools */}
            <div className="flex flex-wrap gap-2 max-w-md">
              {project.tools.slice(0, 3).map((tool) => (
                <span
                  key={tool}
                  className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
                >
                  {tool}
                </span>
              ))}
              {project.tools.length > 3 && (
                <span className="text-xs px-3 py-1 bg-muted/50 text-muted-foreground rounded-full border border-muted/30">
                  +{project.tools.length - 3} more
                </span>
              )}
            </div>

            {/* Outcome */}
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{project.outcome}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
