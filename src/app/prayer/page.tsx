import { Navigation } from "@/components/header"
import { Footer } from "@/components/footer"
import { PrayerRequestForm } from "@/components/prayer-request-form"
import { PrayerTestimonies } from "@/components/prayer-testimonies"

export default function PrayerPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-accent to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">Prayer Requests</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Share your prayer needs with our church family. We believe in the power of prayer and are honored to pray
            with you.
          </p>
        </div>
      </section>

      <PrayerRequestForm />
      <PrayerTestimonies />
      <Footer />
    </main>
  )
}
