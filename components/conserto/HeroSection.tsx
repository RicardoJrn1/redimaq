import AnimatedSection from "@/components/AnimatedSection"
import { ImageComparison } from "@/components/ui/image-comparison-slider"
import { whatsappUrl } from "@/lib/site"

/** Hero da página de conserto: comparação interativa "antes e depois". */
export default function HeroSection() {
  return (
    <AnimatedSection>
      <section className="relative isolate w-full overflow-hidden bg-charcoal text-cream">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-sand/10 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto flex flex-col items-center gap-12 px-4 pb-16 pt-28 md:flex-row md:gap-16 md:pb-24 md:pt-36">
          {/* Coluna de texto */}
          <div className="w-full text-center md:w-1/2 md:text-left">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-cream/50">Conserto de cadeiras</p>
            <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-balance md:text-5xl lg:text-6xl">
              Cadeiras quebradas não precisam <span className="italic text-sand">travar</span> seu dia
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/70 md:mx-0 md:text-lg">
              Enquanto você cuida da operação do escritório, nós cuidamos das cadeiras. Conserto ágil, retirada no local
              e entrega com garantia.
            </p>
            <a
              href={whatsappUrl("Olá! Gostaria de um orçamento para conserto de cadeiras.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center justify-center rounded-full bg-cream px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-charcoal transition-all duration-300 hover:scale-105 hover:bg-sand-light hover:shadow-2xl hover:shadow-cream/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream active:scale-95"
            >
              Solicitar orçamento
            </a>
          </div>

          {/* Coluna do slider antes/depois */}
          <div className="w-full max-w-sm md:w-1/2 md:max-w-md">
            <ImageComparison
              beforeImage="/conserto-1.webp"
              afterImage="/conserto-2.webp"
              altBefore="Cadeira de escritório suja e desgastada, antes do conserto"
              altAfter="A mesma cadeira reformada, revestida e limpa, depois do conserto"
              labelBefore="Antes"
              labelAfter="Depois"
              priority
              className="shadow-2xl shadow-charcoal/50 ring-1 ring-cream/15"
            />
            <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-cream/40">Arraste para comparar</p>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
