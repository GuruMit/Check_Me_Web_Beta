import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/Dialogue';
import { Page, pdfjs, Document } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFPreviewProps {
  filePath: string;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ filePath }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="w-full mt-4 border rounded-md p-3">
      <p className="text-sm text-gray-500 mb-1">Pièce jointe</p>
      
      <div className="relative w-full h-48">
        {/* Blurred preview */}
        <div className="absolute inset-0 blur-sm bg-gray-100 rounded-md overflow-hidden">
          <Document
            file={filePath}
            onLoadSuccess={onDocumentLoadSuccess}
            className="w-full h-full"
          >
            <Page 
              pageNumber={1} 
              width={300}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>

        {/* Overlay and button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-md">
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-white text-slate-800 hover:bg-slate-100 shadow-lg"
          >
            <Eye className="mr-2 h-4 w-4" />
            Afficher le document complet
          </Button>
        </div>
      </div>

      {/* Full PDF Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto p-0">
          <div className="p-4 h-[80vh] overflow-auto">
            <Document
              file={filePath}
              onLoadSuccess={onDocumentLoadSuccess}
              className="h-full"
            >
              {Array.from(new Array(numPages || 0), (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  className="mb-4"
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  width={window.innerWidth > 1024 ? 800 : undefined}
                />
              ))}
            </Document>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PDFPreview;
