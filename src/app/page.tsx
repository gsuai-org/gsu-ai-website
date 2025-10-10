import HomeSection from '@/components/HomeSection'
import MissionSection from '@/components/MissionSection'
import EventsSection from '@/components/EventsSection'
import AboutUsSection from '@/components/AboutUsSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HomeSection />
      <MissionSection />
      <EventsSection />
      <AboutUsSection />
      <ContactSection />
    </main>
  )
}
