import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactInfo } from "@/components/contact-info"
import { ContactForm } from "@/components/contact-form"
import { MapSection } from "@/components/map-section"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-accent to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            We'd love to hear from you! Reach out with questions, prayer requests, or just to say hello.
          </p>
        </div>
      </section>

      <ContactInfo />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <ContactForm />
        <MapSection />
      </div>
      <Footer />
    </main>
  )
}
