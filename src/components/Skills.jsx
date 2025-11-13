import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const allSkills = [
  { name: 'React', level: 90, cat: 'Frontend' },
  { name: 'TypeScript', level: 80, cat: 'Frontend' },
  { name: 'JavaScript', level: 92, cat: 'Frontend' },
  { name: 'HTML/CSS', level: 95, cat: 'Frontend' },
  { name: 'Tailwind', level: 88, cat: 'Frontend' },
  { name: 'Node.js', level: 85, cat: 'Backend' },
  { name: 'SQL', level: 78, cat: 'Backend' },
  { name: 'Java', level: 90, cat: 'Backend' },
  { name: 'Git', level: 86, cat: 'Tools' },
  { name: 'Next.js', level: 75, cat: 'Frontend' },
  { name: 'C', level: 70, cat: 'Backend' },
]

const tabs = ['All Skills', 'Frontend', 'Backend', 'Tools']

function Progress({ value }) {
  return (
    <div className="mt-3 h-2 w-full overflow-hidden rounded bg-white/10">
      <motion.div className="h-full rounded bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-blue-400" initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
    </div>
  )
}

export default function Skills() {
  const [tab, setTab] = useState('All Skills')
  const filtered = tab === 'All Skills' ? allSkills : allSkills.filter(s => s.cat === tab)

  return (
    <section id="skills" className="mx-auto mt-24 max-w-7xl px-6">
      <h3 className="text-center text-3xl font-bold text-white">Skills</h3>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-2 text-sm backdrop-blur transition ${tab===t? 'bg-white/20 text-white ring-1 ring-white/30': 'bg-white/10 text-white/80 hover:bg-white/15'}`}>
            {t}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        <AnimatePresence>
          {filtered.map((s, i) => (
            <motion.div
              key={s.name}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ scale: 1.03 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold">{s.name}</p>
                <span className="text-sm text-white/70">{s.level}%</span>
              </div>
              <Progress value={s.level} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
