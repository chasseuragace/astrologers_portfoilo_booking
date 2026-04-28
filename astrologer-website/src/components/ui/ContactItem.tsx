interface ContactItemProps {
  icon?: React.ReactNode
  label: string
  children: React.ReactNode
}

export function ContactItem({ icon, label, children }: ContactItemProps) {
  return (
    <div className="flex items-start gap-4">
      {icon && (
        <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
      )}
      <div>
        <h3 className="font-display font-semibold text-lg text-amber-100">{label}</h3>
        {children}
      </div>
    </div>
  )
}
