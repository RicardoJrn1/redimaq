import Image from "next/image"
import AnimatedSection from "@/components/AnimatedSection"

const GALLERY_IMAGES = ["/conserto_4.webp", "/conserto_5.webp"]

/** Galeria de projetos (antes e depois) de cadeiras consertadas. */
export default function GallerySection() {
  return (
    <AnimatedSection id="galeria">
      <section className="w-full py-16 bg-gray-50 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-10 text-balance">Alguns de nossos projetos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {GALLERY_IMAGES.map((src, index) => (
              <div key={index} className="relative h-70 w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Exemplo de cadeira consertada ${index + 1}`}
                  fill
                  loading="lazy"
                  className={`object-cover ${src === "/conserto_5.webp" ? "object-center" : ""}`}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xl font-semibold">Antes e Depois</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
