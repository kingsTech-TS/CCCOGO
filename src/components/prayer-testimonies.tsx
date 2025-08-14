import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export function PrayerTestimonies() {
  const testimonies = [
    {
      name: "Sarah M.",
      testimony:
        "I submitted a prayer request for my husband's job situation, and within two weeks he received an amazing opportunity. Thank you for your faithful prayers!",
      category: "Work & Finances",
    },
    {
      name: "Michael R.",
      testimony:
        "The prayer team supported me through my mother's illness. Even though she passed away, I felt God's peace and the love of this church family throughout the journey.",
      category: "Health & Healing",
    },
    {
      name: "Jennifer L.",
      testimony:
        "I was struggling with anxiety and depression. The prayers and support from this church helped me find hope again. God is so faithful!",
      category: "Spiritual Growth",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Prayer Testimonies</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how God has answered prayers and worked in the lives of our church family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonies.map((testimony, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <Quote className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 italic leading-relaxed">{testimony.testimony}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">{testimony.name}</p>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                    {testimony.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
