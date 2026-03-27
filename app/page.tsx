import Link from "next/link";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { restaurants } from "@/lib/questions";

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Moyenne réseau</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-brand-orange">15.25 / 20</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Meilleur établissement</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-semibold">Paris 20</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Établissement à risque</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-semibold text-brand-danger">Le Havre</p></CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.name}>
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <CardTitle>{restaurant.name}</CardTitle>
                <ScoreBadge score={restaurant.score} />
              </div>
              <Badge variant="default">Dernier audit : {restaurant.date}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Score</span>
                <span className="font-semibold">{restaurant.score.toFixed(1)} / 20</span>
              </div>
              <Progress value={(restaurant.score / 20) * 100} />
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" disabled>Voir le détail</Button>
                <Link href="/audit"><Button>Lancer un audit</Button></Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
