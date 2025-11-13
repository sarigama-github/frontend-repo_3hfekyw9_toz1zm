import React from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="mx-auto mt-24 max-w-7xl px-6">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="text-3xl font-bold text-white">Get in touch</h3>
          <p className="mt-3 text-white/80">I’d love to hear about your project. Let’s build something great together.</p>

          <div className="mt-6 space-y-3 text-white/80">
            <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-cyan-300" /> Sahilali57254@gmail.com</div>
            <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-cyan-300" /> 8956741978</div>
            <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-cyan-300" /> Akola, Maharashtra, India</div>
          </div>
        </div>

        <motion.form whileHover={{ scale: 1.002 }} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-xl backdrop-blur">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-white/70">Name</label>
              <input className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 outline-none placeholder:text-white/50" placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm text-white/70">Email</label>
              <input type="email" className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 outline-none placeholder:text-white/50" placeholder="you@example.com" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-white/70">Subject</label>
              <input className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 outline-none placeholder:text-white/50" placeholder="Let’s work together" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-white/70">Message</label>
              <textarea rows={5} className="mt-1 w-full resize-none rounded-lg border border-white/10 bg-white/10 px-3 py-2 outline-none placeholder:text-white/50" placeholder="Tell me about your idea" />
            </div>
          </div>
          <button type="button" className="mt-4 w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-4 py-3 font-semibold text-white shadow-lg transition hover:from-fuchsia-400 hover:to-cyan-400">Send Message</button>
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />
        </motion.form>
      </div>
    </section>
  )
}
