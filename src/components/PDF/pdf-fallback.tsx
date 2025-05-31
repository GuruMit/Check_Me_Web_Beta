// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/Cards"
// import { FileText, ExternalLink } from "lucide-react"

// interface PdfFallbackProps {
//   file: File
// }

// export function PdfFallback({ file }: PdfFallbackProps) {
//   const [url, setUrl] = useState<string | null>(null)

//   const handleViewPdf = () => {
//     // Create a URL for the file
//     const objectUrl = URL.createObjectURL(file)
//     setUrl(objectUrl)

//     // Open the PDF in a new tab
//     window.open(objectUrl, "_blank")
//   }

//   // Clean up the URL when component unmounts
//   useState(() => {
//     return () => {
//       if (url) {
//         URL.revokeObjectURL(url)
//       }
//     }
//   }, [url])

//   return (
//     <Card className="w-full">
//       <CardContent className="p-6">
//         <div className="flex flex-col items-center gap-4">
//           <FileText className="h-16 w-16 text-blue-500" />
//           <div className="text-center">
//             <h3 className="font-medium">{file.name}</h3>
//             <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
//           </div>
//           <Button onClick={handleViewPdf} className="flex items-center gap-2">
//             <ExternalLink className="h-4 w-4" />
//             View PDF in Browser
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
