import { AlertTriangle, TrendingUp, ShieldCheck, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const metrics = [
  {
    label: 'Total Analyses',
    value: '134',
    change: '4.5%',
    period: 'vs last month',
    icon: TrendingUp,
    bgColor: 'bg-[#e2f2ef]',
    iconColor: 'text-[#0d4239]'
  },
  {
    label: 'Critical Cases (KL 4)',
    value: '18',
    change: '5%',
    period: 'vs last month',
    icon: AlertTriangle,
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600'
  },
  {
    label: 'Average Confidence',
    value: '89.2%',
    change: '4.5%',
    period: 'vs last month',
    icon: ShieldCheck,
    bgColor: 'bg-[#e2f2ef]',
    iconColor: 'text-[#0d4239]'
  },
  {
    label: 'Total Patients',
    value: '98',
    change: '6.1%',
    period: 'vs last month',
    icon: Users,
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-500'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
}

export default function KpiCards() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
    >
      {metrics.map(({ label, value, change, period, icon: Icon, bgColor, iconColor }) => (
        <motion.div
          key={label}
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="flex flex-col justify-between rounded-xl border border-[#dceae6] bg-white p-4 sm:p-5 shadow-sm transition-all hover:shadow-md hover:border-[#b8e2d8]"
        >
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs sm:text-sm font-semibold text-slate-500 leading-tight">{label}</span>
            <div className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl ${bgColor}`}>
              <Icon size={18} className={iconColor} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">{value}</div>
            <div className="mt-1.5 flex items-center gap-1 text-xs font-medium">
              <span className="font-semibold text-[#19745f]">↗ {change}</span>
              <span className="text-slate-400">{period}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
