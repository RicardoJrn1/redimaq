import Image from "next/image"
import AnimatedSection from "@/components/AnimatedSection"

/** Seção de destaque visual ("Versatilidade que acompanha seu ritmo"). */
export default function VersatilitySection() {
  return (
    <AnimatedSection>
      <section className="w-full py-8 md:py-16 text-center bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-700 text-balance">
            Versatilidade que acompanha seu ritmo.
          </h2>
          <div className="relative w-full max-w-5xl mx-auto">
            <Image
              src="/seção_6.webp"
              alt="Escritório moderno e organizado com móveis da Redimaq"
              width={1200}
              height={675}
              loading="lazy"
              className="rounded-2xl md:rounded-3xl shadow-2xl w-full h-auto"
              quality={95}
              sizes="(max-width: 1024px) 90vw, 1200px"
            />
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
