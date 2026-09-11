import { useEffect, useRef, useState } from 'react'
import { Bell, ChevronDown, LogOut, Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../common/Logo'

export default function DashboardHeader({ user, isMobileOpen, onToggleMobile }) {
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const userName = user?.name || 'Guest'
  const userRole = user?.role || 'Radiologist'
  const userEmail = user?.email || ''
  const initial = userName.charAt(0).toUpperCase() || 'M'

  // close the dropdown when clicking anywhere outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setIsMenuOpen(false)
    navigate('/')
  }

  return (
    <header className='sticky top-0 z-30 flex h-16 w-full items-center justify-between bg-[#075344] px-4 sm:px-6 lg:px-8 text-white shadow-md'>
      <div className='flex items-center gap-3 sm:gap-4'>

        <button
          type='button'
          onClick={onToggleMobile}
          aria-label='Toggle navigation menu'
          className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#126453] text-emerald-100 transition hover:bg-[#1a7864] hover:text-white lg:hidden cursor-pointer'
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className='flex items-center gap-2.5 sm:gap-4'>
          <div className='flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center text-[#075344] shrink-0'>
            <Logo size={28} className='h-9 w-9 sm:h-10 sm:w-10' animated={false} />
          </div>
          <h1 className="text-base sm:text-xl font-bold tracking-wide text-white uppercase font-['Outfit'] truncate">
            KNEE-OAI <span className='hidden sm:inline'>DASHBOARD</span>
          </h1>
        </div>
      </div>

      <div className='flex items-center gap-2 sm:gap-4'>
        <button
          aria-label='Notifications'
          className='relative rounded-full p-2 text-emerald-100 transition hover:bg-[#185549] hover:text-white cursor-pointer'
        >
          <Bell size={20} className='sm:w-[22px] sm:h-[22px]' />
          <span className='absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-[#0d4239]' />
        </button>

        <div ref={menuRef} className='relative border-l border-[#1a5549] pl-3 sm:pl-4'>
          <button
            type='button'
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-haspopup='true'
            aria-expanded={isMenuOpen}
            className='flex items-center gap-2 sm:gap-3 cursor-pointer'
          >
            <div className='flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#1b5c4d] text-sm font-bold text-emerald-100 border border-[#2a7362]'>
              {initial}
            </div>
            <div className='hidden text-left sm:block'>
              <p className='text-sm font-semibold leading-none text-white'>
                {userName}
              </p>
              <p className='mt-1 text-xs text-emerald-200/80'>{userRole}</p>
            </div>
            <ChevronDown
              size={18}
              className={`hidden text-emerald-200/80 transition-transform duration-200 sm:block ${
                isMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isMenuOpen && (
            <div className='absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 text-slate-700 shadow-lg'>
              <div className='border-b border-slate-100 px-4 py-3'>
                <p className='truncate text-sm font-semibold text-slate-900'>
                  {userName}
                </p>
                {userEmail && (
                  <p className='mt-0.5 truncate text-xs text-slate-500'>
                    {userEmail}
                  </p>
                )}
              </div>

              <button
                type='button'
                onClick={handleLogout}
                className='flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50'
              >
                <LogOut size={18} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
