"use client"

import type React from "react"
import Image from "next/image"
import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaChevronLeft,
  FaChevronRight,
  FaTimesCircle,
  FaPhoneAlt,
  FaNewspaper,
} from "react-icons/fa"
import Link from "next/link"
import { useState, useEffect, useCallback, useRef } from "react"

interface Logo {
  src: string
  alt: string
}

interface Category {
  src: string
  title: string
  alt: string
  href?: string
}

interface SocialLink {
  href: string
  icon: typeof FaWhatsapp
  label: string
  hoverColor: string
}

interface FooterLink {
  href: string
  label: string
}

interface ContactInfo {
  address: string
  phone: string
}

const CAROUSEL_IMAGES = ["/seção_1.webp", "/seção_01.webp"]
const AUTO_PLAY_INTERVAL = 5000

const CLIENT_LOGOS: Logo[] = Array.from({ length: 11 }, (_, i) => ({
  src: `/marca_${i + 1}.webp`,
  alt: `Logo do Cliente ${i + 1}`,
}))

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

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    href: `https://wa.me/5546984018404?text=${encodeURIComponent("Olá! Gostaria de fazer um orçamento.")}`,
    icon: FaWhatsapp, label: "Link para o WhatsApp", hoverColor: "hover:text-green-400",
  },
  {
    href: "https://www.instagram.com/redimaqequipamentos",
    icon: FaInstagram,
    label: "Link para o Instagram",
    hoverColor: "hover:text-pink-400",
  },
  {
    href: "https://www.linkedin.com/company/redimaq-móveis-para-escritório/posts/",
    icon: FaLinkedin,
    label: "Link para o LinkedIn",
    hoverColor: "hover:text-blue-400",
  },
] as const

const FOOTER_LINKS: FooterLink[] = [
  { href: "#inicio", label: "Início" },
  { href: "#produtos", label: "Produtos" },
  { href: "#sobre-nos", label: "Sobre Nós" },
  { href: "/consertodecadeiras", label: "Consertos" },
  { href: "/redimaqblog", label: "Blog" },
]

const CONTACT_INFO: ContactInfo = {
  address: "R. Caramuru, 167 - Centro, Pato Branco - PR, 85501-064",
  phone: "(46) 98401-8404",
}

