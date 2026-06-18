import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa"
import AnimatedSection from "@/components/AnimatedSection"
import { CONTACT_INFO, MAPS_EMBED_URL, whatsappUrl } from "@/lib/site"

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CONTACT_INFO.address)}`

/** Seção "Onde nos encontrar": contato à esquerda e mapa do Google à direita. */
export default function LocationSection() {
  return (
    <AnimatedSection>
      <section id="contato" className="relative w-full overflow-hidden bg-cream py-16 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-20 bg-gradient-to-b from-charcoal/10 to-transparent"
        />
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Contato */}
            <div className="text-center lg:text-left">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-charcoal/70">
                Onde nos encontrar
              </p>
              <h2 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight text-charcoal text-balance sm:text-4xl md:text-5xl">
                Venha conhecer a <span className="italic text-sand-dark">Redimaq</span>
              </h2>

              <ul className="mx-auto mt-8 max-w-md space-y-5 text-left lg:mx-0">
                <li className="flex items-start gap-4">
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-charcoal text-cream">
                    <FaMapMarkerAlt aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/70">Endereço</p>
                    <p className="text-base text-charcoal/80">{CONTACT_INFO.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-charcoal text-cream">
                    <FaPhoneAlt aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/70">Telefone</p>
                    <a
                      href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                      className="text-base text-charcoal/80 transition-colors hover:text-charcoal"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <a
                  href={whatsappUrl("Olá! Gostaria de mais informações e um orçamento.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream transition-all duration-300 hover:scale-105 hover:bg-charcoal-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal active:scale-95"
                >
                  <FaWhatsapp aria-hidden="true" /> Falar no WhatsApp
                </a>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-charcoal/20 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-charcoal transition-all duration-300 hover:scale-105 hover:bg-charcoal/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal active:scale-95"
                >
                  Como chegar
                </a>
              </div>
            </div>

            {/* Mapa (leve dessaturação para combinar com a paleta) */}
            <div className="overflow-hidden rounded-3xl shadow-2xl shadow-charcoal/10 ring-1 ring-sand-dark/30">
              <iframe
                src={MAPS_EMBED_URL}
                width="100%"
                height="100%"
                className="h-[320px] w-full grayscale-[0.3] contrast-[1.05] md:h-[460px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Redimaq no Google Maps"
              />
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
