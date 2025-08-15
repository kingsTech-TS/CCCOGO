"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, BookOpen, Users } from "lucide-react"

export function SundaySchoolSection() {
  const [activeLesson, setActiveLesson] = useState(1)

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
      mainContent: `Faith is the foundation of our Christian walk. It's not just believing that God exists, but trusting Him completely even when we cannot see the path ahead. Throughout Scripture, we see examples of men and women who walked by faith, not by sight.

Abraham left his homeland without knowing where God was leading him. Moses led the Israelites out of Egypt, trusting God's promises. David faced Goliath with nothing but a sling and unwavering faith in God's power.

In our daily lives, faith means trusting God's plan when circumstances seem uncertain. It means believing His promises when our feelings tell us otherwise. Faith grows through prayer, studying God's Word, and remembering His faithfulness in the past.

When we walk in faith, we experience God's peace that surpasses understanding. We learn to depend on His strength rather than our own, and we discover that His ways are always better than ours.`,
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
      mainContent: `Prayer is our direct line of communication with God. It's not just asking for things, but developing a relationship with our Heavenly Father. Through prayer, we express our love, gratitude, concerns, and desires to God.

Jesus taught us how to pray through the Lord's Prayer, showing us to honor God, seek His will, ask for our needs, seek forgiveness, and request protection from evil. Prayer includes praise, thanksgiving, confession, and intercession for others.

God hears every prayer, though His answers may come in different forms - yes, no, or wait. Sometimes His answer is better than what we asked for. Prayer changes us as much as it changes our circumstances, aligning our hearts with God's will.

Regular prayer develops our spiritual sensitivity and deepens our relationship with God. It brings peace in troubled times and joy in celebration. Through prayer, we invite God's power and presence into every aspect of our lives.`,
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
      mainContent: `Jesus summarized all of God's commandments in two: love God with all your heart, and love your neighbor as yourself. But who is our neighbor? Jesus answered this through the parable of the Good Samaritan.

Our neighbors aren't just those who live next door, but anyone God places in our path who needs love, kindness, or help. This includes people who are different from us, those who may have hurt us, and even our enemies.

Love in action looks like kindness to strangers, forgiveness to those who wrong us, generosity to those in need, and patience with difficult people. It means seeing others through God's eyes and treating them with the same grace God shows us.

When we love our neighbors, we reflect God's character to the world. Our love becomes a testimony of God's love, drawing others to Him. Love breaks down barriers, heals relationships, and transforms communities.`,
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
      mainContent: `Christmas celebrates the greatest gift ever given - Jesus Christ. God's love for humanity was so great that He sent His only Son to earth, not as a conquering king, but as a humble baby born in a stable.

Jesus came to bridge the gap between God and humanity that sin had created. He lived a perfect life, died on the cross for our sins, and rose again, offering us forgiveness and eternal life. This gift is available to everyone who believes.

The gift of Jesus is different from any earthly gift. It doesn't wear out, break, or lose its value. It transforms lives, brings hope to the hopeless, and offers peace that surpasses understanding. It's a gift we can't earn or deserve - it's given freely through God's grace.

As we celebrate Christmas, we remember that Jesus is not just a historical figure, but a living Savior who wants a personal relationship with each of us. The greatest response to this gift is to receive it with gratitude and share it with others.`,
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
    },
  ]

  const currentLesson = lessons.find((lesson) => lesson.id === activeLesson) || lessons[0]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sunday School Lessons</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us every Sunday for engaging Bible study lessons designed to strengthen your faith and understanding of
            God's Word.
          </p>
        </div>

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
              <h3 className="font-serif text-3xl font-bold text-gray-900 mb-4">{currentLesson.topic}</h3>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {currentLesson.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {currentLesson.ageGroup}
                  </div>
                </div>
                <span>Teacher: {currentLesson.teacher}</span>
              </div>
            </CardContent>
          </Card>

          {/* Memory Verse */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-serif text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-6 w-6 text-primary mr-2" />
                Memory Verse
              </h4>
              <div className="bg-gradient-to-r from-primary/10 to-accent/30 p-6 rounded-lg border-l-4 border-primary">
                <p className="text-lg font-semibold text-primary mb-2">{currentLesson.memoryVerse}</p>
                <p className="text-gray-700 italic text-lg">"{currentLesson.memoryVerseText}"</p>
              </div>
            </CardContent>
          </Card>

          {/* Main Content - The Word */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-serif text-2xl font-bold text-gray-900 mb-4">The Word</h4>
              <div className="prose prose-lg max-w-none text-gray-700">
                {currentLesson.mainContent.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bible References */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-serif text-2xl font-bold text-gray-900 mb-6">Related Bible Verses</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {currentLesson.bibleReferences.map((ref, index) => (
                  <div key={index} className="bg-accent/20 p-4 rounded-lg border-l-4 border-primary">
                    <p className="font-semibold text-primary mb-2">{ref.verse}</p>
                    <p className="text-gray-700 italic">"{ref.text}"</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Discussion Questions */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-serif text-2xl font-bold text-gray-900 mb-6">Discussion Questions</h4>
              <div className="space-y-4">
                {currentLesson.discussionQuestions.map((question, index) => (
                  <div key={index} className="flex items-start bg-gray-50 p-4 rounded-lg">
                    <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 font-medium">{question}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-accent/50">
            <CardContent className="p-8">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Join Our Sunday School</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Sunday School meets every Sunday at 9:00 AM before our main worship service. All ages are welcome to
                join us for Bible study, fellowship, and spiritual growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-primary hover:bg-primary/90">Get More Information</Button>
                <Button variant="outline">View Church Calendar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
