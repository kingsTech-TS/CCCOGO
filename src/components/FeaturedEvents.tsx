"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Link from "next/link"

export function FeaturedEvents() {
  const featuredEvents = [
    {
      date: "Dec 15",
      day: "Sunday",
      title: "Christmas Cantata",
      time: "6:00 PM",
      location: "Main Sanctuary",
      description:
        "Join our choir for a beautiful Christmas musical celebration featuring traditional carols and contemporary songs.",
      attendees: "All Ages Welcome",
      category: "Worship",
    },
    {
      date: "Dec 18",
      day: "Wednesday",
      title: "Youth Christmas Party",
      time: "7:00 PM",
      location: "Fellowship Hall",
      description: "Fun games, gift exchange, and hot chocolate for our middle and high school students.",
      attendees: "Youth (Grades 6-12)",
      category: "Youth",
    },
    {
      date: "Dec 22",
      day: "Sunday",
      title: "Christmas Eve Service",
      time: "7:00 PM",
      location: "Main Sanctuary",
      description: "A candlelight service celebrating the birth of Jesus with special music and communion.",
      attendees: "All Ages Welcome",
      category: "Worship",
    },
  ]

  const getCategoryColor = (category: string) => {
    const colors = {
      Worship: "bg-primary/10 text-primary",
      Youth: "bg-sky-100 text-sky-700",
      Fellowship: "bg-green-100 text-green-700",
      Prayer: "bg-purple-100 text-purple-700",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700"
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Events</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here are some highlights you won’t want to miss.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredEvents.map((event, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-center">
                    <div className="bg-primary text-white rounded-lg p-2 mb-1">
                      <div className="text-lg font-bold">{event.date.split(" ")[1]}</div>
                      <div className="text-xs">{event.date.split(" ")[0]}</div>
                    </div>
                    <div className="text-xs text-gray-500">{event.day}</div>
                  </div>
                  <div className="flex-1 ml-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif text-lg font-bold text-gray-900">{event.title}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}
                      >
                        {event.category}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{event.description}</p>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {event.attendees}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <Link href="/events#calender">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              <Calendar className="mr-2 h-5 w-5" />
              See More Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
