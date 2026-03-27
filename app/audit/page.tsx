"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { Answer } from "@/lib/questions";
import { questions, restaurants } from "@/lib/questions";
import { calculateScore, getScoreMeta, sectionLabel } from "@/lib/scoring";

const sectionOrder = ["experience_client", "technique", "admin_gestion"] as const;

export default function AuditPage() {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState("");
  const [auditor, setAuditor] = useState("");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    experience_client: true,
    technique: true,
    admin_gestion: true,
  });
  const [obsOpen, setObsOpen] = useState<Record<number, boolean>>({});
  const [answers, setAnswers] = useState<Answer[]>(
    questions.map((question) => ({ questionId: question.id, value: null, observation: "" })),
  );

  const score = useMemo(() => calculateScore(questions, answers), [answers]);
  const globalMeta = getScoreMeta(score.global);
  const answeredProgress = (score.totalAnswered / questions.length) * 100;

  const groupedBySection = useMemo(() => {
    const grouped: Record<string, typeof questions> = {};
    for (const question of questions) {
      if (!grouped[question.section]) grouped[question.section] = [];
      grouped[question.section].push(question);
    }
    return grouped;
  }, []);

  const answerMap = useMemo(() => new Map(answers.map((answer) => [answer.questionId, answer])), [answers]);

  function updateAnswer(questionId: number, value: "oui" | "non" | null) {
    setAnswers((prev) =>
      prev.map((answer) => (answer.questionId === questionId ? { ...answer, value } : answer)),
    );
  }

  function updateObservation(questionId: number, observation: string) {
    setAnswers((prev) =>
      prev.map((answer) => (answer.questionId === questionId ? { ...answer, observation } : answer)),
    );
  }

  function goToResults() {
    if (score.totalAnswered < 1) return;
    const payload = {
      restaurant,
      auditor,
      date: new Date().toLocaleDateString("fr-FR"),
      answers,
    };
    sessionStorage.setItem("restoscopie-audit", JSON.stringify(payload));
    router.push("/audit/results");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="space-y-4">
        <Card>
          <CardHeader><CardTitle>Nouvel audit</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Établissement audité</label>
              <select
                className="h-10 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm"
                value={restaurant}
                onChange={(e) => setRestaurant(e.target.value)}
              >
                <option value="">Sélectionner un restaurant</option>
                {restaurants.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom de l'auditeur</label>
              <input
                className="h-10 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm"
                placeholder="Ex: Aminata D."
                value={auditor}
                onChange={(e) => setAuditor(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <ScrollArea className="h-[calc(100vh-220px)] pr-2">
          <div className="space-y-4">
            {sectionOrder.map((section) => (
              <Card key={section}>
                <CardHeader className="sticky top-0 z-10 rounded-t-2xl border-b border-zinc-100 bg-white">
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle>{sectionLabel(section)}</CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        {score.bySection[section]?.toFixed(1) ?? "0.0"} / 20
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
                        }
                      >
                        {expandedSections[section] ? "Réduire" : "Afficher"}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {expandedSections[section] && (
                  <CardContent className="space-y-4 pt-6">
                    {groupedBySection[section].map((question) => {
                      const answer = answerMap.get(question.id);
                      const obsIsOpen = obsOpen[question.id];
                      return (
                        <div key={question.id} className="rounded-xl border border-zinc-200 p-4">
                          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                            <div className="space-y-1">
                              <p className="font-medium">
                                Q{question.id}. {question.text}
                              </p>
                              <p className="text-xs text-zinc-500">{question.subsection} · {question.points} pts</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant={answer?.value === "oui" ? "default" : "outline"}
                                className={answer?.value === "oui" ? "bg-brand-orange text-white" : ""}
                                onClick={() => updateAnswer(question.id, "oui")}
                              >
                                OUI
                              </Button>
                              <Button
                                variant={answer?.value === "non" ? "destructive" : "outline"}
                                onClick={() => updateAnswer(question.id, "non")}
                              >
                                NON
                              </Button>
                            </div>
                          </div>
                          <button
                            className="mt-3 text-sm text-zinc-500 hover:text-brand-orange"
                            onClick={() =>
                              setObsOpen((prev) => ({ ...prev, [question.id]: !prev[question.id] }))
                            }
                          >
                            Ajouter une observation {obsIsOpen ? "▴" : "▾"}
                          </button>
                          {obsIsOpen && (
                            <div className="mt-2">
                              <Textarea
                                placeholder="Ajouter une observation..."
                                value={answer?.observation ?? ""}
                                onChange={(e) => updateObservation(question.id, e.target.value)}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <Card>
          <CardHeader><CardTitle>Pilotage en direct</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className={`text-4xl font-bold ${globalMeta.colorClass}`}>{score.global.toFixed(1)} / 20</p>
            <p className="text-sm font-medium">{globalMeta.label}</p>
            <p className="text-xs text-zinc-500">{globalMeta.message}</p>
            <Separator />
            <Progress value={answeredProgress} />
            <p className="text-sm">
              {score.totalAnswered} questions répondues sur 355
            </p>
            <Button className="w-full" disabled={score.totalAnswered < 1} onClick={goToResults}>
              Voir la synthèse
            </Button>
          </CardContent>
        </Card>
      </aside>

      <button
        className="fixed bottom-5 right-5 rounded-full bg-brand-orange px-3 py-2 text-xs font-semibold text-white shadow-soft"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Haut de page
      </button>
    </div>
  );
}
