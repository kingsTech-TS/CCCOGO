"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, BookOpen } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface SundaySchoolLesson {
  id: string
  week: number
  date: string
  topic: string
  memoryVerse: string
  verseReference: string
  mainContent: string
  bibleReferences: string[]
  questions: string[]
  teacher: string
  status: "draft" | "published"
}

const initialLessons: SundaySchoolLesson[] = [
  {
    id: "1",
    week: 1,
    date: "2024-01-07",
    topic: "Walking in Faith",
    memoryVerse: "Now faith is confidence in what we hope for and assurance about what we do not see.",
    verseReference: "Hebrews 11:1",
    mainContent:
      "Faith is the foundation of our Christian walk. It's not just believing in God's existence, but trusting in His character and promises. When we walk by faith, we demonstrate our confidence in God's goodness and sovereignty, even when circumstances seem uncertain. This lesson explores how biblical figures like Abraham, Moses, and David exemplified faith in their daily lives, and how we can apply these same principles today. Faith requires action - it's not passive belief but active trust that transforms how we live, make decisions, and respond to challenges.",
    bibleReferences: ["Romans 10:17", "2 Corinthians 5:7", "James 2:17", "1 Peter 1:7"],
    questions: [
      "How does faith differ from mere belief or hope?",
      "What are some practical ways we can exercise faith in our daily lives?",
      "How can we strengthen our faith during difficult times?",
      "What role does God's Word play in building our faith?",
    ],
    teacher: "Pastor Johnson",
    status: "published",
  },
  {
    id: "2",
    week: 2,
    date: "2024-01-14",
    topic: "The Power of Prayer",
    memoryVerse:
      "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
    verseReference: "Philippians 4:6",
    mainContent:
      "Prayer is our direct line of communication with God. It's not just asking for things, but developing a relationship with our Heavenly Father. Through prayer, we align our hearts with God's will, find peace in His presence, and experience His power in our lives. This lesson examines different types of prayer - adoration, confession, thanksgiving, and supplication - and how Jesus taught us to pray through the Lord's Prayer.",
    bibleReferences: ["Matthew 6:9-13", "1 Thessalonians 5:17", "James 5:16", "1 John 5:14"],
    questions: [
      "What are the different elements of effective prayer?",
      "How does prayer change us, not just our circumstances?",
      "What can we learn from Jesus' prayer life?",
      "How can we maintain consistency in our prayer life?",
    ],
    teacher: "Sister Mary",
    status: "published",
  },
]

export default function SundaySchoolManagement() {
  const [lessons, setLessons] = useState<SundaySchoolLesson[]>(initialLessons)
  const [editingLesson, setEditingLesson] = useState<SundaySchoolLesson | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<SundaySchoolLesson>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreate = () => {
    setIsCreating(true)
    setEditingLesson(null)
    setFormData({
      week: lessons.length + 1,
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

  const handleEdit = (lesson: SundaySchoolLesson) => {
    setEditingLesson(lesson)
    setIsCreating(false)
    setFormData(lesson)
    setIsModalOpen(true)
  }

  const handleSave = () => {
    if (isCreating) {
      const newLesson: SundaySchoolLesson = {
        ...formData,
        id: Date.now().toString(),
        bibleReferences: formData.bibleReferences || [],
        questions: formData.questions || [],
      } as SundaySchoolLesson
      setLessons([...lessons, newLesson])
    } else if (editingLesson) {
      setLessons(
        lessons.map((lesson) => (lesson.id === editingLesson.id ? ({ ...formData } as SundaySchoolLesson) : lesson)),
      )
    }
    handleCancel()
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingLesson(null)
    setFormData({})
    setIsModalOpen(false)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this lesson?")) {
      setLessons(lessons.filter((lesson) => lesson.id !== id))
    }
  }

  const addBibleReference = () => {
    setFormData({
      ...formData,
      bibleReferences: [...(formData.bibleReferences || []), ""],
    })
  }

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

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...(formData.questions || []), ""],
    })
  }

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

      {/* Create/Edit Form */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {isCreating ? "Create New Lesson" : "Edit Lesson"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="week">Week Number</Label>
                <Select
                  value={formData.week?.toString()}
                  onValueChange={(value) => setFormData({ ...formData, week: Number.parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select week" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Week 1</SelectItem>
                    <SelectItem value="2">Week 2</SelectItem>
                    <SelectItem value="3">Week 3</SelectItem>
                    <SelectItem value="4">Week 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                <Label htmlFor="teacher">Teacher</Label>
                <Input
                  id="teacher"
                  value={formData.teacher}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                  placeholder="Teacher name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Lesson Topic</Label>
              <Input
                id="topic"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="Enter lesson topic"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="memoryVerse">Memory Verse</Label>
                <Textarea
                  id="memoryVerse"
                  value={formData.memoryVerse}
                  onChange={(e) => setFormData({ ...formData, memoryVerse: e.target.value })}
                  placeholder="Enter memory verse"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="verseReference">Verse Reference</Label>
                <Input
                  id="verseReference"
                  value={formData.verseReference}
                  onChange={(e) => setFormData({ ...formData, verseReference: e.target.value })}
                  placeholder="e.g., John 3:16"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainContent">Main Content (The Word)</Label>
              <Textarea
                id="mainContent"
                value={formData.mainContent}
                onChange={(e) => setFormData({ ...formData, mainContent: e.target.value })}
                placeholder="Enter the main lesson content"
                rows={6}
              />
            </div>

            {/* Bible References */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Bible References</Label>
                <Button type="button" variant="outline" size="sm" onClick={addBibleReference}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Reference
                </Button>
              </div>
              <div className="space-y-2">
                {formData.bibleReferences?.map((ref, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={ref}
                      onChange={(e) => updateBibleReference(index, e.target.value)}
                      placeholder="e.g., Romans 8:28"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => removeBibleReference(index)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Discussion Questions</Label>
                <Button type="button" variant="outline" size="sm" onClick={addQuestion}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Question
                </Button>
              </div>
              <div className="space-y-2">
                {formData.questions?.map((question, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={question}
                      onChange={(e) => updateQuestion(index, e.target.value)}
                      placeholder="Enter discussion question"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => removeQuestion(index)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "draft" | "published") => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Lesson
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lessons List */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Lessons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{lesson.topic}</h3>
                      <Badge variant={lesson.status === "published" ? "default" : "secondary"}>{lesson.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Week {lesson.week} • {new Date(lesson.date).toLocaleDateString()} • {lesson.teacher}
                    </p>
                    <p className="text-sm font-medium text-primary">
                      {lesson.verseReference}: "{lesson.memoryVerse.substring(0, 100)}..."
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(lesson)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(lesson.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>{lesson.mainContent.substring(0, 200)}...</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {lesson.bibleReferences.slice(0, 3).map((ref, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {ref}
                    </Badge>
                  ))}
                  {lesson.bibleReferences.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{lesson.bibleReferences.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
