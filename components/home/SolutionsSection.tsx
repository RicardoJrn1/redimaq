import Image from "next/image"
import AnimatedSection from "@/components/AnimatedSection"
import { whatsappUrl } from "@/lib/site"

const SOLUTIONS = [
  "Linha completa de móveis corporativos",
  "Alta qualidade e durabilidade",
  "Atendimento personalizado",
  "Entrega rápida e gratuita",
]

/** Diferenciais da Redimaq — o "alívio" que responde à seção de problema. */
export default function SolutionsSection() {
  return (
    <AnimatedSection>
      <section className="relative isolate w-full overflow-hidden bg-charcoal py-16 text-cream md:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-[-10%] right-[-10%] h-[420px] w-[420px] rounded-full bg-sand/10 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 md:flex-row md:gap-14">
          <div className="order-2 w-full text-center md:order-1 md:w-1/2 md:text-left">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-cream/50">A solução</p>
            <h2 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight text-balance sm:text-4xl md:text-5xl">
              Tudo o que a <span className="italic text-sand">Redimaq</span> resolve por você
            </h2>

            <ul className="mx-auto mt-8 max-w-md text-left md:mx-0">
              {SOLUTIONS.map((text, index) => (
                <li key={index} className="flex items-center gap-4 border-b border-cream/10 py-3.5">
                  <span aria-hidden="true" className="font-serif text-xl text-sand tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base leading-relaxed text-cream/80 md:text-lg">{text}</p>
                </li>
              ))}
            </ul>

            <a
              href={whatsappUrl("Olá! Gostaria de um orçamento para as soluções da Redimaq.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center justify-center rounded-full bg-cream px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-charcoal transition-all duration-300 hover:scale-105 hover:bg-sand-light hover:shadow-2xl hover:shadow-cream/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream active:scale-95"
            >
              Quero essas soluções
            </a>
          </div>

          <div className="order-1 w-full md:order-2 md:w-1/2">
            <Image
              src="/seção_5.webp"
              alt="Escritório organizado e produtivo"
              width={1280}
              height={853}
              loading="lazy"
              className="aspect-[3/2] w-full rounded-3xl object-cover shadow-2xl shadow-charcoal/40 ring-1 ring-cream/10 md:aspect-auto md:h-140"
              quality={90}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
