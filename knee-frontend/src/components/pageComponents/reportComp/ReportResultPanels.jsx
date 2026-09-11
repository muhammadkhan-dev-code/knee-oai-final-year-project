import { Download, Info, ScanLine, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

/* =========================================================
   HELPER - IMAGE SOURCE
========================================================= */

function getImageSource(image, defaultType = 'image/jpeg') {
  if (!image) return null

  if (typeof image !== 'string') return null

  const trimmedImage = image.trim()

  if (!trimmedImage) return null

  // Already a complete browser image URL
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
  const predictedCategory =
    analysis?.predicted_category || 'N/A'

  const confidence =
    Number(analysis?.confidence || 0)

  const confidencePercent =
    (confidence * 100).toFixed(2)

  let gradeText = 'Unknown'
  let description = 'No prediction available.'

  if (predictedCategory === 'kl0_kl1') {
    gradeText = 'KL 0-1'
    description = 'Normal / Doubtful'
  } else if (predictedCategory === 'kl2_kl3') {
    gradeText = 'KL 2-3'
    description = 'Mild to Moderate'
  } else if (predictedCategory === 'kl4') {
    gradeText = 'KL 4'
    description = 'Severe'
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-[#dceae6] bg-gradient-to-r from-white to-[#eff9f5] p-5 sm:p-6 shadow-sm shadow-[#1a5a49]/5"
    >
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6 sm:flex-row">

        {/* Confidence Circle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid h-28 w-28 sm:h-32 sm:w-32 shrink-0 place-items-center rounded-full"
          style={{
            background: `conic-gradient(
              #19745f 0 ${confidencePercent}%,
              #dcece7 ${confidencePercent}% 100%
            )`
          }}
        >
          <div className="grid h-20 w-20 sm:h-24 sm:w-24 place-items-center rounded-full bg-white text-center shadow-xs">

            <strong className="text-xl sm:text-2xl font-bold text-slate-900">
              {confidencePercent}%
            </strong>

            <span className="text-[10px] text-slate-500 font-medium">
              Confidence
            </span>

          </div>
        </motion.div>

        {/* Prediction */}
        <div>

          <p className="text-xs font-bold tracking-wider text-[#17614e]">
            PREDICTED KL GRADE
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#155d4b]">
              {gradeText}
            </h2>

            <span className="rounded-md bg-[#e3f4ed] px-2.5 py-1 text-xs font-bold text-[#19745f]">
              {description}
            </span>

          </div>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-700">

            {predictedCategory === 'kl0_kl1' &&
              'No or doubtful osteoarthritis detected according to the AI model.'}

            {predictedCategory === 'kl2_kl3' &&
              'Mild to moderate osteoarthritis detected according to the AI model.'}

            {predictedCategory === 'kl4' &&
              'Severe osteoarthritis detected according to the AI model.'}

            {!['kl0_kl1', 'kl2_kl3', 'kl4'].includes(predictedCategory) &&
              'AI prediction result is unavailable.'}

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

  const probabilities =
    analysis?.class_probabilities || {}

  const probability = [
    {
      label: 'KL 0-1',
      description: 'Normal / Doubtful',
      value:
        Number(probabilities.kl0_kl1 || 0) * 100,
      color: '#24936f'
    },
    {
      label: 'KL 2-3',
      description: 'Mild / Moderate',
      value:
        Number(probabilities.kl2_kl3 || 0) * 100,
      color: '#19745f'
    },
    {
      label: 'KL 4',
      description: 'Severe',
      value:
        Number(probabilities.kl4 || 0) * 100,
      color: '#4285dc'
    }
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-xl border border-[#dceae6] bg-white p-4 sm:p-5 shadow-sm shadow-[#1a5a49]/5"
    >

      <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
        Class Probabilities
        <Info size={14} className="text-slate-400" />
      </h2>

      <div className="mt-5 flex h-52 items-end justify-around gap-3 sm:gap-5 border-b border-l border-[#e0ebe7] px-2 sm:px-5 pt-4">

        {probability.map(
          ({ label, description, value, color }, index) => (

            <div
              key={label}
              className="flex h-full flex-1 flex-col justify-end text-center"
            >

              <div className="relative h-full flex flex-col justify-end">

                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${value}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + index * 0.1,
                    ease: 'easeInOut'
                  }}
                  className="w-full rounded-t-md relative"
                  style={{
                    backgroundColor: color
                  }}
                >

                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-800">
                    {value.toFixed(2)}%
                  </span>

                </motion.div>

              </div>

              <strong className="mt-3 text-xs text-slate-800">
                {label}
              </strong>

              <span className="mt-1 text-[10px] sm:text-[11px] text-slate-600 truncate">
                {description}
              </span>

            </div>

          )
        )}

      </div>

    </motion.section>
  )
}


/* =========================================================
   IMAGING PANEL
========================================================= */

export function ImagingPanel({
  analysis = {},
  originalImage,
  patient = {}
}) {

  /*
    ORIGINAL IMAGE
    ---------------------------------------------------------
    Supports:
    - data:image/... base64
    - normal URL
    - blob URL
    - raw base64
  */

  const originalImageSource =
    getImageSource(
      originalImage || patient?.originalImage,
      'image/jpeg'
    )


  /*
    HEATMAP IMAGE
    ---------------------------------------------------------
    Supports:
    - data:image/png;base64,...
    - data:image/jpeg;base64,...
    - raw base64 PNG/JPEG
    - normal URL
  */

  const heatmapImageSource =
    getImageSource(
      analysis?.heatmap,
      'image/png'
    )


  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-xl border border-[#dceae6] bg-white p-4 sm:p-5 shadow-sm shadow-[#1a5a49]/5"
    >

      <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">

        <ScanLine
          size={16}
          className="text-[#19745f]"
        />

        Grad-CAM Visualization

        <Info
          size={13}
          className="text-slate-400"
        />

      </h2>


      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">


        {/* =================================================
            ORIGINAL X-RAY
        ================================================= */}

        <motion.figure
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >

          <figcaption className="mb-2 text-center text-[11px] font-semibold text-slate-600">
            Original X-ray
          </figcaption>

          <div className="h-44 rounded-md bg-slate-950 shadow-xs overflow-hidden">

            {originalImageSource ? (

              <img
                src={originalImageSource}
                alt="Uploaded knee X-ray"
                className="h-full w-full object-contain"
                onError={(event) => {
                  console.error(
                    'Original X-ray failed to load:',
                    originalImageSource
                  )

                  event.currentTarget.style.display = 'none'
                }}
              />

            ) : (

              <div className="flex h-full items-center justify-center text-xs text-slate-400">
                Original X-ray unavailable
              </div>

            )}

          </div>

        </motion.figure>


        {/* =================================================
            AI ATTENTION MAP
        ================================================= */}

        <motion.figure
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >

          <figcaption className="mb-2 text-center text-[11px] font-semibold text-slate-600">
            AI Attention Map
          </figcaption>

          <div className="h-44 rounded-md bg-slate-950 shadow-xs overflow-hidden">

            {heatmapImageSource ? (

              <img
                src={heatmapImageSource}
                alt="AI Attention Map"
                className="h-full w-full object-contain"
                onError={(event) => {
                  console.error(
                    'AI Attention Map failed to load:',
                    heatmapImageSource
                  )

                  event.currentTarget.style.display = 'none'
                }}
              />

            ) : (

              <div className="flex h-full items-center justify-center text-xs text-slate-400">
                AI attention map unavailable
              </div>

            )}

          </div>

        </motion.figure>

      </div>


      {/* =================================================
          RAW PROBABILITY TABLE
      ================================================= */}

      <div className="mt-4 rounded-lg bg-[#f5f8f7] p-3 overflow-x-auto">

        <h3 className="text-xs font-bold text-slate-800">
          Raw Probability Table
        </h3>

        {[
          {
            label: 'KL 0-1',
            description: 'Normal / Doubtful',
            value:
              Number(
                analysis?.class_probabilities?.kl0_kl1 || 0
              ) * 100,
            color: '#24936f'
          },
          {
            label: 'KL 2-3',
            description: 'Mild / Moderate',
            value:
              Number(
                analysis?.class_probabilities?.kl2_kl3 || 0
              ) * 100,
            color: '#19745f'
          },
          {
            label: 'KL 4',
            description: 'Severe',
            value:
              Number(
                analysis?.class_probabilities?.kl4 || 0
              ) * 100,
            color: '#4285dc'
          }
        ].map(
          ({ label, description, value, color }, idx) => (

            <div
              key={label}
              className="mt-3 min-w-[240px] grid grid-cols-[130px_1fr_55px] sm:grid-cols-[145px_1fr_55px] items-center gap-2 text-[11px]"
            >

              <span className="font-medium text-slate-700">
                {label} ({description})
              </span>

              <div className="h-1.5 overflow-hidden rounded bg-[#eaf0ee]">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + idx * 0.1
                  }}
                  className="h-full rounded"
                  style={{
                    backgroundColor: color
                  }}
                />

              </div>

              <span className="text-right font-semibold text-slate-900">
                {value.toFixed(2)}%
              </span>

            </div>

          )
        )}

      </div>

    </motion.section>
  )
}


