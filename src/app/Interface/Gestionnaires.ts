// src/app/Interface/Gestionnaires.ts

export type ManagerStatus = "actif" | "inactif" | "en-conge";
export type ManagerRole =
  | "Gestionnaire de niveau"
  | "Gestionnaire de cours"
  | "Gestionnaire d'absences"
  | "Administrateur"
  | "Super Administrateur"
  | "Étudiant";

export interface AdminManager {
  id: string;
  initials: string;
  name: string;
  code: string;
  status: ManagerStatus;
  role: Exclude<ManagerRole, 'Étudiant'>; // AdminManager cannot have 'Étudiant' role
  email: string;
  filter: string;
  assignedStudents: { id: string; name: string; studentId: string }[];
}

export interface StudentManager {
  id: string;
  initials: string;
  name: string;
  code: string;
  status: ManagerStatus;
  role: 'Étudiant';
  email: string;
  filter: string;
}

export type Manager = AdminManager | StudentManager; // This union type is key