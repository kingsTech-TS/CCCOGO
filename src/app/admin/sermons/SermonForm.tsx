"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Save } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

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

interface SermonFormProps {
  open: boolean
  onClose: () => void
  onSave: (sermon: Partial<Sermon>, video?: File | null, audio?: File | null, thumb?: File | null) => void
  editingSermon?: Sermon | null
  seriesList: { id: string; name: string }[]
}

export default function SermonForm({ open, onClose, onSave, editingSermon, seriesList }: SermonFormProps) {
  const [formData, setFormData] = useState<Partial<Sermon>>({})
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null)
  const [selectedAudioFile, setSelectedAudioFile] = useState<File | null>(null)
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null)

  useEffect(() => {
    if (editingSermon) {
      setFormData(editingSermon)
    } else {
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
    }
  }, [editingSermon])

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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>{editingSermon ? "Edit Sermon" : "Add New Sermon"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 max-h-[75vh] overflow-y-auto p-1">
          {/* Title / Speaker */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Sermon Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter sermon title"
              />
            </div>
            <div className="space-y-2">
              <Label>Speaker</Label>
              <Input
                value={formData.speaker}
                onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                placeholder="Enter speaker name"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter sermon description"
              rows={3}
            />
          </div>

          {/* Date / Category / Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
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
              <Label>Status</Label>
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

          {/* Series & Scripture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Series</Label>
              <Select
                value={formData.series || "none"}
                onValueChange={(value) => setFormData({ ...formData, series: value === "none" ? "" : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select series" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Series</SelectItem>
                  {seriesList.map((s) => (
                    <SelectItem key={s.id} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Scripture Reference</Label>
              <Input
                value={formData.scriptureReference}
                onChange={(e) => setFormData({ ...formData, scriptureReference: e.target.value })}
                placeholder="e.g., John 3:16"
              />
            </div>
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Video File</Label>
              <Input type="file" accept="video/*" onChange={(e) => setSelectedVideoFile(e.target.files?.[0] || null)} />
            </div>
            <div className="space-y-2">
              <Label>Audio File</Label>
              <Input type="file" accept="audio/*" onChange={(e) => setSelectedAudioFile(e.target.files?.[0] || null)} />
            </div>
            <div className="space-y-2">
              <Label>Thumbnail</Label>
              <Input type="file" accept="image/*" onChange={(e) => setSelectedThumbnail(e.target.files?.[0] || null)} />
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
            <Input
              placeholder="Add tag and press Enter"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTag((e.target as HTMLInputElement).value)
                  ;(e.target as HTMLInputElement).value = ""
                }
              }}
            />
          </div>

          {/* Featured */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="rounded"
            />
            <Label>Featured Sermon</Label>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            onClick={() => {
              onSave(formData, selectedVideoFile, selectedAudioFile, selectedThumbnail)
              onClose()
            }}
          >
            <Save className="h-4 w-4 mr-1" /> Save Sermon
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
