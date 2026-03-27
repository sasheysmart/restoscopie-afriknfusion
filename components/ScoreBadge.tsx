import { Badge } from "@/components/ui/badge";
import { getScoreMeta } from "@/lib/scoring";

export function ScoreBadge({ score }: { score: number }) {
  const meta = getScoreMeta(score);
  return <Badge variant={meta.variant}>{meta.label}</Badge>;
}
