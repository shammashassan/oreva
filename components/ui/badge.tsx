import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-xs px-2 py-0.5 text-[0.6875rem] font-medium tracking-widest uppercase transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-transparent",
        secondary:
          "bg-secondary text-secondary-foreground border border-border/40",
        outline:
          "text-foreground border border-border bg-transparent",
        accent:
          "bg-accent text-accent-foreground border border-accent/20",
        gold:
          "bg-[#C7A66B]/15 text-[#8F6F35] dark:text-[#E8D09E] border border-[#C7A66B]/30",
        burgundy:
          "bg-[#491323] text-[#FFF9F1] border border-[#491323]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
