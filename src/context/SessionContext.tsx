// src/context/SessionContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
// Assuming these types are defined in a shared place or your gc-session/page
// For this example, I'll define them directly here to ensure clarity.
// In a real app, prefer a `src/types/session.ts` file.
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

import { useToast } from "@/hooks/use-toast"; // Assuming this is correctly implemented

// New: Define session status types - ADDED 'cancelled'
export type SessionStatus = "ongoing" | "ended" | "paused" | "cancelled";

export type ActiveSessionDetails = {
  id: number; // Unique ID for the session instance
  course: Course;
  program: Program;
  class: Class;
  sessionNumber: string;
  startTime: string;
  endTime: string;
  durationInSeconds: number; // Total duration in SECONDS
  startedAt: number; // Timestamp when the session actually started (Date.now())
  pausedAt: number | null; // Timestamp when the session was last paused
  remainingTimeAtPause: number | null; // How much time was left when paused
  status: SessionStatus; // New status field
};

interface SessionContextType {
  activeSession: ActiveSessionDetails | null;
  sessionStarted: boolean;
  timeLeft: string; // Formatted time string (e.g., "01:30:00")
  isPaused: boolean;
  // MODIFIED: Added 'durationInMinutes' to startSession details
  startSession: (details: Omit<ActiveSessionDetails, "id" | "startedAt" | "durationInSeconds" | "pausedAt" | "remainingTimeAtPause" | "status"> & { durationInMinutes: number }) => void;
  endSession: () => void;
  togglePause: () => void;
  cancelSession: () => void;
  // New: Expose recentSessions and functions to update them
  recentSessions: ActiveSessionDetails[];
  loadRecentSessions: () => void;
  updateRecentSessionStatus: (sessionId: number, status: SessionStatus, newTimeLeft?: number) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

// REMOVED: calculateDurationInSeconds function as it's no longer needed

function formatTime(totalSeconds: number): string {
  if (totalSeconds < 0) return "00:00:00";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number) => num.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const { toast } = useToast();

  const [activeSession, setActiveSession] = useState<ActiveSessionDetails | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<string>("00:00:00");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [recentSessions, setRecentSessions] = useState<ActiveSessionDetails[]>([]); // New state for history

  const sessionStarted = !!activeSession;
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Function to update status in the recentSessions array
  const updateRecentSessionStatus = useCallback((sessionId: number, status: SessionStatus, newTimeLeft?: number) => {
    setRecentSessions(prev =>
      prev.map(session => {
        if (session.id === sessionId) {
          const updatedSession = { ...session, status };
          if (newTimeLeft !== undefined) {
            updatedSession.remainingTimeAtPause = newTimeLeft;
          }
          return updatedSession;
        }
        return session;
      })
    );
  }, []);


