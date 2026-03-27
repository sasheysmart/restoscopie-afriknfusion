import { Badge } from "@/components/ui/badge";
import { getScoreMeta } from "@/lib/scoring";

export function ScoreBadge({ score }: { score: number }) {
  const meta = getScoreMeta(score);
  const classes =
    meta.label === "Excellent"
      ? "bg-[#DCFCE7] text-[#16A34A]"
      : meta.label === "Bien"
        ? "bg-[#DBEAFE] text-[#2563EB]"
        : meta.label === "Moyen"
          ? "bg-[#FEF3C7] text-[#D97706]"
          : "bg-[#FEE2E2] text-[#DC2626]";

  return <Badge className={classes}>{meta.label}</Badge>;
}
