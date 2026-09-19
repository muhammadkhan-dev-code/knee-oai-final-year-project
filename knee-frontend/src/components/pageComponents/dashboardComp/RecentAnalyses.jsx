import { ArrowRight, ChevronRight, FileText } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function RecentAnalyses() {
  const [analyses, setAnalyses] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const savedAnalyses =
      JSON.parse(localStorage.getItem('recentAnalyses')) || []
    setAnalyses(savedAnalyses)
  }, [])

  const handleRowClick = (item) => {
    navigate('/report', {
      state: {
        patient: item.patient,
        analysis: item.analysis,
        createdAt: item.createdAt
      }
    })
  }

  return (
    <div className='flex h-full flex-col rounded-2xl border border-[#dceae6] bg-white shadow-xs overflow-hidden'>
      <div className='flex items-center justify-between px-5 py-4 border-b border-[#dceae6]'>
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-[#19745f]" />
          <h3 className='text-base font-bold text-slate-900'>
            Recent Analyses
          </h3>
        </div>

        <Link
          to='/report'
          className='flex items-center gap-1 text-sm font-semibold text-[#075344] transition hover:text-[#19745f] hover:underline'
        >
          <span>View All</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full min-w-[620px] text-left text-sm'>
          <thead>
            <tr className='bg-[#f4faf7] text-slate-600 border-b border-[#dceae6]'>
              <th className='py-3 px-4 font-semibold text-xs uppercase tracking-wide'>Patient ID</th>
              <th className='py-3 px-4 font-semibold text-xs uppercase tracking-wide'>Name</th>
              <th className='py-3 px-4 font-semibold text-xs uppercase tracking-wide'>KL Grade</th>
              <th className='py-3 px-4 font-semibold text-xs uppercase tracking-wide'>Confidence</th>
              <th className='py-3 px-4 font-semibold text-xs uppercase tracking-wide hidden md:table-cell'>Date/Time</th>
              <th className='py-3 px-4 font-semibold text-xs uppercase tracking-wide text-right'>Action</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-[#f0f7f5]'>
            {analyses.length === 0 ? (
              <tr>
                <td
                  colSpan='6'
                  className='py-12 text-center text-sm text-slate-400'
                >
                  <div className='flex flex-col items-center gap-2'>
                    <span className='text-3xl'>📋</span>
                    <span className="font-medium text-slate-600">No previous analyses recorded yet.</span>
                    <Link
                      to="/analyze"
                      className="mt-2 text-xs font-bold text-[#075344] hover:underline"
                    >
                      + Start your first analysis
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              analyses.slice(0, 6).map((item) => {
                const name = item.patient?.fullName || 'Not provided'
                const patientId = item.patient?.patientId || '456677'
                const rawGrade = item.analysis?.predicted_category || 'kl4'
                
                let gradeLabel = 'KL 0-1'
                let badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200'

                if (rawGrade === 'kl0_kl1') {
                  gradeLabel = 'KL 0-1'
                  badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200'
                } else if (rawGrade === 'kl2_kl3') {
                  gradeLabel = 'KL 2-3'
                  badgeStyle = 'bg-amber-50 text-amber-800 border-amber-200'
                } else if (rawGrade === 'kl4') {
                  gradeLabel = 'KL 4'
                  badgeStyle = 'bg-rose-50 text-rose-700 border-rose-200'
                } else {
                  gradeLabel = rawGrade.toUpperCase()
                }

                const rawConfidence = item.analysis?.confidence
                const numericConfidence = Number(rawConfidence || 0)
                const confidence = `${(numericConfidence * 100).toFixed(1)}%`

                const createdAt = item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  : 'Recent'

                return (
                  <tr
                    key={item.id}
                    onClick={() => handleRowClick(item)}
                    className='hover:bg-[#f4faf7] transition-colors cursor-pointer group'
                  >
                    <td className='py-3.5 px-4 font-mono font-medium text-slate-600 text-xs'>
                      {patientId}
                    </td>
                    <td className='py-3.5 px-4 font-bold text-slate-900 text-sm group-hover:text-[#075344] transition-colors'>
                      {name}
                    </td>
                    <td className='py-3.5 px-4'>
                      <span className={`inline-block rounded-md px-2.5 py-0.5 text-xs font-bold border ${badgeStyle}`}>
                        {gradeLabel}
                      </span>
                    </td>
                    <td className='py-3.5 px-4 font-bold text-slate-800 text-sm'>
                      {confidence}
                    </td>
                    <td className='py-3.5 px-4 text-slate-500 text-xs hidden md:table-cell'>
                      {createdAt}
                    </td>
                    <td className='py-3.5 px-4 text-right'>
                      <span className='inline-flex items-center gap-1 text-xs font-bold text-[#075344] group-hover:translate-x-0.5 transition-transform'>
                        <span>View</span>
                        <ChevronRight size={14} />
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}