  const clearActiveSessionState = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
    setActiveSession(null);
    setRemainingSeconds(0);
    setIsPaused(false); // Reset pause state
    localStorage.removeItem("activeSession"); // Remove from local storage
  }, []);

  const endSession = useCallback(() => {
    if (!activeSession) {
      toast({
        title: "Pas de session active",
        description: "Aucune session n'est actuellement en cours pour être terminée.",
      });
      return;
    }

    const endedSessionName = activeSession.course.name;
    const endedSessionNumber = activeSession.sessionNumber;

    // Update status in recentSessions
    updateRecentSessionStatus(activeSession.id, "ended");
    clearActiveSessionState(); // Use the new helper function

    toast({
      title: "Session terminée",
      description: `La mini-session ${endedSessionNumber} de ${endedSessionName} a été terminée avec succès.`,
      variant: "destructive",
    });

  }, [activeSession, toast, updateRecentSessionStatus, clearActiveSessionState]);

  // NEW: cancelSession function
  const cancelSession = useCallback(() => {
    if (!activeSession) {
      toast({
        title: "Pas de session active",
        description: "Aucune session n'est actuellement en cours pour être annulée.",
      });
      return;
    }

    const cancelledSessionName = activeSession.course.name;
    const cancelledSessionNumber = activeSession.sessionNumber;

    // Update status in recentSessions
    updateRecentSessionStatus(activeSession.id, "cancelled");
    clearActiveSessionState(); // Use the new helper function

    toast({
      title: "Session annulée",
      description: `La mini-session ${cancelledSessionNumber} de ${cancelledSessionName} a été annulée.`,
      variant: "destructive", // Or a different variant for cancellation
    });
  }, [activeSession, toast, updateRecentSessionStatus, clearActiveSessionState]);


  const togglePause = useCallback(() => {
    setIsPaused((prev) => {
      const newPausedState = !prev;
      if (activeSession) {
        if (newPausedState) {
          // Pausing
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = undefined;
          }
          setActiveSession(prevSession => prevSession ? {
            ...prevSession,
            pausedAt: Date.now(),
            remainingTimeAtPause: remainingSeconds,
            status: "paused"
          } : null);
          updateRecentSessionStatus(activeSession.id, "paused", remainingSeconds);
          localStorage.setItem("activeSession", JSON.stringify({ // Persist paused state
            ...activeSession,
            pausedAt: Date.now(),
            remainingTimeAtPause: remainingSeconds,
            status: "paused"
          }));

        } else {
          // Resuming
          setActiveSession(prevSession => prevSession ? {
            ...prevSession,
            pausedAt: null,
            remainingTimeAtPause: null,
            status: "ongoing"
          } : null);
          // Set remainingSeconds to where it left off (important for timer `useEffect`)
          if (activeSession.remainingTimeAtPause !== null) {
              setRemainingSeconds(activeSession.remainingTimeAtPause);
          }
          updateRecentSessionStatus(activeSession.id, "ongoing");
          localStorage.setItem("activeSession", JSON.stringify({ // Persist resumed state
            ...activeSession,
            pausedAt: null,
            remainingTimeAtPause: null,
            status: "ongoing"
          }));
        }
      }
      return newPausedState;
    });
  }, [activeSession, remainingSeconds, updateRecentSessionStatus]);


  const startSession = useCallback(
    // MODIFIED: Accepts 'durationInMinutes'
    (details: Omit<ActiveSessionDetails, 'id' | 'startedAt' | 'durationInSeconds' | 'pausedAt' | 'remainingTimeAtPause' | 'status'> & { durationInMinutes: number }) => {
      if (sessionStarted) {
        toast({
          title: "Erreur de lancement",
          description: "Une session est déjà en cours. Veuillez la terminer avant d'en lancer une nouvelle.",
          variant: "destructive",
        });
        return;
      }

      // NEW: Use passed durationInMinutes, convert to seconds
      const durationInSeconds = details.durationInMinutes * 60;

      if (durationInSeconds <= 0) {
        toast({
          title: "Erreur de durée",
          description: "La durée de la session doit être supérieure à zéro.",
          variant: "destructive",
        });
        return;
      }

      const newSession: ActiveSessionDetails = {
        ...details,
        id: Date.now(),
        startedAt: Date.now(),
        durationInSeconds: durationInSeconds,
        pausedAt: null,
        remainingTimeAtPause: null,
        status: "ongoing", // Initial status
      };

      setActiveSession(newSession);
      setRemainingSeconds(durationInSeconds); // Initialize remaining time
      setIsPaused(false); // Ensure session starts unpaused

      // Add to recentSessions and persist
      setRecentSessions(prev => [newSession, ...prev]);
      localStorage.setItem("activeSession", JSON.stringify(newSession));

      toast({
        title: "Session lancée",
        description: `La mini-session ${details.sessionNumber} de ${details.course.name} a été lancée pour ${details.durationInMinutes} minutes.`,
      });

      // Set localStorage flag for "Retour à la session" button
      if (typeof window !== 'undefined') {
        localStorage.setItem('hasVisitedGcReponses', 'true');
      }
    },
    [sessionStarted, toast]
  );

  // Timer effect
  useEffect(() => {
    if (sessionStarted && !isPaused && activeSession) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Calculate initial remaining seconds if resuming or after refresh
      let initialRemaining = remainingSeconds;
      if (activeSession.status === "ongoing") {
        const elapsedTimeSinceStart = Math.floor((Date.now() - activeSession.startedAt) / 1000);
        initialRemaining = Math.max(0, activeSession.durationInSeconds - elapsedTimeSinceStart);
      } else if (activeSession.status === "paused" && activeSession.remainingTimeAtPause !== null) {
        initialRemaining = activeSession.remainingTimeAtPause;
      }
      setRemainingSeconds(initialRemaining); // Set the correct starting point

      timerRef.current = setInterval(() => {
        setRemainingSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            endSession(); // End session if time runs out
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else if ((!sessionStarted || isPaused || remainingSeconds === 0) && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
      }
    };
  }, [sessionStarted, isPaused, activeSession, remainingSeconds, endSession]); // Added remainingSeconds as a dep for initial update

  // Effect to format remainingSeconds into timeLeft string
  useEffect(() => {
    setTimeLeft(formatTime(remainingSeconds));
  }, [remainingSeconds]);

  // Load active session and recent sessions from localStorage on mount
  const loadRecentSessions = useCallback(() => {
    if (typeof window === 'undefined') return; // Only run on client-side

    const storedRecentSessions = localStorage.getItem("recentSessions");
    if (storedRecentSessions) {
      try {
        const parsedRecent: ActiveSessionDetails[] = JSON.parse(storedRecentSessions);
        setRecentSessions(parsedRecent);
      } catch (e) {
        console.error("Failed to parse recent sessions from localStorage", e);
        localStorage.removeItem("recentSessions");
      }
    }

    const storedActiveSession = localStorage.getItem("activeSession");
    if (storedActiveSession) {
      try {
        const parsedSession: ActiveSessionDetails = JSON.parse(storedActiveSession);
        const now = Date.now();
        let calculatedTimeLeft = 0;

        // If the session was ongoing, calculate remaining time
        if (parsedSession.status === "ongoing") {
          const elapsed = (now - parsedSession.startedAt) / 1000; // seconds
          calculatedTimeLeft = Math.max(0, parsedSession.durationInSeconds - elapsed);
        } else if (parsedSession.status === "paused" && parsedSession.remainingTimeAtPause !== null) {
          calculatedTimeLeft = parsedSession.remainingTimeAtPause;
        }

        // Only restore if there's time left and it wasn't explicitly cancelled or ended
        if (calculatedTimeLeft > 0 && parsedSession.status !== "cancelled" && parsedSession.status !== "ended") {
          setActiveSession(parsedSession);
          setRemainingSeconds(calculatedTimeLeft);
          setIsPaused(parsedSession.status === "paused");
        } else {
          // Session has already ended, was cancelled, or ran out of time
          localStorage.removeItem("activeSession");
          // Update status in recent history if it was ongoing but timed out
          if (parsedSession.status === "ongoing") {
            updateRecentSessionStatus(parsedSession.id, "ended");
          }
          // If it was cancelled or ended before, its status is already correct
        }
      } catch (e) {
        console.error("Failed to parse active session from localStorage", e);
        localStorage.removeItem("activeSession");
      }
    }
  }, [updateRecentSessionStatus]);


  // Save recent sessions to localStorage whenever `recentSessions` state changes
  useEffect(() => {
    if (typeof window === 'undefined') return; // Only run on client-side
    localStorage.setItem("recentSessions", JSON.stringify(recentSessions));
  }, [recentSessions]);


  // Initial load on mount
  useEffect(() => {
    loadRecentSessions();
  }, [loadRecentSessions]);


  const contextValue: SessionContextType = {
    activeSession,
    sessionStarted,
    timeLeft,
    isPaused,
    startSession,
    endSession,
    togglePause,
    cancelSession,
    recentSessions,
    loadRecentSessions,
    updateRecentSessionStatus,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};