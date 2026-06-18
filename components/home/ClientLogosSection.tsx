import AnimatedSection from "@/components/AnimatedSection"

interface Logo {
  src: string
  alt: string
}

const CLIENT_LOGOS: Logo[] = Array.from({ length: 11 }, (_, i) => ({
  src: `/marca_${i + 1}.webp`,
  alt: `Logo do cliente ${i + 1}`,
}))

/**
 * Mural de clientes: faixa com rolagem infinita das logos.
 * Logos em escala de cinza que ganham cor no hover e fade suave nas bordas.
 */
export default function ClientLogosSection() {
  return (
    <AnimatedSection>
      <section className="relative w-full overflow-hidden bg-cream py-12 md:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-20 bg-gradient-to-b from-charcoal/10 to-transparent"
        />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-charcoal/70">
            Confiança de quem já trabalha com a gente
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-charcoal text-balance sm:text-4xl md:text-5xl">
            Marcas que confiam na <span className="italic text-sand-dark">Redimaq</span>
          </h2>
        </div>

        {/* Faixa com fade nas bordas (máscara) — a lista é duplicada p/ loop contínuo */}
        <div
          aria-hidden="true"
          className="carousel-container group relative mt-8 md:mt-12"
          style={{
            maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          }}
        >
          <div className="flex w-max animate-carousel-scroll">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => (
              <div
                key={index}
                className="carousel-logo flex h-24 w-[150px] flex-shrink-0 items-center justify-center md:h-28 md:w-[240px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- logos decorativas leves (.webp 3-10KB); evita 22 pipelines do next/image */}
                <img
                  src={logo.src}
                  alt=""
                  width={240}
                  height={120}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-auto object-contain opacity-70 grayscale-[0.7] transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 md:h-20"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
