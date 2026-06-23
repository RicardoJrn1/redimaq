import Image from "next/image"
import AnimatedSection from "@/components/AnimatedSection"
import { whatsappUrl } from "@/lib/site"

const CONSEQUENCES = [
  "Riscos à saúde e à segurança da equipe.",
  "Queda na produtividade e no bem-estar.",
  "Desvalorização do patrimônio da empresa.",
  "Troca completa no futuro — muito mais cara.",
]

/** Seção "Adiar o conserto só piora a situação" (dor / urgência). */
export default function DelaySection() {
  return (
    <AnimatedSection>
      <section className="relative isolate w-full overflow-hidden bg-cream py-16 text-charcoal md:py-28">
        <div className="container mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 md:flex-row md:gap-14">
          {/* Imagem (card "antes / depois" da Redimaq — exibido inteiro, sem corte) */}
          <div className="order-2 w-full md:order-1 md:w-1/2">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-2xl shadow-charcoal/20 ring-1 ring-charcoal/10">
              <Image
                src="/conserto-card.webp"
                alt="Antes e depois real de uma cadeira de escritório restaurada pela Redimaq"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
          </div>

          {/* Texto */}
          <div className="order-1 w-full text-center md:order-2 md:w-1/2 md:text-left">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-charcoal/70">Não deixe para depois</p>
            <h2 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight text-balance sm:text-4xl md:text-5xl">
              Adiar o conserto só <span className="italic">piora</span> a situação
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-charcoal/70 md:mx-0 md:text-lg">
              Uma cadeira danificada não se resolve sozinha. Quanto mais tempo passa, maior o estrago — e mais caro fica
              para recuperar.
            </p>

            <ul className="mx-auto mt-8 max-w-md text-left md:mx-0">
              {CONSEQUENCES.map((text) => (
                <li key={text} className="flex items-start gap-3 border-b border-sand-dark/30 py-3.5">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sand-dark" />
                  <p className="text-base leading-relaxed text-charcoal/80 md:text-lg">{text}</p>
                </li>
              ))}
            </ul>

            <a
              href={whatsappUrl("Olá! Tenho uma cadeira para consertar e gostaria de um orçamento.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center justify-center rounded-full bg-charcoal px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream transition-all duration-300 hover:scale-105 hover:bg-charcoal-light hover:shadow-2xl hover:shadow-charcoal/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal active:scale-95"
            >
              Corrigir isso com a Redimaq
            </a>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
