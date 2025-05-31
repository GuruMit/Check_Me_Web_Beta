// constants.ts
import { Filiere, Level, CourseDetails, DateRange, FiliereType, Student } from './types'

export const FILIERES: Filiere[] = [
  {
    id: 'ISN',
    name: 'Ingénierie des Systèmes Numériques',
    niveaux: [
      {
        id: '5',
        name: 'Niveau 5',
        courses: [
          { id: '501', name: 'Intelligence Artificielle' },
          { id: '502', name: 'Cybersécurité Avancée' },
          { id: '503', name: 'Cloud Computing' }
        ]
      },
      // ... autres niveaux
    ]
  },
  // ... autres filières
]

export const COURS_MAPPING: CourseDetails[] = [
  {
    id: 501,
    filiere: 'ISN',
    niveau: 5,
    nom: 'Intelligence Artificielle',
    datePlages: {
      5: { startDate: '01/07/2025', endDate: '05/07/2025' }
    }
  },
  {
    id: 502,
    filiere: 'ISN',
    niveau: 5,
    nom: 'Cybersécurité Avancée',
    datePlages: {
      5: { startDate: '11/07/2025', endDate: '13/07/2025' },
    }
  },
  {
    id: 503,
    filiere: 'ISN',
    niveau: 5,
    nom: 'Cloud Computing',
    datePlages: {
      5: { startDate: '11/07/2025', endDate: '15/07/2025' },
    }
  },
  {
    id: 101,
    filiere: 'ISN',
    niveau: 1,
    nom: 'Fondamentaux IT',
    datePlages: {
      1: { startDate: '14/05/2025', endDate: '17/05/2025' },
      2: { startDate: '10/09/2025', endDate: '15/09/2025' }
    }
  },
  {
    id: 102,
    filiere: 'ISN',
    niveau: 1,
    nom: 'Bases de programmation',
    datePlages: {
      1: { startDate: '18/05/2025', endDate: '21/05/2025' },
      2: { startDate: '16/09/2025', endDate: '20/09/2025' }
    }
  },
  {
    id: 103,
    filiere: 'ISN',
    niveau: 1,
    nom: 'Mathématiques discrètes',
    datePlages: {
      1: { startDate: '22/05/2025', endDate: '25/05/2025' },
      2: { startDate: '21/09/2025', endDate: '25/09/2025' }
    }
  },
  {
    id: 201,
    filiere: 'ISN',
    niveau: 2,
    nom: 'Algorithmique avancée',
    datePlages: {
      2: { startDate: '01/06/2025', endDate: '05/06/2025' },
      3: { startDate: '01/10/2025', endDate: '05/10/2025' }
    }
  },
  {
    id: 202,
    filiere: 'ISN',
    niveau: 2,
    nom: 'Bases de données',
    datePlages: {
      2: { startDate: '06/06/2025', endDate: '10/06/2025' },
      3: { startDate: '06/10/2025', endDate: '10/10/2025' }
    }
  },
  {
    id: 301,
    filiere: 'INS',
    niveau: 1,
    nom: 'Électronique numérique',
    datePlages: {
      1: { startDate: '14/05/2025', endDate: '17/05/2025' },
      2: { startDate: '10/09/2025', endDate: '15/09/2025' }
    }
  },
  {
    id: 302,
    filiere: 'INS',
    niveau: 1,
    nom: 'Systèmes embarqués',
    datePlages: {
      1: { startDate: '18/05/2025', endDate: '21/05/2025' },
      2: { startDate: '16/09/2025', endDate: '20/09/2025' }
    }
  },
  {
    id: 401,
    filiere: 'CDN',
    niveau: 1,
    nom: 'Design graphique',
    datePlages: {
      1: { startDate: '14/05/2025', endDate: '17/05/2025' },
      2: { startDate: '10/09/2025', endDate: '15/09/2025' }
    }
  },
  {
    id: 402,
    filiere: 'CDN',
    niveau: 1,
    nom: 'UX Fundamentals',
    datePlages: {
      1: { startDate: '18/05/2025', endDate: '21/05/2025' },
      2: { startDate: '16/09/2025', endDate: '20/09/2025' }
    }
  },
];


export const DEFAULT_STUDENTS: Student[] = [
  {
    id: '20G60313',
    name: 'ELLA Kris',
    initials: 'EK',
    bgColor: 'bg-sky-100',
    total: '15/20',
    status: 'Régulier',
    statusColor: 'text-green-500',
    filiere: 'ISN',
    niveau: 5,
    courses: [ 
      { 
        course: { id: '501', name: 'Intelligence Artificielle' }, 
      },
    ],
    recentSessions: {
      '502': {
        '11/05/2025': [true, false],
        '12/05/2025': [false, true]
      }
    }
    },
    
      {
    id: '20G60313',
    name: 'Phils Kris',
    initials: 'EK',
    bgColor: 'bg-sky-100',
    total: '15/20',
    status: 'Régulier',
    statusColor: 'text-green-500',
    filiere: 'ISN',
    niveau: 5,
    courses: [ 
      { 
        course: { id: '501', name: 'Intelligence Artificielle' }, 
      },
    ],
    recentSessions: {
      '502': {
        '11/05/2025': [true, false],
        '12/05/2025': [false, true]
      }
    }
  },
  // ... autres étudiants
]