// src/app/admin/creeGestionaire/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AdminLayout } from "@/layout/AdminLayOut";
import { Button } from "@/components/ui/button";
import { User, ArrowLeft } from "lucide-react"; // Import ArrowLeft for the back button
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";
import AdministrateurTable from "@/components/admin/TableAdministrateur";
import EtudiantTable from "@/components/admin/TableEtudiant";

import { addAdminManager } from '@/types/adminManagerData';
import { addStudentManager } from '@/types/studentManagerData';

import { AdminManager, ManagerStatus, ManagerRole, StudentManager } from "@/app/Interface/Gestionnaires";


export interface AdministratorFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: Exclude<ManagerRole, 'Étudiant'>;
  department: string;
  title: string;
}

export interface StudentData {
  id: string;
  initials: string;
  name: string;
  studentId: string;
  status: "regular" | "irregular" | "warning";
  selected: boolean;
  filiere: string;
  niveau: string;
  specialite: string;
}

// Your student list - ENSURE THESE VALUES EXACTLY MATCH what you expect in filters
export const studentsList: StudentData[] = [
  { id: "1", initials: "EK", name: "ELLA Kris", studentId: "20G00313", status: "regular", selected: false, filiere: "Informatique", niveau: "1", specialite: "RSMI" },
  { id: "2", initials: "NL", name: "NDJESSE LETERE", studentId: "20G0038U", status: "irregular", selected: false, filiere: "Gestion", niveau: "1", specialite: "GL" },
  { id: "3", initials: "BW", name: "BAKEHE William", studentId: "20G00345", status: "warning", selected: false, filiere: "Informatique", niveau: "2", specialite: "GL" },
  { id: "4", initials: "MN", name: "MATAKON NGAROUA", studentId: "20G349", status: "regular", selected: false, filiere: "Commerce", niveau: "5", specialite: "MI" },
  { id: "5", initials: "EP", name: "ELANGA Philippe", studentId: "20G00188", status: "warning", selected: false, filiere: "Informatique", niveau: "2", specialite: "RSMI" },
  { id: "6", initials: "AS", name: "AYISSI Stephane", studentId: "21G00123", status: "regular", selected: false, filiere: "Gestion", niveau: "5", specialite: "Finance" },
  { id: "7", initials: "LM", name: "LOBE Marie", studentId: "21G00456", status: "irregular", selected: false, filiere: "Marketing", niveau: "2", specialite: "Communication" },
  { id: "8", initials: "CT", name: "CHEMTO TCHINDA", studentId: "21G00789", status: "regular", selected: false, filiere: "Informatique", niveau: "3", specialite: "IA" },
  { id: "9", initials: "BD", name: "BIWOLE Didier", studentId: "22G00010", status: "warning", selected: false, filiere: "Commerce", niveau: "3", specialite: "Vente" },
  { id: "10", initials: "NF", name: "NDIAYE Fatou", studentId: "22G00321", status: "regular", selected: false, filiere: "Gestion", niveau: "5", specialite: "GRH" },
  { id: "11", initials: "SM", name: "SOH Marc", studentId: "22G00654", status: "irregular", selected: false, filiere: "Informatique", niveau: "4", specialite: "Réseaux" },
  { id: "12", initials: "AD", name: "ABENA Diane", studentId: "23G00987", status: "regular", selected: false, filiere: "Marketing", niveau: "2", specialite: "Digital" },
  { id: "13", initials: "KT", name: "KAMDEM Thierry", studentId: "23G00210", status: "warning", selected: false, filiere: "Commerce", niveau: "1", specialite: "Marketing" },
  { id: "14", initials: "YM", name: "YONDO Mireille", studentId: "23G00532", status: "regular", selected: false, filiere: "Gestion", niveau: "3", specialite: "Comptabilité" },
  { id: "15", initials: "JB", name: "JOTIE Boris", studentId: "24G00865", status: "irregular", selected: false, filiere: "Informatique", niveau: "4", specialite: "Sécurité" },
  { id: "16", initials: "PN", name: "PASCAL NGAH", studentId: "24G00198", status: "regular", selected: false, filiere: "Marketing", niveau: "5", specialite: "Publicité" },
  { id: "17", initials: "LD", name: "LILIANE DASSI", studentId: "24G00421", status: "warning", selected: false, filiere: "Commerce", niveau: "2", specialite: "Logistique" },
  { id: "18", initials: "FE", name: "FILS ETOUNDI", studentId: "25G00754", status: "regular", selected: false, filiere: "Gestion", niveau: "3", specialite: "Audit" },
  { id: "19", initials: "NW", name: "NADEGE WAMBA", studentId: "25G00087", status: "irregular", selected: false, filiere: "Informatique", niveau: "5", specialite: "Mobile" },
  { id: "20", initials: "CD", name: "CEDRIC DONGMO", studentId: "25G00310", status: "regular", selected: false, filiere: "Marketing", niveau: "5", specialite: "E-commerce" },
];


