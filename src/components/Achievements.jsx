import React from 'react'
import { motion } from 'framer-motion'

const achievements = [
  'SBI Ideathon',
  'Google Cloud Arcade Champion',
  'Best Performer',
  'MSINS Winner',
  'TiE Global Summit',
]

export default function Achievements() {
  return (
    <section id="achievements" className="mx-auto mt-24 max-w-7xl px-6">
      <h3 className="text-center text-3xl font-bold text-white">Achievements</h3>
      <div className="mt-8 overflow-hidden">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {achievements.map((a, i) => (
            <motion.div key={a} whileHover={{ y: -6, scale: 1.02 }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="relative min-w-[260px] flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur">
              <div className="absolute inset-0 -z-0 bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10 opacity-0 blur-xl transition-opacity duration-500 hover:opacity-100" />
              <div className="h-28 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent" />
              <div className="mt-4 text-lg font-semibold">{a}</div>
              <div className="text-sm text-white/70">Certificate • Recognition</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
