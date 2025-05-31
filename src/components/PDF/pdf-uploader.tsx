"use client"

import { useState, useRef, useCallback } from "react"
import { PdfThumbnail } from "./pdf-thumbnail"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/Cards"
import { X, Upload, FileText } from "lucide-react"

interface PdfUploaderProps {
  onFileSelect?: (file: File | null) => void
  maxSizeMB?: number
}

export default function PdfUploader({ onFileSelect, maxSizeMB = 10 }: PdfUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const fileKeyRef = useRef(Date.now())

  const maxSizeBytes = maxSizeMB * 1024 * 1024

  const validateAndSetFile = useCallback((file: File | null) => {
    setError(null)

    if (!file) {
      setSelectedFile(null)
      onFileSelect?.(null)
      fileKeyRef.current = Date.now()
      return
    }

    if (file.type !== "application/pdf") {
      setError("Seuls les fichiers PDF sont autorisés")
      return
    }

    if (file.size > maxSizeBytes) {
      setError(`Taille maximale dépassée (${maxSizeMB}Mo)`)
      return
    }

    setSelectedFile(file)
    onFileSelect?.(file)
    fileKeyRef.current = Date.now()
  }, [maxSizeBytes, onFileSelect, maxSizeMB])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    validateAndSetFile(e.target.files?.[0] || null)
  }, [validateAndSetFile])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    validateAndSetFile(e.dataTransfer.files?.[0] || null)
  }, [validateAndSetFile])

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    onFileSelect?.(null)
    fileKeyRef.current = Date.now()
  }, [onFileSelect])

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Déposer un PDF</h3>

          {!selectedFile ? (
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragging 
                  ? "border-blue-500 bg-blue-50" 
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              role="button"
              aria-label="Zone de dépôt de fichier"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="application/pdf"
                className="hidden"
                aria-label="Sélection de fichier PDF"
              />
              <div className="flex flex-col items-center justify-center space-y-2">
                <Upload className="h-10 w-10 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Glissez-déposez votre PDF ici ou cliquez pour parcourir
                </p>
                <p className="text-xs text-gray-400">
                  Taille maximale : {maxSizeMB}Mo
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium truncate max-w-[200px]">
                    {selectedFile.name}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="text-gray-500 hover:text-red-500"
                  aria-label="Supprimer le fichier"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex justify-center">
                <PdfThumbnail
                  key={fileKeyRef.current}
                  file={selectedFile}
                />
              </div>
            </div>
          )}

          {error && (
            <div 
              className="text-sm text-red-500 mt-2 p-2 bg-red-50 rounded-md"
              role="alert"
            >
              {error}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}