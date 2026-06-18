import AnimatedSection from "@/components/AnimatedSection"
import { whatsappUrl } from "@/lib/site"

/** Chamada final (fecho escuro, ecoando a Hero) para modernizar o escritório. */
export default function CtaSection() {
  return (
    <AnimatedSection>
      <section className="relative isolate w-full overflow-hidden bg-charcoal py-20 text-center text-cream md:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sand/10 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto max-w-3xl px-4">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-cream/50">Vamos começar</p>
          <h2 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight text-balance md:text-6xl">
            A hora de modernizar seu <span className="italic text-sand">escritório</span> é agora
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg">
            Móveis corporativos de alto padrão, condição especial para grandes projetos e um atendimento que cuida de
            cada detalhe.
          </p>

          <div className="mt-10 flex justify-center">
            <a
              href={whatsappUrl("Olá! Vi a oferta no site e gostaria de solicitar um orçamento.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-cream px-9 py-4 text-sm font-semibold uppercase tracking-wide text-charcoal transition-all duration-300 hover:scale-105 hover:bg-sand-light hover:shadow-2xl hover:shadow-cream/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream active:scale-95"
            >
              Solicitar orçamento
            </a>
          </div>

          <p className="mt-5 text-xs uppercase tracking-wide text-cream/60">
            Entrega gratuita na região · Resposta rápida no WhatsApp · Desde 1989
          </p>
        </div>
      </section>
    </AnimatedSection>
  )
}
