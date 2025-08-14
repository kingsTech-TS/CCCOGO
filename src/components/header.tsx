"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Heart } from "lucide-react"
import Image from "next/image"
import { Playfair_Display } from "next/font/google"


const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
})

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services & Ministries" },
    { href: "/events", label: "Events" },
    { href: "/sermons", label: "Sermons" },
    { href: "/prayer", label: "Prayer" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Logo */}
              <div className="flex items-center space-x-1">
                <Image
                  src="/logo/cccgi.png"
                  alt="Church Logo"
                  width={36}
                  height={36}
                  className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                />
              </div>

              {/* Church Name */}
              <span
                className={`${playfair.className} ml-2 text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 tracking-wide`}
              >
                Christ Chosen Church of God Oremeji
              </span>
            </motion.div>
          </Link>
          {/* Desktop Navigation (only large screens) */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-sky-500 transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Button className="bg-primary hover:bg-primary/90">Give Online</Button>
          </div>

          {/* Mobile + Tablet menu button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile + Tablet Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-sky-500 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button className="w-full bg-primary hover:bg-primary/90">Give Online</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
