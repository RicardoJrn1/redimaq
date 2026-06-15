import AnimatedSection from "@/components/AnimatedSection"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import BenefitsSection from "@/components/conserto/BenefitsSection"
import DelaySection from "@/components/conserto/DelaySection"
import FinalCtaSection from "@/components/conserto/FinalCtaSection"
import GallerySection from "@/components/conserto/GallerySection"
import HeroSection from "@/components/conserto/HeroSection"
import LocationSection from "@/components/conserto/LocationSection"
import { CONSERTO_FOOTER_LINKS } from "@/lib/site"

export default function ConsertoDeCadeirasPage() {
  return (
    <>
      <Header />

      <main>
        <HeroSection />
        <DelaySection />
        <BenefitsSection />
        <GallerySection />
        <FinalCtaSection />
        <LocationSection />
      </main>

      <AnimatedSection>
        <Footer navLinks={CONSERTO_FOOTER_LINKS} />
      </AnimatedSection>
    </>
  )
}
