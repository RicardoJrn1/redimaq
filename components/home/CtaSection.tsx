import AnimatedSection from "@/components/AnimatedSection"
import { whatsappUrl } from "@/lib/site"

/** Chamada final para modernizar o escritório. */
export default function CtaSection() {
  return (
    <AnimatedSection>
      <section className="w-full py-8 md:py-16 bg-white text-black text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-balance">
            A oportunidade perfeita para modernizar seu escritório!
          </h2>
          <div className="max-w-3xl mx-auto mb-6 md:mb-10 space-y-2 md:space-y-3 text-base md:text-lg leading-relaxed">
            <p>Móveis corporativos de alto padrão, prontos para transformar seu ambiente de trabalho!</p>
            <p>Investimento estratégico para aumentar produtividade e bem-estar da equipe!</p>
            <p>
              <strong>Condição especial para grandes projetos</strong> – aproveite agora mesmo!
            </p>
          </div>
          <a
            href={whatsappUrl("Olá! Vi a oferta no site e gostaria de solicitar um orçamento.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 md:px-10 py-3 md:py-4 bg-gradient-to-r from-black via-gray-900 to-black text-white text-base md:text-lg font-bold rounded-xl transition-all duration-300 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/40 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 animate-pulse-soft hover:from-gray-800 hover:to-gray-700"
          >
            Solicitar Orçamento Agora
          </a>
        </div>
      </section>
    </AnimatedSection>
  )
}
