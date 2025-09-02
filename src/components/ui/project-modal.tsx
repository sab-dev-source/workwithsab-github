
import React from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  tools: string[];
  category: string;
  outcome: string;
  icon: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
      onClick={onClose}
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
              {project.category}
            </span>
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted"
          >
            ×
          </button>
        </div>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          {project.description}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">Tools Used</h4>
            <div className="flex flex-wrap gap-3">
              {project.tools.map((tool) => (
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
            <p className="text-2xl font-bold text-foreground">{project.outcome}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
