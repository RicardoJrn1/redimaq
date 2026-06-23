"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { FaTimes } from "react-icons/fa"
import type { BlogPost } from "@/app/redimaqblog/data"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"

interface BlogPostModalProps {
  post: BlogPost
  onClose: () => void
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Modal com o conteúdo completo de um post (fecha no Escape / clique no fundo). */
export default function BlogPostModal({ post, onClose }: BlogPostModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-md"
        initial={reduced ? false : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ duration: 0.25 }}
      />

      <motion.div
        className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-cream shadow-2xl shadow-charcoal/40 ring-1 ring-sand-dark/30"
        onClick={(e) => e.stopPropagation()}
        initial={reduced ? false : { opacity: 0, scale: 0.96, y: 8 }}
        animate={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
      >
        <div className="relative h-52 w-full shrink-0 overflow-hidden md:h-64">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Fechar artigo"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-charcoal/70 text-cream backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 md:p-9">
          <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em]">
            <span className="rounded-full bg-sand px-3 py-1 text-charcoal">{post.category}</span>
            <span className="text-charcoal/55">{formattedDate}</span>
          </div>

          <h1
            id="blog-modal-title"
            className="font-serif text-2xl font-medium leading-tight tracking-tight text-charcoal text-balance md:text-4xl"
          >
            {post.title}
          </h1>

          <p className="mt-3 border-b border-sand-dark/40 pb-5 text-sm text-charcoal/60">Por {post.author}</p>

          <div className="mt-6 text-base leading-relaxed text-charcoal/80">
            <p>{post.content}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
