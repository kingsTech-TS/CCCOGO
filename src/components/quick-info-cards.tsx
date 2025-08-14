import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, Phone } from "lucide-react"

export function QuickInfoCards() {
  const infoCards = [
    {
      icon: Clock,
      title: "Service Times",
      content: ["Sunday Worship: 9:00 AM & 11:00 AM", "Wednesday Prayer: 7:00 PM", "Youth Service: Friday 6:30 PM"],
    },
    {
      icon: MapPin,
      title: "Location",
      content: ["123 Faith Street", "Community City, CC 12345", "Free parking available"],
    },
    {
      icon: Phone,
      title: "Get Directions",
      content: ["Call us: (555) 123-PRAY", "Email: info@gracecommunity.org", "Get directions via Google Maps"],
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {infoCards.map((card, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <card.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">{card.title}</h3>
                <div className="space-y-2">
                  {card.content.map((line, lineIndex) => (
                    <p key={lineIndex} className="text-gray-600">
                      {line}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
