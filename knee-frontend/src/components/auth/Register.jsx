import { useContext, useState } from 'react'
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaPhone,
  FaUser
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Input from '../common/Input'
import Logo from '../common/Logo'
import Modal from '../common/Modal'

import { validateRegisterForm } from '../../controllers/authController'
import context from '../../context/context'

export default function Register () {
  const navigate = useNavigate()

  // Context
  const { setName, setEmail } = useContext(context)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }

    if (formError) {
      setFormError('')
    }
  }

  const validateForm = () => {
    const newErrors = validateRegisterForm(formData)

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    // Frontend validation
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setFormError('')

    try {
      const response = await axios.post(
        'http://localhost:8000/signup',
        {
          name: formData.fullName,
          email: formData.email,
          password: formData.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )

      console.log('Signup Response:', response.data)

      // Save user information in Context
      setName(formData.fullName)
      setEmail(formData.email)

      setIsLoading(false)

      // Show success modal
      setShowSuccessModal(true)

    } catch (error) {
      console.error('Signup Error:', error)
    
  console.log("Status:", error.response?.status)
  console.log("Backend Response:", error.response?.data)

      setIsLoading(false)

      setFormError(
        error.response?.data?.message ||
        'Unable to create account. Please try again.'
      )
    }
  }

  const handleModalClose = () => {
    setShowSuccessModal(false)
    navigate('/login')
  }

  return (
    <div className='flex min-h-screen w-full items-center justify-center px-7 py-8 sm:px-10 lg:px-12 xl:px-16 bg-white'>

      <div className='w-full max-w-[430px]'>

        {/* Logo */}
        <div
          className='mb-5 flex justify-center cursor-pointer'
          onClick={() => navigate('/')}
        >
          <div className='flex h-12 w-12 items-center justify-center'>
            <Logo size={44} className='h-11 w-11' />
          </div>
        </div>

        {/* Heading */}
        <div className='mb-6 text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-[34px]'>
            Create your account
          </h1>

          <p className='mt-2 text-lg leading-6 text-gray-500'>
            Join KneeOai to access AI-powered knee analysis.
          </p>
        </div>

        {/* Backend Error */}
        {formError && (
          <div className='mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600'>
            {formError}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSignup}
          className='space-y-4'
          noValidate
        >

          {/* Full Name */}
          <div>
            <Input
              label='Full Name'
              placeholder='Enter your full name'
              value={formData.fullName}
              onChange={e =>
                handleChange('fullName', e.target.value)
              }
              icon={
                <FaUser className='text-base text-[#357B62]' />
              }
            />

            {errors.fullName && (
              <p className='mt-1 text-xs text-red-600 font-medium'>
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Input
              label='Email Address'
              type='email'
              placeholder='Enter your email'
              value={formData.email}
              onChange={e =>
                handleChange('email', e.target.value)
              }
              icon={
                <FaEnvelope className='text-base text-[#357B62]' />
              }
            />

            {errors.email && (
              <p className='mt-1 text-xs text-red-600 font-medium'>
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Input
              label='Phone Number (Optional)'
              type='tel'
              placeholder='Enter your phone number'
              value={formData.phone}
              onChange={e =>
                handleChange('phone', e.target.value)
              }
              icon={
                <FaPhone className='text-base text-[#357B62]' />
              }
            />

            {errors.phone && (
              <p className='mt-1 text-xs text-red-600 font-medium'>
                {errors.phone}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              label='Password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Create a password'
              value={formData.password}
              onChange={e =>
                handleChange('password', e.target.value)
              }
              icon={
                <FaLock className='text-base text-[#357B62]' />
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
              <p className='mt-1 text-xs text-red-600 font-medium'>
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Input
              label='Confirm Password'
              type={
                showConfirmPassword
                  ? 'text'
                  : 'password'
              }
              placeholder='Confirm your password'
              value={formData.confirmPassword}
              onChange={e =>
                handleChange(
                  'confirmPassword',
                  e.target.value
                )
              }
              icon={
                <FaLock className='text-base text-[#357B62]' />
              }
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

            {errors.confirmPassword && (
              <p className='mt-1 text-xs text-red-600 font-medium'>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Create Account Button */}
          <div className='pt-1'>
            <button
              type='submit'
              disabled={isLoading}
              className='
                flex h-11
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
                disabled:opacity-70
                disabled:cursor-not-allowed
              '
            >
              {isLoading ? (
                'Creating Account...'
              ) : (
                <>
                  Create Account
                  <span className='ml-2 text-base'>
                    →
                  </span>
                </>
              )}
            </button>
          </div>

        </form>

        {/* Login Link */}
        <p className='mt-5 text-center text-md text-gray-500'>
          Already have an account?{' '}

          <button
            type='button'
            onClick={() => navigate('/login')}
            className='
              ml-1
              cursor-pointer
              font-semibold
              text-gray-900
              transition
              hover:text-[#357B62]
              hover:underline
            '
          >
            Log in
          </button>
        </p>

      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        title='Account created successfully!'
        message='Your KneeOai account has been created. Please log in to continue.'
        buttonText='Go to Login'
        onClose={handleModalClose}
      />

    </div>
  )
}

