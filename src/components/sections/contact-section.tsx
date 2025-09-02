
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMessageSquare, FiSend, FiArrowRight, FiChevronDown } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Component as TextArcEffect } from '@/components/ui/text-arc-effect';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <section className="sab-section relative">
      <div className="sab-grid">
        <div className="col-span-12 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-1/4"
          >
            <span className="sab-display-text text-electric text-sm font-medium mb-4 block">
              Let's Work Together
            </span>
            
            <h2 className="sab-hero-text text-5xl lg:text-7xl mb-8 text-gradient">
              Work With SAB
            </h2>
            
            <p className="sab-body-text text-xl text-muted-foreground leading-relaxed mb-8">
              Ready to build something extraordinary? Let's create digital experiences 
              that push boundaries and drive real results.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <FiMail className="text-electric w-5 h-5" />
                <span className="text-foreground">hello@sab.design</span>
              </div>
              <div className="flex items-center gap-4">
                <FiMessageSquare className="text-electric w-5 h-5" />
                <span className="text-foreground">Book a strategy call</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-12 p-6 border border-electric/20 bg-card/40 backdrop-blur-sm rounded-lg"
            >
              <h3 className="sab-display-text text-lg mb-3 text-electric">
                What to Expect
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Response within 24 hours</li>
                <li>• Strategic consultation call</li>
                <li>• Custom project proposal</li>
                <li>• Transparent timeline & pricing</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <div className="relative">
                <motion.label
                  animate={{
                    y: focusedField === 'name' || formData.name ? -32 : 0,
                    scale: focusedField === 'name' || formData.name ? 0.85 : 1,
                    color: focusedField === 'name' ? 'hsl(var(--sab-electric))' : 'hsl(var(--muted-foreground))'
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-4 top-4 pointer-events-none origin-left z-10 bg-background px-1 rounded"
                >
                  Your Name
                </motion.label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full p-4 bg-background/90 border-2 border-muted/30 rounded-lg focus:border-electric/60 focus:ring-2 focus:ring-electric/10 transition-all duration-200 outline-none text-foreground"
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <motion.label
                  animate={{
                    y: focusedField === 'email' || formData.email ? -32 : 0,
                    scale: focusedField === 'email' || formData.email ? 0.85 : 1,
                    color: focusedField === 'email' ? 'hsl(var(--sab-electric))' : 'hsl(var(--muted-foreground))'
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-4 top-4 pointer-events-none origin-left z-10 bg-background px-1 rounded"
                >
                  Email Address
                </motion.label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full p-4 bg-background/90 border-2 border-muted/30 rounded-lg focus:border-electric/60 focus:ring-2 focus:ring-electric/10 transition-all duration-200 outline-none text-foreground"
                />
              </div>

              {/* Project Type Field */}
              <div className="relative">
                <motion.label
                  animate={{
                    y: focusedField === 'project' || formData.project ? -32 : 0,
                    scale: focusedField === 'project' || formData.project ? 0.85 : 1,
                    color: focusedField === 'project' ? 'hsl(var(--sab-electric))' : 'hsl(var(--muted-foreground))'
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-4 top-4 pointer-events-none origin-left z-10 bg-background px-1 rounded"
                >
                  Project Type
                </motion.label>
                <div className="relative">
                  <select
                    value={formData.project}
                    onChange={(e) => handleInputChange('project', e.target.value)}
                    onFocus={() => setFocusedField('project')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full p-4 bg-background/90 border-2 border-muted/30 rounded-lg focus:border-electric/60 focus:ring-2 focus:ring-electric/10 transition-all duration-200 outline-none text-foreground appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-background text-foreground"></option>
                    <option value="platform" className="bg-background text-foreground">Platform Development</option>
                    <option value="automation" className="bg-background text-foreground">Automation System</option>
                    <option value="design" className="bg-background text-foreground">Design System</option>
                    <option value="consultation" className="bg-background text-foreground">Strategic Consultation</option>
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none w-5 h-5" />
                </div>
              </div>

              {/* Message Field */}
              <div className="relative">
                <motion.label
                  animate={{
                    y: focusedField === 'message' || formData.message ? -32 : 0,
                    scale: focusedField === 'message' || formData.message ? 0.85 : 1,
                    color: focusedField === 'message' ? 'hsl(var(--sab-electric))' : 'hsl(var(--muted-foreground))'
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-4 top-4 pointer-events-none origin-left z-10 bg-background px-1 rounded"
                >
                  Project Details
                </motion.label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  className="w-full p-4 bg-background/90 border-2 border-muted/30 rounded-lg focus:border-electric/60 focus:ring-2 focus:ring-electric/10 transition-all duration-200 outline-none text-foreground resize-none"
                />
              </div>

              <Button
                type="submit"
                className="group w-full bg-electric text-background hover:bg-electric/90 font-medium py-4 transition-all duration-200 hover:shadow-lg hover:shadow-electric/20 rounded-lg h-auto"
              >
                Send Message
                <FiSend className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Text Arc Effect - Positioned at bottom center with proper spacing */}
      <div className="mt-24 flex justify-center">
        <div className="w-full max-w-sm">
          <TextArcEffect />
        </div>
      </div>

      {/* Floating CTA - Simplified animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <Button
          className="group bg-electric text-background hover:bg-electric/90 rounded-full p-4 shadow-lg shadow-electric/20 hover:shadow-xl hover:shadow-electric/30 transition-all duration-200"
          data-magnetic
        >
          <FiArrowRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-200" />
        </Button>
      </motion.div>
    </section>
  );
};
