interface ServiceCardProps {
  num: string
  title: string
  description: string
  index?: number
  compact?: boolean
}

export function ServiceCard({ num, title, description, index = 0, compact = false }: ServiceCardProps) {
  const badgeSize = compact ? 'w-14 h-14 text-lg mb-4' : 'w-16 h-16 text-xl mb-6'
  const titleSize = compact ? 'text-2xl mb-3' : 'text-2xl mb-4'

  return (
    <div
      className="group relative bg-cosmic-800/40 backdrop-blur-sm p-8 rounded-2xl border border-gold-400/20 hover:border-gold-400/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold-400/10 flex flex-col"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className={`${badgeSize} rounded-full bg-gradient-to-br from-gold-400/20 to-gold-600/20 border border-gold-400/30 flex items-center justify-center text-gold-400 font-display font-bold`}>
          {num}
        </div>
        <h3 className={`${titleSize} font-display font-bold text-amber-100`}>{title}</h3>
        <p className="text-amber-200/60 leading-relaxed flex-1">{description}</p>
      </div>
    </div>
  )
}
