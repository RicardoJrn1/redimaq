import { FaWhatsapp } from "react-icons/fa"
import { whatsappUrl } from "@/lib/site"

/** Botão flutuante persistente de WhatsApp (atalho de contato em qualquer ponto da página). */
export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl("Olá! Gostaria de falar com a Redimaq.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-charcoal text-cream shadow-2xl shadow-charcoal/40 ring-1 ring-sand-dark/40 transition-all duration-300 hover:scale-110 hover:bg-charcoal-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
    >
      <FaWhatsapp className="h-6 w-6" aria-hidden="true" />
    </a>
  )
}
