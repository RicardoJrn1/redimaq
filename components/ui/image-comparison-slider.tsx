"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

export interface ImageComparisonProps {
  /** Imagem revelada à esquerda (estado "antes"). */
  beforeImage: string
  /** Imagem revelada à direita (estado "depois"). */
  afterImage: string
  altBefore?: string
  altAfter?: string
  labelBefore?: string
  labelAfter?: string
  /** Proporção do quadro (classe Tailwind `aspect-*`). Padrão: retrato 3/4. */
  aspectClassName?: string
  /** Classe extra para o contêiner externo. */
  className?: string
  /** Repassa `priority` ao next/image (use true acima da dobra). */
  priority?: boolean
}

/**
 * Slider de comparação "antes / depois": a imagem "depois" fica por baixo
 * (visível à direita) e a "antes" por cima, recortada à esquerda conforme a
 * posição. Arraste com o mouse/dedo ou use as setas do teclado. Pointer Events
 * unificam mouse e toque; `touch-pan-y` preserva o scroll vertical no mobile.
 */
export function ImageComparison({
  beforeImage,
  afterImage,
  altBefore = "Antes",
  altAfter = "Depois",
  labelBefore = "Antes",
  labelAfter = "Depois",
  aspectClassName = "aspect-[3/4]",
  className = "",
  priority = false,
}: ImageComparisonProps) {
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const move = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.max(0, Math.min(100, next)))
  }, [])

  // Enquanto arrasta, escuta no window para o gesto continuar fora do quadro.
  useEffect(() => {
    if (!isDragging) return
    const onMove = (e: PointerEvent) => move(e.clientX)
    const onUp = () => setIsDragging(false)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
    }
  }, [isDragging, move])

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    // No mouse, clicar já posiciona. No toque, espera o arrasto horizontal para
    // não "pular" caso o gesto seja, na verdade, um scroll vertical da página.
    if (e.pointerType === "mouse") move(e.clientX)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      setPosition((p) => Math.max(0, p - 4))
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      setPosition((p) => Math.min(100, p + 4))
    } else if (e.key === "Home") {
      e.preventDefault()
      setPosition(0)
    } else if (e.key === "End") {
      e.preventDefault()
      setPosition(100)
    }
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      className={`relative w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-3xl ${aspectClassName} ${className}`}
    >
      {/* DEPOIS — camada de baixo, ocupa o quadro inteiro (visível à direita). */}
      <Image
        src={afterImage}
        alt={altAfter}
        fill
        priority={priority}
        draggable={false}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="pointer-events-none object-cover"
      />

      {/* ANTES — camada de cima, recortada à esquerda conforme a posição. */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image
          src={beforeImage}
          alt={altBefore}
          fill
          priority={priority}
          draggable={false}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="pointer-events-none object-cover"
        />
      </div>

      {/* Rótulos nos cantos */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-charcoal/70 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-cream backdrop-blur-sm">
        {labelBefore}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-charcoal/70 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-cream backdrop-blur-sm">
        {labelAfter}
      </span>

      {/* Linha divisória + manopla */}
      <div
        className="absolute inset-y-0 w-0.5 bg-cream/80"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Comparar antes e depois — use as setas para mover"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% revelando o antes`}
          onKeyDown={onKeyDown}
          className={`absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream text-charcoal shadow-xl shadow-charcoal/40 transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream ${
            isDragging ? "scale-110" : ""
          }`}
        >
          <div className="flex items-center" aria-hidden="true">
            <FaChevronLeft className="h-3 w-3" />
            <FaChevronRight className="-ml-0.5 h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  )
}
