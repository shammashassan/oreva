import React from "react";
import { BRAND } from "@/lib/data";
import { cn } from "@/lib/utils";

export interface OrevaMarkProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  showHalo?: boolean;
}

/**
 * The ORÉVA Sovereign Star Mark
 * An 8-point celestial star structured with diamond pavilion facet geometry
 * and sovereign framing.
 */
export function OrevaMark({
  className,
  size = 32,
  showHalo = true,
  ...props
}: OrevaMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${BRAND.name} Star Mark`}
      className={cn("shrink-0 transition-transform duration-300", className)}
      {...props}
    >
      {showHalo && (
        <>
          {/* Sovereign Octagonal Halo */}
          <polygon
            points="32,6 68,6 94,32 94,68 68,94 32,94 6,68 6,32"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeOpacity="0.4"
            strokeDasharray="2.5 2.5"
          />
          {/* Subtle Outer Tension Ring */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeOpacity="0.25"
          />
        </>
      )}

      {/* 8-Point Faceted Diamond Celestial Star */}
      <g className="oreva-star-facets">
        {/* North Ray */}
        <polygon points="50,50 44.8,37.5 50,4" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 50,4 55.2,37.5" fill="currentColor" fillOpacity="0.95" />

        {/* North-East Ray */}
        <polygon points="50,50 55.2,37.5 74,26" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 74,26 62.5,44.8" fill="currentColor" fillOpacity="0.95" />

        {/* East Ray */}
        <polygon points="50,50 62.5,44.8 96,50" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 96,50 62.5,55.2" fill="currentColor" fillOpacity="0.95" />

        {/* South-East Ray */}
        <polygon points="50,50 62.5,55.2 74,74" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 74,74 55.2,62.5" fill="currentColor" fillOpacity="0.95" />

        {/* South Ray */}
        <polygon points="50,50 55.2,62.5 50,96" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 50,96 44.8,62.5" fill="currentColor" fillOpacity="0.95" />

        {/* South-West Ray */}
        <polygon points="50,50 44.8,62.5 26,74" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 26,74 37.5,55.2" fill="currentColor" fillOpacity="0.95" />

        {/* West Ray */}
        <polygon points="50,50 37.5,55.2 4,50" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 4,50 37.5,44.8" fill="currentColor" fillOpacity="0.95" />

        {/* North-West Ray */}
        <polygon points="50,50 37.5,44.8 26,26" fill="currentColor" fillOpacity="0.55" />
        <polygon points="50,50 26,26 44.8,37.5" fill="currentColor" fillOpacity="0.95" />
      </g>

      {/* Central Brilliant Core (Diamond Pavilion Table Facet) */}
      <polygon
        points="50,46.5 53.5,50 50,53.5 46.5,50"
        fill="currentColor"
        fillOpacity="0.95"
      />
      <circle cx="50" cy="50" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function OrevaLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      <span className="font-serif text-2xl tracking-[0.28em] uppercase font-medium leading-tight text-foreground">
        {BRAND.name}
      </span>
      <span className="text-[8px] tracking-[0.35em] text-muted-foreground uppercase mt-0.5 font-light">
        {BRAND.descriptor}
      </span>
    </div>
  );
}
