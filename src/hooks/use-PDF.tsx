"use client"

import { useState, useEffect } from "react"
import { pdfjs } from "react-pdf"
import "@/lib/pdf-worker" // Import the worker setup

interface UsePdfResult {
  pdfDocument: pdfjs.PDFDocumentProxy | null
  numPages: number
  isLoading: boolean
  error: Error | null
  generateThumbnail: (pageNumber?: number) => Promise<string | null>
}

export function usePdf(file: File | null): UsePdfResult {
  const [pdfDocument, setPdfDocument] = useState<pdfjs.PDFDocumentProxy | null>(null)
  const [numPages, setNumPages] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!file) {
      setPdfDocument(null)
      setNumPages(0)
      return
    }

    const loadPdf = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Convert file to ArrayBuffer
        const arrayBuffer = await file.arrayBuffer()

        // Load PDF document
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer })
        const pdf = await loadingTask.promise

        setPdfDocument(pdf)
        setNumPages(pdf.numPages)
      } catch (err) {
        console.error("Error loading PDF:", err)
        setError(err instanceof Error ? err : new Error("Failed to load PDF"))
      } finally {
        setIsLoading(false)
      }
    }

    loadPdf()
  }, [file])

  const generateThumbnail = async (pageNumber = 1): Promise<string | null> => {
    if (!pdfDocument) return null

    try {
      // Get the specified page
      const page = await pdfDocument.getPage(pageNumber)

      // Set scale for the thumbnail (adjust as needed)
      const scale = 0.5
      const viewport = page.getViewport({ scale })

      // Create canvas for rendering
      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")

      if (!context) return null

      canvas.height = viewport.height
      canvas.width = viewport.width

      // Render PDF page to canvas
      await page.render({
        canvasContext: context,
        viewport,
      }).promise

      // Convert canvas to data URL
      return canvas.toDataURL("image/png")
    } catch (err) {
      console.error("Error generating thumbnail:", err)
      return null
    }
  }

  return { pdfDocument, numPages, isLoading, error, generateThumbnail }
}
