import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export function Navigation() {
  const { t, i18n } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/services', label: t('nav.services') },
    { to: '/calendar', label: t('nav.calendar') },
    { to: '/contact', label: t('nav.contact') },
    { to: '/admin', label: t('nav.admin') },
  ]

  return (
    <nav className="bg-cosmic-950/60 backdrop-blur-xl border-b border-gold-400/20 fixed top-0 left-0 right-0 z-50 shadow-lg shadow-black/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-gold-400 hover:text-gold-300 transition-colors flex items-center gap-3">
            <span className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-cosmic-950 text-sm md:text-lg flex-shrink-0">ॐ</span>
            <span className="hidden sm:inline">शालिग्राम दाहाल</span>
            <span className="sm:hidden">शालिग्राम</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-amber-100 hover:text-gold-400 font-display font-medium transition-colors relative group ${
                  link.to === '/admin' ? 'text-amber-100/60' : ''
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-400 transition-all group-hover:w-full"></span>
              </Link>
            ))}

            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gold-400/20">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1 rounded font-display font-medium transition-all ${
                  i18n.language === 'en'
                    ? 'bg-gold-400 text-cosmic-950'
                    : 'text-amber-100 hover:text-gold-400 hover:bg-gold-400/10'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage('np')}
                className={`px-3 py-1 rounded font-display font-medium transition-all ${
                  i18n.language === 'np'
                    ? 'bg-gold-400 text-cosmic-950'
                    : 'text-amber-100 hover:text-gold-400 hover:bg-gold-400/10'
                }`}
              >
                NP
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gold-400 hover:text-gold-300 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gold-400/20">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-amber-100 hover:text-gold-400 font-display font-medium transition-colors py-2 ${
                    link.to === '/admin' ? 'text-amber-100/60' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex items-center gap-2 pt-4 border-t border-gold-400/20">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-4 py-2 rounded font-display font-medium transition-all flex-1 ${
                    i18n.language === 'en'
                      ? 'bg-gold-400 text-cosmic-950'
                      : 'text-amber-100 border border-gold-400/30'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage('np')}
                  className={`px-4 py-2 rounded font-display font-medium transition-all flex-1 ${
                    i18n.language === 'np'
                      ? 'bg-gold-400 text-cosmic-950'
                      : 'text-amber-100 border border-gold-400/30'
                  }`}
                >
                  नेपाली
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
