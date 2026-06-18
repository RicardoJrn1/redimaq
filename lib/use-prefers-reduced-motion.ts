"use client"

import { useEffect, useState } from "react"

/**
 * Retorna true quando o usuário ativou "reduzir movimento" no sistema.
 * Inicia em false (seguro p/ SSR); o valor real é lido no client após montar.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return reduced
}
