"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Tag, ChevronRight } from "lucide-react"

export function DevotionalSection() {
  const [selectedTag, setSelectedTag] = useState("All")

  const devotionals = [
    {
      id: 1,
      title: "Finding Joy in the Journey",
      date: "December 14, 2024",
      readTime: "3 min read",
      excerpt:
        "Life is full of ups and downs, but God calls us to find joy not just in the destination, but in every step of our journey with Him.",
      content: `Life is full of ups and downs, but God calls us to find joy not just in the destination, but in every step of our journey with Him.

The apostle Paul wrote from prison, "Rejoice in the Lord always. I will say it again: Rejoice!" (Philippians 4:4). This wasn't written from a place of comfort, but from chains. Paul had learned the secret of contentment in all circumstances.

Today, whatever you're facing, remember that God is with you. He hasn't abandoned you in your struggles, and He celebrates with you in your victories. The journey itself is sacred when walked with Him.

**Prayer:** Lord, help me to find joy in today's journey, knowing that You are with me every step of the way. Amen.

**Reflection Questions:**
- What is one thing you can be grateful for today?
- How can you see God's presence in your current circumstances?
- What step of faith is God calling you to take?`,
      tags: ["Joy", "Faith", "Daily Life"],
      author: "Pastor Sarah Johnson",
      scripture: "Philippians 4:4",
    },
    {
      id: 2,
      title: "The Power of Gratitude",
      date: "December 13, 2024",
      readTime: "4 min read",
      excerpt:
        "Gratitude transforms our perspective and opens our hearts to see God's goodness in every season of life.",
      content: `Gratitude transforms our perspective and opens our hearts to see God's goodness in every season of life.

When we choose to be thankful, we shift our focus from what we lack to what we have been given. The Bible tells us to "give thanks in all circumstances; for this is God's will for you in Christ Jesus" (1 Thessalonians 5:18).

This doesn't mean we're thankful for every difficult situation, but that we can find something to be grateful for even in the midst of challenges. God's love, His presence, His promises - these remain constant.

Start today by naming three things you're grateful for. Watch how this simple practice begins to change your heart and your outlook.

**Prayer:** Father, thank You for Your countless blessings. Help me to have a heart of gratitude in all circumstances. Amen.

**Reflection Questions:**
- What are three things you're grateful for today?
- How has God shown His faithfulness in your life recently?
- How can you express gratitude to someone today?`,
      tags: ["Gratitude", "Perspective", "Thanksgiving"],
      author: "Pastor Michael Johnson",
      scripture: "1 Thessalonians 5:18",
    },
    {
      id: 3,
      title: "Walking in God's Peace",
      date: "December 12, 2024",
      readTime: "3 min read",
      excerpt: "In a world full of anxiety and worry, God offers us a peace that surpasses all understanding.",
      content: `In a world full of anxiety and worry, God offers us a peace that surpasses all understanding.

Jesus said, "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid" (John 14:27).

God's peace is different from the world's peace. It doesn't depend on our circumstances being perfect or our problems being solved. It comes from knowing that our loving Father is in control and that He works all things together for our good.

When anxiety tries to overwhelm you today, remember to bring your concerns to God in prayer. He cares about every detail of your life.

**Prayer:** Prince of Peace, calm my anxious heart and fill me with Your perfect peace. Help me to trust in Your goodness. Amen.

**Reflection Questions:**
- What worries are you carrying that you need to give to God?
- How have you experienced God's peace in difficult times?
- What practical steps can you take to cultivate peace in your daily life?`,
      tags: ["Peace", "Anxiety", "Trust"],
      author: "Pastor David Chen",
      scripture: "John 14:27",
    },
  ]

  const allTags = ["All", ...Array.from(new Set(devotionals.flatMap((d) => d.tags)))]

  const filteredDevotionals =
    selectedTag === "All" ? devotionals : devotionals.filter((d) => d.tags.includes(selectedTag))

  const [expandedDevotional, setExpandedDevotional] = useState<number | null>(null)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Daily Devotionals</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start your day with God's Word and grow in your faith through daily reflections.
          </p>
        </div>

        {/* Tag Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(tag)}
              className={selectedTag === tag ? "bg-primary hover:bg-primary/90" : ""}
            >
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </Button>
          ))}
        </div>

        {/* Devotionals */}
        <div className="space-y-6">
          {filteredDevotionals.map((devotional) => (
            <Card key={devotional.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {devotional.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {devotional.readTime}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {devotional.tags.map((tag) => (
                      <span key={tag} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">{devotional.title}</h3>
                <p className="text-gray-600 mb-4">{devotional.excerpt}</p>

                {expandedDevotional === devotional.id && (
                  <div className="mb-4">
                    <div className="prose prose-gray max-w-none">
                      {devotional.content.split("\n\n").map((paragraph, index) => {
                        if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                          return (
                            <p key={index} className="font-semibold text-gray-900 mt-4">
                              {paragraph.slice(2, -2)}
                            </p>
                          )
                        }
                        return (
                          <p key={index} className="text-gray-700 leading-relaxed mb-3">
                            {paragraph}
                          </p>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span>By {devotional.author}</span>
                    <span className="mx-2">•</span>
                    <span className="text-primary font-medium">{devotional.scripture}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedDevotional(expandedDevotional === devotional.id ? null : devotional.id)}
                    className="text-primary hover:text-primary/80"
                  >
                    {expandedDevotional === devotional.id ? "Read Less" : "Read More"}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subscribe Section */}
        <div className="mt-12 text-center">
          <Card className="bg-accent/50">
            <CardContent className="p-8">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Never Miss a Devotional</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Subscribe to receive daily devotionals in your inbox and start each day with God's Word.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="bg-primary hover:bg-primary/90">Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
