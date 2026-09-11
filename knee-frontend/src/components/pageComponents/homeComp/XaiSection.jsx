import about_image from '../../../assets/images/home/about_image.jpg'
import { motion } from 'framer-motion'


const gentleEase = [0.16, 1, 0.3, 1]

const ExplainableAISection = () => {
  return (
    <section className="w-full scroll-mt-20 bg-gray-100 py-20">
      <div className="mx-auto max-w-screen-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: gentleEase }}
          className="mb-7 flex justify-center"
        >
          <span className="inline-flex items-center gap-4 rounded-3xl border border-gray-200 bg-white px-8 py-2 text-md font-medium text-gray-700">
            <span className="h-2 w-2 rounded-full bg-[#2d8264]" />
            Clinician remains in control
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: gentleEase }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#11231f] md:text-4xl lg:text-[42px]">
            Explainable AI, designed for physician
            <br />
            review
          </h2>

          <p className="mx-auto mt-6 max-w-4xl font-light leading-7 text-[#131414] md:text-lg md:leading-8">
            KOA-AI is designed to support, not replace, clinical judgment.
            Radiographic outputs should always be interpreted with the full
            patient history and examination.
          </p>
        </motion.div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, ease: gentleEase }}
            className="mx-4 pt-2 lg:pt-6"
          >
            <h3 className="text-center text-xl font-semibold text-[#111827] md:text-3xl lg:text-left">
              Make every imaging review more transparent
            </h3>

            <p className="mt-10 max-w-md text-lg font-light leading-7 text-[#111827] md:text-lg md:leading-8">
              Surface the predicted grade, confidence, and image regions
              that influenced the model then decide what belongs in the
              clinical record.
            </p>

            <motion.button
              type="button"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: '#17775a',
                boxShadow: '0 16px 32px rgba(29,139,103,0.35)'
              }}
              whileTap={{ scale: 0.98 }}
              className="mt-10 rounded-full bg-[#1d8b67] px-7 py-3 text-base font-medium text-white shadow-[0_12px_28px_rgba(29,139,103,0.25)] transition duration-200 cursor-pointer"
            >
              Read methodology
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, ease: gentleEase }}
            className="relative mt-6 flex items-start justify-center"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full max-w-[560px] rounded-2xl bg-gradient-to-r from-[#5de2ac] via-[#31c58d] to-[#0fa768] p-2 shadow-[0_25px_60px_rgba(17,91,72,0.18)] cursor-pointer"
            >
              <div className="max-h-[360px] overflow-hidden rounded-3xl bg-[#f6f1eb] p-2">
                <motion.img
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  src={about_image}
                  alt="Knee imaging review"
                  className="h-70 w-full rounded-[1.2rem] object-cover md:h-80"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ExplainableAISection
