// src/app/gestionnaireCours/gc-reponses/page.tsx
"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GestionnaireDeCoursLayout } from "@/layout/GcLayOut";
import MobileCourseLayout from "@/layout/MobileLayOut";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Cards";
import { Progress } from "@/components/ui/progess";
import { Badge } from "@/components/ui/Badges";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Users,
  CheckCircle,
  AlertCircle,
  BarChart2,
  Clock,
  PauseCircle,
  PlayCircle,
  UserCheck,
  RefreshCw,
  PowerOff,
  Ban, // Import the Ban icon for cancellation
  XCircle, // Already imported, good for "no response" students after cancel
} from "lucide-react";
import { useSession } from "@/context/SessionContext";

// Define Student type and initial data
type StudentStatus = "waiting" | "responded" | "manually_marked" | "no_response";

type Student = {
  id: string;
  name: string;
  matricule: string;
  initials: string;
  bgColor: string;
  status: StudentStatus;
  responseTime: string | null;
  hasConnectivityIssue: boolean;
};

// Define local page session status (can be different from global SessionStatus)
type PageSessionStatus = "active" | "paused" | "ended" | "cancelled";

const initialStudents: Student[] = [
  { id: "S001", name: "Alice Dupont", matricule: "M001", initials: "AD", bgColor: "bg-blue-200", status: "waiting", responseTime: null, hasConnectivityIssue: false },
  { id: "S002", name: "Bob Martin", matricule: "M002", initials: "BM", bgColor: "bg-green-200", status: "waiting", responseTime: null, hasConnectivityIssue: false },
  { id: "S003", name: "Charlie Brown", matricule: "M003", initials: "CB", bgColor: "bg-red-200", status: "waiting", responseTime: null, hasConnectivityIssue: false },
  { id: "S004", name: "Diana Prince", matricule: "M004", initials: "DP", bgColor: "bg-purple-200", status: "waiting", responseTime: null, hasConnectivityIssue: false },
  { id: "S005", name: "Eve Adams", matricule: "M005", initials: "EA", bgColor: "bg-yellow-200", status: "waiting", responseTime: null, hasConnectivityIssue: false },
  { id: "S006", name: "Frank White", matricule: "M006", initials: "FW", bgColor: "bg-indigo-200", status: "waiting", responseTime: null, hasConnectivityIssue: true }, // Added connectivity issue
  { id: "S007", name: "Grace Hall", matricule: "M007", initials: "GH", bgColor: "bg-pink-200", status: "waiting", responseTime: null, hasConnectivityIssue: false },
  { id: "S008", name: "Henry King", matricule: "M008", initials: "HK", bgColor: "bg-teal-200", status: "waiting", responseTime: null, hasConnectivityIssue: false },
  { id: "S009", name: "Ivy Lee", matricule: "M009", initials: "IL", bgColor: "bg-lime-200", status: "waiting", responseTime: null, hasConnectivityIssue: false },
  { id: "S010", name: "Jack Wilson", matricule: "M010", initials: "JW", bgColor: "bg-cyan-200", status: "waiting", responseTime: null, hasConnectivityIssue: true }, // Added connectivity issue
];

