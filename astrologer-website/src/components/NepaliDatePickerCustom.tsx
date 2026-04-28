import { useState, useRef, useEffect } from 'react'
import NepaliDate from 'nepali-date-converter'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface NepaliDatePickerCustomProps {
  value: string
  onChange: (date: string) => void
  placeholder?: string
  className?: string
}

export function NepaliDatePickerCustom({
  value,
  onChange,
  placeholder = 'Select date',
  className = ''
}: NepaliDatePickerCustomProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [displayMonth, setDisplayMonth] = useState<number>(1)
  const [displayYear, setDisplayYear] = useState<number>(2083)
  const inputRef = useRef<HTMLInputElement>(null)
  const pickerRef = useRef<HTMLDivElement>(null)
  const prevValueRef = useRef<string>(value)

  // Parse current value - only update when value changes externally
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (value !== prevValueRef.current) {
      prevValueRef.current = value
      if (value) {
        const parts = value.split('/')
        if (parts.length === 3) {
          setDisplayYear(parseInt(parts[0]))
          setDisplayMonth(parseInt(parts[1]))
        }
      } else {
        const now = new NepaliDate()
        setDisplayYear(now.getYear())
        setDisplayMonth(now.getMonth() + 1)
      }
    }
  }, [value])
  /* eslint-enable react-hooks/set-state-in-effect */

  const nepaliMonths = [
    'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra',
    'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
  ]

  const getDaysInMonth = (year: number, month: number) => {
    const d = new NepaliDate(year, month - 1, 28)
    let monthDays = 28
    while (d.getMonth() === month - 1) {
      monthDays++
      d.setDate(monthDays)
    }
    return monthDays - 1
  }

  const daysInMonth = getDaysInMonth(displayYear, displayMonth)

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (displayMonth === 1) {
      setDisplayMonth(12)
      setDisplayYear(displayYear - 1)
    } else {
      setDisplayMonth(displayMonth - 1)
    }
  }

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (displayMonth === 12) {
      setDisplayMonth(1)
      setDisplayYear(displayYear + 1)
    } else {
      setDisplayMonth(displayMonth + 1)
    }
  }

  const handleDateSelect = (day: number) => {
    const dateStr = `${displayYear}/${String(displayMonth).padStart(2, '0')}/${String(day).padStart(2, '0')}`
    onChange(dateStr)
    setIsOpen(false)
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (pickerRef.current && !pickerRef.current.contains(e.target as Node) && inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={() => setIsOpen(!isOpen)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border border-gold-400/30 rounded-lg bg-cosmic-900/50 text-amber-100 placeholder-amber-200/40 focus:border-gold-400 focus:outline-none transition-colors cursor-pointer ${className}`}
      />

      {isOpen && (
        <div
          ref={pickerRef}
          className="absolute top-full left-0 mt-2 bg-cosmic-900 border border-gold-400/30 rounded-lg p-4 z-50 w-full md:w-80 shadow-lg shadow-cosmic-900/50"
        >
          {/* Month/Year Navigation */}
          <div className="flex justify-between items-center mb-4" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onMouseDown={handlePrevMonth}
              onClick={(e) => e.stopPropagation()}
              className="p-2 hover:bg-cosmic-800/50 rounded transition-colors"
            >
              <ChevronLeft size={20} className="text-gold-400" />
            </button>
            <div className="text-center">
              <div className="text-amber-100 font-display font-semibold">
                {nepaliMonths[displayMonth - 1]}
              </div>
              <div className="text-gold-400 font-display font-bold text-lg">{displayYear}</div>
            </div>
            <button
              type="button"
              onMouseDown={handleNextMonth}
              onClick={(e) => e.stopPropagation()}
              className="p-2 hover:bg-cosmic-800/50 rounded transition-colors"
            >
              <ChevronRight size={20} className="text-gold-400" />
            </button>
          </div>

          {/* Day of week headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs text-gold-400/70 font-semibold">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const dateStr = `${displayYear}/${String(displayMonth).padStart(2, '0')}/${String(day).padStart(2, '0')}`
              const isSelected = value === dateStr

              return (
                <button
                  key={day}
                  onClick={() => handleDateSelect(day)}
                  className={`p-2 rounded text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-gradient-to-br from-gold-500 to-gold-600 text-cosmic-950'
                      : 'text-amber-100 hover:bg-cosmic-800/50 hover:border hover:border-gold-400/30'
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
