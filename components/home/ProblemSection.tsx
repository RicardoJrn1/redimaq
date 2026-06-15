import Image from "next/image"
import { FaTimesCircle } from "react-icons/fa"
import AnimatedSection from "@/components/AnimatedSection"
import { whatsappUrl } from "@/lib/site"

const PROBLEMS = [
  "Espaço desorganizado e pouco funcional",
  "Falta de ergonomia e conforto para os colaboradores",
  "Dificuldade em encontrar móveis resistentes e com entrega rápida",
  "Projetos parados por falta de um fornecedor confiável",
]

/** Seção que apresenta as dores do cliente e um CTA para orçamento. */
export default function ProblemSection() {
  return (
    <AnimatedSection>
      <section className="w-full bg-gradient-to-br from-black via-gray-900 to-black text-white py-8 md:py-20">
        <div className="container mx-auto max-w-5xl flex flex-col items-center gap-6 md:gap-12 px-4 md:flex-row">
          <div className="w-full md:w-1/3">
            <Image
              src="/seção_3.webp"
              alt="Escritório desorganizado e improdutivo"
              width={1280}
              height={853}
              loading="lazy"
              className="h-auto w-full rounded-2xl md:rounded-3xl object-cover shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-500 hover:scale-[1.02] border-2 border-white/10"
              quality={95}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="w-full text-center md:text-left md:w-2/3">
            <h2 className="mb-4 md:mb-6 lg:mb-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight animate-in fade-in slide-in-from-right duration-700 tracking-tight text-balance">
              Seu escritório está atrapalhando a produtividade?
            </h2>

            <div className="space-y-2 md:space-y-4 lg:space-y-5 mb-6 md:mb-8 lg:mb-10">
              {PROBLEMS.map((text, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="flex items-start gap-2 md:gap-3 lg:gap-4 animate-in fade-in slide-in-from-right duration-700 justify-center md:justify-start"
                >
                  <FaTimesCircle
                    className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-red-500 flex-shrink-0 mt-1 drop-shadow-lg animate-pulse"
                    aria-hidden="true"
                  />
                  <p className="text-base md:text-lg text-white/95 font-bold leading-snug text-left flex-1">{text}</p>
                </div>
              ))}
            </div>

            <a
              href={whatsappUrl("Olá! Tenho interesse nos seus móveis e gostaria de um orçamento.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-4 bg-gradient-to-r from-white to-gray-200 text-black text-xs sm:text-sm md:text-base font-bold rounded-xl transition-all duration-300 shadow-xl shadow-white/20 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 animate-pulse-soft hover:from-gray-100 hover:to-gray-300"
            >
              Solicitar orçamento
            </a>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
