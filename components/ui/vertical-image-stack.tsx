"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { FaTimes, FaPause } from "react-icons/fa"
import Image from "next/image"

export interface StackImage {
  id: number | string
  src: string
  alt: string
}

interface VerticalImageStackProps {
  images: StackImage[]
  /** Avança automaticamente entre as imagens. */
  autoPlay?: boolean
  /** Intervalo do autoplay em ms. */
  interval?: number
  className?: string
}

/**
 * Pilha de imagens em "baralho":
 * - arrastar (horizontal) ou dots para trocar
 * - autoplay que pausa no hover (com badge "Pausado")
 * - clique abre a imagem em lightbox com fundo embaçado
 */
export function VerticalImageStack({
  images,
  autoPlay = true,
  interval = 4500,
  className = "",
}: VerticalImageStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [lightbox, setLightbox] = useState<StackImage | null>(null)
  const lastNavigationTime = useRef(0)
  const navigationCooldown = 400

  const paused = hovered || dragging || lightbox !== null

  const navigate = useCallback(
    (newDirection: number) => {
      const now = Date.now()
      if (now - lastNavigationTime.current < navigationCooldown) return
      lastNavigationTime.current = now

      setCurrentIndex((prev) => {
        if (newDirection > 0) {
          return prev === images.length - 1 ? 0 : prev + 1
        }
        return prev === 0 ? images.length - 1 : prev - 1
      })
    },
    [images.length],
  )

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragging(false)
    const threshold = 50
    // Apenas horizontal: gestos verticais continuam rolando a página no mobile.
    if (info.offset.x < -threshold) {
      navigate(1)
    } else if (info.offset.x > threshold) {
      navigate(-1)
    }
  }

  // Autoplay (pausa no hover / arraste / lightbox aberto).
  useEffect(() => {
    if (!autoPlay || paused || images.length < 2) return
    const id = setInterval(() => navigate(1), interval)
    return () => clearInterval(id)
  }, [autoPlay, paused, interval, navigate, images.length])

  // Fecha o lightbox com ESC e trava o scroll do fundo enquanto aberto.
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null)
    }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [lightbox])

  const getCardStyle = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    const depth = Math.abs(diff)

    if (depth === 0) return { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0, zIndex: 30 }
    if (depth === 1) return { x: 20, y: -24, scale: 0.94, opacity: 0.65, rotate: 3, zIndex: 20 }
    if (depth === 2) return { x: 38, y: -44, scale: 0.88, opacity: 0.35, rotate: 5, zIndex: 10 }
    return { x: 56, y: -62, scale: 0.82, opacity: 0, rotate: 6, zIndex: 0 }
  }

  const isVisible = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return Math.abs(diff) <= 2
  }

  return (
    <div className={`relative flex h-full w-full flex-col items-center justify-center gap-5 ${className}`}>
      {/* Pilha de cards (formato landscape p/ as imagens largas com texto) */}
      <div
        className="relative flex aspect-[1600/667] w-[80vw] max-w-[400px] items-center justify-center sm:w-[480px] sm:max-w-none lg:w-[660px]"
        style={{ perspective: "1200px" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {images.map((image, index) => {
          if (!isVisible(index)) return null
          const style = getCardStyle(index)
          const isCurrent = index === currentIndex

          return (
            <motion.div
              key={image.id}
              className="absolute cursor-pointer active:cursor-grabbing"
              animate={{
                x: style.x,
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                rotate: style.rotate,
                zIndex: style.zIndex,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
              drag={isCurrent ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragStart={() => setDragging(true)}
              onDragEnd={handleDragEnd}
              onTap={() => (isCurrent ? setLightbox(image) : setCurrentIndex(index))}
              style={{ zIndex: style.zIndex }}
            >
              <div className="relative aspect-[1600/667] w-[80vw] max-w-[400px] overflow-hidden rounded-2xl bg-charcoal-light shadow-2xl shadow-black/50 ring-1 ring-white/15 sm:w-[480px] sm:max-w-none lg:w-[660px]">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 480px, 660px"
                  className="object-contain"
                  draggable={false}
                  priority={isCurrent}
                />
              </div>
            </motion.div>
          )
        })}

        {/* Badge "Pausado" no hover */}
        <AnimatePresence>
          {autoPlay && hovered && images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute left-1/2 top-3 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-charcoal/70 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-cream backdrop-blur-md"
            >
              <FaPause className="h-2.5 w-2.5" aria-hidden="true" />
              Pausado
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dots de navegação */}
      <div className="flex items-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-6 bg-cream" : "w-2 bg-cream/30 hover:bg-cream/50"
            }`}
            aria-label={`Ir para imagem ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          />
        ))}
      </div>

      {/* Lightbox com fundo embaçado */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.alt}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative z-10 w-[92vw] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative w-full overflow-hidden rounded-2xl bg-charcoal shadow-2xl ring-1 ring-white/15"
                style={{ aspectRatio: "1600 / 667" }}
              >
                <Image src={lightbox.src} alt={lightbox.alt} fill sizes="92vw" className="object-contain" />
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -right-3 -top-3 grid h-10 w-10 place-items-center rounded-full bg-cream text-charcoal shadow-lg transition-transform duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                aria-label="Fechar imagem"
              >
                <FaTimes />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
