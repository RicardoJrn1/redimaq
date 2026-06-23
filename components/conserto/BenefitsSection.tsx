import AnimatedSection from "@/components/AnimatedSection"

interface Benefit {
  title: string
  description: string
}

const BENEFITS: Benefit[] = [
  {
    title: "Equipe mais confortável",
    description: "Cadeiras restauradas reduzem reclamações e aumentam a produtividade.",
  },
  {
    title: "Ambiente mais profissional",
    description: "Seu espaço transmite mais credibilidade com móveis em bom estado.",
  },
  {
    title: "Problemas resolvidos com agilidade",
    description: "Você ganha tempo, evita dor de cabeça e tem garantia no serviço.",
  },
]

/** Seção de benefícios de restaurar as cadeiras. */
export default function BenefitsSection() {
  return (
    <AnimatedSection id="beneficios">
      <section className="relative isolate w-full overflow-hidden bg-charcoal py-16 text-cream md:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-sand/10 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-cream/50">Por que restaurar</p>
            <h2 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight text-balance md:text-5xl">
              Benefícios de restaurar suas <span className="italic text-sand">cadeiras</span>
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {BENEFITS.map((benefit, index) => (
              <div key={benefit.title} className="flex flex-col rounded-2xl border border-cream/10 bg-cream/5 p-8">
                <span aria-hidden="true" className="font-serif text-3xl text-sand tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-medium text-cream">{benefit.title}</h3>
                <p className="mt-2 leading-relaxed text-cream/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
