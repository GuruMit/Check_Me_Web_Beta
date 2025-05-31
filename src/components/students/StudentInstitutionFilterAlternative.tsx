"use client"

import { useState, useEffect } from "react"
import { X, Filter, Search, ChevronDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "../ui/Badges"
import { cn } from "@/lib/utils"
import { COURS_MAPPING } from "@/types/constants"


interface FilterOption {
  id: string;
  label: string;
  category: string;
}

interface AdvancedFilterPanelProps {
  onFiltersChange: (filters: Record<string, string[]>) => void;
  className?: string;
}


export function AdvancedFilterPanel({ onFiltersChange, className = "" }: AdvancedFilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    filiere: [],
    niveau: [],
    cours: [],
  });
  const [activeCategory, setActiveCategory] = useState<string | null>("filiere");
  const [dynamicCourses, setDynamicCourses] = useState<FilterOption[]>([]);

  // Options statiques
  const filiereOptions: FilterOption[] = [
    { id: "ISN", label: "ISN", category: "filiere" },
    { id: "INS", label: "INS", category: "filiere" },
    { id: "CDN", label: "CDN", category: "filiere" },
  ];

  const niveauOptions: FilterOption[] = [1, 2, 3, 4, 5].map(n => ({
    id: n.toString(),
    label: `Niveau ${n}`,
    category: "niveau",
  }));

  useEffect(() => {
    const selectedFiliere = selectedFilters.filiere[0];
    const selectedNiveau = selectedFilters.niveau[0];

    if (selectedFiliere && selectedNiveau) {
      const coursOptions = COURS_MAPPING
        .filter(course =>
          course.filiere === selectedFiliere && course.niveau === parseInt(selectedNiveau)
        )
        .map(course => {
          const datePlage = course.datePlages[parseInt(selectedNiveau)]; // Get date range for selected level
          return {
            id: course.id.toString(),
            label: `${course.nom} (${datePlage?.startDate || 'N/A'} - ${datePlage?.endDate || 'N/A'})`,
            category: "cours",
          }
        });
      setDynamicCourses(coursOptions);
    } else {
      setDynamicCourses([]);
    }
  }, [selectedFilters.filiere, selectedFilters.niveau]);

  const allOptions = [
    ...filiereOptions,
    ...niveauOptions,
    ...dynamicCourses
  ];

  const filteredOptions = allOptions.filter(
    (option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (activeCategory === null || option.category === activeCategory),
  );

  const categories = [
    { id: "filiere", label: "Filière" },
    { id: "niveau", label: "Niveau" },
    { id: "cours", label: "Cours" },
  ];

  const totalSelectedFilters = Object.values(selectedFilters).reduce((total, filters) => total + filters.length, 0);

  const toggleFilter = (option: FilterOption) => {
    const category = option.category;
    const newSelectedFilters = { ...selectedFilters };

    if (category === 'filiere') {
      newSelectedFilters.niveau = [];
      newSelectedFilters.cours = [];
    }
    if (category === 'niveau') {
      newSelectedFilters.cours = [];
    }

    newSelectedFilters[category] = newSelectedFilters[category].includes(option.id)
      ? []
      : [option.id];

    setSelectedFilters(newSelectedFilters);
  };

  const removeFilter = (category: string, filterId: string) => {
    const newSelectedFilters = { ...selectedFilters };
    newSelectedFilters[category] = newSelectedFilters[category].filter((id) => id !== filterId);
    setSelectedFilters(newSelectedFilters);
  };

  const resetFilters = () => {
    setSelectedFilters({ filiere: [], niveau: [], cours: [] });
  };

  useEffect(() => {
    onFiltersChange(selectedFilters);
  }, [selectedFilters, onFiltersChange]);

  const getFilterLabel = (category: string, filterId: string) => {
    if (category === 'cours') {
      const course = COURS_MAPPING.find(c => c.id.toString() === filterId);
      const niveauSelectionne = selectedFilters.niveau[0];
      const datePlage = course?.datePlages[parseInt(niveauSelectionne)];
      return `${course?.nom} (${datePlage?.startDate || 'N/A'} - ${datePlage?.endDate || 'N/A'})` || filterId;
    }
    const option = allOptions.find(opt => opt.category === category && opt.id === filterId);
    return option?.label || filterId;
  };

  // const getCourseDates = (courseId: number, niveau: string) => {
  //   const course = COURS_MAPPING.find(c => c.id === courseId);
  //   if (!course) return 'Dates non disponibles';

  //   const dates = course.datePlages[parseInt(niveau)];
  //   return dates
  //     ? `${dates.startDate} - ${dates.endDate}`
  //     : 'Dates non configurées';
  // }

  return (
    <div className={cn("bg-white border border-slate-200 rounded-lg", className)}>
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-slate-500" />
            <h3 className="font-medium text-slate-800">Filters</h3>
            {totalSelectedFilters > 0 && (
              <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100">{totalSelectedFilters}</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {totalSelectedFilters > 0 && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="text-slate-500 hover:text-slate-700">
                Réinitialiser
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1">
              {isOpen ? "Masquer" : "Afficher"}
              <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "")} />
            </Button>
          </div>
        </div>

        {totalSelectedFilters > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([category, filters]) =>
              filters.map((filterId) => (
                <Badge
                  key={`${category}-${filterId}`}
                  className="bg-slate-100 text-slate-800 hover:bg-slate-200 px-2 py-1 flex items-center gap-1"
                >
                  <span className="text-xs font-medium">{getFilterLabel(category, filterId)}</span>
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter(category, filterId)} />
                </Badge>
              ))
            )}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Rechercher un filtre..."
              className="pl-9 h-9 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex border-b border-slate-200 mb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className={cn(
                  "px-4 py-2 text-sm font-medium",
                  activeCategory === category.id
                    ? "text-sky-600 border-b-2 border-sky-600"
                    : "text-slate-600 hover:text-slate-800"
                )}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
                {selectedFilters[category.id].length > 0 && (
                  <span className="ml-2 bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded-full text-xs">
                    {selectedFilters[category.id].length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {activeCategory === 'cours' && dynamicCourses.length === 0 && (
              <div className="col-span-full text-center py-8 text-slate-500">
                {!selectedFilters.filiere.length
                  ? "Sélectionnez d'abord une filière"
                  : !selectedFilters.niveau.length
                    ? "Sélectionnez un niveau"
                    : "Aucun cours disponible"}
              </div>
            )}

            {filteredOptions.map((option) => {
              const isSelected = selectedFilters[option.category].includes(option.id);
              const course = COURS_MAPPING.find((c) => c.id.toString() === option.id);
              const niveauSelectionne = selectedFilters.niveau[0];
              const dates = course?.datePlages[parseInt(niveauSelectionne)]

              return (
                <div
                  key={`${option.category}-${option.id}`}
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-md cursor-pointer",
                    isSelected ? "bg-sky-50 border border-sky-200" : "hover:bg-slate-50 border border-transparent"
                  )}
                  onClick={() => toggleFilter(option)}
                >
                  <div
                    className={cn(
                      "flex-shrink-0 h-4 w-4 rounded border",
                      isSelected ? "bg-sky-500 border-sky-500 flex items-center justify-center" : "border-slate-300"
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-700">
                      {option.label.split(' (')[0]}
                    </span>
                    {option.category === 'cours' && dates && (
                      <span className="text-xs text-slate-400">
                        {dates?.startDate || 'N/A'} - {dates?.endDate || 'N/A'}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 ml-auto">
                    {option.category === "cours" && `ID: ${option.id}`}
                    {option.category === "filiere" && "Filière"}
                    {option.category === "niveau" && "Niveau"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
