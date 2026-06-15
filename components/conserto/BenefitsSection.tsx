import { FaCheckCircle } from "react-icons/fa"
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
      <section className="w-full py-16 bg-gray-50 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-10 text-balance">
            Benefícios de restaurar suas cadeiras
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
                <FaCheckCircle className="text-green-500 text-4xl mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
