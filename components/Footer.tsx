import Image from "next/image"
import Link from "next/link"
import { FaPhoneAlt } from "react-icons/fa"
import { CONTACT_INFO, HOME_FOOTER_LINKS, SOCIAL_LINKS, type FooterLink } from "@/lib/site"

const currentYear = new Date().getFullYear()

interface FooterProps {
  /** Links da coluna "Navegação". Por padrão usa os da página inicial. */
  navLinks?: FooterLink[]
}

const columnTitleClass = "mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-sand"

/**
 * Rodapé do site. Links que começam com "#" usam scroll nativo da página
 * (o `scroll-behavior: smooth` e o `scroll-padding-top` ficam no globals.css),
 * enquanto rotas usam o <Link> do Next.
 */
export default function Footer({ navLinks = HOME_FOOTER_LINKS }: FooterProps) {
  return (
    <footer className="bg-charcoal py-10 text-cream/70 md:py-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 sm:text-left md:gap-12 lg:grid-cols-4">
          {/* Coluna 1: Logo e Descrição */}
          <div className="space-y-4">
            <Image
              src="/logo_branca.webp"
              alt="Redimaq Logo"
              width={150}
              height={50}
              className="mx-auto h-10 w-auto sm:mx-0"
              loading="lazy"
            />
            <p className="text-sm leading-relaxed text-cream/60">
              Transformando escritórios com móveis de qualidade e design funcional desde 1989.
            </p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h3 className={columnTitleClass}>Navegação</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      className="cursor-pointer rounded transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="cursor-pointer rounded transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
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
            <h3 className={columnTitleClass}>Contato</h3>
            <address className="space-y-2 text-sm not-italic">
              <p className="text-cream/60">{CONTACT_INFO.address}</p>
              <p className="flex items-center justify-center gap-2 sm:justify-start">
                <FaPhoneAlt size={12} aria-hidden="true" />
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                  className="rounded transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
                >
                  {CONTACT_INFO.phone}
                </a>
              </p>
            </address>
          </div>

          {/* Coluna 4: Redes Sociais */}
          <div>
            <h3 className={columnTitleClass}>Siga-nos</h3>
            <div className="flex items-center justify-center gap-4 sm:justify-start">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded text-2xl text-cream/70 transition-all duration-300 hover:scale-110 hover:text-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-cream/10 pt-6 text-center text-xs text-cream/60 md:mt-12 md:pt-8 md:text-sm">
          <p>&copy; {currentYear} Redimaq Equipamentos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
