"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, FileText, X } from "lucide-react"

interface SimplePdfViewerProps {
  file: File | null
  hideHeader?: boolean
  onOpenNewTab?: () => void
}

export function SimplePdfViewer({  file, 
  hideHeader = false, 
  onOpenNewTab 
}: SimplePdfViewerProps) {
  const [url, setUrl] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState<boolean>(true)

  useEffect(() => {
    if (file) {
      const newUrl = URL.createObjectURL(file)
      setUrl(newUrl)

      const isChrome = navigator.userAgent.indexOf("Chrome") !== -1
      const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1
      const isSafari = navigator.userAgent.indexOf("Safari") !== -1 && !isChrome

      setIsSupported(isChrome || isFirefox || isSafari)

      return () => {
        URL.revokeObjectURL(newUrl)
        setUrl(null)
      }
    }
  }, [file])

  const handleDownload = () => {
    if (file && url) {
      const a = document.createElement("a")
      a.href = url
      a.download = file.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  if (!file || !url) {
    return (
      <div className="flex items-center justify-center bg-gray-100 h-full">
        <div className="text-gray-400">Aucun PDF sélectionné</div>
      </div>
    )
  }

  return (
    <div className="h-[1000vh] border rounded-md overflow-hidden flex flex-col">
       {!hideHeader && (
        <div className="bg-gray-100 p-2 flex justify-between items-center">
          <div className="font-medium truncate max-w-[300px]">{file.name}</div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onOpenNewTab} // Utilisation de la prop passée
              className="flex items-center gap-1"
            >
              <FileText className="h-4 w-4" />
              Ouvrir dans un nouvel onglet
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleDownload}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              Télécharger
            </Button>
          </div>
        </div>
      )}

      {isSupported ? (
        <iframe 
          src={url} 
          className="w-full flex-1" 
          title={`Aperçu PDF: ${file.name}`} 
        />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
          <FileText className="h-16 w-16 text-blue-500 mb-4" />
          <p className="text-gray-600 mb-2">Prévisualisation non supportée</p>
          <Button 
            onClick={() => window.open(url, "_blank")}
            className="flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            Ouvrir dans un nouvel onglet
          </Button>
        </div>
      )}
    </div>
  )
}