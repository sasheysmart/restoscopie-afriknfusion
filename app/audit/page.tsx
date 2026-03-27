"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { Answer } from "@/lib/questions";
import { questions, restaurants } from "@/lib/questions";
import { calculateScore, sectionLabel } from "@/lib/scoring";
import { cn } from "@/lib/utils";

const sectionOrder = ["experience_client", "technique", "admin_gestion"] as const;

type Step = 1 | 2;

export default function AuditPage() {
  const router = useRouter();
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
  const canStart = restaurant.trim().length > 0 && auditor.trim().length > 0;

  const groupedBySection = useMemo(() => {
    const grouped: Record<string, typeof questions> = {};
    for (const question of questions) {
      if (!grouped[question.section]) grouped[question.section] = [];
      grouped[question.section].push(question);
    }
    return grouped;
  }, []);

  const sections = useMemo(() => {
    return sectionOrder.map((section) => {
      const bySubsection = groupedBySection[section].reduce<Record<string, typeof questions>>(
        (acc, question) => {
          if (!acc[question.subsection]) acc[question.subsection] = [];
          acc[question.subsection].push(question);
          return acc;
        },
        {},
      );

      const subsections = Object.entries(bySubsection).map(([name, qs]) => ({
        name,
        questions: qs,
      }));

      const shortName =
        section === "experience_client"
          ? "Expérience"
          : section === "technique"
            ? "Technique"
            : "Admin";

      return {
        id: section,
        name: sectionLabel(section),
        shortName,
        subsections,
      };
    });
  }, [groupedBySection]);

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

  function statusBadgeVariant(status: "Non démarré" | "En cours" | "Terminé") {
    if (status === "Terminé") return "default" as const;
    return "secondary" as const;
  }

  function goToResults() {
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
    <PageShell title="Nouvel audit">
      {step === 1 && (
        <div className="flex min-h-[60vh] items-center justify-center">
          <Card className="w-[480px]">
            <CardHeader>
              <CardTitle>Nouvel audit</CardTitle>
              <CardDescription>Commençons par identifier le restaurant à auditer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Établissement audité</label>
                <Select
                  value={restaurant}
                  onValueChange={(value) => setRestaurant(value ?? "")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un restaurant" />
                  </SelectTrigger>
                  <SelectContent>
                    {restaurants.map((r) => (
                      <SelectItem key={r.name} value={r.name}>
                        {r.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nom de l&apos;auditeur</label>
                <Input
                  placeholder="Ex: Aminata D."
                  value={auditor}
                  onChange={(e) => setAuditor(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={!canStart}
                onClick={() => setStep(2)}
              >
                Commencer l&apos;audit →
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="mb-6 flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Check className="h-4 w-4 text-primary" />
              Sélection
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-primary">
              Audit
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Synthèse</span>
          </div>

          <div className="flex gap-6">
            <div className="flex-1 space-y-3">
              {sections.map((section) => {
                const counters = sectionQuestionCount(section.id);
                const status = sectionStatus(section.id);
                const sectionScore = score.bySection[section.id] ?? 0;

                return (
                  <Collapsible
                    key={section.id}
                    open={expandedSections[section.id]}
                    onOpenChange={(open) =>
                      setExpandedSections((prev) => ({ ...prev, [section.id]: open }))
                    }
                  >
                    <Card>
                      <CollapsibleTrigger className="w-full text-left">
                        <CardHeader className="cursor-pointer rounded-t-lg transition-colors hover:bg-muted/50">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 text-muted-foreground transition-transform",
                                  expandedSections[section.id] && "rotate-180",
                                )}
                              />
                              <CardTitle className="text-sm font-semibold">{section.name}</CardTitle>
                              <Badge variant={statusBadgeVariant(status)}>{status}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>
                                {counters.answered}/{counters.total} rép.
                              </span>
                              <span className="font-semibold text-foreground">{sectionScore.toFixed(1)} / 20</span>
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <CardContent className="space-y-6 pt-0">
                          {section.subsections.map((sub) => (
                            <div key={sub.name}>
                              <div className="mb-4 border-b py-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                                {sub.name}
                              </div>
                              <div className="space-y-4">
                                {sub.questions.map((q) => {
                                  const answer = answerMap.get(q.id);
                                  return (
                                    <div key={q.id} className="flex items-start justify-between gap-4">
                                      <div className="flex-1">
                                        <p className="text-sm">{q.text}</p>
                                        <Collapsible
                                          open={obsOpen[q.id]}
                                          onOpenChange={(open) =>
                                            setObsOpen((prev) => ({ ...prev, [q.id]: open }))
                                          }
                                        >
                                          <CollapsibleTrigger className="mt-1 text-xs text-muted-foreground hover:text-foreground">
                                            + Observation
                                          </CollapsibleTrigger>
                                          <CollapsibleContent>
                                            <Textarea
                                              className="mt-2 h-16 text-xs"
                                              placeholder="Ajouter une note..."
                                              value={answer?.observation ?? ""}
                                              onChange={(e) => updateObservation(q.id, e.target.value)}
                                            />
                                          </CollapsibleContent>
                                        </Collapsible>
                                      </div>
                                      <div className="flex shrink-0 items-center gap-2">
                                        <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                                          +{q.points}
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => updateAnswer(q.id, "oui")}
                                          className={cn(
                                            "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                                            answer?.value === "oui"
                                              ? "border-primary bg-primary text-primary-foreground"
                                              : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground",
                                          )}
                                        >
                                          Oui
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => updateAnswer(q.id, "non")}
                                          className={cn(
                                            "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                                            answer?.value === "non"
                                              ? "border-foreground bg-foreground text-background"
                                              : "border-border bg-background text-muted-foreground hover:border-foreground/50 hover:text-foreground",
                                          )}
                                        >
                                          Non
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                );
              })}
            </div>

            <div className="w-72 shrink-0">
              <div className="sticky top-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Pilotage en direct</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-5xl font-bold tabular-nums text-primary">
                        {score.global.toFixed(1)}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">/20</div>
                      <div className="mt-2 flex justify-center">
                        <ScoreBadge score={score.global} />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progression</span>
                        <span>
                          {score.totalAnswered} / 355
                        </span>
                      </div>
                      <Progress
                        value={(score.totalAnswered / 355) * 100}
                        className="h-1.5"
                      />
                    </div>
                    <Separator />
                    <div className="space-y-2 text-sm">
                      {sections.map((s) => (
                        <div key={s.id} className="flex justify-between">
                          <span className="text-xs text-muted-foreground">{s.shortName}</span>
                          <span className="text-xs font-medium">
                            {(score.bySection[s.id] ?? 0).toFixed(1)}/20
                          </span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="w-full"
                      size="sm"
                      onClick={goToResults}
                      disabled={score.totalAnswered === 0}
                    >
                      Voir la synthèse →
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
