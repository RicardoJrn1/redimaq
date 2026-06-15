import Image from "next/image"
import { FaBan } from "react-icons/fa"
import AnimatedSection from "@/components/AnimatedSection"
import { whatsappUrl } from "@/lib/site"

const CONSEQUENCES = [
  "Riscos de acidentes e problemas de saúde para a equipe.",
  "Impacto negativo na produtividade e no bem-estar.",
  "Desvalorização do patrimônio da sua empresa.",
  "Custos maiores com a substituição completa no futuro.",
]

/** Seção "Adiar o conserto só piora a situação". */
export default function DelaySection() {
  return (
    <AnimatedSection>
      <section className="w-full py-16 bg-gray-50 text-center">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
          {/* Coluna da Imagem */}
          <div className="w-full max-w-sm md:max-w-md lg:max-w-lg md:w-6/12 order-2 md:order-1">
            <Image
              src="/conserto_1.webp"
              alt="Cadeira de escritório danificada precisando de conserto"
              width={600}
              height={600}
              loading="lazy"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
          {/* Coluna de Texto */}
          <div className="w-full max-w-md md:w-5/12 text-center md:text-left order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-10 text-balance">
              Adiar o conserto só piora a situação
            </h2>
            <div className="space-y-4">
              {CONSEQUENCES.map((text, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 150}ms` }}
                  className="flex items-start gap-3 animate-in fade-in slide-in-from-left duration-500"
                >
                  <FaBan className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" aria-hidden="true" />
                  <p className="text-base md:text-lg text-gray-800 font-medium text-left flex-1 m-0">{text}</p>
                </div>
              ))}
            </div>
            <a
              href={whatsappUrl("Olá! Tenho uma cadeira para consertar e gostaria de um orçamento.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-10 px-8 py-4 bg-black text-white text-lg font-bold rounded-full transition-all duration-300 shadow-lg shadow-gray-900/20 hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95"
            >
              Corrigir isso com a Redimaq
            </a>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
