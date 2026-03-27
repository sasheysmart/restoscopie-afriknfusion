import type { Answer, Question } from "@/lib/questions";

export function calculateScore(questions: Question[], answers: Answer[]): {
  global: number;
  bySection: Record<string, number>;
  totalAnswered: number;
  totalQuestions: number;
} {
  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer]));
  const totals: Record<string, { yesPoints: number; maxPoints: number }> = {
    experience_client: { yesPoints: 0, maxPoints: 0 },
    technique: { yesPoints: 0, maxPoints: 0 },
    admin_gestion: { yesPoints: 0, maxPoints: 0 },
  };

  let globalYesPoints = 0;
  let globalMaxPoints = 0;
  let totalAnswered = 0;

  for (const question of questions) {
    const answer = answerMap.get(question.id);
    const isYes = answer?.value === "oui";
    const isAnswered = answer?.value === "oui" || answer?.value === "non";

    if (isAnswered) totalAnswered += 1;

    totals[question.section].maxPoints += question.points;
    globalMaxPoints += question.points;

    if (isYes) {
      totals[question.section].yesPoints += question.points;
      globalYesPoints += question.points;
    }
  }

  const bySection = Object.fromEntries(
    Object.entries(totals).map(([sectionKey, sectionValue]) => {
      const sectionScore = sectionValue.maxPoints
        ? (sectionValue.yesPoints / sectionValue.maxPoints) * 20
        : 0;
      return [sectionKey, round1(sectionScore)];
    }),
  );

  const global = globalMaxPoints ? round1((globalYesPoints / globalMaxPoints) * 20) : 0;

  return {
    global,
    bySection,
    totalAnswered,
    totalQuestions: questions.length,
  };
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

export function getScoreMeta(score: number): {
  label: "Excellent" | "Bien" | "Moyen" | "Danger";
  message: string;
  colorClass: string;
  variant: "success" | "info" | "warning" | "danger";
} {
  if (score >= 17) {
    return {
      label: "Excellent",
      message: "Félicitations, maintenez la pression !",
      colorClass: "text-brand-success",
      variant: "success",
    };
  }
  if (score >= 15) {
    return {
      label: "Bien",
      message: "Bonne maîtrise, quelques insuffisances",
      colorClass: "text-blue-700",
      variant: "info",
    };
  }
  if (score >= 13) {
    return {
      label: "Moyen",
      message: "Des efforts encore à faire",
      colorClass: "text-amber-700",
      variant: "warning",
    };
  }
  return {
    label: "Danger",
    message: "Risque sur le contrat de franchise",
    colorClass: "text-brand-danger",
    variant: "danger",
  };
}

export function sectionLabel(section: string): string {
  if (section === "experience_client") return "Expérience Client";
  if (section === "technique") return "Tenue Technique";
  return "Admin & Gestion";
}
