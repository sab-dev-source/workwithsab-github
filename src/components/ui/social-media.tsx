
import React from 'react';
import { cn } from "@/lib/utils";

// Define the type for a single social media item
export interface SocialItem {
  href: string;
  ariaLabel: string;
  tooltip: string;
  svgUrl: string;
  color: string;
}

// Define the props for the SocialTooltip component
export interface SocialTooltipProps extends React.HTMLAttributes<HTMLUListElement> {
  items: SocialItem[];
}

const SocialTooltip = React.forwardRef<HTMLUListElement, SocialTooltipProps>(
  ({ className, items, ...props }, ref) => {
    // Base styles for the component
    const baseIconStyles =
      "relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-card border border-border overflow-hidden transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-primary/20 group";
    const baseSvgStyles =
      "relative z-10 w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 ease-in-out group-hover:scale-110";
    const baseFilledStyles =
      "absolute bottom-0 left-0 w-full h-0 transition-all duration-500 ease-out group-hover:h-full";
    const baseTooltipStyles =
      "absolute bottom-[-45px] sm:bottom-[-50px] left-1/2 -translate-x-1/2 px-3 py-2 text-xs sm:text-sm text-background font-medium whitespace-nowrap rounded-md opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:bottom-[-55px] sm:group-hover:bottom-[-60px] z-20";

    return (
      <ul
        ref={ref}
        className={cn("flex items-center justify-center gap-3 sm:gap-4 md:gap-6", className)}
        {...props}
      >
        {items.map((item, index) => (
          <li key={index} className="relative group">
            <a
              href={item.href}
              aria-label={item.ariaLabel}
              className={baseIconStyles}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={baseFilledStyles}
                style={{ backgroundColor: item.color }}
              />
              <img
                src={item.svgUrl}
                alt={item.ariaLabel}
                className={baseSvgStyles}
                loading="lazy"
                style={{ 
                  filter: 'brightness(0) saturate(100%) invert(47%) sepia(8%) saturate(471%) hue-rotate(193deg) brightness(91%) contrast(87%)',
                }}
              />
            </a>
            <div
              className={baseTooltipStyles}
              style={{ backgroundColor: item.color }}
            >
              {item.tooltip}
            </div>
          </li>
        ))}
      </ul>
    );
  }
);

SocialTooltip.displayName = "SocialTooltip";

export { SocialTooltip };
