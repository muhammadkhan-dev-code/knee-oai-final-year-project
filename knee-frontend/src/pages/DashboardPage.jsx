import { motion } from 'framer-motion'
import {
  AiInsightsCard,
  AnalysisVolumeChart,
  DashboardShell,
  DashboardWelcomeHeader,
  GradeDistributionChart,
  KpiCards,
  ModelPerformanceCard,
  RecentAnalyses
} from '../components/pageComponents/dashboardComp'

function getStoredUser () {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}')
  } catch {
    return {}
  }
}

const sectionVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

export default function DashboardPage () {
  const user = getStoredUser()

  return (
    <DashboardShell>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
        className='space-y-6'
      >
        <motion.div variants={sectionVariants}>
          <DashboardWelcomeHeader user={user} />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <KpiCards />
        </motion.div>

        <motion.div variants={sectionVariants} className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          <AnalysisVolumeChart />
          <GradeDistributionChart />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <RecentAnalyses />
        </motion.div>

        <motion.div variants={sectionVariants} className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          <AiInsightsCard />
          <ModelPerformanceCard />
        </motion.div>
      </motion.div>
    </DashboardShell>
  )
}

