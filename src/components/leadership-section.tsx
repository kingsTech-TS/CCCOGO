import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone } from "lucide-react"

export function LeadershipSection() {
  const leaders = [
    {
      name: "Pastor Michael Johnson",
      title: "Senior Pastor",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Pastor Michael has been leading Christ Chosen Church of God Oremeji Church for over 15 years. He holds a Master of Divinity from Seminary and is passionate about expository preaching and pastoral care. He and his wife Sarah have three children and love serving this community.",
      email: "pastor.michael@gracecommunity.org",
      phone: "(555) 123-4567",
    },
    {
      name: "Pastor Sarah Johnson",
      title: "Associate Pastor & Women's Ministry",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Pastor Sarah oversees our women's ministry and counseling programs. With a background in Christian counseling, she brings both theological depth and pastoral heart to her ministry. She loves mentoring women and helping families grow stronger.",
      email: "pastor.sarah@gracecommunity.org",
      phone: "(555) 123-4568",
    },
    {
      name: "Pastor David Chen",
      title: "Youth & Young Adults Pastor",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Pastor David leads our youth and young adult ministries with energy and authenticity. A former youth himself at Christ Chosen Church of God Oremeji, he understands the unique challenges facing young people today and creates engaging, relevant programs.",
      email: "pastor.david@gracecommunity.org",
      phone: "(555) 123-4569",
    },
    {
      name: "Elder Maria Rodriguez",
      title: "Worship & Music Director",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Maria has been leading worship at Christ Chosen Church of God Oremeji for over 10 years. With a degree in music ministry, she creates meaningful worship experiences that help people connect with God. She also directs our choir and leads music education programs.",
      email: "maria@gracecommunity.org",
      phone: "(555) 123-4570",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dedicated servants called to shepherd, teach, and care for our church family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leaders.map((leader, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={leader.image || "/placeholder.svg"}
                      alt={leader.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                    <p className="text-primary font-semibold mb-3">{leader.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{leader.bio}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="h-4 w-4 mr-2" />
                        <a href={`mailto:${leader.email}`} className="hover:text-primary transition-colors">
                          {leader.email}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 mr-2" />
                        <a href={`tel:${leader.phone}`} className="hover:text-primary transition-colors">
                          {leader.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Want to Connect with Our Team?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our pastoral team is here to serve you. Whether you need prayer, counseling, or just want to chat, we'd
              love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@gracecommunity.org"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Mail className="mr-2 h-5 w-5" />
                Send Us an Email
              </a>
              <a
                href="tel:(555)123-PRAY"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us Today
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
