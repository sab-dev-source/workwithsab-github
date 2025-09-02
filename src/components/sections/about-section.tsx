
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const statements = [
    "No-code doesn't mean no vision.",
    "I design systems that feel alive.",
    "This isn't a portfolio. This is a launchpad.",
    "If it doesn't feel magical, it's not done."
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="sab-section relative"
      style={{ opacity }}
    >
      <div className="sab-grid">
        <div className="col-span-12 lg:col-span-6">
          <motion.div
            style={{ y }}
            className="sticky top-1/4"
          >
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sab-display-text text-electric text-sm font-medium mb-4 block"
            >
              About SAB
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sab-hero-text text-4xl lg:text-6xl mb-8 text-gradient"
            >
              The Builder Behind the Disruption
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="sab-body-text text-xl text-muted-foreground leading-relaxed mb-12"
            >
              SAB operates at the intersection of no-code development, design-led product thinking, 
              and creative growth automation strategy. Not just building tools — shaping future-ready 
              digital experiences that are simple, scalable, and stunning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-electric"></div>
                <span className="text-sm font-medium text-electric">EXPERTISE</span>
              </div>
              <div className="space-y-3">
                <div className="text-foreground">No-code Development</div>
                <div className="text-foreground">Design-led Product Thinking</div>
                <div className="text-foreground">Creative Growth & Automation Strategy</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="col-span-12 lg:col-span-6 space-y-8">
          {statements.map((statement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.4 }}
              className="group"
            >
              <div className="p-8 border border-muted/20 hover:border-electric/40 transition-all duration-500 hover:bg-muted/5">
                <div className="flex items-start gap-4">
                  <span className="text-electric font-mono text-sm mt-1">
                    0{index + 1}
                  </span>
                  <blockquote className="sab-display-text text-2xl lg:text-3xl leading-tight text-gradient group-hover:text-gradient-electric transition-all duration-500">
                    "{statement}"
                  </blockquote>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
