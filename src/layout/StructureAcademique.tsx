"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function StructureAcademiqueLayOut({ children }: AdminLayoutProps) {

  return (
   
      <div className="flex h-screen bg-slate-50">
          {/* Contenu principal */}
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      
  )
}
