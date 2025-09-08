"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Ruler, User, Info, Phone } from "lucide-react"

interface InteractiveSizeGuideProps {
  isOpen: boolean
  onClose: () => void
  category: string
}

const sizeCharts = {
  sarees: {
    blouse: [
      { size: "XS", bust: "32", waist: "26", hip: "34", shoulder: "13" },
      { size: "S", bust: "34", waist: "28", hip: "36", shoulder: "13.5" },
      { size: "M", bust: "36", waist: "30", hip: "38", shoulder: "14" },
      { size: "L", bust: "38", waist: "32", hip: "40", shoulder: "14.5" },
      { size: "XL", bust: "40", waist: "34", hip: "42", shoulder: "15" },
      { size: "XXL", bust: "42", waist: "36", hip: "44", shoulder: "15.5" },
    ],
    sareeLength: "Standard saree length is 5.5-6 meters with 0.8-1 meter blouse piece"
  },
  lehengas: [
    { size: "XS", bust: "32", waist: "26", hip: "34", length: "42" },
    { size: "S", bust: "34", waist: "28", hip: "36", length: "42" },
    { size: "M", bust: "36", waist: "30", hip: "38", length: "42" },
    { size: "L", bust: "38", waist: "32", hip: "40", length: "42" },
    { size: "XL", bust: "40", waist: "34", hip: "42", length: "42" },
    { size: "XXL", bust: "42", waist: "36", hip: "44", length: "42" },
  ],
  kurtas: [
    { size: "XS", chest: "36", length: "44", shoulder: "15" },
    { size: "S", chest: "38", length: "45", shoulder: "15.5" },
    { size: "M", chest: "40", length: "46", shoulder: "16" },
    { size: "L", chest: "42", length: "47", shoulder: "16.5" },
    { size: "XL", chest: "44", length: "48", shoulder: "17" },
    { size: "XXL", chest: "46", length: "49", shoulder: "17.5" },
  ]
}

const measurementTips = [
  {
    title: "Bust/Chest",
    description: "Measure around the fullest part of your chest, keeping the tape parallel to the floor",
    icon: "👕"
  },
  {
    title: "Waist",
    description: "Measure around your natural waistline, which is the narrowest part of your torso",
    icon: "📏"
  },
  {
    title: "Hip",
    description: "Measure around the fullest part of your hips, about 7-9 inches below your waist",
    icon: "📐"
  },
  {
    title: "Length",
    description: "For kurtas, measure from the highest point of your shoulder to your desired length",
    icon: "📏"
  }
]

export function InteractiveSizeGuide({ isOpen, onClose, category }: InteractiveSizeGuideProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [userMeasurements, setUserMeasurements] = useState({
    bust: "",
    waist: "",
    hip: "",
    length: ""
  })

  const currentChart = sizeCharts[category as keyof typeof sizeCharts] || sizeCharts.kurtas

  const getSizeRecommendation = () => {
    if (!userMeasurements.bust) return null
    
    const bustMeasurement = parseInt(userMeasurements.bust)
    const chart = Array.isArray(currentChart) ? currentChart : currentChart.blouse
    
    for (const size of chart) {
      const sizeBust = parseInt(size.bust || size.chest)
      if (bustMeasurement <= sizeBust + 1) {
        return size.size
      }
    }
    return "XXL"
  }

  const recommendedSize = getSizeRecommendation()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-playfair">
            <Ruler className="w-6 h-6 text-primary" />
            Interactive Size Guide - {category}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chart">Size Chart</TabsTrigger>
            <TabsTrigger value="measure">How to Measure</TabsTrigger>
            <TabsTrigger value="fit">Find My Size</TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="space-y-6">
            {category === "sarees" ? (
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Blouse Measurements (in inches)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 font-medium">Size</th>
                            <th className="text-left p-3 font-medium">Bust</th>
                            <th className="text-left p-3 font-medium">Waist</th>
                            <th className="text-left p-3 font-medium">Hip</th>
                            <th className="text-left p-3 font-medium">Shoulder</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(currentChart as any).blouse.map((row: any, index: number) => (
                            <motion.tr
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`border-b hover:bg-muted/50 transition-colors cursor-pointer ${
                                selectedSize === row.size ? "bg-primary/10" : ""
                              }`}
                              onClick={() => setSelectedSize(row.size)}
                            >
                              <td className="p-3 font-medium">{row.size}</td>
                              <td className="p-3">{row.bust}"</td>
                              <td className="p-3">{row.waist}"</td>
                              <td className="p-3">{row.hip}"</td>
                              <td className="p-3">{row.shoulder}"</td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <h4 className="font-medium mb-2 text-primary">Saree Specifications</h4>
                    <p className="text-sm text-muted-foreground">{(currentChart as any).sareeLength}</p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Size</th>
                          {Object.keys((currentChart as any[])[0])
                            .filter(key => key !== "size")
                            .map(key => (
                              <th key={key} className="text-left p-3 font-medium capitalize">
                                {key} (inches)
                              </th>
                            ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(currentChart as any[]).map((row, index) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`border-b hover:bg-muted/50 transition-colors cursor-pointer ${
                              selectedSize === row.size ? "bg-primary/10" : ""
                            }`}
                            onClick={() => setSelectedSize(row.size)}
                          >
                            <td className="p-3 font-medium">{row.size}</td>
                            {Object.entries(row)
                              .filter(([key]) => key !== "size")
                              .map(([key, value]) => (
                                <td key={key} className="p-3">{value}"</td>
                              ))}
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="measure" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {measurementTips.map((tip, index) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{tip.icon}</div>
                        <div>
                          <h4 className="font-semibold mb-2">{tip.title}</h4>
                          <p className="text-sm text-muted-foreground">{tip.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Professional Tip</h4>
                    <p className="text-sm text-blue-700 leading-relaxed">
                      For the most accurate measurements, have someone help you measure while wearing 
                      the undergarments you plan to wear with the outfit. Keep the measuring tape snug but not tight.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fit" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Enter Your Measurements</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Bust/Chest (inches)</label>
                    <input
                      type="number"
                      placeholder="e.g., 34"
                      value={userMeasurements.bust}
                      onChange={(e) => setUserMeasurements(prev => ({ ...prev, bust: e.target.value }))}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Waist (inches)</label>
                    <input
                      type="number"
                      placeholder="e.g., 28"
                      value={userMeasurements.waist}
                      onChange={(e) => setUserMeasurements(prev => ({ ...prev, waist: e.target.value }))}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Hip (inches)</label>
                    <input
                      type="number"
                      placeholder="e.g., 36"
                      value={userMeasurements.hip}
                      onChange={(e) => setUserMeasurements(prev => ({ ...prev, hip: e.target.value }))}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Length (inches)</label>
                    <input
                      type="number"
                      placeholder="e.g., 44"
                      value={userMeasurements.length}
                      onChange={(e) => setUserMeasurements(prev => ({ ...prev, length: e.target.value }))}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>

                {recommendedSize && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-4"
                  >
                    <h4 className="font-semibold text-green-900 mb-2">Recommended Size</h4>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-600 text-white text-lg px-4 py-2">
                        Size {recommendedSize}
                      </Badge>
                      <span className="text-sm text-green-700">Perfect fit for your measurements</span>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900 mb-2">Need Personal Assistance?</h4>
                    <p className="text-sm text-amber-700 mb-3">
                      Our styling experts are available to help you find the perfect fit. 
                      Get personalized recommendations based on your body type and preferences.
                    </p>
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                      Book Virtual Consultation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}