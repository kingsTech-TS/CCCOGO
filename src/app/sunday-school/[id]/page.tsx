import { Navigation } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, BookOpen, Users, ArrowLeft, Download, ChevronRight } from "lucide-react"
import Link from "next/link"

const lessons = [
  {
    id: 1,
    week: "First Sunday",
    date: "December 1, 2024",
    topic: "Walking in Faith",
    memoryVerse: "Hebrews 11:1",
    memoryVerseText: "Now faith is confidence in what we hope for and assurance about what we do not see.",
    teacher: "Pastor Sarah Johnson",
    duration: "45 min lesson",
    ageGroup: "All Ages",
    objective: "To understand what faith means and how to apply it in our daily lives.",
    keyPoints: [
      "Faith is trusting God even when we can't see the outcome",
      "Biblical examples of faith: Abraham, Moses, David",
      "How to grow in faith through prayer and Bible study",
      "Overcoming doubt with God's promises",
    ],
    bibleReferences: [
      { verse: "Romans 10:17", text: "So then faith comes by hearing, and hearing by the word of God." },
      { verse: "James 2:17", text: "In the same way, faith by itself, if it is not accompanied by action, is dead." },
      {
        verse: "Matthew 17:20",
        text: "Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, 'Move from here to there,' and it will move.",
      },
      { verse: "2 Corinthians 5:7", text: "For we live by faith, not by sight." },
    ],
    discussionQuestions: [
      "What does it mean to have faith in God?",
      "Can you think of a time when you had to trust God without seeing the outcome?",
      "How can we strengthen our faith when facing difficult situations?",
      "What are some practical ways to show faith in our daily actions?",
      "How does reading the Bible help build our faith?",
    ],
    activities: [
      "Faith Walk: Blindfolded trust exercise with a partner",
      "Memory verse recitation and discussion",
      "Share testimonies of God's faithfulness",
      "Create faith journals for the week",
    ],
  },
  {
    id: 2,
    week: "Second Sunday",
    date: "December 8, 2024",
    topic: "The Power of Prayer",
    memoryVerse: "Matthew 7:7",
    memoryVerseText:
      "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.",
    teacher: "Pastor Michael Johnson",
    duration: "45 min lesson",
    ageGroup: "All Ages",
    objective: "To learn about the importance of prayer and how to develop a meaningful prayer life.",
    keyPoints: [
      "Prayer is communication with God",
      "Different types of prayer: praise, thanksgiving, petition, intercession",
      "Jesus' example of prayer and the Lord's Prayer",
      "God hears and answers our prayers",
    ],
    bibleReferences: [
      { verse: "1 Thessalonians 5:17", text: "Pray continually." },
      {
        verse: "Philippians 4:6",
        text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
      },
      { verse: "James 5:16", text: "The prayer of a righteous person is powerful and effective." },
      { verse: "Matthew 6:9-13", text: "This, then, is how you should pray: 'Our Father in heaven...'" },
    ],
    discussionQuestions: [
      "Why is prayer important in our relationship with God?",
      "What are different ways we can pray?",
      "How do you know God hears your prayers?",
      "What should we do when we don't get the answer we want?",
      "How can we make prayer a daily habit?",
    ],
    activities: [
      "Learn and practice the Lord's Prayer",
      "Create personal prayer lists",
      "Prayer walk around the church",
      "Share answered prayer testimonies",
    ],
  },
  {
    id: 3,
    week: "Third Sunday",
    date: "December 15, 2024",
    topic: "Love Your Neighbor",
    memoryVerse: "Mark 12:31",
    memoryVerseText: "Love your neighbor as yourself. There is no commandment greater than these.",
    teacher: "Pastor David Chen",
    duration: "45 min lesson",
    ageGroup: "All Ages",
    objective: "To understand God's command to love others and practical ways to show love to our neighbors.",
    keyPoints: [
      "The Great Commandment: Love God and love others",
      "Who is our neighbor? The Good Samaritan story",
      "Practical ways to show love: kindness, service, forgiveness",
      "Love in action: helping those in need",
    ],
    bibleReferences: [
      { verse: "1 John 4:20", text: "Whoever claims to love God yet hates a brother or sister is a liar." },
      { verse: "Luke 10:25-37", text: "The Parable of the Good Samaritan" },
      { verse: "1 Corinthians 13:4-7", text: "Love is patient, love is kind..." },
      { verse: "John 13:34-35", text: "A new command I give you: Love one another." },
    ],
    discussionQuestions: [
      "Who do you consider to be your neighbors?",
      "What are some ways we can show love to difficult people?",
      "How did the Good Samaritan show love to his neighbor?",
      "What prevents us from loving others sometimes?",
      "How can our church better love our community?",
    ],
    activities: [
      "Plan a community service project",
      "Write encouraging notes to church members",
      "Role-play scenarios of showing love to neighbors",
      "Create 'love in action' commitment cards",
    ],
  },
  {
    id: 4,
    week: "Fourth Sunday",
    date: "December 22, 2024",
    topic: "The Gift of Jesus",
    memoryVerse: "John 3:16",
    memoryVerseText:
      "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    teacher: "Pastor Sarah Johnson",
    duration: "45 min lesson",
    ageGroup: "All Ages",
    objective: "To celebrate and understand the significance of Jesus as God's greatest gift to humanity.",
    keyPoints: [
      "Jesus is God's gift of love to the world",
      "The Christmas story: God becomes human",
      "Jesus' purpose: to save us from sin",
      "How to receive and share this gift",
    ],
    bibleReferences: [
      { verse: "Luke 2:8-14", text: "The angels announce Jesus' birth to the shepherds" },
      { verse: "Isaiah 9:6", text: "For to us a child is born, to us a son is given..." },
      {
        verse: "Romans 6:23",
        text: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.",
      },
      {
        verse: "Ephesians 2:8-9",
        text: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.",
      },
    ],
    discussionQuestions: [
      "Why did God send Jesus to earth?",
      "What makes Jesus the greatest gift ever given?",
      "How can we show gratitude for God's gift of Jesus?",
      "What does it mean to receive Jesus as your personal Savior?",
      "How can we share this gift with others?",
    ],
    activities: [
      "Christmas nativity reenactment",
      "Create gift boxes for families in need",
      "Write thank you letters to God",
      "Plan ways to share Jesus' love during Christmas",
    ],
  },
]

