import { PremiumHeader } from "@/components/premium-header"
import { ParallaxHero } from "@/components/parallax-hero"
import { ScrollAnimation } from "@/components/scroll-animations"
import { PatternBackground, FloatingPatterns } from "@/components/pattern-backgrounds"
import { QuickCollections } from "@/components/quick-collections"
import { FeaturedArtisans } from "@/components/featured-artisans"
import { FestivalCampaign } from "@/components/festival-campaign"
import { InteractiveCultureMap } from "@/components/interactive-culture-map"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative">
      <FloatingPatterns />
      <PremiumHeader />
      <main>
        <ParallaxHero />
        <ScrollAnimation>
          <PatternBackground pattern="paisley" intensity="subtle">
            <QuickCollections />
          </PatternBackground>
        </ScrollAnimation>
        <ScrollAnimation delay={0.2}>
          <FeaturedArtisans />
        </ScrollAnimation>
        <ScrollAnimation delay={0.4}>
          <PatternBackground pattern="mandala" intensity="medium">
            <FestivalCampaign />
          </PatternBackground>
        </ScrollAnimation>
        <ScrollAnimation delay={0.6}>
          <InteractiveCultureMap />
        </ScrollAnimation>
      </main>
      <Footer />
    </div>
  )
}
