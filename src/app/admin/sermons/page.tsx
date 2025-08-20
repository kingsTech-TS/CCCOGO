"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Plus, Edit, Trash2, Save, Video, Music, Search, Star, Calendar, User, BookOpen } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Sermon {
  id: string
  title: string
  description: string
  speaker: string
  date: string
  series?: string
  scriptureReference: string
  videoUrl?: string
  audioUrl?: string
  thumbnailUrl?: string
  duration?: string
  category: "sunday-service" | "bible-study" | "special-event" | "youth" | "womens" | "mens"
  tags: string[]
  isFeatured: boolean
  downloadCount: number
  viewCount: number
  status: "published" | "draft" | "archived"
  createdAt: string
  updatedAt: string
}

interface SermonSeries {
  id: string
  name: string
  description: string
  thumbnailUrl?: string
  sermonCount: number
  startDate: string
  endDate?: string
}

const initialSermons: Sermon[] = [
  {
    id: "1",
    title: "Walking by Faith, Not by Sight",
    description:
      "An inspiring message about trusting God's plan even when we can't see the full picture. Learn how to develop unwavering faith in uncertain times.",
    speaker: "Pastor Johnson",
    date: "2024-01-14",
    series: "Faith Journey",
    scriptureReference: "2 Corinthians 5:7",
    videoUrl: "https://example.com/sermon1.mp4",
    audioUrl: "https://example.com/sermon1.mp3",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    duration: "45:30",
    category: "sunday-service",
    tags: ["faith", "trust", "guidance"],
    isFeatured: true,
    downloadCount: 156,
    viewCount: 342,
    status: "published",
    createdAt: "2024-01-14T10:00:00Z",
    updatedAt: "2024-01-14T10:00:00Z",
  },
  {
    id: "2",
    title: "The Power of Prayer in Daily Life",
    description:
      "Discover how prayer can transform your daily routine and strengthen your relationship with God. Practical tips for maintaining a consistent prayer life.",
    speaker: "Sister Mary",
    date: "2024-01-07",
    series: "Spiritual Disciplines",
    scriptureReference: "1 Thessalonians 5:17",
    videoUrl: "https://example.com/sermon2.mp4",
    audioUrl: "https://example.com/sermon2.mp3",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    duration: "38:15",
    category: "bible-study",
    tags: ["prayer", "spiritual-growth", "daily-life"],
    isFeatured: false,
    downloadCount: 89,
    viewCount: 198,
    status: "published",
    createdAt: "2024-01-07T19:00:00Z",
    updatedAt: "2024-01-07T19:00:00Z",
  },
  {
    id: "3",
    title: "Youth: Living for Christ in a Digital Age",
    description:
      "A special message for young people about maintaining Christian values while navigating social media and digital relationships.",
    speaker: "Pastor Mike",
    date: "2024-01-12",
    scriptureReference: "1 Timothy 4:12",
    videoUrl: "https://example.com/sermon3.mp4",
    audioUrl: "https://example.com/sermon3.mp3",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    duration: "32:45",
    category: "youth",
    tags: ["youth", "digital-age", "christian-living"],
    isFeatured: false,
    downloadCount: 67,
    viewCount: 145,
    status: "published",
    createdAt: "2024-01-12T18:30:00Z",
    updatedAt: "2024-01-12T18:30:00Z",
  },
]

const initialSeries: SermonSeries[] = [
  {
    id: "1",
    name: "Faith Journey",
    description: "A comprehensive series exploring different aspects of faith and spiritual growth",
    thumbnailUrl: "/placeholder.svg?height=150&width=200",
    sermonCount: 8,
    startDate: "2024-01-01",
    endDate: "2024-02-28",
  },
  {
    id: "2",
    name: "Spiritual Disciplines",
    description: "Learning the foundational practices that strengthen our relationship with God",
    thumbnailUrl: "/placeholder.svg?height=150&width=200",
    sermonCount: 6,
    startDate: "2024-01-07",
  },
]

