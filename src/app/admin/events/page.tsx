"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Plus, Edit, Trash2, Save, Upload, ImageIcon, MapPin, Clock, Users, Star, Eye } from "lucide-react"

interface ChurchEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  endTime?: string
  location: string
  category: "worship" | "youth" | "community" | "outreach" | "special" | "ministry"
  capacity?: number
  registrationRequired: boolean
  contactEmail?: string
  contactPhone?: string
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  featuredImage?: string
  gallery: EventPhoto[]
  createdAt: string
  updatedAt: string
}

interface EventPhoto {
  id: string
  url: string
  caption?: string
  uploadedAt: string
  isFeatured: boolean
}

const initialEvents: ChurchEvent[] = [
  {
    id: "1",
    title: "Sunday Worship Service",
    description: "Join us for our weekly worship service with inspiring music, prayer, and biblical teaching.",
    date: "2024-01-21",
    time: "10:00",
    endTime: "11:30",
    location: "Main Sanctuary",
    category: "worship",
    capacity: 300,
    registrationRequired: false,
    status: "upcoming",
    featuredImage: "/placeholder.svg?height=200&width=300",
    gallery: [
      {
        id: "p1",
        url: "/placeholder.svg?height=200&width=300",
        caption: "Worship team leading praise",
        uploadedAt: "2024-01-15T10:00:00Z",
        isFeatured: true,
      },
      {
        id: "p2",
        url: "/placeholder.svg?height=200&width=300",
        caption: "Congregation in worship",
        uploadedAt: "2024-01-15T10:05:00Z",
        isFeatured: false,
      },
    ],
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
  },
  {
    id: "2",
    title: "Youth Camp 2024",
    description: "A weekend retreat for teenagers focusing on faith, friendship, and fun activities.",
    date: "2024-02-15",
    time: "18:00",
    endTime: "12:00",
    location: "Mountain View Camp",
    category: "youth",
    capacity: 50,
    registrationRequired: true,
    contactEmail: "youth@church.com",
    contactPhone: "+1-555-0123",
    status: "upcoming",
    featuredImage: "/placeholder.svg?height=200&width=300",
    gallery: [
      {
        id: "p3",
        url: "/placeholder.svg?height=200&width=300",
        caption: "Camp games and activities",
        uploadedAt: "2024-01-12T15:00:00Z",
        isFeatured: false,
      },
      {
        id: "p4",
        url: "/placeholder.svg?height=200&width=300",
        caption: "Evening worship session",
        uploadedAt: "2024-01-12T15:05:00Z",
        isFeatured: false,
      },
    ],
    createdAt: "2024-01-08T11:00:00Z",
    updatedAt: "2024-01-12T16:20:00Z",
  },
  {
    id: "3",
    title: "Community Food Drive",
    description: "Help us collect food donations for local families in need. Every contribution makes a difference.",
    date: "2024-01-28",
    time: "09:00",
    endTime: "15:00",
    location: "Church Parking Lot",
    category: "outreach",
    registrationRequired: false,
    contactEmail: "outreach@church.com",
    status: "upcoming",
    featuredImage: "/placeholder.svg?height=200&width=300",
    gallery: [
      {
        id: "p5",
        url: "/placeholder.svg?height=200&width=300",
        caption: "Food donation collection",
        uploadedAt: "2024-01-14T12:00:00Z",
        isFeatured: false,
      },
    ],
    createdAt: "2024-01-05T14:00:00Z",
    updatedAt: "2024-01-14T12:30:00Z",
  },
]

