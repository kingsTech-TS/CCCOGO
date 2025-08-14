import { Heart, Users, Globe } from "lucide-react"

export function GivingHero() {
  return (
    <section className="bg-gradient-to-r from-accent to-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">Give Online</h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
          Your generosity helps us spread God's love, support our community, and make a lasting impact in the world.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
          "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for
          God loves a cheerful giver." - 2 Corinthians 9:7
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="bg-primary/10 p-3 rounded-full inline-flex mb-2">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-gray-900">500+</div>
            <div className="text-sm text-gray-600">Families Supported</div>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 p-3 rounded-full inline-flex mb-2">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Active Ministries</div>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 p-3 rounded-full inline-flex mb-2">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-gray-900">8</div>
            <div className="text-sm text-gray-600">Mission Partners</div>
          </div>
        </div>
      </div>
    </section>
  )
}
