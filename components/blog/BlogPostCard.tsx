import Image from "next/image"
import type { BlogPost } from "@/app/redimaqblog/data"

interface BlogPostCardProps {
  post: BlogPost
  onClick: () => void
}

/** Card de um post do blog; revela categoria/resumo no hover. */
export default function BlogPostCard({ post, onClick }: BlogPostCardProps) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
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
              <span>
                Por {post.author} em {new Date(post.date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
