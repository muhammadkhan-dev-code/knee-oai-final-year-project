import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function RecentAnalyses() {
  const [analyses, setAnalyses] = useState([])

  useEffect(() => {
    const savedAnalyses =
      JSON.parse(localStorage.getItem('recentAnalyses')) || []
    setAnalyses(savedAnalyses)
  }, [])

  return (
    <div className='flex h-full flex-col rounded-xl border border-[#dceae6] bg-white shadow-sm overflow-hidden'>

      <div className='flex items-center justify-between px-5 py-4 border-b border-[#dceae6]'>
        <h3 className='text-base font-bold text-slate-900'>
          Recent Analyses
        </h3>
        <Link
          to='/report'
          className='flex items-center gap-1 text-sm font-semibold text-[#0d4239] transition hover:text-[#19745f] hover:underline'
        >
          <span>View All</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full min-w-[560px] text-left text-sm'>

          <thead>
            <tr className='bg-[#f4faf7] text-slate-600 border-b border-[#dceae6]'>
              <th className='py-3 px-4 font-semibold text-xs uppercase tracking-wide'>Patient ID</th>
              <th className='py-3 px-4 font-semibold text-xs uppercase tracking-wide'>Name</th>
              <th className='py-3 px-4 font-semibold text-xs uppercase tracking-wide'>KL Grade</th>
              <th className='py-3 px-4 font-semibold text-xs uppercase tracking-wide'>Confidence</th>
              <th className='py-3 px-4 font-semibold text-xs uppercase tracking-wide hidden md:table-cell'>Date/Time</th>
              <th className='py-3 px-4 font-semibold text-xs uppercase tracking-wide'>Status</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-[#f0f7f5]'>

            {analyses.length === 0 ? (

              <tr>
                <td
                  colSpan='6'
                  className='py-10 text-center text-sm text-slate-400'
                >
                  <div className='flex flex-col items-center gap-2'>
                    <span className='text-2xl'>📋</span>
                    <span>No recent analyses found. Start a new analysis.</span>
                  </div>
                </td>
              </tr>

            ) : (

              analyses.slice(0, 5).map((item) => {

                const name = item.patient?.fullName || 'Not provided'
                const patientId = item.patient?.patientId || 'Not provided'
                const grade = item.analysis?.predicted_category || 'N/A'

                const rawConfidence = item.analysis?.confidence
                const numericConfidence = Number(rawConfidence)
                const confidence =
                  rawConfidence !== undefined && rawConfidence !== null
                    ? `${(numericConfidence * 100).toFixed(1)}%`
                    : 'N/A'

                const createdAt = item.createdAt
                  ? new Date(item.createdAt).toLocaleString()
                  : 'N/A'

                let badgeStyle = 'bg-[#e2f2ef] text-[#0d4239] border border-[#cbebe3]'
                let status = 'Completed'
                let statusStyle = 'bg-[#e2f2ef] text-[#0d4239] border border-[#cbebe3]'

                if (numericConfidence < 0.80) {
                  badgeStyle = 'bg-red-50 text-red-700 border border-red-200'
                  status = 'Critical'
                  statusStyle = 'bg-red-50 text-red-600 border border-red-200'
                } else if (numericConfidence < 0.90) {
                  badgeStyle = 'bg-amber-50 text-amber-800 border border-amber-200'
                }

                return (
                  <tr
                    key={item.id}
                    className='hover:bg-[#f4faf7] transition-colors'
                  >
                    <td className='py-3 px-4 font-medium text-slate-500 text-xs'>{patientId}</td>
                    <td className='py-3 px-4 font-semibold text-slate-900 text-sm'>{name}</td>
                    <td className='py-3 px-4'>
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeStyle}`}>
                        {grade}
                      </span>
                    </td>
                    <td className='py-3 px-4 font-medium text-slate-700 text-sm'>{confidence}</td>
                    <td className='py-3 px-4 text-slate-400 text-xs hidden md:table-cell'>{createdAt}</td>
                    <td className='py-3 px-4'>
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyle}`}>
                        {status}
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