"use client"

import { useState, useEffect, useMemo } from "react"
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore"
import { db } from "../../../../lib/firebase"
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import {
  Trash2,
  Edit,
  Eye,
  UploadCloud,
  Loader2,
  Star,
  Play,
  Download,
  EyeOff,
} from "lucide-react"

interface Sermon {
  id?: string
  title: string
  speaker: string
  description: string
  category: string
  series: string
  date: string
  status: string // "active" | "archived" | "draft" | "published"
  audioUrl: string
  videoUrl: string
  thumbnailUrl: string
  scriptureReference: string[] // single item ok
  tags: string[]
  duration: string
  isFeatured: boolean
  downloadCount: number
  viewCount: number
  createdAt?: any
  updatedAt?: any
}

export default function SermonManager() {
  // data
  const [sermons, setSermons] = useState<Sermon[]>([])
  const [loading, setLoading] = useState(true)

  // form & UI
  const [uploading, setUploading] = useState(false)
  const [editingSermonId, setEditingSermonId] = useState<string | null>(null)
  const [tabsValue, setTabsValue] = useState<string>("sermons")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterSeries, setFilterSeries] = useState<string>("all")
  const [search, setSearch] = useState<string>("")
  const [previewSermon, setPreviewSermon] = useState<Sermon | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const [formData, setFormData] = useState<Sermon>({
    title: "",
    speaker: "",
    description: "",
    category: "",
    series: "",
    date: "",
    status: "published",
    audioUrl: "",
    videoUrl: "",
    thumbnailUrl: "",
    scriptureReference: [""],
    tags: [""],
    duration: "",
    isFeatured: false,
    downloadCount: 0,
    viewCount: 0,
  })

  // --- Real-time Firestore listener ---
  useEffect(() => {
    const q = collection(db, "sermon")
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Sermon))
      setSermons(data)
      setLoading(false)
    }, (err) => {
      console.error("onSnapshot error:", err)
      toast.error("Failed to load sermons")
      setLoading(false)
    })

    return () => unsub()
  }, [])

  // --- helpers ---
  const formatDate = (isoOrString?: string) => {
    if (!isoOrString) return ""
    try {
      const d = new Date(isoOrString)
      if (isNaN(d.getTime())) return isoOrString
      return d.toLocaleDateString()
    } catch {
      return isoOrString
    }
  }

  const placeholderThumbnail =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'%3E%3Crect width='100%25' height='100%25' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial' font-size='28'%3EThumbnail%3C/text%3E%3C/svg%3E"

  // compute stats
  const stats = useMemo(() => {
    const total = sermons.length
    const published = sermons.filter((s) => s.status === "published" || s.status === "active").length
    const draft = sermons.filter((s) => s.status === "draft").length
    const featured = sermons.filter((s) => s.isFeatured).length
    const totalViews = sermons.reduce((a, b) => a + (b.viewCount || 0), 0)
    const totalDownloads = sermons.reduce((a, b) => a + (b.downloadCount || 0), 0)
    // get unique series for filter dropdown
    const seriesList = Array.from(new Set(sermons.map((s) => s.series).filter(Boolean)))
    return { total, published, draft, featured, totalViews, totalDownloads, seriesList }
  }, [sermons])

  // filtered list (search, category, series)
  const filteredSermons = useMemo(() => {
    return sermons.filter((s) => {
      if (filterCategory !== "all" && s.category !== filterCategory) return false
      if (filterSeries !== "all" && s.series !== filterSeries) return false
      if (search && !(
          (s.title || "").toLowerCase().includes(search.toLowerCase()) ||
          (s.description || "").toLowerCase().includes(search.toLowerCase()) ||
          (s.tags || []).join(" ").toLowerCase().includes(search.toLowerCase()) ||
          (s.series || "").toLowerCase().includes(search.toLowerCase())
        )) return false
      return true
    })
  }, [sermons, filterCategory, filterSeries, search])

  // --- form handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => setFormData((prev) => ({ ...prev, category: value }))
  const handleStatusChange = (value: string) => setFormData((prev) => ({ ...prev, status: value }))

  // Cloudinary upload (audio/video/image)
  const handleCloudinaryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "audioUrl" | "videoUrl" | "thumbnailUrl"
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

    if (!cloudName || !uploadPreset) {
      toast.error("Cloudinary environment variables not set")
      setUploading(false)
      return
    }

    const fd = new FormData()
    fd.append("file", file)
    fd.append("upload_preset", uploadPreset)

    // optional: set resource_type based on file type (auto Cloudinary)
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: fd,
      })
      const data = await res.json()
      if (data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          [type]: data.secure_url,
          // enforce rule: if audio uploaded, clear video and vice versa
          ...(type === "audioUrl" ? { videoUrl: "" } : {}),
          ...(type === "videoUrl" ? { audioUrl: "" } : {}),
        }))
        toast.success(`${type.replace("Url", "")} uploaded`)
      } else {
        console.error("Cloudinary response error:", data)
        toast.error("Upload failed")
      }
    } catch (err) {
      console.error("Upload error:", err)
      toast.error("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  // Save sermon (add or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.speaker) {
      toast.error("Title and Speaker required")
      return
    }

    // Validation: must have exactly one of audioUrl | videoUrl
    const hasAudio = !!formData.audioUrl
    const hasVideo = !!formData.videoUrl
    if ((!hasAudio && !hasVideo) || (hasAudio && hasVideo)) {
      toast.error("Provide either audio OR video (one required, not both)")
      return
    }

    try {
      if (editingSermonId) {
        await updateDoc(doc(db, "sermon", editingSermonId), {
          ...formData,
          updatedAt: serverTimestamp(),
        })
        toast.success("Sermon updated")
      } else {
        await addDoc(collection(db, "sermon"), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
        toast.success("Sermon added")
      }

      // clear form & go to sermons tab
      setFormData({
        title: "",
        speaker: "",
        description: "",
        category: "",
        series: "",
        date: "",
        status: "published",
        audioUrl: "",
        videoUrl: "",
        thumbnailUrl: "",
        scriptureReference: [""],
        tags: [""],
        duration: "",
        isFeatured: false,
        downloadCount: 0,
        viewCount: 0,
      })
      setEditingSermonId(null)
      setTabsValue("sermons")
    } catch (err) {
      console.error("Save error:", err)
      toast.error("Failed to save sermon")
    }
  }

  // Edit action — load form and switch tab
  const handleEdit = (sermon: Sermon) => {
    setFormData(sermon)
    setEditingSermonId(sermon.id || null)
    setTabsValue("add")
    toast("Edit mode activated")
  }

  // delete with confirmation
  const confirmDelete = (id: string) => setConfirmDeleteId(id)

  const handleDelete = async () => {
    if (!confirmDeleteId) return
    try {
      await deleteDoc(doc(db, "sermon", confirmDeleteId))
      toast.success("Deleted")
    } catch (err) {
      console.error("Delete error:", err)
      toast.error("Failed to delete")
    } finally {
      setConfirmDeleteId(null)
    }
  }

  // small UI helpers for icons/text
  const IconSmall = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center gap-2 text-sm">{children}</span>
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header + toolbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Sermons Archive Management</h1>
          <p className="text-sm text-muted-foreground">Upload and manage sermon videos and audio files</p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => { setTabsValue("add"); setEditingSermonId(null); setFormData({
            title: "",
            speaker: "",
            description: "",
            category: "",
            series: "",
            date: "",
            status: "published",
            audioUrl: "",
            videoUrl: "",
            thumbnailUrl: "",
            scriptureReference: [""],
            tags: [""],
            duration: "",
            isFeatured: false,
            downloadCount: 0,
            viewCount: 0,
          })}}>
            + Add Sermon
          </Button>
        </div>
      </div>

      {/* Stats toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card><CardContent className="flex flex-col items-start gap-2"><div className="text-xs text-muted-foreground">Total Sermons</div><div className="text-lg font-semibold">{stats.total}</div></CardContent></Card>
        <Card><CardContent className="flex flex-col items-start gap-2"><div className="text-xs text-muted-foreground">Published</div><div className="text-lg font-semibold">{stats.published}</div></CardContent></Card>
        <Card><CardContent className="flex flex-col items-start gap-2"><div className="text-xs text-muted-foreground">Draft</div><div className="text-lg font-semibold">{stats.draft}</div></CardContent></Card>
        <Card><CardContent className="flex flex-col items-start gap-2"><div className="text-xs text-muted-foreground">Featured</div><div className="text-lg font-semibold">{stats.featured}</div></CardContent></Card>
        <Card><CardContent className="flex flex-col items-start gap-2"><div className="text-xs text-muted-foreground">Total Views</div><div className="text-lg font-semibold">{stats.totalViews}</div></CardContent></Card>
        <Card><CardContent className="flex flex-col items-start gap-2"><div className="text-xs text-muted-foreground">Downloads</div><div className="text-lg font-semibold">{stats.totalDownloads}</div></CardContent></Card>
      </div>

      {/* Search & filters */}
      <div className="bg-muted/50 rounded-md p-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="flex-1">
            <Input placeholder="Search sermons..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="flex gap-3">
            <Select onValueChange={(v) => setFilterCategory(v)} value={filterCategory}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="All Categories" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="sunday-service">Sunday Service</SelectItem>
                <SelectItem value="bible-study">Bible Study</SelectItem>
                <SelectItem value="special-event">Special Event</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(v) => setFilterSeries(v)} value={filterSeries}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="All Series" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Series</SelectItem>
                {stats.seriesList.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Tabs: Sermons | Add */}
      <Tabs value={tabsValue} onValueChange={(v) => setTabsValue(v)} className="space-y-6">
        <TabsList className="grid grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="sermons">Sermons</TabsTrigger>
          <TabsTrigger value="add">{editingSermonId ? "Edit Sermon" : "Add Sermon"}</TabsTrigger>
        </TabsList>

        {/* Sermons list */}
        <TabsContent value="sermons">
          {loading ? (
            <p>Loading…</p>
          ) : filteredSermons.length === 0 ? (
            <p className="text-muted-foreground">No sermons found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSermons.map((s) => (
                <Card key={s.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={s.thumbnailUrl || placeholderThumbnail}
                      alt={s.title}
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button className="p-1 rounded bg-white/90" onClick={() => setPreviewSermon(s)} title="Preview">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 rounded bg-white/90" onClick={() => handleEdit(s)} title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 rounded bg-white/90" onClick={() => confirmDelete(s.id!)} title="Delete">
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </div>

                  <CardContent>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-semibold">{s.title}</h3>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <span>{s.speaker}</span> • <span>{formatDate(s.date)}</span> • <span>{s.duration || "—"}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        {s.isFeatured && <Badge variant="secondary" className="bg-yellow-400 text-black"><Star size={12} /></Badge>}
                        <Badge>{s.category || "Uncategorized"}</Badge>
                        <Badge className="bg-orange-500 text-white">{s.status}</Badge>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{s.description}</p>

                    <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        {(s.tags || []).filter(Boolean).slice(0, 3).map((t, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-muted/70 rounded-full">{t}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1"><Eye size={14} /> <span className="text-xs">{s.viewCount || 0}</span></div>
                        <div className="flex items-center gap-1"><Download size={14} /> <span className="text-xs">{s.downloadCount || 0}</span></div>
                        <div className="text-muted-foreground">{s.audioUrl ? <span title="Audio available"><Play size={14} /></span> : s.videoUrl ? <span title="Video available"><Play size={14} /></span> : <EyeOff size={14} />}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Add / Edit form */}
        <TabsContent value="add">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>{editingSermonId ? "Edit Sermon" : "Add New Sermon"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" />
                </div>

                <div>
                  <Label>Speaker</Label>
                  <Input name="speaker" value={formData.speaker} onChange={handleChange} placeholder="Enter speaker" />
                </div>

                <div>
                  <Label>Series</Label>
                  <Input name="series" value={formData.series} onChange={handleChange} placeholder="Series (optional)" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label>Date</Label>
                    <Input type="date" name="date" value={formData.date} onChange={handleChange} />
                  </div>
                  <div>
                    <Label>Duration (e.g. 45:30)</Label>
                    <Input name="duration" value={formData.duration} onChange={handleChange} />
                  </div>
                  <div>
                    <Label>Featured</Label>
                    <Select value={formData.isFeatured ? "true" : "false"} onValueChange={(v) => setFormData((p) => ({ ...p, isFeatured: v === "true" }))}>
                      <SelectTrigger><SelectValue placeholder="Featured?" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="false">No</SelectItem>
                        <SelectItem value="true">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Brief description" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label>Category</Label>
                    <Select value={formData.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sunday-service">Sunday Service</SelectItem>
                        <SelectItem value="bible-study">Bible Study</SelectItem>
                        <SelectItem value="special-event">Special Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Status</Label>
                    <Select value={formData.status} onValueChange={handleStatusChange}>
                      <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Scripture (comma separated)</Label>
                    <Input name="scriptureReference" value={formData.scriptureReference?.join(", ")} onChange={(e) => setFormData((p) => ({ ...p, scriptureReference: e.target.value.split(",").map(x => x.trim()) }))} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label>Upload Audio</Label>
                    <Input type="file" accept="audio/*" onChange={(e) => handleCloudinaryUpload(e, "audioUrl")} />
                    {formData.audioUrl && <p className="text-xs text-muted-foreground mt-1 truncate">Audio ready</p>}
                  </div>

                  <div>
                    <Label>Upload Video</Label>
                    <Input type="file" accept="video/*" onChange={(e) => handleCloudinaryUpload(e, "videoUrl")} />
                    {formData.videoUrl && <p className="text-xs text-muted-foreground mt-1 truncate">Video ready</p>}
                  </div>

                  <div>
                    <Label>Upload Thumbnail</Label>
                    <Input type="file" accept="image/*" onChange={(e) => handleCloudinaryUpload(e, "thumbnailUrl")} />
                    {formData.thumbnailUrl && <p className="text-xs text-muted-foreground mt-1 truncate">Thumbnail ready</p>}
                  </div>
                </div>

                {uploading && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="animate-spin w-4 h-4" />
                    Uploading...
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button type="submit" disabled={uploading}>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    {editingSermonId ? "Update Sermon" : "Add Sermon"}
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setFormData({
                      title: "",
                      speaker: "",
                      description: "",
                      category: "",
                      series: "",
                      date: "",
                      status: "published",
                      audioUrl: "",
                      videoUrl: "",
                      thumbnailUrl: "",
                      scriptureReference: [""],
                      tags: [""],
                      duration: "",
                      isFeatured: false,
                      downloadCount: 0,
                      viewCount: 0,
                    })
                    setEditingSermonId(null)
                    setTabsValue("sermons")
                  }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview dialog */}
      <Dialog open={!!previewSermon} onOpenChange={() => setPreviewSermon(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{previewSermon?.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex gap-4">
              <img src={previewSermon?.thumbnailUrl || placeholderThumbnail} alt="thumbnail" className="w-48 h-28 object-cover rounded" />
              <div>
                <p className="text-sm"><strong>Speaker:</strong> {previewSermon?.speaker}</p>
                <p className="text-sm"><strong>Series:</strong> {previewSermon?.series}</p>
                <p className="text-sm"><strong>Category:</strong> {previewSermon?.category}</p>
                <p className="text-sm"><strong>Date:</strong> {formatDate(previewSermon?.date)}</p>
                <p className="text-sm"><strong>Duration:</strong> {previewSermon?.duration || "—"}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">{previewSermon?.description}</p>

            {previewSermon?.audioUrl && (
              <audio controls className="w-full">
                <source src={previewSermon.audioUrl} />
                Your browser does not support the audio element.
              </audio>
            )}

            {previewSermon?.videoUrl && (
              <video controls className="w-full rounded">
                <source src={previewSermon.videoUrl} />
                Your browser does not support the video tag.
              </video>
            )}

            <div className="flex items-center gap-3">
              {(previewSermon?.tags || []).filter(Boolean).map((t, i) => (
                <Badge key={i}>{t}</Badge>
              ))}
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Eye size={16} /> {previewSermon?.viewCount || 0}</div>
              <div className="flex items-center gap-2"><Download size={16} /> {previewSermon?.downloadCount || 0}</div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setPreviewSermon(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm dialog */}
      <Dialog open={!!confirmDeleteId} onOpenChange={() => setConfirmDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this sermon? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
