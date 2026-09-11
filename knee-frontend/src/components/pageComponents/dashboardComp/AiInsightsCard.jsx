import { Sparkles } from 'lucide-react'
import KneeSvg from '../../../assets/images/dashboard/knee-svg.jpg'

export default function AiInsightsCard () {
  return (
    <div className='relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-[#cbebe3] bg-gradient-to-br from-[#e2f2ef] via-[#edf9f6] to-[#f4fbf9] p-5 shadow-sm'>
      <div className='flex items-start justify-between gap-3'>
        {/* Text content */}
        <div className='relative z-10 flex-1 min-w-0'>
          <div className='flex items-center gap-2 text-sm font-bold text-[#0d4239]'>
            <Sparkles size={16} className='text-[#19745f] shrink-0' />
            <span>AI Insights</span>
          </div>
          <p className='mt-2.5 text-sm leading-relaxed text-slate-700'>
            Severe cases — KL 4 have increased by 5% this month. Continue
            monitoring and review critical cases to ensure timely follow-up.
          </p>
          <button className='mt-4 inline-flex items-center gap-2 rounded-xl bg-[#075344] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0d4239] cursor-pointer'>
            View Detailed Insights
          </button>
        </div>

        {/* Knee image decorative */}
        <div className='relative hidden sm:flex shrink-0 h-24 w-24 items-center justify-center'>
          <div className='absolute inset-0 rounded-full bg-teal-200/30 blur-xl' />
          <img src={KneeSvg} alt='knee svg' className='relative z-10 h-full w-full object-contain rounded-full' />
        </div>
      </div>
    </div>
  )
}
