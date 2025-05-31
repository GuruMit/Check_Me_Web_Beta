"use client";

import { JSX, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  FileText,
  Bell,
  Settings,
  Building,
  Users,
  UserPlus,
  Plus,
  LayoutDashboard,
  ChevronRight,
  ChevronLeft,
  Mail,
  BarChart2,
  HelpCircle,
  Clock,
  ArrowDownRight,
  Calendar,
  ArrowUpRight,
  Activity,
  ArrowRight,
  FolderOpen,
  BookOpen,
  ClipboardList,
  Globe,
  User,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Viewer, Worker } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/Cards";
import { Badge } from "@/components/ui/Badges";
import { StudentList } from "@/components/students/StudentList";
import { FilterCard } from "@/components/students/StudentInstitutionFilterCard";
import { AdvancedFilterPanel } from "@/components/students/StudentInstitutionFilterAlternative";
// import JustificationList from "@/components/students/StudentJustificationRow";
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import JustificationList from "@/components/admin/StudentJustificationList";
import { Justification } from "@/app/Interface/Interfaces";
import Sidebar from "@/components/sections/AdminSidebar";
import JustificationListHeader, { JustificationFilter } from "@/components/admin/JustificationFilterHeader";
import { justificationsData } from "@/app/data/Data";


export default function AdminJustification() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [currentFilter, setCurrentFilter] = useState<JustificationFilter>('all');
  const [justifications, setJustifications] = useState(justificationsData);
  const [filteredJustifications, setFilteredJustifications] = useState(justificationsData);
  const [selectedJustification, setSelectedJustification] = useState<Justification | null>(null);

    const handleFilterChange = (filter: JustificationFilter) => {
      let filtered = [...justifications];
      
      if (filter === 'approved') {
        filtered = justifications.filter(j => j.status === 'approved');
      } else if (filter === 'rejected') {
        filtered = justifications.filter(j => j.status === 'rejected');
      }
      
      setFilteredJustifications(filtered);
      setCurrentFilter(filter);
  };
  

  
  
  const students = [
    {
      id: "20G60313",
      name: "ELLA Kris",
      initials: "EK",
      bgColor: "bg-sky-100",
      sessions: [true, false, null, true, false],
      total: "15/20",
      status: "Régulier",
      statusColor: "text-green-500",
    },
    {
      id: "20G60314",
      name: "MBOUO Jean",
      initials: "MJ",
      bgColor: "bg-sky-100",
      sessions: [false, true, true, false, null],
      total: "12/20",
      status: "Irrégulier",
      statusColor: "text-amber-500",
    },
  ];

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleManagersSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };


  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar 
        sidebarExpanded={sidebarExpanded}
        onToggle={toggleSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-end px-6">
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
              <Mail size={20} />
            </button>
            <div className="relative">
              <Bell size={20} className="text-slate-500" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[10px] font-medium text-white">
                1
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <div className="text-sm font-medium">Mme. NGUENSIE</div>
                <div className="text-xs text-slate-500">
                  Super Administrateur
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex">
            {/* Left Section: Header and Justification List */}
            <div className="flex-1">
              {/* Administration System Header */}
              <div className="mb-6 rounded-lg bg-sky-50 p-4">

              <JustificationListHeader 
            currentFilter={currentFilter}
            onFilterChange={handleFilterChange}
          />
          
              </div>  

              {/* Justification List */}
              <div className="divide-y divide-slate-200">
                <JustificationList
                  justifications={filteredJustifications}
                  onSelectJustification={(justification) =>
                    setSelectedJustification(justification)
                  }
                />
              </div>
            </div>

     
      
          </div>
        </main>
      </div>
    </div>
  );
}
