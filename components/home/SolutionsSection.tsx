import Image from "next/image"
import AnimatedSection from "@/components/AnimatedSection"
import { whatsappUrl } from "@/lib/site"

const SOLUTIONS = [
  "Linha completa de móveis corporativos",
  "Alta qualidade e durabilidade",
  "Atendimento personalizado",
  "Entrega rápida e gratuita",
]

/** Seção com os diferenciais/soluções da Redimaq e CTA para orçamento. */
export default function SolutionsSection() {
  return (
    <AnimatedSection>
      <section className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 text-black py-8 md:py-20">
        <div className="container mx-auto max-w-5xl flex flex-col items-center gap-4 md:gap-0 px-4 md:flex-row">
          <div className="w-full text-center md:text-left md:w-2/3 md:order-1 order-2">
            <h2 className="mb-4 md:mb-6 lg:mb-10 text-3xl md:text-4xl font-black leading-tight animate-in fade-in slide-in-from-left duration-700 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent tracking-tight text-balance">
              Soluções da <br /> REDIMAQ
            </h2>

            <div className="space-y-2 md:space-y-4 lg:space-y-5 mb-6 md:mb-8 lg:mb-10">
              {SOLUTIONS.map((text, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="flex items-start gap-2 md:gap-3 lg:gap-4 animate-in fade-in slide-in-from-left duration-700 justify-center md:justify-start"
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-green-600 flex-shrink-0 mt-0.5 drop-shadow-lg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-base md:text-lg text-black/90 font-bold leading-relaxed text-left">{text}</p>
                </div>
              ))}
            </div>

            <a
              href={whatsappUrl("Olá! Gostaria de um orçamento para as soluções da Redimaq.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-4 bg-gradient-to-r from-black via-gray-900 to-black text-white text-xs sm:text-sm md:text-base font-bold rounded-xl transition-all duration-300 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-black/50 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 animate-pulse-soft hover:from-gray-900 hover:to-gray-800"
            >
              Solicitar orçamento
            </a>
          </div>

          <div className="w-full md:w-1/3 md:order-2 order-1">
            <Image
              src="/seção_5.webp"
              alt="Escritório organizado e produtivo"
              width={1280}
              height={853}
              loading="lazy"
              className="h-auto w-full rounded-2xl md:rounded-3xl object-cover shadow-2xl shadow-green-600/30 hover:shadow-green-500/50 transition-all duration-500 hover:scale-[1.02] border-2 border-green-900/10"
              quality={95}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
