
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCode, FiZap, FiCpu, FiShoppingCart, FiDollarSign, FiUsers, FiBarChart, FiGlobe, FiSmartphone, FiDatabase, FiTrendingUp, FiHeart, FiBook, FiHome, FiTruck, FiMusic, FiTarget, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const projectNiches = [
  {
    id: 1,
    category: "SaaS Platforms",
    title: "Enterprise Software Solutions",
    description: "Custom SaaS platforms that streamline business operations, from CRM systems to project management tools. I build scalable solutions that grow with your business needs.",
    projects: [
      "Analytics Dashboard - 25K+ users, 40% efficiency boost",
      "Project Management Suite - 500+ teams, 60% faster delivery",
      "CRM Automation - 85% conversion improvement"
    ],
    tools: ["Bubble", "Webflow", "Zapier", "Airtable", "APIs"],
    metrics: { projects: "15+", users: "50K+", satisfaction: "94%" },
    icon: FiCode,
  },
  {
    id: 2,
    category: "E-commerce",
    title: "Digital Commerce Solutions",
    description: "Complete e-commerce ecosystems with automated workflows, inventory management, and customer retention systems that drive sustainable revenue growth.",
    projects: [
      "Multi-vendor Marketplace - 800+ vendors, $1.2M GMV",
      "Subscription Platform - 12K subscribers, 78% retention",
      "Fashion Store - 300% traffic increase, 45% conversion boost"
    ],
    tools: ["Shopify Plus", "WooCommerce", "Stripe", "Klaviyo", "Analytics"],
    metrics: { stores: "25+", revenue: "$3.5M+", growth: "180%" },
    icon: FiShoppingCart,
  },
  {
    id: 3,
    category: "FinTech",
    title: "Financial Technology",
    description: "Secure financial platforms including digital banking, investment tools, and payment solutions with enterprise-grade security and compliance.",
    projects: [
      "Digital Banking App - 35K users, 99.8% uptime",
      "Investment Platform - $4.2M assets managed, 11% avg returns",
      "Payment Gateway - 50K+ transactions, 0.1% fraud rate"
    ],
    tools: ["Bubble", "Plaid", "Stripe Connect", "Banking APIs", "Security"],
    metrics: { platforms: "8+", transactions: "$8M+", security: "99.9%" },
    icon: FiDollarSign,
  },
  {
    id: 4,
    category: "HealthTech",
    title: "Digital Healthcare Solutions",
    description: "HIPAA-compliant healthcare platforms including telemedicine, patient management, and wellness tracking systems that improve patient outcomes.",
    projects: [
      "Telemedicine Platform - 18K patients, 96% satisfaction",
      "Mental Health App - 8K daily users, 72% improvement rate",
      "Fitness Tracker - 22K users, 85% retention"
    ],
    tools: ["Webflow", "HIPAA Tools", "Zoom API", "Health APIs", "Analytics"],
    metrics: { patients: "30K+", consultations: "75K+", outcomes: "78%" },
    icon: FiHeart,
  },
  {
    id: 5,
    category: "EdTech",
    title: "Educational Technology",
    description: "Interactive learning platforms with AI-powered personalization, progress tracking, and engagement tools that enhance educational outcomes.",
    projects: [
      "Online Learning Platform - 28K students, 82% completion rate",
      "Corporate Training - 150+ companies, 320% ROI",
      "Language Learning - 15K learners, 12 languages"
    ],
    tools: ["Bubble", "Vimeo", "AI APIs", "LMS Tools", "Analytics"],
    metrics: { students: "45K+", courses: "350+", completion: "79%" },
    icon: FiBook,
  },
  {
    id: 6,
    category: "PropTech",
    title: "Real Estate Technology",
    description: "Smart property management and real estate platforms with virtual tours, automated valuations, and tenant management systems.",
    projects: [
      "Property Management - 5K+ properties, 40% cost reduction",
      "Real Estate Marketplace - 2K listings, 25% faster sales",
      "Tenant Portal - 8K users, 90% satisfaction"
    ],
    tools: ["Webflow", "Matterport", "Zillow API", "Property APIs", "CRM"],
    metrics: { properties: "7K+", transactions: "1.2K+", efficiency: "60%" },
    icon: FiHome,
  },
  {
    id: 7,
    category: "Media & Entertainment",
    title: "Digital Entertainment Platforms",
    description: "Engaging media platforms including streaming services, gaming communities, and social entertainment experiences with high user engagement.",
    projects: [
      "Music Streaming - 45K users, 3.2hrs avg session",
      "Gaming Community - 120K gamers, 850+ tournaments",
      "Content Platform - 25K creators, $180K revenue"
    ],
    tools: ["Webflow", "Streaming APIs", "Social APIs", "Payment", "Analytics"],
    metrics: { users: "190K+", engagement: "3.5hrs", retention: "76%" },
    icon: FiMusic,
  },
  {
    id: 8,
    category: "MarTech",
    title: "Marketing Technology",
    description: "Advanced marketing automation platforms with lead generation, email campaigns, and analytics that drive measurable business growth.",
    projects: [
      "Marketing Automation - 500+ campaigns, 45% open rate",
      "Lead Generation - 15K leads/month, 28% conversion",
      "Analytics Dashboard - 200+ brands, 60% ROI increase"
    ],
    tools: ["HubSpot", "Mailchimp", "Analytics", "Zapier", "CRM Integration"],
    metrics: { campaigns: "2K+", leads: "180K+", roi: "185%" },
    icon: FiTarget,
  }
];

