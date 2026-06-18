"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  id?: string
  delay?: number
}

/**
 * Revela o conteúdo com fade/slide quando ele entra na viewport.
 * A animação dispara apenas uma vez (o observer é desconectado depois).
 */
export default function AnimatedSection({ children, className = "", id, delay = 0 }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

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
      className={`${reduced ? "" : "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"} ${
        isVisible || reduced ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  )
}
