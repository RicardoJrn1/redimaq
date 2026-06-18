"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FaTable, FaChair, FaBoxes, FaWrench, FaWhatsapp, FaArrowRight } from "react-icons/fa"
import AnimatedSection from "@/components/AnimatedSection"
import { whatsappUrl, AUTOPLAY_MS } from "@/lib/site"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"

interface Product {
  src: string
  label: string
  word: string
  alt: string
  icon: typeof FaChair
  href: string
  /** true = link externo (WhatsApp); false = rota interna do site. */
  external: boolean
  cta: string
}

const PRODUCTS: Product[] = [
  {
    src: "/mesa.webp",
    label: "Mesas",
    word: "MESAS",
    alt: "Mesa de escritório em L",
    icon: FaTable,
    href: whatsappUrl("Olá! Gostaria de solicitar um orçamento para Mesas."),
    external: true,
    cta: "Solicitar orçamento",
  },
  {
    src: "/cadeira-1.webp",
    label: "Cadeiras",
    word: "CADEIRAS",
    alt: "Cadeira de escritório",
    icon: FaChair,
    href: whatsappUrl("Olá! Gostaria de solicitar um orçamento para Cadeiras."),
    external: true,
    cta: "Solicitar orçamento",
  },
  {
    src: "/armarios.webp",
    label: "Armário",
    word: "ARMÁRIO",
    alt: "Armários e lockers",
    icon: FaBoxes,
    href: whatsappUrl("Olá! Gostaria de solicitar um orçamento para Armário."),
    external: true,
    cta: "Solicitar orçamento",
  },
  {
    src: "/cadeira-2.webp",
    label: "Conserto",
    word: "CONSERTO",
    alt: "Conserto de cadeiras de escritório",
    icon: FaWrench,
    href: "/consertodecadeiras",
    external: false,
    cta: "Ver consertos",
  },
]

/**
 * "Nossas Soluções" — palco 3D coverflow (centro/lados/fundo girando entre si),
 * com a palavra gigante do produto atrás, seletor em pílulas e CTA por item.
 * Cada produto é um link próprio (orçamento no WhatsApp ou página de conserto).
 */
export default function ProductsSection() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = PRODUCTS.length
  const reduced = usePrefersReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)

  // Offset lateral menor no mobile p/ os vizinhos só "espreitarem" sem cortar.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const onChange = () => setIsDesktop(mq.matches)
    onChange()
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (paused || reduced) return
    const id = setInterval(() => setActive((p) => (p + 1) % total), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, reduced, total])

  // Posição de cada item conforme a distância até o ativo (centro / lados / fundo).
  const styleFor = (index: number) => {
    let diff = index - active
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    const depth = Math.abs(diff)

    if (depth === 0) return { x: "0%", y: "0%", scale: 1, rotateY: 0, opacity: 1, zIndex: 30, blur: 0 }
    if (depth === 1) {
      const side = diff > 0 ? 1 : -1
      return {
        x: `${side * (isDesktop ? 96 : 60)}%`,
        y: "0%",
        scale: isDesktop ? 0.72 : 0.66,
        rotateY: -side * 30,
        opacity: isDesktop ? 0.65 : 0.5,
        zIndex: 20,
        blur: 0,
      }
    }
    return { x: "0%", y: "-16%", scale: 0.5, rotateY: 0, opacity: 0.45, zIndex: 10, blur: 2 }
  }

  const product = PRODUCTS[active]

  return (
    <AnimatedSection>
      <section id="produtos" className="relative isolate w-full overflow-hidden bg-cream py-16 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-20 bg-gradient-to-b from-charcoal/10 to-transparent"
        />
        {/* Spotlight quente */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sand/30 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-charcoal/70">O que oferecemos</p>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-charcoal text-balance sm:text-4xl md:text-5xl">
            Nossas <span className="italic text-sand-dark">Soluções</span>
          </h2>

          {/* Palco: palavra gigante atrás + coverflow 3D */}
          <div
            className="relative mt-6 md:mt-10"
            role="group"
            aria-roledescription="carrossel"
            aria-label="Carrossel de produtos"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Nome do produto em marca-d'água (atrás) */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={product.word}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                  className="select-none whitespace-nowrap font-serif text-[clamp(3rem,15vw,11rem)] font-medium leading-none text-charcoal/[0.06]"
                >
                  {product.word}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Coverflow 3D */}
            <div
              className="relative z-10 grid h-[300px] place-items-center md:h-[440px]"
              style={{ perspective: "1200px" }}
            >
              {PRODUCTS.map((p, index) => {
                const s = styleFor(index)
                const isCenter = index === active
                const linkClass = `relative block aspect-[2/3] w-36 cursor-pointer rounded-2xl transition-[opacity,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal md:w-56 ${
                  isCenter ? "drop-shadow-2xl" : "drop-shadow-xl hover:scale-[1.03] hover:opacity-90"
                }`
                const img = (
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 144px, 224px"
                    className="object-contain"
                    draggable={false}
                    priority={isCenter}
                    loading={isCenter ? undefined : "lazy"}
                  />
                )
                // Clicar num item lateral o traz ao centro; o central segue o link.
                const onClick = (e: { preventDefault: () => void }) => {
                  if (!isCenter) {
                    e.preventDefault()
                    setActive(index)
                  }
                }

                return (
                  <motion.div
                    key={p.src}
                    className={`[grid-area:1/1] ${s.blur ? "blur-[2px]" : ""}`}
                    style={{ zIndex: s.zIndex }}
                    animate={{ x: s.x, y: s.y, scale: s.scale, rotateY: s.rotateY, opacity: s.opacity }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  >
                    {p.external ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClick}
                        aria-label={
                          isCenter ? `${p.label} — solicitar orçamento no WhatsApp` : `Trazer ${p.label} para o centro`
                        }
                        className={linkClass}
                      >
                        {img}
                      </a>
                    ) : (
                      <Link
                        href={p.href}
                        onClick={onClick}
                        aria-label={isCenter ? `${p.label} — ver página de consertos` : `Trazer ${p.label} para o centro`}
                        className={linkClass}
                      >
                        {img}
                      </Link>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Nome do produto ativo */}
          <div className="relative mt-4 flex h-10 items-center justify-center" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              <motion.p
                key={product.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="font-serif text-2xl text-charcoal md:text-3xl"
              >
                {product.label}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Seletor de produtos */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {PRODUCTS.map((p, i) => {
              const Icon = p.icon
              const isActive = i === active
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal ${
                    isActive
                      ? "bg-charcoal text-cream shadow-lg shadow-charcoal/20"
                      : "border border-charcoal/15 text-charcoal/70 hover:border-charcoal/40 hover:text-charcoal"
                  }`}
                >
                  <Icon aria-hidden="true" /> {p.label}
                </button>
              )
            })}
          </div>

          {/* CTA do produto ativo */}
          <div className="mt-8 flex h-12 justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {product.external ? (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-charcoal px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream transition-all duration-300 hover:scale-105 hover:bg-charcoal-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal active:scale-95"
                  >
                    <FaWhatsapp aria-hidden="true" /> {product.cta}
                  </a>
                ) : (
                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-2 rounded-full bg-charcoal px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream transition-all duration-300 hover:scale-105 hover:bg-charcoal-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal active:scale-95"
                  >
                    {product.cta} <FaArrowRight aria-hidden="true" size={12} />
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
