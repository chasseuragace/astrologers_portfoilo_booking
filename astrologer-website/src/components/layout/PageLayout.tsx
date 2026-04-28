import { Navigation } from '../Navigation'
import { Footer } from '../Footer'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface PageLayoutProps {
  children: React.ReactNode
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-cosmic-950 font-body">
      <ScrollToTop />
      <Navigation />
      <div className="pt-20">{children}</div>
      <Footer />
    </div>
  )
}
