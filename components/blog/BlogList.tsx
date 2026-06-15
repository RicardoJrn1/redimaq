"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { FaChevronDown, FaSearch } from "react-icons/fa"
import { MOCK_POSTS, type BlogPost } from "@/app/redimaqblog/data"
import BlogPostCard from "@/components/blog/BlogPostCard"
import BlogPostModal from "@/components/blog/BlogPostModal"

type SortOrder = "newest" | "oldest"

/** Listagem do blog: busca, ordenação, grade de posts e modal de leitura. */
export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest")
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

  return (
    <>
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
                <FaChevronDown
                  className={`transform transition-transform duration-200 ${isSortDropdownOpen ? "rotate-180" : ""}`}
                />
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
                <BlogPostCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
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

      {selectedPost && <BlogPostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </>
  )
}
