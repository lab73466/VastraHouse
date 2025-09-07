"use client"

import { useState } from "react"
import { Ruler, Info } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SizeGuideModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: string
}

export function SizeGuideModal({ open, onOpenChange, category }: SizeGuideModalProps) {
  const [selectedSize, setSelectedSize] = useState("")

  const sizeCharts = {
    Sarees: {
      blouse: [
        { size: "XS", bust: '32"', waist: '26"', hip: '34"' },
        { size: "S", bust: '34"', waist: '28"', hip: '36"' },
        { size: "M", bust: '36"', waist: '30"', hip: '38"' },
        { size: "L", bust: '38"', waist: '32"', hip: '40"' },
        { size: "XL", bust: '40"', waist: '34"', hip: '42"' },
        { size: "XXL", bust: '42"', waist: '36"', hip: '44"' },
      ],
      saree: "Standard saree length is 5.5-6 meters with 0.8-1 meter blouse piece",
    },
    Lehengas: [
      { size: "XS", bust: '32"', waist: '26"', hip: '34"', length: '42"' },
      { size: "S", bust: '34"', waist: '28"', hip: '36"', length: '42"' },
      { size: "M", bust: '36"', waist: '30"', hip: '38"', length: '42"' },
      { size: "L", bust: '38"', waist: '32"', hip: '40"', length: '42"' },
      { size: "XL", bust: '40"', waist: '34"', hip: '42"', length: '42"' },
      { size: "XXL", bust: '42"', waist: '36"', hip: '44"', length: '42"' },
    ],
    Kurtas: [
      { size: "XS", chest: '36"', length: '44"', shoulder: '15"' },
      { size: "S", chest: '38"', length: '45"', shoulder: '15.5"' },
      { size: "M", chest: '40"', length: '46"', shoulder: '16"' },
      { size: "L", chest: '42"', length: '47"', shoulder: '16.5"' },
      { size: "XL", chest: '44"', length: '48"', shoulder: '17"' },
      { size: "XXL", chest: '46"', length: '49"', shoulder: '17.5"' },
    ],
  }

  const measurementTips = [
    "Measure yourself wearing the undergarments you plan to wear with the outfit",
    "Keep the measuring tape snug but not tight",
    "For the most accurate fit, have someone help you measure",
    "If you're between sizes, we recommend sizing up for comfort",
    "Contact our styling team for personalized fit recommendations",
  ]

  const currentChart = sizeCharts[category as keyof typeof sizeCharts] || sizeCharts["Kurtas"]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ruler size={20} />
            Size Guide - {category}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chart">Size Chart</TabsTrigger>
            <TabsTrigger value="tips">Measurement Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="space-y-6">
            {category === "Sarees" ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Blouse Measurements</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                      <thead>
                        <tr className="bg-amber-50">
                          <th className="border border-gray-200 p-3 text-left">Size</th>
                          <th className="border border-gray-200 p-3 text-left">Bust</th>
                          <th className="border border-gray-200 p-3 text-left">Waist</th>
                          <th className="border border-gray-200 p-3 text-left">Hip</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(currentChart as any).blouse.map((row: any, index: number) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-200 p-3 font-medium">{row.size}</td>
                            <td className="border border-gray-200 p-3">{row.bust}</td>
                            <td className="border border-gray-200 p-3">{row.waist}</td>
                            <td className="border border-gray-200 p-3">{row.hip}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Saree Length</h4>
                  <p className="text-sm text-gray-600">{(currentChart as any).saree}</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-amber-50">
                      <th className="border border-gray-200 p-3 text-left">Size</th>
                      {Object.keys((currentChart as any)[0])
                        .filter((key) => key !== "size")
                        .map((key) => (
                          <th key={key} className="border border-gray-200 p-3 text-left capitalize">
                            {key}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(currentChart as any[]).map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-200 p-3 font-medium">{row.size}</td>
                        {Object.entries(row)
                          .filter(([key]) => key !== "size")
                          .map(([key, value]) => (
                            <td key={key} className="border border-gray-200 p-3">
                              {value}
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Info size={16} className="text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Need Help?</h4>
                  <p className="text-sm text-blue-700">
                    Our styling experts are available to help you find the perfect fit. Contact us at{" "}
                    <span className="font-medium">style@vastrahaus.com</span> or call +91-XXXX-XXXX-XX
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-semibold">How to Measure Yourself</h3>
              <ul className="space-y-3">
                {measurementTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-600">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Measurement Definitions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Bust/Chest:</strong> Measure around the fullest part of your chest
                </div>
                <div>
                  <strong>Waist:</strong> Measure around your natural waistline
                </div>
                <div>
                  <strong>Hip:</strong> Measure around the fullest part of your hips
                </div>
                <div>
                  <strong>Length:</strong> Measure from shoulder to desired hem length
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
