import AnimatedSection from "@/components/AnimatedSection"
import { whatsappUrl } from "@/lib/site"

/** Chamada final da página de conserto — fecho escuro da página. */
export default function FinalCtaSection() {
  return (
    <AnimatedSection>
      <section className="relative isolate w-full overflow-hidden bg-charcoal py-20 text-cream md:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sand/10 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto max-w-3xl px-4 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-cream/50">Vamos começar</p>
          <h2 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight text-balance md:text-5xl lg:text-6xl">
            Pronto para transformar seu <span className="italic text-sand">escritório</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/70 md:text-lg">
            Não deixe que cadeiras danificadas atrapalhem sua rotina. Peça um orçamento sem compromisso e veja como a
            Redimaq facilita a sua operação.
          </p>

          <a
            href={whatsappUrl("Olá! Gostaria de solicitar um orçamento para conserto de cadeiras.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center justify-center rounded-full bg-cream px-9 py-4 text-sm font-semibold uppercase tracking-wide text-charcoal transition-all duration-300 hover:scale-105 hover:bg-sand-light hover:shadow-2xl hover:shadow-cream/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream active:scale-95"
          >
            Falar com a Redimaq
          </a>

          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-cream/60">Retirada no local · Garantia no serviço</p>
        </div>
      </section>
    </AnimatedSection>
  )
}
