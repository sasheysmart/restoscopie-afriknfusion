import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { restaurants } from "@/lib/questions";
import { cn } from "@/lib/utils";

function getScoreColor(score: number) {
  if (score >= 17) return "var(--progress-excellent)";
  if (score >= 15) return "var(--progress-good)";
  if (score >= 13) return "var(--progress-mid)";
  return "var(--progress-low)";
}

function scoreValueClass(score: number) {
  if (score >= 17) return "text-score-excellent";
  if (score >= 15) return "text-score-good";
  if (score >= 13) return "text-score-mid";
  return "text-score-low";
}

export default function Home() {
  return (
    <PageShell title="Tableau de bord">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Moyenne réseau</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "var(--brand)" }}>
              15.25 / 20
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Meilleur établissement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "var(--success)" }}>
              Paris 20
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Établissement à risque</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">Le Havre</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {restaurants.map((r) => (
          <Card key={r.name} className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-base">{r.name}</CardTitle>
                <ScoreBadge score={r.score} />
              </div>
              <CardDescription>Dernier audit : {r.date}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Score</span>
                  <span className={cn("font-semibold", scoreValueClass(r.score))}>
                    {r.score} / 20
                  </span>
                </div>
                <Progress
                  value={(r.score / 20) * 100}
                  className="h-2"
                  style={{ "--progress-color": getScoreColor(r.score) } as React.CSSProperties}
                />
              </div>
              <div className="flex gap-2 pt-1">
                <Button variant="outline" size="sm" className="flex-1">
                  Voir le détail
                </Button>
                <Link href="/audit" className="flex-1">
                  <Button
                    size="sm"
                    className="w-full"
                    style={{ backgroundColor: "var(--brand)", color: "var(--brand-foreground)" }}
                  >
                    Lancer un audit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