const currentYear = new Date().getFullYear()

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_IMAGES.length)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentImageIndex(index)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (href === "#inicio") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      const targetId = href.replace("#", "")
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        const headerHeight = headerRef.current?.offsetHeight || 0
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerHeight - 20

        window.scrollTo({ top: offsetPosition, behavior: "smooth" })
      }
    }
  }

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(goToNext, AUTO_PLAY_INTERVAL)
    return () => clearInterval(interval)
  }, [goToNext, isPaused])

  return (
    <>
      {/* Seção 1 - Header */}
      <header
        ref={headerRef}
        id="inicio"
        className="sticky top-0 z-50 backdrop-blur-xl bg-black/95 shadow-2xl animate-in fade-in slide-in-from-top duration-700"
      >
        <div className="container mx-auto px-4">
          <nav className="relative flex items-center justify-between py-3 md:py-5" aria-label="Navegação principal">
            <Link
              href="/"
              aria-label="Redimaq - Voltar para a página inicial"
              className="transition-all duration-300 hover:scale-105 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-lg"
            >
              <Image
                src="/logo_branca.webp"
                alt="Redimaq Logo"
                width={150}
                height={50}
                className="h-10 md:h-12 w-auto drop-shadow-2xl"
                priority
                sizes="(max-width: 768px) 100px, 150px"
              />
            </Link>

            <div className="flex items-center gap-2 md:gap-4" role="list" aria-label="Redes sociais">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label, hoverColor }, index) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}                  
                  className={`
                    group relative p-2 md:p-3 rounded-full
                    bg-white/5 backdrop-blur-sm
                    border border-white/10
                    text-white/90 transition-all duration-300
                    ${hoverColor}
                    hover:scale-110 hover:bg-white/10
                    hover:border-white/20 hover:shadow-lg hover:shadow-white/10
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
                    animate-in fade-in zoom-in
                  `}
                  role="listitem"
                >
                  <Icon size={18} aria-hidden="true" className="relative z-10 md:w-5 md:h-5" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              ))}
              {/* Botão para o Blog */}
              <Link
                href="/redimaqblog"
                aria-label="Ir para o Blog da Redimaq"
                className={`
                  group relative ml-4 flex items-center gap-2
                  px-3 py-1.5 md:px-4 md:py-2.5
                  text-xs md:text-sm font-semibold
                  rounded-full backdrop-blur-sm
                  bg-white/5 border border-white/10 text-white/80
                  transition-all duration-300
                  hover:bg-white/10 hover:text-white hover:border-white/20
                  hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
                  animate-in fade-in zoom-in
                `}
              >
                <FaNewspaper className="h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:scale-110" />
                Blog
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* Seção 2 - Welcome */}
        <AnimatedSection>
          <section className="w-full py-8 md:py-16 text-center bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-700 text-balance">
                Bem-vindo à Redimaq
              </h1>
              <p className="text-base md:text-lg text-black/80 max-w-3xl mx-auto leading-relaxed">
                Sua fonte confiável para móveis e equipamentos de escritório de alta qualidade. Explore nossa ampla
                variedade de produtos projetados para transformar seu espaço de trabalho em um ambiente funcional e
                elegante.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Seção 3 - Carousel */}
        <AnimatedSection>
          <section
            id="sobre-nos"
            className="relative h-[50vh] md:h-[calc(100vh-5rem)] w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label="Carousel de imagens"
            aria-live={isPaused ? "off" : "polite"}
          >
            {CAROUSEL_IMAGES.map((src, index) => {
              const isActive = index === currentImageIndex

              return (
                <div
                  key={src}
                  className={`
                    absolute inset-0 
                    transition-all duration-1000 ease-in-out
                    ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-105"}
                  `}
                  aria-hidden={!isActive}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Slide ${index + 1} - Produtos Redimaq`}
                      fill
                      className="object-contain transition-transform duration-1000 ease-out"
                      quality={75}
                      priority={index === 0}
                      loading={index === 0 ? undefined : "lazy"}
                      sizes="(max-width: 768px) 90vw, 80vw"
                    />
                  </div>
                </div>
              )
            })}

            <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-8 px-4 md:px-8 py-2 md:py-4 bg-white/40 backdrop-blur-xl rounded-full border border-black/10 text-black/70 text-sm font-light animate-in fade-in slide-in-from-bottom duration-700 delay-300">
              <button
                onClick={goToPrevious}
                className="
                group relative p-1.5 md:p-2 rounded-full
                bg-black/10 backdrop-blur-sm
                border border-black/10
                text-black/70 transition-all duration-300
                hover:bg-black/20 hover:border-black/20
                hover:scale-110 hover:shadow-lg
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black
                active:scale-95
              "
                aria-label="Imagem anterior"
              >
                <FaChevronLeft size={14} className="relative z-10 md:w-4 md:h-4" />
              </button>

              <div className="flex items-center gap-2 md:gap-3" role="tablist" aria-label="Slides do carousel">
                {CAROUSEL_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`
                    group relative overflow-hidden rounded-full
                    transition-all duration-500 ease-out
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black
                    ${
                      index === currentImageIndex
                        ? "w-8 md:w-12 h-2 md:h-3 bg-black shadow-lg shadow-black/20"
                        : "w-2 md:w-3 h-2 md:h-3 bg-black/40 hover:bg-black/60 hover:scale-110"
                    }
                  `}
                    aria-label={`Ir para slide ${index + 1}`}
                    aria-current={index === currentImageIndex ? "true" : "false"}
                    role="tab"
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="
                group relative p-1.5 md:p-2 rounded-full
                bg-black/10 backdrop-blur-sm
                border border-black/10
                text-black/70 transition-all duration-300
                hover:bg-black/20 hover:border-black/20
                hover:scale-110 hover:shadow-lg
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black
                active:scale-95
              "
                aria-label="Próxima imagem"
              >
                <FaChevronRight size={14} className="relative z-10 md:w-4 md:h-4" />
              </button>
            </div>

            {isPaused && (
              <div className="absolute top-8 right-8 px-4 py-2 bg-white/40 backdrop-blur-md rounded-full border border-black/10 text-black/70 text-sm font-light animate-in fade-in duration-300">
                Pausado
              </div>
            )}
          </section>
        </AnimatedSection>

        {/* Seção 4 - Client Logos */}
        <AnimatedSection>
          <section className="w-full py-6 md:py-8 pb-12 md:pb-24 text-center bg-white overflow-hidden">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6 text-balance">
                Alguns de nossos clientes
              </h2>
              <div className="carousel-container relative py-1 -mx-4 px-4">
                <div className="flex animate-carousel-scroll gap-1 md:gap-2">
                  {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => (
                    <div
                      key={index}
                      className="carousel-logo flex-shrink-0 w-[200px] md:w-[300px] h-[180px] md:h-[260px] flex items-center justify-center"
                    >
                      <Image
                        src={logo.src || "/placeholder.svg"}
                        alt={logo.alt}
                        width={420}
                        height={210}
                        loading="lazy"
                        className="h-32 md:h-48 w-auto object-contain transition-all duration-300 hover:scale-125 hover:drop-shadow-xl"
                        sizes="(max-width: 768px) 200px, 300px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Seção 5 - Problem Section */}
        <AnimatedSection>
          <section className="w-full bg-gradient-to-br from-black via-gray-900 to-black text-white py-8 md:py-20">
            <div className="container mx-auto max-w-5xl flex flex-col items-center gap-6 md:gap-12 px-4 md:flex-row">
              <div className="w-full md:w-1/3">
                <Image
                  src="/seção_3.webp"
                  alt="Escritório desorganizado e improdutivo"
                  width={1280}
                  height={853}
                  loading="lazy"
                  className="h-auto w-full rounded-2xl md:rounded-3xl object-cover shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-500 hover:scale-[1.02] border-2 border-white/10"
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="w-full text-center md:text-left md:w-2/3">
                <h2 className="mb-4 md:mb-6 lg:mb-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight animate-in fade-in slide-in-from-right duration-700 tracking-tight text-balance">
                  Seu escritório está atrapalhando a produtividade?
                </h2>

                <div className="space-y-2 md:space-y-4 lg:space-y-5 mb-6 md:mb-8 lg:mb-10">
                  {[
                    "Espaço desorganizado e pouco funcional",
                    "Falta de ergonomia e conforto para os colaboradores",
                    "Dificuldade em encontrar móveis resistentes e com entrega rápida",
                    "Projetos parados por falta de um fornecedor confiável",
                  ].map((text, index) => (
                    <div
                      key={index}
                      style={{ animationDelay: `${index * 100}ms` }}
                      className="flex items-start gap-2 md:gap-3 lg:gap-4 animate-in fade-in slide-in-from-right duration-700 justify-center md:justify-start"
                    >
                      <FaTimesCircle className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-red-500 flex-shrink-0 mt-1 drop-shadow-lg animate-pulse" aria-hidden="true" />
                      <p className="text-base md:text-lg text-white/95 font-bold leading-snug text-left flex-1">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/5546984018404?text=${encodeURIComponent(
                    "Olá! Tenho interesse nos seus móveis e gostaria de um orçamento.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-4 bg-gradient-to-r from-white to-gray-200 text-black text-xs sm:text-sm md:text-base font-bold rounded-xl transition-all duration-300 shadow-xl shadow-white/20 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 animate-pulse-soft hover:from-gray-100 hover:to-gray-300"
                >
                  Solicitar orçamento
                </a>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Seção 6 - Products */}
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
                    {category.href ? (
                      <Link href={category.href}>{cardContent}</Link>
                    ) : (
                      cardContent
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Seção 7 - Solutions */}
        <AnimatedSection>
          <section className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 text-black py-8 md:py-20">
            <div className="container mx-auto max-w-5xl flex flex-col items-center gap-4 md:gap-0 px-4 md:flex-row">
              <div className="w-full text-center md:text-left md:w-2/3 md:order-1 order-2">
                <h2 className="mb-4 md:mb-6 lg:mb-10 text-3xl md:text-4xl font-black leading-tight animate-in fade-in slide-in-from-left duration-700 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent tracking-tight text-balance">
                  Soluções da <br /> REDIMAQ
                </h2>

                <div className="space-y-2 md:space-y-4 lg:space-y-5 mb-6 md:mb-8 lg:mb-10">
                  {[
                    "Linha completa de móveis corporativos",
                    "Alta qualidade e durabilidade",
                    "Atendimento personalizado",
                    "Entrega rápida e gratuita",
                  ].map((text, index) => (
                    <div
                      key={index}
                      style={{ animationDelay: `${index * 100}ms` }}
                      className="flex items-start gap-2 md:gap-3 lg:gap-4 animate-in fade-in slide-in-from-left duration-700 justify-center md:justify-start"
                    >
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-green-600 flex-shrink-0 mt-0.5 drop-shadow-lg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-base md:text-lg text-black/90 font-bold leading-relaxed text-left">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/5546984018404?text=${encodeURIComponent(
                    "Olá! Gostaria de um orçamento para as soluções da Redimaq.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-4 bg-gradient-to-r from-black via-gray-900 to-black text-white text-xs sm:text-sm md:text-base font-bold rounded-xl transition-all duration-300 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-black/50 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 animate-pulse-soft hover:from-gray-900 hover:to-gray-800"
                >
                  Solicitar orçamento
                </a>
              </div>

              <div className="w-full md:w-1/3 md:order-2 order-1">
                <Image
                  src="/seção_5.webp"
                  alt="Escritório organizado e produtivo"
                  width={1280}
                  height={853}
                  loading="lazy"
                  className="h-auto w-full rounded-2xl md:rounded-3xl object-cover shadow-2xl shadow-green-600/30 hover:shadow-green-500/50 transition-all duration-500 hover:scale-[1.02] border-2 border-green-900/10"
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Seção 8 - Versatility */}
        <AnimatedSection>
          <section className="w-full py-8 md:py-16 text-center bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-700 text-balance">
                Versatilidade que acompanha seu ritmo.
              </h2>
              <div className="relative w-full max-w-5xl mx-auto">
                <Image
                  src="/seção_6.webp"
                  alt="Escritório moderno e organizado com móveis da Redimaq"
                  width={1200}
                  height={675}
                  loading="lazy"
                  className="rounded-2xl md:rounded-3xl shadow-2xl w-full h-auto"
                  quality={95}
                  sizes="(max-width: 1024px) 90vw, 1200px"
                />
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Seção 9 - CTA */}
        <AnimatedSection>
          <section className="w-full py-8 md:py-16 bg-white text-black text-center">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-balance">
                A oportunidade perfeita para modernizar seu escritório!
              </h2>
              <div className="max-w-3xl mx-auto mb-6 md:mb-10 space-y-2 md:space-y-3 text-base md:text-lg leading-relaxed">
                <p>Móveis corporativos de alto padrão, prontos para transformar seu ambiente de trabalho!</p>
                <p>Investimento estratégico para aumentar produtividade e bem-estar da equipe!</p>
                <p>
                  <strong>Condição especial para grandes projetos</strong> – aproveite agora mesmo!
                </p>
              </div>
              <a
                href={`https://wa.me/5546984018404?text=${encodeURIComponent(
                  "Olá! Vi a oferta no site e gostaria de solicitar um orçamento.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 md:px-10 py-3 md:py-4 bg-gradient-to-r from-black via-gray-900 to-black text-white text-base md:text-lg font-bold rounded-xl transition-all duration-300 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/40 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 animate-pulse-soft hover:from-gray-800 hover:to-gray-700"
              >
                Solicitar Orçamento Agora
              </a>
            </div>
          </section>
        </AnimatedSection>

        {/* Seção 10 - Location */}
        <AnimatedSection>
          <section id="contato" className="w-full py-10 md:py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Onde nos encontrar</h2>
              <p className="text-sm md:text-lg text-black/70 mb-6 md:mb-12">
                {CONTACT_INFO.address}
              </p>
              <div className="w-full max-w-5xl mx-auto rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-black/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.953595913553!2d-52.67839502380119!3d-26.03517685619443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f0495513883c47%3A0x5ea5a4ca6207ff30!2sR.%20Caramuru%2C%20167%20-%20Centro%2C%20Pato%20Branco%20-%20PR%2C%2085501-064!5e0!3m2!1spt-BR!2sbr!4v1717800533351!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="350"
                  className="md:h-[450px]"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da Redimaq no Google Maps"
                ></iframe>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <AnimatedSection>
        <footer className="bg-black text-white/80 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 text-center sm:text-left sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
              {/* Coluna 1: Logo e Descrição */}
              <div className="space-y-4">
                <Image src="/logo_branca.webp" alt="Redimaq Logo" width={150} height={50} className="h-10 w-auto" loading="lazy" />
                <p className="text-sm leading-relaxed">
                  Transformando escritórios com móveis de qualidade e design funcional desde 1989.
                </p>
              </div>

              {/* Coluna 2: Links Rápidos */}
              <div>
                <h3 className="font-bold text-white mb-4">Navegação</h3>
                <ul className="space-y-2">
                  {FOOTER_LINKS.map((link) => (
                    <li key={link.label}>{
                      link.href.startsWith("#") ? (
                        <a
                          href={link.href}
                          onClick={(e) => scrollToSection(e, link.href)}
                          className="hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
                        >
                          {link.label}
                        </Link>
                      )
                    }</li>
                  ))}
                </ul>
              </div>

              {/* Coluna 3: Contato */}
              <div>
                <h3 className="font-bold text-white mb-4">Contato</h3>
                <address className="space-y-2 not-italic text-sm">
                  <p>{CONTACT_INFO.address}</p>
                  <p className="flex items-center justify-center sm:justify-start gap-2">
                    <FaPhoneAlt size={12} aria-hidden="true" />
                    <a href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`} className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded">
                      {CONTACT_INFO.phone}
                    </a>
                  </p>
                </address>
              </div>

              {/* Coluna 4: Redes Sociais */}
              <div>
                <h3 className="font-bold text-white mb-4">Siga-nos</h3>
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  {SOCIAL_LINKS.map(({ href, icon: Icon, label, hoverColor }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`text-2xl ${hoverColor} transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded`}
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-12 border-t border-white/10 pt-4 md:pt-8 text-center text-xs md:text-sm text-white/50">
              <p>&copy; {currentYear} Redimaq Equipamentos. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </AnimatedSection>
    </>
  )
}
