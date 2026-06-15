import AnimatedSection from "@/components/AnimatedSection"
import { CONTACT_INFO, MAPS_EMBED_URL } from "@/lib/site"

/** Seção "Onde nos encontrar" com o mapa do Google. */
export default function LocationSection() {
  return (
    <AnimatedSection>
      <section id="contato" className="w-full py-10 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Onde nos encontrar</h2>
          <p className="text-sm md:text-lg text-black/70 mb-6 md:mb-12">{CONTACT_INFO.address}</p>
          <div className="w-full max-w-5xl mx-auto rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-black/10">
            <iframe
              src={MAPS_EMBED_URL}
              width="100%"
              height="350"
              className="md:h-[450px]"
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
