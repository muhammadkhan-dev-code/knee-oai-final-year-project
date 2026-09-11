import Login from '../components/auth/Login'

export default function LoginPage () {
  return (
    <div className='min-h-screen w-full overflow-hidden bg-white'>
      <div className='grid min-h-screen w-full grid-cols-1 lg:grid-cols-2'>
        <div className='min-h-screen bg-white'>
          <Login />
        </div>

        <div className='relative hidden min-h-screen overflow-hidden lg:block'>
          <img
            src='/login_image.jpg'
            alt='KneeOai healthcare analysis'
            className='
              absolute
              inset-0
              h-full
              w-full
              object-cover
            '
          />

          <div
            className='
              absolute
              inset-0
              bg-gradient-to-t
              from-black/45
              via-transparent
              to-transparent
            '
          />

          {/* Optional right-side text */}
          <div className='absolute bottom-12 left-12 text-white'>
            <p className='mt-3 max-w-90 text-lg leading-8 text-white/80'>
              Upload your knee X-ray and get AI-powered analysis and clinical
              insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
