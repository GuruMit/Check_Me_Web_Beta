"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FilterOption {
  id: string
  label: string
}

interface FilterCardProps {
  title: string
  options: FilterOption[]
  selectedOption: string | null
  onOptionSelect: (optionId: string | null) => void
  color?: string
}

export function FilterCard({
  title,
  options,
  selectedOption,
  onOptionSelect,
  color = "bg-sky-50 border-sky-200",
}: FilterCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [displayValue, setDisplayValue] = useState<string>("")

  // Update display value when selected option changes
  useEffect(() => {
    if (!selectedOption) {
      setDisplayValue("Tous")
      return
    }

    const option = options.find((opt) => opt.id === selectedOption)
    setDisplayValue(option?.label || "Tous")
  }, [selectedOption, options])

  return (
    <div className={`rounded-lg border ${color} p-4 relative`}>
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div>
          <p className="text-xs font-medium text-slate-600 uppercase mb-1">{title}</p>
          <p className="text-xl font-medium text-slate-800">{displayValue}</p>
        </div>
        <div className={`bg-sky-500 rounded-full p-1 transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <ChevronDown className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 z-10 bg-white rounded-lg border border-slate-200 shadow-lg max-h-60 overflow-y-auto">
          <div className="p-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-left px-3 py-2 text-sm rounded-md"
              onClick={() => {
                onOptionSelect(null)
                setIsOpen(false)
              }}
            >
              <div className="flex items-center w-full">
                <span className="mr-2 w-5 flex-shrink-0">{!selectedOption && <Check className="h-4 w-4" />}</span>
                <span>Tous</span>
              </div>
            </Button>

            {options.map((option) => (
              <Button
                key={option.id}
                variant="ghost"
                className="w-full justify-start text-left px-3 py-2 text-sm rounded-md"
                onClick={() => {
                  onOptionSelect(option.id)
                  setIsOpen(false)
                }}
              >
                <div className="flex items-center w-full">
                  <span className="mr-2 w-5 flex-shrink-0">
                    {selectedOption === option.id && <Check className="h-4 w-4" />}
                  </span>
                  <span>{option.label}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
