import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Heart, Baby, Music2, HandHeart, Globe } from "lucide-react"

export function MinistriesSection() {
  const ministries = [
    {
      icon: Users,
      name: "Youth Ministry",
      description: "Empowering the next generation through engaging programs, mentorship, and community service.",
      ageGroup: "Middle & High School",
      meetingTime: "Fridays 6:30 PM",
      activities: ["Weekly youth group", "Summer camps", "Mission trips", "Leadership development"],
    },
    {
      icon: Heart,
      name: "Women's Ministry",
      description:
        "Building authentic relationships and spiritual growth through Bible study, fellowship, and service.",
      ageGroup: "All Women",
      meetingTime: "Tuesdays 7:00 PM",
      activities: ["Bible studies", "Women's retreats", "Mentorship programs", "Community outreach"],
    },
    {
      icon: Users,
      name: "Men's Ministry",
      description: "Challenging men to grow in faith, leadership, and brotherhood through study and fellowship.",
      ageGroup: "All Men",
      meetingTime: "Saturdays 8:00 AM",
      activities: ["Men's breakfast", "Bible study", "Service projects", "Outdoor adventures"],
    },
    {
      icon: Baby,
      name: "Children's Ministry",
      description: "Creating a safe, fun environment where children can learn about God's love and grow in faith.",
      ageGroup: "Ages 2-12",
      meetingTime: "Sundays during service",
      activities: ["Sunday school", "VBS", "Children's choir", "Family events"],
    },
    {
      icon: Music2,
      name: "Worship & Choir",
      description: "Using music to glorify God and lead our congregation in meaningful worship experiences.",
      ageGroup: "All Ages",
      meetingTime: "Thursdays 7:00 PM",
      activities: ["Choir practice", "Worship team", "Special performances", "Music lessons"],
    },
    {
      icon: HandHeart,
      name: "Community Outreach",
      description: "Serving our local community through practical acts of love and compassion.",
      ageGroup: "All Ages",
      meetingTime: "Various times",
      activities: ["Food pantry", "Homeless ministry", "Prison ministry", "Community events"],
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Ministries</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your place to serve, grow, and connect with others in our church family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((ministry, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-white">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-full inline-flex mb-4">
                    <ministry.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{ministry.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{ministry.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Age Group:</span>
                    <span className="font-semibold text-gray-700">{ministry.ageGroup}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Meets:</span>
                    <span className="font-semibold text-gray-700">{ministry.meetingTime}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Activities Include:</h4>
                  <ul className="space-y-1">
                    {ministry.activities.map((activity, activityIndex) => (
                      <li key={activityIndex} className="text-sm text-gray-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Ready to Get Involved?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We believe everyone has gifts and talents to contribute. Contact us to learn more about how you can serve
              and grow in our church family.
            </p>
            <Button className="bg-primary hover:bg-primary/90" size="lg">
              <Globe className="mr-2 h-5 w-5" />
              Contact Ministry Leaders
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
