import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getScoreMeta } from "@/lib/scoring";

const tiers: Record<string, string> = {
  Excellent: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Bien: "bg-sky-100 text-sky-700 border-sky-200",
  Moyen: "bg-amber-100 text-amber-700 border-amber-200",
  Danger: "bg-red-100 text-red-700 border-red-200",
};

export function ScoreBadge({ score }: { score: number }) {
  const meta = getScoreMeta(score);
  const cls = tiers[meta.label] ?? tiers.Danger;

  return (
    <Badge variant="outline" className={cn("rounded-full text-xs", cls)}>
      {meta.label}
    </Badge>
  );
}
