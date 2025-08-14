import { Navigation } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceTimesSection } from "@/components/service-times-section"
import { MinistriesSection } from "@/components/ministries-section"

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-accent to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">Services & Ministries</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Join us for worship and discover how you can get involved in our community.
          </p>
        </div>
      </section>

      <ServiceTimesSection />
      <MinistriesSection />
      <Footer />
    </main>
  )
}
