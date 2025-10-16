"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Download, User, Search, X } from "lucide-react"
import { db } from "../../lib/firebase"
import { motion, AnimatePresence } from "framer-motion"

export function SermonArchive() {
  const [sermons, setSermons] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSeries, setSelectedSeries] = useState("All")
  const [selectedSpeaker, setSelectedSpeaker] = useState("All")
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState<{ type: "video" | "audio"; url: string } | null>(null)

  // 🔥 Fetch sermons from Firestore
  useEffect(() => {
    const q = query(collection(db, "sermon"), orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setSermons(data)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // 🔍 Filter logic
  const filteredSermons = sermons.filter((sermon) => {
    const matchesSearch =
      sermon.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.description?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSeries = selectedSeries === "All" || sermon.series === selectedSeries
    const matchesSpeaker = selectedSpeaker === "All" || sermon.speaker === selectedSpeaker

    return matchesSearch && matchesSeries && matchesSpeaker
  })

  // 🧭 Dropdown options
  const series = ["All", ...new Set(sermons.map((s) => s.series).filter(Boolean))]
  const speakers = ["All", ...new Set(sermons.map((s) => s.speaker).filter(Boolean))]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sermon Archive
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of past sermons and continue growing in your faith journey.
          </p>
        </div>

        {/* 🔍 Search + Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search sermons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedSeries}
                onChange={(e) => setSelectedSeries(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {series.map((s) => (
                  <option key={s} value={s}>
                    {s === "All" ? "All Series" : s}
                  </option>
                ))}
              </select>
              <select
                value={selectedSpeaker}
                onChange={(e) => setSelectedSpeaker(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {speakers.map((s) => (
                  <option key={s} value={s}>
                    {s === "All" ? "All Speakers" : s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 🎧 Sermons Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading sermons...</div>
        ) : filteredSermons.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No sermons found matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSermons.map((sermon) => (
              <Card key={sermon.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={sermon.thumbnailUrl || "/placeholder.svg"}
                      alt={sermon.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      {sermon.videoUrl && (
                        <Button
                          size="lg"
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => setLightbox({ type: "video", url: sermon.videoUrl })}
                        >
                          <Play className="mr-2 h-5 w-5" />
                          Watch
                        </Button>
                      )}
                    </div>
                    {sermon.duration && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                        {sermon.duration}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                        {sermon.series || "No Series"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {sermon.date || sermon.createdAt?.toDate().toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">{sermon.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <User className="h-4 w-4 mr-1" />
                      {sermon.speaker}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{sermon.description}</p>
                    {sermon.scripture && (
                      <p className="text-xs text-primary font-medium mb-4">
                        Scripture: {sermon.scripture}
                      </p>
                    )}
                    <div className="flex gap-2">
                      {sermon.videoUrl && (
                        <Button
                          size="sm"
                          className="flex-1 bg-primary hover:bg-primary/90"
                          onClick={() => setLightbox({ type: "video", url: sermon.videoUrl })}
                        >
                          <Play className="mr-1 h-4 w-4" />
                          Watch
                        </Button>
                      )}
                      {sermon.audioUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => setLightbox({ type: "audio", url: sermon.audioUrl })}
                        >
                          <Download className="mr-1 h-4 w-4" />
                          Listen
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* 🎥 Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg w-11/12 max-w-3xl">
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
              >
                <X className="h-5 w-5" />
              </button>

              {lightbox.type === "video" ? (
                <video
                  src={lightbox.url}
                  controls
                  autoPlay
                  className="w-full max-h-[80vh] rounded-b-2xl"
                />
              ) : (
                <div className="p-6 text-center">
                  <audio src={lightbox.url} controls autoPlay className="w-full" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
