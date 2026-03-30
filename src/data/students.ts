export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'f' | 'm';
  className: string;
  degree: string;
}

export const classesByDegree: Record<string, string[]> = {
  "1er degré": ["Samourai", "Simpson", "Piraterie", "Hunters", "Avengers", "GoldenEagles", "Mugiwaras", "ProtègeTibias", "Shinigamis"],
  "2ème degré": ["Atlantide", "Sinaloa", "Estrelas", "Shadow", "Agora", "CasaDelPapel", "Celestials", "CosaNostra", "Inconnus", "Korczak"],
  "3ème degré": ["Aurora", "Suenos", "Miyazaki", "NovaCorp", "Visionnaires", "Astreons", "OPPS", "Raspipas", "Zion"]
};

export const classes = Object.values(classesByDegree).flat();
export const periods = ["Période 1", "Période 2", "Période 3"];
export const degrees = ["1er degré", "2ème degré", "3ème degré"];

const firstNames = ["Léo", "Emma", "Gabriel", "Jade", "Raphaël", "Louise", "Lucas", "Alice", "Arthur", "Lina", "Hugo", "Chloé", "Maël", "Léa", "Noah", "Mila", "Liam", "Manon", "Adam", "Inès", "Ethan", "Zoé", "Sacha", "Camille"];
const lastNames = ["Martin", "Bernard", "Thomas", "Petit", "Robert", "Richard", "Durand", "Dubois", "Moreau", "Laurent", "Simon", "Michel", "Lefebvre", "Leroy", "Roux", "David", "Bertrand", "Morel", "Fournier", "Girard", "Bonnet", "Dupont", "Lambert", "Fontaine"];

const generateStudents = (): Student[] => {
  const students: Student[] = [];
  let idCounter = 1;

  Object.entries(classesByDegree).forEach(([degree, degreeClasses]) => {
    degreeClasses.forEach((className) => {
      for (let i = 0; i < 24; i++) {
        const gender = Math.random() > 0.5 ? 'f' : 'm';
        students.push({
          id: (idCounter++).toString(),
          firstName: firstNames[i % firstNames.length],
          lastName: `${lastNames[(i + idCounter) % lastNames.length]} ${String.fromCharCode(65 + (idCounter % 26))}`,
          gender,
          className,
          degree
        });
      }
    });
  });
  return students;
};

export const studentsDatabase = generateStudents();

export const degreeData = {
  "1er degré": {
    subjects: ["Art", "Citoyenneté", "Culture antique", "Education physique", "Français", "Histoire-Géographie", "Mathématique", "Néerlandais", "Sciences", "Sciences sociales", "Education à la technologie"],
    skills: ["Application", "Autonomie", "Communication", "Consignes", "Justification", "Recherche", "Restitution", "Sélection d'information", "Transfert"]
  },
  "2ème degré": {
    subjects: ["Anglais", "Art", "Biologie", "Chimie", "Citoyenneté", "Communication", "Culture antique", "Education physique", "Espagnol", "Français", "Géographie", "Physique", "Histoire", "Mathématique", "Néerlandais", "Sciences", "Sciences économiques", "Sciences sociales"],
    skills: ["Application", "Autonomie", "Communication", "Consignes", "Justification", "Recherche", "Restitution", "Sélection d'information", "Transfert", "Synthèse", "Argumentation"]
  },
  "3ème degré": {
    subjects: ["Anglais", "Art", "Biologie", "Chimie", "Citoyenneté", "Communication", "Culture antique", "Education physique", "Espagnol", "Français", "Géographie", "Physique", "Histoire", "Mathématique", "Néerlandais", "Sciences", "Sciences économiques", "Sciences sociales", "Option sciences"],
    skills: ["Application", "Autonomie", "Communication", "Consignes", "Justification", "Recherche", "Restitution", "Sélection d'information", "Transfert", "Synthèse", "Argumentation"]
  }
};