"use client";
import React from "react";
import {
  Home,
  BarChart2,
  Sparkles,
  Users,
  ClipboardList,
  BookOpen,
  FolderOpen,
  Clock,
  Bell,
  Settings,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Globe,
  User,
  Calendar,
  BookOpenCheck,
  GraduationCap
} from "lucide-react";
// import { Badge } from "@/components/ui/badge"; // Assuming this is a local component
import { useAuth, UserRole } from "@/app/context/auth-context";
import { useRouter, usePathname } from "next/navigation"; 

interface SidebarProps {
  sidebarExpanded: boolean;
  onToggle: () => void;
}

type SidebarItem = {
  title: string;
  path: string;
  icon: React.ElementType;
  roles: UserRole[];
  badge?: number;
};

type SidebarSection = {
  title: string;
  items: SidebarItem[];
  roles: UserRole[];
};

const DynamicSidebar = ({ sidebarExpanded, onToggle }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const userRole = user?.role || "admin";

  // Define all sidebar items with role-based visibility
  const sidebarSections: SidebarSection[] = [
    {
      title: "ANALYSES",
      roles: [ "gestionnaire_cours"],
      items: [
        {
          title: "Accueil",
          path: "/dashboard",
          icon: Home,
          roles: ["gestionnaire_cours",],
        },
        {
          title: "Justifications",
          path: "/attendance/pending",
          icon: Sparkles,
          roles: ["gestionnaire_cours"],
          badge: 15,
        },
      ]
    },
    {
      title: "ACADÉMIE",
      roles: ["admin", "gestionnaire_cours", "etudiant"],
      items: [
        {
          title: "Mon profil",
          path: "/profile",
          icon: User,
          roles: ["gestionnaire_cours"],
        },
         {
          title: "Mes cours",
          path: "/my-courses",
          icon: BookOpenCheck,
          roles: ["gestionnaire_cours"],
        },
        {
          title: "Emploi du temps",
          path: "/schedule",
          icon: Calendar,
          roles: ["gestionnaire_cours", "etudiant"],
        },
      ]
    },

  ];

  // Check if current path is in the managers section
  const isManagersActive = pathname === "/managers" || pathname === "/managers/create";

  // Link class generator
    const getLinkClasses = (href: string, hasBadge: boolean = false) => {
    let isActive = pathname === href;

    // Special case for managers section
    if (href === "/managers") {
      isActive = isManagersActive;
    }

    return `flex items-center justify-center w-full h-[50px] hover:bg-gray-200 `;
  };

  const navigate = (path:string) => {
    router.push(path);
  }

  return (
    <aside
      className={ "transition-all duration-300 text-center border-r border-slate-200 bg-white flex flex-col py-4 overflow-hidden overflow-y-auto h-fit"}
    >
      {/* Logo and collapse button */}
      <div className="flex items-center justify-center px-4 mb-3">
      
          <div className="flex items-center flex-row-reverse gap-3">
            <h1 className="text-xl font-bold text-slate-800">
              Check<span className="text-brand-blue">ME</span>
            </h1>
            <div className="h-10 w-10 rounded-lg border flex justify-center items-center border-sky-200 p-2 mb-0">
              <img src="/lovable-uploads/609ab1b8-94fc-483e-86d2-dadf3ff07b0c.png" alt="Logo" className="h-8 w-8" />
            </div>
          </div>

      </div>

      {/* Navigation Links */}
      {sidebarSections.map((section, index) => {
        // Filter items based on user role
        const visibleItems = section.items.filter(item =>
          item.roles.includes(userRole as UserRole)
        );

        // Only render section if it has visible items and user has permission
        if (visibleItems.length === 0 || !section.roles.includes(userRole as UserRole)) {
          return null;
        }

        return (
          <React.Fragment key={index}>
            {/* Section Title */}
          
              <div className="mt-6 px-4">
                <h3 className="text-xs font-medium text-slate-400 mb-2">{section.title}</h3>
              </div>
     

            {/* Section Items */}
            <div className="flex flex-col items-center w-full space-y-5">
              {visibleItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(item.path)} // Use navigate function
                  className={getLinkClasses(item.path, !!item.badge)}
                  style={{cursor: 'pointer'}}

                >
                  
                      <item.icon size={20} />
                      {sidebarExpanded && <span className="ml-3">{item.title}</span>}
                   
                 
                </button>
              ))}
            </div>
          </React.Fragment>
        );
      })}

      <div className="flex-grow"></div>

      {/* Bottom Navigation Links */}
      {/* <div className="flex flex-col space-y-1 px-2 mt-2">
        <div
          onClick={() => navigate("/notifications")}
          className={`flex items-center ${
            sidebarExpanded
              ? "px-2 py-3 justify-start"
              : "px-2 py-2 justify-center mb-2"
          } rounded-lg text-slate-700 hover:bg-slate-100`}
          style={{cursor: 'pointer'}}
        >
          <Bell size={20} />
          {sidebarExpanded && <span className="ml-3">Notifications</span>}
        </div>
        <div
          onClick={() => navigate("/settings")}
          className={`flex items-center ${
            sidebarExpanded
              ? "px-2 py-3 justify-start"
              : "px-2 py-2 justify-center mb-2"
          } rounded-lg text-slate-700 hover:bg-slate-100`}
          style={{cursor: 'pointer'}}
        >
          <Settings size={20} />
          {sidebarExpanded && <span className="ml-3">Paramètres</span>}
        </div>
        <div
          onClick={() => navigate("/help")}
          className={`flex items-center ${
            sidebarExpanded
              ? "px-2 py-3 justify-start"
              : "px-2 py-2 justify-center mb-2"
          } rounded-lg text-slate-700 hover:bg-slate-100`}
          style={{cursor: 'pointer'}}
        >
          <HelpCircle size={20} />
          {sidebarExpanded && <span className="ml-3">Aide & Support</span>}
        </div>
      </div> */}
    </aside>
  );
};

export default DynamicSidebar;
