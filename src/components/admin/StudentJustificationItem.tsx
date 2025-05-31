import React from 'react';
import { Check, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/Checkbox';
import { Badge } from '@/components/ui/Badges';

interface Justification {
  id: number;
  studentInitials: string;
  studentName: string;
  studentCode: string;
  courseName: string;
  instructor: string;
  timeSlot: string;
  date: string;
  filiere: string;
  justificationText: string;
  niveau: string;
  isSelected?: boolean;
}

interface JustificationItemProps {
  justification: Justification;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onRowClick: (justification: Justification) => void;
}

const JustificationItem: React.FC<JustificationItemProps> = ({ 
  justification, 
  isSelected, 
  onSelect, 
  onRowClick 
}) => {
  const bgColor = justification.studentInitials === 'AB' ? 'bg-blue-100' : 'bg-green-100';
  const textColor = justification.studentInitials === 'AB' ? 'text-blue-800' : 'text-green-800';
  
  return (
    <div 
      className={cn(
        "border-b border-gray-200",
        isSelected && "bg-blue-50"
      )} 
      onClick={() => onRowClick(justification)}
    >
      <div className="flex items-center p-4">
        <div className="mr-4">
          {isSelected ? (
        <div className="w-5 h-5 flex items-center justify-center bg-blue-500 rounded-full">
          <Check className="h-4 w-4 text-white" />
        </div>
          ) : (
        <Checkbox 
          checked={isSelected} 
          onCheckedChange={() => onSelect(justification.id)}
          onClick={(e) => e.stopPropagation()}
          className="rounded-full border-gray-300"
        />
          )}
        </div>
        
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mr-4", bgColor, textColor)}>
          <span className="font-medium">{justification.studentInitials}</span>
        </div>
        
        <div className="flex-grow">
          <div className="font-medium text-gray-800">{justification.studentName}</div>
          <div className="text-sm text-gray-500">{justification.studentCode}</div>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-sm text-gray-600">{justification.courseName}</div>
          <div className="text-sm font-medium">{ justification.instructor }</div>
        </div>
        
        <div className="flex flex-col items-end ml-12">
          <div className="text-sm font-medium">{justification.timeSlot}</div>
          <div className="text-sm text-gray-500">{justification.date}</div>
        </div>
        
        <div className="ml-12 w-24 flex justify-center">
          <Badge variant="outline" className="min-w-16 flex justify-center px-4 py-0.5">
        {justification.filiere === 'ISN' ? 'ISN' : 'Toutes'}
          </Badge>
        </div>
        
        <button className="ml-6" onClick={(e) => e.stopPropagation()}>
          <MoreHorizontal className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default JustificationItem;