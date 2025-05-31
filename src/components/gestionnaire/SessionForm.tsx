// src/components/gestionnaire/SessionForm.tsx
import React from "react";
import { ArrowLeft, Check, Clock, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/Cards"; // Assuming this path is correct for your Card component
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { Class, Course, Program } from "@/app/gestionnaireCours/gc-session/page";

interface SessionFormProps {
  programs: Program[];
  classes: Class[];
  courses: Course[];
  selectedProgram: Program;
  selectedClass: Class;
  selectedCourse: Course;
  sessionStarted: boolean;
  isPaused: boolean;
  onTogglePause: () => void;
  onProgramChange: (program: Program) => void;
  onClassChange: (cls: Class) => void;
  onCourseChange: (course: Course) => void;
  sessionNumber: string;
  startTime: string;
  endTime: string;
  timeLeft: string;
  handleStartSession: () => void;
  sessionNumbers: string[];
  startTimes: string[];
  endTimes: string[];
  onSessionNumberChange: (num: string) => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  // NEW PROPS FOR DURATION
  onDurationChange: (duration: number) => void;
  selectedDuration: number; // Duration in minutes
}

const SessionForm: React.FC<SessionFormProps> = ({
  classes,
  selectedProgram,
  sessionStarted,
  selectedCourse,
  selectedClass,
  onProgramChange,
  onClassChange,
  onCourseChange,
  isPaused,
  onTogglePause,
  sessionNumber,
  startTime,
  endTime,
  timeLeft,
  handleStartSession,
  courses,
  programs,
  sessionNumbers,
  startTimes,
  endTimes,
  onSessionNumberChange,
  onStartTimeChange,
  onEndTimeChange,
  // NEW PROPS
  onDurationChange,
  selectedDuration,
}) => {
  const handleProgramSelect = (programId: string) => {
    const program = programs.find(p => p.id === programId);
    if (program) onProgramChange(program);
  };

  const handleClassSelect = (classId: string) => {
    const cls = classes.find(c => c.id === classId);
    if (cls) onClassChange(cls);
  };

  const handleCourseSelect = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) onCourseChange(course);
  };

  // Predefined duration options in minutes
  const durationOptions = [
    { value: 1, label: "1 minute" },
    { value: 5, label: "5 minutes" },
    { value: 10, label: "10 minutes" },
    { value: 15, label: "15 minutes" },
    { value: 20, label: "20 minutes" },
    { value: 25, label: "25 minutes" },
    { value: 30, label: "30 minutes" },
    { value: 45, label: "45 minutes" },
    { value: 60, label: "1 heure" },
    { value: 90, label: "1 heure 30" },
    { value: 120, label: "2 heures" },
    { value: 180, label: "3 heures" },
  ];

  return (
    <div className="w-full">
      {/* Course Selection */}
      <div className="flex flex-col gap-2 mb-4 w-full border border-brand-500 rounded p-3 bg-brand-100 ">
        <div className="text-sm text-gray-600 ml-3 font-semibold">COURS</div>
        <div>
          <Select onValueChange={handleCourseSelect} value={selectedCourse?.id} disabled={sessionStarted}>
            <SelectTrigger className="w-full text-2xl font-bold ring-offset-brand-100 focus:ring-transparent focus:ring-0 border-0 bg-brand-100">
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Course</SelectLabel>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-gray-600 ml-3">{selectedCourse?.teacher}</div>
      </div>

      {/* Program Selection */}
      <div className="flex flex-col gap-2 mb-4 w-full border border-brand-500 rounded p-3 bg-brand-100 ">
        <div className="text-sm text-gray-600 ml-3"> FILIERE </div>
        <div className="mb-4">
          <Select onValueChange={handleProgramSelect} value={selectedProgram?.id} disabled={sessionStarted}>
            <SelectTrigger className="w-full text-2xl font-bold ring-offset-brand-100 focus:ring-transparent focus:ring-0 border-0 bg-brand-100">
              <SelectValue placeholder="Select a program" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Program</SelectLabel>
                {programs.map((program) => (
                  <SelectItem key={program.id} value={program.id}>
                    {program.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Class Selection */}
      <div className="flex flex-col gap-2 mb-4 w-full border border-brand-500 rounded p-3 bg-brand-100 ">
        <div className="text-sm text-gray-600 ml-3"> CLASSE </div>
        <div className="mb-4">
          <Select
            onValueChange={handleClassSelect}
            value={selectedClass?.id}
            disabled={sessionStarted}
          >
            <SelectTrigger className="w-full text-2xl font-bold ring-offset-brand-100 focus:ring-transparent focus:ring-0 border-0 bg-brand-100">
              <SelectValue placeholder="Select a class" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Class</SelectLabel>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Session Details - Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Session Number */}
        <div className="flex flex-col gap-2 mb-4 w-full border border-brand-500 rounded p-3 bg-brand-100 ">
          <div className="text-sm text-gray-600 ml-3"> SESSION </div>
          <Select
            onValueChange={onSessionNumberChange}
            value={sessionNumber}
            disabled={sessionStarted}
          >
            <SelectTrigger className="w-full text-2xl font-bold ring-offset-brand-100 focus:ring-transparent focus:ring-0 border-0 bg-brand-100">
              <SelectValue placeholder="Session" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Session</SelectLabel>
                {sessionNumbers.map((num, index) => (
                  <SelectItem key={index} value={num}>
                    {num}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Start Time */}
        <div className="flex flex-col gap-2 mb-4 w-full border border-brand-500 rounded p-3 bg-brand-100 ">
          <div className="text-sm text-gray-600 ml-3"> HEURE DE DEBUT </div>
          <Select
            onValueChange={onStartTimeChange}
            value={startTime}
            disabled={sessionStarted}
          >
            <SelectTrigger className="w-full text-2xl font-bold ring-offset-brand-100 focus:ring-transparent focus:ring-0 border-0 bg-brand-100">
              <SelectValue placeholder="Start Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Heure de début</SelectLabel>
                {startTimes.map((time, index) => (
                  <SelectItem key={index} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* End Time */}
        <div className="flex flex-col gap-2 mb-4 w-full border border-brand-500 rounded p-3 bg-brand-100 ">
          <div className="text-sm text-gray-600 ml-3"> HEURE DE FIN </div>
          <Select onValueChange={onEndTimeChange} value={endTime} disabled={sessionStarted}>
            <SelectTrigger className="w-full text-2xl font-bold ring-offset-brand-100 focus:ring-transparent focus:ring-0 border-0 bg-brand-100">
              <SelectValue placeholder="End Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Heure de fin</SelectLabel>
                {endTimes.map((time, index) => (
                  <SelectItem key={index} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* NEW: Duration Selection */}
      <div className="flex flex-col gap-2 mb-8 w-full border border-brand-500 rounded p-3 bg-brand-100 ">
        <div className="text-sm text-gray-600 ml-3"> DURÉE </div>
        <div>
          <Select
            // Convert the number (selectedDuration) to a string for the Select's value prop
            value={String(selectedDuration)}
            // Parse the string value from the Select back to a number for onDurationChange
            onValueChange={(value) => onDurationChange(parseInt(value))}
            disabled={sessionStarted} // Disable when session is active
          >
            <SelectTrigger className="w-full text-2xl font-bold ring-offset-brand-100 focus:ring-transparent focus:ring-0 border-0 bg-brand-100">
              <SelectValue placeholder="Sélectionnez la durée" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Durée de la session</SelectLabel>
                {durationOptions.map((option) => (
                  <SelectItem key={option.value} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>


      {/* Timer Card as a Clickable Button */}
      <div className="flex justify-center h-fit">
        {/* The Button component now wraps the Card */}
        <Button
          onClick={sessionStarted ? onTogglePause : undefined} // Only allow click if session is active
          disabled={!sessionStarted} // Disable button if session hasn't started
          variant="ghost" // Use ghost variant to make it look like a regular card, but still be clickable
          className="p-0 h-auto w-auto group" // Remove padding/height to let the Card control its size, add group for hover effects
        >
          <Card className={`w-[280px] mb-8 bg-gray-800 text-white border border-gray-700 shadow-lg
            ${sessionStarted ? 'cursor-pointer hover:border-brand-500 hover:shadow-brand-glow transition-all duration-200' : ''}
          `}>
            <CardContent className="p-5 flex items-center justify-around">
              <div className="flex flex-col gap-3">
                <div className="text-sm uppercase font-medium">Temps restant</div>
                <div className="text-3xl font-bold">{timeLeft}</div>
              </div>
              <div className="relative"> {/* Added relative for icon positioning */}
                <svg
                  width="96"
                  height="0"
                  viewBox="0 0 56 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0.5" width="55" height="60" rx="5" fill="#159DDC" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M28 44.2498C34.9956 44.2498 40.6667 38.5788 40.6667 31.5832C40.6667 24.5876 34.9956 18.9165 28 18.9165C21.0044 18.9165 15.3334 24.5876 15.3334 31.5832C15.3334 38.5788 21.0044 44.2498 28 44.2498Z"
                    stroke="#FFFDFD"
                    strokeWidth="2"
                  />
                  <path
                    d="M28 25.25V31.5833"
                    stroke="#FFFDFD"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M37.5 22.0832L40.6666 18.9165"
                    stroke="#FFFDFD"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M32.75 14.1668H23.25"
                    stroke="#FFFDFD"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                {/* Pause/Play icon overlay */}
                {sessionStarted && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {isPaused ? (
                      <Play className="h-12 w-12 text-white" />
                    ) : (
                      <Pause className="h-12 w-12 text-white" />
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex lg:flex-row md:flex-col gap-4 mt-5">
        <Button
          className="flex-2 md:flex-1 bg-green-600 hover:bg-green-700 text-white py-8 text-lg font-semibold"
          onClick={handleStartSession}
          disabled={sessionStarted}
        >
          Lancer la mini-session (1)
        </Button>
      </div>
    </div>
  );
};

export default SessionForm;