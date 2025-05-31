// src/types/adminManagerData.ts
import { AdminManager, ManagerRole } from '@/app/Interface/Gestionnaires';

const LOCAL_STORAGE_ADMIN_MANAGER_KEY = 'adminManagers';

export const loadAdminManagers = (): AdminManager[] => {
  if (typeof window !== 'undefined') {
    const storedManagers = localStorage.getItem(LOCAL_STORAGE_ADMIN_MANAGER_KEY);
    if (storedManagers) {
      try {
        return JSON.parse(storedManagers) as AdminManager[];
      } catch (error) {
        console.error("Failed to parse admin managers from local storage", error);
        return [];
      }
    }
  }
  return [];
};

export const saveAdminManagers = (managers: AdminManager[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_ADMIN_MANAGER_KEY, JSON.stringify(managers));
  }
};

export const addAdminManager = (newManager: AdminManager): void => {
  const currentManagers = loadAdminManagers();
  const updatedManagers = [...currentManagers, newManager];
  saveAdminManagers(updatedManagers);
};

export const updateAdminManager = (updatedManager: AdminManager): void => {
  const currentManagers = loadAdminManagers();
  const updatedManagers = currentManagers.map(manager =>
    manager.id === updatedManager.id ? updatedManager : manager
  );
  saveAdminManagers(updatedManagers);
};

export const deleteAdminManager = (managerId: string): void => {
  const currentManagers = loadAdminManagers();
  const updatedManagers = currentManagers.filter(manager => manager.id !== managerId);
  saveAdminManagers(updatedManagers);
};