import { FaWhatsapp } from "react-icons/fa"
import AnimatedSection from "@/components/AnimatedSection"
import { CONTACT_INFO, MAPS_EMBED_URL, whatsappUrl } from "@/lib/site"

const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CONTACT_INFO.address)}`

/** Seção "Onde nos encontrar": detalhes de contato + mapa. */
export default function LocationSection() {
  return (
    <AnimatedSection>
      <section className="relative isolate w-full overflow-hidden bg-cream py-16 text-charcoal md:py-28">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-14">
          {/* Detalhes */}
          <div className="text-center md:text-left">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-charcoal/70">Onde nos encontrar</p>
            <h2 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight text-balance md:text-5xl">
              Venha nos <span className="italic">visitar</span>
            </h2>

            <dl className="mx-auto mt-8 max-w-md space-y-5 text-left md:mx-0">
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.2em] text-charcoal/70">Endereço</dt>
                <dd className="mt-1 text-base leading-relaxed text-charcoal/80">{CONTACT_INFO.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.2em] text-charcoal/70">Telefone</dt>
                <dd className="mt-1 text-base text-charcoal/80">{CONTACT_INFO.phone}</dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row md:items-start">
              <a
                href={whatsappUrl("Olá! Gostaria de falar com a Redimaq sobre conserto de cadeiras.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream transition-all duration-300 hover:scale-105 hover:bg-charcoal-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal active:scale-95"
              >
                <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                Chamar no WhatsApp
              </a>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-charcoal/20 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-charcoal transition-all duration-300 hover:bg-sand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
              >
                Como chegar
              </a>
            </div>
          </div>

          {/* Mapa */}
          <div className="overflow-hidden rounded-3xl shadow-2xl shadow-charcoal/20 ring-1 ring-sand-dark/40">
            <iframe
              src={MAPS_EMBED_URL}
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Redimaq no Google Maps"
              className="block grayscale transition-all duration-500 hover:grayscale-0"
            />
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
