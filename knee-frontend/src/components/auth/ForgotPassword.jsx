import { useState } from 'react'
import {
  FaArrowLeft,
  FaCheckCircle,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaShieldAlt
} from 'react-icons/fa'

import Input from '../common/Input'
import {
  requestPasswordReset,
  resetPassword,
  validateNewPasswordForm,
  verifyResetOtp
} from '../../controllers/authController'

// step: 'email' -> 'otp' -> 'newPassword' -> 'success'

export default function ForgotPassword ({ isOpen, onClose }) {
  const [step, setStep] = useState('email')

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

  const [passwordForm, setPasswordForm] = useState({
    password: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const resetLocalState = () => {
    setStep('email')
    setEmail('')
    setOtp('')
    setPasswordForm({
      password: '',
      confirmPassword: ''
    })
    setErrors({})
    setFormError('')
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  const handleClose = () => {
    resetLocalState()
    onClose()
  }

  /* ------------------------------ Step 1 ------------------------------- */

  const handleSendCode = async e => {
    e.preventDefault()
    setFormError('')
    setErrors({})

    if (!email.trim()) {
      setErrors({
        email: 'Email is required'
      })
      return
    }

    setIsSubmitting(true)

    try {
      await requestPasswordReset(email)

      setOtp('')
      setStep('otp')
    } catch (err) {
      setFormError(
        err.message || 'Something went wrong. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ------------------------------ Step 2 ------------------------------- */

  const handleVerifyOtp = async e => {
    e.preventDefault()
    setFormError('')
    setErrors({})

    if (!otp.trim() || otp.trim().length !== 6) {
      setErrors({
        otp: 'Enter the 6-digit verification code'
      })
      return
    }

    setIsSubmitting(true)

    try {
      await verifyResetOtp(email, otp)

      setStep('newPassword')
    } catch (err) {
      setFormError(
        err.message || 'Invalid verification code'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendCode = async () => {
    setFormError('')
    setErrors({})

    setIsSubmitting(true)

    try {
      await requestPasswordReset(email)

      setOtp('')
    } catch (err) {
      setFormError(
        err.message || 'Could not resend the code'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ------------------------------ Step 3 ------------------------------- */

  const handlePasswordChange = e => {
    const { name, value } = e.target

    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }

    if (formError) {
      setFormError('')
    }
  }

  const handleResetPassword = async e => {
    e.preventDefault()

    const validationErrors =
      validateNewPasswordForm(passwordForm)

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setFormError('')
    setIsSubmitting(true)

    try {
      await resetPassword(
        email,
        passwordForm.password
      )

      setStep('success')
    } catch (err) {
      setFormError(
        err.message ||
          'Something went wrong. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm'>
      <div className='w-full max-w-sm rounded-2xl bg-white p-7 shadow-xl'>

        {/* Back button */}
        {step !== 'email' && step !== 'success' && (
          <button
            type='button'
            onClick={() => {
              setFormError('')
              setErrors({})

              if (step === 'otp') {
                setStep('email')
              }

              if (step === 'newPassword') {
                setStep('otp')
              }
            }}
            className='mb-3 flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-[#357B62]'
          >
            <FaArrowLeft className='text-xs' />
            Back
          </button>
        )}

        {/* Error message */}
        {formError && (
          <div className='mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600'>
            {formError}
          </div>
        )}

        {/* ===================== STEP 1 ===================== */}

        {step === 'email' && (
          <>
            <div className='mb-5 text-center'>
              <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#357B62]/10'>
                <FaEnvelope className='text-2xl text-[#357B62]' />
              </div>

              <h2 className='text-xl font-bold text-gray-900'>
                Forgot your password?
              </h2>

              <p className='mt-2 text-sm text-gray-500'>
                Enter your account email and we'll send a verification code.
              </p>
            </div>

            <form onSubmit={handleSendCode}>
              <Input
                label='Email Address'
                type='email'
                name='email'
                placeholder='Enter your email'
                icon={
                  <FaEnvelope className='text-base text-[#357B62]' />
                }
                value={email}
                onChange={e => {
                  setEmail(e.target.value)

                  if (errors.email) {
                    setErrors({})
                  }

                  if (formError) {
                    setFormError('')
                  }
                }}
                error={errors.email}
              />

              <button
                type='submit'
                disabled={isSubmitting}
                className='mt-2 flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-[#357B62] px-4 text-sm font-semibold text-white shadow-sm shadow-green-900/10 transition duration-200 hover:bg-[#2B6450] disabled:cursor-not-allowed disabled:opacity-70'
              >
                {isSubmitting
                  ? 'Sending code...'
                  : 'Send Verification Code'}
              </button>
            </form>
          </>
        )}

        {/* ===================== STEP 2 ===================== */}

        {step === 'otp' && (
          <>
            <div className='mb-5 text-center'>
              <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#357B62]/10'>
                <FaShieldAlt className='text-2xl text-[#357B62]' />
              </div>

              <h2 className='text-xl font-bold text-gray-900'>
                Enter verification code
              </h2>

              <p className='mt-2 text-sm text-gray-500'>
                We've sent a 6-digit code to <b>{email}</b>.
              </p>
            </div>

            <form onSubmit={handleVerifyOtp}>
              <Input
                label='Verification Code'
                type='text'
                name='otp'
                placeholder='Enter 6-digit code'
                icon={
                  <FaShieldAlt className='text-base text-[#357B62]' />
                }
                value={otp}
                onChange={e => {
                  const digitsOnly = e.target.value
                    .replace(/\D/g, '')
                    .slice(0, 6)

                  setOtp(digitsOnly)

                  if (errors.otp) {
                    setErrors({})
                  }

                  if (formError) {
                    setFormError('')
                  }
                }}
                error={errors.otp}
              />

              <button
                type='submit'
                disabled={isSubmitting}
                className='mt-2 flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-[#357B62] px-4 text-sm font-semibold text-white shadow-sm shadow-green-900/10 transition duration-200 hover:bg-[#2B6450] disabled:cursor-not-allowed disabled:opacity-70'
              >
                {isSubmitting
                  ? 'Verifying...'
                  : 'Verify Code'}
              </button>

              <button
                type='button'
                onClick={handleResendCode}
                disabled={isSubmitting}
                className='mt-3 w-full cursor-pointer text-center text-xs font-medium text-[#357B62] hover:text-[#2B6450] disabled:cursor-not-allowed disabled:opacity-50'
              >
                Didn't get a code? Resend
              </button>
            </form>
          </>
        )}

        {/* ===================== STEP 3 ===================== */}

        {step === 'newPassword' && (
          <>
            <div className='mb-5 text-center'>
              <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#357B62]/10'>
                <FaLock className='text-2xl text-[#357B62]' />
              </div>

              <h2 className='text-xl font-bold text-gray-900'>
                Set a new password
              </h2>

              <p className='mt-2 text-sm text-gray-500'>
                Choose a new password for your account.
              </p>
            </div>

            <form onSubmit={handleResetPassword}>
              <Input
                label='New Password'
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Enter new password'
                icon={
                  <FaLock className='text-base text-[#357B62]' />
                }
                value={passwordForm.password}
                onChange={handlePasswordChange}
                error={errors.password}
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

              <Input
                label='Confirm New Password'
                type={
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                }
                name='confirmPassword'
                placeholder='Confirm new password'
                icon={
                  <FaLock className='text-base text-[#357B62]' />
                }
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                error={errors.confirmPassword}
                rightIcon={
                  <button
                    type='button'
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className='cursor-pointer text-gray-400 transition hover:text-[#357B62]'
                    aria-label={
                      showConfirmPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className='text-sm' />
                    ) : (
                      <FaEye className='text-sm' />
                    )}
                  </button>
                }
              />

              <button
                type='submit'
                disabled={isSubmitting}
                className='mt-2 flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-[#357B62] px-4 text-sm font-semibold text-white shadow-sm shadow-green-900/10 transition duration-200 hover:bg-[#2B6450] disabled:cursor-not-allowed disabled:opacity-70'
              >
                {isSubmitting
                  ? 'Updating...'
                  : 'Reset Password'}
              </button>
            </form>
          </>
        )}

        {/* ===================== STEP 4 ===================== */}

        {step === 'success' && (
          <div className='text-center'>
            <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#357B62]/10'>
              <FaCheckCircle className='text-3xl text-[#357B62]' />
            </div>

            <h2 className='mb-2 text-xl font-bold text-gray-900'>
              Password changed successfully!
            </h2>

            <p className='mb-6 text-sm leading-6 text-gray-500'>
              You can now log in with your new password.
            </p>

            <button
              type='button'
              onClick={handleClose}
              className='flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-[#357B62] px-4 text-sm font-semibold text-white shadow-sm shadow-green-900/10 transition duration-200 hover:bg-[#2B6450]'
            >
              Back to Login
            </button>
          </div>
        )}

        {/* Cancel */}
        {step !== 'success' && (
          <button
            type='button'
            onClick={handleClose}
            className='mt-4 w-full cursor-pointer text-center text-xs font-medium text-gray-400 hover:text-gray-600'
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}

