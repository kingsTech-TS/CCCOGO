"use client"

import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"
import Image from "next/image"
import { Playfair_Display } from "next/font/google"
import { motion } from "framer-motion"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
})

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                className="flex items-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Logo */}
                <Image
                  src="/logo/cccgi.png"
                  alt="Church Logo"
                  width={36}
                  height={36}
                  className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                />

                {/* Church Name */}
                <span
                  className={`${playfair.className} ml-2 text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white tracking-wide`}
                >
                  Christ Chosen Church of God Oremeji
                </span>
              </motion.div>
            </Link>
            <p className="text-gray-300 mt-4 max-w-md">
              A welcoming church family where faith grows, hope flourishes, and
              community thrives. Join us in worship and service.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-sky-400 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
              <Youtube className="h-6 w-6 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Ministries
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/sermons"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sermons
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Contact</h4>
            <div className="space-y-2 text-gray-300">
              <p>123 Faith Street</p>
              <p>Community City, CC 12345</p>
              <p>(555) 123-PRAY</p>
              <p>info@gracecommunity.org</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Christ Chosen Church of God
          Oremeji. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
