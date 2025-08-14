"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Download, User, Search } from "lucide-react"

export function SermonArchive() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSeries, setSelectedSeries] = useState("All")
  const [selectedSpeaker, setSelectedSpeaker] = useState("All")

  const sermons = [
    {
      id: 1,
      title: "The Gift of Hope",
      speaker: "Pastor Michael Johnson",
      date: "December 8, 2024",
      series: "Advent Series",
      description: "Exploring the hope we have in Christ during the Christmas season.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      audioUrl: "#",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "35 min",
      scripture: "Isaiah 9:6-7",
    },
    {
      id: 2,
      title: "Walking in Faith",
      speaker: "Pastor Sarah Johnson",
      date: "December 1, 2024",
      series: "Faith Journey",
      description: "Understanding what it means to live by faith in our daily lives.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      audioUrl: "#",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "42 min",
      scripture: "Hebrews 11:1-6",
    },
    {
      id: 3,
      title: "The Power of Prayer",
      speaker: "Pastor David Chen",
      date: "November 24, 2024",
      series: "Spiritual Disciplines",
      description: "Discovering how prayer transforms our relationship with God.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      audioUrl: "#",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "38 min",
      scripture: "Matthew 6:5-15",
    },
    {
      id: 4,
      title: "Gratitude in All Things",
      speaker: "Pastor Michael Johnson",
      date: "November 17, 2024",
      series: "Thanksgiving Special",
      description: "Learning to be thankful in every circumstance of life.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      audioUrl: "#",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "40 min",
      scripture: "1 Thessalonians 5:16-18",
    },
    {
      id: 5,
      title: "Love in Action",
      speaker: "Pastor Sarah Johnson",
      date: "November 10, 2024",
      series: "Faith Journey",
      description: "How to demonstrate God's love through our actions and words.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      audioUrl: "#",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "36 min",
      scripture: "1 John 3:16-18",
    },
    {
      id: 6,
      title: "Finding Peace",
      speaker: "Pastor David Chen",
      date: "November 3, 2024",
      series: "Spiritual Disciplines",
      description: "Discovering God's peace that surpasses all understanding.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      audioUrl: "#",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "44 min",
      scripture: "Philippians 4:6-7",
    },
  ]

  const series = ["All", "Advent Series", "Faith Journey", "Spiritual Disciplines", "Thanksgiving Special"]
  const speakers = ["All", "Pastor Michael Johnson", "Pastor Sarah Johnson", "Pastor David Chen"]

  const filteredSermons = sermons.filter((sermon) => {
    const matchesSearch =
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeries = selectedSeries === "All" || sermon.series === selectedSeries
    const matchesSpeaker = selectedSpeaker === "All" || sermon.speaker === selectedSpeaker
    return matchesSearch && matchesSeries && matchesSpeaker
  })

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sermon Archive</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of past sermons and continue growing in your faith journey.
          </p>
        </div>

        {/* Search and Filters */}
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

        {/* Sermons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSermons.map((sermon) => (
            <Card key={sermon.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={sermon.thumbnail || "/placeholder.svg"}
                    alt={sermon.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      <Play className="mr-2 h-5 w-5" />
                      Watch
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                    {sermon.duration}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                      {sermon.series}
                    </span>
                    <span className="text-xs text-gray-500">{sermon.date}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">{sermon.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <User className="h-4 w-4 mr-1" />
                    {sermon.speaker}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{sermon.description}</p>
                  <p className="text-xs text-primary font-medium mb-4">Scripture: {sermon.scripture}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                      <Play className="mr-1 h-4 w-4" />
                      Watch
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Download className="mr-1 h-4 w-4" />
                      Audio
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSermons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No sermons found matching your search criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}
