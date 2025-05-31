// src/app/admin/admin-gestionnaires/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Bell,
  Mail,
  Plus,
  ChevronRight,
  ChevronLeft,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/sections/AdminSidebar";
import ManagersTable from "@/components/admin/TableGestionnaires"; // This table needs to accept Manager[]
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";
import { Input } from "@/components/ui/input";

// Import all manager types
import { Manager, AdminManager, StudentManager, ManagerStatus } from "@/app/Interface/Gestionnaires";

// Import BOTH load functions
import { loadAdminManagers } from '@/types/adminManagerData';
import { loadStudentManagers } from '@/types/studentManagerData'; // NEW IMPORT

export default function AdminGestionnaires() {
  const [activeTab, setActiveTab] = useState<ManagerStatus | 'all'>("all");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const { user } = useAuth();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allManagers, setAllManagers] = useState<Manager[]>([]);
  const managersPerPage = 10;

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  // Function to load ALL managers from local storage (both types)
  const fetchAllManagers = () => { // Renamed for clarity
    const loadedAdminManagers = loadAdminManagers();
    const loadedStudentManagers = loadStudentManagers(); // Load student managers

    // Combine them into a single array.
    // You might want to sort them here if there's a preferred order (e.g., by name, by role).
    const combinedManagers: Manager[] = [...loadedAdminManagers, ...loadedStudentManagers];
    setAllManagers(combinedManagers);
  };

  // Load managers when the component mounts and re-fetch on refresh signal
  useEffect(() => {
    fetchAllManagers(); // Initial fetch

    const handleRouteChangeComplete = () => {
      // Use URLSearchParams directly from window.location.search
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('refresh') === 'true') {
        fetchAllManagers(); // Re-fetch data
        // Clean up the URL by removing the 'refresh' parameter
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('refresh');
        router.replace(newUrl.toString());
      }
    };


  }, [router]); // Keeping `router` in dependency array for robustness if router object identity ever changes

  const handleGoToCreerGestionnaire = () => {
    router.push('/admin/admin-createGc');
  };

  // Filter managers based on search term and active tab
  const filteredManagers = allManagers.filter(manager => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Check properties common to both AdminManager and StudentManager
    const matchesSearch =
      manager.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      manager.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      manager.code.toLowerCase().includes(lowerCaseSearchTerm) || // 'code' is on both
      manager.filter.toLowerCase().includes(lowerCaseSearchTerm) || // 'filter' is on both
      manager.role.toLowerCase().includes(lowerCaseSearchTerm); // 'role' is on both

    const matchesTab = activeTab === "all" || manager.status === activeTab;
    return matchesSearch && matchesTab;
  });

  // Pagination logic
  const indexOfLastManager = currentPage * managersPerPage;
  const indexOfFirstManager = indexOfLastManager - managersPerPage;
  const currentManagers = filteredManagers.slice(indexOfFirstManager, indexOfLastManager);
  const totalPages = Math.ceil(filteredManagers.length / managersPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar sidebarExpanded={sidebarExpanded} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
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

        <main className="flex-1 overflow-y-auto p-6">
          <div className=" mb-6 flex items-center justify-between">
            <div className=" flex flex-1 rounded-lg bg-sky-50 p-6">
              <div>
                <h5 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                  GESTIONNAIRES
                </h5>
                <h2 className="text-2xl font-bold text-gray-800">
                  Tous les gestionnaires
                </h2>
              </div>
            </div>

            <div className="ml-15">
              <Button
                onClick={handleGoToCreerGestionnaire}
                className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 px-6 py-6 rounded-md"
              >
                <Plus className="h-5 w-5" />
                <span>Nouveau Gestionnaire</span>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Rechercher un gestionnaire..."
                  className="pl-9 pr-3 py-2 border rounded-md w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ManagerStatus | 'all')} className="ml-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  <TabsTrigger value="actif">Actifs</TabsTrigger>
                  <TabsTrigger value="inactif">Inactifs</TabsTrigger>
                  {/* You might consider adding "en-conge" if you plan to filter by it */}
                  {/* <TabsTrigger value="en-conge">En congé</TabsTrigger> */}
                </TabsList>
              </Tabs>
            </div>

            {/* Pass currentManagers (which is Manager[]) to ManagersTable */}
            <ManagersTable managers={currentManagers} />

            {filteredManagers.length > managersPerPage && (
              <div className="flex justify-center items-center space-x-2 mt-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}