export default function SundaySchoolLessonPage({ params }: { params: { id: string } }) {
  const lessonId = Number.parseInt(params.id)
  const lesson = lessons.find((l) => l.id === lessonId)

  if (!lesson) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <Link href="/sermons">
            <Button>Back to Sermons & Media</Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-accent to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/sermons" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sermons & Media
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">{lesson.week}</span>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-1" />
              {lesson.date}
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">{lesson.topic}</h1>
          <p className="text-xl text-gray-700">Teacher: {lesson.teacher}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Lesson Overview */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Lesson Overview</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <span>{lesson.duration}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-primary mr-2" />
                <span>{lesson.ageGroup}</span>
              </div>
              <div className="flex items-center">
                <Download className="h-5 w-5 text-primary mr-2" />
                <Button variant="ghost" size="sm">
                  Download Materials
                </Button>
              </div>
            </div>
            <p className="text-gray-700">
              <strong>Objective:</strong> {lesson.objective}
            </p>
          </CardContent>
        </Card>

        {/* Memory Verse */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <BookOpen className="h-6 w-6 text-primary mr-2" />
              Memory Verse
            </h2>
            <div className="bg-accent/30 p-6 rounded-lg">
              <p className="text-lg font-medium text-gray-900 mb-2">{lesson.memoryVerse}</p>
              <p className="text-gray-700 italic">"{lesson.memoryVerseText}"</p>
            </div>
          </CardContent>
        </Card>

        {/* Key Points */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Key Points</h2>
            <ul className="space-y-3">
              {lesson.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Bible References */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Additional Bible References</h2>
            <div className="space-y-4">
              {lesson.bibleReferences.map((ref, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <p className="font-medium text-primary mb-1">{ref.verse}</p>
                  <p className="text-gray-700 italic">"{ref.text}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Discussion Questions */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Discussion Questions</h2>
            <div className="space-y-3">
              {lesson.discussionQuestions.map((question, index) => (
                <div key={index} className="flex items-start">
                  <span className="bg-accent text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    Q{index + 1}
                  </span>
                  <p className="text-gray-700">{question}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activities */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Lesson Activities</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {lesson.activities.map((activity, index) => (
                <div key={index} className="bg-accent/20 p-4 rounded-lg">
                  <p className="text-gray-700">{activity}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          {lessonId > 1 && (
            <Link href={`/sunday-school/${lessonId - 1}`}>
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous Lesson
              </Button>
            </Link>
          )}
          {lessonId < 4 && (
            <Link href={`/sunday-school/${lessonId + 1}`} className="ml-auto">
              <Button variant="outline">
                Next Lesson
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
