import AnimatedSection from "@/components/AnimatedSection"
import { whatsappUrl } from "@/lib/site"

/** Chamada final da página de conserto. */
export default function FinalCtaSection() {
  return (
    <AnimatedSection>
      <section className="w-full py-16 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 text-balance">
            Pronto para transformar seu escritório?
          </h2>
          <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-600 leading-relaxed">
            Não deixe que cadeiras danificadas atrapalhem sua rotina. Solicite agora um orçamento sem compromisso e veja
            como a Redimaq pode facilitar sua operação.
          </p>
          <a
            href={whatsappUrl("Olá! Gostaria de solicitar um orçamento para conserto de cadeiras.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-black text-white text-lg font-bold rounded-full transition-all duration-300 shadow-lg shadow-gray-900/20 hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95"
          >
            Solicitar Orçamento Agora
          </a>
        </div>
      </section>
    </AnimatedSection>
  )
}
