
'use client'
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { StackCard } from './stack-card';

interface Project {
  id: string;
  title: string;
  description: string;
  tools: string[];
  category: string;
  outcome: string;
  icon: string;
}

interface StackedCardsProps {
  projects: Project[];
}

export const StackedCards: React.FC<StackedCardsProps> = ({ projects }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  return (
    <>
      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-24 flex justify-center items-center h-screen">
          {projects.map((project, index) => {
            const cardStart = index / projects.length;
            const cardEnd = (index + 1) / projects.length;
            
            return (
              <StackCard
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
                progress={scrollYProgress}
                cardStart={cardStart}
                cardEnd={cardEnd}
                onClick={() => setSelectedProject(project)}
              />
            );
          })}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="max-w-4xl w-full bg-card border border-primary/20 rounded-2xl p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-primary text-sm font-medium mb-2 block uppercase tracking-wider">
                  {selectedProject.category}
                </span>
                <h3 className="text-3xl font-bold mb-4 text-foreground">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-muted-foreground hover:text-foreground transition-colors text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted"
              >
                ×
              </button>
            </div>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">Tools Used</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-4 py-2 bg-primary/10 text-primary text-sm rounded-full border border-primary/20 font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">Impact</h4>
                <p className="text-2xl font-bold text-foreground">{selectedProject.outcome}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
