import { Brain, CloudUpload, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

const gentleEase = [0.16, 1, 0.3, 1]


const HowItWorksSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Upload X-ray',
      text: 'Upload knee X-ray image securely from your device.',
      icon: CloudUpload,
    },
    {
      number: '02',
      title: 'AI Analysis',
      text: 'Our deep learning model analyzes the image and predicts the KL grade.',
      icon: Brain,
    },
    {
      number: '03',
      title: 'View Results',
      text: 'Review prediction, heatmap and download the analysis report.',
      icon: FileText,
    },
  ]

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: gentleEase }}
          className="flex flex-col items-center text-center"
        >
          <span className="mb-6 inline-flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-8 py-2 text-md font-medium text-gray-700">
            <span className="h-2 w-2 rounded-full bg-[#2d8264]" />
            How It Works
          </span>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1a3b34] md:text-[3rem]">
            3 Simple Steps
          </h2>

          <p className="mt-3 text-lg text-[#386e5f] md:text-xl">
            From upload to insights in just a few clicks.
          </p>
        </motion.div>

        <div className="relative mt-12 flex flex-col items-stretch justify-between gap-8 md:flex-row md:gap-12">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut' }}
            style={{ originX: 0 }}
            className="absolute left-[15%] right-[15%] top-12 hidden h-px border-t-2 border-dashed border-[#a9d2ba] md:block"
          />

          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: gentleEase }}
                className="relative flex-1 text-center"
              >
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    borderColor: '#1b4332',
                    boxShadow: '0 12px 28px rgba(27,67,50,0.12)'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full border-[3px] border-[#b7d7c5] bg-white shadow-sm cursor-pointer"
                >
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#1b4332] text-xs font-bold text-white shadow-sm">
                    {step.number}
                  </span>
                  <Icon
                    size={52}
                    strokeWidth={1.9}
                    className="text-[#1b4332]"
                  />
                </motion.div>

                <h3 className="mt-5 text-[1.05rem] font-semibold text-[#11231f] md:text-[1.3rem]">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-[220px] text-md leading-6 text-[#4d5f5a]">
                  {step.text}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default HowItWorksSection
