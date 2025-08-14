import { Card, CardContent } from "@/components/ui/card"
import { Users, Home, Globe, GraduationCap } from "lucide-react"

export function GivingImpact() {
  const impactAreas = [
    {
      icon: Users,
      title: "Community Outreach",
      description: "Supporting local families with food, clothing, and emergency assistance.",
      impact: "500+ families helped this year",
    },
    {
      icon: Home,
      title: "Building & Facilities",
      description: "Maintaining our church home and expanding to serve more people.",
      impact: "New children's wing completed",
    },
    {
      icon: Globe,
      title: "Global Missions",
      description: "Supporting missionaries and projects around the world.",
      impact: "8 mission partners supported",
    },
    {
      icon: GraduationCap,
      title: "Education & Youth",
      description: "Investing in the next generation through programs and scholarships.",
      impact: "12 scholarships awarded",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Impact</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how your generous giving is making a difference in our community and around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactAreas.map((area, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 bg-white">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-4 rounded-full inline-flex mb-4">
                  <area.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">{area.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{area.description}</p>
                <div className="bg-accent/50 rounded-lg p-2">
                  <p className="text-primary font-semibold text-sm">{area.impact}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Annual Report */}
        <div className="mt-12 text-center">
          <Card className="bg-white">
            <CardContent className="p-8">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">2024 Annual Report</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                See detailed information about how your donations were used this year and the impact we've made
                together.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-3xl font-bold text-primary">$485K</div>
                  <div className="text-sm text-gray-600">Total Donations</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">85%</div>
                  <div className="text-sm text-gray-600">Direct Ministry</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">15%</div>
                  <div className="text-sm text-gray-600">Operations</div>
                </div>
              </div>
              <button className="text-primary hover:text-primary/80 font-medium">Download Full Report →</button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
