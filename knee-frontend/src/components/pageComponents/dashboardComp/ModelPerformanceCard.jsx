import { ShieldCheck } from 'lucide-react'

export default function ModelPerformanceCard () {
  return (
    <div className='flex h-full flex-col justify-between rounded-xl border border-[#dceae6] bg-white p-5 shadow-sm'>
      <div className='flex items-center gap-3'>
        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e2f2ef] text-[#0d4239]'>
          <ShieldCheck size={20} />
        </div>
        <h3 className='text-base font-bold text-slate-900'>
          Model Performance — DenseNet-B0
        </h3>
      </div>

      <div className='mt-5 grid grid-cols-2 gap-4'>
        <div className='rounded-lg bg-[#f4faf7] p-3'>
          <p className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>Overall Accuracy</p>
          <p className='mt-1.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0d4239]'>
            92.7%
          </p>
        </div>
        <div className='rounded-lg bg-[#f4faf7] p-3'>
          <p className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>
            Avg. Confidence
          </p>
          <p className='mt-1.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0d4239]'>
            89.2%
          </p>
        </div>
      </div>

      <p className='mt-4 text-sm text-slate-600 leading-relaxed'>
        Model is performing well across all KL grades.
      </p>
    </div>
  )
}
