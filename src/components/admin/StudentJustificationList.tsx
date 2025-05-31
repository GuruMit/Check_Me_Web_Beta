import React, { useState, useEffect } from "react";
import { Justification } from "@/app/Interface/Interfaces";
import JustificationItem from "./StudentJustificationItem";
import JustificationListHeader, {
  JustificationFilter,
} from "./JustificationFilterHeader";
import PDFPreview from "./StudentJustificationPDFView";
import { justificationsData } from "@/app/data/Data";
import { Button } from "@/components/ui/button";
import PdfUploader from "../PDF/pdf-uploader";
import MotifDisplay from "./MotifDisplay";
import { SimplePdfViewer } from "../PDF/simple-pdf-viewer";

interface JustificationListProps {
  justifications: Justification[];
  onSelectJustification: (justification: Justification | null) => void;
}

const JustificationList: React.FC<JustificationListProps> = ({
  justifications,
  onSelectJustification,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(4);
  const [motifText, setMotifText] = useState<string>("");


   // 🔁 Initialisation du motif au premier chargement
  useEffect(() => {
    if (selectedId) {
      const initialJustification = justifications.find((j) => j.id === selectedId);
      if (initialJustification) {
        setMotifText(initialJustification.justificationText);
        onSelectJustification(initialJustification);
      }
    }
  }, [selectedId, justifications, onSelectJustification]);

  const handleSelect = (id: number) => {
    setSelectedId(selectedId === id ? null : id);
    const selectedJustification = justifications.find((j) => j.id === id);
    
    if (selectedJustification) {
      setMotifText(selectedJustification.justificationText);
      onSelectJustification(selectedJustification);
    } else {
      setMotifText("");
      onSelectJustification(null);
    }
  };

  const handleRowClick = (justification: Justification) => {
    handleSelect(justification.id);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Sample PDF path - in a real app, this would come from the justification data
  const samplePdfPath = "/Rapport_TDC_2024.pdf";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {justifications.length > 0 ? (
              justifications.map((justification) => (
                <JustificationItem
                  key={justification.id}
                  justification={justification}
                  isSelected={selectedId === justification.id}
                  onSelect={handleSelect}
                  onRowClick={handleRowClick}
                />
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                Aucune justification trouvée pour ce filtre.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="md:col-span-1">
        {selectedId && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 h-full">
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="max-w-[200px]">
                  <p className="font-semibold text-lg truncate">
                    {
                      justifications.find((j) => j.id === selectedId)
                        ?.courseName
                    }
                  </p>
                  <p className=" text-sm">
                    {justifications.find((j) => j.id === selectedId)?.filiere} -{" "}
                    Niveau{" "}
                    {justifications.find((j) => j.id === selectedId)?.niveau} -
                    Session 4
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-lg font-semibold">
                    {justifications.find((j) => j.id === selectedId)?.timeSlot}
                  </p>
                  <p className="text-sm">
                    {justifications.find((j) => j.id === selectedId)?.date} 
                  </p>
                </div>


              </div>

              <MotifDisplay motifText={motifText} />
              <div className="mx-auto py-">
                <h1 className="text-2xl font-bold mb-6">PDF Uploader</h1>

                <div className="grid md:grid-cols-1 gap-8">
                  <div>
                    <h2 className="text-lg font-medium">Upload PDF</h2>
                    <PdfUploader onFileSelect={setSelectedFile} maxSizeMB={5} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 ">
                <Button className="bg-amber-300 text-[#3F3F3F]" variant="secondary">Convoquer l'étudiant</Button>
                <Button className="text-white">Valider la demande</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JustificationList;
