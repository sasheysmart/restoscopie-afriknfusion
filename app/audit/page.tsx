"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ScoreBadge } from "@/components/ScoreBadge";
import type { Answer } from "@/lib/questions";
import { questions, restaurants } from "@/lib/questions";
import { calculateScore, getScoreMeta, sectionLabel } from "@/lib/scoring";

const sectionOrder = ["experience_client", "technique", "admin_gestion"] as const;
const steps = ["Sélection", "Audit", "Synthèse"] as const;

type Step = 1 | 2 | 3;

export default function AuditPage() {
  const [step, setStep] = useState<Step>(1);
  const [restaurant, setRestaurant] = useState("");
  const [auditor, setAuditor] = useState("");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    experience_client: false,
    technique: false,
    admin_gestion: false,
  });
  const [obsOpen, setObsOpen] = useState<Record<number, boolean>>({});
  const [answers, setAnswers] = useState<Answer[]>(
    questions.map((question) => ({ questionId: question.id, value: null, observation: "" })),
  );

  const score = useMemo(() => calculateScore(questions, answers), [answers]);
  const globalMeta = getScoreMeta(score.global);
  const answeredProgress = (score.totalAnswered / questions.length) * 100;
  const canStart = restaurant.trim().length > 0 && auditor.trim().length > 0;

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

  function sectionQuestionCount(section: string) {
    const total = groupedBySection[section].length;
    const answered = groupedBySection[section].filter((question) => {
      const answer = answerMap.get(question.id)?.value;
      return answer === "oui" || answer === "non";
    }).length;
    return { total, answered };
  }

  function sectionStatus(section: string): "Non démarré" | "En cours" | "Terminé" {
    const count = sectionQuestionCount(section);
    if (count.answered === 0) return "Non démarré";
    if (count.answered === count.total) return "Terminé";
    return "En cours";
  }

  function statusClass(status: "Non démarré" | "En cours" | "Terminé") {
    if (status === "Terminé") return "bg-[#DCFCE7] text-[#16A34A]";
    if (status === "En cours") return "bg-[#FFF7ED] text-[#D4521A]";
    return "bg-[#F3F4F6] text-[#6B7280]";
  }

  const topNon = useMemo(
    () =>
      questions
        .filter((question) => answerMap.get(question.id)?.value === "non")
        .sort((a, b) => b.points - a.points)
        .slice(0, 6),
    [answerMap],
  );

  const topOui = useMemo(
    () =>
      questions
        .filter((question) => answerMap.get(question.id)?.value === "oui")
        .sort((a, b) => a.points - b.points)
        .slice(0, 6),
    [answerMap],
  );

  const recommendations = useMemo(() => {
    const items: string[] = [];
    if ((score.bySection.technique ?? 0) < 14) {
      items.push("Renforcer les procédures de nettoyage et d'hygiène du personnel");
    }
    if ((score.bySection.experience_client ?? 0) < 14) {
      items.push("Former l'équipe aux standards de service Afrik'N'Fusion");
    }
    if ((score.bySection.admin_gestion ?? 0) < 14) {
      items.push("Mettre à jour les documents administratifs et de conformité");
    }
    if (score.global >= 17) {
      items.push("Maintenir le niveau d'excellence actuel");
    }
    if (items.length === 0) items.push("Mettre en place un suivi hebdomadaire ciblé des écarts");
    return items.slice(0, 3);
  }, [score.bySection.admin_gestion, score.bySection.experience_client, score.bySection.technique, score.global]);

  function renderStepper() {
    return (
      <div className="mb-6 flex items-center gap-3">
        {steps.map((label, index) => {
          const stepNumber = (index + 1) as Step;
          const isDone = stepNumber < step;
          const isCurrent = stepNumber === step;
          return (
            <div key={label} className="flex items-center gap-3">
              <div
                className={`flex size-8 items-center justify-center rounded-full text-sm font-semibold ${
                  isDone || isCurrent ? "bg-[#D4521A] text-white" : "bg-[#F3F4F6] text-[#6B7280]"
                }`}
              >
                {index + 1}
              </div>
              <span className={`text-sm ${isCurrent ? "font-semibold text-[#111827]" : "text-[#6B7280]"}`}>
                {label} {isDone ? "✓" : ""}
              </span>
              {index < steps.length - 1 && <div className="h-px w-8 bg-[#E5E7EB]" />}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      {step === 1 && (
        <div className="mx-auto mt-12 max-w-[480px]">
          <Card className="rounded-xl border-[#E5E7EB] bg-[#F9FAFB]">
            <CardHeader className="p-6 pb-2">
              <CardTitle className="text-2xl font-bold text-[#111827]">Nouvel audit</CardTitle>
              <p className="text-sm text-[#6B7280]">Commençons par identifier le restaurant</p>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">Établissement audité</label>
                <select
                  className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm"
                  value={restaurant}
                  onChange={(e) => setRestaurant(e.target.value)}
                >
                  <option value="">Sélectionner un restaurant</option>
                  {restaurants.map((item) => (
                    <option key={item.name} value={item.name}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">Nom de l&apos;auditeur</label>
                <input
                  className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm"
                  value={auditor}
                  onChange={(e) => setAuditor(e.target.value)}
                  placeholder="Ex: Amina D."
                />
              </div>
              <Button
                className="h-11 w-full rounded-lg bg-[#D4521A] text-white hover:bg-[#B54515]"
                disabled={!canStart}
                onClick={() => setStep(2)}
              >
                Commencer l&apos;audit →
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            {renderStepper()}
            <ScrollArea className="h-[calc(100vh-240px)] pr-2">
              <div className="space-y-4">
                {sectionOrder.map((section) => {
                  const counters = sectionQuestionCount(section);
                  const status = sectionStatus(section);
                  const bySubsection = groupedBySection[section].reduce<Record<string, typeof questions>>(
                    (acc, question) => {
                      if (!acc[question.subsection]) acc[question.subsection] = [];
                      acc[question.subsection].push(question);
                      return acc;
                    },
                    {},
                  );

                  return (
                    <Collapsible
                      key={section}
                      open={expandedSections[section]}
                      onOpenChange={(open) => setExpandedSections((prev) => ({ ...prev, [section]: open }))}
                    >
                      <Card className="rounded-xl border-[#E5E7EB] bg-white">
                        <CollapsibleTrigger className="w-full">
                          <CardHeader className="p-6">
                            <div className="flex items-center justify-between gap-4">
                              <div className="text-left">
                                <p className="text-base font-semibold text-[#111827]">{sectionLabel(section)}</p>
                                <p className="mt-1 text-sm text-[#6B7280]">
                                  {counters.answered} / {counters.total} questions
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                <p className="text-sm font-semibold">{score.bySection[section].toFixed(1)} / 20</p>
                                <Badge className={statusClass(status)}>{status}</Badge>
                                {expandedSections[section] ? (
                                  <ChevronUp className="size-4 text-[#6B7280]" />
                                ) : (
                                  <ChevronDown className="size-4 text-[#6B7280]" />
                                )}
                              </div>
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <CardContent className="space-y-4 p-6 pt-0">
                            {Object.entries(bySubsection).map(([subsection, subQuestions]) => (
                              <div key={subsection} className="space-y-3">
                                <div className="rounded-lg bg-[#F3F4F6] px-3 py-2 text-sm font-medium text-[#374151]">
                                  {subsection}
                                </div>
                                {subQuestions.map((question) => {
                                  const answer = answerMap.get(question.id);
                                  const obsIsOpen = obsOpen[question.id];
                                  return (
                                    <div key={question.id} className="rounded-lg border border-[#E5E7EB] p-4">
                                      <div className="flex flex-col gap-3">
                                        <div className="flex items-start justify-between gap-3">
                                          <p className="text-sm text-[#111827]">
                                            Q{question.id}. {question.text}
                                          </p>
                                          <Badge className="bg-[#F3F4F6] text-[#6B7280]">+{question.points} pts</Badge>
                                        </div>
                                        <div className="flex gap-2">
                                          <Button
                                            variant="outline"
                                            className={`rounded-lg ${
                                              answer?.value === "oui"
                                                ? "border-0 bg-[#16A34A] text-white hover:bg-[#15803D]"
                                                : "border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F9FAFB]"
                                            }`}
                                            onClick={() => updateAnswer(question.id, "oui")}
                                          >
                                            OUI
                                          </Button>
                                          <Button
                                            variant="outline"
                                            className={`rounded-lg ${
                                              answer?.value === "non"
                                                ? "border-0 bg-[#DC2626] text-white hover:bg-[#B91C1C]"
                                                : "border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F9FAFB]"
                                            }`}
                                            onClick={() => updateAnswer(question.id, "non")}
                                          >
                                            NON
                                          </Button>
                                        </div>
                                      </div>
                                      <button
                                        className="mt-3 text-sm text-[#6B7280] hover:text-[#D4521A]"
                                        onClick={() => setObsOpen((prev) => ({ ...prev, [question.id]: !prev[question.id] }))}
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
                              </div>
                            ))}
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <Card className="rounded-xl border-[#E5E7EB] bg-[#F9FAFB]">
              <CardHeader className="p-6 pb-2"><CardTitle className="text-base font-semibold">Pilotage en direct</CardTitle></CardHeader>
              <CardContent className="space-y-4 p-6">
                <p className={`text-4xl font-bold ${globalMeta.colorClass}`}>{score.global.toFixed(1)} / 20</p>
                <ScoreBadge score={score.global} />
                <Progress value={answeredProgress} />
                <p className="text-sm text-[#6B7280]">{score.totalAnswered} / 355 questions répondues</p>
                <Separator />
                <div className="space-y-2 text-sm">
                  <p>Expérience Client: {(score.bySection.experience_client ?? 0).toFixed(1)}/20</p>
                  <p>Tenue Technique: {(score.bySection.technique ?? 0).toFixed(1)}/20</p>
                  <p>Admin & Gestion: {(score.bySection.admin_gestion ?? 0).toFixed(1)}/20</p>
                </div>
                <Button
                  className="w-full rounded-lg bg-[#D4521A] text-white hover:bg-[#B54515]"
                  disabled={score.totalAnswered < 1}
                  onClick={() => setStep(3)}
                >
                  Voir la synthèse →
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          {renderStepper()}
          <button className="text-sm font-medium text-[#D4521A]" onClick={() => setStep(2)}>
            ← Retourner à l&apos;audit
          </button>
          <Card className="rounded-xl border-[#E5E7EB] bg-[#F9FAFB]">
            <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6">
              <div>
                <p className="text-lg font-semibold">{restaurant}</p>
                <p className="text-sm text-[#6B7280]">
                  Auditeur : {auditor} · Date : {new Date().toLocaleDateString("fr-FR")}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-5xl font-bold ${globalMeta.colorClass}`}>{score.global.toFixed(1)} / 20</p>
                <ScoreBadge score={score.global} />
              </div>
            </CardContent>
          </Card>
          <section className="grid gap-4 md:grid-cols-2">
            <Card className="rounded-xl border-[#E5E7EB] bg-white">
              <CardHeader className="p-6 pb-2"><CardTitle className="text-base">Points forts (⭐)</CardTitle></CardHeader>
              <CardContent className="space-y-2 p-6 pt-0 text-sm">
                {topOui.map((item) => <p key={item.id}>- {item.text}</p>)}
              </CardContent>
            </Card>
            <Card className="rounded-xl border-[#E5E7EB] bg-white">
              <CardHeader className="p-6 pb-2"><CardTitle className="text-base">Points à améliorer (⚠)</CardTitle></CardHeader>
              <CardContent className="space-y-2 p-6 pt-0 text-sm">
                {topNon.map((item) => <p key={item.id}>- {item.text} ({item.points} pts)</p>)}
              </CardContent>
            </Card>
            <Card className="rounded-xl border-[#E5E7EB] bg-white">
              <CardHeader className="p-6 pb-2"><CardTitle className="text-base">Recommandations (💡)</CardTitle></CardHeader>
              <CardContent className="space-y-2 p-6 pt-0 text-sm">
                {recommendations.map((item) => <p key={item}>- {item}</p>)}
              </CardContent>
            </Card>
            <Card className="rounded-xl border-[#E5E7EB] bg-white">
              <CardHeader className="p-6 pb-2"><CardTitle className="text-base">Conclusion (✅)</CardTitle></CardHeader>
              <CardContent className="space-y-2 p-6 pt-0 text-sm">
                <p>L&apos;audit affiche un niveau {globalMeta.label.toLowerCase()} avec un score global de {score.global.toFixed(1)} / 20.</p>
                <p>Le prochain cycle doit prioriser les axes critiques tout en consolidant les standards maîtrisés.</p>
              </CardContent>
            </Card>
          </section>
        </div>
      )}
    </div>
  );
}