const CreerGestionnaire = () => {
  const [students, setStudents] = useState<StudentData[]>(studentsList);
  const [selectAll, setSelectAll] = useState(false);
  const [activeTab, setActiveTab] = useState("administrateur");

  const router = useRouter();
  const { user } = useAuth();

  const form = useForm<AdministratorFormData>({
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      role: "Gestionnaire de niveau",
      department: "",
      title: "",
    },
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    form.reset();
    // Reset selections when changing tabs
    setStudents(studentsList.map(s => ({...s, selected: false})));
    setSelectAll(false);
  };

  const handleSelectAllStudents = (checked: boolean) => {
    setSelectAll(checked);
    setStudents(prevStudents =>
      prevStudents.map((student) => ({ ...student, selected: checked }))
    );
  };

  const handleSelectStudent = (id: string, checked: boolean) => {
    setStudents(prevStudents => {
      const updatedStudents = prevStudents.map((student) =>
        student.id === id ? { ...student, selected: checked } : student
      );
      const allChecked = updatedStudents.every((student) => student.selected);
      setSelectAll(allChecked);
      return updatedStudents;
    });
  };

  const generateAdminCode = (role: ManagerRole): string => {
    switch (role) {
      case "Gestionnaire de niveau":
        return 'GNV-' + Math.random().toString(36).substring(7).toUpperCase();
      case "Gestionnaire de cours":
        return 'GCS-' + Math.random().toString(36).substring(7).toUpperCase();
      case "Gestionnaire d'absences":
        return 'GAB-' + Math.random().toString(36).substring(7).toUpperCase();
      case "Administrateur":
        return 'ADM-' + Math.random().toString(36).substring(7).toUpperCase();
      case "Super Administrateur":
        return 'SADM-' + Math.random().toString(36).substring(7).toUpperCase();
      case "Étudiant":
        return 'ETU-' + Math.random().toString(36).substring(7).toUpperCase();
      default:
        return 'UNK-' + Math.random().toString(36).substring(7).toUpperCase();
    }
  };

  const handleAdminSubmit = async (data: AdministratorFormData) => {
    const newAdmin: AdminManager = {
      id: crypto.randomUUID(),
      initials: `${data.firstName.charAt(0)}${data.lastName.charAt(0)}`.toUpperCase(),
      name: `${data.firstName} ${data.lastName}`,
      code: generateAdminCode(data.role),
      status: 'actif',
      role: data.role,
      email: data.email,
      filter: data.department,
      assignedStudents: [],
    };

    addAdminManager(newAdmin);
    toast.success(`${newAdmin.name} a été créé avec succès.`);
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push("/admin/admin-gestionnaires?refresh=true");
  };

  const handleEtudiantSubmit = async () => {
    const selectedStudents = students.filter(s => s.selected);
    if (selectedStudents.length === 0) {
      toast.error("Veuillez sélectionner au moins un étudiant à nommer gestionnaire.");
      return;
    }

    const newStudentManagers: StudentManager[] = selectedStudents.map(student => ({
      id: crypto.randomUUID(),
      initials: student.initials,
      name: student.name,
      code: student.studentId,
      status: 'actif',
      role: "Étudiant",
      email: `${student.studentId.toLowerCase().replace(/[^a-z0-9]/g, '')}@example.com`,
      filter: student.filiere,
    }));

    newStudentManagers.forEach(manager => addStudentManager(manager));
    toast.success(`${selectedStudents.length} étudiant(s) désigné(s) comme gestionnaire(s) avec succès.`);
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push("/admin/admin-gestionnaires?refresh=true");
  };

  const handleCancel = () => {
    router.push("/admin/admin-gestionnaires");
  };

  // New function to go back
  const handleGoBack = () => {
    router.back();
  };

  const creationGestionnaires = (
    <div className="mx-auto flex flex-col justify-center items-center">
      {/* Back button added here */}
      <div className="w-full flex justify-start mb-4">
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 bg-black rounded-md flex items-center justify-center">
          <User className="text-white" size={24} />
        </div>
        <h1 className="text-2xl font-bold">Créer un nouveau gestionnaire</h1>
      </div>

      <div className="p-6 w-full rounded-md ">
        <div className="mb-6 flex flex-col justify-center items-center">
          <label className="text-sm font-medium mb-1 relative right-56 block">
            Type de responsable <span className="text-red-500">*</span>
          </label>
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-3/4 flex flex-col justify-center items-center"
          >
            <TabsList className="grid grid-cols-2 w-2/3">
              <TabsTrigger
                value="administrateur"
                className={`py-3 ${
                  activeTab === "administrateur"
                    ? "data-[state=active]:bg-black data-[state=active]:text-white"
                    : "bg-white border"
                }`}
              >
                Administrateur
              </TabsTrigger>
              <TabsTrigger
                value="etudiant"
                className={`py-3 ${
                  activeTab === "etudiant"
                    ? "data-[state=active]:bg-black data-[state=active]:text-white"
                    : "bg-white border"
                }`}
              >
                Étudiant
              </TabsTrigger>
            </TabsList>

            <TabsContent value="administrateur" className="mt-6 w-2/3">
              <AdministrateurTable
                form={form}
                onSubmit={handleAdminSubmit}
                onCancel={handleCancel}
              />
            </TabsContent>

            <TabsContent value="etudiant" className="mt-6 w-12/12">
              <EtudiantTable
                students={students}
                setStudents={setStudents}
                selectAll={selectAll}
                handleSelectAll={handleSelectAllStudents}
                handleSelectStudent={handleSelectStudent}
                onSubmit={handleEtudiantSubmit}
                onCancel={handleCancel}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">{creationGestionnaires}</div>
    </AdminLayout>
  );
};

export default CreerGestionnaire;