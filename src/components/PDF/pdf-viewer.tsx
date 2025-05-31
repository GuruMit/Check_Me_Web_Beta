"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"

// Dynamically import the PDF viewer components
const PDFViewerComponent = dynamic(
  () =>
    import("@react-pdf-viewer/core").then((mod) => {
      const { Viewer, Worker } = mod
      return { Viewer, Worker }
    }),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center bg-gray-100 rounded-md h-[600px]">
        <div className="animate-pulse text-gray-400">Loading PDF viewer...</div>
      </div>
    ),
  },
)

const DefaultLayoutPlugin = dynamic(
  () => import("@react-pdf-viewer/default-layout").then((mod) => mod.defaultLayoutPlugin),
  { ssr: false },
)

interface PdfViewerProps {
  file: File | null
}

export function PdfViewer({ file }: PdfViewerProps) {
  const [url, setUrl] = useState<string | null>(null)
  const [defaultLayoutPluginInstance, setDefaultLayoutPluginInstance] = useState<any>(null)

  // Initialize the default layout plugin
  useEffect(() => {
    const initPlugin = async () => {
      const DefaultLayoutPluginModule = await import("@react-pdf-viewer/default-layout")
      setDefaultLayoutPluginInstance(DefaultLayoutPluginModule.defaultLayoutPlugin())
    }

    initPlugin()
  }, [])

  // Create and clean up object URL when file changes
  useEffect(() => {
    if (file) {
      const newUrl = URL.createObjectURL(file)
      setUrl(newUrl)

      // Clean up function
      return () => {
        URL.revokeObjectURL(newUrl)
        setUrl(null)
      }
    }
  }, [file])

  if (!file || !url || !defaultLayoutPluginInstance) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded-md h-[600px]">
        <div className="text-gray-400">{!file ? "No PDF selected" : "Loading PDF viewer..."}</div>
      </div>
    )
  }

  const { Viewer, Worker } = PDFViewerComponent

  return (
    <div className="h-[600px] border rounded-md overflow-hidden">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
        <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  )
}
