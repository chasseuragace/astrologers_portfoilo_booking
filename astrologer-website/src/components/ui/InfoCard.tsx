interface InfoCardProps {
  label: string
  value: string
}

export function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="bg-cosmic-800/40 backdrop-blur-sm p-6 rounded-xl border border-gold-400/20">
      <h3 className="text-2xl font-display font-bold mb-3 text-amber-100">{label}</h3>
      <p className="text-amber-200/70">{value}</p>
    </div>
  )
}
