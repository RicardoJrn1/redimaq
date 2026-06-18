"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaNewspaper } from "react-icons/fa"
import { SOCIAL_LINKS } from "@/lib/site"

interface HeaderProps {
  /**
   * Quando true, o header sobrepõe um hero escuro: começa transparente (logo
   * branco) e vira vidro fosco creme ao rolar. Quando false (padrão), fica
   * sempre sólido — ideal para páginas sem hero escuro.
   */
  overlay?: boolean
}

/** Cabeçalho fixo monocromático. */
export default function Header({ overlay = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!overlay) return
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20)
        frame = 0
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [overlay])

  // "solid" = aparência sólida (creme). Sem overlay, é sempre sólido.
  const solid = overlay ? scrolled : true

  const iconButtonClass = solid
    ? "text-charcoal border-charcoal/10 hover:bg-charcoal/5"
    : "text-white border-white/25 hover:bg-white/10"

  return (
    <header
      id="inicio"
      className={`${overlay ? "fixed inset-x-0 top-0" : "sticky top-0"} z-50 transition-all duration-500 ${
        solid
          ? "bg-cream/80 backdrop-blur-xl shadow-lg shadow-charcoal/5 border-b border-sand-dark/30"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Scrim para legibilidade do logo/ícones brancos quando transparente */}
      {overlay && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-charcoal/50 to-transparent transition-opacity duration-500 ${
            scrolled ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      <div className="container relative mx-auto px-4">
        <nav className="relative flex items-center justify-between py-3 md:py-4" aria-label="Navegação principal">
          <Link
            href="/"
            aria-label="Redimaq - Voltar para a página inicial"
            className="relative h-10 w-[120px] md:h-12 md:w-[150px] transition-all duration-300 hover:scale-105 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current rounded-lg"
          >
            {/* Crossfade entre logo branco (transparente) e preto (sólido) */}
            <Image
              src="/logo_branca.webp"
              alt="Redimaq Logo"
              fill
              priority
              sizes="(max-width: 768px) 120px, 150px"
              className={`object-contain object-left drop-shadow-lg transition-opacity duration-500 ${
                solid ? "opacity-0" : "opacity-100"
              }`}
            />
            <Image
              src="/logo_preta.webp"
              alt=""
              fill
              aria-hidden="true"
              sizes="(max-width: 768px) 120px, 150px"
              className={`object-contain object-left transition-opacity duration-500 ${
                solid ? "opacity-100" : "opacity-0"
              }`}
            />
          </Link>

          <div className="flex items-center gap-2 md:gap-3" role="list" aria-label="Redes sociais">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                role="listitem"
                className={`group relative grid place-items-center h-10 w-10 md:h-11 md:w-11 rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${iconButtonClass}`}
              >
                <Icon
                  size={17}
                  aria-hidden="true"
                  className="md:w-[19px] md:h-[19px] transition-transform duration-300 group-hover:scale-110"
                />
              </a>
            ))}

            {/* Botão para o Blog */}
            <Link
              href="/redimaqblog"
              aria-label="Ir para o Blog da Redimaq"
              className={`group ml-1 md:ml-2 flex items-center gap-2 rounded-full px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${
                solid
                  ? "bg-charcoal text-cream hover:bg-charcoal-light shadow-md shadow-charcoal/20"
                  : "border border-white/40 text-white backdrop-blur-sm hover:bg-white/10"
              }`}
            >
              <FaNewspaper
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
              <span className="hidden sm:inline">Blog</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
