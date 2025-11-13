import React from 'react'
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import FunFacts from './components/FunFacts'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#070B14]/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#home" className="text-lg font-bold tracking-tight"><span className="bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">Sahil Ali</span></a>
          <nav className="hidden gap-6 md:flex">
            <a href="#about" className="text-white/80 hover:text-white">About</a>
            <a href="#skills" className="text-white/80 hover:text-white">Skills</a>
            <a href="#projects" className="text-white/80 hover:text-white">Projects</a>
            <a href="#achievements" className="text-white/80 hover:text-white">Achievements</a>
            <a href="#contact" className="text-white/80 hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      <Hero />
      <Stats />
      <About />
      <FunFacts />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
