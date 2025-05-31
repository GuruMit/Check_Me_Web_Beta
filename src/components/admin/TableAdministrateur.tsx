import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
// Import the updated AdministratorFormData
import { AdministratorFormData } from "@/app/admin/admin-createGc/page";

interface AdministrateurTableProps {
  form: ReturnType<typeof useForm<AdministratorFormData>>;
  onSubmit: (data: AdministratorFormData) => void;
  onCancel: () => void;
}

const AdministrateurTable: React.FC<AdministrateurTableProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Nom */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nom <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Entrez le nom" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Prénom */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Prénom <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Entrez le prénom" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="Entrez l'email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Rôle */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Rôle <span className="text-red-500">*</span>
              </FormLabel>
              {/* SelectItem values now use the full role names from ManagerRole */}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Quel est le rôle ?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Gestionnaire de niveau">Gestionnaire de niveau</SelectItem>
                  <SelectItem value="Gestionnaire de cours">Gestionnaire de cours</SelectItem>
                  <SelectItem value="Gestionnaire d'absences">Gestionnaire d'absences</SelectItem>
                  <SelectItem value="Administrateur">Administrateur</SelectItem>
                  <SelectItem value="Super Administrateur">Super Administrateur</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {/* Filière */}
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Filière <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Quelle est la filière ?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="informatique">Informatique</SelectItem>
                  <SelectItem value="gestion">Gestion</SelectItem>
                  <SelectItem value="commerce">Commerce</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {/* Titre */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Titre <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Quel est le titre (Dr, Pr, M,Mme) ?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="dr">Dr</SelectItem>
                  <SelectItem value="pr">Pr</SelectItem>
                  <SelectItem value="m">M</SelectItem>
                  <SelectItem value="mme">Mme</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {/* Buttons */}
        <div className="flex justify-center gap-5 pt-4">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onCancel}
            className="w-50 border border-black on hover:border-0 transition-discrete"
          >
            Annuler
          </Button>
          <Button
            variant="default"
            type="submit"
            size="lg"
            className=" hover:bg-brand-600 w-50"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Validation..." : "Valider"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AdministrateurTable;