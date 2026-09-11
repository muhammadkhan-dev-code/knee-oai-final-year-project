import { Clock, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function DashboardWelcomeHeader ({ user }) {
  const navigate = useNavigate()
  const userName = (user?.name || 'Mujahid Hussain').split(' ')[0]

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
      <div>
        <h2 className='text-xl font-extrabold text-slate-900 sm:text-2xl lg:text-3xl'>
          Welcome back, <span className='text-[#0d4239]'>{userName}!</span>
        </h2>
        <p className='mt-1 text-sm text-slate-500'>
          Here&apos;s a summary of your clinical analysis activity.
        </p>
      </div>

      <div className='flex flex-wrap items-center gap-2 sm:gap-3 shrink-0'>
        <button
          onClick={() => navigate('/analyze')}
          className='inline-flex items-center gap-2 rounded-lg bg-[#075344] px-4 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold text-white transition hover:bg-[#0d4239] cursor-pointer shadow-sm'
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>New Analysis</span>
        </button>

        <button
          onClick={() => navigate('/dashboard#history')}
          className='inline-flex items-center gap-2 rounded-lg border border-[#dceae6] bg-white px-4 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold text-[#0d4239] transition hover:bg-[#e2f2ef] hover:border-[#0d4239]/30 cursor-pointer shadow-sm'
        >
          <Clock size={16} />
          <span>Review Pending</span>
        </button>
      </div>
    </div>
  )
}
