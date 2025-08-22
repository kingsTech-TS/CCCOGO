"use client"

import { motion } from "framer-motion"
import { ArrowRight, Calendar, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HistorySection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-72 h-72 sm:w-80 sm:h-80 bg-blue-100 rounded-full opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-72 h-72 sm:w-80 sm:h-80 bg-indigo-100 rounded-full opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left - Text */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
               About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Us
                </span>
              </motion.h2>
              <motion.div
                className="w-20 h-1 sm:w-24 bg-gradient-to-r from-blue-600 to-purple-600 mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              ></motion.div>
            </div>

            <motion.p
              className="text-base sm:text-lg text-gray-700 leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
             Christ Chosen Church of God Oremeji Church was founded in 1985 with a simple vision: to create a place where people could experience God's love and find their spiritual home.
            </motion.p>

            <motion.p
              className="text-base sm:text-lg text-gray-700 leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              What started as a small gathering of families has grown into a vibrant community of believers from all walks of life.
            </motion.p>

            
            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
            >
              <Link href="/about">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:from-yellow-600 hover:to-amber-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Read More
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - Image Block */}
          <motion.div
            className="relative w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[3/4] w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/placeholder.svg"
                alt="about-image"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-1">77 Years of Excellence</h3>
                <p className="text-sm opacity-90">From 10,000 to 2.5M+ resources</p>
              </div>

              {/* Floating Stat */}
              <motion.div
                className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-medium border border-white/30"
                animate={{
                  y: [0, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Since 1965
              </motion.div>
            </div>

            {/* Decorative Glow Elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-30 blur-lg"
              animate={{
                scale: [1, 0.7, 1],
                x: [0, 15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
