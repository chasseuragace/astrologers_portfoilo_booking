interface PageHeaderProps {
  title: string
  subtitle?: string
  showOm?: boolean
}

export function PageHeader({ title, subtitle, showOm = true }: PageHeaderProps) {
  return (
    <div className="text-center mb-12">
      {showOm && (
        <div className="w-20 h-20 mx-auto mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full animate-glow opacity-60 blur-xl"></div>
          <div className="relative w-full h-full bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-cosmic-950 text-3xl font-display font-bold">
            ॐ
          </div>
        </div>
      )}
      <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-gold-400">{title}</h1>
      {subtitle && <p className="text-xl text-amber-200/70">{subtitle}</p>}
    </div>
  )
}
