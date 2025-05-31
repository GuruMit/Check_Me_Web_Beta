export interface Justification {
  id: number;
  studentInitials: string;
  studentName: string;
  studentCode: string;
  courseName: string;
  instructor: string;
  timeSlot: string;
  date: string;
  filiere: string;
  niveau: string;
  justificationText: string;
  fileType?: string;
  filePath?: string;
  isSelected?: boolean;
  status?: string;
}


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

export interface RecentSessions {
  [courseId: string]: {
    [date: string]: (boolean | null)[];
  };
}

export interface Course {
  id: string;
  name: string;
  date?: string;
}

export interface Level {
  id: string;
  name: string;
  filiere: string;
  courses: Course[];
}

export interface Column {
  key: keyof Student | "actions";
  label: string;
  sortable: boolean;
}

export interface StudentListProps {
  initialStudents?: Student[];
  filters?: Record<string, string[]>;
}

export interface FilterOption {
  id: string;
  label: string;
  category: string;
}

export interface AdvancedFilterPanelProps {
  onFiltersChange: (filters: Record<string, string[]>) => void;
  className?: string;
}


export interface CourseDetails {
  filiere: string;
  niveau: number;
  nom: string;
  datePlages: {
    [niveau: number]: {
      startDate: string;
      endDate: string;
    };
  };
}