export const WorkSection = () => {
  const [selectedNiche, setSelectedNiche] = useState<typeof projectNiches[0] | null>(null);

  const NicheCard = ({ niche, index }: { niche: typeof projectNiches[0], index: number }) => {
    const IconComponent = niche.icon;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative group cursor-pointer h-full"
        onClick={() => setSelectedNiche(niche)}
      >
        <div className="relative bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col min-h-[520px] sm:min-h-[580px]">
          
          {/* Hover effect without cutting off */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-primary/20 pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-300">
                <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <motion.div
                className="text-primary/60 group-hover:text-primary transition-colors duration-300"
                whileHover={{ x: 4 }}
              >
                <FiArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
            </div>

            {/* Category */}
            <span className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider mb-2 sm:mb-3">
              {niche.category}
            </span>

            {/* Title */}
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-3 sm:mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
              {niche.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed flex-grow">
              {niche.description}
            </p>

            {/* Featured Projects */}
            <div className="mb-4 sm:mb-6">
              <h4 className="text-xs font-medium text-primary mb-2 sm:mb-3 uppercase tracking-wider">Featured Projects</h4>
              <div className="space-y-1 sm:space-y-2">
                {niche.projects.map((project, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    <span className="line-clamp-2">{project}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
              {niche.tools.slice(0, 4).map((tool) => (
                <span
                  key={tool}
                  className="text-xs px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
                >
                  {tool}
                </span>
              ))}
              {niche.tools.length > 4 && (
                <span className="text-xs px-2 sm:px-3 py-1 bg-muted/50 text-muted-foreground rounded-full">
                  +{niche.tools.length - 4}
                </span>
              )}
            </div>

            {/* Metrics - Fixed at bottom */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-primary/20 mt-auto">
              {Object.entries(niche.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-sm sm:text-lg font-bold text-primary">{value}</div>
                  <div className="text-xs text-muted-foreground capitalize">{key}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
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
            Portfolio Showcase
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Digital Constructs
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Comprehensive solutions spanning every industry vertical - from enterprise SaaS to consumer platforms, 
            each engineered for scale, performance, and measurable business impact
          </motion.p>
        </motion.div>

        {/* Mobile scroll indicators */}
        <div className="flex sm:hidden items-center justify-center gap-2 mb-6">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <FiChevronLeft className="w-4 h-4" />
            <span>Swipe to explore</span>
            <FiChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative px-4 sm:px-8 lg:px-12"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projectNiches.map((niche, index) => (
                <CarouselItem key={niche.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="h-full">
                    <NicheCard niche={niche} index={index} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-8" />
            <CarouselNext className="hidden sm:flex -right-4 lg:-right-8" />
          </Carousel>
        </motion.div>

        {/* Mobile pagination dots */}
        <div className="flex sm:hidden justify-center mt-6 gap-2">
          {Array.from({ length: Math.ceil(projectNiches.length / 1) }).map((_, idx) => (
            <div
              key={idx}
              className="w-2 h-2 rounded-full bg-primary/30"
            />
          ))}
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mt-8 sm:mt-12 lg:mt-16"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">8</div>
              <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Industry Verticals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">300K+</div>
              <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Total Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">$15M+</div>
              <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Value Generated</div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-background rounded-full font-medium hover:bg-primary/90 transition-colors duration-300 text-sm sm:text-base"
          >
            Explore Full Portfolio
            <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedNiche && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
            onClick={() => setSelectedNiche(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full bg-card border border-primary/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <div>
                  <span className="text-primary text-sm font-medium mb-2 block uppercase tracking-wider">
                    {selectedNiche.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                    {selectedNiche.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedNiche(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted flex-shrink-0"
                >
                  ×
                </button>
              </div>

              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                {selectedNiche.description}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                <div>
                  <h4 className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">Featured Projects</h4>
                  <div className="space-y-3">
                    {selectedNiche.projects.map((project, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-foreground">{project}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">Technologies & Tools</h4>
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                    {selectedNiche.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 sm:px-4 py-2 bg-primary/10 text-primary text-sm rounded-full border border-primary/20 font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">Key Metrics</h4>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    {Object.entries(selectedNiche.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-primary/5 rounded-lg">
                        <div className="text-lg sm:text-2xl font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
