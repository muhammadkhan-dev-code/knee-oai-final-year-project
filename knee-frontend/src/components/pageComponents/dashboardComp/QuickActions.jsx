import { Plus, RotateCcw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function QuickActions () {
  const navigate = useNavigate()

  return (
    <div className='flex h-full flex-col justify-between rounded-xl border border-slate-100 bg-white p-5 shadow-xs'>
      <div className='mt-6 flex flex-wrap items-center gap-3'>
        <button
          onClick={() => navigate('/analyze')}
          className='inline-flex items-center gap-2 rounded-xl bg-[#0d4239] px-8 py-3.5 text-xs font-semibold text-white  transition hover:bg-[#13574b] cursor-pointer'
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>Start New Analysis</span>
        </button>

        <button
          onClick={() => navigate('/dashboard#history')}
          className='inline-flex items-center gap-2 rounded-xl border border-[#b8e2d8] bg-white px-4 py-2.5 text-xs font-semibold text-[#0d4239] transition hover:bg-[#eaf7f4] cursor-pointer'
        >
          <RotateCcw size={14} className='text-[#0d4239]' />
          <span>Review Pending</span>
        </button>
      </div>
    </div>
  )
}
