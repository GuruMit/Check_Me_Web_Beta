"use client";

import React, { useState } from 'react';
import { MoreHorizontal, Plus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/Checkbox';
import { Badge } from '@/components/ui/Badges';
import { Button } from '@/components/ui/button';
import PDFPreview from '../admin/StudentJustificationPDFView';

interface Justification {
    id: number;
    studentInitials: string;
    studentName: string;
    studentCode: string;
    courseName: string;
    instructor: string;
    timeSlot: string;
    date: string;
    type: string;
    isSelected?: boolean;
}

const JustificationList: React.FC<{
    onSelectJustification: (justification: Justification | null) => void;
}> = ({ onSelectJustification }) => {
    const [selectedId, setSelectedId] = useState<number | null>(4);
    const [justifications, setJustifications] = useState<Justification[]>([
      {
        id: 1,
        studentInitials: 'AB',
        studentName: 'ANGO Brinda',
        studentCode: '20G60350',
        instructor: 'Dr AMOUGOU',
        courseName: 'Cybersecurity',
        timeSlot: '8h-12h',
        date: 'Jan 17, 2022',
        type: 'ISN',
      },
      {
        id: 2,
        studentInitials: 'AB',
        studentName: 'ANGO Brinda',
        studentCode: '20G60350',
        instructor: 'Mme EYENGA',
        courseName: 'Reference ITILE',
        timeSlot: '8h-12h',
        date: 'Jan 17, 2022',
        type: 'Toutes',
      },
      {
        id: 3,
        studentInitials: 'NL',
        studentName: 'NDJESSE LETERE',
        studentCode: '20G60380',
        instructor: 'Bank payment',
        courseName: 'PlateForme Avancée',
        timeSlot: '14h-16h',
        date: 'Jan 17, 2022',
        type: 'ISN',
      },
      {
        id: 4,
        studentInitials: 'AB',
        studentName: 'ANGO Brinda',
        studentCode: '20G60350',
        instructor: 'Bank payment',
        courseName: 'Management de projet',
        timeSlot: '14h-16h',
        date: 'Jan 17, 2022',
        type: 'ISN',
        isSelected: true,
      },
      {
        id: 5,
        studentInitials: 'NL',
        studentName: 'NDJESSE LETERE',
        studentCode: '20G60380',
        instructor: 'Mme EYENGA',
        courseName: 'Introduction au Big Data',
        timeSlot: '8h-12h',
        date: 'Jan 17, 2022',
        type: 'Toutes',
      },
      {
        id: 6,
        studentInitials: 'NL',
        studentName: 'NDJESSE LETERE',
        studentCode: '20G60380',
        instructor: 'Bank payment',
        courseName: 'Algorithmes et structures de données',
        timeSlot: '14h-16h',
        date: 'Jan 17, 2022',
        type: 'ISN',
      },
      {
        id: 7,
        studentInitials: 'NL',
        studentName: 'NDJESSE LETERE',
        studentCode: '20G60380',
        instructor: 'Card payment',
        courseName: 'Mathematiques discrètes',
        timeSlot: '8h-10h',
        date: 'Jan 17, 2022',
        type: 'Toutes',
      },
      ...Array.from({ length: 25 }, (_, i) => ({
        id: i + 8,
        studentInitials: `ST${i + 8}`,
        studentName: `Student ${i + 8}`,
        studentCode: `20G60${350 + i}`,
        instructor: `Instructor ${i + 8}`,
        courseName: `Course ${i + 8}`,
        timeSlot: `${8 + (i % 4)}h-${10 + (i % 4)}h`,
        date: `Jan ${18 + (i % 10)}, 2022`,
        type: i % 2 === 0 ? 'ISN' : 'Toutes',
      })),
    ]);

    const handleSelect = (id: number) => {
        setSelectedId(selectedId === id ? null : id);
        const selectedJustification = justifications.find(j => j.id === id);
        onSelectJustification(selectedJustification || null);
    };

    const handleRowClick = (justification: Justification) => {
        handleSelect(justification.id);
  };
  // Sample PDF path - in a real app, this would come from the justification data
  const samplePdfPath = "/Rapport_TDC_2024.pdf";

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto max-h-[500px] scroll-auto bar">
          <table className="min-w-full"> 
              <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[60px]"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[200px]">Étudiant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horaire</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filiere</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
            {justifications.map(justification => (
                <tr
              key={justification.id}
              className={cn(
                  selectedId === justification.id && "bg-blue-50"
              )}
                >
              <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className="cursor-pointer"
                    onClick={(e) => {
                e.stopPropagation();
                handleSelect(justification.id);
                    }}
                  >
                    {selectedId === justification.id ? (
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                    ) : (
                <Checkbox
                  checked={selectedId === justification.id}
                  onCheckedChange={() => handleSelect(justification.id)}
                  className="rounded-full border-gray-300 cursor-pointer hover:bg-gray-50"
                />
                    )}
                  </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mr-4",
                justification.studentInitials === 'AB' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  )}>
                <span className="font-medium">{justification.studentInitials}</span>
                  </div>
                  <div>
                <div className="font-medium text-gray-800">{justification.studentName}</div>
                <div className="text-sm text-gray-500">({justification.studentCode})</div>
                  </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-medium max-w-[150px]">
                  <div className="truncate">
                <div className="font-semibold text-gray-800 truncate"> {justification.courseName} </div>
                <div className="text-sm text-gray-500 truncate">{justification.instructor}</div>
                  </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600 max-w-[50px] font-medium">
                  <div>
                <div className="font-semibold text-gray-800"> {justification.timeSlot} </div>
                <div className="text-sm text-gray-500 ">{justification.date}</div>
                  </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                  <div className="max-w-fit text-gray-500 text-sm">
                {justification.type === 'ISN' ? 'ISN' : 'Toutes'}
                  </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                  <MoreHorizontal className="h-5 w-5 text-gray-400" />
              </td>
                </tr>
            ))}
              </tbody>
          </table>
            </div>
        </div>
    );
};

export default JustificationList;
