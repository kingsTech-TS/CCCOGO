import { Navigation } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { QuickInfoCards } from "@/components/quick-info-cards"
import { Footer } from "@/components/footer"
import HistorySection from "@/components/history-section"
import { FeaturedEvents } from "@/components/FeaturedEvents"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <HistorySection />
      <FeaturedEvents />
      <QuickInfoCards />
      <Footer />
    </main>
  )
}
