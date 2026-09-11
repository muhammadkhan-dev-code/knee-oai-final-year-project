// authController.js
// Handles form validation and account create/login/forgot-password logic
// for the frontend. Uses localStorage as a lightweight mock "database" so
// the flow works end-to-end without a backend. Swap the internals of
// registerUser / loginUser / requestPasswordReset with real API calls
// whenever the backend is ready.


const USERS_KEY = 'knee_users'
const SESSION_KEY = 'user'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^\+?[0-9]{10,14}$/

function getUsers () {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

function saveUsers (users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// Seed one demo account (matches the default values the login form used to
// pre-fill) so login can be tested even before registering.
function seedDemoUser () {
  const users = getUsers()
  const exists = users.some(
    u => u.email === 'mujahid.radiology@hospital.org'
  )
  if (!exists) {
    users.push({
      name: 'Mujahid Hussain',
      role: 'Radiologist',
      email: 'mujahid.radiology@hospital.org',
      phone: '03001234567',
      password: 'Password123!'
    })
    saveUsers(users)
  }
}
seedDemoUser()

/* ----------------------------- Validation ----------------------------- */

export function validateRegisterForm ({
  fullName,
  email,
  phone,
  password,
  confirmPassword
}) {
  const errors = {}

  if (!fullName.trim()) {
    errors.fullName = 'Full Name is required'
  }

  if (!email.trim()) {
    errors.email = 'Email Address is required'
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = 'Please enter a valid email address'
  }

  // phone is optional on this form, only validate format if provided
  if (phone && phone.trim() && !PHONE_REGEX.test(phone.replace(/[\s-]/g, ''))) {
    errors.phone = 'Please enter a valid phone number'
  }

  if (!password) {
    errors.password = 'Password is required'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
}

export function validateLoginForm ({ email, password }) {
  const errors = {}

  if (!email.trim()) {
    errors.email = 'Email address is required'
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = 'Please enter a valid email address'
  }

  if (!password) {
    errors.password = 'Password is required'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  return errors
}

export function validateNewPasswordForm ({ password, confirmPassword }) {
  const errors = {}

  if (!password) {
    errors.password = 'Password is required'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
}

/* ------------------------------ Actions -------------------------------- */

export function registerUser ({ fullName, email, phone, password }) {
  const users = getUsers()

  const alreadyExists = users.some(
    u => u.email.toLowerCase() === email.trim().toLowerCase()
  )
  if (alreadyExists) {
    throw new Error('An account with this email already exists')
  }

  const newUser = {
    name: fullName.trim(),
    role: 'Radiologist',
    email: email.trim(),
    phone: phone ? phone.trim() : '',
    password
  }

  users.push(newUser)
  saveUsers(users)

  return newUser
}

export function loginUser ({ email, password }) {
  const users = getUsers()

  const found = users.find(
    u =>
      u.email.toLowerCase() === email.trim().toLowerCase() &&
      u.password === password
  )

  if (!found) {
    throw new Error('Invalid email or password')
  }

  // eslint-disable-next-line no-unused-vars
  const { password: _pw, ...sessionUser } = found
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser))

  return sessionUser
}

export function logoutUser () {
  localStorage.removeItem(SESSION_KEY)
}

/* -------------------------- Forgot Password ----------------------------- */
// Two-step "forgot password" flow: request a code -> verify the code ->
// set a new password. There is no real email service wired up yet, so
// requestPasswordReset() returns the OTP directly so the UI can display
// it for demo/testing purposes (swap this for a real API call later).

/* -------------------------- Forgot Password ----------------------------- */

const API_URL = 'http://127.0.0.1:8000'

export async function requestPasswordReset (email) {
  if (!email || !EMAIL_REGEX.test(email.trim())) {
    throw new Error('Enter a valid email address')
  }

  const response = await fetch(
    `${API_URL}/forgot-password?email=${encodeURIComponent(email.trim())}`,
    {
      method: 'POST'
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || 'Unable to send verification code')
  }

  return true
}

export async function verifyResetOtp (email, otp) {
  const response = await fetch(
    `${API_URL}/verify-otp?email=${encodeURIComponent(email.trim())}&otp=${encodeURIComponent(otp.trim())}`,
    {
      method: 'POST'
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || 'Invalid verification code')
  }

  return true
}

export async function resetPassword (email, newPassword) {
  const response = await fetch(
    `${API_URL}/reset-password?email=${encodeURIComponent(email.trim())}&new_password=${encodeURIComponent(newPassword)}`,
    {
      method: 'POST'
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || 'Unable to reset password')
  }

  return true
}