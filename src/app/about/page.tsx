import { Navigation } from "@/components/header"
import { Footer } from "@/components/footer"
import { MissionSection } from "@/components/mission-section"
import { LeadershipSection } from "@/components/leadership-section"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-accent to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Our Church</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Discover our heart, our mission, and the people who make Christ Chosen Church of God Oremeji Church a place of belonging.
          </p>
        </div>
      </section>

      <MissionSection />
      <LeadershipSection />
      <Footer />
    </main>
  )
}
