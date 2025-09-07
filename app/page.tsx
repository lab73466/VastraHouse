import { Header } from "@/components/header"
import { HeroCarousel } from "@/components/hero-carousel"
import { QuickCollections } from "@/components/quick-collections"
import { FeaturedArtisans } from "@/components/featured-artisans"
import { FestivalCampaign } from "@/components/festival-campaign"
import { InteractiveCultureMap } from "@/components/interactive-culture-map"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroCarousel />
        <QuickCollections />
        <FeaturedArtisans />
        <FestivalCampaign />
        <InteractiveCultureMap />
      </main>
      <Footer />
    </div>
  )
}
