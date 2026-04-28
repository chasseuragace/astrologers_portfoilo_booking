interface CosmicCardProps {
  children: React.ReactNode
  variant?: 'default' | 'inner' | 'subtle'
  padding?: 'sm' | 'md' | 'lg'
  className?: string
}

const variantClasses = {
  default: 'bg-cosmic-800/40 backdrop-blur-sm border border-gold-400/20',
  inner: 'bg-cosmic-900/50 border border-gold-400/20',
  subtle: 'bg-cosmic-900/50 border border-gold-400/10',
}

const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const shapeClasses = {
  default: 'rounded-2xl',
  inner: 'rounded-xl',
  subtle: 'rounded-xl',
}

export function CosmicCard({ children, variant = 'default', padding = 'lg', className = '' }: CosmicCardProps) {
  return (
    <div className={`${variantClasses[variant]} ${paddingClasses[padding]} ${shapeClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}
