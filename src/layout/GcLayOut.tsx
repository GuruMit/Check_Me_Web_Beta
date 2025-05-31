"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  BookOpen,
  Calendar,
  ClipboardCheck,
  Users,
  FileText,
  Bell,
  Settings,
  LogOut,
  Mail,
} from "lucide-react";
import { useAuth } from "@/app/context/auth-context";
import GcSidebar from "@/components/sections/GcSidebar";

interface CourseManagerLayoutProps {
  children: React.ReactNode;
}

export function GestionnaireDeCoursLayout({
  children,
}: CourseManagerLayoutProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <GcSidebar sidebarExpanded={sidebarExpanded} onToggle={toggleSidebar} />
      {/* Header pour mobile et desktop */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-end px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogoutClick}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
            >
              <Mail size={20} />
            </button>
            <div className="relative">
              <Bell size={20} className="text-slate-500" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[10px] font-medium text-white">
                3
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <div className="text-sm font-medium">{user?.name}</div>
                <div className="text-xs text-slate-500">
                  Gestionnaire de cours
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden">
                <Image
                  src={user?.image || "/placeholder.svg?height=32&width=32"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
