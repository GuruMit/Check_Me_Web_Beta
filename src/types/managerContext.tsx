// context/managers-context.tsx
"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface Manager {
  id: string;
  type: string;
  lastName: string;
  firstName: string;
  role: string;
  department: string;
  title: string;
  status: "active" | "inactive";
  email?: string;
  createdAt: Date;
}

interface ManagersContextType {
  managers: Manager[];
  addManager: (manager: Omit<Manager, "id" | "createdAt">) => void;
}

const ManagersContext = createContext<ManagersContextType | undefined>(undefined);

export const ManagersProvider = ({ children }: { children: ReactNode }) => {
  const [managers, setManagers] = useState<Manager[]>([]);

  const addManager = (manager: Omit<Manager, "id" | "createdAt">) => {
    const newManager: Manager = {
      ...manager,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      status: "active",
    };
    setManagers(prev => [...prev, newManager]);
  };

  return (
    <ManagersContext.Provider value={{ managers, addManager }}>
      {children}
    </ManagersContext.Provider>
  );
};

export const useManagers = () => {
  const context = useContext(ManagersContext);
  if (!context) {
    throw new Error("useManagers must be used within a ManagersProvider");
  }
  return context;
};