export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'f' | 'm';
  className: string;
}

export const studentsDatabase: Student[] = [
  { id: "1", firstName: "Alice", lastName: "Martin", gender: 'f', className: "1ère" },
  { id: "2", firstName: "Lucas", lastName: "Bernard", gender: 'm', className: "2ème" },
  { id: "3", firstName: "Emma", lastName: "Petit", gender: 'f', className: "3ème" },
  { id: "4", firstName: "Thomas", lastName: "Richard", gender: 'm', className: "4ème" },
  { id: "5", firstName: "Chloé", lastName: "Durand", gender: 'f', className: "5ème" },
  { id: "6", firstName: "Julien", lastName: "Faure", gender: 'm', className: "6ème" },
];

export const classes = ["1ère", "2ème", "3ème", "4ème", "5ème", "6ème"];
export const periods = ["Période 1", "Période 2", "Période 3"];
export const degrees = ["1er degré", "2ème degré", "3ème degré"];

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