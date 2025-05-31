import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Manager {
  name: string;
  filiere: string;
  status: 'Actif' | 'Inactif';
  lastActivity: string;
  initials: string; // Ajout des initiales
  bgClass: string;  // Added for dynamic background color
  textClass: string; // Added for dynamic text color
}

const GestionnaireSidebar = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const toggleManagersSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  const filiereManagers: Manager[] = [
    { name: 'Dr. AMOUGOU', filiere: 'ISN', status: 'Actif', lastActivity: 'Aujourd\'hui', initials: 'DA', bgClass: 'bg-sky-100', textClass: 'text-sky-800' },
    { name: 'Pr. MIGNAMISSI', filiere: 'INS', status: 'Inactif', lastActivity: 'Il y a 2 semaines', initials: 'PM', bgClass: 'bg-purple-100', textClass: 'text-purple-800' },
    { name: 'Dr. ONDOBO', filiere: 'CDN', status: 'Actif', lastActivity: 'Aujourd\'hui', initials: 'DO', bgClass: 'bg-orange-100', textClass: 'text-orange-800' },
  ];

    const niveauManagers: Manager[] = [
    { name: 'M. AMOUGOU', filiere: 'ISN', status: 'Actif', lastActivity: 'Aujourd\'hui', initials: 'DA', bgClass: 'bg-sky-100', textClass: 'text-sky-800' },
    { name: 'Pr. MIGNAMISSI', filiere: 'INS', status: 'Inactif', lastActivity: 'Il y a 2 semaines', initials: 'PM', bgClass: 'bg-purple-100', textClass: 'text-purple-800' },
    { name: 'Dr. ONDOBO', filiere: 'CDN', status: 'Actif', lastActivity: 'Aujourd\'hui', initials: 'DO', bgClass: 'bg-orange-100', textClass: 'text-orange-800' },
  ];

    const coursManagers: Manager[] = [
    { name: 'MAVAIWA DESIRE', filiere: 'ISN', status: 'Actif', lastActivity: 'Aujourd\'hui', initials: 'DA', bgClass: 'bg-sky-100', textClass: 'text-sky-800' },
    { name: 'MINTYA INESSE', filiere: 'INS', status: 'Inactif', lastActivity: 'Il y a 2 semaines', initials: 'PM', bgClass: 'bg-purple-100', textClass: 'text-purple-800' },
    { name: 'MENDOMO MICHELLE', filiere: 'CDN', status: 'Actif', lastActivity: 'Aujourd\'hui', initials: 'DO', bgClass: 'bg-orange-100', textClass: 'text-orange-800' },
  ];

  return (
    <div
      className={`h-full transition-all duration-300 overflow-hidden ${
        isSidebarExpanded ? "w-full lg:w-110" : "w-auto lg:w-16"
      }`}
    >
      <div className="border border-slate-200 rounded-lg bg-white overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-slate-200">
          {isSidebarExpanded && (
            <h3 className="text-lg font-medium text-slate-800">
              Managers
            </h3>
          )}
          <button
            onClick={toggleManagersSidebar}
            className={`p-1 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors ${
              !isSidebarExpanded ? "mx-auto" : ""
            }`}
            aria-label={
              isSidebarExpanded
                ? "Collapse managers"
                : "Expand managers"
            }
          >
            {isSidebarExpanded ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        {isSidebarExpanded ? (
          <div
            className={`h-full flex flex-col p-4 gap-6 overflow-y-auto ${
              isSidebarExpanded ? "opacity-100" : "lg:opacity-0"
            }`}
          >
            {/* Gestionnaires de Filières */}
            <div className="bg-white rounded-lg border border-slate-200 flex-1">
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h3 className="font-semibold text-slate-800">
                  Gestionnaires de Filières
                </h3>
                <button className="text-sky-500 text-sm hover:underline flex items-center">
                  VOIR TOUT
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {filiereManagers.map((manager, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`${manager.bgClass} h-8 w-8 rounded-full flex items-center justify-center ${manager.textClass} font-medium text-sm`}>
                      {manager.initials}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">
                        {manager.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {manager.filiere}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-xs font-medium ${manager.status === 'Actif' ? 'text-green-600' : 'text-red-600'}`}>
                      {manager.status}
                    </span>
                    <span className="text-xs text-slate-500">
                      {manager.lastActivity}
                    </span>
                  </div>
                </div>
                ))}
              </div>
            </div>

            {/* Gestionnaires de Niveaux */}
            <div className="bg-white rounded-lg border border-slate-200 flex-1">
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h3 className="font-semibold text-slate-800">
                  Gestionnaires de Niveaux
                </h3>
                <button className="text-sky-500 text-sm hover:underline flex items-center">
                  VOIR TOUT
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {niveauManagers.map((manager, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`${manager.bgClass} h-8 w-8 rounded-full flex items-center justify-center ${manager.textClass} font-medium text-sm`}>
                      {manager.initials}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">
                        {manager.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {manager.filiere}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-xs font-medium ${manager.status === 'Actif' ? 'text-green-600' : 'text-red-600'}`}>
                      {manager.status}
                    </span>
                    <span className="text-xs text-slate-500">
                      {manager.lastActivity}
                    </span>
                  </div>
                </div>
                ))}
              </div>
            </div>

            {/* Gestionnaires de Cours */}
            <div className="bg-white rounded-lg border border-slate-200 flex-1">
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h3 className="font-semibold text-slate-800">
                  Gestionnaires de Cours
                </h3>
                <button className="text-sky-500 text-sm hover:underline flex items-center">
                  VOIR TOUT
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {coursManagers.map((manager, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                   <div className={`${manager.bgClass} h-8 w-8 rounded-full flex items-center justify-center ${manager.textClass} font-medium text-sm`}>
                      {manager.initials}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">
                        {manager.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {manager.filiere}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-xs font-medium ${manager.status === 'Actif' ? 'text-green-600' : 'text-red-600'}`}>
                      {manager.status}
                    </span>
                    <span className="text-xs text-slate-500">
                      {manager.lastActivity}
                    </span>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2 space-y-6">
            {/* Collapsed view - just show circles with initials */}
            <div className="space-y-2 flex flex-col items-center justify-center">
              <p className="text-xs font-medium text-slate-500 mb-3">
                Filières
              </p>
              <div className="flex flex-col space-y-3">
                 {filiereManagers.map((manager, index) => (
                    <div key={index} className="flex items-center">
                    <div className={`${manager.bgClass} h-10 w-10 rounded-full flex items-center justify-center ${manager.textClass} font-medium`}>
                        {manager.initials}
                    </div>
                    </div>
                 ))}
              </div>
            </div>

            <div className="space-y-2 flex flex-col items-center justify-center ">
              <p className="text-xs font-medium text-slate-500 mb-3">
                Niveaux
              </p>
              <div className="flex flex-col space-y-3">
                {niveauManagers.map((manager, index) => (
                    <div key={index} className="flex items-center">
                    <div className={`${manager.bgClass} h-10 w-10 rounded-full flex items-center justify-center ${manager.textClass} font-medium`}>
                        {manager.initials}
                    </div>
                    </div>
                 ))}
              </div>
            </div>

            <div className="space-y-2 flex flex-col items-center justify-center">
              <p className="text-xs font-medium text-slate-500 mb-3">
                Cours
              </p>
              <div className="flex flex-col space-y-3">
                {coursManagers.map((manager, index) => (
                    <div key={index} className="flex items-center">
                    <div className={`${manager.bgClass} h-10 w-10 rounded-full flex items-center justify-center ${manager.textClass} font-medium`}>
                       {manager.initials}
                    </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionnaireSidebar;
