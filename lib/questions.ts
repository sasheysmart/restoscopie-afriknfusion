export type Question = {
  id: number;
  text: string;
  points: number;
  section: "experience_client" | "technique" | "admin_gestion";
  subsection: string;
};

export type Answer = {
  questionId: number;
  value: "oui" | "non" | null;
  observation: string;
};

export const restaurants = [
  { name: "Afrik'N'Fusion Paris 20", score: 17.2, date: "15 mars 2026" },
  { name: "Afrik'N'Fusion Casablanca", score: 14.8, date: "2 mars 2026" },
  { name: "Afrik'N'Fusion Le Havre", score: 12.9, date: "28 fév 2026" },
  { name: "Afrik'N'Fusion Cergy", score: 16.1, date: "20 mars 2026" },
] as const;

const baseQuestions: Question[] = [
  { id: 1, text: "La façade est propre et attrayante", points: 5, section: "experience_client", subsection: "1.1 Image Externe & E-Réputation" },
  { id: 2, text: "L'enseigne lumineuse est visible et en bon état", points: 5, section: "experience_client", subsection: "1.1 Image Externe & E-Réputation" },
  { id: 3, text: "La vitrine est propre et bien présentée", points: 5, section: "experience_client", subsection: "1.1 Image Externe & E-Réputation" },
  { id: 4, text: "Les horaires d'ouverture sont affichés", points: 5, section: "experience_client", subsection: "1.1 Image Externe & E-Réputation" },
  { id: 5, text: "La note Google est ≥ 4/5", points: 5, section: "experience_client", subsection: "1.1 Image Externe & E-Réputation" },
  { id: 6, text: "Les avis négatifs récents sont traités", points: 5, section: "experience_client", subsection: "1.1 Image Externe & E-Réputation" },
  { id: 7, text: "La présence sur les réseaux sociaux est active", points: 5, section: "experience_client", subsection: "1.1 Image Externe & E-Réputation" },
  { id: 8, text: "Les informations en ligne (adresse, horaires) sont correctes", points: 5, section: "experience_client", subsection: "1.1 Image Externe & E-Réputation" },
  { id: 9, text: "La terrasse ou devanture est propre", points: 5, section: "experience_client", subsection: "1.2 Extérieurs & Façade" },
  { id: 10, text: "Le mobilier extérieur est en bon état", points: 4, section: "experience_client", subsection: "1.2 Extérieurs & Façade" },
  { id: 11, text: "Les poubelles extérieures sont propres et non débordantes", points: 4, section: "experience_client", subsection: "1.2 Extérieurs & Façade" },
  { id: 12, text: "L'éclairage extérieur fonctionne", points: 5, section: "experience_client", subsection: "1.2 Extérieurs & Façade" },
  { id: 13, text: "Le sol devant l'entrée est propre", points: 5, section: "experience_client", subsection: "1.2 Extérieurs & Façade" },
  { id: 14, text: "La porte d'entrée est propre (vitres, poignées)", points: 4, section: "experience_client", subsection: "1.2 Extérieurs & Façade" },
  { id: 15, text: "Le parking ou abords sont entretenus", points: 4, section: "experience_client", subsection: "1.2 Extérieurs & Façade" },
  { id: 16, text: "La signalétique directionnelle est visible", points: 4, section: "experience_client", subsection: "1.2 Extérieurs & Façade" },
  { id: 17, text: "Les points lumineux de façade sont en état", points: 4, section: "experience_client", subsection: "1.2 Extérieurs & Façade" },
  { id: 18, text: "La salle est propre à l'ouverture", points: 5, section: "experience_client", subsection: "1.3 Intérieurs Salle" },
  { id: 19, text: "Les tables sont nettoyées entre chaque service", points: 5, section: "experience_client", subsection: "1.3 Intérieurs Salle" },
  { id: 20, text: "Les chaises sont en bon état", points: 4, section: "experience_client", subsection: "1.3 Intérieurs Salle" },
  { id: 21, text: "Le sol est propre en permanence", points: 5, section: "experience_client", subsection: "1.3 Intérieurs Salle" },
  { id: 22, text: "Les murs et plafonds sont propres", points: 4, section: "experience_client", subsection: "1.3 Intérieurs Salle" },
  { id: 23, text: "La décoration est cohérente avec l'identité de la marque", points: 5, section: "experience_client", subsection: "1.3 Intérieurs Salle" },
  { id: 24, text: "La musique d'ambiance est adaptée", points: 3, section: "experience_client", subsection: "1.3 Intérieurs Salle" },
  { id: 25, text: "La température de la salle est agréable", points: 4, section: "experience_client", subsection: "1.3 Intérieurs Salle" },
  { id: 26, text: "Les toilettes sont propres et approvisionnées", points: 5, section: "experience_client", subsection: "1.3 Intérieurs Salle" },
  { id: 27, text: "Les toilettes sont contrôlées régulièrement", points: 5, section: "experience_client", subsection: "1.3 Intérieurs Salle" },
  { id: 28, text: "La carte/menu est lisible et propre", points: 4, section: "experience_client", subsection: "1.3 Intérieurs Salle" },
  { id: 29, text: "L'affichage des prix est visible et conforme", points: 5, section: "experience_client", subsection: "1.3 Intérieurs Salle" },
  { id: 30, text: "La caisse est rangée et organisée", points: 4, section: "experience_client", subsection: "1.3 Intérieurs Salle" },
  { id: 31, text: "Le personnel porte une tenue propre et complète", points: 5, section: "experience_client", subsection: "1.4 Hygiène du Personnel" },
  { id: 32, text: "Les cheveux sont attachés ou couverts", points: 5, section: "experience_client", subsection: "1.4 Hygiène du Personnel" },
  { id: 33, text: "Le port de gants est respecté en cuisine", points: 5, section: "experience_client", subsection: "1.4 Hygiène du Personnel" },
  { id: 34, text: "Le lavage des mains est régulier", points: 5, section: "experience_client", subsection: "1.4 Hygiène du Personnel" },
  { id: 35, text: "Les bijoux sont retirés en cuisine", points: 5, section: "experience_client", subsection: "1.4 Hygiène du Personnel" },
  { id: 36, text: "Le personnel ne manipule pas téléphone et aliments simultanément", points: 5, section: "experience_client", subsection: "1.4 Hygiène du Personnel" },
  { id: 37, text: "Les tenues sont changées en cas de salissure", points: 5, section: "experience_client", subsection: "1.4 Hygiène du Personnel" },
  { id: 38, text: "Le personnel est formé aux bonnes pratiques d'hygiène", points: 5, section: "experience_client", subsection: "1.4 Hygiène du Personnel" },
  { id: 39, text: "Le carnet sanitaire est à jour", points: 5, section: "experience_client", subsection: "1.4 Hygiène du Personnel" },
  { id: 40, text: "Aucun signe de maladie chez les personnes en contact alimentaire", points: 5, section: "experience_client", subsection: "1.4 Hygiène du Personnel" },
  { id: 41, text: "Les chaussures de sécurité sont portées en cuisine", points: 5, section: "experience_client", subsection: "1.4 Hygiène du Personnel" },
  { id: 42, text: "L'hygiène globale du personnel est satisfaisante", points: 5, section: "experience_client", subsection: "1.4 Hygiène du Personnel" },
  { id: 43, text: "Le client est accueilli en moins de 30 secondes", points: 5, section: "experience_client", subsection: "1.5 Qualité de Service Salle" },
  { id: 44, text: "Le personnel sourit et est courtois", points: 5, section: "experience_client", subsection: "1.5 Qualité de Service Salle" },
  { id: 45, text: "La prise de commande est rapide et précise", points: 5, section: "experience_client", subsection: "1.5 Qualité de Service Salle" },
  { id: 46, text: "Le personnel connaît la carte", points: 5, section: "experience_client", subsection: "1.5 Qualité de Service Salle" },
  { id: 47, text: "Les allergènes sont communiqués si demandés", points: 5, section: "experience_client", subsection: "1.5 Qualité de Service Salle" },
  { id: 48, text: "Les délais d'attente sont respectés", points: 5, section: "experience_client", subsection: "1.5 Qualité de Service Salle" },
  { id: 49, text: "Le personnel anticipe les besoins", points: 4, section: "experience_client", subsection: "1.5 Qualité de Service Salle" },
  { id: 50, text: "Les erreurs de commande sont traitées rapidement", points: 5, section: "experience_client", subsection: "1.5 Qualité de Service Salle" },
  { id: 51, text: "Le personnel est attentif pendant le service", points: 4, section: "experience_client", subsection: "1.5 Qualité de Service Salle" },
  { id: 52, text: "La commande à emporter est bien préparée et emballée", points: 5, section: "experience_client", subsection: "1.5 Qualité de Service Salle" },
  { id: 53, text: "Les plats sont servis à la bonne température", points: 5, section: "experience_client", subsection: "1.6 Qualité de Service Cuisine" },
  { id: 54, text: "La présentation des assiettes est soignée", points: 5, section: "experience_client", subsection: "1.6 Qualité de Service Cuisine" },
  { id: 55, text: "Les portions sont conformes aux standards", points: 5, section: "experience_client", subsection: "1.6 Qualité de Service Cuisine" },
  { id: 56, text: "Les délais de préparation sont respectés", points: 5, section: "experience_client", subsection: "1.6 Qualité de Service Cuisine" },
  { id: 57, text: "La qualité des produits est constante", points: 5, section: "experience_client", subsection: "1.6 Qualité de Service Cuisine" },
  { id: 58, text: "Aucun retour de plat non justifié", points: 5, section: "experience_client", subsection: "1.6 Qualité de Service Cuisine" },
  { id: 59, text: "Les plats du jour sont disponibles", points: 4, section: "experience_client", subsection: "1.6 Qualité de Service Cuisine" },
  { id: 60, text: "La qualité du repas testé est satisfaisante", points: 8, section: "experience_client", subsection: "1.6 Qualité de Service Cuisine" },
  { id: 61, text: "L'entrée est fraîche et bien présentée", points: 5, section: "experience_client", subsection: "1.7 Repas Testé" },
  { id: 62, text: "Le plat principal est à la hauteur des standards", points: 5, section: "experience_client", subsection: "1.7 Repas Testé" },
  { id: 63, text: "Le dessert est de bonne qualité", points: 5, section: "experience_client", subsection: "1.7 Repas Testé" },
  { id: 64, text: "Les boissons sont servies à la bonne température", points: 5, section: "experience_client", subsection: "1.7 Repas Testé" },
  { id: 65, text: "Le rapport qualité/prix est justifié", points: 5, section: "experience_client", subsection: "1.7 Repas Testé" },
  { id: 66, text: "La cuisine est propre en début de service", points: 5, section: "technique", subsection: "2.1 Cuisine" },
  { id: 67, text: "Les plans de travail sont désinfectés régulièrement", points: 5, section: "technique", subsection: "2.1 Cuisine" },
  { id: 68, text: "Les équipements sont en bon état de fonctionnement", points: 5, section: "technique", subsection: "2.1 Cuisine" },
  { id: 69, text: "Les températures des équipements froids sont vérifiées", points: 5, section: "technique", subsection: "2.1 Cuisine" },
  { id: 70, text: "Les températures de cuisson sont respectées", points: 5, section: "technique", subsection: "2.1 Cuisine" },
  { id: 71, text: "La séparation cru/cuit est respectée", points: 5, section: "technique", subsection: "2.1 Cuisine" },
  { id: 72, text: "La marche en avant est appliquée", points: 5, section: "technique", subsection: "2.1 Cuisine" },
  { id: 73, text: "Les DLC sont contrôlées quotidiennement", points: 5, section: "technique", subsection: "2.1 Cuisine" },
  { id: 74, text: "Le stockage des produits est conforme", points: 5, section: "technique", subsection: "2.1 Cuisine" },
  { id: 75, text: "Les fiches techniques de recettes sont affichées", points: 5, section: "technique", subsection: "2.1 Cuisine" },
  { id: 76, text: "Le plan de nettoyage est affiché et suivi", points: 5, section: "technique", subsection: "2.1 Cuisine" },
  { id: 77, text: "Les produits d'entretien sont stockés séparément", points: 5, section: "technique", subsection: "2.1 Cuisine" },
  { id: 78, text: "La gestion des déchets est conforme", points: 5, section: "technique", subsection: "2.1 Cuisine" },
  { id: 79, text: "Les vestiaires du personnel sont propres", points: 5, section: "technique", subsection: "2.2 Autres Locaux" },
  { id: 80, text: "Les réserves sèches sont organisées", points: 5, section: "technique", subsection: "2.2 Autres Locaux" },
  { id: 81, text: "Le local poubelles est propre et fermé", points: 5, section: "technique", subsection: "2.2 Autres Locaux" },
  { id: 82, text: "Les couloirs et accès sont dégagés", points: 4, section: "technique", subsection: "2.2 Autres Locaux" },
  { id: 83, text: "La chambre froide positive est en ordre", points: 5, section: "technique", subsection: "2.2 Autres Locaux" },
  { id: 84, text: "La chambre froide négative est en ordre", points: 5, section: "technique", subsection: "2.2 Autres Locaux" },
  { id: 85, text: "Les extincteurs sont vérifiés et accessibles", points: 5, section: "technique", subsection: "2.2 Autres Locaux" },
  { id: 86, text: "La trousse de premiers secours est disponible", points: 4, section: "technique", subsection: "2.2 Autres Locaux" },
  { id: 87, text: "Le carnet de sécurité est à jour", points: 5, section: "technique", subsection: "2.2 Autres Locaux" },
  { id: 88, text: "L'affichage obligatoire est présent", points: 5, section: "technique", subsection: "2.2 Autres Locaux" },
  { id: 89, text: "Le registre du personnel est à jour", points: 5, section: "admin_gestion", subsection: "3.1 Admin & Gestion" },
  { id: 90, text: "Les contrats de travail sont conformes", points: 5, section: "admin_gestion", subsection: "3.1 Admin & Gestion" },
  { id: 91, text: "Les fiches de paie sont émises dans les délais", points: 5, section: "admin_gestion", subsection: "3.1 Admin & Gestion" },
  { id: 92, text: "Le suivi des stocks est réalisé", points: 5, section: "admin_gestion", subsection: "3.1 Admin & Gestion" },
  { id: 93, text: "Les commandes sont passées selon les procédures", points: 5, section: "admin_gestion", subsection: "3.1 Admin & Gestion" },
  { id: 94, text: "Les factures fournisseurs sont classées", points: 5, section: "admin_gestion", subsection: "3.1 Admin & Gestion" },
  { id: 95, text: "Le logiciel de caisse est utilisé correctement", points: 5, section: "admin_gestion", subsection: "3.1 Admin & Gestion" },
  { id: 96, text: "Les remontées de chiffres sont envoyées dans les délais", points: 5, section: "admin_gestion", subsection: "3.1 Admin & Gestion" },
  { id: 97, text: "Le franchisé est à jour de ses redevances", points: 5, section: "admin_gestion", subsection: "3.1 Admin & Gestion" },
  { id: 98, text: "Les contrôles sanitaires récents sont archivés", points: 5, section: "admin_gestion", subsection: "3.1 Admin & Gestion" },
  { id: 99, text: "Un planning hebdomadaire est affiché", points: 5, section: "admin_gestion", subsection: "3.2 Management & Formation" },
  { id: 100, text: "Les entretiens individuels sont réalisés", points: 5, section: "admin_gestion", subsection: "3.2 Management & Formation" },
  { id: 101, text: "Les formations obligatoires sont à jour", points: 5, section: "admin_gestion", subsection: "3.2 Management & Formation" },
  { id: 102, text: "Un briefing quotidien est réalisé", points: 5, section: "admin_gestion", subsection: "3.2 Management & Formation" },
  { id: 103, text: "La gestion des absences est documentée", points: 4, section: "admin_gestion", subsection: "3.2 Management & Formation" },
  { id: 104, text: "Le manager est présent et disponible", points: 5, section: "admin_gestion", subsection: "3.2 Management & Formation" },
  { id: 105, text: "Le personnel connaît les procédures d'urgence", points: 5, section: "admin_gestion", subsection: "3.2 Management & Formation" },
  { id: 106, text: "La cohésion d'équipe est satisfaisante", points: 4, section: "admin_gestion", subsection: "3.2 Management & Formation" },
  { id: 107, text: "Les objectifs de vente sont communiqués", points: 4, section: "admin_gestion", subsection: "3.2 Management & Formation" },
  { id: 108, text: "Le turnover est maîtrisé", points: 4, section: "admin_gestion", subsection: "3.2 Management & Formation" },
  { id: 109, text: "La vitrine promotionnelle est à jour", points: 5, section: "admin_gestion", subsection: "3.3 Communication & Marketing" },
  { id: 110, text: "Les réseaux sociaux sont animés régulièrement", points: 5, section: "admin_gestion", subsection: "3.3 Communication & Marketing" },
  { id: 111, text: "Les promotions du franchiseur sont relayées", points: 5, section: "admin_gestion", subsection: "3.3 Communication & Marketing" },
  { id: 112, text: "Le programme de fidélité est promu", points: 5, section: "admin_gestion", subsection: "3.3 Communication & Marketing" },
  { id: 113, text: "La communication locale est conforme à la charte", points: 5, section: "admin_gestion", subsection: "3.3 Communication & Marketing" },
  { id: 114, text: "Le tri des déchets est effectué", points: 5, section: "admin_gestion", subsection: "3.4 Green Attitude" },
  { id: 115, text: "Les équipements économes en énergie sont utilisés", points: 5, section: "admin_gestion", subsection: "3.4 Green Attitude" },
  { id: 116, text: "La consommation d'eau est maîtrisée", points: 5, section: "admin_gestion", subsection: "3.4 Green Attitude" },
  { id: 117, text: "Les emballages sont éco-responsables quand possible", points: 5, section: "admin_gestion", subsection: "3.4 Green Attitude" },
  { id: 118, text: "Le gaspillage alimentaire est suivi", points: 5, section: "admin_gestion", subsection: "3.4 Green Attitude" },
  { id: 119, text: "L'équipe est sensibilisée aux gestes verts", points: 4, section: "admin_gestion", subsection: "3.4 Green Attitude" },
  { id: 120, text: "Les partenaires locaux/circuits courts sont privilégiés", points: 5, section: "admin_gestion", subsection: "3.4 Green Attitude" },
];

