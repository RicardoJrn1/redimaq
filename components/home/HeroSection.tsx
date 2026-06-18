import { FaChevronDown } from "react-icons/fa"
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
            <p
              className="animate-hero-rise mb-5 text-xs font-medium uppercase tracking-[0.3em] text-cream/60"
              style={{ animationDelay: "0ms" }}
            >
              Móveis &amp; Equipamentos de Escritório · Desde 1989
            </p>
            <h1
              className="animate-hero-rise font-serif text-5xl font-medium leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl"
              style={{ animationDelay: "80ms" }}
            >
              Móveis corporativos que elevam seu <span className="italic text-sand">espaço</span>
            </h1>
            <p
              className="animate-hero-rise mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg lg:mx-0"
              style={{ animationDelay: "160ms" }}
            >
              A Redimaq é sua fonte confiável de móveis e equipamentos de alta qualidade — feitos para transformar seu
              ambiente de trabalho em um espaço funcional e elegante.
            </p>

            <div
              className="animate-hero-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
              style={{ animationDelay: "240ms" }}
            >
              <a
                href={whatsappUrl("Olá! Gostaria de fazer um orçamento.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-cream px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-charcoal transition-all duration-300 hover:scale-105 hover:bg-sand-light hover:shadow-2xl hover:shadow-cream/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream active:scale-95"
              >
                Montar meu escritório
              </a>
              <a
                href="#produtos"
                className="inline-flex items-center justify-center rounded-full border border-cream/30 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream transition-all duration-300 hover:scale-105 hover:bg-cream/10 hover:border-cream/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream active:scale-95"
              >
                Ver soluções
              </a>
            </div>

            <p
              className="animate-hero-rise mt-5 text-[11px] uppercase tracking-[0.2em] text-cream/60"
              style={{ animationDelay: "320ms" }}
            >
              Entrega gratuita na região · Resposta rápida no WhatsApp · Sem compromisso
            </p>
          </div>

          {/* Pilha de imagens */}
          <div className="h-[320px] lg:h-[440px]">
            <VerticalImageStack images={HERO_IMAGES} />
          </div>
        </div>
      </div>

      {/* Indicador de scroll (só desktop) */}
      <a
        href="#produtos"
        aria-label="Rolar para ver as soluções"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/50 transition-colors hover:text-cream md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Role para ver</span>
        <FaChevronDown className="animate-scroll-hint h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </section>
  )
}
