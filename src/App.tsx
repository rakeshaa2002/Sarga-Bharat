import { LazyMotion, MotionConfig, domMax } from 'framer-motion'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { About } from './components/sections/About'
import { BearingRange } from './components/sections/BearingRange'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Solutions } from './components/sections/Solutions'
import { Technologies } from './components/sections/Technologies'
import { WhyChooseUs } from './components/sections/WhyChooseUs'
import { WhatsAppButton } from './components/ui/WhatsAppButton'
import { EnquiryProvider } from './context/EnquiryProvider'

export default function App() {
  return (
    // domMax adds layout animations (filter pills, card reflow) to the core animation features;
    // `strict` flags any accidental use of the full `motion` component.
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <EnquiryProvider>
          <a
            href="#main"
            className="sr-only z-[60] rounded bg-navy-900 px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main" tabIndex={-1} className="focus:outline-none">
            <Hero />
            <BearingRange />
            <Solutions />
            <Technologies />
            <WhyChooseUs />
            <About />
            <Contact />
          </main>
          <Footer />
          <WhatsAppButton />
        </EnquiryProvider>
      </MotionConfig>
    </LazyMotion>
  )
}
