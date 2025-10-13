"use client"

import { useEffect, useState } from "react"
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Calendar,
  Plus,
  Edit,
  Trash2,
  Save,
  Image as ImageIcon,
} from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import { db } from "../../../../lib/firebase"

interface ChurchEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  endTime?: string
  location: string
  category:
    | "worship"
    | "youth"
    | "community"
    | "outreach"
    | "special"
    | "ministry"
  capacity?: number
  registrationRequired: boolean
  contactEmail?: string
  contactPhone?: string
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  featuredImage: string
  createdAt?: any
  updatedAt?: any
}

export default function EventsManagement() {
  const [events, setEvents] = useState<ChurchEvent[]>([])
  const [editingEvent, setEditingEvent] = useState<ChurchEvent | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<ChurchEvent>>({})
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)

  // ✅ Correct Firestore collection name
  const eventsCollection = collection(db, "churchEvent")

  // ✅ Fetch Events
  const fetchEvents = async () => {
    setLoading(true)
    try {
      const snapshot = await getDocs(eventsCollection)
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as ChurchEvent[]
      setEvents(data)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load events.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  // ✅ Cloudinary Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    ) {
      toast.error("Cloudinary is not configured.")
      return
    }

    const formDataCloud = new FormData()
    formDataCloud.append("file", file)
    formDataCloud.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    )

    try {
      setUploading(true)
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formDataCloud }
      )
      const data = await res.json()
      if (data.secure_url) {
        setFormData({ ...formData, featuredImage: data.secure_url })
        toast.success("Image uploaded successfully!")
      } else {
        toast.error("Failed to upload image.")
      }
    } catch {
      toast.error("Error uploading image.")
    } finally {
      setUploading(false)
    }
  }

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
      featuredImage: "",
    })
    setIsEventModalOpen(true)
  }

  const handleEditEvent = (event: ChurchEvent) => {
    setEditingEvent(event)
    setIsCreating(false)
    setFormData(event)
    setIsEventModalOpen(true)
  }

  // ✅ Save to Firestore
  const handleSaveEvent = async () => {
    if (!formData.title || !formData.date || !formData.featuredImage) {
      toast.error("Please fill all required fields.")
      return
    }

    try {
      if (isCreating) {
        await addDoc(eventsCollection, {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
        toast.success("Event created successfully!")
      } else if (editingEvent) {
        const ref = doc(db, "churchEvent", editingEvent.id)
        await updateDoc(ref, {
          ...formData,
          updatedAt: serverTimestamp(),
        })
        toast.success("Event updated successfully!")
      }
      await fetchEvents()
      handleCancel()
    } catch (err) {
      console.error(err)
      toast.error("Error saving event.")
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingEvent(null)
    setFormData({})
    setIsEventModalOpen(false)
  }

  // ✅ Delete
  const handleDeleteEvent = (id: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p>Are you sure you want to delete this event?</p>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={async () => {
                try {
                  const ref = doc(db, "churchEvent", id)
                  await deleteDoc(ref)
                  await fetchEvents()
                  toast.success("Event deleted.")
                } catch (err) {
                  toast.error("Error deleting event.")
                } finally {
                  toast.dismiss(t.id)
                }
              }}
            >
              Yes, Delete
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ),
      { duration: 4000 }
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
      <Toaster position="top-right" />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Church Events Management
          </h2>
          <p className="text-muted-foreground">
            Manage church events connected to Firestore
          </p>
        </div>
        <Button onClick={handleCreateEvent} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Create Event
        </Button>
      </div>

      {/* Modal */}
      <Dialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {isCreating ? "Create New Event" : "Edit Event"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Title */}
            <div>
              <Label>Event Title</Label>
              <Input
                placeholder="Enter event title"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            {/* Category & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) =>
                    setFormData({
                      ...formData,
                      category: v as ChurchEvent["category"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "worship",
                      "youth",
                      "community",
                      "outreach",
                      "special",
                      "ministry",
                    ].map((c) => (
                      <SelectItem key={c} value={c}>
                        {c[0].toUpperCase() + c.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  placeholder="Location"
                  value={formData.location || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Date, Time, Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                type="date"
                value={formData.date || ""}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
              <Input
                type="time"
                value={formData.time || ""}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
              <Input
                type="time"
                value={formData.endTime || ""}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Capacity"
                value={formData.capacity || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    capacity: Number(e.target.value),
                  })
                }
              />
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="email"
                placeholder="Contact Email"
                value={formData.contactEmail || ""}
                onChange={(e) =>
                  setFormData({ ...formData, contactEmail: e.target.value })
                }
              />
              <Input
                type="tel"
                placeholder="Contact Phone"
                value={formData.contactPhone || ""}
                onChange={(e) =>
                  setFormData({ ...formData, contactPhone: e.target.value })
                }
              />
            </div>

            {/* Registration Required */}
            <div className="flex items-center gap-2">
              <input
                id="registrationRequired"
                type="checkbox"
                checked={formData.registrationRequired || false}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registrationRequired: e.target.checked,
                  })
                }
              />
              <Label htmlFor="registrationRequired">
                Registration Required
              </Label>
            </div>

            {/* Image Upload */}
            <div>
              <Label className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> Featured Image
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              {formData.featuredImage && (
                <img
                  src={formData.featuredImage}
                  alt="Preview"
                  className="mt-2 h-40 w-full object-cover rounded-md"
                />
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <Button onClick={handleSaveEvent} disabled={uploading}>
                <Save className="h-4 w-4" /> Save
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event List */}
      <Tabs defaultValue="events">
        <TabsList>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="events" className="space-y-6">
          {loading ? (
            <p>Loading events...</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {event.title || "Untitled Event"}
                        </h3>
                        <div className="flex gap-2">
                          <Badge className={getCategoryColor(event.category)}>
                            {event.category}
                          </Badge>
                          <Badge variant={getStatusColor(event.status) as any}>
                            {event.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditEvent(event)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {event.featuredImage && (
                      <img
                        src={event.featuredImage}
                        alt={event.title}
                        className="rounded-md h-48 w-full object-cover"
                      />
                    )}

                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      {event.date} • {event.time} - {event.endTime}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
