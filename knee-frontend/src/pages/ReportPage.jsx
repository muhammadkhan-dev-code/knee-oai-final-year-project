import { Plus } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import { DashboardShell } from '../components/pageComponents/dashboardComp'

import {
  ImagingPanel,
  PredictionSummary,
  ProbabilityChart,
  ReportActions,
  ReportFooter,
  ReportPatientCard,
} from '../components/pageComponents/reportComp'

export default function ReportPage() {

  const { state } = useLocation()

  const patient = state?.patient || {}
  const analysis = state?.analysis || {}

  return (
    <DashboardShell>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto w-full max-w-[1440px]"
      >

        {/* HEADER */}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
              Analysis <span className="text-[#075344]">Results</span>
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              AI-powered knee osteoarthritis assessment
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">

            <ReportActions />

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >

              <Link
                to="/analyze"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#075344] px-4 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0d4239] cursor-pointer"
              >

                <Plus size={17} />

                New Analysis

              </Link>

            </motion.div>

          </div>

        </div>

        {/* CONTENT */}

        <div className="mt-5 flex flex-col gap-5 xl:grid xl:grid-cols-[280px_minmax(0,1fr)]">

          {/* PATIENT CARD */}

          <ReportPatientCard
            patient={patient}
          />

          {/* RESULT AREA */}

          <div className="space-y-4 min-w-0">

            <PredictionSummary
              analysis={analysis}
            />

            <div className="grid gap-4 lg:grid-cols-2">

              <ProbabilityChart
                analysis={analysis}
              />

              <ImagingPanel
                patient={patient}
                analysis={analysis}
              />

            </div>

            <ReportFooter />

          </div>

        </div>

      </motion.div>

    </DashboardShell>
  )
}