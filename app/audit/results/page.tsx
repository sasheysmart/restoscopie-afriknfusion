"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { toast } from "sonner";
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
import { Separator } from "@/components/ui/separator";
import type { Answer } from "@/lib/questions";
import { questions } from "@/lib/questions";
import { calculateScore, getScoreMeta } from "@/lib/scoring";
import { cn } from "@/lib/utils";

type AuditPayload = {
  restaurant: string;
  auditor: string;
  date: string;
  answers: Answer[];
};

function scoreValueClass(score: number) {
  if (score >= 17) return "text-score-excellent";
  if (score >= 15) return "text-score-good";
  if (score >= 13) return "text-score-mid";
  return "text-score-low";
}

function getProgressVar(score: number) {
  if (score >= 17) return "var(--progress-excellent)";
  if (score >= 15) return "var(--progress-good)";
  if (score >= 13) return "var(--progress-mid)";
  return "var(--progress-low)";
}

export default function ResultsPage() {
  const [payload, setPayload] = useState<AuditPayload | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("restoscopie-audit");
    if (!raw) return;
    setPayload(JSON.parse(raw) as AuditPayload);
  }, []);

  const score = useMemo(
    () => calculateScore(questions, payload?.answers ?? []),
    [payload?.answers],
  );
  const globalMeta = getScoreMeta(score.global);

  const answerMap = useMemo(
    () => new Map((payload?.answers ?? []).map((answer) => [answer.questionId, answer])),
    [payload?.answers],
  );

  const donut = useMemo(() => {
    const answers = payload?.answers ?? [];
    let ok = 0;
    let moyen = 0;
    let non = 0;
    for (const answer of answers) {
      if (answer.value === "oui") ok += 1;
      if (answer.value === "non") non += 1;
      if (answer.value === null) moyen += 1;
    }
    const total = answers.length || 1;
    return {
      ok: Math.round((ok / total) * 100),
      moyen: Math.round((moyen / total) * 100),
      non: Math.round((non / total) * 100),
    };
  }, [payload?.answers]);

  const synthese = useMemo(() => {
    const sortedNon = questions
      .filter((question) => answerMap.get(question.id)?.value === "non")
      .sort((a, b) => b.points - a.points)
      .slice(0, 5);
    const sortedOui = questions
      .filter((question) => answerMap.get(question.id)?.value === "oui")
      .sort((a, b) => a.points - b.points)
      .slice(0, 5);

    const recos: string[] = [];
    if ((score.bySection.experience_client ?? 0) < 14) {
      recos.push("Former l'équipe aux standards de service Afrik'N'Fusion");
    }
    if ((score.bySection.technique ?? 0) < 14) {
      recos.push("Renforcer les procédures de nettoyage et d'hygiène du personnel");
    }
    if ((score.bySection.admin_gestion ?? 0) < 14) {
      recos.push("Mettre à jour les documents administratifs et de conformité");
    }
    if (score.global >= 17) {
      recos.push("Maintenir le niveau d'excellence actuel");
    }
    if (recos.length === 0) {
      recos.push("Consolider les routines de contrôle hebdomadaire pour sécuriser la performance");
    }

    return { sortedNon, sortedOui, recos: recos.slice(0, 3) };
  }, [answerMap, score]);

  return (
    <PageShell title="Synthèse">
      <div className="space-y-6">
        <Link
          href="/audit"
          className="inline-flex text-sm text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          ← Retourner à l&apos;audit
        </Link>

        <div className="flex items-center gap-2 text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Check className="h-4 w-4" style={{ color: "var(--success)" }} />
            Sélection
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Check className="h-4 w-4" style={{ color: "var(--success)" }} />
            Audit
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium" style={{ color: "var(--brand)" }}>
            Synthèse
          </span>
        </div>

        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="text-center">
              <p className="text-lg font-semibold">{payload?.restaurant || "Restaurant non renseigné"}</p>
              <p className="text-sm text-muted-foreground">
                Auditeur : {payload?.auditor || "N/A"} · Date :{" "}
                {payload?.date || new Date().toLocaleDateString("fr-FR")}
              </p>
            </div>
            <Separator />
            <div className="text-center">
              <div className={cn("text-5xl font-bold tabular-nums", scoreValueClass(score.global))}>
                {score.global.toFixed(1)}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">/20</div>
              <div className="mt-3 flex justify-center">
                <ScoreBadge score={score.global} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{globalMeta.message}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition</CardTitle>
            <CardDescription>Scores par grande partie</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Expérience Client</span>
                <span className="font-medium">{(score.bySection.experience_client ?? 0).toFixed(1)}/20</span>
              </div>
              <Progress
                value={((score.bySection.experience_client ?? 0) / 20) * 100}
                className="h-2"
                style={
                  {
                    "--progress-color": getProgressVar(score.bySection.experience_client ?? 0),
                  } as React.CSSProperties
                }
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tenue Technique</span>
                <span className="font-medium">{(score.bySection.technique ?? 0).toFixed(1)}/20</span>
              </div>
              <Progress
                value={((score.bySection.technique ?? 0) / 20) * 100}
                className="h-2"
                style={
                  {
                    "--progress-color": getProgressVar(score.bySection.technique ?? 0),
                  } as React.CSSProperties
                }
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Admin & Gestion</span>
                <span className="font-medium">{(score.bySection.admin_gestion ?? 0).toFixed(1)}/20</span>
              </div>
              <Progress
                value={((score.bySection.admin_gestion ?? 0) / 20) * 100}
                className="h-2"
                style={
                  {
                    "--progress-color": getProgressVar(score.bySection.admin_gestion ?? 0),
                  } as React.CSSProperties
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition des réponses</CardTitle>
            <CardDescription>Vue synthétique</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              Conforme (Oui) : <span className="font-semibold">{donut.ok}%</span>
            </p>
            <p>
              Sans réponse : <span className="font-semibold">{donut.moyen}%</span>
            </p>
            <p>
              Non conforme (Non) : <span className="font-semibold">{donut.non}%</span>
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Points forts (⭐)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {synthese.sortedOui.map((item) => (
                <p key={item.id}>- {item.text}</p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Points à améliorer (⚠)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {synthese.sortedNon.map((item) => (
                <p key={item.id}>
                  - {item.text} ({item.points} pts)
                </p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recommandations (💡)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {synthese.recos.map((item) => (
                <p key={item}>- {item}</p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Conclusion (✅)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                L&apos;audit met en évidence un niveau <strong>{globalMeta.label.toLowerCase()}</strong> avec un score
                global de {score.global.toFixed(1)} / 20.
              </p>
              <p>
                La priorité est de sécuriser les points critiques identifiés tout en consolidant les pratiques déjà
                maîtrisées.
              </p>
            </CardContent>
          </Card>
        </div>

        <Button
          className="w-full"
          onClick={() => toast.success("Rapport PDF généré et envoyé par email ✓")}
          style={{ backgroundColor: "var(--brand)", color: "var(--brand-foreground)" }}
        >
          Générer le rapport
        </Button>

        <div className="flex justify-center">
          <Link
            href="/"
            className="text-sm text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
