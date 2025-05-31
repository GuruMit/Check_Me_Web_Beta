// src/app/gestionnaireCours/gc-session/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GestionnaireDeCoursLayout } from "@/layout/GcLayOut";
import MobileCourseLayout from "@/layout/MobileLayOut";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ArrowRightCircle,
  PlayCircle,
  PauseCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import SessionForm from "@/components/gestionnaire/SessionForm";
import {
  useSession,
  ActiveSessionDetails,
  SessionStatus,
} from "@/context/SessionContext";
import Link from "next/link";

// Re-export types that are used by SessionForm, if they are not in a shared types file
export type Course = {
  id: string;
  name: string;
  teacher: string;
  credits: number;
};

export type Class = {
  id: string;
  name: string;
  courses: Course[];
};

export type Program = {
  id: string;
  name: string;
  classes: Class[];
};

// Mock data (same as before)
const mockPrograms: Program[] = [
  {
    id: "ISN",
    name: "ISN",
    classes: [
      {
        id: "RSM",
        name: "Réseaux et Systèmes Multimédias",
        courses: [
          {
            id: "ITIL101",
            name: "Référentiel ITIL",
            teacher: "Mme EYENGA OVONO",
            credits: 3,
          },
          {
            id: "NET201",
            name: "Réseaux Avancés",
            teacher: "Mr DUPONT",
            credits: 4,
          },
          {
            id: "SEC301",
            name: "Sécurité Informatique",
            teacher: "Mlle NANA",
            credits: 3,
          },
        ],
      },
      {
        id: "GL",
        name: "Génie Logiciel",
        courses: [
          {
            id: "SWE401",
            name: "Software Engineering",
            teacher: "Dr SMITH",
            credits: 4,
          },
          {
            id: "DBA301",
            name: "Bases de Données Avancées",
            teacher: "Mme KAMGA",
            credits: 3,
          },
        ],
      },
    ],
  },
  {
    id: "INS",
    name: "INS",
    classes: [
      {
        id: "IAG",
        name: "Intelligence Artificielle et Big Data",
        courses: [
          {
            id: "AI501",
            name: "Intelligence Artificielle",
            teacher: "Pr. MBAPPE",
            credits: 4,
          },
          {
            id: "BDM502",
            name: "Big Data Management",
            teacher: "Dr. TATA",
            credits: 3,
          },
        ],
      },
    ],
  },
  {
    id: "CDN",
    name: "CDN",
    classes: [
      {
        id: "CMD",
        name: "Création Multimédia et Design",
        courses: [
          {
            id: "GRA201",
            name: "Design Graphique",
            teacher: "Mlle YONDO",
            credits: 3,
          },
          {
            id: "ANI301",
            name: "Animation 2D/3D",
            teacher: "Mr. BIYIHA",
            credits: 4,
          },
          {
            id: "VID202",
            name: "Production Vidéo",
            teacher: "Mme FEZEU",
            credits: 3,
          },
        ],
      },
      {
        id: "DEVWEB",
        name: "Développement Web Avancé",
        courses: [
          {
            id: "REA301",
            name: "React.js Avancé",
            teacher: "Mr. SOKOUDJOU",
            credits: 4,
          },
          {
            id: "NOD401",
            name: "Node.js et API",
            teacher: "Dr. NGOBO",
            credits: 3,
          },
        ],
      },
    ],
  },
];

