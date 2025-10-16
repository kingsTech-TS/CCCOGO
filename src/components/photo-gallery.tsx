"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from "../../lib/firebase"


interface EventPhoto {
  id: string
  url: string
  caption?: string
  isFeatured?: boolean
  uploadedAt?: any // Firestore Timestamp
}

export function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [photos, setPhotos] = useState<EventPhoto[]>([])

  // 🔹 Fetch photos from Firestore in real-time
  useEffect(() => {
    const q = query(collection(db, "eventPhoto"), orderBy("uploadedAt", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as EventPhoto[]
      setPhotos(fetched)
    })

    return () => unsubscribe()
  }, [])

  const categories = ["All", "Featured"]
  const filteredPhotos =
    selectedCategory === "All"
      ? photos
      : photos.filter((photo) => photo.isFeatured)

  const openLightbox = (index: number) => setSelectedImage(index)
  const closeLightbox = () => setSelectedImage(null)
  const nextImage = () => {
    if (selectedImage !== null)
      setSelectedImage((selectedImage + 1) % filteredPhotos.length)
  }
  const prevImage = () => {
    if (selectedImage !== null)
      setSelectedImage(
        selectedImage === 0
          ? filteredPhotos.length - 1
          : selectedImage - 1
      )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Event Photo Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Relive the joy and fellowship from our recent church events and
            celebrations.
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
              className={
                selectedCategory === category
                  ? "bg-primary hover:bg-primary/90"
                  : ""
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.length > 0 ? (
            filteredPhotos.map((photo, index) => (
              <Card
                key={photo.id}
                className="bg-transparent border-0 shadow-none cursor-pointer"
              >
                <CardContent className="p-0 bg-transparent">
                  <div
                    onClick={() => openLightbox(index)}
                    className="relative group overflow-hidden rounded-lg"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption || "Event photo"}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                        <p className="font-semibold">{photo.caption || "—"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No photos available yet 👀.
            </p>
          )}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && filteredPhotos[selectedImage] && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <img
                src={filteredPhotos[selectedImage].url}
                alt={filteredPhotos[selectedImage].caption || "Event photo"}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute bottom-4 left-4 text-white bg-black/35">
                <h3 className="font-semibold text-lg">
                  {filteredPhotos[selectedImage].caption || "Event Photo"}
                </h3>
                {filteredPhotos[selectedImage].uploadedAt && (
                  <p className="text-sm opacity-80">
                    {new Date(
                      filteredPhotos[selectedImage].uploadedAt.toMillis()
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:bg-black/10 bg-black/35"
              >
                <X className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-black/10 bg-black/35"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-black/10 bg-black/35"
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