/* =========================================================
   REPORT FOOTER
========================================================= */

export function ReportFooter() {

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="grid gap-4 lg:grid-cols-[1.7fr_.8fr]"
    >

      <div className="rounded-xl border border-[#dceae6] bg-white p-4 sm:p-5 shadow-sm">

        <h2 className="text-sm font-bold text-slate-900">
          Interpretation Guide
        </h2>

        <div className="mt-4 grid gap-3 text-[11px] sm:grid-cols-3">

          <p>
            <b className="text-[#19745f]">
              ● KL 0-1 (Normal / Doubtful)
            </b>
            <br />
            No or doubtful osteoarthritis. Normal joint space.
          </p>

          <p>
            <b className="text-[#b27a07]">
              ● KL 2-3 (Mild / Moderate)
            </b>
            <br />
            Definite osteophytes with possible joint space narrowing.
          </p>

          <p>
            <b className="text-[#c94343]">
              ● KL 4 (Severe)
            </b>
            <br />
            Large osteophytes, marked joint space narrowing and deformity.
          </p>

        </div>

        <div className="mt-4 flex gap-2 rounded-lg bg-[#edf8f4] p-3 text-[11px] leading-relaxed text-slate-600">

          <ShieldCheck
            size={17}
            className="shrink-0 text-[#19745f]"
          />

          This prediction is generated by KOA-AI and is intended to assist radiologists and healthcare professionals. Final diagnosis should be made by a qualified expert.

        </div>

      </div>


      <div className="rounded-xl border border-[#dceae6] bg-white p-4 sm:p-5 text-xs shadow-sm">

        <h2 className="text-sm font-bold text-slate-900">
          Analysis Information
        </h2>

        <dl className="mt-4 space-y-3">

          <div className="flex justify-between gap-3">

            <dt className="text-slate-600">
              Analysis Status
            </dt>

            <dd className="font-semibold text-[#19745f]">
              Completed
            </dd>

          </div>

          <div className="flex justify-between gap-3">

            <dt className="text-slate-600">
              Model Used
            </dt>

            <dd className="font-semibold text-slate-900">
              KOA-AI
            </dd>

          </div>

          <div className="flex justify-between gap-3">

            <dt className="text-slate-600">
              Input Image
            </dt>

            <dd className="font-semibold text-slate-900">
              Knee X-ray
            </dd>

          </div>

        </dl>

      </div>

    </motion.section>
  )
}


/* =========================================================
   REPORT ACTIONS
========================================================= */

export function ReportActions() {

  return (
    <div className="flex flex-wrap gap-2 w-full sm:w-auto">

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => window.print()}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-[#dceae6] bg-white px-4 py-2.5 sm:px-5 sm:py-3 text-sm font-semibold text-[#0d4239] shadow-sm transition hover:bg-[#e2f2ef] hover:border-[#b8e2d8] cursor-pointer"
      >

        <Download size={17} />

        Download Report

      </motion.button>

    </div>
  )
}

