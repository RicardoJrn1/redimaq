import Image from "next/image"
import Link from "next/link"
import { FaPhoneAlt } from "react-icons/fa"
import { CONTACT_INFO, HOME_FOOTER_LINKS, SOCIAL_LINKS, type FooterLink } from "@/lib/site"

const currentYear = new Date().getFullYear()

interface FooterProps {
  /** Links da coluna "Navegação". Por padrão usa os da página inicial. */
  navLinks?: FooterLink[]
}

/**
 * Rodapé do site. Links que começam com "#" usam scroll nativo da página
 * (o `scroll-behavior: smooth` e o `scroll-padding-top` ficam no globals.css),
 * enquanto rotas usam o <Link> do Next.
 */
export default function Footer({ navLinks = HOME_FOOTER_LINKS }: FooterProps) {
  return (
    <footer className="bg-black text-white/80 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 text-center sm:text-left sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {/* Coluna 1: Logo e Descrição */}
          <div className="space-y-4">
            <Image
              src="/logo_branca.webp"
              alt="Redimaq Logo"
              width={150}
              height={50}
              className="h-10 w-auto mx-auto sm:mx-0"
              loading="lazy"
            />
            <p className="text-sm leading-relaxed">
              Transformando escritórios com móveis de qualidade e design funcional desde 1989.
            </p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h3 className="font-bold text-white mb-4">Navegação</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div>
            <h3 className="font-bold text-white mb-4">Contato</h3>
            <address className="space-y-2 not-italic text-sm">
              <p>{CONTACT_INFO.address}</p>
              <p className="flex items-center justify-center sm:justify-start gap-2">
                <FaPhoneAlt size={12} aria-hidden="true" />
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                  className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
                >
                  {CONTACT_INFO.phone}
                </a>
              </p>
            </address>
          </div>

          {/* Coluna 4: Redes Sociais */}
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
  )
}
