import { Navigate, useParams } from 'react-router'
import { PageHeader } from '../components/layout/PageHeader'
import { About } from '../components/sections/About'
import { BearingRange } from '../components/sections/BearingRange'
import { Contact } from '../components/sections/Contact'
import { CtaBand } from '../components/sections/CtaBand'
import { Hero } from '../components/sections/Hero'
import { SectorsPreview } from '../components/sections/SectorsPreview'
import { Solutions } from '../components/sections/Solutions'
import { Technologies } from '../components/sections/Technologies'
import { WhyChooseUs } from '../components/sections/WhyChooseUs'
import { solutionSectors, type SolutionSector } from '../data/bearings'
import { company } from '../data/company'
import { routes, sectorPath } from '../lib/routes'
import { NotFoundPage } from './NotFoundPage'

export function HomePage() {
  return (
    <>
      <Hero />
      <BearingRange preview />
      <SectorsPreview />
      <Technologies preview />
      <WhyChooseUs />
      <CtaBand />
    </>
  )
}

export function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Bearing Products"
        subtitle={`Ball, roller and thrust bearings for automotive and industrial applications, supplied across India from ${company.location}.`}
        crumbs={[{ label: 'Products' }]}
      />
      <BearingRange />
      <CtaBand title="Can't find the bearing you need?" />
    </>
  )
}

export function SolutionsPage() {
  const { sector } = useParams()
  if (!sector) return <Navigate to={sectorPath(solutionSectors[0].id)} replace />
  const match = solutionSectors.find((s) => s.id === sector)
  if (!match) return <NotFoundPage />
  return (
    <>
      <PageHeader
        title={match.title}
        subtitle={match.intro}
        crumbs={[{ label: 'Solutions', to: routes.solutions }, { label: match.tabLabel }]}
      />
      <Solutions activeId={match.id as SolutionSector['id']} />
      <CtaBand title={`Discuss your ${match.tabLabel.toLowerCase()} bearing requirement`} />
    </>
  )
}

export function TechnologiesPage() {
  return (
    <>
      <PageHeader
        title="Specialised Bearing Technologies"
        subtitle="Low-torque, electrically insulated, sensor-integrated, hybrid ceramic, corrosion-resistant and high-speed bearings for demanding applications."
        crumbs={[{ label: 'Technologies' }]}
      />
      <Technologies />
      <CtaBand />
    </>
  )
}

export function AboutPage() {
  return (
    <>
      <PageHeader
        title={`About ${company.name}`}
        subtitle={`An Indian bearing solutions company based in ${company.location}, serving customers across India. ${company.philosophy}`}
        crumbs={[{ label: 'About Us' }]}
      />
      <About />
      <WhyChooseUs />
      <CtaBand />
    </>
  )
}

export function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle={`Request a bearing quote from our ${company.location} team. Call or WhatsApp ${company.whatsapp.display}; we supply customers across India.`}
        crumbs={[{ label: 'Contact' }]}
      />
      <Contact />
    </>
  )
}