const SessionManagement = () => {
  const isMobile = useIsMobile();
  const router = useRouter();

  const {
    activeSession,
    sessionStarted,
    timeLeft,
    isPaused,
    startSession,
    endSession,
    togglePause,
    recentSessions,
    loadRecentSessions,
  } = useSession();

  const [hasVisitedGcReponses, setHasVisitedGcReponses] = useState(false);

  useEffect(() => {
    loadRecentSessions();
    if (typeof window !== 'undefined') {
      const visited = localStorage.getItem('hasVisitedGcReponses');
      setHasVisitedGcReponses(visited === 'true');
    }
  }, [loadRecentSessions]);


  const [selectedProgram, setSelectedProgram] = useState<Program>(
    mockPrograms[0]
  );
  const [selectedClass, setSelectedClass] = useState<Class>(
    mockPrograms[0].classes[0]
  );
  const [selectedCourse, setSelectedCourse] = useState<Course>(
    mockPrograms[0].classes[0].courses[0]
  );
  const [sessionNumber, setSessionNumber] = useState("1");
  const [startTime, setStartTime] = useState("08h");
  const [endTime, setEndTime] = useState("12h");
  // NEW STATE: For selected duration
  const [selectedDuration, setSelectedDuration] = useState<number>(30); // Default to 30 minutes

  const availableClasses = selectedProgram?.classes || [];
  const availableCourses = selectedClass?.courses || [];

  useEffect(() => {
    if (selectedProgram && !availableClasses.find(c => c.id === selectedClass?.id)) {
      setSelectedClass(selectedProgram.classes[0]);
      setSelectedCourse(selectedProgram.classes[0].courses[0]);
    }
  }, [selectedProgram, availableClasses, selectedClass]);

  useEffect(() => {
    if (selectedClass && !availableCourses.find(c => c.id === selectedCourse?.id)) {
      setSelectedCourse(selectedClass.courses[0]);
    }
  }, [selectedClass, availableCourses, selectedCourse]);

  const sessionNumbers = ["1", "2", "3", "4", "5"];
  const startTimes = ["08h", "09h", "10h", "14h", "15h"];
  const endTimes = ["12h", "13h", "16h", "17h", "18h"];

  const SESSIONS_PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(recentSessions.length / SESSIONS_PER_PAGE);

  const paginatedSessions = recentSessions.slice(
    (currentPage - 1) * SESSIONS_PER_PAGE,
    currentPage * SESSIONS_PER_PAGE
  );

  const handleStartSession = () => {
    if (!selectedProgram || !selectedClass || !selectedCourse || !sessionNumber || !startTime || !endTime || selectedDuration <= 0) {
      console.error("Please ensure all session fields are filled and duration is valid.");
      return;
    }

    startSession({
      course: selectedCourse,
      program: selectedProgram,
      class: selectedClass,
      sessionNumber,
      startTime,
      endTime,
      durationInMinutes: selectedDuration, // Pass the new duration
    });

    router.push("/gestionnaireCours/gc-reponses");
  };

  const navigateBack = () => {
    router.push("/gestionnaireCours/gc-dashboard");
  };

  // Helper to get status class and icon
  const getStatusDisplay = (status: SessionStatus) => {
    switch (status) {
      case "ongoing":
        return { color: "border-green-500", text: "En cours", icon: <PlayCircle className="h-4 w-4 text-green-500 mr-1" /> };
      case "paused":
        return { color: "border-yellow-500", text: "En pause", icon: <PauseCircle className="h-4 w-4 text-yellow-500 mr-1" /> };
      case "ended":
        return { color: "border-gray-400", text: "Terminée", icon: <CheckCircle2 className="h-4 w-4 text-gray-500 mr-1" /> };
      case "cancelled":
        return { color: "border-red-500", text: "Annulée", icon: <XCircle className="h-4 w-4 text-red-500 mr-1" /> };
      default:
        return { color: "border-gray-300", text: "Inconnu", icon: null };
    }
  };


  const sessionManagementContent = (
    <div className="flex flex-col py-10 px-5 lg:pr-5 md:pl-5 lg:flex-row gap-10">
      {/* Left Section - Session Form */}
      <div className="w-full lg:w-2/3">
        <div className="border w-fit relative rounded-t-2xl">
          <Button
            className="p-3 bg-brand-400 flex justify-center rounded-none rounded-t-2xl items-center text-center cursor-pointer"
            onClick={navigateBack}
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-col gap-6 border px-5 py-15 rounded-tr-xl rounded-b-xl bg-white">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-xl font-semibold">Lancer une session</h1>
            {hasVisitedGcReponses && sessionStarted && activeSession && (
              <Link href="/gestionnaireCours/gc-reponses" passHref>
                <Button variant="outline" className="text-brand-500 border-brand-500 hover:bg-brand-50">
                  <ArrowRightCircle className="h-4 w-4 mr-2" />
                  Retour à la session
                </Button>
              </Link>
            )}
          </div>

          <SessionForm
            sessionNumber={sessionNumber}
            startTime={startTime}
            endTime={endTime}
            timeLeft={timeLeft}
            handleStartSession={handleStartSession}
            sessionStarted={sessionStarted}
            isPaused={isPaused}
            onTogglePause={togglePause}

            courses={availableCourses}
            programs={mockPrograms}
            classes={availableClasses}
            sessionNumbers={sessionNumbers}
            startTimes={startTimes}
            endTimes={endTimes}

            selectedProgram={selectedProgram}
            selectedClass={selectedClass}
            selectedCourse={selectedCourse}
            onProgramChange={setSelectedProgram}
            onClassChange={setSelectedClass}
            onCourseChange={setSelectedCourse}
            onSessionNumberChange={setSessionNumber}
            onStartTimeChange={setStartTime}
            onEndTimeChange={setEndTime}
            // NEW PROPS: Pass duration state and handler
            selectedDuration={selectedDuration}
            onDurationChange={setSelectedDuration}
          />
        </div>
      </div>

      {/* Right Section - Recent Requests */}
      <div className="w-full lg:w-1/3 border bg-white py-10 h-fit mt-10 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 ml-5">Demandes récentes</h2>

        {recentSessions.length > 0 ? (
          <div className="space-y-6">
            {paginatedSessions.map((session) => {
              const { color, text, icon } = getStatusDisplay(session.status);
              return (
                <div key={session.id} className={`border-r-4 px-5 py-2 ${color}`}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{session.course.name}</h3>
                    <span className="text-gray-600 text-sm">{session.startTime}-{session.endTime}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{session.program.name} - {session.class.name}</span>
                    <div className="flex items-center">
                      {icon}
                      <span>{text}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-700 font-medium">
                    Session: {session.sessionNumber}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">Aucune demande récente.</p>
        )}

        {/* Pagination */}
        {recentSessions.length > SESSIONS_PER_PAGE && (
          <div className="flex justify-center mt-8 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <Button
                key={pageNumber}
                variant={pageNumber === currentPage ? "default" : "outline"}
                className={
                  pageNumber === currentPage
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                    : ""
                }
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </Button>
            ))}

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return isMobile ? (
    <MobileCourseLayout title="Gestion de Session">
      {sessionManagementContent}
    </MobileCourseLayout>
  ) : (
    <GestionnaireDeCoursLayout>
      <div className="max-w-7xl mx-auto">{sessionManagementContent}</div>
    </GestionnaireDeCoursLayout>
  );
};

// This function is no longer strictly needed in this component as duration is handled by context,
// but keeping it here as a utility if needed elsewhere for duration calculations.
function calculateDurationInMinutes(startTime: string, endTime: string) {
  const parseTime = (time: string) => {
    const [hours] = time.split("h"); // Only parse hours for simplicity from "08h" format
    return parseInt(hours, 10);
  };

  const startHour = parseTime(startTime);
  const endHour = parseTime(endTime);

  if (isNaN(startHour) || isNaN(endHour)) {
    // Fallback or error handling for invalid format
    return 0; // Or throw an error
  }

  // Handle overnight sessions if necessary, though current mock implies same day
  let duration = endHour - startHour;
  if (duration < 0) {
    // Assuming a max of 24 hours, if endTime is earlier than startTime, it means next day
    // For this app's current time picker, simple difference is likely sufficient.
    duration += 24; // If 16h to 08h, means 16 hours remaining
  }
  return duration;
}

export default SessionManagement;