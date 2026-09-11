export function GradeDistributionChart () {
  const categories = [
    {
      label: 'Normal/Doubtful (KL 0-1)',
      count: 42,
      percentage: '41.6%',
      color: '#0d4239'
    },
    {
      label: 'Mild/Moderate (KL 2-3)',
      count: 46,
      percentage: '45.5%',
      color: '#357B62'
    },
    {
      label: 'Severe (KL 4)',
      count: 14,
      percentage: '13.9%',
      color: '#cf4242'
    }
  ]
  const conicStyle = {
    background: `conic-gradient(
      #0d4239 0% 41.6%,
      #357B62 41.6% 87.1%,
      #cf4242 87.1% 100%
    )`
  }

  return (
    <div className='flex h-full flex-col rounded-xl border border-[#dceae6] bg-white p-5 shadow-sm overflow-hidden'>
      <h3 className='text-base font-bold text-slate-900'>
        Patient Grade Distribution
      </h3>

      <div className='mt-4 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10 py-4'>
        {/* Donut */}
        <div
          className='relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full'
          style={conicStyle}
        >
          <div className='h-24 w-24 rounded-full bg-white shadow-inner flex items-center justify-center'>
            <span className='text-xs font-bold text-slate-500'>102 total</span>
          </div>
        </div>

        {/* Legend */}
        <div className='space-y-3 w-full sm:w-auto'>
          {categories.map(({ label, count, percentage, color }) => (
            <div key={label} className='flex items-start gap-2.5 text-sm'>
              <span
                className='mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full'
                style={{ backgroundColor: color }}
              />
              <div className='min-w-0'>
                <p className='font-semibold text-slate-800 leading-snug'>{label}</p>
                <p className='text-xs text-slate-500 mt-0.5'>
                  {count} patients <span className='font-medium text-slate-600'>({percentage})</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function AnalysisVolumeChart () {
  const data = [
    { label: 'Week 1', value: 65 },
    { label: 'Week 2', value: 52 },
    { label: 'Week 3', value: 71 },
    { label: 'Week 4', value: 34 }
  ]

  const yTicks = [100, 80, 60, 40, 20, 0]

  return (
    <div className='flex h-full flex-col rounded-xl border border-[#dceae6] bg-white p-5 shadow-sm'>
      <div>
        <h3 className='text-base font-bold text-slate-900'>
          Analysis Volume — Last 4 Weeks
        </h3>
        <p className='mt-0.5 text-xs text-slate-500'>Number of Analyses</p>
      </div>
      <div className='mt-6 flex flex-1 gap-3'>
        {/* Y axis */}
        <div className='flex w-7 mb-4 flex-col justify-between text-xs text-slate-400'>
          {yTicks.map(tick => (
            <span key={tick}>{tick}</span>
          ))}
        </div>

        <div className='relative flex flex-1 flex-col'>
          {/* Plot Area */}
          <div className='relative flex-1'>
            {/* Grid Lines */}
            <div className='absolute inset-0 flex flex-col justify-between pointer-events-none'>
              {yTicks.map(tick => (
                <div key={tick} className='w-full border-b border-[#eaf0ee]' />
              ))}
            </div>

            {/* Bars */}
            <div className='absolute inset-0 flex items-end justify-around px-4 sm:px-8'>
              {data.map(({ label, value }) => (
                <div
                  key={label}
                  className='relative flex h-full w-10 sm:w-12 flex-col justify-end items-center'
                >
                  <span
                    className='absolute bottom-[calc(var(--bar-height)+4px)] text-xs font-bold text-slate-700'
                    style={{ '--bar-height': `${value}%` }}
                  >
                    {value}
                  </span>
                  <div
                    className='w-full rounded-t-md bg-[#0d4239] transition-all hover:bg-[#19745f]'
                    style={{ height: `${value}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* X Axis Labels */}
          <div className='flex justify-around px-4 sm:px-8 pt-2'>
            {data.map(({ label }) => (
              <span
                key={label}
                className='w-10 sm:w-12 text-center text-xs font-medium text-slate-500'
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
