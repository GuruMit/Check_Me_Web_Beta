"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

export type UserRole = "admin" | "gestionnaire_cours" | "etudiant"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole;
  image?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  checkAccess: (allowedRoles: UserRole[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demonstration
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@gmail.com",
    password: "password",
    name: "Mme. NGUENSIE",
    role: "admin" as UserRole,
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    email: "manager@gmail.com",
    password: "password",
    name: "Prof. KAMDEM",
    role: "gestionnaire_cours" as UserRole,
    image: "/placeholder.svg?height=32&width=32",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem("checkme_user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User
        setState({ user, isLoading: false, isAuthenticated: true })
      } catch (e) {
        localStorage.removeItem("checkme_user")
        setState({ user: null, isLoading: false, isAuthenticated: false })
      }
    } else {
      setState({ user: null, isLoading: false, isAuthenticated: false })
    }
  }, [])

  // Define public paths that don't require authentication
  const publicPaths = ["/userLogin", "/admin/admin-registration"]; // <-- ADDED THIS LINE

  // Route protection logic
  useEffect(() => {
    if (state.isLoading) return;
    if (!pathname) return;

    // Check if the current path is a public path
    const isPublicPath = publicPaths.some(path => pathname === path || pathname.startsWith(`${path}/`)); // More robust check for sub-paths

    // Redirect to login if not authenticated and not on a public page
    if (!state.isAuthenticated && !isPublicPath) {
      router.push("/userLogin");
      return;
    }

    // Role-based redirects
    if (state.isAuthenticated && state.user) {
      // Redirect from login/registration page when already authenticated
      if (isPublicPath) { // Check if user is on any public path
          redirectToRoleDashboard(state.user.role);
          return;
      }

      // Check if user is accessing a route they shouldn't
      if (pathname.startsWith("/admin") && state.user.role !== "admin") {
          redirectToRoleDashboard(state.user.role);
          return;
      }

      // Ensure that 'admin-gestionnaires' is only for 'gestionnaire_cours' role
      // Assuming '/admin-gestionnaires' is a top-level route for gestionnaires,
      // not a sub-route of '/admin' that only admins can access.
      // If a 'gestionnaire_cours' goes to /admin-gestionnaires, it should be allowed.
      // If a 'gestionnaire_cours' goes to /admin, they should be redirected.
      if (pathname.startsWith("/gestionnaireCours") && state.user.role !== "gestionnaire_cours") {
        redirectToRoleDashboard(state.user.role);
        return;
      }
       // Prevent 'admin' from accessing gestionnaire-specific routes (if they are not also gestionnaires)
       if (pathname.startsWith("/gestionnaireCours") && state.user.role === "admin") {
         // Admins might have access to all dashboards, so this redirection might not be desired.
         // Consider if an admin should be able to view /gestionnaireCours/gc-dashboard.
         // If not, redirect them to their admin dashboard.
         // For now, I'll assume admin can see everything or will be redirected to their main dashboard.
         // If you have specific admin-only routes, add them here.
         // If an admin *should* be able to view gc-dashboard, then this specific block needs adjustment.
         redirectToRoleDashboard(state.user.role); // Redirect admin to their own dashboard
         return;
       }
    }
  }, [state.isAuthenticated, state.isLoading, state.user, pathname, router, publicPaths]); // Add publicPaths to dependency array

  const redirectToRoleDashboard = (role: UserRole) => {
    switch (role) {
      case "admin":
        router.push("/admin/admin-dashboard")
        break
      case "gestionnaire_cours":
        router.push("/gestionnaireCours/gc-dashboard")
        break
      case "etudiant":
        router.push("/etudiant/dashboard")
        break
    }
  }

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (user) {
      const { password: _, ...userWithoutPassword } = user
      localStorage.setItem("checkme_user", JSON.stringify(userWithoutPassword))
      setState({ user: userWithoutPassword, isLoading: false, isAuthenticated: true })
      redirectToRoleDashboard(userWithoutPassword.role)
    } else {
      throw new Error("Invalid credentials")
    }
  }

  const logout = () => {
    localStorage.removeItem("checkme_user")
    setState({ user: null, isLoading: false, isAuthenticated: false })
    router.push("/userLogin")
  }

  const checkAccess = (allowedRoles: UserRole[]) => {
    return state.user ? allowedRoles.includes(state.user.role) : false
  }

  return <AuthContext.Provider value={{ ...state, login, logout, checkAccess }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}