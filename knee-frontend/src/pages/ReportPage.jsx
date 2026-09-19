import { useEffect, useRef, useState } from 'react'
import { Plus, ArrowLeft, History, FileText } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import { DashboardShell } from '../components/pageComponents/dashboardComp'
import {
  ClinicalReportDocument,
  ImagingPanel,
  PredictionSummary,
  ProbabilityChart,
  ReportActions,
  ReportFooter,
  ReportPatientCard,
} from '../components/pageComponents/reportComp'
import { downloadReportPdf } from '../utils/pdfGenerator'

// Sample fallback report when no local storage analysis exists
const fallbackReport = {
  patient: {
    fullName: 'Ghazanfar Ali',
    age: '76',
    gender: 'male',
    patientId: '456677',
    kneeSide: 'Right Knee',
    clinicalNotes: 'Chronic joint pain and morning stiffness in right knee.',
    fileName: 'Knee_AP_Study.jpg',
    originalImage: null
  },
  analysis: {
    predicted_category: 'kl4',
    confidence: 0.8933,
    class_probabilities: {
      kl0_kl1: 0.0268,
      kl2_kl3: 0.0799,
      kl4: 0.8933
    },
    heatmap: null
  },
  createdAt: new Date().toISOString()
}

export default function ReportPage() {
  const { state } = useLocation()
  const reportRef = useRef(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  // Manage all available analyses
  const [recentAnalyses, setRecentAnalyses] = useState([])
  const [currentAnalysis, setCurrentAnalysis] = useState(null)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('recentAnalyses')) || []
      setRecentAnalyses(saved)

      // Priority 1: Use router state if present
      if (state?.patient && state?.analysis) {
        setCurrentAnalysis({
          patient: state.patient,
          analysis: state.analysis,
          createdAt: state.createdAt || new Date().toISOString()
        })
      } else if (saved.length > 0) {
        // Priority 2: Use latest analysis from localStorage
        setCurrentAnalysis(saved[0])
      } else {
        // Priority 3: Fallback sample study
        setCurrentAnalysis(fallbackReport)
      }
    } catch {
      setCurrentAnalysis(fallbackReport)
    }
  }, [state])

  const handleSelectAnalysis = (item) => {
    setCurrentAnalysis(item)
  }

  const patient = currentAnalysis?.patient || fallbackReport.patient
  const analysis = currentAnalysis?.analysis || fallbackReport.analysis
  const createdAt = currentAnalysis?.createdAt || new Date().toISOString()

  const handleDownloadPdf = async () => {
    if (!reportRef.current || isDownloading) return
    setIsDownloading(true)
    setDownloadSuccess(false)

    try {
      const patientId = patient?.patientId || '456677'
      const fileName = `KOA-AI_Assessment_${patientId}.pdf`
      await downloadReportPdf(reportRef.current, fileName)
      setDownloadSuccess(true)
      setTimeout(() => setDownloadSuccess(false), 4000)
    } catch (err) {
      console.error('PDF Generation Error:', err)
      alert(`Report generation issue: ${err.message || 'Please try again'}`)
    } finally {
      setIsDownloading(false)
    }
  }


  return (
    <DashboardShell>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto w-full max-w-7xl pb-12"
      >
        {/* ============================================================
            1. HEADER & ACTION BAR
        ============================================================ */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-['Outfit']">
                Analysis <span className="text-[#075344]">Results</span>
              </h1>
              <span className="hidden sm:inline-flex items-center rounded-full bg-[#e2f2ef] px-2.5 py-0.5 text-xs font-bold text-[#075344] border border-[#cbebe3]">
                AI-Assisted
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Knee osteoarthritis radiograph evaluation &amp; Kellgren-Lawrence grading
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <ReportActions
              onDownloadPdf={handleDownloadPdf}
              isDownloading={isDownloading}
            />

            <Link
              to="/analyze"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#075344] px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#0d4239] cursor-pointer"
            >
              <Plus size={16} />
              <span>New Analysis</span>
            </Link>
          </div>
        </div>

        {/* Download Success Notice */}
        {downloadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-800 flex items-center justify-between"
          >
            <span>✓ PDF Report successfully generated and downloaded!</span>
          </motion.div>
        )}

        {/* Studies switcher banner if multiple analyses are in localStorage */}
        {recentAnalyses.length > 1 && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white border border-[#dceae6] p-3 text-xs shadow-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <History size={15} className="text-[#19745f]" />
              <span className="font-semibold">Viewing Assessment:</span>
              <span className="font-bold text-[#075344]">
                {patient?.fullName || 'Patient'} ({patient?.patientId || 'ID: 456677'})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Switch Study:</span>
              <select
                className="rounded-lg border border-slate-200 bg-[#f8faf9] px-2.5 py-1 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#19745f]"
                value={currentAnalysis?.id || ''}
                onChange={(e) => {
                  const found = recentAnalyses.find(a => String(a.id) === e.target.value)
                  if (found) handleSelectAnalysis(found)
                }}
              >
                {recentAnalyses.map((item, idx) => (
                  <option key={item.id || idx} value={item.id || idx}>
                    {item.patient?.fullName || `Study #${idx + 1}`} - {item.analysis?.predicted_category?.toUpperCase() || 'KL'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ============================================================
            2. MAIN DASHBOARD CONTENT (RESPONSIVE GRID)
        ============================================================ */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: PATIENT CARD (4 COLS ON DESKTOP) */}
          <div className="lg:col-span-4 w-full">
            <ReportPatientCard patient={patient} />
          </div>

          {/* RIGHT COLUMN: ASSESSMENT & DIAGNOSIS (8 COLS ON DESKTOP) */}
          <div className="lg:col-span-8 space-y-6 w-full min-w-0">
            {/* Top Summary Banner */}
            <PredictionSummary analysis={analysis} />

            {/* Middle Grid: Probabilities + GradCAM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProbabilityChart analysis={analysis} />
              <ImagingPanel patient={patient} analysis={analysis} />
            </div>

            {/* Bottom: Human-Friendly Interpretation Guide & Study Metadata */}
            <ReportFooter />
          </div>
        </div>

        {/* ============================================================
            3. 1-PAGE CLINICAL REPORT TEMPLATE (FOR PDF EXPORT)
        ============================================================ */}
        <div
          ref={reportRef}
          style={{ display: 'none' }}
          className="print:block"
        >
          <ClinicalReportDocument
            patient={patient}
            analysis={analysis}
            createdAt={createdAt}
          />
        </div>
      </motion.div>
    </DashboardShell>
  )
}