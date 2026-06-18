import AnimatedSection from "@/components/AnimatedSection"

const years = new Date().getFullYear() - 1989

interface Stat {
  value: string
  label: string
}

// Apenas dados verificáveis (fundação 1989, entrega gratuita, atendimento, local).
const STATS: Stat[] = [
  { value: `+${years}`, label: "Anos de experiência" },
  { value: "100%", label: "Atendimento personalizado" },
  { value: "Grátis", label: "Entrega rápida na região" },
  { value: "Pato Branco", label: "PR · venha ao showroom" },
]

/** Faixa de credibilidade (selo de autoridade) entre os clientes e a seção de problema. */
export default function StatsSection() {
  return (
    <AnimatedSection>
      <section className="relative w-full overflow-hidden bg-charcoal py-12 text-cream md:py-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[600px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sand/10 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:divide-x md:divide-cream/10">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-4 text-center">
                <p className="font-serif text-4xl font-medium text-sand md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-cream/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
