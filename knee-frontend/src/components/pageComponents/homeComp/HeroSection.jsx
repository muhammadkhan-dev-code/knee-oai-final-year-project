import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import doctor_image from '../../../assets/images/home/doctor_image.jpg'
import dashboard_image from '../../../assets/images/home/dashboard-preview.png'

const gentleEase = [0.16, 1, 0.3, 1]

const HeroSection = () => {
  return (
    <section className="relative z-10 mx-auto flex max-w-screen-2xl flex-col items-center px-4 pb-16 pt-32">
      <motion.div
        className="mb-10 max-w-3xl text-center"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.4,
          ease: gentleEase,
          delay: 0.2,
        }}
      >
        <h1 className="my-4 text-3xl font-extrabold leading-tight tracking-tight text-[#1a3b34] sm:text-5xl md:text-6xl font-['Outfit']">
          Knee Osteoarthritis
          <br />
          Care, Made Personal
        </h1>

        <motion.p
          className="px-0 text-xl font-light leading-relaxed text-gray-800 md:px-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.6,
            ease: gentleEase,
            delay: 0.8,
          }}
        >
          Understand your knee, reduce day-to-day discomfort, and explore a
          care plan built around how you move.
        </motion.p>
      </motion.div>

      <motion.div
        className="mb-20 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: gentleEase,
          delay: 1.2,
        }}
      >
        <Link to="/login" className="w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            className="w-full rounded-full bg-[#357B62] px-8 py-3.5 font-medium text-white shadow-md shadow-green-900/10 transition-all hover:bg-[#2b6450] hover:shadow-lg cursor-pointer sm:w-auto"
          >
            Analyze X-ray
          </motion.button>
        </Link>

        <a href="#how-it-works" className="w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            className="w-full rounded-full border border-[#357B62]/30 bg-white px-8 py-3.5 font-medium text-[#357B62] shadow-sm transition-all hover:bg-gray-50 cursor-pointer sm:w-auto"
          >
            Learn about knee OA
          </motion.button>
        </a>
      </motion.div>



      <div className="flex w-full flex-col gap-6 lg:flex-row">

        <motion.div
          className="group relative h-[400px] w-full overflow-hidden rounded-[2rem] shadow-xl shadow-gray-200/50 lg:h-[500px] lg:w-1/3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.6,
            ease: gentleEase,
            delay: 1.6,
          }}
        >
          <img
            src={doctor_image}
            alt="Doctor"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <motion.div
            className="absolute bottom-6 left-6 right-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: gentleEase,
              delay: 2.4,
            }}
          >
            <div className="flex items-center justify-between rounded-3xl bg-white/95 p-4 shadow-lg backdrop-blur-md">
              <div className="flex items-center space-x-3">
                <img
                  src={doctor_image}
                  alt="Doctor avatar"
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold leading-tight text-gray-900">
                    MUHAMMAD KHAN
                  </h3>

                  <p className="mt-0.5 text-xs font-medium text-gray-500">
                    Male, 24 Years
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="rounded-full bg-[#8dbba5] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#7aa992]"
              >
                Doctor
              </button>
            </div>
          </motion.div>
        </motion.div>


        <motion.div
          className="relative flex h-[400px] w-full flex-col overflow-hidden rounded-[2rem] border-b-0 border-[#357B62] bg-white p-2 shadow-xl shadow-gray-200/50 lg:h-[500px] lg:w-2/3 lg:border-[10px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.6,
            ease: gentleEase,
            delay: 1.9,
          }}
        >
          <div className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-[#eff8f4] p-6 lg:p-10">
            <img
              src={dashboard_image}
              alt="Dashboard Preview"
              className="h-full w-full rounded-xl object-contain shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
