import Image from "next/image"
import AnimatedSection from "@/components/AnimatedSection"
import { whatsappUrl } from "@/lib/site"

const PROBLEMS = [
  "Espaço desorganizado e pouco funcional",
  "Falta de ergonomia e conforto para os colaboradores",
  "Dificuldade em encontrar móveis resistentes e com entrega rápida",
  "Projetos parados por falta de um fornecedor confiável",
]

/** Seção que apresenta as dores do cliente (tom escuro/elegante) e um CTA. */
export default function ProblemSection() {
  return (
    <AnimatedSection>
      <section className="relative isolate w-full overflow-hidden bg-charcoal py-16 text-cream md:py-28">
        {/* Brilho quente sutil, como na Hero */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-sand/10 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 md:flex-row md:gap-14">
          <div className="w-full md:w-1/2">
            <Image
              src="/seção_3.webp"
              alt="Escritório desorganizado e improdutivo"
              width={1280}
              height={853}
              loading="lazy"
              className="aspect-[3/2] w-full rounded-3xl object-cover shadow-2xl shadow-charcoal/40 ring-1 ring-cream/10 md:aspect-auto md:h-140"
              quality={90}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="w-full text-center md:w-1/2 md:text-left">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-cream/50">O problema</p>
            <h2 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight text-balance sm:text-4xl md:text-5xl">
              Seu escritório está <span className="italic text-sand">travando</span> a produtividade?
            </h2>

            <ul className="mx-auto mt-8 max-w-md text-left md:mx-0">
              {PROBLEMS.map((text, index) => (
                <li key={index} className="flex items-start gap-3 border-b border-cream/10 py-3.5">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sand" />
                  <p className="text-base leading-relaxed text-cream/80 md:text-lg">{text}</p>
                </li>
              ))}
            </ul>

            <a
              href={whatsappUrl("Olá! Tenho interesse nos seus móveis e gostaria de um orçamento.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center justify-center rounded-full bg-cream px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-charcoal transition-all duration-300 hover:scale-105 hover:bg-sand-light hover:shadow-2xl hover:shadow-cream/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream active:scale-95"
            >
              Resolver isso agora
            </a>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
