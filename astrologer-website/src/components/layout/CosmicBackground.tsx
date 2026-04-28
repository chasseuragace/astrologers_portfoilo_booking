interface CosmicBackgroundProps {
  showOrbs?: boolean
  className?: string
}

export function CosmicBackground({ showOrbs = false, className = '' }: CosmicBackgroundProps) {
  return (
    <>
      <div className={`absolute inset-0 bg-cosmic-gradient opacity-50 ${className}`}></div>
      <div className="absolute inset-0 bg-sacred-pattern"></div>
      {showOrbs && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-mystic-purple/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-mystic-indigo/10 rounded-full blur-3xl"></div>
        </>
      )}
    </>
  )
}
