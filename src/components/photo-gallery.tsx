"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const photos = [
    {
      id: 1,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Sunday Worship Service",
      category: "Worship",
      event: "Sunday Morning Worship",
      date: "December 2024",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Youth Group Activities",
      category: "Youth",
      event: "Youth Game Night",
      date: "November 2024",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Community Outreach",
      category: "Outreach",
      event: "Community Food Drive",
      date: "November 2024",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Christmas Choir Performance",
      category: "Worship",
      event: "Christmas Cantata",
      date: "December 2024",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Fellowship Dinner",
      category: "Fellowship",
      event: "Thanksgiving Dinner",
      date: "November 2024",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Children's Ministry",
      category: "Children",
      event: "Sunday School",
      date: "December 2024",
    },
    {
      id: 7,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Baptism Service",
      category: "Worship",
      event: "Baptism Sunday",
      date: "October 2024",
    },
    {
      id: 8,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Women's Bible Study",
      category: "Ministry",
      event: "Women's Retreat",
      date: "September 2024",
    },
    {
      id: 9,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Mission Trip",
      category: "Outreach",
      event: "Summer Mission Trip",
      date: "July 2024",
    },
  ]

  const categories = ["All", "Worship", "Youth", "Fellowship", "Outreach", "Children", "Ministry"]

  const filteredPhotos =
    selectedCategory === "All" ? photos : photos.filter((photo) => photo.category === selectedCategory)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredPhotos.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredPhotos.length - 1 : selectedImage - 1)
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Event Photo Gallery</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Relive the joy and fellowship from our recent church events and celebrations.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-primary hover:bg-primary/90" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <Card
              key={photo.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <CardContent className="p-0">
                <div onClick={() => openLightbox(index)} className="relative group">
                  <img src={photo.src || "/placeholder.svg"} alt={photo.alt} className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <p className="font-semibold">{photo.event}</p>
                      <p className="text-sm">{photo.date}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <img
                src={filteredPhotos[selectedImage].src || "/placeholder.svg"}
                alt={filteredPhotos[selectedImage].alt}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold text-lg">{filteredPhotos[selectedImage].event}</h3>
                <p className="text-sm opacity-80">{filteredPhotos[selectedImage].date}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
