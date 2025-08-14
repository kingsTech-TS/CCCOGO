"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Users, Calendar, Clock } from "lucide-react"

export function LiveStreamSection() {
  const [isLive, setIsLive] = useState(false) // In real app, this would check actual stream status

  const upcomingServices = [
    {
      title: "Sunday Morning Worship",
      date: "December 15, 2024",
      time: "9:00 AM & 11:00 AM",
      description: "Join us for inspiring worship and biblical teaching.",
    },
    {
      title: "Wednesday Bible Study",
      date: "December 18, 2024",
      time: "7:00 PM",
      description: "Dive deeper into God's Word with interactive discussion.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Watch Live</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our online community for live worship services and special events.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Stream Player */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
                  {isLive ? (
                    <div className="w-full h-full bg-black flex items-center justify-center">
                      <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Live Stream"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <div className="text-center text-white">
                      <div className="bg-primary/20 p-6 rounded-full inline-flex mb-4">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Stream Currently Offline</h3>
                      <p className="text-gray-300 mb-4">Join us during our scheduled service times</p>
                      <Button onClick={() => setIsLive(true)} className="bg-primary hover:bg-primary/90">
                        Test Live Stream
                      </Button>
                    </div>
                  )}
                  {isLive && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                      LIVE
                    </div>
                  )}
                </div>
                {isLive && (
                  <div className="p-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">Sunday Morning Worship</h3>
                        <p className="text-sm text-gray-600">Pastor Michael Johnson</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>247 watching</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Services */}
          <div>
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">Upcoming Services</h3>
            <div className="space-y-4">
              {upcomingServices.map((service, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {service.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {service.time}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Watch on Social Media</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <div className="w-4 h-4 bg-red-600 rounded mr-2"></div>
                  YouTube Live
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
                  Facebook Live
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
