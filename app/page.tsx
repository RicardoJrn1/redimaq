import AnimatedSection from "@/components/AnimatedSection"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import CtaSection from "@/components/home/CtaSection"
import ClientLogosSection from "@/components/home/ClientLogosSection"
import HeroSection from "@/components/home/HeroSection"
import LocationSection from "@/components/home/LocationSection"
import ProblemSection from "@/components/home/ProblemSection"
import ProductsSection from "@/components/home/ProductsSection"
import SolutionsSection from "@/components/home/SolutionsSection"
import VersatilitySection from "@/components/home/VersatilitySection"

export default function Home() {
  return (
    <>
      <Header overlay />

      <main>
        <HeroSection />
        <ClientLogosSection />
        <ProblemSection />
        <ProductsSection />
        <SolutionsSection />
        <VersatilitySection />
        <CtaSection />
        <LocationSection />
      </main>

      <AnimatedSection>
        <Footer />
      </AnimatedSection>
    </>
  )
}
