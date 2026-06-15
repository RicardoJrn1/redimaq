import AnimatedSection from "@/components/AnimatedSection"
import { CONTACT_INFO, MAPS_EMBED_URL } from "@/lib/site"

/** Seção "Onde nos encontrar" da página de conserto. */
export default function LocationSection() {
  return (
    <AnimatedSection>
      <section className="w-full py-16 bg-gray-50 text-black text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Onde nos encontrar</h2>
          <p className="text-sm md:text-lg text-black/70 mb-6 md:mb-12">{CONTACT_INFO.address}</p>
          <div className="max-w-4xl mx-auto mb-8 overflow-hidden rounded-2xl shadow-2xl">
            <iframe
              src={MAPS_EMBED_URL}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Redimaq no Google Maps"
            ></iframe>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
