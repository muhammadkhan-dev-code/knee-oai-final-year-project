import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from '../common/Logo'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'about', label: 'About' },
]

const Navbar = () => {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Track active section on scroll for homepage
  useEffect(() => {
    if (location.pathname !== '/') return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180

      for (const item of navItems) {
        const element = document.getElementById(item.id)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const handleScrollTo = (id) => (e) => {
    e.preventDefault()
    setActiveSection(id)
    setMobileMenuOpen(false)

    if (location.pathname !== '/') {
      window.location.href = '/#' + id
      return
    }

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="w-full fixed left-0 right-0  z-50 px-3 sm:px-6">
      <nav className="max-w-screen-2xl rounded-xl mx-auto px-4 sm:px-6 md:px-10 py-2.5 backdrop-blur-md flex items-center justify-between shadow-lg shadow-emerald-950/5 border border-emerald-100/80 bg-white/90 transition-all duration-300">


        <a
          href="#home"
          onClick={handleScrollTo('home')}
          className="cursor-pointer flex items-center gap-2.5 group"
        >
          <Logo size={40} animated={true} />
          <span className="text-md font-extrabold tracking-tight text-slate-900 font-['Outfit'] group-hover:text-[#357B62] transition-colors">
            KNEE<span className="text-[#357B62]">-OAI</span>
          </span>
        </a>


        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          {navItems.map((item) => {
            const isActive = location.pathname === '/' && activeSection === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleScrollTo(item.id)}
                className={`relative py-1 text-base font-semibold transition-all duration-200 cursor-pointer ${isActive
                  ? 'text-[#357B62] font-bold'
                  : 'text-slate-700 hover:text-[#357B62]'
                  }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#357B62] transition-all" />
                )}
              </a>
            )
          })}
        </div>


        <div className="hidden sm:flex items-center gap-3">
          <Link to="/register">
            <button className={`px-7 py-3 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm ${location.pathname === '/register'
              ? 'bg-[#2b6450] text-white ring-2 ring-emerald-400'
              : 'bg-[#357B62] text-white hover:bg-[#2b6450] hover:shadow-md hover:-translate-y-0.5'
              }`}>
              Sign Up
            </button>
          </Link>

          <Link to="/login">
            <button className={`px-7 py-3 rounded-lg border-2 font-semibold text-sm transition-all duration-200 cursor-pointer ${location.pathname === '/login'
              ? 'bg-[#357B62] text-white border-[#357B62]'
              : 'border-[#357B62] text-[#357B62] hover:bg-[#357B62] hover:text-white'
              }`}>
              Login
            </button>
          </Link>
        </div>


        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:text-[#357B62] hover:bg-emerald-50 focus:outline-none transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>


      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-screen-2xl mx-auto rounded-2xl bg-white border border-emerald-100 p-5 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = location.pathname === '/' && activeSection === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleScrollTo(item.id)}
                  className={`px-4 py-2.5 rounded-xl text-base font-semibold transition-colors ${isActive
                    ? 'bg-emerald-50 text-[#357B62] font-bold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#357B62]'
                    }`}
                >
                  {item.label}
                </a>
              )
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full py-3 rounded-xl bg-[#357B62] text-white font-semibold text-sm hover:bg-[#2b6450]">
                Sign Up
              </button>
            </Link>

            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full py-3 rounded-xl border-2 border-[#357B62] text-[#357B62] font-semibold text-sm hover:bg-emerald-50">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
