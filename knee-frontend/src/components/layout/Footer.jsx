import Logo from '../common/Logo'

const Footer = () => {
  const handleScrollTo = (id) => (e) => {
    e.preventDefault()
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className='relative bg-gradient-to-t from-white to-emerald-50 text-gray-800 mt-12'>
      <div className='max-w-screen-2xl mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
          <div className='lg:col-span-5'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='p-3 bg-white rounded-full shadow-sm'>
                <Logo size={28} animated={false} />
              </div>
              <div>
                <h3 className='text-xl font-bold tracking-tight text-slate-900 font-["Outfit"]'>KNEE-OAI</h3>
                <p className='text-xs text-[#357B62] font-semibold tracking-wide uppercase'>
                  AI-Powered Knee Analysis Platform
                </p>
              </div>
            </div>

            <p className='text-md text-slate-600 mb-6 max-w-md leading-relaxed'>
              Advanced Kellgren-Lawrence grading and Explainable AI (XAI) Grad-CAM diagnostic assistance for radiologists and orthopedic clinicians.
            </p>

            <form className='flex flex-col sm:flex-row gap-3 max-w-md' onSubmit={(e) => e.preventDefault()}>
              <label htmlFor='footer-email' className='sr-only'>
                Email
              </label>
              <input
                id='footer-email'
                type='email'
                placeholder='Your work email'
                className='flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-[#357B62] bg-white'
              />
              <button className='bg-[#357B62] hover:bg-[#2b6450] text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm'>
                Join Now
              </button>
            </form>
          </div>

          <div className='lg:col-span-7 text-lg'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
              <div>
                <h4 className='text-md font-bold text-slate-900 uppercase tracking-wider mb-3'>Navigation</h4>
                <ul className='space-y-2 text-md text-slate-600'>
                  <li>
                    <a href='#home' onClick={handleScrollTo('home')} className='hover:text-[#357B62] transition-colors'>
                      Home
                    </a>
                  </li>
                  <li>
                    <a href='#features' onClick={handleScrollTo('features')} className='hover:text-[#357B62] transition-colors'>
                      Features
                    </a>
                  </li>
                  <li>
                    <a href='#how-it-works' onClick={handleScrollTo('how-it-works')} className='hover:text-[#357B62] transition-colors'>
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a href='#about' onClick={handleScrollTo('about')} className='hover:text-[#357B62] transition-colors'>
                      About
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className='text-md font-bold text-slate-900 uppercase tracking-wider mb-3'>Resources</h4>
                <ul className='space-y-2 text-md text-slate-600'>
                  <li>
                    <a href='#features' onClick={handleScrollTo('features')} className='hover:text-[#357B62] transition-colors'>
                      AI Analysis
                    </a>
                  </li>
                  <li>
                    <a href='#how-it-works' onClick={handleScrollTo('how-it-works')} className='hover:text-[#357B62] transition-colors'>
                      KL Grading Methodology
                    </a>
                  </li>
                  <li>
                    <a href='#about' onClick={handleScrollTo('about')} className='hover:text-[#357B62] transition-colors'>
                      Grad-CAM Explainability
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className='text-sm font-bold text-slate-900 uppercase tracking-wider mb-3'>Contact Support</h4>
                <p className='text-sm text-slate-600'>support@kneeoai.com</p>
                <p className='text-sm text-slate-500 mt-1'>
                  Clinical Decision Support System
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-screen-2xl mx-auto px-4 py-6 border-t border-emerald-100/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500'>
        <p>
          © {new Date().getFullYear()} KNEE-OAI. All rights reserved.
        </p>
        <p className='text-slate-400'>
          Empowering Orthopedic Diagnostics with Artificial Intelligence
        </p>
      </div>
    </footer>
  )
}

export default Footer
