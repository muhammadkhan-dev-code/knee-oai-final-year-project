import Register from '../components/auth/Register.jsx'

export default function RegisterPage () {
  return (
    <div className='relative flex min-h-screen w-full flex-col bg-white'>
      <div className='grid min-h-screen w-full grid-cols-1 lg:grid-cols-2'>
        <div className='min-h-screen bg-white'>
          <Register />
        </div>
        <div className='relative hidden min-h-screen overflow-hidden lg:block'>
          <img
            src='/singup-image.png'
            alt='Knee-OAI healthcare analysis'
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
              bg-linear-to-t
              from-black/45
              via-transparent
              to-transparent
            '
          />
        </div>
      </div>
    </div>
  )
}
