import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { GivingHero } from "@/components/giving-hero"
import { DonationForm } from "@/components/donation-form"
import { GivingImpact } from "@/components/giving-impact"
import { GivingFAQ } from "@/components/giving-faq"

export default function GivingPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <GivingHero />
      <DonationForm />
      <GivingImpact />
      <GivingFAQ />
      <Footer />
    </main>
  )
}
