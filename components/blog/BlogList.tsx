"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, type Variants } from "framer-motion"
import { FaChevronDown, FaSearch } from "react-icons/fa"
import { MOCK_POSTS, type BlogPost } from "@/app/redimaqblog/data"
import BlogPostCard from "@/components/blog/BlogPostCard"
import BlogPostModal from "@/components/blog/BlogPostModal"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"

type SortOrder = "newest" | "oldest"

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}

/** Listagem do blog: busca, ordenação, post em destaque, grade e modal de leitura. */
export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest")
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const sortDropdownRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredPosts = useMemo(() => {
    const sorted = [...MOCK_POSTS].sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime(),
    )
    if (!searchQuery) return sorted
    return sorted.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery, sortOrder])

  // O primeiro post vira "destaque" apenas quando não há busca ativa (mantém o
  // resultado da busca previsível: tudo numa grade só).
  const showFeatured = !searchQuery && filteredPosts.length > 0
  const featuredPost = showFeatured ? filteredPosts[0] : null
  const gridPosts = showFeatured ? filteredPosts.slice(1) : filteredPosts

  const gridMotion = reduced
    ? {}
    : {
        variants: containerVariants,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-60px" },
      }

  return (
    <>
      <main className="relative isolate min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <header className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-charcoal/70">Blog Redimaq</p>
            <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-charcoal text-balance md:text-6xl">
              Conteúdo para um escritório <span className="italic">melhor</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-charcoal/70 md:text-lg">
              Dicas, tendências e tudo sobre o mundo dos móveis de escritório.
            </p>
          </header>

          {/* Barra de ferramentas */}
          <div className="relative z-20 mx-auto mt-12 flex max-w-5xl flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <FaSearch
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40"
              />
              <input
                type="text"
                placeholder="Pesquisar no blog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Pesquisar no blog"
                className="w-full rounded-full border border-sand-dark/50 bg-cream/60 py-3 pl-11 pr-4 text-sm text-charcoal transition placeholder:text-charcoal/40 focus:border-charcoal/40 focus:outline-none focus:ring-2 focus:ring-charcoal/15"
              />
            </div>

            {/* Filtro de ordenação */}
            <div ref={sortDropdownRef} className="relative w-full md:w-52">
              <button
                onClick={() => setIsSortDropdownOpen((open) => !open)}
                aria-haspopup="listbox"
                aria-expanded={isSortDropdownOpen}
                className="flex w-full items-center justify-between gap-4 rounded-full border border-sand-dark/50 bg-cream/60 px-5 py-3 text-left text-sm text-charcoal transition hover:bg-sand-light focus:outline-none focus:ring-2 focus:ring-charcoal/15"
              >
                <span>{sortOrder === "newest" ? "Mais recentes" : "Mais antigos"}</span>
                <FaChevronDown
                  aria-hidden="true"
                  className={`h-3 w-3 text-charcoal/60 transition-transform duration-200 ${
                    isSortDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isSortDropdownOpen && (
                <ul
                  role="listbox"
                  className="absolute right-0 z-30 mt-2 w-full overflow-hidden rounded-2xl border border-sand-dark/40 bg-cream shadow-xl shadow-charcoal/10"
                >
                  {(["newest", "oldest"] as const).map((order) => (
                    <li key={order}>
                      <button
                        onClick={() => {
                          setSortOrder(order)
                          setIsSortDropdownOpen(false)
                        }}
                        role="option"
                        aria-selected={sortOrder === order}
                        className={`block w-full px-5 py-2.5 text-left text-sm transition hover:bg-sand-light ${
                          sortOrder === order ? "font-semibold text-charcoal" : "text-charcoal/70"
                        }`}
                      >
                        {order === "newest" ? "Mais recentes" : "Mais antigos"}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Conteúdo */}
          <div className="mx-auto mt-12 max-w-6xl">
            {filteredPosts.length > 0 ? (
              <>
                {featuredPost && (
                  <motion.div
                    {...(reduced
                      ? {}
                      : {
                          initial: { opacity: 0, y: 24 },
                          whileInView: { opacity: 1, y: 0 },
                          viewport: { once: true },
                          transition: { duration: 0.6, ease: EASE_OUT },
                        })}
                    className="mb-10 md:mb-14"
                  >
                    <BlogPostCard featured post={featuredPost} onClick={() => setSelectedPost(featuredPost)} />
                  </motion.div>
                )}

                {gridPosts.length > 0 && (
                  <motion.div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3" {...gridMotion}>
                    {gridPosts.map((post) => (
                      <motion.div key={post.id} variants={reduced ? undefined : itemVariants}>
                        <BlogPostCard post={post} onClick={() => setSelectedPost(post)} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </>
            ) : (
              <div className="py-20 text-center">
                <p className="font-serif text-2xl text-charcoal">Nenhum artigo encontrado</p>
                <p className="mt-2 text-charcoal/60">Tente ajustar a sua busca.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedPost && <BlogPostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </>
  )
}
