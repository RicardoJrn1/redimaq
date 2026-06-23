import AnimatedSection from "@/components/AnimatedSection"
import { ImageComparison } from "@/components/ui/image-comparison-slider"

interface Project {
  before: string
  after: string
  alt: string
}

const PROJECTS: Project[] = [
  { before: "/conserto-3-antes.webp", after: "/conserto-4-depois.webp", alt: "cadeira presidente em couro" },
  { before: "/conserto-5-antes.webp", after: "/conserto-6-depois.webp", alt: "cadeira de escritório estofada" },
  { before: "/conserto-7-antes.webp", after: "/conserto-8-depois.webp", alt: "cadeira presidente estofada" },
]

/** Galeria de projetos (antes e depois) com slider de comparação. */
export default function GallerySection() {
  return (
    <AnimatedSection id="galeria">
      <section className="relative isolate w-full overflow-hidden bg-cream py-16 text-charcoal md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-charcoal/70">Antes e depois</p>
            <h2 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight text-balance md:text-5xl">
              Alguns de nossos <span className="italic">projetos</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-charcoal/70 md:text-lg">
              Arraste a alça de cada imagem para comparar o antes e o depois de uma restauração real.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <div key={project.before} className="mx-auto w-full max-w-md lg:max-w-none">
                <ImageComparison
                  beforeImage={project.before}
                  afterImage={project.after}
                  aspectClassName="aspect-[4/5]"
                  altBefore={`Antes do conserto: ${project.alt} desgastada`}
                  altAfter={`Depois do conserto: ${project.alt} restaurada`}
                  className="shadow-xl shadow-charcoal/15 ring-1 ring-sand-dark/40"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
