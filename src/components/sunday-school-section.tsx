"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, BookOpen, Users } from "lucide-react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../lib/firebase"


interface SundaySchoolLesson {
  id: string
  week: string
  date: string
  topic: string
  memoryVerse: string
  memoryVerseText: string
  mainContent: string
  bibleReferences?: { verse: string; text: string }[]
  questions?: string[]
  discussionQuestions?: string[]
  teacher: string
  duration?: string
  ageGroup?: string
}

export function SundaySchoolSection() {
  const [lessons, setLessons] = useState<SundaySchoolLesson[]>([])
  const [activeLesson, setActiveLesson] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "sundaySchool"), (snapshot) => {
      const fetchedLessons = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as SundaySchoolLesson[]

      // Sort by predefined week order
      const weekOrder = [
        "First Sunday",
        "Second Sunday",
        "Third Sunday",
        "Fourth Sunday",
        "Fifth Sunday",
      ]

      fetchedLessons.sort(
        (a, b) => weekOrder.indexOf(a.week) - weekOrder.indexOf(b.week)
      )

      setLessons(fetchedLessons)
      if (!activeLesson && fetchedLessons.length > 0) {
        setActiveLesson(fetchedLessons[0].id)
      }
    })

    return () => unsubscribe()
  }, [activeLesson])

  const currentLesson = lessons.find((lesson) => lesson.id === activeLesson)

  if (!currentLesson) {
    return (
      <section className="py-16 bg-white text-center">
        <h2 className="text-2xl font-bold text-gray-700">
          No Sunday School lessons available yet.
        </h2>
        <p className="text-gray-500 mt-2">
          Check back soon for upcoming Sunday School materials.
        </p>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sunday School Lessons
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us every Sunday for engaging Bible study lessons designed to
            strengthen your faith and understanding of God's Word.
          </p>
        </div>

        {/* Week Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {lessons.map((lesson) => (
            <Button
              key={lesson.id}
              variant={activeLesson === lesson.id ? "default" : "outline"}
              onClick={() => setActiveLesson(lesson.id)}
              className="mb-2"
            >
              {lesson.week}
            </Button>
          ))}
        </div>

        <div className="space-y-8">
          {/* Lesson Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {currentLesson.week}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {currentLesson.date}
                </div>
              </div>
              <h3 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                {currentLesson.topic}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  {currentLesson.duration && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {currentLesson.duration}
                    </div>
                  )}
                  {currentLesson.ageGroup && (
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {currentLesson.ageGroup}
                    </div>
                  )}
                </div>
                <span>Teacher: {currentLesson.teacher}</span>
              </div>
            </CardContent>
          </Card>

          {/* Memory Verse */}
          {currentLesson.memoryVerse && (
            <Card>
              <CardContent className="p-6">
                <h4 className="font-serif text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="h-6 w-6 text-primary mr-2" />
                  Memory Verse
                </h4>
                <div className="bg-gradient-to-r from-primary/10 to-accent/30 p-6 rounded-lg border-l-4 border-primary">
                  <p className="text-lg font-semibold text-primary mb-2">
                    {currentLesson.memoryVerseText}
                  </p>
                  {currentLesson.memoryVerse && (
                    <p className="text-gray-700 italic text-lg">
                      "{currentLesson.memoryVerse}"
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Content - The Word */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                The Word
              </h4>
              <div className="prose prose-lg max-w-none text-gray-700">
                {currentLesson.mainContent?.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bible References */}
          {currentLesson.bibleReferences && currentLesson.bibleReferences.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h4 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                  Related Bible Verses
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {currentLesson.bibleReferences.map((ref, index) => (
                    <div
                      key={index}
                      className="bg-accent/20 p-4 rounded-lg border-l-4 border-primary"
                    >
                      <p className="font-semibold text-primary mb-2">
                        {ref.verse}
                      </p>
                      <p className="text-gray-700 italic">"{ref.text}"</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Discussion Questions */}
          {((currentLesson.questions && currentLesson.questions.length > 0) ||
            (currentLesson.discussionQuestions &&
              currentLesson.discussionQuestions.length > 0)) && (
            <Card>
              <CardContent className="p-6">
                <h4 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                  Discussion Questions
                </h4>
                <div className="space-y-4">
                  {(currentLesson.questions || currentLesson.discussionQuestions || []).map(
                    (question, index) => (
                      <div
                        key={index}
                        className="flex items-start bg-gray-50 p-4 rounded-lg"
                      >
                        <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-gray-700 font-medium">{question}</p>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-accent/50">
            <CardContent className="p-8">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                Join Our Sunday School
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Sunday School meets every Sunday at 9:00 AM before our main
                worship service. All ages are welcome to join us for Bible
                study, fellowship, and spiritual growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-primary hover:bg-primary/90">
                  Get More Information
                </Button>
                <Button variant="outline">View Church Calendar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
