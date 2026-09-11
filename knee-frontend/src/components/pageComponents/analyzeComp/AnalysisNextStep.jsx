import { ArrowRight, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AnalysisNextStep ({ onAnalyze, isAnalyzing }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className='mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-[#dceae6] bg-white p-4 sm:p-5 shadow-sm'
    >
      <div className='text-center sm:text-left'>
        <h3 className='text-sm font-bold text-[#075344]'>Ready for AI Diagnosis</h3>
        <p className='mt-0.5 text-xs text-slate-500'>
          Ensure patient info and knee X-ray imaging file are uploaded before running model.
        </p>
      </div>

      <motion.button
        type='button'
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onAnalyze}
        disabled={isAnalyzing}
        className='inline-flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#075344] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#0d4239] disabled:opacity-75 disabled:cursor-not-allowed'
      >
        {isAnalyzing ? (
          <>
            <Loader2 size={18} className='animate-spin' />
            <span>Analyzing Study...</span>
          </>
        ) : (
          <>
            <span>Execute AI Analysis</span>
            <ArrowRight size={18} />
          </>
        )}
      </motion.button>
    </motion.div>
  )
}
