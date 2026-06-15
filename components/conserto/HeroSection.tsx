"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import AnimatedSection from "@/components/AnimatedSection"
import { whatsappUrl } from "@/lib/site"

const BEFORE_AFTER_IMAGES = ["/conserto_2.webp", "/conserto_3.webp"]

/** Hero da página de conserto com alternância automática "antes e depois". */
export default function HeroSection() {
  const [activeImage, setActiveImage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % BEFORE_AFTER_IMAGES.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <AnimatedSection>
      <section className="w-full bg-white text-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(125,211,252,0.15),rgba(255,255,255,0))]">
        <div className="container mx-auto px-4 py-16 md:py-8 flex flex-col md:flex-row items-center gap-12">
          {/* Coluna de Texto */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-gray-900 text-balance">
              Cadeiras quebradas não precisam mais travar seu dia
            </h1>
            <p className="text-lg lg:text-xl max-w-xl mx-auto md:mx-0 mb-8 text-gray-600">
              Enquanto você cuida da operação do escritório, nós cuidamos das cadeiras. Conserto ágil, retirada no
              local e entrega com garantia.
            </p>
            <a
              href={whatsappUrl("Olá! Gostaria de um orçamento para conserto de cadeiras.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-black text-white text-lg font-bold rounded-full transition-all duration-300 shadow-lg shadow-gray-900/20 hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95"
            >
              Solicitar Orçamento via WhatsApp
            </a>
          </div>

          {/* Coluna de Imagens (Antes e Depois) */}
          <div
            className="md:w-1/2 w-full max-w-md md:max-w-none aspect-square relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {BEFORE_AFTER_IMAGES.map((src, index) => {
              const isActive = index === activeImage
              const label = index === 0 ? "Antes" : "Depois"
              return (
                <div
                  key={src}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100" : "opacity-0"}`}
                  aria-hidden={!isActive}
                >
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Exemplo de cadeira ${label} do conserto`}
                    fill
                    className="object-cover"
                    priority={index < 2}
                  />
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
                    {label}
                  </div>
                </div>
              )
            })}
            <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-full">
              <div
                className={`h-full bg-white transition-all duration-[3s] ease-linear ${isPaused ? "" : "w-full"}`}
                style={{ width: isPaused ? "100%" : "0%" }}
                key={activeImage}
              />
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
