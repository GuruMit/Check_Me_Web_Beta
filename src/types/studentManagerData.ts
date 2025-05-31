// src/types/studentManagerData.ts
import { StudentManager } from '@/app/Interface/Gestionnaires';

const LOCAL_STORAGE_STUDENT_MANAGER_KEY = 'studentManagers'; // Different key for student managers

export const loadStudentManagers = (): StudentManager[] => {
  if (typeof window !== 'undefined') {
    const storedManagers = localStorage.getItem(LOCAL_STORAGE_STUDENT_MANAGER_KEY);
    if (storedManagers) {
      try {
        return JSON.parse(storedManagers) as StudentManager[];
      } catch (error) {
        console.error("Failed to parse student managers from local storage", error);
        return [];
      }
    }
  }
  return [];
};

export const saveStudentManagers = (managers: StudentManager[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_STUDENT_MANAGER_KEY, JSON.stringify(managers));
  }
};

export const addStudentManager = (newManager: StudentManager): void => {
  const currentManagers = loadStudentManagers();
  const updatedManagers = [...currentManagers, newManager];
  saveStudentManagers(updatedManagers);
};

export const updateStudentManager = (updatedManager: StudentManager): void => {
  const currentManagers = loadStudentManagers();
  const updatedManagers = currentManagers.map(manager =>
    manager.id === updatedManager.id ? updatedManager : manager
  );
  saveStudentManagers(updatedManagers);
};

export const deleteStudentManager = (managerId: string): void => {
  const currentManagers = loadStudentManagers();
  const updatedManagers = currentManagers.filter(manager => manager.id !== managerId);
  saveStudentManagers(updatedManagers);
};