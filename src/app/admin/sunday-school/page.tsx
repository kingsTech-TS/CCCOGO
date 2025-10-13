"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, BookOpen } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { db } from "../../../../lib/firebase"

interface SundaySchoolLesson {
  id: string
  date: string
  topic: string
  memoryVerse: string
  verseReference: string
  mainContent: string
  bibleReferences: string[]
  questions: string[]
  teacher: string
  status: "draft" | "published"
  createdAt?: any
  updatedAt?: any
}

export default function SundaySchoolManagement() {
  const [lessons, setLessons] = useState<SundaySchoolLesson[]>([])
  const [editingLesson, setEditingLesson] = useState<SundaySchoolLesson | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<SundaySchoolLesson>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  // ✅ Real-time Firestore listener
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "sundaySchool"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as SundaySchoolLesson[]
      setLessons(data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)))
    })
    return () => unsubscribe()
  }, [])

  // ✅ Create new lesson
  const handleCreate = () => {
    setIsCreating(true)
    setEditingLesson(null)
    setFormData({
      date: "",
      topic: "",
      memoryVerse: "",
      verseReference: "",
      mainContent: "",
      bibleReferences: [],
      questions: [],
      teacher: "",
      status: "draft",
    })
    setIsModalOpen(true)
  }

  // ✅ Edit lesson
  const handleEdit = (lesson: SundaySchoolLesson) => {
    setEditingLesson(lesson)
    setIsCreating(false)
    setFormData(lesson)
    setIsModalOpen(true)
  }

  // ✅ Save lesson (create or update Firestore)
  const handleSave = async () => {
    const collectionRef = collection(db, "sundaySchool")
    const toastId = toast.loading("Saving lesson...")

    try {
      if (isCreating) {
        await addDoc(collectionRef, {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
        toast.success("Lesson created successfully ✅", { id: toastId })
      } else if (editingLesson) {
        const docRef = doc(db, "sundaySchool", editingLesson.id)
        await updateDoc(docRef, {
          ...formData,
          updatedAt: serverTimestamp(),
        })
        toast.success("Lesson updated successfully ✏️", { id: toastId })
      }
      handleCancel()
    } catch (error) {
      toast.error("Error saving lesson ❌", { id: toastId })
    }
  }

  // ✅ Cancel action
  const handleCancel = () => {
    setIsCreating(false)
    setEditingLesson(null)
    setFormData({})
    setIsModalOpen(false)
  }

  // ✅ Delete lesson
  const handleDelete = (id: string) => {
    toast(
      (t) => (
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-medium">Are you sure you want to delete this lesson?</p>
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-red-600 text-white hover:bg-red-500"
              onClick={async () => {
                await deleteDoc(doc(db, "sundaySchool", id))
                toast.dismiss(t.id)
                toast.success("Lesson deleted successfully 🗑️")
              }}
            >
              Yes, Delete
            </Button>
          </div>
        </div>
      ),
      { duration: 8000 }
    )
  }

  // ✅ Bible references + questions controls
  const addBibleReference = () =>
    setFormData({ ...formData, bibleReferences: [...(formData.bibleReferences || []), ""] })

  const updateBibleReference = (index: number, value: string) => {
    const refs = [...(formData.bibleReferences || [])]
    refs[index] = value
    setFormData({ ...formData, bibleReferences: refs })
  }

  const removeBibleReference = (index: number) => {
    const refs = [...(formData.bibleReferences || [])]
    refs.splice(index, 1)
    setFormData({ ...formData, bibleReferences: refs })
  }

  const addQuestion = () =>
    setFormData({ ...formData, questions: [...(formData.questions || []), ""] })

  const updateQuestion = (index: number, value: string) => {
    const questions = [...(formData.questions || [])]
    questions[index] = value
    setFormData({ ...formData, questions })
  }

  const removeQuestion = (index: number) => {
    const questions = [...(formData.questions || [])]
    questions.splice(index, 1)
    setFormData({ ...formData, questions })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Sunday School Management</h2>
          <p className="text-muted-foreground">Create and manage Sunday school lessons</p>
        </div>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Lesson
        </Button>
      </div>

           {/* Lessons list */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => {
          // Convert Firestore timestamps safely
          const createdAt =
            lesson.createdAt?.toDate?.().toLocaleString?.() ??
            (lesson.createdAt?.seconds
              ? new Date(lesson.createdAt.seconds * 1000).toLocaleString()
              : "—");

          const updatedAt =
            lesson.updatedAt?.toDate?.().toLocaleString?.() ??
            (lesson.updatedAt?.seconds
              ? new Date(lesson.updatedAt.seconds * 1000).toLocaleString()
              : "—");

          return (
            <Card key={lesson.id} className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {lesson.topic || "Untitled Lesson"}
                  <Badge
                    variant={
                      lesson.status === "published" ? "default" : "secondary"
                    }
                  >
                    {lesson.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <strong>Date:</strong>{" "}
                  {lesson.date
                    ? lesson.date
                    : createdAt !== "—"
                    ? createdAt
                    : "N/A"}
                </p>
                <p>
                  <strong>Memory Verse:</strong>{" "}
                  {lesson.memoryVerse || "—"}
                </p>
                <p className="line-clamp-3">
                  {lesson.mainContent || "No content yet."}
                </p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Created: {createdAt}</span>
                  <span>Updated: {updatedAt}</span>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(lesson)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(lesson.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Modal for Create/Edit */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCreating ? "Create New Lesson" : "Edit Lesson"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Topic */}
            <div>
              <Label>Topic</Label>
              <Input
                value={formData.topic || ""}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
              />
            </div>

            {/* Date */}
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={formData.date || ""}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            {/* Memory Verse */}
            <div>
              <Label>Memory Verse</Label>
              <Textarea
                value={formData.memoryVerse || ""}
                onChange={(e) =>
                  setFormData({ ...formData, memoryVerse: e.target.value })
                }
              />
            </div>

            {/* Main Content */}
            <div>
              <Label>Main Content</Label>
              <Textarea
                rows={5}
                value={formData.mainContent || ""}
                onChange={(e) =>
                  setFormData({ ...formData, mainContent: e.target.value })
                }
              />
            </div>

            {/* Bible References */}
            <div>
              <Label>Bible References</Label>
              {(formData.bibleReferences || []).map((ref, i) => (
                <div key={i} className="flex gap-2 mt-2">
                  <Input
                    value={ref}
                    onChange={(e) => updateBibleReference(i, e.target.value)}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeBibleReference(i)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                onClick={addBibleReference}
                className="mt-2 flex items-center gap-1"
                variant="secondary"
              >
                <Plus className="h-4 w-4" /> Add Reference
              </Button>
            </div>

            {/* Questions */}
            <div>
              <Label>Questions</Label>
              {(formData.questions || []).map((q, i) => (
                <div key={i} className="flex gap-2 mt-2">
                  <Input
                    value={q}
                    onChange={(e) => updateQuestion(i, e.target.value)}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeQuestion(i)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                onClick={addQuestion}
                className="mt-2 flex items-center gap-1"
                variant="secondary"
              >
                <Plus className="h-4 w-4" /> Add Question
              </Button>
            </div>

            {/* Teacher */}
            <div>
              <Label>Teacher</Label>
              <Input
                value={formData.teacher || ""}
                onChange={(e) =>
                  setFormData({ ...formData, teacher: e.target.value })
                }
              />
            </div>

            {/* Status */}
            <div>
              <Label>Status</Label>
              <Select
                value={formData.status || "draft"}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value as "draft" | "published",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}
