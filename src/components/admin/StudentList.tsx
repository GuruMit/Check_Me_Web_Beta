"use client"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Define student data type
interface Student {
  id: string
  name: string
  matricule: string
  initials: string
  bgColor: string
  sessions: Array<"present" | "absent" | "pending">
  total: number
  status: "regular" | "irregular" | "warned"
}

// Sample data
const STUDENTS_DATA: Student[] = [
  {
    id: "1",
    name: "ELLA Kris",
    matricule: "20G60313",
    initials: "EK",
    bgColor: "bg-emerald-100 text-emerald-800",
    sessions: ["present", "present", "present", "absent", "pending", "pending"],
    total: 16,
    status: "regular",
  },
  {
    id: "2",
    name: "NDJESSE LETERE",
    matricule: "20G60380",
    initials: "NL",
    bgColor: "bg-blue-100 text-blue-800",
    sessions: ["present", "absent", "present", "absent", "present", "pending"],
    total: 12,
    status: "irregular",
  },
  {
    id: "3",
    name: "BAKEHI William",
    matricule: "20G60345",
    initials: "BW",
    bgColor: "bg-purple-100 text-purple-800",
    sessions: ["absent", "absent", "absent", "absent", "pending", "pending"],
    total: 0,
    status: "warned",
  },
  {
    id: "4",
    name: "MATAKON NGAROUA",
    matricule: "20G349",
    initials: "MN",
    bgColor: "bg-indigo-100 text-indigo-800",
    sessions: ["present", "present", "present", "present", "present", "pending"],
    total: 20,
    status: "regular",
  },
  {
    id: "5",
    name: "ELANGA Philippe",
    matricule: "20G60168",
    initials: "EP",
    bgColor: "bg-teal-100 text-teal-800",
    sessions: ["absent", "absent", "present", "absent", "present", "pending"],
    total: 8,
    status: "warned",
  },
  // Generate more students
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `${i + 6}`,
    name: `Étudiant ${i + 6}`,
    matricule: `20G${60400 + i}`,
    initials: `S${i + 6}`,
    bgColor: "bg-slate-100 text-slate-800",
    sessions: ["present", "present", "present", "present", "present", "pending"] as Array<
      "present" | "absent" | "pending"
    >,
    total: 15 + i,
    status: "regular" as "regular" | "irregular" | "warned",
  })),
]

interface StudentListProps {
  className?: string
}

export function StudentList({ className }: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<"name" | "total" | "status">("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [statusFilter, setStatusFilter] = useState<"all" | "regular" | "irregular" | "warned">("all")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const studentsPerPage = 10

  // Handle sort change
  const handleSort = (field: "name" | "total" | "status") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter and sort students
  const filteredStudents = useMemo(() => {
    return STUDENTS_DATA.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.matricule.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || student.status === statusFilter
      return matchesSearch && matchesStatus
    }).sort((a, b) => {
      if (sortField === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortField === "total") {
        return sortDirection === "asc" ? a.total - b.total : b.total - a.total
      } else {
        // Status sort: regular > irregular > warned
        const statusOrder = { regular: 0, irregular: 1, warned: 2 }
        return sortDirection === "asc"
          ? statusOrder[a.status] - statusOrder[b.status]
          : statusOrder[b.status] - statusOrder[a.status]
      }
    })
  }, [searchTerm, statusFilter, sortField, sortDirection])

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)

  // Handle select all
  const handleSelectAll = () => {
    if (selectedStudents.length === currentStudents.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(currentStudents.map((student) => student.id))
    }
  }

  // Handle select individual
  const handleSelectStudent = (id: string) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((studentId) => studentId !== id))
    } else {
      setSelectedStudents([...selectedStudents, id])
    }
  }

  return (
    <div className={className}>
      <div className="bg-white  rounded-lg border border-slate-200 h-full flex flex-col overflow-hidden">
        {/* Header with search and filters */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold">Liste des étudiants</h3>
              <span className="ml-2 px-2 py-1 bg-sky-100 text-sky-700 text-xs rounded-full">
                {filteredStudents.length} étudiants
              </span>
            </div>
            <div className="flex items-center gap-2">
              <select
                className="rounded-md border border-slate-200 text-sm py-1 px-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option value="all">Tous les statuts</option>
                <option value="regular">Régulier</option>
                <option value="irregular">Irrégulier</option>
                <option value="warned">Averti</option>
              </select>
              <span className="text-sm text-slate-600">Ce semestre</span>
              <ChevronRight size={16} className="text-slate-400" />
            </div>
          </div>

          <Input
            type="search"
            placeholder="Rechercher par nom ou matricule..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Table */}
        <div className="overflow-y-auto flex-1">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 sticky top-0">
              <tr>
                <th scope="col" className="px-4 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-sky-600 mr-3"
                      checked={selectedStudents.length === currentStudents.length && currentStudents.length > 0}
                      onChange={handleSelectAll}
                    />
                    <button
                      className="flex items-center text-xs font-medium text-slate-600 uppercase tracking-wider"
                      onClick={() => handleSort("name")}
                    >
                      Noms
                      <ChevronDown size={14} className="ml-1" />
                    </button>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider"
                >
                  Sessions
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider"
                >
                  <button className="flex items-center" onClick={() => handleSort("total")}>
                    Total
                    <ChevronDown size={14} className="ml-1" />
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider"
                >
                  <button className="flex items-center" onClick={() => handleSort("status")}>
                    Status
                    <ChevronDown size={14} className="ml-1" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {currentStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 text-sky-600 mr-3"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                      />
                      <div className="flex items-center">
                        <div
                          className={`h-8 w-8 rounded-full ${student.bgColor} flex items-center justify-center font-medium text-sm`}
                        >
                          {student.initials}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-slate-900">{student.name}</div>
                          <div className="text-xs text-slate-500">{student.matricule}</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex space-x-1">
                      {student.sessions.map((session, index) => (
                        <div
                          key={index}
                          className={`h-5 w-5 rounded-full ${
                            session === "present"
                              ? "bg-green-500"
                              : session === "absent"
                                ? "bg-red-500"
                                : "bg-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td
                    className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${
                      student.total >= 15 ? "text-green-600" : student.total >= 10 ? "text-amber-600" : "text-red-600"
                    }`}
                  >
                    {student.total}/20
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === "regular"
                          ? "bg-green-100 text-green-800"
                          : student.status === "irregular"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      •{" "}
                      {student.status === "regular"
                        ? "Régulier"
                        : student.status === "irregular"
                          ? "Irrégulier"
                          : "Averti"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm text-slate-700">
              Affichage {indexOfFirstStudent + 1}-{Math.min(indexOfLastStudent, filteredStudents.length)} sur{" "}
              {filteredStudents.length} étudiants
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Précédent
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
