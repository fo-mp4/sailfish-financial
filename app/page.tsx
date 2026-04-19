import Nav from '@/components/Nav'
import Hero from '@/components/sections/Hero'
import HowItWorks from '@/components/sections/HowItWorks'
import Services from '@/components/sections/Services'
import WhyUs from '@/components/sections/WhyUs'
import Testimonials from '@/components/sections/Testimonials'
import CTABand from '@/components/sections/CTABand'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Services />
        <WhyUs />
        <Testimonials />
        <CTABand />
      </main>
      <Footer />
    </>
  )
}
