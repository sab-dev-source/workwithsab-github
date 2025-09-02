
import { useLayoutEffect, useRef, useCallback } from "react";

export const ScrollStackItem = ({ children, itemClassName = "" }: { children: React.ReactNode, itemClassName?: string }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
}

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 40,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const cardsRef = useRef<Element[]>([]);
  const lastScrollY = useRef(0);
  const isScrolling = useRef(false);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value.toString());
  }, []);

  const updateCardTransforms = useCallback(() => {
    const container = containerRef.current;
    if (!container || !cardsRef.current.length) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const stackPositionPx = parsePercentage(stackPosition, windowHeight);
    const containerRect = container.getBoundingClientRect();
    const containerTop = containerRect.top + scrollTop;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardElement = card as HTMLElement;
      const cardRect = cardElement.getBoundingClientRect();
      const cardTop = cardRect.top + scrollTop;
      
      // Calculate relative position to container
      const relativeCardTop = cardTop - containerTop;
      
      // Calculate when this card should start stacking (when it hits the stack position)
      const stackTrigger = scrollTop + stackPositionPx;
      const shouldStack = cardTop <= stackTrigger;
      
      if (shouldStack) {
        // Calculate how far into the stack this card should be
        const stackProgress = Math.max(0, Math.min(1, (stackTrigger - cardTop) / (windowHeight * 0.5)));
        
        // Calculate final stacked position
        const finalY = stackPositionPx - (i * itemStackDistance);
        
        // Scale calculation - each card gets progressively smaller
        const targetScale = baseScale - (i * itemScale);
        const scale = Math.max(0.3, targetScale + (1 - targetScale) * (1 - stackProgress));
        
        // Position calculation - move to final stacked position
        const translateY = finalY - relativeCardTop;
        
        // Z-index management for proper stacking order
        const zIndex = 1000 - i + Math.floor(stackProgress * 10);
        
        // Rotation and blur effects
        const rotation = rotationAmount ? i * rotationAmount * stackProgress : 0;
        const blur = blurAmount ? i * blurAmount * stackProgress : 0;

        // Apply transforms
        const transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
        const filter = blur > 0 ? `blur(${blur}px)` : '';

        cardElement.style.transform = transform;
        cardElement.style.filter = filter;
        cardElement.style.zIndex = zIndex.toString();
        cardElement.style.position = 'sticky';
        cardElement.style.top = `${stackPositionPx}px`;
      } else {
        // Reset transforms when not stacking
        cardElement.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
        cardElement.style.filter = '';
        cardElement.style.zIndex = (cardsRef.current.length - i).toString();
        cardElement.style.position = 'relative';
        cardElement.style.top = 'auto';
      }

      // Check if all cards are stacked
      if (i === cardsRef.current.length - 1) {
        const allStacked = cardsRef.current.every((_, idx) => {
          const cardEl = cardsRef.current[idx] as HTMLElement;
          const cardRect = cardEl.getBoundingClientRect();
          const cardTop = cardRect.top + scrollTop;
          return cardTop <= scrollTop + stackPositionPx;
        });
        
        if (allStacked && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!allStacked && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    lastScrollY.current = scrollTop;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    parsePercentage,
  ]);

  const handleScroll = useCallback(() => {
    // Throttle scroll updates to reduce jittering
    const currentScrollY = window.scrollY;
    const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
    
    // Only update if scroll delta is significant enough
    if (scrollDelta < 2 && isScrolling.current) return;
    
    isScrolling.current = true;
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      updateCardTransforms();
      isScrolling.current = false;
    });
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll(".scroll-stack-card"));
    cardsRef.current = cards;

    // Set up initial styles for each card
    cards.forEach((card, i) => {
      const cardElement = card as HTMLElement;
      
      // Initial setup
      cardElement.style.marginBottom = `${itemDistance}px`;
      cardElement.style.willChange = 'transform, filter, z-index';
      cardElement.style.transformOrigin = 'center center';
      cardElement.style.backfaceVisibility = 'hidden';
      cardElement.style.zIndex = (cards.length - i).toString();
      cardElement.style.position = 'relative';
      
      // Ensure proper rendering
      cardElement.style.isolation = 'isolate';
    });

    // Add scroll listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial update
    updateCardTransforms();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      isScrolling.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    onStackComplete,
    handleScroll,
    updateCardTransforms,
  ]);

  return (
    <div
      className={`scroll-stack-container ${className}`.trim()}
      ref={containerRef}
      style={{
        position: 'relative'
      }}
    >
      {children}
      {/* Add spacer for smooth scrolling */}
      <div style={{ height: '150vh' }} />
    </div>
  );
};

export default ScrollStack;