export default function SermonsArchiveManagement() {
  const [sermons, setSermons] = useState<Sermon[]>(initialSermons)
  const [series, setSeries] = useState<SermonSeries[]>(initialSeries)
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null)
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<Sermon>>({})
  const [activeTab, setActiveTab] = useState("sermons")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("sunday-service")
  const [seriesFilter, setSeriesFilter] = useState<string>("all")
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null)
  const [selectedAudioFile, setSelectedAudioFile] = useState<File | null>(null)
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null)
  const [isSermonModalOpen, setIsSermonModalOpen] = useState(false)

  const handleCreateSermon = () => {
    setIsCreating(true)
    setEditingSermon(null)
    setFormData({
      title: "",
      description: "",
      speaker: "",
      date: "",
      series: "",
      scriptureReference: "",
      category: "sunday-service",
      tags: [],
      isFeatured: false,
      status: "draft",
    })
    setIsSermonModalOpen(true)
  }

  const handleEditSermon = (sermon: Sermon) => {
    setEditingSermon(sermon)
    setIsCreating(false)
    setFormData(sermon)
    setIsSermonModalOpen(true)
  }

  const handleSaveSermon = () => {
    if (isCreating) {
      const newSermon: Sermon = {
        ...formData,
        id: Date.now().toString(),
        tags: formData.tags || [],
        downloadCount: 0,
        viewCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        videoUrl: selectedVideoFile ? URL.createObjectURL(selectedVideoFile) : undefined,
        audioUrl: selectedAudioFile ? URL.createObjectURL(selectedAudioFile) : undefined,
        thumbnailUrl: selectedThumbnail ? URL.createObjectURL(selectedThumbnail) : undefined,
      } as Sermon
      setSermons([...sermons, newSermon])
    } else if (editingSermon) {
      setSermons(
        sermons.map((sermon) =>
          sermon.id === editingSermon.id
            ? ({
                ...formData,
                id: editingSermon.id,
                updatedAt: new Date().toISOString(),
                videoUrl: selectedVideoFile ? URL.createObjectURL(selectedVideoFile) : sermon.videoUrl,
                audioUrl: selectedAudioFile ? URL.createObjectURL(selectedAudioFile) : sermon.audioUrl,
                thumbnailUrl: selectedThumbnail ? URL.createObjectURL(selectedThumbnail) : sermon.thumbnailUrl,
              } as Sermon)
            : sermon,
        ),
      )
    }
    handleCancel()
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingSermon(null)
    setFormData({})
    setSelectedVideoFile(null)
    setSelectedAudioFile(null)
    setSelectedThumbnail(null)
    setIsSermonModalOpen(false)
  }

  const handleDeleteSermon = (id: string) => {
    if (confirm("Are you sure you want to delete this sermon?")) {
      setSermons(sermons.filter((sermon) => sermon.id !== id))
    }
  }

  const toggleFeatured = (id: string) => {
    setSermons(
      sermons.map((sermon) =>
        sermon.id === id ? { ...sermon, isFeatured: !sermon.isFeatured, updatedAt: new Date().toISOString() } : sermon,
      ),
    )
  }

  const addTag = (tag: string) => {
    if (tag && !formData.tags?.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tag],
      })
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((tag) => tag !== tagToRemove) || [],
    })
  }

  const filteredSermons = sermons.filter((sermon) => {
    const matchesSearch =
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || sermon.category === categoryFilter
    const matchesSeries = seriesFilter === "all" || sermon.series === seriesFilter
    return matchesSearch && matchesCategory && matchesSeries
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "sunday-service":
        return "bg-blue-100 text-blue-800"
      case "bible-study":
        return "bg-green-100 text-green-800"
      case "special-event":
        return "bg-purple-100 text-purple-800"
      case "youth":
        return "bg-orange-100 text-orange-800"
      case "womens":
        return "bg-pink-100 text-pink-800"
      case "mens":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "default"
      case "draft":
        return "secondary"
      case "archived":
        return "outline"
      default:
        return "outline"
    }
  }

  const stats = {
    total: sermons.length,
    published: sermons.filter((s) => s.status === "published").length,
    draft: sermons.filter((s) => s.status === "draft").length,
    featured: sermons.filter((s) => s.isFeatured).length,
    totalViews: sermons.reduce((sum, s) => sum + s.viewCount, 0),
    totalDownloads: sermons.reduce((sum, s) => sum + s.downloadCount, 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Sermons Archive Management</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Upload and manage sermon videos and audio files
          </p>
        </div>
        <Button onClick={handleCreateSermon} className="flex items-center gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Add Sermon
        </Button>
      </div>

      {/* Stats Cards */}
       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Total Sermons</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Published</p>
                <p className="text-2xl font-bold">{stats.published}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Edit className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Draft</p>
                <p className="text-2xl font-bold">{stats.draft}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-accent" />
              <div>
                <p className="text-sm font-medium">Featured</p>
                <p className="text-2xl font-bold">{stats.featured}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm font-medium">Total Views</p>
              <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm font-medium">Downloads</p>
              <p className="text-2xl font-bold">{stats.totalDownloads.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isSermonModalOpen} onOpenChange={setIsSermonModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              {isCreating ? "Add New Sermon" : "Edit Sermon"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Sermon Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter sermon title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="speaker">Speaker</Label>
                <Input
                  id="speaker"
                  value={formData.speaker}
                  onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                  placeholder="Enter speaker name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter sermon description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: Sermon["category"]) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunday-service">Sunday Service</SelectItem>
                    <SelectItem value="bible-study">Bible Study</SelectItem>
                    <SelectItem value="special-event">Special Event</SelectItem>
                    <SelectItem value="youth">Youth</SelectItem>
                    <SelectItem value="womens">Women's Ministry</SelectItem>
                    <SelectItem value="mens">Men's Ministry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: Sermon["status"]) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="series">Series (Optional)</Label>
                <Select
                  value={formData.series || "none"}
                  onValueChange={(value) => setFormData({ ...formData, series: value === "none" ? "" : value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select series" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Series</SelectItem>
                    {series.map((s) => (
                      <SelectItem key={s.id} value={s.name}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scriptureReference">Scripture Reference</Label>
                <Input
                  id="scriptureReference"
                  value={formData.scriptureReference}
                  onChange={(e) => setFormData({ ...formData, scriptureReference: e.target.value })}
                  placeholder="e.g., John 3:16"
                />
              </div>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="video">Video File</Label>
                <Input
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setSelectedVideoFile(e.target.files?.[0] || null)}
                />
                {selectedVideoFile && (
                  <p className="text-sm text-muted-foreground">Selected: {selectedVideoFile.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="audio">Audio File</Label>
                <Input
                  id="audio"
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setSelectedAudioFile(e.target.files?.[0] || null)}
                />
                {selectedAudioFile && (
                  <p className="text-sm text-muted-foreground">Selected: {selectedAudioFile.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedThumbnail(e.target.files?.[0] || null)}
                />
                {selectedThumbnail && (
                  <p className="text-sm text-muted-foreground">Selected: {selectedThumbnail.name}</p>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1 text-xs">
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tag"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTag((e.target as HTMLInputElement).value)
                      ;(e.target as HTMLInputElement).value = ""
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="isFeatured">Featured Sermon</Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSaveSermon} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Sermon
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="sermons">Sermons</TabsTrigger>
          <TabsTrigger value="series">Series</TabsTrigger>
        </TabsList>

        <TabsContent value="sermons" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search sermons..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="sunday-service">Sunday Service</SelectItem>
                    <SelectItem value="bible-study">Bible Study</SelectItem>
                    <SelectItem value="special-event">Special Event</SelectItem>
                    <SelectItem value="youth">Youth</SelectItem>
                    <SelectItem value="womens">Women's Ministry</SelectItem>
                    <SelectItem value="mens">Men's Ministry</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={seriesFilter} onValueChange={setSeriesFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Series" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Series</SelectItem>
                    {series.map((s) => (
                      <SelectItem key={s.id} value={s.name}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Sermons List */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSermons.map((sermon) => (
              <Card key={sermon.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{sermon.title}</h3>
                          {sermon.isFeatured && (
                            <Badge className="bg-yellow-500">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getCategoryColor(sermon.category)}>
                            {sermon.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Badge>
                          <Badge variant={getStatusColor(sermon.status) as any}>
                            {sermon.status.charAt(0).toUpperCase() + sermon.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleFeatured(sermon.id)}
                          className={sermon.isFeatured ? "bg-yellow-100" : ""}
                        >
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditSermon(sermon)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteSermon(sermon.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {sermon.thumbnailUrl && (
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <img
                          src={sermon.thumbnailUrl || "/placeholder.svg"}
                          alt={sermon.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{sermon.speaker}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(sermon.date).toLocaleDateString()}</span>
                        </div>
                        {sermon.duration && (
                          <div className="flex items-center gap-1">
                            <Play className="h-4 w-4" />
                            <span>{sermon.duration}</span>
                          </div>
                        )}
                      </div>
                      {sermon.series && (
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>Series: {sermon.series}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Scripture:</span>
                        <span>{sermon.scriptureReference}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{sermon.description}</p>

                    <div className="flex flex-wrap gap-1">
                      {sermon.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {sermon.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{sermon.tags.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex gap-4">
                        <span>{sermon.viewCount} views</span>
                        <span>{sermon.downloadCount} downloads</span>
                      </div>
                      <div className="flex gap-2">
                        {sermon.videoUrl && <Video className="h-4 w-4" />}
                        {sermon.audioUrl && <Music className="h-4 w-4" />}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSermons.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No sermons found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="series" className="space-y-6">
          {/* Series Management */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {series.map((s) => (
              <Card key={s.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg">{s.name}</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {s.thumbnailUrl && (
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <img
                          src={s.thumbnailUrl || "/placeholder.svg"}
                          alt={s.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground">{s.description}</p>

                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>
                        <strong>Sermons:</strong> {s.sermonCount}
                      </p>
                      <p>
                        <strong>Started:</strong> {new Date(s.startDate).toLocaleDateString()}
                      </p>
                      {s.endDate && (
                        <p>
                          <strong>Ended:</strong> {new Date(s.endDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
