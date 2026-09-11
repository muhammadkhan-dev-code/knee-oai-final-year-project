import {
  ClinicianSection,
  FeatureSection,
  Footer,
  HeroSection,
  HowworkSection,
  Navbar,
  XaiSection
} from '../components/components.js'

const HomePage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4fcf9] font-['Outfit']">
      <div className='pointer-events-none absolute left-[-10%] top-[-20%] h-[800px] w-[800px] rounded-full bg-teal-50/50 blur-[100px]' />
      <div className='pointer-events-none absolute right-[-10%] top-[10%] h-[640px] w-[640px] rounded-full bg-green-50/40 blur-[80px]' />

      <Navbar />

      <main>
        <section id='home' className='relative z-10 mx-auto flex max-w-screen-2xl flex-col items-center px-4 pb-16 '>
          <HeroSection />
        </section>

        <section id='features' className='bg-white md:py-20'>
          <FeatureSection />
        </section>

        <section id='how-it-works' className='bg-[#f7fcfa] py-12 md:py-20'>
          <HowworkSection />
        </section>

        <section id='about' className='w-full scroll-mt-20 bg-gray-100 py-20'>
          <XaiSection />
        </section>

        <section className='w-full bg-white px-5 py-10'>
          <ClinicianSection />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
