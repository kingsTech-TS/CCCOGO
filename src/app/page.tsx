import { Navigation } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { QuickInfoCards } from "@/components/quick-info-cards"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <QuickInfoCards />
      <Footer />
    </main>
  )
}
