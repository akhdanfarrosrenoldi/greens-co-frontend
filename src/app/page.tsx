import Hero from '@/components/sections/Hero'
import USPStrip from '@/components/sections/USPStrip'
import FeaturedMenu from '@/components/sections/FeaturedMenu'
import BundleSection from '@/components/sections/BundleSection'
import HowItWorks from '@/components/sections/HowItWorks'

export default function HomePage() {
  return (
    <>
      <Hero />
      <USPStrip />
      <FeaturedMenu />
      <BundleSection />
      <HowItWorks />
    </>
  )
}
