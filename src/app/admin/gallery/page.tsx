"use client"

import { useState, useEffect } from "react"
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore"
import { toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Upload, ImageIcon, Trash2, Star, RefreshCw } from "lucide-react"
import { db } from "../../../../lib/firebase"

interface EventPhoto {
  id: string
  url: string
  caption?: string
  uploadedAt: any // Firestore Timestamp
  isFeatured: boolean
}

export default function PhotoGalleryManager() {
  const [photos, setPhotos] = useState<EventPhoto[]>([])
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [replacingId, setReplacingId] = useState<string | null>(null)

  const photoCollection = collection(db, "eventPhoto")

  // 🔹 Real-time Firestore sync (with proper timestamp handling)
  useEffect(() => {
    const unsubscribe = onSnapshot(photoCollection, (snapshot) => {
      const fetched: EventPhoto[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as EventPhoto[]

      setPhotos(
        fetched.sort(
          (a, b) =>
            (b.uploadedAt?.toMillis?.() || 0) - (a.uploadedAt?.toMillis?.() || 0)
        )
      )
    })
    return () => unsubscribe()
  }, [])

  // 🔹 Upload (new or replacement)
  const handleUpload = async () => {
    if (!selectedFiles) {
      toast.error("Please select at least one image.")
      return
    }

    setIsUploading(true)
    try {
      for (const file of Array.from(selectedFiles)) {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "")
        formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "")

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        )

        const data = await res.json()
        if (!res.ok) throw new Error(data.error?.message || "Cloudinary upload failed")

        if (replacingId) {
          const docRef = doc(db, "eventPhoto", replacingId)
          await updateDoc(docRef, {
            url: data.secure_url,
            updatedAt: serverTimestamp(),
          })
          toast.success("Photo updated successfully!")
          setReplacingId(null)
        } else {
          await addDoc(photoCollection, {
            url: data.secure_url,
            caption: "",
            isFeatured: false,
            uploadedAt: serverTimestamp(),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          })
          toast.success("Photo uploaded successfully!")
        }
      }

      setSelectedFiles(null)
      setIsDialogOpen(false)
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || "Upload failed.")
    } finally {
      setIsUploading(false)
    }
  }

  // 🔹 Delete photo
  const handleDelete = async (id: string) => {
    if (confirm("Delete this photo?")) {
      await deleteDoc(doc(db, "eventPhoto", id))
      toast.success("Photo deleted successfully.")
    }
  }

  // 🔹 Toggle featured
  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    const docRef = doc(db, "eventPhoto", id)
    await updateDoc(docRef, {
      isFeatured: !currentStatus,
      updatedAt: serverTimestamp(),
    })
    toast.success("Featured status updated.")
  }

  // 🔹 Update caption (onBlur instead of onChange)
  const updateCaption = async (id: string, caption: string) => {
    const docRef = doc(db, "eventPhoto", id)
    await updateDoc(docRef, { caption, updatedAt: serverTimestamp() })
  }

  // 🔹 Start replacing a specific image
  const handleReplaceClick = (id: string) => {
    setReplacingId(id)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Gallery Management</h2>
        <p className="text-muted-foreground">Upload, update, and manage event photos</p>
      </div>

      {/* Upload Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            {replacingId ? "Replace Photo" : "Upload Photos"}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{replacingId ? "Replace Existing Photo" : "Upload New Photos"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="photos">Select Images</Label>
              <Input
                id="photos"
                type="file"
                multiple={!replacingId}
                accept="image/*"
                onChange={(e) => setSelectedFiles(e.target.files)}
              />
            </div>
            {selectedFiles && (
              <p className="text-sm text-muted-foreground">
                {selectedFiles.length} file{selectedFiles.length !== 1 ? "s" : ""} selected
              </p>
            )}
            <div className="flex gap-2">
              <Button
                onClick={handleUpload}
                disabled={!selectedFiles || isUploading}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                {isUploading ? "Uploading..." : replacingId ? "Replace" : "Upload"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false)
                  setReplacingId(null)
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Photo Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <Card key={photo.id}>
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2 text-base">
                  <ImageIcon className="h-4 w-4" />
                  Uploaded Photo
                </CardTitle>
                {photo.isFeatured && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-yellow-500">Featured</Badge>
                  </div>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="relative">
                  <img
                    src={photo.url}
                    alt={photo.caption || "Uploaded photo"}
                    className="w-full h-56 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => toggleFeatured(photo.id, photo.isFeatured)}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => handleReplaceClick(photo.id)}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(photo.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`caption-${photo.id}`}>Caption</Label>
                  <Input
                    id={`caption-${photo.id}`}
                    placeholder="Add a caption..."
                    defaultValue={photo.caption || ""}
                    onBlur={(e) => updateCaption(photo.id, e.target.value)}
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  Uploaded:{" "}
                  {photo.uploadedAt
                    ? new Date(photo.uploadedAt.toMillis()).toLocaleString()
                    : "—"}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No photos uploaded yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
