import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-zinc-100 text-zinc-800",
        success: "bg-brand-success/15 text-brand-success",
        info: "bg-blue-100 text-blue-700",
        warning: "bg-amber-100 text-amber-700",
        danger: "bg-brand-danger/15 text-brand-danger",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
