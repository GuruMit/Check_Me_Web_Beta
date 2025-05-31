"use client";

import { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "../ui/Badges";

// Student data type

export interface Student {
  id: string;
  name: string;
  initials: string;
  bgColor: string;
  total: string;
  status: string;
  statusColor: string;
  filiere?: string;
  niveau?: string;
  courses: {
    course: Course;
  }[];
  recentSessions: RecentSessions;
}

interface RecentSessions {
  [courseId: string]: {
    [date: string]: (boolean | null)[];
  };
}

// Define Course and Level data types
interface Course {
  id: string;
  name: string;
  // sessions: MiniSession[]; // Array of sessions, one entry per session date
  date?: string; // Date of the course session
}

interface Level {
  id: string;
  name: string;
  filiere: string;
  courses: {
    id: string;
    name: string;
    sessions: number;
    date?: string; // Date of the course session
  }[];
}

// Column definition for sorting
interface Column {
  key: keyof Student | "actions";
  label: string;
  sortable: boolean;
}

interface StudentListProps {
  initialStudents?: Student[];
  // filtering alternative 1 main design
  // filiereFilter?: string | null;
  // niveauFilter?: string | null;
  // coursFilter?: string | null;

  //Filterig alternative 2
  filters?: Record<string, string[]>;
}

export function StudentList({
  initialStudents = [],
  // filtering alternative 1 main design
  // filiereFilter = null,
  // niveauFilter = null,
  // coursFilter = null,

  //Filterig alternative 2
  filters = { filiere: [], niveau: [], cours: [] },
}: StudentListProps) {
  // Generate default levels and courses

  const defaultLevels: Level[] = [
    // ISN
    {
      id: "5",
      name: "Niveau 5",
      filiere: "ISN",
      courses: [
        { id: "501", name: "Intelligence ArtificielleT", sessions: 5 },
        { id: "502", name: "Cybersécurité Avancée", sessions: 5 },
        { id: "503", name: "Cloud Computing", sessions: 5 },
      ],
    },
    {
      id: "4",
      name: "Niveau 4",
      filiere: "ISN",
      courses: [
        { id: "401", name: "401 - Big Data", sessions: 5 },
        { id: "402", name: "402 - IoT", sessions: 5 },
        { id: "403", name: "403 - Blockchain", sessions: 5 },
      ],
    },
    {
      id: "3",
      name: "Niveau 3",
      filiere: "ISN",
      courses: [
        { id: "301", name: "301 - Sécurité informatique", sessions: 5 },
        { id: "302", name: "302 - Intelligence artificielle", sessions: 5 },
      ],
    },

    // INS
    {
      id: "5",
      name: "Niveau 5",
      filiere: "INS",
      courses: [
        { id: "511", name: "511 - Usine 4.0", sessions: 5 },
        { id: "512", name: "512 - Systèmes autonomes", sessions: 5 },
      ],
    },
    {
      id: "4",
      name: "Niveau 4",
      filiere: "INS",
      courses: [
        { id: "411", name: "411 - Digital twin", sessions: 5 },
        { id: "412", name: "412 - Fabrication additive", sessions: 5 },
      ],
    },

    // CDN
    {
      id: "5",
      name: "Niveau 5",
      filiere: "CDN",
      courses: [
        { id: "521", name: "521 - Marketing digital", sessions: 5 },
        { id: "522", name: "522 - Projet de fin d'études", sessions: 5 },
      ],
    },
    {
      id: "2",
      name: "Niveau 2",
      filiere: "CDN",
      courses: [
        { id: "201", name: "201 - Motion design", sessions: 5 },
        { id: "202", name: "202 - Design d'interface", sessions: 5 },
      ],
    },
  ];

  // Generate default students

  const defaultStudents: Student[] =
    initialStudents.length > 0
      ? initialStudents
      : [
          {
            id: "20G60313",
            name: "ELLA Kris",
            initials: "EK",
            bgColor: "bg-sky-100",
            total: "",
            status: "Régulier",
            statusColor: "text-green-500",
            filiere: "ISN",
            niveau: "5",
            courses: [
              {
                course: {
                  id: "501",
                  name: "Course A",
                },
              },
              {
                course: {
                  id: "502",
                  name: "Course B",
                },
              },
              {
                course: {
                  id: "503",
                  name: "Course C",
                },
              },
              {
                course: {
                  id: "3",
                  name: "Course D",
                },
              },
            ],
            recentSessions: {
              // Updated to the new structure
              "502": {
                "11/05/2025": [true, false],
                "12/05/2025": [false, true],
                "26/05/2025": [true, null],
              },
              "501": {
                "25/05/2025": [true, false],
                "15/05/2025": [false, true],
              },
            },
          },
          {
            id: "20G60314",
            name: "MBOUO Jean",
            initials: "MJ",
            bgColor: "bg-sky-100",
            total: "",
            status: "Régulier",
            statusColor: "text-green-500",
            filiere: "ISN",
            niveau: "5",
            courses: [
              {
                course: {
                  id: "1",
                  name: "Course A",
                },
              },
              {
                course: {
                  id: "2",
                  name: "Course B",
                },
              },
              {
                course: {
                  id: "3",
                  name: "Course C",
                },
              },
            ],
            recentSessions: {}, // Updated to be an empty object
          },
          {
            id: "20G60315",
            name: "TCHANA Marie",
            initials: "TM",
            bgColor: "bg-sky-100",
            total: "",
            status: "Irrégulier",
            statusColor: "text-amber-500",
            filiere: "ISN",
            niveau: "4",
            courses: [
              {
                course: {
                  id: "501",
                  name: "Course A",
                },
              },
              {
                course: {
                  id: "502",
                  name: "Course B",
                },
              },
              {
                course: {
                  id: "503",
                  name: "Course C",
                },
              },
              {
                course: {
                  id: "3",
                  name: "Course D",
                },
              },
            ],
            recentSessions: {}, // Updated to be an empty object
          },
          {
            id: "20G60316",
            name: "KAMGA Paul",
            initials: "KP",
            bgColor: "bg-sky-100",
            total: "",
            status: "Averti",
            statusColor: "text-red-500",
            filiere: "INS",
            niveau: "3",
            courses: [
              {
                course: {
                  id: "501",
                  name: "Course A",
                },
              },
              {
                course: {
                  id: "502",
                  name: "Course B",
                },
              },
              {
                course: {
                  id: "503",
                  name: "Course C",
                },
              },
              {
                course: {
                  id: "3",
                  name: "Course D",
                },
              },
            ],
            recentSessions: {}, // Updated to be an empty object
          },
          {
            id: "20G60317",
            name: "NGUEME Alice",
            initials: "NA",
            bgColor: "bg-sky-100",
            total: "",
            status: "Averti",
            statusColor: "text-red-500",
            filiere: "CDN",
            niveau: "2",
            courses: [
              {
                course: {
                  id: "501",
                  name: "Course A",
                },
              },
              {
                course: {
                  id: "502",
                  name: "Course B",
                },
              },
              {
                course: {
                  id: "503",
                  name: "Course C",
                },
              },
              {
                course: {
                  id: "3",
                  name: "Course D",
                },
              },
            ],
            recentSessions: {}, // Updated to be an empty object
          },
          {
            id: "20G60318",
            name: "Paul Alice",
            initials: "NA",
            bgColor: "bg-sky-100",
            total: "",
            status: "Averti",
            statusColor: "text-red-500",
            filiere: "CDN",
            niveau: "2",
            courses: [
              {
                course: {
                  id: "501",
                  name: "Course A",
                },
              },
              {
                course: {
                  id: "502",
                  name: "Course B",
                },
              },
              {
                course: {
                  id: "503",
                  name: "Course C",
                },
              },
              {
                course: {
                  id: "3",
                  name: "Course D",
                },
              },
            ],
            recentSessions: {}, // Updated to be an empty object
          },
        ];

  // States
  const [students, setStudents] = useState<Student[]>(
    initialStudents.length > 0 ? initialStudents : defaultStudents
  );
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Student | null;
    direction: "ascending" | "descending";
  }>({
    key: null,
    direction: "ascending",
  });
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(
    new Set()
  );

  // Define sortable columns
  const columns: Column[] = [
    { key: "name", label: "Noms", sortable: true },
    { key: "courses", label: "Sessions", sortable: false },
    { key: "total", label: "Total", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ];

  const getCourseSessions = (student: Student, courseId: string) => {
    const courseSessions = student.recentSessions[courseId];
    if (!courseSessions) {
      return []; // Return an empty array if there are no sessions for the course
    }

    const sessionsArray = Object.entries(courseSessions)
      .map(([date, sessions]) =>
        sessions.map((session, index) => ({
          value: session,
          date: date,
          sessionNumber: index + 1,
        }))
      )
      .flat();

    // Sort the sessionsArray by date.
    sessionsArray.sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-"));
      const dateB = new Date(b.date.split("/").reverse().join("-"));
      return dateB.getTime() - dateA.getTime();
    });

    return sessionsArray.slice(0, 4);
  };

  // const getCourseSessions = (student: Student, courseId: string) => {
  //   const course = student.cours?.find(c => c.courseId === courseId)
  //   return course?.sessions || []
  // }

  const getCourseName = (courseId: string) => {
    const course = defaultLevels
      .flatMap((l) => l.courses)
      .find((c) => c.id === courseId);

    return course?.name.split(" - ")[0] || "Cours inconnu";
  };

  // Write a function to get the dates of the course sessions for a student

  //  const getCourseSessionDate = (student: Student, courseId: string): string[] => {
  //   const courseEntry = student.courses.find(c => c.course.id === courseId);
  //   if (!courseEntry) {
  //     return []; // Course not found for this student
  //   }
  //   return courseEntry.course.sessions.map(session => session.date);
  // };

  // Filter and sort students when parameters change
  useEffect(() => {
    let result = [...students];

    // Apply main filters design (filière, niveau, cours)
    // if (filiereFilter) {
    //   result = result.filter((student) => student.filiere === filiereFilter);
    // }

    // Apply advanced filters //Filterig alternative 2
    if (filters) {
      // Filière filter
      if (filters.filiere && filters.filiere.length > 0) {
        result = result.filter(
          (student) =>
            student.filiere && filters.filiere.includes(student.filiere)
        );
      }
    }

    // Filtre par cours
    if (filters.cours?.length > 0) {
      const courseId = parseInt(filters.cours[0]);
      result = result.filter((student) =>
        student.courses?.some((c) => c.course.id === courseId.toString())
      );
    }
    // filtering alternative 1 main design
    // if (niveauFilter) {
    //   result = result.filter((student) => student.niveau === niveauFilter);
    // }

    // Niveau filter //Filterig alternative 2
    if (filters.niveau && filters.niveau.length > 0) {
      result = result.filter(
        (student) => student.niveau && filters.niveau.includes(student.niveau)
      );
    }

    //  filtering alternative 1 main design
    // if (coursFilter) {
    //   result = result.filter((student) => student.cours?.includes(coursFilter));
    // }

    // Cours filter //Filterig alternative 2
    if (filters.cours && filters.cours.length > 0) {
      result = result.filter(
        (student) =>
          student.courses &&
          student.courses.some((course) =>
            filters.cours.includes(course.course.id)
          )
      );
    }

    // Apply search filter
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(lowercasedQuery) ||
          student.id.toLowerCase().includes(lowercasedQuery)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(
        (student) => student.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Apply sorting
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (
          sortConfig.key &&
          (a[sortConfig.key as keyof Student] ?? "") <
            (b[sortConfig.key as keyof Student] ?? "")
        ) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (
          (a[sortConfig.key as keyof Student] ?? "") >
          (b[sortConfig.key as keyof Student] ?? "")
        ) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        if (sortConfig.key === "total") {
          const aTotal = getDisplayedSessions(a).reduce(
            (sum, s) => sum + (s.value ? 5 : 0),
            0
          );
          const bTotal = getDisplayedSessions(b).reduce(
            (sum, s) => sum + (s.value ? 5 : 0),
            0
          );
          aValue = aTotal;
          bValue = bTotal;
        } else {
          aValue = a[sortConfig.key as keyof Student] ?? "";
          bValue = b[sortConfig.key as keyof Student] ?? "";
        }

        if (aValue < bValue)
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue)
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    setFilteredStudents(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    searchQuery,
    statusFilter,
    sortConfig,
    students,
    //filtering alternative 1 main design
    // filiereFilter,
    // niveauFilter,
    // coursFilter,

    ////Filterig alternative 2
    filters,
  ]);

  // Handle select all checkbox
  useEffect(() => {
    if (selectAll) {
      const allIds = getCurrentPageStudents().map((student) => student.id);
      setSelectedStudents(new Set(allIds));
    } else {
      setSelectedStudents(new Set());
    }
  }, [selectAll, currentPage, studentsPerPage]);

  // Get current page students
  const getCurrentPageStudents = () => {
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    return filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Request sort
  const requestSort = (key: keyof Student) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Get sort direction icon
  const getSortDirectionIcon = (key: keyof Student) => {
    if (sortConfig.key !== key) {
      return <ChevronDown className="h-4 w-4 opacity-50" />;
    }
    return sortConfig.direction === "ascending" ? (
      <ChevronDown className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4 transform rotate-180" />
    );
  };

  // Toggle student selection
  const toggleStudentSelection = (studentId: string) => {
    const newSelectedStudents = new Set(selectedStudents);
    if (newSelectedStudents.has(studentId)) {
      newSelectedStudents.delete(studentId);
    } else {
      newSelectedStudents.add(studentId);
    }
    setSelectedStudents(newSelectedStudents);
    setSelectAll(newSelectedStudents.size === getCurrentPageStudents().length);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setSortConfig({ key: null, direction: "ascending" });
    setSelectAll(false);
    setSelectedStudents(new Set());
  };

  // Refresh data (simulate loading)
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getDisplayedSessions = (student: Student) => {
    if (filters.cours?.length > 0) {
      return getCourseSessions(student, filters.cours[0]);
    }

    const today = new Date();
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);
    twoDaysAgo.setHours(0, 0, 0, 0);

    const allSessions = Object.entries(student.recentSessions)
      .flatMap(([courseId, dates]) =>
        Object.entries(dates).flatMap(([dateStr, sessions]) => {
          const [day, month, year] = dateStr.split("/");
          const sessionDate = new Date(`${year}-${month}-${day}T00:00:00`);

          if (sessionDate >= twoDaysAgo) {
            return sessions.map((value, index) => ({
              date: sessionDate,
              value,
              courseId,
              sessionNumber: index + 1,
            }));
          }
          return [];
        })
      )
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    const coursesPresent = new Set<string>();
    return allSessions
      .filter((session) => {
        if (coursesPresent.size < 2 || coursesPresent.has(session.courseId)) {
          coursesPresent.add(session.courseId);
          return true;
        }
        return false;
      })
      .slice(0, 4);
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      {/* Header with actions */}
      <div className="flex flex-col gap-3 p-4 border-b border-slate-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-slate-800 mr-3">
              Liste des étudiants
            </h3>
            <Badge className="bg-sky-100 text-sky-600 text-xs px-2 py-1 rounded-full">
              {filteredStudents.length} étudiants
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-slate-500"
              onClick={resetFilters}
            >
              <Filter className="h-4 w-4 mr-1" />
              Réinitialiser
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-slate-500"
              onClick={refreshData}
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
            </Button>
            <Select defaultValue="current">
              <SelectTrigger className="w-[180px] h-8 text-xs">
                <SelectValue placeholder="Ce semestre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Ce semestre</SelectItem>
                <SelectItem value="previous">Semestre précédent</SelectItem>
                <SelectItem value="all">Tous les semestres</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[150px] h-9 text-xs">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="régulier">Régulier</SelectItem>
                <SelectItem value="irrégulier">Irrégulier</SelectItem>
                <SelectItem value="averti">Averti</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={String(studentsPerPage)}
              onValueChange={(val) => setStudentsPerPage(Number(val))}
            >
              <SelectTrigger className="w-[120px] h-9 text-xs">
                <SelectValue placeholder="5 par page" />
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="w-12 px-3 py-3">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300"
                    checked={selectAll}
                    onChange={() => setSelectAll(!selectAll)}
                  />
                </div>
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-3 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider ${
                    column.sortable ? "cursor-pointer hover:bg-slate-100" : ""
                  }`}
                  onClick={() =>
                    column.sortable && requestSort(column.key as keyof Student)
                  }
                >
                  <div className="flex items-center">
                    {column.label}
                    {column.sortable &&
                      getSortDirectionIcon(column.key as keyof Student)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {isLoading ? (
              Array(studentsPerPage)
                .fill(0)
                .map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-3 py-3">
                      <div className="h-4 w-4 bg-slate-200 rounded"></div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-slate-200"></div>
                        <div className="ml-3">
                          <div className="h-4 w-32 bg-slate-200 rounded"></div>
                          <div className="h-3 w-20 bg-slate-200 rounded mt-1"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="h-4 w-16 bg-slate-200 rounded"></div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex space-x-1">
                        {Array(7)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className="h-4 w-4 bg-slate-200 rounded"
                            ></div>
                          ))}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="h-4 w-10 bg-slate-200 rounded"></div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="h-4 w-16 bg-slate-200 rounded"></div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="h-4 w-20 bg-slate-200 rounded"></div>
                    </td>
                  </tr>
                ))
            ) : getCurrentPageStudents().length > 0 ? (
              getCurrentPageStudents().map((student) => (
                <tr key={student.id} className="hover:bg-slate-50">
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300"
                        checked={selectedStudents.has(student.id)}
                        onChange={() => toggleStudentSelection(student.id)}
                      />
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center">
                      <div
                        className={`h-8 w-8 rounded-full ${student.bgColor} flex items-center justify-center text-sm font-medium text-sky-700`}
                      >
                        {student.initials}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-800">
                          {student.name}
                        </p>
                        <p className="text-xs text-slate-500">{student.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-1">
                      {filters.cours.length > 0
                        ? /* Affiche les sessions filtrées par cours */
                          getCourseSessions(student, filters.cours[0]).map(
                            (subSession, index) => (
                              <div
                                key={index}
                                className={`h-5 w-5 rounded-sm border ${
                                  subSession.value === true
                                    ? "bg-green-100 border-green-200"
                                    : subSession.value === false
                                    ? "bg-red-100 border-red-200"
                                    : "bg-slate-100 border-slate-200"
                                }`}
                                title={`${getCourseName(filters.cours[0])} - ${
                                  subSession.date
                                } (Session ${subSession.sessionNumber})`}
                              ></div>
                            )
                          )
                        : /* Nouvelle logique corrigée avec gestion des dates et cours multiples */
                          (() => {
                            const today = new Date();
                            const twoDaysAgo = new Date(today);
                            twoDaysAgo.setDate(today.getDate() - 2);
                            twoDaysAgo.setHours(0, 0, 0, 0); // Réinitialiser à minuit

                            // Collecter toutes les sessions des 2 derniers jours
                            const allSessions = Object.entries(
                              student.recentSessions
                            )
                              .flatMap(([courseId, dates]) =>
                                Object.entries(dates).flatMap(
                                  ([dateStr, sessions]) => {
                                    const [day, month, year] =
                                      dateStr.split("/");
                                    const sessionDate = new Date(
                                      `${year}-${month}-${day}T00:00:00`
                                    );

                                    if (sessionDate >= twoDaysAgo) {
                                      return sessions.map((value, index) => ({
                                        date: sessionDate,
                                        value,
                                        courseId,
                                        sessionNumber: index + 1,
                                      }));
                                    }
                                    return [];
                                  }
                                )
                              )
                              .sort(
                                (a, b) => b.date.getTime() - a.date.getTime()
                              ); // Tri décroissant

                            // Garder max 4 sessions avec 2 cours maximum
                            const coursesPresent = new Set<string>();
                            return allSessions
                              .filter((session) => {
                                if (
                                  coursesPresent.size < 2 ||
                                  coursesPresent.has(session.courseId)
                                ) {
                                  coursesPresent.add(session.courseId);
                                  return true;
                                }
                                return false;
                              })
                              .slice(0, 4); // Limite à 4 sessions max
                          })().map((session, index) => (
                            <div
                              key={index}
                              className={`h-5 w-5 rounded-sm border ${
                                session.value === true
                                  ? "bg-green-100 border-green-200"
                                  : session.value === false
                                  ? "bg-red-100 border-red-200"
                                  : "bg-slate-100 border-slate-200"
                              }`}
                              title={`${getCourseName(
                                session.courseId
                              )} - ${session.date.toLocaleDateString(
                                "fr-FR"
                              )} (Session ${session.sessionNumber})`}
                            ></div>
                          ))}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    {(() => {
                      const sessions = getDisplayedSessions(student);
                      const total = sessions.reduce(
                        (sum, s) => sum + (s.value ? 5 : 0),
                        0
                      );
                      const color =
                        total < 10
                          ? "text-red-500"
                          : total < 15
                          ? "text-amber-500"
                          : "text-green-500";

                      return (
                        <span className={`text-sm ${color}`}>{total}/20</span>
                      );
                    })()}
                  </td>
                    <td className="px-3 py-3">
                    {(() => {
                      const sessions = getDisplayedSessions(student);
                      const total = sessions.reduce(
                      (sum, s) => sum + (s.value ? 5 : 0),
                      0
                      );

                      let status = "Averti";
                      let bgColor = "bg-red-100 text-red-800";
                      let dotColor = "bg-red-500";

                      if (total >= 15) {
                      status = "Régulier";
                      bgColor = "bg-green-100 text-green-800";
                      dotColor = "bg-green-500";
                      } else if (total >= 10) {
                      status = "Irrégulier";
                      bgColor = "bg-yellow-100 text-yellow-800";
                      dotColor = "bg-yellow-500";
                      }

                      return (
                      <div
                        className={`items-center px-2 py-0 inline-flex text-xs leading-5 font-medium rounded-full ${bgColor}`}
                      >
                        <div
                        className={`h-1.5 w-1.5 rounded-full mr-2 ${dotColor}`}
                        ></div>
                        {status}
                      </div>
                      );
                    })()}
                    </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="px-3 py-6 text-center text-sm text-slate-500"
                >
                  Aucun étudiant trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
            // Show first page, last page, current page, and pages around current
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
    </div>
  );
}
