import { Navigation } from "@/components/header"
import { Footer } from "@/components/footer"
import { LiveStreamSection } from "@/components/live-stream-section"
import { SermonArchive } from "@/components/sermon-archive"
import { DevotionalSection } from "@/components/devotional-section"

export default function SermonsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-accent to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sermons & Media</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Watch live services, explore our sermon archive, and grow in faith through daily devotionals.
          </p>
        </div>
      </section>

      <LiveStreamSection />
      <SermonArchive />
      <DevotionalSection />
      <Footer />
    </main>
  )
}
