import React from 'react'
import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay muted loop playsInline preload="metadata"
      >
        <source src="/assets/bg-motion.webm" type="video/webm" />
        <source src="/assets/bg-motion.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" />

      <motion.div initial={{ opacity:0, y: 20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }} className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold">Your Name — Photography & Videography</h1>
        <p className="mt-4 text-gray-200 max-w-2xl mx-auto">Storytelling through light and motion. Available for commissions and collaborations.</p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <a href="#portfolio" className="px-6 py-3 rounded-2xl bg-white text-gray-900">View Work</a>
          <a href="#contact" className="px-5 py-3 rounded-2xl border border-white/20">Contact</a>
        </div>
      </motion.div>
    </header>
  )
}