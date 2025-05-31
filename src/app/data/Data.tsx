
import { Level, Student, Justification, CourseDetails } from "../Interface/Interfaces";




export const defaultLevels: Level[] = [
  // ISN
  {
    id: "5",
    name: "Niveau 5",
    filiere: "ISN",
    courses: [
      { id: "501", name: "Intelligence ArtificielleT" },
      { id: "502", name: "Cybersécurité Avancée" },
      { id: "503", name: "Cloud Computing" },
    ],
  },
  // ... (tous les autres niveaux)
];

export const defaultStudents: Student[] = [
  {
    id: "20G60313",
    name: "ELLA Kris",
    initials: "EK",
    bgColor: "bg-sky-100",
    total: "15/20",
    status: "Régulier",
    statusColor: "text-green-500",
    filiere: "ISN",
    niveau: "5",
    courses: [
      { course: { id: "501", name: "Course A" } },
      // ... (tous les autres cours)
    ],
    recentSessions: {
      "502": {
        "11/05/2025": [true, false],
        // ... (autres sessions)
      },
    },
  },
  // ... (tous les autres étudiants)
];

export const COURS_MAPPING: Record<number, CourseDetails> = {
  501: {
    filiere: 'ISN',
    niveau: 5,
    nom: 'Intelligence Artificielle',
    datePlages: {
      5: { startDate: '01/07/2025', endDate: '05/07/2025' },
    }
  },
  // ... (tous les autres cours)
};

export const NIVEAU_DATES = {
  ISN: {
    1: { startDate: '01/09/2024', endDate: '20/12/2024' },
    // ... (toutes les autres dates)
  },
  // ... (autres filières)
};

export const filiereOptions = [
  { id: "ISN", label: "ISN", category: "filiere" },
  { id: "INS", label: "INS", category: "filiere" },
  { id: "CDN", label: "CDN", category: "filiere" },
];

export const niveauOptions = [1, 2, 3, 4, 5].map(n => ({
  id: n.toString(),
  label: `Niveau ${n}`,
  category: "niveau",
}));

export const justificationsData: Justification[] = [
  {
    id: 1,
    studentInitials: 'AB',
    studentName: 'ANGO ',
    studentCode: '20G60350',
    courseName: 'Introduction to IT',
    instructor: 'Dr. AMOUGOU',
    timeSlot: '8h-12h',
    date: 'Jan 17, 2022',
    filiere: 'ISN',
    status: 'pending',
    niveau: '1',
    justificationText: "Problème personnel urgent.",
  },
  {
    id: 2,
    studentInitials: 'AB',
    studentName: 'ANGO Brinda',
    studentCode: '20G60350',
    courseName: 'Web Development Basics',
    instructor: 'Mme. EYENGA',
    timeSlot: '8h-12h',
    date: 'Jan 17, 2022',
    filiere: 'Toutes',
    status: 'approved',
    niveau: '2',
    justificationText: "Maladie soudaine.",
  },
  {
    id: 3,
    studentInitials: 'NL',
    studentName: 'Elanga LETERE',
    studentCode: '20G60380',
    courseName: 'Financial Accounting',
    instructor: 'Mr. TCHUISSEU',
    timeSlot: '14h-16h',
    date: 'Jan 17, 2022',
    filiere: 'ISN',
    status: 'rejected',
    niveau: '3',
    justificationText: "Grève des transports.",
  },
  {
    id: 4,
    studentInitials: 'AB',
    studentName: 'ANGO Brinda',
    studentCode: '20G60350',
    courseName: 'Financial Accounting',
    instructor: 'Mr. TCHUISSEU',
    timeSlot: '14h-16h',
    date: 'Jan 17, 2022',
    filiere: 'ISN',
    isSelected: true,
    status: "approved",
    niveau: '3',
    justificationText: "Empêchement familial.",
  },
  {
    id: 5,
    studentInitials: 'NL',
    studentName: 'NDJESSE LETERE',
    studentCode: '20G60380',
    courseName: 'Web Development Basics',
    instructor: 'Mme. EYENGA',
    timeSlot: '8h-12h',
    date: 'Jan 17, 2022',
    filiere: 'Toutes',
    status: "pending",
    niveau: '4',
    justificationText: "Absent pour raison de maladie.",
  },
  {
    id: 6,
    studentInitials: 'NL',
    studentName: 'NDJESSE LETERE',
    studentCode: '20G60380',
    courseName: 'Financial Accounting',
    instructor: 'Mr. TCHUISSEU',
    timeSlot: '14h-16h',
    date: 'Jan 17, 2022',
    filiere: 'ISN',
    status: "approved",
    niveau: '5',
    justificationText: "Problème de transport.",
  },
  {
    id: 7,
    studentInitials: 'NL',
    studentName: 'NDJESSE LETERE',
    studentCode: '20G60380',
    courseName: 'Data Structures and Algorithms',
    instructor: 'Dr. FOUODJI',
    timeSlot: '8h-10h',
    date: 'Jan 17, 2022',
    filiere: 'Toutes',
    status: "rejected",
    niveau: '1',
    justificationText: "RDV médical important.",
  },
];
