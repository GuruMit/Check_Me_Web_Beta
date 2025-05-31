import React, { useState } from "react";
import { Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badges";
import { Avatar } from "@/components/ui/avatar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useAuth } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";
import DynamicSidebar from "@/components/sections/DynamicSidebar";

interface MobileCourseLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MobileCourseLayout = ({ children, title = "Gestionnaire de Cours" }: MobileCourseLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  
  // Role-specific titles
  const roleTitles: Record<string, string> = {
    admin: "Administrateur",
    gestionnaire_cours: "Gestionnaire de cours",
    etudiant: "Étudiant"
  };
  
  const handleLogout = () => {
    logout();
    router.push("/userLogin")
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[80%]">
              <div className="h-full overflow-y-auto">
                <DynamicSidebar sidebarExpanded={true} onToggle={() => {}} />
              </div>
            </DrawerContent>
          </Drawer>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-brand-blue text-white">
              3
            </Badge>
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.name || "Utilisateur"}</p>
              <p className="text-xs text-gray-500">{roleTitles[user?.role || "admin"]}</p>
            </div>
            <div className="relative group">
              <Avatar className="h-10 w-10 border cursor-pointer">
                {/* <img src={user?.avatar || "https://github.com/shadcn.png"} alt="User" /> */}
              </Avatar>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 p-4 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default MobileCourseLayout;