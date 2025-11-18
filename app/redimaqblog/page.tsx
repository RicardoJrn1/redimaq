"use client"

import type React from "react"
import Image from "next/image"
import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaSearch,
  FaNewspaper,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa"
import Link from "next/link"
import { useState, useMemo, useRef, useEffect } from "react"
import { MOCK_POSTS, BlogPost } from "./data"

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

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    href: `https://wa.me/5546984018404?text=${encodeURIComponent("Olá! Gostaria de fazer um orçamento.")}`,
    icon: FaWhatsapp,
    label: "Link para o WhatsApp",
    hoverColor: "hover:text-green-400",
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
  { href: "/#inicio", label: "Início" },
  { href: "/#produtos", label: "Produtos" },
  { href: "/#sobre-nos", label: "Sobre Nós" },
  { href: "/consertodecadeiras", label: "Consertos" },
  { href: "/redimaqblog", label: "Blog" },
]

const CONTACT_INFO: ContactInfo = {
  address: "R. Caramuru, 167 - Centro, Pato Branco - PR, 85501-064",
  phone: "(46) 98401-8404",
}

const currentYear = new Date().getFullYear()

export default function BlogPage() {
  const headerRef = useRef<HTMLElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const sortDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [sortDropdownRef])

  const filteredPosts = useMemo(() => {
    const sorted = [...MOCK_POSTS].sort((a, b) => (sortOrder === "newest" ? new Date(b.date).getTime() - new Date(a.date).getTime() : new Date(a.date).getTime() - new Date(b.date).getTime()))
    if (!searchQuery) return sorted
    return sorted.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, sortOrder])

  return (
    <>
      {/* Header (Copiado da página principal) */}
      <header
        ref={headerRef}
        id="inicio"
        className="sticky top-0 z-50 backdrop-blur-xl bg-black/95 shadow-2xl"
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

            <div className="flex items-center gap-2 md:gap-4" role="list" aria-label="Redes sociais e blog">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label, hoverColor }) => (
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
                  `}
                  role="listitem"
                >
                  <Icon size={18} aria-hidden="true" className="relative z-10 md:w-5 md:h-5" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              ))}
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
                `}
              >
                <FaNewspaper className="h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:scale-110" />
                Blog
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 text-balance">Blog da Redimaq</h1>
            <p className="text-lg text-gray-600">Dicas, novidades e tudo sobre o mundo dos móveis de escritório.</p>
          </div>

          {/* Barra de Ferramentas */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-start">
            <div className="relative w-full md:max-w-sm">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar no blog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            {/* Filtro customizado */}
            <div ref={sortDropdownRef} className="relative w-full md:w-auto">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex w-full items-center justify-between gap-4 rounded-full border border-gray-300 bg-white px-4 py-2.5 text-left text-gray-700 transition hover:bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                <span>{sortOrder === "newest" ? "Mais recentes" : "Mais antigos"}</span>
                <FaChevronDown className={`transform transition-transform duration-200 ${isSortDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isSortDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in-95">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button
                      onClick={() => {
                        setSortOrder("newest")
                        setIsSortDropdownOpen(false)
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Mais recentes
                    </button>
                    <button
                      onClick={() => {
                        setSortOrder("oldest")
                        setIsSortDropdownOpen(false)
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Mais antigos
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Listagem de Posts */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                // Removido o Link e adicionado um div com onClick
                <div key={post.id} onClick={() => setSelectedPost(post)} className="cursor-pointer">
                  <div
                    className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-64 w-full">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-md"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Gradiente que aparece no hover para garantir a legibilidade do texto */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {/* Gradiente para o estado normal (título na parte inferior) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-0" />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end overflow-hidden p-6 text-white">
                      
                      {/* Container do Título */}
                      <div className="ease-in-out transition-all duration-500 group-hover:-translate-y-40">
                        <h2 className="text-balance text-xl font-bold text-white drop-shadow-lg transition-colors">
                          {post.title}
                        </h2>
                      </div>

                      {/* Container do Conteúdo (aparece no hover) */}
                      <div className="absolute bottom-6 left-6 right-6 flex flex-col opacity-0 transform translate-y-8 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                        <p className="mb-1 text-sm font-semibold text-blue-300">{post.category}</p>
                        <p className="mb-4 flex-grow text-sm text-gray-200">{post.excerpt}</p>
                        <div className="mt-auto text-xs text-gray-300">
                          <span>Por {post.author} em {new Date(post.date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-800">Nenhum post encontrado</h3>
              <p className="text-gray-500 mt-2">Tente ajustar sua busca ou filtros.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal para exibir o post completo */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in"
          onClick={() => setSelectedPost(null)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
          <div
            className="relative z-10 bg-white rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] flex flex-col animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-48 md:h-64 rounded-t-xl overflow-hidden">
              <Image src={selectedPost.imageUrl} alt={selectedPost.title} fill className="object-cover" />
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Fechar post"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6 md:p-8 overflow-y-auto">
              <p className="text-blue-600 font-semibold mb-2">{selectedPost.category}</p>
              <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">{selectedPost.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-b pb-4">
                <span>Por {selectedPost.author}</span>
                <span>{new Date(selectedPost.date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</span>
              </div>
              <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                <p>{selectedPost.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer (Copiado da página principal) */}
      <footer className="bg-black text-white/80 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 text-center sm:text-left sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
            <div className="space-y-4">
              <Image src="/logo_branca.webp" alt="Redimaq Logo" width={150} height={50} className="h-10 w-auto mx-auto sm:mx-0" loading="lazy" />
              <p className="text-sm leading-relaxed">
                Transformando escritórios com móveis de qualidade e design funcional desde 1989.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Navegação</h3>
              <ul className="space-y-2">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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
    </>
  )
}