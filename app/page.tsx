import Link from "next/link";
import { AlertTriangle, Star, TrendingUp } from "lucide-react";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { restaurants } from "@/lib/questions";
import { getScoreMeta } from "@/lib/scoring";

const stats = [
  { label: "Moyenne réseau", value: "15.25 / 20", icon: TrendingUp, color: "text-[#2563EB]" },
  { label: "Meilleur établissement", value: "Paris 20", icon: Star, color: "text-[#16A34A]" },
  { label: "Établissement à risque", value: "Le Havre", icon: AlertTriangle, color: "text-[#DC2626]" },
];

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="rounded-xl border-[#E5E7EB] bg-[#F9FAFB]">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Icon className={`size-4 ${stat.color}`} />
                  <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">{stat.label}</p>
                </div>
                <p className="text-3xl font-bold text-[#111827]">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.name} className="rounded-xl border-[#E5E7EB] bg-white hover:shadow-sm">
            <CardHeader className="space-y-3 p-6">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-base font-semibold text-[#111827]">{restaurant.name}</CardTitle>
                <div className="text-right">
                  <p className={`text-xl font-bold ${getScoreMeta(restaurant.score).colorClass}`}>
                    {restaurant.score.toFixed(1)}
                  </p>
                  <p className="text-xs text-[#6B7280]">/20</p>
                </div>
              </div>
              <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                Dernier audit : {restaurant.date}
              </p>
            </CardHeader>
            <CardContent className="space-y-4 p-6 pt-0">
              <ScoreBadge score={restaurant.score} />
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Score de conformité</span>
                <span className="font-semibold">{restaurant.score.toFixed(1)} / 20</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#E5E7EB]">
                <div
                  className={`h-2 rounded-full ${
                    restaurant.score >= 17
                      ? "bg-[#16A34A]"
                      : restaurant.score >= 15
                        ? "bg-[#2563EB]"
                        : restaurant.score >= 13
                          ? "bg-[#D97706]"
                          : "bg-[#DC2626]"
                  }`}
                  style={{ width: `${(restaurant.score / 20) * 100}%` }}
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="rounded-lg border-[#E5E7EB]">
                  Voir le détail
                </Button>
                <Link href="/audit">
                  <Button className="rounded-lg bg-[#D4521A] text-white hover:bg-[#B54515]">
                    Lancer un audit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
