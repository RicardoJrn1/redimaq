import Image from "next/image"
import Link from "next/link"

interface Category {
  src: string
  title: string
  alt: string
  href?: string
}

const CATEGORIES: Category[] = [
  {
    src: "/mesa.webp",
    title: "Mesas",
    alt: "Mesa de escritório",
  },
  {
    src: "/cadeira.webp",
    title: "Cadeiras",
    alt: "Cadeira de escritório ergonômica",
  },
  {
    src: "/armario.webp",
    title: "Armários",
    alt: "Armário de escritório",
  },
  {
    src: "/conserto.webp",
    title: "Consertos",
    alt: "Serviço de conserto de móveis de escritório",
    href: "/consertodecadeiras",
  },
]

/** Grade de categorias de produtos/soluções da Redimaq. */
export default function ProductsSection() {
  return (
    <section id="produtos" className="w-full py-10 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 md:mb-12 text-balance">
          Nossas Soluções
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {CATEGORIES.map((category, index) => {
            const cardContent = (
              <div
                style={{ animationDelay: `${index * 100}ms` }}
                className="group relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-in fade-in zoom-in h-full"
              >
                <Image
                  src={category.src || "/placeholder.svg"}
                  alt={category.alt}
                  width={400}
                  height={400}
                  loading={index < 2 ? undefined : "lazy"}
                  priority={index < 2}
                  className="object-cover w-full h-80 transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-start p-6 transition-all duration-300 group-hover:from-black/80">
                  <h3 className="text-white text-3xl font-bold transform transition-transform duration-300 group-hover:-translate-y-2 drop-shadow-lg">
                    {category.title}
                  </h3>
                </div>
              </div>
            )

            return (
              <div key={index}>
                {category.href ? <Link href={category.href}>{cardContent}</Link> : cardContent}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
