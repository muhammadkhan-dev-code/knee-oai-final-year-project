import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

import {
  AnalysisNextStep,
  AnalyzeHeader,
  PatientInformation,
  XRayUpload
} from '../components/components'

import { DashboardShell } from '../components/pageComponents/dashboardComp'

const emptyPatient = {
  fullName: '',
  age: '',
  gender: '',
  patientId: '',
  clinicalNotes: ''
}


const allowedTypes = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'application/dicom',
  'application/dicom+json'
]

const maxFileSize = 25 * 1024 * 1024

export default function AnalyzePage () {
  const navigate = useNavigate()

  const [patientData, setPatientData] = useState(emptyPatient)
  const [xrayFile, setXrayFile] = useState(null)

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')

  // =========================
  // PATIENT DATA CHANGE
  // =========================

  const handlePatientChange = (field, value) => {
    setPatientData(current => ({
      ...current,
      [field]: value
    }))

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }

    if (apiError) {
      setApiError('')
    }
  }

  // =========================
  // FILE SELECT
  // =========================

  const handleFileSelect = file => {
    if (!file) return

    const validType =
      allowedTypes.includes(file.type) ||
      file.name.toLowerCase().endsWith('.dcm')

    if (!validType) {
      setErrors(prev => ({
        ...prev,
        xrayFile:
          'Invalid file format. Please upload JPG, PNG, or DICOM image.'
      }))
      return
    }

    if (file.size > maxFileSize) {
      setErrors(prev => ({
        ...prev,
        xrayFile:
          'File size exceeds maximum 25MB limit.'
      }))
      return
    }

    setXrayFile(file)

    setErrors(prev => ({
      ...prev,
      xrayFile: null
    }))

    setApiError('')
  }

  // =========================
  // VALIDATE FORM
  // =========================

  const validateForm = () => {
    const newErrors = {}

    if (!patientData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required'
    }

    if (!patientData.age || Number(patientData.age) <= 0) {
      newErrors.age = 'Please enter a valid age'
    }

    if (!patientData.gender) {
      newErrors.gender = 'Gender selection is required'
    }

    if (!xrayFile) {
      newErrors.xrayFile =
        'Please upload a knee X-ray image file'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // =========================
  // AI ANALYSIS
  // =========================

  const handleAnalyze = async () => {
    if (!validateForm()) {
      return
    }

    setIsAnalyzing(true)
    setApiError('')

    try {
      const formData = new FormData()

      // FastAPI expects "image"
      formData.append('image', xrayFile)

      console.log('Sending X-Ray to AI backend:', xrayFile.name)

      const response = await axios.post(
        'http://localhost:8000/predict',
        formData,
        {
          withCredentials: true
        }
      )

      const analysis = response.data

      if (!analysis) {
        throw new Error('No response received from AI model.')
      }

      // Convert local file to previewable Object URL
      const originalImage = URL.createObjectURL(xrayFile)

      const heatmapImage = analysis.heatmap
        ? `data:image/jpeg;base64,${analysis.heatmap}`
        : null

      // Save analysis in recent history
      const newAnalysis = {
        id: Date.now(),
        patient: {
          ...patientData,
          patientId: patientData.patientId || `PID-${Math.floor(100000 + Math.random() * 900000)}`,
          fileName: xrayFile.name,
          originalImage: originalImage
        },
        analysis: {
          predicted_category: analysis.predicted_category,
          confidence: analysis.confidence,
          class_probabilities: analysis.class_probabilities,
          heatmap: heatmapImage
        },
        createdAt: new Date().toISOString()
      }

      const existingAnalyses =
        JSON.parse(localStorage.getItem('recentAnalyses')) || []

      localStorage.setItem(
        'recentAnalyses',
        JSON.stringify([
          newAnalysis,
          ...existingAnalyses
        ])
      )

      // Navigate to report with full state
      navigate('/report', {
        state: {
          patient: newAnalysis.patient,
          analysis: newAnalysis.analysis,
          createdAt: newAnalysis.createdAt
        }
      })

    } catch (error) {
      console.error('AI Analysis Error:', error)

      const detail = error.response?.data?.detail

      if (Array.isArray(detail)) {
        setApiError(
          detail
            .map(item => item.msg)
            .join(', ')
        )
      } else {
        setApiError(
          detail ||
          error.response?.data?.message ||
          error.message ||
          'Unable to analyze the X-ray. Please verify the AI backend server is running.'
        )
      }

    } finally {
      setIsAnalyzing(false)
    }
  }

  // =========================
  // CLEAR FORM
  // =========================

  const handleClear = () => {
    setPatientData(emptyPatient)
    setXrayFile(null)
    setErrors({})
    setApiError('')
  }

  // =========================
  // UI
  // =========================

  return (
    <DashboardShell>
      <motion.div
        initial={{
          opacity: 0,
          y: 15
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.4
        }}
        className='w-full max-w-7xl pb-10 mx-auto'
      >
        <AnalyzeHeader />

        {/* VALIDATION ERROR */}
        <AnimatePresence>
          {Object.keys(errors).length > 0 && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0
              }}
              animate={{
                opacity: 1,
                height: 'auto'
              }}
              exit={{
                opacity: 0,
                height: 0
              }}
              className='mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700 shadow-xs overflow-hidden'
            >
              ⚠️ Please fill in all required patient fields and upload an X-ray image to proceed with AI analysis.
            </motion.div>
          )}
        </AnimatePresence>

        {/* BACKEND ERROR */}
        {apiError && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className='mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700 shadow-xs'
          >
            ⚠️ {apiError}
          </motion.div>
        )}

        {/* MAIN CONTENT GRID */}
        <div className='mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch'>
          {/* PATIENT INFORMATION */}
          <motion.section
            initial={{
              opacity: 0,
              x: -15
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.4,
              delay: 0.1
            }}
            className='flex flex-col justify-between rounded-2xl border border-[#dceae6] bg-white p-5 sm:p-6 lg:p-7 shadow-xs lg:col-span-7'
          >
            <PatientInformation
              patientData={patientData}
              onChange={handlePatientChange}
              onClear={handleClear}
              errors={errors}
            />
          </motion.section>

          {/* X-RAY UPLOAD */}
          <motion.section
            initial={{
              opacity: 0,
              x: 15
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.4,
              delay: 0.1
            }}
            className='flex flex-col justify-between rounded-2xl border border-[#dceae6] bg-white p-5 sm:p-6 lg:p-7 shadow-xs lg:col-span-5'
          >
            <XRayUpload
              file={xrayFile}
              onFileSelect={handleFileSelect}
              onRemove={() => {
                setXrayFile(null)
                setErrors(prev => ({
                  ...prev,
                  xrayFile: null
                }))
              }}
              error={errors.xrayFile}
            />
          </motion.section>
        </div>

        {/* ANALYZE BUTTON */}
        <div className="mt-6">
          <AnalysisNextStep
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
          />
        </div>
      </motion.div>
    </DashboardShell>
  )
}