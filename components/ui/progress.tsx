import { cn } from "@/lib/utils";

type ProgressProps = {
  value?: number;
  className?: string;
  indicatorClassName?: string;
};

export function Progress({ value = 0, className, indicatorClassName }: ProgressProps) {
  const safeValue = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-zinc-200", className)}>
      <div
        className={cn("h-full bg-brand-orange transition-all duration-200", indicatorClassName)}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
