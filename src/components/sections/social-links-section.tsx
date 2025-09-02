
import React from 'react';
import { SocialTooltip, SocialItem } from '@/components/ui/social-media';

// Data for the social media links
const socialLinks: SocialItem[] = [
  {
    href: "https://instagram.com/sab", // Replace with actual URLs
    ariaLabel: "Instagram",
    tooltip: "Instagram",
    color: "#E4405F",
    svgUrl: "https://svgl.app/library/instagram.svg",
  },
  {
    href: "https://linkedin.com/in/sab", // Replace with actual URLs
    ariaLabel: "LinkedIn",
    tooltip: "LinkedIn",
    color: "#0077B5",
    svgUrl: "https://svgl.app/library/linkedin.svg",
  },
  {
    href: "https://x.com/sab", // Replace with actual URLs
    ariaLabel: "X (Twitter)",
    tooltip: "X",
    color: "#1DA1F2",
    svgUrl: "https://svgl.app/library/x.svg",
  },
  {
    href: "https://facebook.com/sab", // Replace with actual URLs
    ariaLabel: "Facebook",
    tooltip: "Facebook",
    color: "#1877F2",
    svgUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg",
  },
];

const SocialLinksSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 border-t border-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Connect With Me
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
            Follow my journey and connect across platforms
          </p>
        </div>
        <div className="flex justify-center">
          <SocialTooltip items={socialLinks} />
        </div>
      </div>
    </section>
  );
};

export default SocialLinksSection;
