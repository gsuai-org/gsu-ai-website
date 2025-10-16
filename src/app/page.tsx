import HomeSection from '@/components/HomeSection'
import AboutSection from '@/components/AboutSection'
import MissionSection from '@/components/MissionSection'
import EventsSection from '@/components/EventsSection'
import AboutUsSection from '@/components/AboutUsSection'
import ContactSection from '@/components/ContactSection'
import DottedBackground from '@/components/DottedBackground'

export default function Home() {
  return (
    <main className="min-h-screen relative bg-gradient-to-br from-gsu-blue-900 via-gsu-purple-900 to-gsu-black-600">
      <DottedBackground />
      <div className="relative z-10">
        <HomeSection />
        <AboutSection />
        <MissionSection />
        <EventsSection />
        <AboutUsSection />
        <ContactSection />
      </div>
    </main>
  )
}
