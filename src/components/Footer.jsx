import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#0B0F19]">
      <div className="mx-auto max-w-7xl px-6 py-10 text-white/80">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p>Sahil Ali — Full Stack Developer specializing in creating beautiful, functional web applications.</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="GitHub" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Github className="h-5 w-5" /></a>
            <a href="#" aria-label="LinkedIn" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Linkedin className="h-5 w-5" /></a>
            <a href="#contact" aria-label="Mail" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Mail className="h-5 w-5" /></a>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center">
          <a href="#home" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white hover:bg-white/10"><ArrowUp className="h-4 w-4" /> Top</a>
        </div>
      </div>
    </footer>
  )
}
