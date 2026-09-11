const ReportStep = ({ step, title, description, children, className = '' }) => {
  return (
    <article
      className={`rounded-2xl border border-[#dfeae5] bg-white p-5 shadow-[0_10px_30px_rgba(7,26,51,0.06)] ${className}`}
    >
      <div className='mb-3 flex items-center gap-3'>
        <span className='inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#0d7c5a] text-sm font-bold text-white'>
          {step}
        </span>

        <h3 className='text-xl font-semibold text-[#0c1f37]'>{title}</h3>
      </div>

      <p className='mb-4 text-md leading-6 text-[#4f5f74]'>{description}</p>

      <div className='overflow-hidden rounded-xl border border-[#e6f0ec] bg-[#f8fcfa] p-3'>
        {children}
      </div>
    </article>
  )
}

export default ReportStep
