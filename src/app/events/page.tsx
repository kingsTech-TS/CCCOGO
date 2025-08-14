import { Navigation } from "@/components/header"
import { Footer } from "@/components/footer"
import { EventsCalendar } from "@/components/events-calendar"
import { PhotoGallery } from "@/components/photo-gallery"

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-accent to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">Church Events</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Stay connected with upcoming events and see highlights from our community gatherings.
          </p>
        </div>
      </section>

      <EventsCalendar />
      <PhotoGallery />
      <Footer />
    </main>
  )
}
