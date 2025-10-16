import HomeSection from '@/components/HomeSection'
import AboutUsSection from '@/components/AboutUsSection'
import MissionSection from '@/components/MissionSection'
import EventsSection from '@/components/EventsSection'
import ContactSection from '@/components/ContactSection'
import DottedBackground from '@/components/DottedBackground'
import EBoardSection from '@/components/EBoardSection'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen relative bg-gradient-to-br from-gsu-blue-900 via-gsu-purple-900 to-gsu-black-600">
      <DottedBackground />
      <div className="relative z-10">
        <Navbar />
        <HomeSection />
        <AboutUsSection />
        <MissionSection />
        <EventsSection />
        <EBoardSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
