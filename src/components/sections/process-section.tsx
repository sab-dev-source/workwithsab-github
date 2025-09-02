import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiTarget, FiCode, FiRefreshCw, FiPlay, FiTrendingUp } from 'react-icons/fi';

interface ProcessStage {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  shortDesc: string;
  fullDescription: string;
  deliverables: string[];
  duration: string;
  keyActivities: string[];
}

const processStages: ProcessStage[] = [
  {
    id: 'discovery',
    title: 'Discovery & Strategy',
    icon: FiUsers,
    shortDesc: 'Understanding your vision',
    fullDescription: 'We begin with comprehensive stakeholder interviews and market research to understand your business objectives, target audience, and competitive landscape. This phase establishes the foundation for all subsequent development decisions.',
    deliverables: [
      'Detailed project requirements document',
      'User persona profiles and journey maps',
      'Technical architecture blueprint',
      'Project timeline and milestone schedule'
    ],
    duration: '1-2 weeks',
    keyActivities: [
      'Stakeholder interviews and workshops',
      'Competitive analysis and market research',
      'Technical feasibility assessment',
      'Risk analysis and mitigation planning'
    ]
  },
  {
    id: 'design',
    title: 'Design & Prototyping',
    icon: FiTarget,
    shortDesc: 'Crafting user experience',
    fullDescription: 'Our design process focuses on creating intuitive user experiences through iterative wireframing, prototyping, and user testing. We ensure every interface element serves a purpose and enhances user engagement.',
    deliverables: [
      'Interactive wireframes and prototypes',
      'Complete UI/UX design system',
      'Responsive design specifications',
      'User testing reports and insights'
    ],
    duration: '2-3 weeks',
    keyActivities: [
      'User experience research and analysis',
      'Wireframe creation and iteration',
      'High-fidelity design development',
      'Prototype testing and refinement'
    ]
  },
  {
    id: 'development',
    title: 'Development & Integration',
    icon: FiCode,
    shortDesc: 'Building your solution',
    fullDescription: 'Using no-code and low-code platforms, we rapidly build your application while maintaining high standards for performance, security, and scalability. Our development approach emphasizes clean architecture and maintainable code.',
    deliverables: [
      'Fully functional application build',
      'API integrations and data connections',
      'Security implementations and testing',
      'Performance optimization reports'
    ],
    duration: '3-6 weeks',
    keyActivities: [
      'Platform setup and configuration',
      'Feature development and integration',
      'Quality assurance testing',
      'Security and performance optimization'
    ]
  },
  {
    id: 'testing',
    title: 'Testing & Refinement',
    icon: FiRefreshCw,
    shortDesc: 'Ensuring quality',
    fullDescription: 'Comprehensive testing across all devices and use cases ensures your application performs flawlessly. We conduct user acceptance testing, performance testing, and security audits to guarantee enterprise-grade quality.',
    deliverables: [
      'Comprehensive test documentation',
      'Bug tracking and resolution reports',
      'Performance benchmarking results',
      'User acceptance testing outcomes'
    ],
    duration: '1-2 weeks',
    keyActivities: [
      'Cross-platform compatibility testing',
      'User acceptance testing coordination',
      'Performance and load testing',
      'Security vulnerability assessments'
    ]
  },
  {
    id: 'launch',
    title: 'Launch & Deployment',
    icon: FiPlay,
    shortDesc: 'Going live',
    fullDescription: 'We handle the complete deployment process, including domain setup, hosting configuration, and go-live procedures. Our launch strategy minimizes downtime and ensures a smooth transition for your users.',
    deliverables: [
      'Production environment setup',
      'Domain and hosting configuration',
      'Launch checklist and procedures',
      'Initial performance monitoring setup'
    ],
    duration: '3-5 days',
    keyActivities: [
      'Production environment preparation',
      'Domain and DNS configuration',
      'Go-live execution and monitoring',
      'Initial user onboarding support'
    ]
  },
  {
    id: 'optimization',
    title: 'Growth & Optimization',
    icon: FiTrendingUp,
    shortDesc: 'Continuous improvement',
    fullDescription: 'Post-launch, we monitor performance metrics and user behavior to identify optimization opportunities. Our ongoing support ensures your application continues to meet evolving business needs and market demands.',
    deliverables: [
      'Analytics dashboard and reporting',
      'Performance optimization recommendations',
      'Feature enhancement roadmap',
      'Maintenance and support documentation'
    ],
    duration: 'Ongoing',
    keyActivities: [
      'Performance monitoring and analysis',
      'User feedback collection and analysis',
      'Feature enhancement planning',
      'Technical maintenance and updates'
    ]
  }
];

export const ProcessSection = () => {
  const [activeStage, setActiveStage] = useState<ProcessStage>(processStages[0]);

  return (
    <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <motion.span 
            className="text-primary text-sm font-medium mb-4 block uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Development Process
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Process Excellence
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            A structured approach to digital product development that ensures quality, efficiency, and measurable results at every stage
          </motion.p>
        </motion.div>

        {/* Process Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
            {processStages.map((stage, index) => {
              const IconComponent = stage.icon;
              const isActive = activeStage.id === stage.id;
              
              return (
                <motion.button
                  key={stage.id}
                  onClick={() => setActiveStage(stage)}
                  className={`flex flex-col items-center p-3 sm:p-4 rounded-xl transition-all duration-300 min-w-[80px] sm:min-w-[120px] ${
                    isActive 
                      ? 'bg-primary text-background shadow-lg' 
                      : 'bg-card hover:bg-card/80 text-muted-foreground hover:text-foreground border border-primary/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 mb-2 ${isActive ? 'text-background' : 'text-primary'}`} />
                  <span className="text-xs sm:text-sm font-medium text-center leading-tight">
                    {stage.title}
                  </span>
                  <span className="text-xs opacity-70 mt-1 text-center hidden sm:block">
                    {stage.shortDesc}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Active Stage Details */}
        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {/* Left Column */}
              <div>
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="p-3 sm:p-4 rounded-xl bg-primary/10 text-primary">
                    <activeStage.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2">
                      {activeStage.title}
                    </h3>
                    <span className="text-sm sm:text-base text-primary font-medium">
                      Duration: {activeStage.duration}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  {activeStage.fullDescription}
                </p>

                <div className="mb-6 sm:mb-8">
                  <h4 className="text-sm sm:text-base font-semibold text-foreground mb-3 sm:mb-4">Key Activities</h4>
                  <div className="space-y-2 sm:space-y-3">
                    {activeStage.keyActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-muted-foreground">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="mb-6 sm:mb-8">
                  <h4 className="text-sm sm:text-base font-semibold text-foreground mb-3 sm:mb-4">Deliverables</h4>
                  <div className="space-y-3 sm:space-y-4">
                    {activeStage.deliverables.map((deliverable, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 sm:p-4 bg-primary/5 rounded-xl border border-primary/10"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-foreground font-medium">{deliverable}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mt-6 sm:mt-8">
                  <div className="flex justify-between items-center mb-2 sm:mb-3">
                    <span className="text-xs sm:text-sm font-medium text-foreground">Process Progress</span>
                    <span className="text-xs sm:text-sm text-primary font-medium">
                      {processStages.findIndex(s => s.id === activeStage.id) + 1} of {processStages.length}
                    </span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${((processStages.findIndex(s => s.id === activeStage.id) + 1) / processStages.length) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mt-8 sm:mt-12 lg:mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-background rounded-full font-medium hover:bg-primary/90 transition-colors duration-300 text-sm sm:text-base"
          >
            Start Your Project
            <FiPlay className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
