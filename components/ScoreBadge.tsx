import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getScoreMeta } from "@/lib/scoring";

export function ScoreBadge({ score }: { score: number }) {
  const meta = getScoreMeta(score);
  const tierClass =
    meta.label === "Excellent"
      ? "badge-score-excellent"
      : meta.label === "Bien"
        ? "badge-score-good"
        : meta.label === "Moyen"
          ? "badge-score-mid"
          : "badge-score-low";

  return (
    <Badge variant="default" className={cn("rounded-full", tierClass)}>
      {meta.label}
    </Badge>
  );
}
