"use client"

import Image from "next/image"
import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaCheckCircle,
  FaPhoneAlt,
  FaBan,
} from "react-icons/fa"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import React from "react"
import type { Metadata } from "next"

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
  email: string
}

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
  { href: "#beneficios", label: "Benefícios" },
  { href: "#galeria", label: "Projetos" },
]

const CONTACT_INFO: ContactInfo = {
  address: "R. Caramuru, 167 - Centro, Pato Branco - PR, 85501-064",
  phone: "(46) 98401-8404",
  email: "contato@redimaq.com.br",
}

const currentYear = new Date().getFullYear()

function AnimatedSection({
  children,
  className = "",
  id,
  delay = 0,
}: { children: React.ReactNode; className?: string; id?: string; delay?: number }) {
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
      id={id}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default function ConsertoDeCadeirasPage() {
  const headerRef = useRef<HTMLElement>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const beforeAfterImages = ["/conserto_2.webp", "/conserto_3.webp"]

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (href === "#inicio") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    const targetId = href.replace("#", "")
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      const headerHeight = headerRef.current?.offsetHeight || 0
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerHeight - 20

      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
  }

  // Garante que a página sempre inicie no topo
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % beforeAfterImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isPaused, beforeAfterImages.length])

  return (
    <>
      {/* Header Section */}
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
                  style={{ animationDelay: `${index * 100}ms` }}
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
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
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
                  href={`https://wa.me/5546984018404?text=${encodeURIComponent("Olá! Gostaria de um orçamento para conserto de cadeiras.")}`}
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
                {beforeAfterImages.map((src, index) => {
                  const isActive = index === activeImage
                  const label = index === 0 ? "Antes" : "Depois"
                  return (
                    <div
                      key={src}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100" : "opacity-0"}`}
                      aria-hidden={!isActive}
                    >
                      <Image src={src || "/placeholder.svg"} alt={`Exemplo de cadeira ${label} do conserto`} fill className="object-cover" priority={index < 2} />
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

        {/* Adiar o serviço */}
        <AnimatedSection>
          <section className="w-full py-16 bg-gray-50 text-center">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
              {/* Coluna da Imagem */}
              <div className="w-full max-w-sm md:max-w-md lg:max-w-lg md:w-6/12 order-2 md:order-1">
                <Image
                  src="/conserto_1.webp"
                  alt="Cadeira de escritório danificada precisando de conserto"
                  width={600}
                  height={600}
                  loading="lazy"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
              {/* Coluna de Texto */}
              <div className="w-full max-w-md md:w-5/12 text-center md:text-left order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-10 text-balance">Adiar o conserto só piora a situação</h2>
                <div className="space-y-4">
                  {[
                    "Riscos de acidentes e problemas de saúde para a equipe.",
                    "Impacto negativo na produtividade e no bem-estar.",
                    "Desvalorização do patrimônio da sua empresa.",
                    "Custos maiores com a substituição completa no futuro.",
                  ].map((text, index) => (
                    <div
                      key={index}
                      style={{ animationDelay: `${index * 150}ms` }}
                      className="flex items-start gap-3 animate-in fade-in slide-in-from-left duration-500"
                    >
                      <FaBan className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" aria-hidden="true" />
                      <p className="text-base md:text-lg text-gray-800 font-medium text-left flex-1 m-0">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
                <a
                  href={`https://wa.me/5546984018404?text=${encodeURIComponent("Olá! Tenho uma cadeira para consertar e gostaria de um orçamento.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-10 px-8 py-4 bg-black text-white text-lg font-bold rounded-full transition-all duration-300 shadow-lg shadow-gray-900/20 hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95"
                >
                  Corrigir isso com a Redimaq
                </a>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Benefícios Section */}
        <AnimatedSection id="beneficios">
          <section className="w-full py-16 bg-gray-50 text-center">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-10 text-balance">Benefícios de restaurar suas cadeiras</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
                  <FaCheckCircle className="text-green-500 text-4xl mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold mb-2">Equipe mais confortável</h3>
                  <p className="text-gray-700">Cadeiras restauradas reduzem reclamações e aumentam a produtividade.</p>
                </div>
                <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
                  <FaCheckCircle className="text-green-500 text-4xl mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold mb-2">Ambiente mais profissional</h3>
                  <p className="text-gray-700">Seu espaço transmite mais credibilidade com móveis em bom estado.</p>
                </div>
                <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
                  <FaCheckCircle className="text-green-500 text-4xl mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold mb-2">Problemas resolvidos com agilidade</h3>
                  <p className="text-gray-700">Você ganha tempo, evita dor de cabeça e tem garantia no serviço.</p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Galeria de Projetos Section */}
        <AnimatedSection id="galeria">
          <section className="w-full py-16 bg-gray-50 text-center">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-10 text-balance">Alguns de nossos projetos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {["/conserto_4.webp", "/conserto_5.webp"].map((src, index) => (
                  <div key={index} className="relative h-70 w-full rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Exemplo de cadeira consertada ${index + 1}`}
                      fill
                      loading="lazy"
                      className={`object-cover ${src === "/conserto_5.webp" ? "object-center" : ""}`}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-xl font-semibold">Antes e Depois</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Pronto Para Transformar Section */}
        <AnimatedSection>
          <section className="w-full py-16 bg-white text-center">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 text-balance">Pronto para transformar seu escritório?</h2>
              <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-600 leading-relaxed">
                Não deixe que cadeiras danificadas atrapalhem sua rotina. Solicite agora um orçamento sem compromisso e veja como a Redimaq pode facilitar sua operação.
              </p>
              <a
                href={`https://wa.me/5546984018404?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento para conserto de cadeiras.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-black text-white text-lg font-bold rounded-full transition-all duration-300 shadow-lg shadow-gray-900/20 hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95"
              >
                Solicitar Orçamento Agora
              </a>
            </div>
          </section>
        </AnimatedSection>

        {/* Localização Section */}
        <AnimatedSection>
          <section className="w-full py-16 bg-gray-50 text-black text-center">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Onde nos encontrar</h2>
              <p className="text-sm md:text-lg text-black/70 mb-6 md:mb-12">
                {CONTACT_INFO.address}
              </p>
              <div className="max-w-4xl mx-auto mb-8 overflow-hidden rounded-2xl shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.953595913553!2d-52.67839502380119!3d-26.03517685619443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f0495513883c47%3A0x5ea5a4ca6207ff30!2sR.%20Caramuru%2C%20167%20-%20Centro%2C%20Pato%20Branco%20-%20PR%2C%2085501-064!5e0!3m2!1spt-BR!2sbr!4v1717800533351!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="400"
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

      {/* Footer Section */}
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
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => scrollToSection(e, link.href)}
                        className="hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
                      >
                        {link.label}
                      </a>
                    </li>
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
                  <p>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded">
                      {CONTACT_INFO.email}
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
