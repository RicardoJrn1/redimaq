"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FaChevronLeft, FaChevronRight, FaWhatsapp, FaArrowRight } from "react-icons/fa"
import { whatsappUrl, AUTOPLAY_MS } from "@/lib/site"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"

interface Product {
  src: string
  title: string
  alt: string
  href: string
  /** true = link externo (WhatsApp); false = rota interna do site. */
  external: boolean
  cta: string
}

// Editável: títulos, destinos e ordem.
const PRODUCTS: Product[] = [
  {
    src: "/mesa.webp",
    title: "Mesas",
    alt: "Mesa de escritório em L",
    href: whatsappUrl("Olá! Gostaria de solicitar um orçamento para Mesas."),
    external: true,
    cta: "Solicitar orçamento",
  },
  {
    src: "/cadeira-1.webp",
    title: "Cadeiras",
    alt: "Cadeira de escritório",
    href: whatsappUrl("Olá! Gostaria de solicitar um orçamento para Cadeiras."),
    external: true,
    cta: "Solicitar orçamento",
  },
  {
    src: "/armarios.webp",
    title: "Armário",
    alt: "Armários e lockers",
    href: whatsappUrl("Olá! Gostaria de solicitar um orçamento para Armário."),
    external: true,
    cta: "Solicitar orçamento",
  },
  {
    src: "/cadeira-2.webp",
    title: "Conserto",
    alt: "Conserto de cadeiras de escritório",
    href: "/consertodecadeiras",
    external: false,
    cta: "Ver consertos",
  },
]

/**
 * "Nossas Soluções" — coverflow 3D giratório: item central em destaque, um de
 * cada lado e o quarto ao fundo. Gira sozinho (pausa no hover p/ facilitar o
 * clique) e cada imagem é um link próprio (orçamento no WhatsApp / consertos).
 */
export default function ProductsSection() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = PRODUCTS.length
  const reduced = usePrefersReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)

  // Offset lateral menor no mobile p/ os vizinhos só "espreitarem" sem serem cortados.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const onChange = () => setIsDesktop(mq.matches)
    onChange()
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const go = useCallback((dir: number) => setActive((p) => (p + dir + total) % total), [total])

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

  const activeProduct = PRODUCTS[active]

  return (
    <section id="produtos" className="relative isolate w-full overflow-hidden bg-cream py-16 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-20 bg-gradient-to-b from-charcoal/10 to-transparent"
      />
      {/* Spotlight quente atrás do item central */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sand/30 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-charcoal/70">O que oferecemos</p>
        <h2 className="font-serif text-3xl font-medium tracking-tight text-charcoal text-balance sm:text-4xl md:text-5xl">
          Nossas <span className="italic text-sand-dark">Soluções</span>
        </h2>

        {/* Palco 3D — gira sozinho e pausa no hover */}
        <div
          className="relative mt-8 grid h-[260px] place-items-center md:mt-12 md:h-[380px]"
          style={{ perspective: "1200px" }}
          role="group"
          aria-roledescription="carrossel"
          aria-label="Carrossel de produtos"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {PRODUCTS.map((product, index) => {
            const s = styleFor(index)
            const isCenter = index === active
            const linkClass = `relative block aspect-[2/3] w-36 cursor-pointer rounded-2xl transition-[opacity,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal md:w-60 ${
              isCenter ? "drop-shadow-2xl" : "drop-shadow-xl hover:scale-[1.03] hover:opacity-90"
            }`
            const img = (
              <Image
                src={product.src}
                alt={product.alt}
                fill
                sizes="(max-width: 768px) 144px, 240px"
                className="object-contain"
                draggable={false}
                priority={isCenter}
                loading={isCenter ? undefined : "lazy"}
              />
            )

            return (
              <motion.div
                key={product.src}
                className={`[grid-area:1/1] ${s.blur ? "blur-[2px]" : ""}`}
                style={{ zIndex: s.zIndex }}
                animate={{ x: s.x, y: s.y, scale: s.scale, rotateY: s.rotateY, opacity: s.opacity }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
              >
                {product.external ? (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${product.title} — solicitar orçamento no WhatsApp`}
                    className={linkClass}
                  >
                    {img}
                  </a>
                ) : (
                  <Link href={product.href} aria-label={`${product.title} — ver página de consertos`} className={linkClass}>
                    {img}
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Nome do item ativo */}
        <div className="relative mx-auto mt-2 flex h-10 items-center justify-center" aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait">
            <motion.h3
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="font-serif text-2xl text-charcoal md:text-3xl"
            >
              {activeProduct.title}
            </motion.h3>
          </AnimatePresence>
        </div>

        {/* CTA do item ativo */}
        <div className="mt-4 flex h-12 justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {activeProduct.external ? (
                <a
                  href={activeProduct.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-charcoal px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream transition-all duration-300 hover:scale-105 hover:bg-charcoal-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal active:scale-95"
                >
                  <FaWhatsapp aria-hidden="true" /> {activeProduct.cta}
                </a>
              ) : (
                <Link
                  href={activeProduct.href}
                  className="inline-flex items-center gap-2 rounded-full bg-charcoal px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream transition-all duration-300 hover:scale-105 hover:bg-charcoal-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal active:scale-95"
                >
                  {activeProduct.cta} <FaArrowRight aria-hidden="true" size={12} />
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controles de rotação */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Item anterior"
            className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/15 text-charcoal transition-all duration-300 hover:scale-110 hover:bg-charcoal hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal md:h-10 md:w-10"
          >
            <FaChevronLeft size={14} />
          </button>

          <div className="flex items-center gap-2">
            {PRODUCTS.map((product, i) => (
              <button
                key={product.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ir para ${product.title}`}
                aria-current={i === active}
                className={`relative h-2 rounded-full transition-all duration-300 before:absolute before:left-1/2 before:top-1/2 before:h-11 before:w-11 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] ${
                  i === active ? "w-6 bg-charcoal" : "w-2 bg-charcoal/25 hover:bg-charcoal/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próximo item"
            className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/15 text-charcoal transition-all duration-300 hover:scale-110 hover:bg-charcoal hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal md:h-10 md:w-10"
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}
