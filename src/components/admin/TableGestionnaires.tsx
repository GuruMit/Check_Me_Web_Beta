// src/components/admin/TableGestionnaires.tsx
"use client";

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table';
import { Trash2, Edit, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Manager, ManagerStatus, AdminManager, StudentManager } from '@/app/Interface/Gestionnaires';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ManagersTableProps {
  managers: Manager[]; // This is correctly typed to accept the union of AdminManager | StudentManager
}

const ManagersTable: React.FC<ManagersTableProps> = ({ managers }) => {
  const router = useRouter();
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = (manager: Manager) => {
    setSelectedManager(manager);
    setIsEditDialogOpen(true);
    // In a real application, you'd likely pass `manager.id` or the full manager
    // to an edit modal/page that loads its specific details and allows editing.
    // For now, these are placeholders.
    console.log("Editing manager:", manager);
  };

  const handleDelete = (manager: Manager) => {
    setSelectedManager(manager);
    setIsDeleteDialogOpen(true);
    console.log("Deleting manager:", manager);
  };

  const handleSeeDetails = (managerId: string) => {
    // Navigates to a dynamic route for manager details
    router.push(`/admin/gestionnaires/${managerId}`);
  };

  const confirmDelete = () => {
    if (selectedManager) {
      // In a real application, you would call a function here
      // to remove the manager from localStorage based on their type (AdminManager or StudentManager)
      // For demonstration, we're just showing a toast.

      // Example of how you *would* differentiate if necessary for deletion:
      // if (selectedManager.role === "Étudiant") {
      //   deleteStudentManager(selectedManager.id);
      // } else {
      //   deleteAdminManager(selectedManager.id);
      // }

      toast.success(`${selectedManager.name} a été supprimé (simulé).`);
      setIsDeleteDialogOpen(false);
      setSelectedManager(null);
      router.refresh(); // Trigger a re-fetch in the parent component
    }
  };

  const handleUpdateManager = (updatedManager: Manager) => {
    // In a real application, you would call a function here
    // to update the manager in localStorage based on their type
    // if (updatedManager.role === "Étudiant") {
    //   updateStudentManager(updatedManager);
    // } else {
    //   updateAdminManager(updatedManager as AdminManager);
    // }

    toast.success(`${updatedManager.name} a été mis à jour (simulé).`);
    setIsEditDialogOpen(false);
    router.refresh(); // Trigger a re-fetch in the parent component
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 ">
            <h3 className="font-semibold text-gray-800">Tous les gestionnaires</h3>
            <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {managers.length} personnes
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto max-h-[600px] scroll-auto bar">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Noms</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Mail</TableHead>
              <TableHead>Filières/Code</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {managers.length > 0 ? (
              managers.map((manager) => (
                <TableRow key={manager.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-blue-600 font-medium">
                        {manager.initials}
                      </div>
                      <div>
                        <div className="font-medium">{manager.name}</div>
                        <div className="text-sm text-gray-500">
                          {/* 'code' is guaranteed to exist on both AdminManager and StudentManager */}
                          {manager.code}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      manager.status === 'actif'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800' // Assuming 'inactif' is the only other option
                    }`}>
                      <span className={`w-2 h-2 mr-1 rounded-full ${
                        manager.status === 'actif' ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                      {manager.status === 'actif' ? 'Actif' : 'Inactif'}
                    </div>
                  </TableCell>
                  <TableCell>{manager.role}</TableCell>
                  <TableCell>{manager.email}</TableCell>
                  <TableCell>
                    {/* 'filter' is also guaranteed to exist on both, can be simplified */}
                    {manager.filter || 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSeeDetails(manager.id)}
                        className="text-gray-500 hover:text-blue-600"
                        title="Voir les détails"
                      >
                        <Eye className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(manager)}
                        className="text-gray-500 hover:text-blue-600"
                        title="Modifier"
                      >
                        <Edit className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(manager)}
                        className="text-gray-500 hover:text-red-600"
                        title="Supprimer"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                  Aucun gestionnaire trouvé pour ce filtre.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Your dialogs for delete and edit actions would go here */}
      {/* Ensure you have the actual dialog components (ConfirmDialog, EditManagerDialog) imported and implemented */}
      {/* <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Supprimer le gestionnaire"
        description={`Êtes-vous sûr de vouloir supprimer ${selectedManager?.name}? Cette action ne peut pas être annulée.`}
      />

      {isEditDialogOpen && selectedManager && (
        <EditManagerDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          manager={selectedManager}
          onSave={handleUpdateManager}
        />
      )} */}
    </div>
  );
};

export default ManagersTable;