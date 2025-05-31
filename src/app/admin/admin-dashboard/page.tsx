"use client";

import { JSX, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/Cards";
import { Badge } from "@/components/ui/Badges";
import { StudentList } from "@/components/students/StudentList";
import { FilterCard } from "@/components/students/StudentInstitutionFilterCard";
import { AdvancedFilterPanel } from "@/components/students/StudentInstitutionFilterAlternative";
import Sidebar from "@/components/sections/AdminSidebar";
import { useAuth } from "@/app/context/auth-context";
import MobileCourseLayout from "@/layout/MobileLayOut";
import { GestionnaireDeCoursLayout } from "@/layout/GcLayOut";
import { AdminLayout } from "@/layout/AdminLayOut";
import GestionnaireSidebar from "@/components/admin/ManagerSidebar";
  
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const { logout } = useAuth();

  // // Filter states Alternative from main Design
  // const [selectedFiliere, setSelectedFiliere] = useState<string | null>(null)
  // const [selectedNiveau, setSelectedNiveau] = useState<string | null>(null)
  // const [selectedCours, setSelectedCours] = useState<string | null>(null)

  // // Filter options
  // const filiereOptions = [
  //   { id: "ISN", label: "ISN" },
  //   { id: "INS", label: "INS" },
  //   { id: "CDN", label: "CDN" },
  // ]

  // const niveauOptions = [
  //   { id: "1", label: "1" },
  //   { id: "2", label: "2" },
  //   { id: "3", label: "3" },
  //   { id: "4", label: "4" },
  //   { id: "5", label: "5" },
  // ]

  // const coursOptions = [
  //   { id: "Référentiel ITIL", label: "Référentiel ITIL" },
  //   { id: "Gestion de Projet", label: "Gestion de Projet" },
  //   { id: "Cybersécurité", label: "Cybersécurité" },
  //   { id: "Programmation Web", label: "Programmation Web" },
  //   { id: "Algorithmes", label: "Algorithmes" },
  //   { id: "Bases de données", label: "Bases de données" },
  //   { id: "Design Graphique", label: "Design Graphique" },
  //   { id: "UX/UI", label: "UX/UI" },
  //   { id: "Marketing Digital", label: "Marketing Digital" },
  // ]

  // Nouveau système de filtrage alternative 2
  const [filters, setFilters] = useState<Record<string, string[]>>({
    filiere: [],
    niveau: [],
    cours: [],
  });

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleManagersSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  // Gestionnaire de changement de filtres alternative 2
  const handleFiltersChange = (newFilters: Record<string, string[]>) => {
    setFilters(newFilters);
  };

  const handleLogoutClick = () => {
    logout();
  };
  

  // Content to be rendered inside either layout
  const dashboardContent = (
   <main className="flex-1 overflow-y-auto p-6">
          {/* Administration System Header */}
          <div className="mb-6 rounded-lg bg-sky-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-slate-800">
                  Administration système
                </h1>
                <p className="text-sm text-slate-600">
                  Gestion des institutions et des administrateurs système
                </p>
              </div>
              <Button className="bg-indigo-700 hover:bg-indigo-800 h-12 px-4 text-white">
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Gérer l&apos;institution
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
            <Card className="border border-slate-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-slate-600">
                    Total Students
                  </h3>
                  <div className="text-blue-500">
                    <Users size={20} />
                  </div>
                </div>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-slate-900">3,267</p>
                </div>
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <ArrowUpRight size={14} className="mr-1" />
                  <span>+2.5% from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-slate-600">
                    Attendance Rate
                  </h3>
                  <div className="text-blue-500">
                    <Activity size={20} />
                  </div>
                </div>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-slate-900">92.4%</p>
                </div>
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <ArrowUpRight size={14} className="mr-1" />
                  <span>+3.1% from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-slate-600">
                    Active Classes
                  </h3>
                  <div className="text-blue-500">
                    <Calendar size={20} />
                  </div>
                </div>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-slate-900">47</p>
                </div>
                <div className="mt-2 flex items-center text-xs text-red-500">
                  <ArrowDownRight size={14} className="mr-1" />
                  <span>-1.8% from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-slate-600">
                    Ongoing Sessions
                  </h3>
                  <div className="text-blue-500">
                    <Clock size={20} />
                  </div>
                </div>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-slate-900">6</p>
                </div>
                <div className="mt-2 flex items-center text-xs text-slate-500">
                  <span>0% from last week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs
            defaultValue="overview"
            className="mb-6"
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-white border border-slate-200 rounded-md p-1">
              <TabsTrigger
                value="overview"
                className="rounded-sm data-[state=active]:bg-slate-100"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="institutions"
                className="rounded-sm data-[state=active]:bg-slate-100"
              >
                Institutions
              </TabsTrigger>
              <TabsTrigger
                value="administrators"
                className="rounded-sm data-[state=active]:bg-slate-100"
              >
                Administrators
              </TabsTrigger>
              <TabsTrigger
                value="system"
                className="rounded-sm data-[state=active]:bg-slate-100"
              >
                System
              </TabsTrigger>
            </TabsList>

            <TabsContent value="institutions" className="mt-6">
              <div className="rounded-lg border border-slate-200 bg-white p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">
                    Gestion des Institutions
                  </h2>
                  <div className="mt-3 md:mt-0 flex flex-wrap gap-2">
                    <Button variant="outline" className="border-slate-300">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Exporter
                    </Button>
                  </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Alternative 1 main design */}
                  {/* <FilterCard
                    title="FILIÈRE"
                    options={filiereOptions}
                    selectedOption={selectedFiliere}
                    onOptionSelect={setSelectedFiliere}
                  />

                  <FilterCard
                    title="NIVEAU"
                    options={niveauOptions}
                    selectedOption={selectedNiveau}
                    onOptionSelect={setSelectedNiveau}
                  />

                  <FilterCard
                    title="COURS"
                    options={coursOptions}
                    selectedOption={selectedCours}
                    onOptionSelect={setSelectedCours}
                  /> */}

                  {/* Nouveau panneau de filtrage alternative 2 */}
                </div>
                  <AdvancedFilterPanel
                    onFiltersChange={handleFiltersChange}
                    className="mb-6"
                  />

                {/* Main Content Grid */}
                <div className="flex flex-col lg:flex-row h-full relative gap-5">
                  {/* Student List */}
                  <div
                    className={`flex-1 transition-all duration-300 ${
                      isSidebarExpanded ? "lg:w-2/3" : "lg:w-5/6"
                    }`}
                  >
                    <div className="bg-white rounded-lg border border-slate-200 h-full flex flex-col overflow-hidden">
                      {/* All filter Alternative 1 main design */}
                      {/* <StudentList
                      filiereFilter={selectedFiliere}
                      niveauFilter={selectedNiveau}
                      coursFilter={selectedCours}
                      /> */}

                      {/* All filter Alternative 2 */}
                      <StudentList filters={filters} />
                    </div>
                  </div>

                  {/* Sidebar with Managers */}
              
                    <GestionnaireSidebar/>
             
                </div>
              </div>
            </TabsContent>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Recent Activity Panel */}
                <Card className="border border-slate-200 bg-white">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h2 className="text-lg font-semibold text-slate-800">
                        Recent Activity
                      </h2>
                      <p className="text-sm text-slate-500">
                        Administrative actions in the system
                      </p>
                    </div>

                    <div className="space-y-6">
                      <ActivityItem
                        icon={<Users size={18} className="text-blue-500" />}
                        title="Started attendance session"
                        subtitle="Advanced Mathematics"
                        time="2 minutes ago"
                      />

                      <ActivityItem
                        icon={<Activity size={18} className="text-blue-500" />}
                        title="Generated department report"
                        subtitle="Computer Science"
                        time="1 hour ago"
                      />

                      <ActivityItem
                        icon={<Users size={18} className="text-blue-500" />}
                        title="Added new course manager"
                        subtitle="Physics 101"
                        time="3 hours ago"
                      />

                      <ActivityItem
                        icon={<Users size={18} className="text-blue-500" />}
                        title="Updated student records"
                        subtitle="Introduction to Economics"
                        time="5 hours ago"
                      />
                    </div>

                    <div className="mt-6 text-center">
                      <Button
                        variant="ghost"
                        className="text-blue-500 hover:text-blue-600 flex items-center mx-auto"
                      >
                        View All Activity
                        <ArrowRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Attendance Analytics Panel */}
                <Card className="border border-slate-200 bg-white">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h2 className="text-lg font-semibold text-slate-800">
                        Attendance Analytics
                      </h2>
                      <p className="text-sm text-slate-500">
                        Weekly attendance trends
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center h-70 bg-slate-50 rounded-lg">
                      <BarChart2 size={48} className="text-slate-300 mb-4" />
                      <p className="text-center text-slate-500 text-sm">
                        Attendance chart visualization goes here.
                        <br />
                        Weekly statistics show 92% average attendance.
                      </p>
                    </div>

                    <div className="mt-6 text-center">
                      <Button
                        variant="ghost"
                        className="text-blue-500 hover:text-blue-600 flex items-center mx-auto"
                      >
                        View Detailed Analytics
                        <ArrowRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* <TabsContent value="institutions" className="mt-6">
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold text-slate-800">
                  Institutions Management
                </h2>
                <p className="mb-6 text-slate-600">
                  View and manage all registered educational institutions.
                </p>

                <div className="flex justify-end mb-4">
                  <Button className="bg-sky-500 hover:bg-sky-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Institution
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                          Location
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                          Administrators
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <tr
                          key={item}
                          className="border-b border-slate-200 hover:bg-slate-50"
                        >
                          <td className="px-4 py-3 text-sm text-slate-800">
                            École Supérieure de Génie Numérique
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600">
                            Université
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600">
                            Douala, Cameroun
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600">
                            3
                          </td>
                          <td className="px-4 py-3">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              Active
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-slate-600 hover:text-slate-900"
                            >
                              Manage
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent> */}

            <TabsContent value="administrators" className="mt-6">
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold text-slate-800">
                  Administrators Management
                </h2>
                <p className="mb-6 text-slate-600">
                  View and manage all system administrators.
                </p>

                <div className="flex justify-end mb-4">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Administrator
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                          Institution
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                          Role
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <tr
                          key={item}
                          className="border-b border-slate-200 hover:bg-slate-50"
                        >
                          <td className="px-4 py-3 text-sm text-slate-800">
                            John Smith
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600">
                            john.smith@example.com
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600">
                            École Supérieure de Génie Numérique
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600">
                            Admin
                          </td>
                          <td className="px-4 py-3">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              Active
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-slate-600 hover:text-slate-900"
                            >
                              Manage
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="system" className="mt-6">
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold text-slate-800">
                  System Configuration
                </h2>
                <p className="mb-6 text-slate-600">
                  Manage system-wide settings and configurations.
                </p>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Card className="border border-slate-200">
                    <CardContent className="p-6">
                      <h3 className="mb-2 font-medium text-slate-800">
                        System Health
                      </h3>
                      <p className="text-sm text-slate-600">
                        All systems operational
                      </p>
                      <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
                        <div className="h-2 w-[98%] rounded-full bg-green-500"></div>
                      </div>
                      <p className="mt-2 text-xs text-slate-500">
                        Last checked: Today at 10:30 AM
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border border-slate-200">
                    <CardContent className="p-6">
                      <h3 className="mb-2 font-medium text-slate-800">
                        Database Status
                      </h3>
                      <p className="text-sm text-slate-600">
                        Connected and synced
                      </p>
                      <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
                        <div className="h-2 w-[95%] rounded-full bg-green-500"></div>
                      </div>
                      <p className="mt-2 text-xs text-slate-500">
                        Last synced: Today at 10:45 AM
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
  );


    return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">{dashboardContent}</div>
    </AdminLayout>
  );

}


// Activity Item Component
function ActivityItem({
  icon,
  title,
  subtitle,
  time,
}: {
  icon: JSX.Element;
  title: string;
  subtitle: string;
  time: string;
}) {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 mr-4 p-2 bg-blue-50 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-800">{title}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
        <p className="text-xs text-slate-400">{time}</p>
      </div>
    </div>
  );
}
