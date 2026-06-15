import type { IconType } from "react-icons"
import { FaWhatsapp, FaInstagram, FaLinkedin } from "react-icons/fa"

/** Dados e helpers compartilhados por todas as páginas do site. */

export const WHATSAPP_NUMBER = "5546984018404"

/** Monta um link de WhatsApp já com a mensagem codificada. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export interface SocialLink {
  href: string
  icon: IconType
  label: string
  hoverColor: string
}

export interface FooterLink {
  href: string
  label: string
}

export interface ContactInfo {
  address: string
  phone: string
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    href: whatsappUrl("Olá! Gostaria de fazer um orçamento."),
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

export const CONTACT_INFO: ContactInfo = {
  address: "R. Caramuru, 167 - Centro, Pato Branco - PR, 85501-064",
  phone: "(46) 98401-8404",
}

/** URL do mapa incorporado do Google Maps (endereço da Redimaq). */
export const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.953595913553!2d-52.67839502380119!3d-26.03517685619443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f0495513883c47%3A0x5ea5a4ca6207ff30!2sR.%20Caramuru%2C%20167%20-%20Centro%2C%20Pato%20Branco%20-%20PR%2C%2085501-064!5e0!3m2!1spt-BR!2sbr!4v1717800533351!5m2!1spt-BR!2sbr"

/** Links do rodapé da página inicial. */
export const HOME_FOOTER_LINKS: FooterLink[] = [
  { href: "#inicio", label: "Início" },
  { href: "#produtos", label: "Produtos" },
  { href: "#sobre-nos", label: "Sobre Nós" },
  { href: "/consertodecadeiras", label: "Consertos" },
  { href: "/redimaqblog", label: "Blog" },
]

/** Links do rodapé da página de conserto de cadeiras. */
export const CONSERTO_FOOTER_LINKS: FooterLink[] = [
  { href: "#inicio", label: "Início" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#galeria", label: "Projetos" },
]

/** Links do rodapé do blog (apontam para a home, que está em outra rota). */
export const BLOG_FOOTER_LINKS: FooterLink[] = [
  { href: "/#inicio", label: "Início" },
  { href: "/#produtos", label: "Produtos" },
  { href: "/#sobre-nos", label: "Sobre Nós" },
  { href: "/consertodecadeiras", label: "Consertos" },
  { href: "/redimaqblog", label: "Blog" },
]
