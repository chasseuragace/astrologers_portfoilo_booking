import { Navigation } from '../Navigation'
import { Footer } from '../Footer'

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-cosmic-950 font-body">
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}
