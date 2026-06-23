"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { FaArrowRight } from "react-icons/fa"
import { formatPostDate, type BlogPost } from "@/app/redimaqblog/data"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"

interface BlogPostCardProps {
  post: BlogPost
  onClick: () => void
  /** Quando true, vira o "showpiece" largo (imagem lateral + CTA), em fundo charcoal. */
  featured?: boolean
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * Card de um post do blog no estilo "luxury" da marca: tag, data, título com
 * sublinhado que cresce no hover e resumo. O card inteiro abre o post no modal.
 */
export default function BlogPostCard({ post, onClick, featured = false }: BlogPostCardProps) {
  const reduced = usePrefersReducedMotion()
  const lift = reduced ? undefined : { y: -5 }

  // Alvo de clique que cobre o card inteiro (espelha o padrão do modelo original,
  // trocando <a href> por <button> para abrir o modal — um único foco por card).
  const clickTarget = (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Ler artigo: ${post.title}`}
      className={`absolute inset-0 z-10 cursor-pointer rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-4 ${
        featured ? "focus-visible:outline-sand" : "focus-visible:outline-charcoal"
      }`}
    >
      <span className="sr-only">Ler artigo</span>
    </button>
  )

  if (featured) {
    return (
      <motion.article
        whileHover={lift}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        className="group relative isolate overflow-hidden rounded-3xl bg-charcoal text-cream shadow-2xl shadow-charcoal/30 ring-1 ring-cream/10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-80 w-80 rounded-full bg-sand/10 blur-3xl"
        />

        <div className="relative z-0 flex flex-col md:flex-row">
          <div className="relative min-h-[240px] w-full overflow-hidden md:min-h-[440px] md:w-1/2 lg:w-3/5">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent md:bg-gradient-to-r md:from-transparent md:to-charcoal/40"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between p-7 md:p-10">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.2em]">
                <span className="rounded-full bg-sand/15 px-3 py-1 text-sand">{post.category}</span>
                <span className="text-cream/50">{formatPostDate(post.date)}</span>
              </div>

              <h2 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight text-balance md:text-4xl lg:text-5xl">
                <span className="bg-gradient-to-r from-sand to-sand bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_1px]">
                  {post.title}
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/70 line-clamp-3 md:text-lg">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3 text-sm font-semibold uppercase tracking-wide text-charcoal shadow-md shadow-charcoal/20 transition-all duration-300 group-hover:scale-[1.03] group-hover:bg-sand-light">
                Ler artigo
                <FaArrowRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
              <span className="hidden text-xs uppercase tracking-[0.2em] text-cream/40 sm:block">Por {post.author}</span>
            </div>
          </div>
        </div>

        {clickTarget}
      </motion.article>
    )
  }

  return (
    <motion.article
      whileHover={lift}
      transition={{ duration: 0.25, ease: EASE_OUT }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-cream shadow-sm shadow-charcoal/5 ring-1 ring-sand-dark/40 transition-shadow duration-300 hover:shadow-xl hover:shadow-charcoal/10"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.18em]">
          <span className="rounded-full bg-sand px-3 py-1 text-charcoal">{post.category}</span>
          <span className="text-charcoal/55">{formatPostDate(post.date)}</span>
        </div>

        <h3 className="font-serif text-xl font-medium leading-snug tracking-tight text-charcoal text-balance md:text-2xl">
          <span className="bg-gradient-to-r from-charcoal to-charcoal bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_1px]">
            {post.title}
          </span>
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-charcoal/70 line-clamp-3">{post.excerpt}</p>

        <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-charcoal/80 transition-colors duration-300 group-hover:text-charcoal">
          Ler mais
          <FaArrowRight
            aria-hidden="true"
            className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </div>

      {clickTarget}
    </motion.article>
  )
}
