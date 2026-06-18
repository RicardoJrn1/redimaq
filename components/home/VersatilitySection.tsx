"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { FaBriefcase, FaBookOpen, FaGamepad, FaWhatsapp } from "react-icons/fa"
import AnimatedSection from "@/components/AnimatedSection"
import { whatsappUrl, AUTOPLAY_MS } from "@/lib/site"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"

interface Mode {
  src: string
  label: string
  word: string
  message: string
  icon: typeof FaBriefcase
  alt: string
}

const MODES: Mode[] = [
  {
    src: "/cadeira-3.webp",
    label: "Trabalhar",
    word: "TRABALHAR",
    message: "Ideal para trabalhar!",
    icon: FaBriefcase,
    alt: "Cadeira de escritório vista de frente",
  },
  {
    src: "/cadeira-4.webp",
    label: "Estudar",
    word: "ESTUDAR",
    message: "Para estudar",
    icon: FaBookOpen,
    alt: "Cadeira de escritório vista de trás",
  },
  {
    src: "/cadeira-5.webp",
    label: "Jogar",
    word: "JOGAR",
    message: "Para jogar",
    icon: FaGamepad,
    alt: "Cadeira de escritório vista de lado",
  },
]

/**
 * "Versatilidade" — uma cadeira, vários ritmos. A mesma cadeira aparece em
 * ângulos diferentes (frente/trás/lado), trocando entre os modos
 * Trabalhar / Estudar / Jogar. Alterna sozinho e pausa no hover.
 */
export default function VersatilitySection() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = MODES.length
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (paused || reduced) return
    const id = setInterval(() => setActive((p) => (p + 1) % total), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, reduced, total])

  const mode = MODES[active]

  return (
    <AnimatedSection>
      <section className="relative isolate w-full overflow-hidden bg-cream py-16 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-20 bg-gradient-to-b from-charcoal/10 to-transparent"
        />
        {/* Spotlight quente */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sand/30 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-charcoal/70">Uma cadeira, cada momento</p>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-charcoal text-balance sm:text-4xl md:text-5xl">
            Versatilidade que acompanha seu <span className="italic text-sand-dark">ritmo</span>
          </h2>

          {/* Palco: palavra gigante atrás + cadeira trocando de ângulo */}
          <div
            className="relative mt-6 flex items-center justify-center md:mt-10"
            role="group"
            aria-roledescription="carrossel"
            aria-label="Cadeira em diferentes modos de uso"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Palavra do modo em marca-d'água */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={mode.word}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                  className="select-none whitespace-nowrap font-serif text-[clamp(3rem,15vw,11rem)] font-medium leading-none text-charcoal/[0.06]"
                >
                  {mode.word}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Cadeira (crossfade entre ângulos) */}
            <div className="relative z-10 h-[260px] w-full max-w-2xl md:h-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode.src}
                  initial={{ opacity: 0, x: 36 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -36 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={mode.src}
                    alt={mode.alt}
                    fill
                    sizes="(max-width: 768px) 90vw, 672px"
                    className="object-contain drop-shadow-2xl"
                    priority={active === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mensagem do modo */}
          <div className="relative mt-4 flex h-10 items-center justify-center" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              <motion.p
                key={mode.message}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="font-serif text-2xl text-charcoal md:text-3xl"
              >
                {mode.message}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Seletor de modos */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {MODES.map((m, i) => {
              const Icon = m.icon
              const isActive = i === active
              return (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal ${
                    isActive
                      ? "bg-charcoal text-cream shadow-lg shadow-charcoal/20"
                      : "border border-charcoal/15 text-charcoal/70 hover:border-charcoal/40 hover:text-charcoal"
                  }`}
                >
                  <Icon aria-hidden="true" /> {m.label}
                </button>
              )
            })}
          </div>

          {/* CTA principal */}
          <a
            href={whatsappUrl("Olá! Gostaria de conhecer as cadeiras da Redimaq.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-charcoal px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream transition-all duration-300 hover:scale-105 hover:bg-charcoal-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal active:scale-95"
          >
            <FaWhatsapp aria-hidden="true" /> Quero essa cadeira
          </a>
        </div>
      </section>
    </AnimatedSection>
  )
}
