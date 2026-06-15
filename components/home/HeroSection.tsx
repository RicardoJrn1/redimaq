import { VerticalImageStack, type StackImage } from "@/components/ui/vertical-image-stack"
import { whatsappUrl } from "@/lib/site"

const HERO_IMAGES: StackImage[] = [
  { id: 1, src: "/seção_1.webp", alt: "Ambiente de escritório montado pela Redimaq" },
  { id: 2, src: "/seção_01.webp", alt: "Soluções em móveis corporativos Redimaq" },
]

/**
 * Hero escuro e dramático: texto de boas-vindas serifado + pilha de imagens.
 * O Header (modo overlay) se sobrepõe a esta seção.
 */
export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[92vh] w-full items-center overflow-hidden bg-charcoal text-cream">
      {/* Brilho quente sutil (bege) + vinheta para profundidade */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-sand/10 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-sand-dark/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-28 pb-16 md:pt-24 md:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
          {/* Texto */}
          <div className="text-center lg:text-left">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-cream/60">
              Móveis &amp; Equipamentos de Escritório
            </p>
            <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
              Bem-vindo à <span className="italic text-sand">Redimaq</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg lg:mx-0">
              Sua fonte confiável para móveis e equipamentos de escritório de alta qualidade — projetados para
              transformar seu espaço de trabalho em um ambiente funcional e elegante.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                href={whatsappUrl("Olá! Gostaria de fazer um orçamento.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-cream px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-charcoal transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-2xl hover:shadow-cream/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream active:scale-95"
              >
                Solicitar orçamento
              </a>
              <a
                href="#produtos"
                className="inline-flex items-center justify-center rounded-full border border-cream/30 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream transition-all duration-300 hover:scale-105 hover:bg-cream/10 hover:border-cream/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream active:scale-95"
              >
                Ver soluções
              </a>
            </div>
          </div>

          {/* Pilha de imagens */}
          <div className="h-[320px] lg:h-[440px]">
            <VerticalImageStack images={HERO_IMAGES} />
          </div>
        </div>
      </div>
    </section>
  )
}
