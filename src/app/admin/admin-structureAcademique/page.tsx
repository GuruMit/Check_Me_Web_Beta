"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, PenSquare, Plus, Camera, Mail, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/Cards";
import Sidebar from "@/components/sections/AdminSidebar";

export default function AcademicStructurePage() {
  const [activeLevel, setActiveLevel] = useState<number>(1);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // Données fictives pour les filières
  const filieres = [
    { id: 1, name: "Ingénierie des Systèmes Numériques", code: "ISN" },
    { id: 2, name: "Ingénierie Numérique Sociotechnique", code: "INS" },
    { id: 3, name: "Création et Design Numérique", code: "CDN" },
  ];

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
          <Sidebar sidebarExpanded={sidebarExpanded} onToggle={toggleSidebar} />
     
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
            
      <div className="p-6 flex flex-col">
        <div className="flex items-center justify-center mb-15">
          <div className="bg-slate-900 text-white max-w-[500px] p-4 rounded-lg flex items-center">
            <div className="mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-building-2"
              >
                <path d="M6 22V2a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v20" />
                <path d="M2 22h19" />
                <path d="M12 7v.01" />
                <path d="M12 11v.01" />
                <path d="M12 15v.01" />
                <path d="M16 7v.01" />
                <path d="M16 11v.01" />
                <path d="M16 15v.01" />
                <path d="M8 7v.01" />
                <path d="M8 11v.01" />
                <path d="M8 15v.01" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold">
              Gestion de la structure académique
            </h1>
          </div>
        </div>

        <div className="flex flex-row justify-evenly itemscenter">
          <div>
            {/* Section Institution */}
            <div className="mb-8">
              <h2 className="text-sm text-slate-500 mb-2">Institution</h2>
              <Card className="border  bg-white border-slate-200">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="text-lg font-medium mb-6">
                      Université Inter-États Congo Cameroun
                    </h3>
                    <div className="relative mb-4">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                        <Image
                          src="/placeholder.svg?height=128&width=128"
                          alt="Logo UIECC"
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                      <button className="absolute bottom-0 right-0 bg-sky-500 text-white p-2 rounded-full shadow-md hover:bg-sky-600 transition-colors">
                        <Camera size={16} />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section Filières */}
            <div className="mb-8">
              <h2 className="text-sm text-slate-500 mb-2">Filières</h2>
              <Card className="border shadow-sm bg-white border-slate-200">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    {filieres.map((filiere) => (
                      <div
                        key={filiere.id}
                        className={`p-4 w-full rounded-md flex justify-between items-center ${
                          filiere.code === "ISN"
                            ? "bg-sky-50"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <div>
                          <h3 className="font-medium">{filiere.name}</h3>
                          <p className="text-sm text-slate-500">
                            {filiere.code}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-500"
                          >
                            <Trash2 size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-500"
                          >
                            <PenSquare size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-sky-500 hover:bg-sky-600">
                    Nouvelle Filière
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            {/* Section Niveaux */}
            <div className="mb-8">
              <h2 className="text-sm text-slate-500 mb-2">Niveaux</h2>
              <Card className="border bg-white border-slate-200">
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-4">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <Button
                        key={level}
                        variant={activeLevel === level ? "default" : "outline"}
                        className={`h-12 w-12 rounded-md ${
                          activeLevel === level
                            ? "bg-sky-500 hover:bg-sky-600"
                            : ""
                        }`}
                        onClick={() => setActiveLevel(level)}
                      >
                        {level}
                      </Button>
                    ))}
                    <Button className="h-12 w-12 rounded-md bg-sky-500 hover:bg-sky-600">
                      <Plus size={20} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section Classes */}
            <div className="mb-8">
              <h2 className="text-sm text-slate-500 mb-2">Classes</h2>
              <Card className="border bg-white border-slate-200">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    {filieres.map((filiere) => (
                      <div
                        key={filiere.id}
                        className={`p-4 rounded-md flex justify-between items-center ${
                          filiere.code === "ISN"
                            ? "bg-sky-50"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <div>
                          <h3 className="font-medium">{filiere.name}</h3>
                          <p className="text-sm text-slate-500">
                            {filiere.code}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-500"
                          >
                            <Trash2 size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-500"
                          >
                            <PenSquare size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-sky-500 hover:bg-sky-600">
                    Nouvelle Filière
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

           

           
        </main>
      </div>

    </div>
  );
}
