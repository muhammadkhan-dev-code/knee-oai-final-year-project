import { FaCheckCircle } from 'react-icons/fa'

export default function Modal ({
  isOpen,
  title,
  message,
  buttonText = 'Continue',
  onClose
}) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm'>
      <div className='w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-xl'>
        <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#357B62]/10'>
          <FaCheckCircle className='text-3xl text-[#357B62]' />
        </div>

        <h2 className='mb-2 text-xl font-bold text-gray-900'>{title}</h2>

        <p className='mb-6 text-sm leading-6 text-gray-500'>{message}</p>

        <button
          type='button'
          onClick={onClose}
          className='
            flex h-11 w-full
            cursor-pointer
            items-center
            justify-center
            rounded-lg
            bg-[#357B62]
            px-4
            text-sm
            font-semibold
            text-white
            shadow-sm
            shadow-green-900/10
            transition
            duration-200
            hover:bg-[#2B6450]
          '
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}
