
import React, { useState, useCallback } from 'react';
import { SABHero } from '@/components/ui/futuristic-hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { WorkSection } from '@/components/sections/work-section';
import { ProcessSection } from '@/components/sections/process-section';
import { ContactSection } from '@/components/sections/contact-section';
import SocialLinksSection from '@/components/sections/social-links-section';
import AnimatedShaderBackground from '@/components/ui/animated-shader-background';
import Preloader from '@/components/ui/preloader';

const Index = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Hero section without background animation */}
        <div className="relative z-20">
          <SABHero />
        </div>
        
        {/* Animated background for all sections except hero - now visible on all devices */}
        <div className="relative">
          <AnimatedShaderBackground />
          
          {/* All sections with responsive spacing */}
          <div className="relative z-10 space-y-0">
            <AboutSection />
            <WorkSection />
            <ProcessSection />
            <div id="contact-section">
              <ContactSection />
            </div>
            
            {/* Social Links Section */}
            <SocialLinksSection />
            
            {/* Footer */}
            <footer className="border-t border-muted/20 py-8 sm:py-12">
              <div className="container mx-auto px-4">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-gradient">SAB</div>
                  <p className="text-xs sm:text-sm text-muted-foreground px-4">
                    © 2024 SAB. Disrupting digital futures through no-code innovation.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
