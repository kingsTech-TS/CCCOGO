import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, BookOpen } from "lucide-react"

export function MissionSection() {
  const values = [
    {
      icon: Heart,
      title: "Our Mission",
      content:
        "To love God, love people, and serve our community with the transforming power of Jesus Christ. We exist to help people discover their purpose and grow in their relationship with God.",
    },
    {
      icon: Users,
      title: "Our Vision",
      content:
        "To be a thriving, multi-generational church family that impacts our community and beyond. We envision a place where everyone can belong, believe, and become who God created them to be.",
    },
    {
      icon: BookOpen,
      title: "Our Beliefs",
      content:
        "We believe in the Trinity, salvation through Jesus Christ, the authority of Scripture, and the power of prayer. We are committed to biblical truth, authentic worship, and genuine community.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Foundation</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built on faith, strengthened by community, and guided by love.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Story Section */}
        <div className="mt-16 bg-accent/50 rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Christ Chosen Church of God Oremeji Church was founded in 1985 with a simple vision: to create a place where people could
              experience God's love and find their spiritual home. What started as a small gathering of families has
              grown into a vibrant community of believers from all walks of life.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, we continue to be guided by the same principles that founded our church: authentic worship,
              biblical teaching, genuine fellowship, and compassionate service. We believe that everyone has a place at
              God's table, and we're committed to creating an environment where all people can grow in their faith
              journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
