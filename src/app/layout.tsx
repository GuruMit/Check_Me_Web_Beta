import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "./context/auth-context"
import { SessionProvider } from "@/context/SessionContext"
import { Toast } from "@/components/ui/toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CheckMe - Intelligent Attendance Tracking",
  description: "Streamline attendance tracking for your institution",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <SessionProvider>
        <AuthProvider>
          
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
            </ThemeProvider>
        </AuthProvider>
          </SessionProvider>
      </body>
    </html>
  )
}
