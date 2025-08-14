import { Button } from "@/components/ui/button"
import { Play, Calendar } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section
      className="relative h-[100vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/hero/church.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/60 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to the Chosen Family
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          A Place of Faith, Hope, and Community
        </p>
        <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
          Join us as we grow together in faith, serve our community, and experience the transforming love of God.
          Everyone is welcome here.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-row gap-6 sm:gap-12 justify-center items-center mb-12 flex-wrap">
          <Link href="/sermons#watch">
            <Button
              size="lg"
              variant="outline"
              className="border-sky-500 text-white hover:bg-sky-50 px-8 py-3 bg-sky-500 w-full sm:w-auto"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Live
            </Button>
          </Link>

          <Link href="/events#calender">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-white hover:bg-primary/5 px-8 py-3 bg-primary w-full sm:w-auto"
            >
              <Calendar className="mr-2 h-5 w-5" />
              View Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
