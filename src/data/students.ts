export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'f' | 'm';
  className: string;
}

export const studentsDatabase: Student[] = [
  { id: "1", firstName: "Alice", lastName: "Martin", gender: 'f', className: "cm1" },
  { id: "2", firstName: "Lucas", lastName: "Bernard", gender: 'm', className: "cm1" },
  { id: "3", firstName: "Emma", lastName: "Petit", gender: 'f', className: "ce2" },
  { id: "4", firstName: "Thomas", lastName: "Richard", gender: 'm', className: "6ème" },
  { id: "5", firstName: "Chloé", lastName: "Durand", gender: 'f', className: "cm1" },
  { id: "6", firstName: "Julien", lastName: "Faure", gender: 'm', className: "cp" },
  { id: "7", firstName: "Léa", lastName: "Morel", gender: 'f', className: "ce1" },
  { id: "8", firstName: "Hugo", lastName: "Simon", gender: 'm', className: "cm2" },
];

export const classes = ["CP", "CE1", "CE2", "CM1", "CM2", "6ème", "5ème", "4ème", "3ème"];
export const periods = ["Période 1", "Période 2", "Période 3"];