export default function SessionResponsePage() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { toast } = useToast();

  // Consume session state and actions from context
  const {
    activeSession,
    sessionStarted,
    timeLeft,
    isPaused: isGlobalPaused, // Rename to avoid conflict with local state
    togglePause: toggleGlobalPause, // Rename to avoid conflict with local function
    endSession: globalEndSession,
    cancelSession: globalCancelSession, // <<< NEW: Import globalCancelSession
  } = useSession();

  // Local state for student responses and page-specific session status
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [pageSessionStatus, setPageSessionStatus] = useState<PageSessionStatus>(
    sessionStarted ? (isGlobalPaused ? "paused" : "active") : "ended"
  );

  // Set localStorage flag when this page is mounted
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasVisitedGcReponses', 'true');
    }
  }, []);

  // Effect to synchronize local pageSessionStatus with global session context
  // This is crucial for keeping your UI consistent with the global timer
  useEffect(() => {
  

    // React to changes in global session state
    if (sessionStarted && activeSession) {
      if (isGlobalPaused) {
        setPageSessionStatus("paused");
      } else {
        setPageSessionStatus("active");
        // Only toast if we're resuming from a previous pause or freshly activating
        if (pageSessionStatus === "paused" || pageSessionStatus === "ended" || pageSessionStatus === "cancelled") {
          toast({
            title: pageSessionStatus === "paused" ? "Session reprise" : "Nouvelle session détectée",
            description: `La session "${activeSession.course?.name || 'en cours'}" est maintenant active.`,
          });
        }
      }
      // If a new session is active and students need to be reset
      if (pageSessionStatus === "ended" || pageSessionStatus === "cancelled") {
        setStudents(initialStudents); // Reset students for the new session
      }
    } else if (!sessionStarted && (pageSessionStatus === "active" || pageSessionStatus === "paused")) {
      // Global session ended (e.g., timer ran out or ended from SessionForm), reflect it locally
      setPageSessionStatus("ended");
      setStudents((currentStudents) =>
        currentStudents.map((student) =>
          (student.status === "waiting" || student.hasConnectivityIssue)
            ? { ...student, status: "no_response" as const, hasConnectivityIssue: false }
            : student
        )
      );
      toast({
        title: "Session terminée",
        description: "La session s'est terminée (timer global).",
      });
    }
  }, [sessionStarted, activeSession, isGlobalPaused, pageSessionStatus, router, toast]);


  // Student response simulation: Only runs if pageSessionStatus is "active"
  useEffect(() => {
    if (pageSessionStatus !== "active") return;

    const interval = setInterval(() => {
      setStudents((prev) => {
        const waitingStudents = prev.filter(
          (s) => s.status === "waiting" && !s.hasConnectivityIssue
        );
        const connectivityIssueStudents = prev.filter(
          (s) => s.status === "waiting" && s.hasConnectivityIssue
        );

        if (waitingStudents.length === 0 && connectivityIssueStudents.length === 0) {
          clearInterval(interval);
          return prev;
        }

        let studentToUpdate: Student | undefined;

        if (waitingStudents.length > 0) {
          const randomIndex = Math.floor(Math.random() * waitingStudents.length);
          studentToUpdate = waitingStudents[randomIndex];
        } else if (connectivityIssueStudents.length > 0) {
          if (Math.random() < 0.3) { // 30% chance for connectivity issue student to respond
            const randomIndex = Math.floor(Math.random() * connectivityIssueStudents.length);
            studentToUpdate = connectivityIssueStudents[randomIndex];
          }
        }

        if (studentToUpdate) {
          return prev.map((student) =>
            student.id === studentToUpdate!.id
              ? {
                ...student,
                status: "responded" as const,
                responseTime: new Date().toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' }),
                hasConnectivityIssue: false,
              }
              : student
          );
        }
        return prev;
      });
    }, Math.random() * 2000 + 1000); // Random interval between 1-3 seconds

    return () => clearInterval(interval);
  }, [pageSessionStatus]); // Depend on pageSessionStatus

  // Derived states for student lists (memoized for performance)
  const waitingStudents = useMemo(
    () => students.filter((s) => s.status === "waiting").sort((a, b) => a.name.localeCompare(b.name)),
    [students]
  );
  const respondedStudents = useMemo(
    () => students.filter((s) => s.status === "responded" || s.status === "manually_marked").sort((a, b) => a.name.localeCompare(b.name)),
    [students]
  );
  const noResponseStudents = useMemo(
    () => students.filter((s) => s.status === "no_response").sort((a, b) => a.name.localeCompare(b.name)),
    [students]
  );

  const responseCount = respondedStudents.length;
  const totalStudents = students.length;
  const progressPercentage = totalStudents > 0 ? (responseCount / totalStudents) * 100 : 0;

  // Handler to manually mark a student as present
  const handleManualMark = useCallback((studentId: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
            ...student,
            status: "manually_marked" as const,
            responseTime: new Date().toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' }),
            hasConnectivityIssue: false,
          }
          : student
      )
    );
    toast({
      title: "Présence marquée",
      description: "L'étudiant a été marqué comme présent.",
    });
  }, [toast]);

  // Handle the click on the countdown card
  const handleCountdownCardClick = useCallback(() => {
    if (sessionStarted) { // Only interact if a session is truly active globally
      toggleGlobalPause(); // Call the global togglePause
      if (isGlobalPaused) { // Check the state *before* it changes
        toast({
          title: "Session reprise",
          description: "La session a été reprise.",
        });
      } else {
        toast({
          title: "Session en pause",
          description: "La session est maintenant suspendue.",
        });
      }
    }
  }, [sessionStarted, isGlobalPaused, toggleGlobalPause, toast]);


  // End the session (using the global endSession from context)
  const handleEndSessionClick = useCallback(() => {
    globalEndSession(); // Call the global endSession function
    // The useEffect will handle updating pageSessionStatus to "ended"
    setStudents((prev) =>
      prev.map((student) =>
        (student.status === "waiting" || student.hasConnectivityIssue)
          ? { ...student, status: "no_response" as const, hasConnectivityIssue: false }
          : student
      )
    );
    toast({
      title: "Session terminée",
      description: "La session a été manuellement terminée (globale).",
      variant: "destructive",
    });
  }, [globalEndSession, toast]);

  // Cancel the session (local UI state and affects local students)
  const cancelSession = useCallback(() => {
    globalCancelSession(); // <<< NEW: Call the global cancelSession function
    setPageSessionStatus("cancelled"); // Set local status
    setStudents((prev) =>
      prev.map((student) =>
        ({ ...student, status: "no_response" as const, hasConnectivityIssue: false }) // All become no_response
      )
    );
    toast({
      title: "Session annulée",
      description: "La session a été annulée. Tous les étudiants sont marqués comme absents.",
      variant: "destructive",
    });
  }, [globalCancelSession, toast]); // <<< NEW: Depend on globalCancelSession

  // Relaunch the session (resets local state and implies starting a new global session from gc-session)
  const handleRelaunchSession = useCallback(() => {
    // This action means we want to start a *new* session, so we should go back to the setup page.
    router.push("/gestionnaireCours/gc-session");
    // The new session will be initiated from gc-session, and this page will react to it.
    toast({
      title: "Redirection pour relancer",
      description: "Vous allez être redirigé pour lancer une nouvelle session.",
    });
  }, [router, toast]);

  // Determine CSS classes for student cards based on their status
  const getStudentCardClasses = (student: Student) => {
    switch (student.status) {
      case "waiting":
        return "bg-orange-50 border border-orange-200 rounded-lg transition-all duration-500 animate-pulse";
      case "responded":
      case "manually_marked":
        return "bg-green-50 border border-green-200 rounded-lg transition-all duration-500 transform scale-100";
      case "no_response":
        return "bg-red-50 border border-red-200 rounded-lg opacity-80";
      default:
        return "";
    }
  };

  // Determine badge variant for student status
  const getBadgeVariant = (student: Student) => {
    if (student.hasConnectivityIssue && student.status === "waiting") {
      return (
        <Badge variant="outline" className="text-red-600 border-red-300">
          Problème de connexion
        </Badge>
      );
    }
    switch (student.status) {
      case "waiting":
        return (
          <Badge variant="outline" className="text-orange-600 border-orange-300">
            En attente...
          </Badge>
        );
      case "responded":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Répondu
          </Badge>
        );
      case "manually_marked":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Marqué manuellement
          </Badge>
        );
      case "no_response":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            Absent
          </Badge>
        );
      default:
        return null;
    }
  };

  // Determine if main action buttons should be disabled
  // 'Marquer présent' should be disabled if session is ended or cancelled OR globally paused
  const isMarkPresentDisabled = pageSessionStatus === "ended" || pageSessionStatus === "cancelled" || isGlobalPaused;


  const sessionResponseContent = (
    <div className="min-h-screen bg-slate-50 p-6">

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-col sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center justify-between w-full">
            <Link href="/gestionnaireCours/gc-session" passHref>
              <Button variant="outline" size="sm" disabled={sessionStarted}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
            <div className="flex flex-col-reverse items-center">
              <h1 className="text-2xl font-bold text-slate-900 text-center">
                Session{" "}
                {activeSession?.sessionNumber} {/* Display session number here */}
                {pageSessionStatus === "active" && "en cours"}
                {pageSessionStatus === "paused" && "en pause"}
                {pageSessionStatus === "ended" && "terminée"}
                {pageSessionStatus === "cancelled" && "annulée"}
                {" "}
                {activeSession?.course?.name || "Non définie"}
              </h1>
              <p className="text-slate-600 text-center">
                Suivi en temps réel des réponses étudiantes
              </p>
            </div>
            <div></div>
          </div>

          {/* Main action row: This div now handles all top-level buttons based on session state */}
          <div className="flex items-center gap-4 w-full">

            {/* "Terminer la session" button (visible when paused) */}
            <Button
              size="lg"
              variant="destructive"
              onClick={handleEndSessionClick}
              title="Terminer la session définitivement et marquer les absents"
              className={`flex-shrink-0 transition-all duration-500 ease-in-out ${
                pageSessionStatus === "paused"
                  ? "opacity-100 w-auto px-4 py-2"
                  : "opacity-0 w-0 p-0 overflow-hidden pointer-events-none"
              }`}
            >
              <PowerOff className="h-5 w-5 mr-2" />
              Terminer la session
            </Button>

            {/* "Relancer la session" button (visible when ended or cancelled) */}
            {(pageSessionStatus === "ended" || pageSessionStatus === "cancelled") && (
              <Button
                size="lg"
                onClick={handleRelaunchSession}
                title="Relancer une nouvelle session identique"
                className={`flex-shrink-0 transition-all duration-500 ease-in-out bg-green-500 text-white hover:bg-green-600 ${
                  pageSessionStatus === "ended" || pageSessionStatus === "cancelled"
                    ? "opacity-100 w-auto px-4 py-2"
                    : "opacity-0 w-0 p-0 overflow-hidden pointer-events-none"
                }`}
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Relancer la session
              </Button>
            )}

            {/* Timer Card - Now also handles pause/resume click */}
            {/* The Button component now wraps the Card to make the whole card clickable */}
            <Button
              onClick={handleCountdownCardClick}
              disabled={!sessionStarted || pageSessionStatus === "ended" || pageSessionStatus === "cancelled"} // Disable if no session or if ended/cancelled
              variant="ghost" // Use ghost variant to remove default button styling
              className="p-0 h-auto w-auto group flex-grow" // Reset button padding/height, add group for hover effects, flex-grow to take available space
            >
              <Card
                className={`bg-slate-800 flex justify-center text-white w-full h-full border border-slate-700 shadow-lg relative overflow-hidden
                  ${(pageSessionStatus === "active" || pageSessionStatus === "paused")
                      ? "cursor-pointer hover:border-brand-500 hover:shadow-brand-glow transition-all duration-200"
                      : ""
                  }
                `}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  {/* Actual timer display and general icons */}
                  <div className="flex items-center gap-3">
                    {/* Primary Icon based on global state (not just page status) */}
                    {isGlobalPaused ? <PauseCircle className="h-5 w-5 text-yellow-300" /> : <Clock className="h-5 w-5" />}
                    <div>
                      <div className="text-sm opacity-80">
                        {sessionStarted ? (isGlobalPaused ? "Session en pause" : "Temps restant") : "Session non active"}
                      </div>
                      <div className="text-xl text-center font-bold">
                        {timeLeft}
                      </div>
                    </div>
                  </div>

                  {/* Overlay for hover effect */}
                  {(sessionStarted && (pageSessionStatus === "active" || pageSessionStatus === "paused")) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {isGlobalPaused ? (
                        <PlayCircle className="h-12 w-12 text-white" />
                      ) : (
                        <PauseCircle className="h-12 w-12 text-white" />
                      )}
                    </div>
                  )}

                </CardContent>
              </Card>
            </Button>

            {/* "Annuler la session" button (visible when paused) */}
            <Button
              size="lg"
              variant="outline"
              onClick={cancelSession} // <<< NEW: Call the updated cancelSession
              title="Annuler la session (tous les étudiants seront marqués comme absents)"
              className={`flex-shrink-0 text-red-500 border-red-300 hover:bg-red-50 transition-all duration-500 ease-in-out ${
                pageSessionStatus === "paused"
                  ? "opacity-100 w-auto px-4 py-2"
                  : "opacity-0 w-0 p-0 overflow-hidden pointer-events-none"
              }`}
            >
              <Ban className="h-5 w-5 mr-2" />
              Annuler la session
            </Button>
          </div>
        </div>

        {/* --- */}

        {/* Stats Cards - Adjusted for vertical flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-md border border-white/80 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Étudiants
              </CardTitle>
              <Users className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">
                {totalStudents}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-md border border-white/80 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                Ont Répondu
              </CardTitle>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{responseCount}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-md border border-white/80 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                En Attente
              </CardTitle>
              <AlertCircle className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{waitingStudents.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-md border border-white/80 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                Progression
              </CardTitle>
              <BarChart2 className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Math.round(progressPercentage)}%
              </div>
              <Progress value={progressPercentage} className="h-2 bg-slate-200 rounded-full" indicatorClassName="bg-gradient-to-r from-blue-400 to-purple-500 " />
            </CardContent>
          </Card>
        </div>

        {/* --- */}

        {/* Waiting Students Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Étudiants en attente ({waitingStudents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {waitingStudents.length > 0 ? (
                waitingStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-3 ${getStudentCardClasses(
                      student
                    )}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${student.bgColor} flex items-center justify-center font-medium text-sm`}
                      >
                        {student.initials}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          {student.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {student.matricule}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* {getBadgeVariant(student)}
                      {student.hasConnectivityIssue &&
                        student.status === "waiting" && (
                          <Signal className="h-4 w-4 text-red-500" />
                        )} */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleManualMark(student.id)}
                        className="text-green-600 border-green-300 hover:bg-green-50"
                        disabled={isMarkPresentDisabled}
                      >
                        <UserCheck className="h-4 w-4 mr-1" />
                        Marquer présent
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
                  <p>
                    {pageSessionStatus === "active"
                      ? "En attente de réponses..."
                      : pageSessionStatus === "paused"
                      ? "Session en pause, en attente de réponses..."
                      : "Tous les étudiants ont répondu ou la session est terminée/annulée."}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* --- */}

        {/* No Response Students (shown after session ends or cancelled) */}
        {(pageSessionStatus === "ended" || pageSessionStatus === "cancelled") && noResponseStudents.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <XCircle className="h-5 w-5" />
                Étudiants sans réponse ({noResponseStudents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {noResponseStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-3 ${getStudentCardClasses(
                      student
                    )}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${student.bgColor} flex items-center justify-center font-medium text-sm opacity-60`}
                      >
                        {student.initials}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          {student.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {student.matricule}
                        </div>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleManualMark(student.id)}
                      className="text-green-600 border-green-300 hover:bg-green-50"
                      disabled={pageSessionStatus === "cancelled"}
                    >
                      <UserCheck className="h-4 w-4 mr-1" />
                      Marquer présent
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* --- */}

        {/* Responded Students Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Étudiants ayant répondu ({respondedStudents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {respondedStudents.length > 0 ? (
                respondedStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-3 ${getStudentCardClasses(
                      student
                    )}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${student.bgColor} flex items-center justify-center font-medium text-sm`}
                      >
                        {student.initials}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          {student.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {student.matricule}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {getBadgeVariant(student)}
                      {student.responseTime && (
                        <span className="text-xs text-slate-500">
                          {student.responseTime}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Clock className="h-12 w-12 mx-auto mb-3 text-slate-400" />
                  <p>Aucun étudiant n'a encore répondu.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* --- */}

        {/* Session Summary (shown after session ends or cancelled) */}
        {(pageSessionStatus === "ended" || pageSessionStatus === "cancelled") && (
          <Card className="mt-8 bg-slate-800 text-white">
            <CardHeader>
              <CardTitle>
                Résumé de la session :{" "}
                <span>
                  {pageSessionStatus === "ended" ? "terminée" : "annulée"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pageSessionStatus === "cancelled" ? (
                  <>
                    <div className="text-center md:col-span-3">
                      <div className="text-sm opacity-80">
                        Aucune présence enregistrée après annulation
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">
                        {respondedStudents.length}
                      </div>
                      <div className="text-sm opacity-80">Présents confirmés</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400">
                        {noResponseStudents.length}
                      </div>
                      <div className="text-sm opacity-80">Absents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400">
                        {Math.round(progressPercentage)}%
                      </div>
                      <div className="text-sm opacity-80">
                        Taux de participation
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link href="/gestionnaireCours/gc-session" passHref>
                  <Button
                    size="lg"
                    className="bg-white text-slate-800 hover:bg-slate-100"
                  >
                    Retourner aux sessions
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );

  return isMobile ? (
    <MobileCourseLayout title="Gestion de Session">
      {sessionResponseContent}
    </MobileCourseLayout>
  ) : (
    <GestionnaireDeCoursLayout>
      <div className="max-w-7xl mx-auto">{sessionResponseContent}</div>
    </GestionnaireDeCoursLayout>
  );
}