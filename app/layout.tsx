import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Cormorant } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

// Fonte serifada de display para títulos — dá o tom "luxo".
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Redimaq - Móveis para Escritório",
  description: "Redimaq Equipamentos - Soluções completas em móveis e equipamentos para escritório",
  keywords: ["móveis", "escritório", "equipamentos", "redimaq"],
  authors: [{ name: "Redimaq" }],
  creator: "Redimaq",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Redimaq - Móveis para Escritório",
    description: "Redimaq Equipamentos - Soluções completas em móveis e equipamentos para escritório",
    siteName: "Redimaq",
  },
  icons: {
    icon: "/icon_cadeira.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
