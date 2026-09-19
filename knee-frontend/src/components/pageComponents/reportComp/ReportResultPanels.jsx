import { useState } from 'react'
import {
  Download,
  Info,
  Printer,
  ScanLine,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react'
import { motion } from 'framer-motion'

/* =========================================================
   HELPER - IMAGE SOURCE
========================================================= */

function getImageSource(image, defaultType = 'image/jpeg') {
  if (!image) return null
  if (typeof image !== 'string') return null
  const trimmedImage = image.trim()
  if (!trimmedImage) return null

  // Already a complete browser image URL or blob
  if (
    trimmedImage.startsWith('data:image/') ||
    trimmedImage.startsWith('http://') ||
    trimmedImage.startsWith('https://') ||
    trimmedImage.startsWith('blob:')
  ) {
    return trimmedImage
  }

  // Base64 image
  return `data:${defaultType};base64,${trimmedImage}`
}

/* =========================================================
   PREDICTION SUMMARY
========================================================= */

export function PredictionSummary({ analysis = {} }) {
  const predictedCategory = analysis?.predicted_category || 'N/A'
  const confidence = Number(analysis?.confidence || 0)
  const confidencePercent = (confidence * 100).toFixed(2)

  let gradeText = 'KL Grade'
  let description = 'Assessment Completed'
  let summaryText = 'AI model analysis completed.'
  let badgeColor = 'bg-[#e2f2ef] text-[#075344] border border-[#b8e2d8]'

  if (predictedCategory === 'kl0_kl1') {
    gradeText = 'KL 0-1'
    description = 'Normal / Doubtful'
    summaryText = 'No significant signs of osteoarthritis detected. Joint spaces appear preserved.'
    badgeColor = 'bg-emerald-50 text-emerald-800 border border-emerald-200'
  } else if (predictedCategory === 'kl2_kl3') {
    gradeText = 'KL 2-3'
    description = 'Mild to Moderate'
    summaryText = 'Definite osteophytes present with moderate joint space narrowing detected.'
    badgeColor = 'bg-amber-50 text-amber-800 border border-amber-200'
  } else if (predictedCategory === 'kl4') {
    gradeText = 'KL 4'
    description = 'Severe'
    summaryText = 'Severe osteoarthritis findings: marked joint space loss, subchondral sclerosis, and deformity.'
    badgeColor = 'bg-rose-50 text-rose-800 border border-rose-200'
  } else if (predictedCategory !== 'N/A') {
    gradeText = predictedCategory.toUpperCase()
    description = 'Analyzed'
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-[#dceae6] bg-white p-5 sm:p-6 shadow-xs"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 sm:gap-6">
        {/* Confidence Donut Ring */}
        <div
          className="relative grid h-24 w-24 sm:h-28 sm:w-28 shrink-0 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#19745f 0 ${confidencePercent}%, #dcece7 ${confidencePercent}% 100%)`
          }}
        >
          <div className="grid h-18 w-18 sm:h-20 sm:w-20 place-items-center rounded-full bg-white text-center shadow-xs">
            <strong className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              {confidencePercent}%
            </strong>
            <span className="text-[10px] text-slate-500 font-semibold leading-none">
              Confidence
            </span>
          </div>
        </div>

        {/* Prediction Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#19745f]">
            Predicted KL Assessment
          </p>

          <div className="mt-1.5 flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#075344]">
              {gradeText}
            </h2>
            <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${badgeColor}`}>
              {description}
            </span>
          </div>

          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 max-w-2xl">
            {summaryText}
          </p>
        </div>
      </div>
    </motion.section>
  )
}

/* =========================================================
   PROBABILITY CHART
========================================================= */

export function ProbabilityChart({ analysis = {} }) {
  const probabilities = analysis?.class_probabilities || {}

  const items = [
    {
      label: 'KL 0-1',
      description: 'Normal / Doubtful',
      value: Number(probabilities.kl0_kl1 || 0) * 100,
      color: '#19745f'
    },
    {
      label: 'KL 2-3',
      description: 'Mild / Moderate',
      value: Number(probabilities.kl2_kl3 || 0) * 100,
      color: '#d97706'
    },
    {
      label: 'KL 4',
      description: 'Severe Osteoarthritis',
      value: Number(probabilities.kl4 || 0) * 100,
      color: '#e11d48'
    }
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-2xl border border-[#dceae6] bg-white p-5 shadow-xs flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            Class Probabilities
          </h2>
          <span className="text-[11px] font-medium text-slate-400">
            Multiclass Distribution
          </span>
        </div>

        {/* Horizontal Distribution Bars */}
        <div className="mt-5 space-y-4">
          {items.map(({ label, description, value, color }, index) => (
            <div key={label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">
                  {label}{' '}
                  <span className="font-normal text-slate-500">
                    ({description})
                  </span>
                </span>
                <span className="font-bold text-slate-900">
                  {value.toFixed(2)}%
                </span>
              </div>

              <div className="h-3 w-full rounded-full bg-[#edf4f2] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + index * 0.1,
                    ease: 'easeOut'
                  }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-[#f8faf9] p-3 text-[11px] text-slate-500 border border-[#e8f1ee]">
        Highest scoring category is assigned as the primary diagnosis recommendation.
      </div>
    </motion.section>
  )
}

/* =========================================================
   IMAGING PANEL (GRAD-CAM + ORIGINAL)
========================================================= */

export function ImagingPanel({
  analysis = {},
  originalImage,
  patient = {}
}) {
  const originalImageSource = getImageSource(
    originalImage || patient?.originalImage,
    'image/jpeg'
  )

  const heatmapImageSource = getImageSource(
    analysis?.heatmap,
    'image/png'
  )

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl border border-[#dceae6] bg-white p-5 shadow-xs"
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <ScanLine size={16} className="text-[#19745f]" />
          Visual AI Explanation (Grad-CAM)
        </h2>
        <span className="text-[11px] font-medium text-slate-400">
          Attention Map
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Original X-Ray */}
        <div>
          <p className="mb-2 text-center text-xs font-semibold text-slate-600">
            Original X-Ray
          </p>
          <div className="h-48 rounded-xl bg-slate-950 flex items-center justify-center overflow-hidden border border-slate-900">
            {originalImageSource ? (
              <img
                src={originalImageSource}
                alt="Original knee X-ray"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="text-xs text-slate-400">
                Original image not available
              </div>
            )}
          </div>
        </div>

        {/* Grad-CAM Heatmap */}
        <div>
          <p className="mb-2 text-center text-xs font-semibold text-slate-600">
            AI Attention Focus
          </p>
          <div className="h-48 rounded-xl bg-slate-950 flex items-center justify-center overflow-hidden border border-slate-900">
            {heatmapImageSource ? (
              <img
                src={heatmapImageSource}
                alt="AI Grad-CAM Heatmap"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="text-xs text-slate-400">
                Heatmap map not available
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* =========================================================
   REPORT FOOTER & INTERPRETATION GUIDE
========================================================= */

export function ReportFooter() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="grid gap-4 lg:grid-cols-12"
    >
      {/* Human Interpretation Guide */}
      <div className="rounded-2xl border border-[#dceae6] bg-white p-5 shadow-xs lg:col-span-8 flex flex-col justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Kellgren-Lawrence (KL) Grading Guide
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Standard clinical criteria for knee osteoarthritis classification
          </p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-xl bg-[#f5fbf9] p-3 border border-[#dceae6]">
              <div className="flex items-center gap-1.5 font-bold text-xs text-[#075344]">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                KL 0-1 (Normal / Doubtful)
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
                No or questionable joint space narrowing. Clear joint integrity with minimal or no osteophytes.
              </p>
            </div>

            <div className="rounded-xl bg-[#fffcf5] p-3 border border-[#faecd8]">
              <div className="flex items-center gap-1.5 font-bold text-xs text-amber-800">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                KL 2-3 (Mild / Moderate)
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
                Definite osteophytes with noticeable joint space narrowing. Moderate sclerosis may be present.
              </p>
            </div>

            <div className="rounded-xl bg-[#fff5f6] p-3 border border-[#fbd3d8]">
              <div className="flex items-center gap-1.5 font-bold text-xs text-rose-800">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                KL 4 (Severe)
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
                Severe joint space loss with marked bone deformity, multiple large osteophytes, and sclerosis.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#edf8f4] p-3 text-xs text-slate-700">
          <ShieldCheck size={18} className="shrink-0 text-[#19745f]" />
          <span>
            This assessment is intended as a clinical decision support tool and should be validated by a qualified radiologist or physician.
          </span>
        </div>
      </div>

      {/* Analysis Metadata */}
      <div className="rounded-2xl border border-[#dceae6] bg-white p-5 shadow-xs lg:col-span-4 flex flex-col justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Study Information
          </h2>

          <dl className="mt-4 space-y-3 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
              <dt className="text-slate-500">Status</dt>
              <dd className="font-bold text-[#19745f] flex items-center gap-1">
                <CheckCircle2 size={13} />
                Completed
              </dd>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
              <dt className="text-slate-500">AI Model</dt>
              <dd className="font-semibold text-slate-800">KOA-AI (Grad-CAM v2)</dd>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
              <dt className="text-slate-500">Modality</dt>
              <dd className="font-semibold text-slate-800">Knee Radiograph (X-Ray)</dd>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <dt className="text-slate-500">Classification</dt>
              <dd className="font-semibold text-slate-800">Multiclass Kellgren-Lawrence</dd>
            </div>
          </dl>
        </div>
      </div>
    </motion.section>
  )
}

/* =========================================================
   REPORT ACTIONS
========================================================= */

export function ReportActions({ onDownloadPdf, isDownloading = false }) {
  return (
    <div className="flex items-center gap-2">
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isDownloading}
        onClick={onDownloadPdf}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#075344] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#0d4239] cursor-pointer disabled:opacity-60"
      >
        <Download size={16} />
        {isDownloading ? 'Generating Report...' : 'Download Report'}
      </motion.button>
    </div>
  )
}

