import { Link } from 'react-router-dom'

interface CtaButtonProps {
  to: string
  children: React.ReactNode
  variant?: 'primary' | 'outline' | 'mystic'
  size?: 'default' | 'large'
  glow?: boolean
}

const variantClasses = {
  primary: 'bg-gradient-to-r from-gold-500 to-gold-600 text-cosmic-950 hover:shadow-gold-500/30',
  outline: 'border-2 border-gold-400/50 text-gold-400 hover:bg-gold-400/10',
  mystic: 'bg-gradient-to-r from-mystic-purple to-mystic-indigo text-amber-100 hover:shadow-mystic-purple/30',
}

const sizeClasses = {
  default: 'px-10 py-4',
  large: 'px-12 py-5 text-lg',
}

export function CtaButton({ to, children, variant = 'primary', size = 'default', glow = false }: CtaButtonProps) {
  if (glow) {
    return (
      <div className="inline-block relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg blur-xl opacity-30 animate-glow"></div>
        <Link
          to={to}
          className={`relative ${sizeClasses[size]} ${variantClasses[variant]} font-display font-bold rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 inline-block`}
        >
          {children}
        </Link>
      </div>
    )
  }

  if (variant === 'primary') {
    return (
      <Link
        to={to}
        className={`group relative ${sizeClasses[size]} ${variantClasses[variant]} font-display font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105`}
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </Link>
    )
  }

  return (
    <Link
      to={to}
      className={`${sizeClasses[size]} ${variantClasses[variant]} font-display font-semibold rounded-lg transition-all duration-300 hover:scale-105`}
    >
      {children}
    </Link>
  )
}
