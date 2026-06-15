import Image from "next/image"
import { FaTimes } from "react-icons/fa"
import type { BlogPost } from "@/app/redimaqblog/data"

interface BlogPostModalProps {
  post: BlogPost
  onClose: () => void
}

/** Modal com o conteúdo completo de um post. */
export default function BlogPostModal({ post, onClose }: BlogPostModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
      <div
        className="relative z-10 bg-white rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] flex flex-col animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-48 md:h-64 rounded-t-xl overflow-hidden">
          <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Fechar post"
          >
            <FaTimes />
          </button>
        </div>
        <div className="p-6 md:p-8 overflow-y-auto">
          <p className="text-blue-600 font-semibold mb-2">{post.category}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-b pb-4">
            <span>Por {post.author}</span>
            <span>{new Date(post.date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</span>
          </div>
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
            <p>{post.content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
