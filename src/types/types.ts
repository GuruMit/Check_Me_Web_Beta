// types.ts represent les interface principales


export interface Student {
  id: string
  name: string
  initials: string
  bgColor: string
  total: string
  status: string
  statusColor: string
  filiere?: FiliereType
  niveau?: number
  courses: StudentCourse[]
  recentSessions: RecentSessions
}




export interface StudentCourse {
  course: Course
}

export interface RecentSessions {
  [courseId: string]: {
    [date: string]: (boolean | null)[]
  }
}

export interface Course {
  id: string
  name: string
  sessions?: number
}

export interface Filiere {
  id: FiliereType
  name: string
  niveaux: Level[]
}

export interface Level {
  id: string
  name: string
  courses: Course[]
}

export interface CourseDetails {
  id: number
  filiere: FiliereType
  niveau: number
  nom: string
  datePlages: LevelDates
}

export interface LevelDates {
  [key: number]: DateRange
}

export interface DateRange {
  startDate: string
  endDate: string
}

export type FiliereType = 'ISN' | 'INS' | 'CDN'