function generateExtraQuestions(
  startId: number,
  count: number,
  targetPoints: number,
  section: Question["section"],
  subsectionPool: string[],
  label: string,
): Question[] {
  const base = 4;
  const baseTotal = base * count;
  const bonusCount = Math.max(0, targetPoints - baseTotal);
  return Array.from({ length: count }, (_, idx) => ({
    id: startId + idx,
    text: `${label} ${idx + 1}`,
    points: idx < bonusCount ? 5 : 4,
    section,
    subsection: subsectionPool[idx % subsectionPool.length],
  }));
}

const extraPart1 = generateExtraQuestions(
  121,
  70,
  294,
  "experience_client",
  ["1.2 Extérieurs & Façade", "1.3 Intérieurs Salle", "1.5 Qualité de Service Salle"],
  "Critère complémentaire expérience client",
);

const extraPart2 = generateExtraQuestions(
  191,
  70,
  290,
  "technique",
  ["2.1 Cuisine", "2.2 Autres Locaux"],
  "Critère complémentaire tenue technique",
);

const extraPart3 = generateExtraQuestions(
  261,
  95,
  420,
  "admin_gestion",
  ["3.1 Admin & Gestion", "3.2 Management & Formation", "3.4 Green Attitude"],
  "Critère complémentaire admin et gestion",
);

export const questions: Question[] = [...baseQuestions, ...extraPart1, ...extraPart2, ...extraPart3];