export default function EventsGalleryManagement() {
  const [events, setEvents] = useState<ChurchEvent[]>(initialEvents)
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null)
  const [editingEvent, setEditingEvent] = useState<ChurchEvent | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<ChurchEvent>>({})
  const [activeTab, setActiveTab] = useState("events")
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
  const [selectedEventForPhotos, setSelectedEventForPhotos] = useState<string>("")

  const handleCreateEvent = () => {
    setIsCreating(true)
    setEditingEvent(null)
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      endTime: "",
      location: "",
      category: "worship",
      capacity: undefined,
      registrationRequired: false,
      contactEmail: "",
      contactPhone: "",
      status: "upcoming",
      gallery: [],
    })
    setIsEventModalOpen(true)
  }

  const handleEditEvent = (event: ChurchEvent) => {
    setEditingEvent(event)
    setIsCreating(false)
    setFormData(event)
    setIsEventModalOpen(true)
  }

  const handleSaveEvent = () => {
    if (isCreating) {
      const newEvent: ChurchEvent = {
        ...formData,
        id: Date.now().toString(),
        gallery: formData.gallery || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as ChurchEvent
      setEvents([...events, newEvent])
    } else if (editingEvent) {
      setEvents(
        events.map((event) =>
          event.id === editingEvent.id
            ? ({ ...formData, id: editingEvent.id, updatedAt: new Date().toISOString() } as ChurchEvent)
            : event,
        ),
      )
    }
    handleCancel()
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingEvent(null)
    setFormData({})
    setIsEventModalOpen(false)
  }

  const handleOpenPhotoModal = (eventId: string) => {
    setSelectedEventForPhotos(eventId)
    setIsPhotoModalOpen(true)
  }

  const handlePhotoUpload = () => {
    if (!selectedFiles || !selectedEventForPhotos) return

    const newPhotos: EventPhoto[] = Array.from(selectedFiles).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      caption: "",
      uploadedAt: new Date().toISOString(),
      isFeatured: false,
    }))

    setEvents(
      events.map((event) =>
        event.id === selectedEventForPhotos
          ? {
              ...event,
              gallery: [...event.gallery, ...newPhotos],
              updatedAt: new Date().toISOString(),
            }
          : event,
      ),
    )

    setSelectedFiles(null)
    setIsPhotoModalOpen(false)
    setSelectedEventForPhotos("")
  }

  const handleDeleteEvent = (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== id))
    }
  }

  const handleDeletePhoto = (eventId: string, photoId: string) => {
    if (confirm("Are you sure you want to delete this photo?")) {
      setEvents(
        events.map((event) =>
          event.id === eventId
            ? {
                ...event,
                gallery: event.gallery.filter((photo) => photo.id !== photoId),
                updatedAt: new Date().toISOString(),
              }
            : event,
        ),
      )
    }
  }

  const handleSetFeaturedPhoto = (eventId: string, photoId: string) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              gallery: event.gallery.map((photo) => ({
                ...photo,
                isFeatured: photo.id === photoId,
              })),
              featuredImage: event.gallery.find((photo) => photo.id === photoId)?.url,
              updatedAt: new Date().toISOString(),
            }
          : event,
      ),
    )
  }

  const updatePhotoCaption = (eventId: string, photoId: string, caption: string) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              gallery: event.gallery.map((photo) => (photo.id === photoId ? { ...photo, caption } : photo)),
              updatedAt: new Date().toISOString(),
            }
          : event,
      ),
    )
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "worship":
        return "bg-blue-100 text-blue-800"
      case "youth":
        return "bg-green-100 text-green-800"
      case "community":
        return "bg-purple-100 text-purple-800"
      case "outreach":
        return "bg-orange-100 text-orange-800"
      case "special":
        return "bg-red-100 text-red-800"
      case "ministry":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "default"
      case "ongoing":
        return "secondary"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Events & Gallery Management</h2>
          <p className="text-muted-foreground">Create events and manage photo galleries</p>
        </div>
        <Button onClick={handleCreateEvent} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </div>

      <Dialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {isCreating ? "Create New Event" : "Edit Event"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter event title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: ChurchEvent["category"]) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="worship">Worship</SelectItem>
                    <SelectItem value="youth">Youth</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="outreach">Outreach</SelectItem>
                    <SelectItem value="special">Special</SelectItem>
                    <SelectItem value="ministry">Ministry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter event description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <Label htmlFor="time">Start Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) || undefined })}
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter event location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: ChurchEvent["status"]) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="Optional contact email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="Optional contact phone"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="registrationRequired"
                checked={formData.registrationRequired}
                onChange={(e) => setFormData({ ...formData, registrationRequired: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="registrationRequired">Registration Required</Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSaveEvent} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Event
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isPhotoModalOpen} onOpenChange={setIsPhotoModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Photos
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="photos">Select Photos</Label>
              <Input
                id="photos"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setSelectedFiles(e.target.files)}
              />
            </div>
            {selectedFiles && (
              <p className="text-sm text-muted-foreground">
                Selected {selectedFiles.length} file{selectedFiles.length !== 1 ? "s" : ""}
              </p>
            )}
            <div className="flex gap-2">
              <Button onClick={handlePhotoUpload} disabled={!selectedFiles} className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Photos
              </Button>
              <Button variant="outline" onClick={() => setIsPhotoModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="gallery">Photo Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-6">
          {/* Events List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className={getCategoryColor(event.category)}>
                            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                          </Badge>
                          <Badge variant={getStatusColor(event.status) as any}>
                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {event.featuredImage && (
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <img
                          src={event.featuredImage || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {event.time}
                          {event.endTime && ` - ${event.endTime}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      {event.capacity && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>Capacity: {event.capacity}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{event.gallery.length} photos</span>
                      <span>Updated {new Date(event.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          {/* Gallery Management */}
          <div className="space-y-6">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      {event.title} Gallery
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleOpenPhotoModal(event.id)}>
                        <Upload className="h-3 w-3 mr-2" />
                        Upload Photos
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {event.gallery.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {event.gallery.map((photo) => (
                        <div key={photo.id} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden">
                            <img
                              src={photo.url || "/placeholder.svg"}
                              alt={photo.caption || "Event photo"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleSetFeaturedPhoto(event.id, photo.id)}
                              className={photo.isFeatured ? "bg-yellow-500" : ""}
                            >
                              <Star className="h-3 w-3" />
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="secondary">
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Photo</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <img
                                    src={photo.url || "/placeholder.svg"}
                                    alt={photo.caption || "Event photo"}
                                    className="w-full rounded-lg"
                                  />
                                  <div className="space-y-2">
                                    <Label htmlFor="caption">Caption</Label>
                                    <Input
                                      id="caption"
                                      value={photo.caption}
                                      onChange={(e) => updatePhotoCaption(event.id, photo.id, e.target.value)}
                                      placeholder="Add a caption..."
                                    />
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeletePhoto(event.id, photo.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          {photo.isFeatured && (
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-yellow-500">Featured</Badge>
                            </div>
                          )}
                          {photo.caption && (
                            <div className="absolute bottom-2 left-2 right-2">
                              <p className="text-xs text-white bg-black/70 p-1 rounded truncate">{photo.caption}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No photos uploaded yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
