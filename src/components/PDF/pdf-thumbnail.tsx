"use client"

import { useState, useEffect, useRef } from "react"
import { FileText, Loader2, Eye, X, ExternalLink } from "lucide-react"
import pdfjs from "pdfjs-dist"
import { SimplePdfViewer } from "./simple-pdf-viewer" // Import du composant
import { Button } from "../ui/button"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PdfThumbnailProps {
  file: File
  width?: number
  height?: number
}

export function PdfThumbnail({ file, width = 200, height = 280 }: PdfThumbnailProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const objectUrlRef = useRef<string | null>(null)

  useEffect(() => {
    let isMounted = true
    let pdfInstance: pdfjs.PDFDocumentProxy | null = null

    const generateThumbnail = async () => {
      try {
        if (!file || !isMounted) return

        setIsLoading(true)
        setError(null)
        
        const objectUrl = URL.createObjectURL(file)
        objectUrlRef.current = objectUrl

        const loadingTask = pdfjs.getDocument({
          url: objectUrl,
          verbosity: 0
        })

        const pdf = await loadingTask.promise
        pdfInstance = pdf

        if (!isMounted) return

        const page = await pdf.getPage(1)
        const viewport = page.getViewport({ scale: 1 })
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d', { willReadFrequently: true })
        
        if (!context) throw new Error('Contexte canvas indisponible')

        const scale = Math.min(
          width / viewport.width,
          height / viewport.height,
          2.0
        )
        const scaledViewport = page.getViewport({ scale })

        canvas.width = Math.floor(scaledViewport.width)
        canvas.height = Math.floor(scaledViewport.height)

        await page.render({
          canvasContext: context,
          viewport: scaledViewport,
          intent: 'print'
        }).promise

        if (isMounted) {
          setThumbnailUrl(canvas.toDataURL('image/png', 0.8))
        }
      } catch (err) {
        if (isMounted) {
          console.error('Erreur génération:', err)
          setError(err instanceof Error ? err.message : 'Échec de génération')
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    generateThumbnail()

    return () => {
      isMounted = false
      if (pdfInstance) pdfInstance.destroy()
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    }
  }, [file, width, height])

  return (
    <div className="relative" style={{ width, height }}>
      {/* Thumbnail Container */}
      <div className="relative rounded-md overflow-hidden border border-gray-200 bg-gray-50">
        {isLoading ? (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <Loader2 className="animate-spin text-gray-400 h-6 w-6" />
          </div>
        ) : (
          <>
            {thumbnailUrl ? (
              <img 
                src={thumbnailUrl} 
                alt="Aperçu PDF" 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <FileText className="h-12 w-12 text-blue-500 mb-2" />
                <span className="text-sm text-gray-500">Aperçu non disponible</span>
              </div>
            )}
            
            {/* Interactive Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-md hover:bg-white transition-all"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">Aperçu complet</span>
              </button>
            </div>
          </>
        )}
        
        {/* File Name */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-1 truncate">
          {file.name}
        </div>
        
        {error && (
          <div className="absolute inset-0 bg-red-50/80 flex items-center justify-center text-red-500 text-sm p-2">
            {error}
          </div>
        )}
      </div>

      {/* Full Preview Dialog */}
 {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{file.name}</h3>
              <div className="flex gap-2">
                {/* Nouveau bouton d'ouverture dans un onglet */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(objectUrlRef.current, '_blank') && setIsPreviewOpen(false)}
                  title="Ouvrir dans un nouvel onglet"
                >
                  <ExternalLink className="h-5 w-5" />
                </Button>
                
                {/* Bouton de fermeture */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPreviewOpen(false)}
                  title="Fermer"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <SimplePdfViewer 
                file={file} 
                hideHeader 
                onOpenNewTab={() => window.open(objectUrlRef.current, '_blank')}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}