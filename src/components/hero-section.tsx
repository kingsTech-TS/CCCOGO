import { Button } from "@/components/ui/button"
import { Play, MapPin, Calendar } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-accent to-white">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <img
          src="/placeholder.svg?height=800&width=1200"
          alt="Church worship service"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 mb-6">Welcome to Our Family</h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          A Place of Faith, Hope, and Community
        </p>
        <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
          Join us as we grow together in faith, serve our community, and experience the transforming love of God.
          Everyone is welcome here.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
            <MapPin className="mr-2 h-5 w-5" />
            Plan a Visit
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-sky-500 text-sky-600 hover:bg-sky-50 px-8 py-3 bg-transparent"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Live
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/5 px-8 py-3 bg-transparent"
          >
            <Calendar className="mr-2 h-5 w-5" />
            View Events
          </Button>
        </div>
      </div>
    </section>
  )
}
