import {
  BarChart2,
  BarChart3,
  ClipboardList,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  X
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../../common/Logo'

const navigation = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'New Analysis', icon: ClipboardList, path: '/analyze' },
  { label: 'Reports & Results', icon: FileText, path: '/report' },
  { label: 'History', icon: BarChart3, path: '/dashboard#history' },
  { label: 'Patients', icon: Users, path: '/dashboard#patients' },
  { label: 'Analytics', icon: BarChart2, path: '/dashboard#analytics' },
  { label: 'Settings', icon: Settings, path: '/dashboard#settings' },
  { label: 'Help & Support', icon: HelpCircle, path: '/dashboard#support' }
]

export default function DashboardSidebar ({ isOpen, onClose }) {
  const location = useLocation()
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem('user')
    if (onClose) onClose()
    navigate('/')
  }

  const handleNavClick = () => {
    if (onClose) onClose()
  }

  const sidebarContent = (
    <div className='flex flex-col justify-between h-full space-y-6'>
      <div className='space-y-6'>
        {/* Mobile Header Inside Drawer */}
        <div className='flex items-center justify-between pb-4 border-b border-slate-200 lg:hidden'>
          <div className='flex items-center gap-3'>
            <div className='flex h-9 w-9 items-center justify-center text-[#075344]'>
              <Logo size={24} animated={false} />
            </div>
            <span className='font-bold text-slate-800 text-lg font-["Outfit"]'>KNEE-OAI</span>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition cursor-pointer'
            aria-label='Close menu'
          >
            <X size={20} />
          </button>
        </div>

        <nav className='flex flex-col space-y-1.5'>
          {navigation.map(({ label, icon: Icon, path }, index) => {
            const active =
              location.pathname === path ||
              (path === '/dashboard' &&
                location.pathname === '/dashboard' &&
                !location.hash)
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04, duration: 0.2 }}
              >
                <Link
                  to={path}
                  onClick={handleNavClick}
                  className={`flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? 'bg-[#e2f2ef] text-[#0d4239] font-bold shadow-xs scale-[1.01]'
                      : 'text-slate-600 hover:bg-[#eef7f4] hover:text-[#0d4239]'
                  }`}
                >
                  <Icon
                    size={22}
                    strokeWidth={active ? 2.2 : 1.8}
                    className={active ? 'text-[#0d4239]' : 'text-slate-500'}
                  />
                  <span className='font-semibold'>{label}</span>
                </Link>
              </motion.div>
            )
          })}
        </nav>
      </div>

      <div className='pt-4 border-t border-slate-200'>
        <button
          type='button'
          onClick={logOut}
          className='flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-slate-600 transition hover:bg-red-50 hover:text-red-600 cursor-pointer font-medium'
        >
          <LogOut size={22} className='text-slate-500 hover:text-red-600' />
          <span className='font-semibold'>Log out</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar (lg screens) */}
      <aside className='hidden lg:flex w-60 shrink-0 flex-col justify-between border-r border-slate-200 bg-[#f8fafb] px-4 py-6 min-h-[calc(100vh-4rem)]'>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay & Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden'
              onClick={onClose}
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className='fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-[#f8fafb] p-5 shadow-2xl lg:hidden'
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}


