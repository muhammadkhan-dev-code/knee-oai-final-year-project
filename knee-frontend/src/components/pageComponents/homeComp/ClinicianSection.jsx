import { ArrowRight, UploadCloud } from 'lucide-react'
import { Link } from 'react-router-dom'
import homepageKnee from '../../../assets/images/home/homepageKnee.png'
import doctor_image from '../../../assets/images/home/doctor_image.jpg'
import { motion } from 'framer-motion'


const gentleEase = [0.16, 1, 0.3, 1]

const ClinicianCTASection = () => {
  return (
    <section className="w-full bg-white px-5 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 0.95, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: gentleEase }}
        className="relative mx-auto max-w-screen-2xl overflow-hidden rounded-2xl bg-[#005b43] bg-cover bg-center px-8 py-10 md:px-12 md:py-12 lg:px-14 lg:py-14"
        style={{
          backgroundImage: `url(${homepageKnee})`,
        }}
      >
        <div className="absolute inset-0 bg-[#005b43]/50" />

        {/* Green glow */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#0b8f68]/30 blur-3xl" />

        <div className="absolute bottom-0 right-40 h-48 w-48 rounded-full bg-[#0a7658]/30 blur-3xl" />

     
        <div className="absolute right-8 top-8 z-10 opacity-30">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 25 }).map((_, index) => (
              <span
                key={index}
                className="h-1 w-1 rounded-full bg-white"
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-between gap-10 lg:flex-row">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: gentleEase }}
            className="max-w-3xl"
          >
            <h2 className="text-2xl font-semibold text-white sm:text-3xl lg:text-[34px]">
              Built for clinicians.
              Designed for better outcomes.
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">
              KOA-AI empowers healthcare professionals with AI-driven insights for accurate knee osteoarthritis assessment. Make faster, more informed clinical decisions with XAI.
            </p>

            <div className="mt-7 flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="h-14 w-14 overflow-hidden rounded-full border-2 border-white/40 bg-white/20"
              >
                <img
                  src={doctor_image}
                  alt="Muhammad Farman"
                  className="h-full w-full object-cover"
                />
              </motion.div>

              <div>
                <h3 className="font-semibold text-white">
                  Dr. Muhammad Farman
                </h3>

                <p className="text-sm text-white/75">
                  Rheumatologist
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: gentleEase }}
            className="relative flex w-full flex-col items-center justify-center lg:w-[360px]"
          >
            <div className="flex w-full flex-col gap-6">
              <Link to='/login'>
                <motion.button
                  type="button"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  variants={{
                    hover: { scale: 1.02, backgroundColor: '#f1fff9' }
                  }}
                  transition={{ duration: 0.2 }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-sm font-semibold text-[#006044] shadow-lg cursor-pointer"
                >
                  <motion.span
                    variants={{
                      hover: { y: [-2, 2, -2], transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" } }
                    }}
                  >
                    <UploadCloud size={20} />
                  </motion.span>
                  Analyze Your X-ray
                </motion.button>
              </Link>

              <motion.button
                type="button"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                variants={{
                  hover: { scale: 1.02, backgroundColor: '#ffffff', color: '#006044' }
                }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center gap-2 rounded-lg border border-white bg-transparent px-6 py-3.5 text-sm font-semibold text-white cursor-pointer"
              >
                Learn More
                <motion.span
                  variants={{
                    hover: { x: 5 }
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </motion.button>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}

export default ClinicianCTASection
