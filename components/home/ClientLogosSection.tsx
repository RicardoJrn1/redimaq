import Image from "next/image"
import AnimatedSection from "@/components/AnimatedSection"

interface Logo {
  src: string
  alt: string
}

const CLIENT_LOGOS: Logo[] = Array.from({ length: 11 }, (_, i) => ({
  src: `/marca_${i + 1}.webp`,
  alt: `Logo do Cliente ${i + 1}`,
}))

/** Faixa com rolagem infinita das logos dos clientes. */
export default function ClientLogosSection() {
  return (
    <AnimatedSection>
      <section className="w-full py-6 md:py-8 pb-12 md:pb-24 text-center bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6 text-balance">
            Alguns de nossos clientes
          </h2>
          <div className="carousel-container relative py-1 -mx-4 px-4">
            <div className="flex animate-carousel-scroll gap-1 md:gap-2">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => (
                <div
                  key={index}
                  className="carousel-logo flex-shrink-0 w-[200px] md:w-[300px] h-[180px] md:h-[260px] flex items-center justify-center"
                >
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    width={420}
                    height={210}
                    loading="lazy"
                    className="h-32 md:h-48 w-auto object-contain transition-all duration-300 hover:scale-125 hover:drop-shadow-xl"
                    sizes="(max-width: 768px) 200px, 300px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
