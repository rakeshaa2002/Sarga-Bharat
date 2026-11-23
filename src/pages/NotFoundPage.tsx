import { PageHeader } from '../components/layout/PageHeader'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { routes } from '../lib/routes'

export function NotFoundPage() {
  return (
    <>
      <PageHeader
        title="Page not found"
        subtitle="The page you were looking for has moved or doesn't exist."
        crumbs={[{ label: 'Page not found' }]}
      />
      <Container className="flex flex-wrap gap-3 py-16">
        <ButtonLink to={routes.products}>Browse bearing products</ButtonLink>
        <ButtonLink to={routes.home} variant="secondary">
          Go to the home page
        </ButtonLink>
      </Container>
    </>
  )
}
