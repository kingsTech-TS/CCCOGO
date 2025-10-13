import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 as Source_Sans_Pro, DM_Sans } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "700"],
})

const sourceSans = Source_Sans_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "600"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Christ Chosen Church of God Oremeji - A Place of Faith, Hope, and Community",
  description:
    "Join our welcoming church family for worship, fellowship, and spiritual growth. Service times, events, and online giving available.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} ${dmSans.variable} antialiased`}>
      <body className="font-sans">
        {children}

        {/* ✅ React Hot Toast Toaster — global notifications */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fff",
              color: "#000",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            },
          }}
        />
      </body>
    </html>
  )
}
