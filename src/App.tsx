import { LazyMotion, MotionConfig, domMax } from 'framer-motion'
import { Outlet, Route, Routes } from 'react-router'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { ScrollManager } from './components/layout/ScrollManager'
import { Seo } from './components/layout/Seo'
import { WhatsAppButton } from './components/ui/WhatsAppButton'
import { EnquiryProvider } from './context/EnquiryProvider'
import { BearingDetailPage } from './pages/BearingDetailPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { AboutPage, ContactPage, HomePage, ProductsPage, SolutionsPage, TechnologiesPage } from './pages/pages'

/** Shared frame for every page. The router itself is provided by main.tsx (browser) or the pre-renderer. */
function Layout() {
  return (
    // domMax adds layout animations (filter pills, card reflow) to the core animation features;
    // `strict` flags any accidental use of the full `motion` component.
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <EnquiryProvider>
          <ScrollManager />
          <Seo />
          <a
            href="#main"
            className="sr-only z-[60] rounded bg-navy-900 px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main" tabIndex={-1} className="focus:outline-none">
            <Outlet />
          </main>
          <Footer />
          <WhatsAppButton />
        </EnquiryProvider>
      </MotionConfig>
    </LazyMotion>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<BearingDetailPage />} />
        <Route path="solutions" element={<SolutionsPage />} />
        <Route path="solutions/:sector" element={<SolutionsPage />} />
        <Route path="technologies" element={<TechnologiesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
