import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardHeader from './DashboardHeader'
import DashboardSidebar from './DashboardSidebar'

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}')
  } catch {
    return {}
  }
}

export default function DashboardShell({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const user = getStoredUser()
  const location = useLocation()

  // Auto-close mobile drawer when location/route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname, location.hash])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-slate-900 font-['Outfit'] flex flex-col">
      <DashboardHeader
        user={user}
        isMobileOpen={isMobileMenuOpen}
        onToggleMobile={toggleMobileMenu}
      />

      {/* Main Container below Header */}
      <div className="flex flex-1 relative min-w-0">
        <DashboardSidebar
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
        />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex-1 min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  )
}


