"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Filter, RefreshCw, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badges";
import { Input } from "../ui/input";
import NeubulaCheckbox from "@/components/ui/assigneCheckbox"; // Ensure this import path is correct
import { Checkbox } from "@/components/ui/Checkbox"; // Keep for the select all checkbox if it's different

interface StudentData {
  id: string;
  initials: string;
  name: string;
  studentId: string;
  status: "regular" | "irregular" | "warning";
  selected: boolean; // This is crucial for tracking selection
  filiere: string;
  niveau: string;
  specialite: string;
}

interface EtudiantTableProps {
  students: StudentData[]; // Initial list of students
  setStudents: React.Dispatch<React.SetStateAction<StudentData[]>>; // Function to update students state in parent
  selectAll: boolean; // Initial selectAll state
  handleSelectAll: (checked: boolean) => void; // Function to update selectAll in parent
  handleSelectStudent: (id: string, checked: boolean) => void; // Function to update individual student selection in parent
  onSubmit: () => void; // This prop will now trigger the save in the parent
  onCancel: () => void; // Added for the Annuler button
}

const EtudiantTable: React.FC<EtudiantTableProps> = ({
  students, // Use `students` directly as it's the current state from the parent
  setStudents, // Keep this to update the parent's state
  selectAll, // Use `selectAll` directly from the parent
  handleSelectAll, // Use `handleSelectAll` from the parent
  handleSelectStudent, // Use `handleSelectStudent` from the parent
  onSubmit, // The validation function from parent
  onCancel, // The cancel function from parent
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<"all" | "regular" | "irregular" | "warning">("all");
  const [filterFiliere, setFilterFiliere] = useState<string>("all");
  const [filterNiveau, setFilterNiveau] = useState<string>("all");
  const [filterSpecialite, setFilterSpecialite] = useState<string>("all");
  const [studentsPerPage, setStudentsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Memoize unique filter options
  const uniqueFilieres = useMemo(() => ["all", ...new Set(students.map((s) => s.filiere))], [students]);
  const uniqueNiveaux = useMemo(() => ["all", ...new Set(students.map((s) => s.niveau))], [students]);
  const uniqueSpecialites = useMemo(() => ["all", ...new Set(students.map((s) => s.specialite))], [students]);

  // Filter students based on search term and active filters
  const filteredStudents = useMemo(() => {
    let filtered = students.filter((student) => {
      const searchMatch =
        !searchQuery ||
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
      const statusMatch = filterStatus === "all" || student.status === filterStatus;
      const filiereMatch = filterFiliere === "all" || student.filiere === filterFiliere;
      const niveauMatch = filterNiveau === "all" || student.niveau === filterNiveau;
      const specialiteMatch = filterSpecialite === "all" || student.specialite === filterSpecialite;

      return searchMatch && statusMatch && filiereMatch && niveauMatch && specialiteMatch;
    });
    return filtered;
  }, [students, searchQuery, filterStatus, filterFiliere, filterNiveau, filterSpecialite]);
  

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    return filteredStudents.slice(startIndex, endIndex);
  }, [filteredStudents, currentPage, studentsPerPage]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  

  // Helper for status badges
  const getStatusBadge = (status: "regular" | "irregular" | "warning") => {
    let text = "";
    let colorClass = "";
    let dotColor = "";

    switch (status) {
      case "regular":
        text = "Régulier";
        colorClass = "bg-green-50 text-green-800";
        dotColor = "bg-green-500";
        break;
      case "irregular":
        text = "Irrégulier";
        colorClass = "bg-amber-50 text-amber-800";
        dotColor = "bg-yellow-500";
        break;
      case "warning":
        text = "Averti";
        colorClass = "bg-red-50 text-red-800";
        dotColor = "bg-red-500";
        break;
      default:
        text = "Inconnu";
        colorClass = "bg-gray-100 text-gray-800";
        dotColor = "bg-gray-500";
    }

    return (
      <span
        className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${colorClass}`}
      >
        <span className={`w-2 h-2 ${dotColor} rounded-full mr-2`}></span>
        {text}
      </span>
    );
  };

  return (
    <div className="">
      <div className="mb- bg-white">
        <div className="border rounded-lg overflow-hidden">
          <div className="flex flex-col items-center p-6 gap-5 justify-between mb-4">
            <div className="flex justify-between w-full">
              <div className="flex items-center">
                <h3 className="text-lg font-medium text-slate-800 mr-3">
                  Liste des étudiants
                </h3>
                <Badge className="bg-sky-100 text-sky-600 text-xs px-2 py-1 rounded-full">
              {filteredStudents.length} étudiants
            </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Select value={filterNiveau} onValueChange={setFilterNiveau}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueNiveaux.map((niveau) => (
                      <SelectItem key={niveau} value={niveau}>
                        {niveau === "all" ? "Tous les niveaux" : `Niveau ${niveau}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterFiliere} onValueChange={setFilterFiliere}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filière" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueFilieres.map((filiere) => (
                      <SelectItem key={filiere} value={filiere}>
                        {filiere === "all" ? "Toutes les filières" : filiere}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterSpecialite} onValueChange={setFilterSpecialite}>
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Spécialité" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueSpecialites.map((specialite) => (
                      <SelectItem key={specialite} value={specialite}>
                        {specialite === "all" ? "Toutes les spécialités" : specialite}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search and filters */}
            <div className="flex items-center gap-3 w-full flex-wrap md:flex-nowrap">
              <div className="relative w-full md:w-auto md:flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Rechercher par nom ou ID..."
                  className="pl-9 h-9 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                <Select
                  value={filterStatus}
                  onValueChange={(value) => setFilterStatus(value as "all" | "regular" | "irregular" | "warning")}
                >
                  <SelectTrigger className="w-full md:w-[150px] h-9 text-xs">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="regular">Régulier</SelectItem>
                    <SelectItem value="irregular">Irrégulier</SelectItem>
                    <SelectItem value="warning">Averti</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={String(studentsPerPage)}
                  onValueChange={(val) => setStudentsPerPage(Number(val))}
                >
                  <SelectTrigger className="w-[120px] h-9 text-xs">
                    <SelectValue placeholder={`${studentsPerPage} par page`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 par page</SelectItem>
                    <SelectItem value="10">10 par page</SelectItem>
                    <SelectItem value="15">15 par page</SelectItem>
                    <SelectItem value="20">20 par page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-3 flex gap-3 font-medium text-sm">
                  <div className="flex items-center">
                    <Checkbox
                      checked={selectAll} // Use the prop directly
                      className="h-5 w-5"
                      onCheckedChange={handleSelectAll} // Use the prop directly
                      id="select-all"
                    />
                  </div>
                  <div className="flex w-full items-center">Noms</div>
                </th>
                <th className="px-4 py-3 text-left font-medium text-sm">Status</th>
                <th className="px-4 py-3 text-left font-medium text-sm">Nommer GC</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student) => (
                <tr key={student.id} className="border-b">
                  <td className="px-6 py-3">
                    <div className="flex items-center">
                      <Checkbox
                        checked={student.selected} // Use student.selected for individual checkbox
                        onCheckedChange={(checked) =>
                          handleSelectStudent(student.id, checked === true) // Call parent handler
                        }
                        id={`student-${student.id}`}
                        className="mr-3 h-5 w-5"
                      />
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium mr-3">
                        {student.initials}
                      </div>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {getStatusBadge(student.status)}
                  </td>
                  <td className="px-6 py-3 text-left">
                    <NeubulaCheckbox
                      checked={student.selected}
                      onChange={(e) =>
                        handleSelectStudent(student.id, e.target.checked)
                      }
                    />
                  </td>
                </tr>
              ))}
              {paginatedStudents.length === 0 && (
                <tr className="border-b">
                  <td colSpan={3} className="px-6 py-3 text-center text-gray-500">
                    Aucun étudiant trouvé avec les filtres actuels.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between">
        <div className="text-sm text-slate-500">
          Affichage de{" "}
          {filteredStudents.length > 0
            ? (currentPage - 1) * studentsPerPage + 1
            : 0}{" "}
          à {Math.min(currentPage * studentsPerPage, filteredStudents.length)}{" "}
          sur {filteredStudents.length} entrées
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageToShow = i + 1;
            if (totalPages > 5) {
              if (currentPage <= 3) {
                pageToShow = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageToShow = totalPages - 4 + i;
              } else {
                pageToShow = currentPage - 2 + i;
              }
            }

            return (
              <Button
                key={pageToShow}
                variant={currentPage === pageToShow ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => paginate(pageToShow)}
              >
                {pageToShow}
              </Button>
            );
          })}
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <span className="text-slate-500">...</span>
          )}
          {totalPages > 5 && currentPage !== totalPages && currentPage < totalPages - 2 && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => paginate(totalPages)}
            >
              {totalPages}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-3 pt-10 border-t">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onCancel} // Use the onCancel prop
          className=" w-50 border border-black on hover:border-0 transition-discrete"
        >
          Annuler
        </Button>
        <Button
          type="button"
          variant="default"
          size="lg"
          onClick={onSubmit} // This will trigger handleEtudiantSubmit in CreerGestionnaire
          className="0 hover:bg-brand-600 w-50"
          // Disable if no students are selected
          disabled={students.filter(s => s.selected).length === 0}
        >
          Valider
        </Button>
      </div>
    </div>
  );
};

export default EtudiantTable;