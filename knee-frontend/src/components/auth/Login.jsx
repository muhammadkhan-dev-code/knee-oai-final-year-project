import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Input, Logo } from '../components'
import Modal from '../common/Modal'
import ForgotPassword from './ForgotPassword'
import { validateLoginForm } from '../../controllers/authController'
import context from '../../context/context'

export default function Login () {
  const navigate = useNavigate()

  // =========================
  // CONTEXT
  // =========================
  const {
    name,
    setName,
    email: registeredEmail,
    setEmail: setContextEmail
  } = useContext(context)

  // =========================
  // LOGIN FORM
  // =========================
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // =========================
  // UI STATES
  // =========================
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState('')

  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(null)

  const [showForgotPassword, setShowForgotPassword] = useState(false)

  // =========================
  // REGISTER SE EMAIL
  // LOGIN MEIN SET KARNA
  // =========================
  useEffect(() => {
    if (registeredEmail) {
      setEmail(registeredEmail)
    }
  }, [registeredEmail])

  // =========================
  // FORM VALIDATION
  // =========================
  const validateForm = () => {
    const newErrors = validateLoginForm({
      email,
      password
    })

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // =========================
  // LOGIN SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Clear previous error
    setFormError('')

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      /*
        IMPORTANT:

        Tumhare FastAPI backend ke error mein:

        loc: ['query', 'email']
        loc: ['query', 'password']

        aa raha tha.

        Iska matlab backend email aur password
        QUERY PARAMETERS mein expect kar raha hai.

        Isliye axios mein params use kar rahe hain.
      */

      const response = await axios.post(
        'http://localhost:8000/login',
        null,
        {
          params: {
            email: email,
            password: password
          },
          withCredentials: true
        }
      )

      const data = response.data

      console.log('Login response:', data)

      // =========================
      // USER DATA
      // =========================

      const user = data.user || {
        name: name || 'User',
        email: email
      }

      // =========================
      // UPDATE CONTEXT
      // =========================

      setName(user.name || name || 'User')
      setContextEmail(user.email || email)
      localStorage.setItem('user', JSON.stringify(user))

      // =========================
      // LOCAL USER
      // =========================

      setLoggedInUser(user)

      setIsLoading(false)

      // =========================
      // SUCCESS MODAL
      // =========================

      setShowWelcomeModal(true)

    } catch (error) {
      setIsLoading(false)

      console.error('Login error:', error)

      // Debug information
      console.log('STATUS:', error.response?.status)
      console.log('DATA:', error.response?.data)
      console.log('DETAIL:', error.response?.data?.detail)

      const detail = error.response?.data?.detail

      // =========================
      // FASTAPI VALIDATION ERROR
      // =========================

      if (Array.isArray(detail)) {
        const messages = detail
          .map(item => item.msg)
          .filter(Boolean)

        setFormError(
          messages.length > 0
            ? messages.join(', ')
            : 'Invalid login request.'
        )

        // Console debugging
        detail.forEach((item, index) => {
          console.log(`ERROR ${index + 1}:`, item)
          console.log(`LOCATION ${index + 1}:`, item.loc)
          console.log(`MESSAGE ${index + 1}:`, item.msg)
        })

        return
      }

      // =========================
      // NORMAL BACKEND ERROR
      // =========================

      setFormError(
        detail ||
        error.response?.data?.message ||
        'Unable to log in. Please check your email and password.'
      )
    }
  }

  // =========================
  // WELCOME MODAL CLOSE
  // =========================
  const handleModalClose = () => {
    setShowWelcomeModal(false)
    navigate('/dashboard')
  }

  // =========================
  // RENDER
  // =========================
  return (
    <div className='relative flex min-h-screen w-full flex-col bg-white'>

      {/* =========================
          HEADER
      ========================= */}

      <header className='flex w-full items-center justify-between px-7 py-6 sm:px-10 lg:px-12 xl:px-16'>

        <div
          onClick={() => navigate('/')}
          className='cursor-pointer'
        >
          <div className='flex h-10 w-10 items-center justify-center'>

            <span className='text-3xl font-bold text-[#357B62]'>
              <Logo />
            </span>

          </div>
        </div>

        <button
          type='button'
          onClick={() => navigate('/register')}
          className='
            cursor-pointer
            rounded-full
            border
            border-gray-200
            bg-white
            px-5
            py-2
            text-sm
            font-medium
            text-gray-600
            transition
            duration-200
            hover:border-[#357B62]
            hover:text-[#357B62]
          '
        >
          Sign up
        </button>

      </header>

      {/* =========================
          MAIN
      ========================= */}

      <main className='flex flex-1 items-center justify-center px-7 py-10 sm:px-10 lg:px-12 xl:px-16'>

        <div className='w-full max-w-[430px] -mt-8'>

          {/* =========================
              TITLE
          ========================= */}

          <div className='mb-8'>

            <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-[34px]'>
              Welcome back
            </h1>

            <p className='mt-2 text-lg leading-6 text-gray-500'>
              Sign in to access your analysis and reports.
            </p>

          </div>

          {/* =========================
              FORM ERROR
          ========================= */}

          {formError && (
            <div className='mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600'>
              {formError}
            </div>
          )}

          {/* =========================
              LOGIN FORM
          ========================= */}

          <form
            onSubmit={handleSubmit}
            className='space-y-5'
            noValidate
          >

            {/* =========================
                EMAIL
            ========================= */}

            <div>

              <Input
                label='Email'
                type='email'
                value={email}
                onChange={e => {

                  setEmail(e.target.value)

                  if (errors.email) {
                    setErrors(prev => ({
                      ...prev,
                      email: null
                    }))
                  }

                  if (formError) {
                    setFormError('')
                  }

                }}
                placeholder='you@example.com'
                icon={
                  <FaEnvelope className='text-lg text-[#357B62]' />
                }
              />

              {errors.email && (
                <p className='mt-1 text-xs font-medium text-red-600'>
                  {errors.email}
                </p>
              )}

            </div>

            {/* =========================
                PASSWORD
            ========================= */}

            <div>

              <Input
                label='Password'
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                value={password}
                onChange={e => {

                  setPassword(e.target.value)

                  if (errors.password) {
                    setErrors(prev => ({
                      ...prev,
                      password: null
                    }))
                  }

                  if (formError) {
                    setFormError('')
                  }

                }}
                placeholder='Your password'
                icon={
                  <FaLock className='text-lg text-[#357B62]' />
                }
                rightIcon={

                  <button
                    type='button'
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className='cursor-pointer text-gray-400 transition hover:text-[#357B62]'
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >

                    {showPassword ? (
                      <FaEyeSlash className='text-sm' />
                    ) : (
                      <FaEye className='text-sm' />
                    )}

                  </button>

                }
              />

              {errors.password && (
                <p className='mt-1 text-xs font-medium text-red-600'>
                  {errors.password}
                </p>
              )}

            </div>

            {/* =========================
                REMEMBER + FORGOT
            ========================= */}

            <div className='flex items-center justify-between pt-1'>

              <label className='flex cursor-pointer items-center gap-2 text-xs text-gray-500'>

                <input
                  type='checkbox'
                  defaultChecked
                  className='h-3.5 w-3.5 rounded border-gray-300 text-[#357B62] focus:ring-[#357B62]'
                />

                Remember me

              </label>

              <button
                type='button'
                onClick={() =>
                  setShowForgotPassword(true)
                }
                className='cursor-pointer text-xs font-medium text-[#357B62] transition hover:text-[#2B6450]'
              >
                Forgot Password?
              </button>

            </div>

            {/* =========================
                LOGIN BUTTON
            ========================= */}

            <div className='pt-1'>

              <button
                type='submit'
                disabled={isLoading}
                className='
                  flex
                  h-11
                  w-full
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
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                '
              >

                {isLoading ? (
                  'Signing in...'
                ) : (
                  <>
                    Sign in

                    <span className='ml-2 text-base'>
                      →
                    </span>
                  </>
                )}

              </button>

            </div>

          </form>

          {/* =========================
              REGISTER LINK
          ========================= */}

          <p className='mt-7 text-center text-xs text-gray-500'>

            Don't have an account?{' '}

            <button
              type='button'
              onClick={() => navigate('/register')}
              className='cursor-pointer font-semibold text-gray-900 transition hover:text-[#357B62] hover:underline'
            >
              Create one
            </button>

          </p>

        </div>

      </main>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className='px-7 py-5 sm:px-10 lg:px-12 xl:px-16'>

        <div className='flex items-center gap-4 text-[11px] text-gray-400'>

          <span>
            © 2026 KneeOai Pro
          </span>

          <span>
            •
          </span>

          <button
            type='button'
            className='cursor-pointer transition hover:text-gray-600'
          >
            Privacy
          </button>

          <button
            type='button'
            className='cursor-pointer transition hover:text-gray-600'
          >
            Terms
          </button>

        </div>

      </footer>

      {/* =========================
          SUCCESS MODAL
      ========================= */}

      <Modal
        isOpen={showWelcomeModal}
        title='Welcome to KneeOai website'
        message={`Great to see you${
          loggedInUser
            ? `, ${loggedInUser.name}`
            : ''
        }! Taking you to your dashboard now.`}
        buttonText='Go to Dashboard'
        onClose={handleModalClose}
      />

      {/* =========================
          FORGOT PASSWORD
      ========================= */}

      <ForgotPassword
        isOpen={showForgotPassword}
        onClose={() =>
          setShowForgotPassword(false)
        }
      />

    </div>
  )
}

