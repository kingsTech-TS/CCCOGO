import { Card, CardContent } from "@/components/ui/card"
import { Clock, Users, Music, BookOpen } from "lucide-react"

export function ServiceTimesSection() {
  const services = [
    {
      icon: Music,
      name: "Sunday Morning Worship",
      times: ["9:00 AM - Traditional Service", "11:00 AM - Contemporary Service"],
      description:
        "Join us for inspiring worship, biblical teaching, and fellowship. Both services feature the same message with different worship styles.",
      features: ["Live worship music", "Children's ministry available", "Coffee & fellowship time"],
    },
    {
      icon: BookOpen,
      name: "Wednesday Bible Study",
      times: ["7:00 PM - Adult Study", "7:00 PM - Youth Group"],
      description: "Dive deeper into God's Word with our midweek Bible study. Small groups available for all ages.",
      features: ["Interactive discussion", "Prayer time", "Light refreshments"],
    },
    {
      icon: Users,
      name: "Friday Youth Service",
      times: ["6:30 PM - High School", "6:30 PM - Middle School"],
      description: "High-energy worship and relevant teaching designed specifically for our young people.",
      features: ["Games and activities", "Peer mentorship", "Pizza and snacks"],
    },
    {
      icon: Clock,
      name: "Sunday School",
      times: ["10:00 AM - All Ages"],
      description: "Educational classes for every age group, from toddlers to seniors, between our morning services.",
      features: ["Age-appropriate curriculum", "Experienced teachers", "Interactive learning"],
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Join Us for Worship</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer multiple services and programs throughout the week to help you grow in your faith.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                    <div className="space-y-1 mb-3">
                      {service.times.map((time, timeIndex) => (
                        <p key={timeIndex} className="text-primary font-semibold">
                          {time}
                        </p>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-1">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-gray-500 flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
