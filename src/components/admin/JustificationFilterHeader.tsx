import React from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export type JustificationFilter = 'all' | 'approved' | 'rejected';

interface JustificationListHeaderProps {
  currentFilter: JustificationFilter;
  onFilterChange: (filter: JustificationFilter) => void;
}

const JustificationListHeader: React.FC<JustificationListHeaderProps> = ({ 
  currentFilter,
  onFilterChange
}) => {
  const getFilterTitle = (filter: JustificationFilter): string => {
    switch (filter) {
      case 'all':
        return 'Toutes les demandes de justification';
      case 'approved':
        return 'Demandes validées';
      case 'rejected':
        return 'Demandes refusées';
      default:
        return 'Toutes les demandes de justification';
    }
  };
  
  return (
    <div className=" border-gray-200 mb-5 rounded-lg bg-sky-50">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg ml-6 font-medium uppercase text-gray-600">Gestion des justifications</h2>
      </div>
      <div className="flex justify-between items-center">
      <Select
          value={currentFilter}
          onValueChange={(value) => onFilterChange(value as JustificationFilter)}
      >
        <SelectTrigger
          className="w-[100%] p-6 font-bold focus:ring-0 ring-offset-0 focus:ring-offset-0 bg-blue-50 text-slate-800 text-2xl border-none hover:bg-blue-100"
        >
          <SelectValue placeholder="Filtrer les demandes" className="text-xl font-bold" />
        </SelectTrigger>
        <SelectContent >
          <SelectItem value="all">Toutes les demandes de justification</SelectItem>
          <SelectItem value="approved">Demandes validées</SelectItem>
          <SelectItem value="rejected">Demandes refusées</SelectItem>
        </SelectContent>
      </Select>
    </div>
    </div>
  );
};

export default JustificationListHeader;