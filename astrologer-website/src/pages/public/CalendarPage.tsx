import { Navigation } from '../../components/Navigation'
import { Footer } from '../../components/Footer'
import { Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useBookingList } from '../../features/booking/presentation/hooks/booking.hooks'
import NepaliDate from 'nepali-date-converter'

export function CalendarPage() {
  const { t } = useTranslation()
  const { data: bookingsData, isLoading, error } = useBookingList()
  
  // Get current Nepali date for initial state
  const now = useMemo(() => new NepaliDate(), [])
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1) // 1-indexed
  const [currentYear, setCurrentYear] = useState(now.getYear())

  const nepaliMonths = [
    'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra',
    'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
  ]

  // Get days in month dynamically using the library
  const days = useMemo(() => {
    // Start at the 28th (all months have at least 28 days)
    const d = new NepaliDate(currentYear, currentMonth - 1, 28)
    let monthDays = 28
    // Increment until we hit the next month
    while (d.getMonth() === currentMonth - 1) {
      monthDays++
      d.setDate(monthDays)
    }
    return monthDays - 1
  }, [currentMonth, currentYear])
  
  const bookings = bookingsData || []

  const getBookingsForDate = (day: number) => {
    const dateStr = `${currentYear}/${String(currentMonth).padStart(2, '0')}/${String(day).padStart(2, '0')}`
    return bookings.filter(b => b.nepaliDate === dateStr)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-500/80 text-amber-100'
      case 'Pending': return 'bg-gold-500/80 text-cosmic-950'
      case 'Rejected': return 'bg-red-500/80 text-amber-100'
      default: return 'bg-cosmic-700 text-amber-100'
    }
  }

  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-cosmic-950 font-body">
      <Navigation />
      <main className="flex-1 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-gradient opacity-50"></div>
        <div className="absolute inset-0 bg-sacred-pattern"></div>
        
        <div className="relative z-10 container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full animate-glow opacity-60 blur-xl"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-cosmic-950 text-3xl font-display font-bold">
                ॐ
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-gold-400">{t('home.celestialCalendar')}</h1>
            <p className="text-xl text-amber-200/70">
              {t('home.calendarDesc')}
            </p>
          </div>

          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-400 mx-auto mb-4"></div>
              <p className="text-amber-200/70">Syncing with celestial alignments...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12 bg-red-900/20 rounded-2xl border border-red-500/50 mb-8">
              <p className="text-red-200">Error fetching bookings: {error.message}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Calendar Navigation */}
          {!isLoading && !error && (
            <>
              <div className="bg-cosmic-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gold-400/20 mb-8">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={prevMonth}
                className="px-6 py-3 bg-cosmic-900/50 border border-gold-400/30 text-amber-100 font-display font-semibold rounded-lg hover:bg-gold-400/10 hover:border-gold-400 transition-all"
              >
                ← Previous
              </button>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gold-400">
                {nepaliMonths[currentMonth - 1]} {currentYear} (Bikram Sambat)
              </h2>
              <button
                onClick={nextMonth}
                className="px-6 py-3 bg-cosmic-900/50 border border-gold-400/30 text-amber-100 font-display font-semibold rounded-lg hover:bg-gold-400/10 hover:border-gold-400 transition-all"
              >
                Next →
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 md:gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-display font-semibold text-gold-400 p-1 md:p-2 text-xs md:text-base">
                  <span className="hidden sm:inline">{day}</span>
                  <span className="sm:hidden">{day.slice(0, 1)}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {Array.from({ length: days }, (_, i) => {
                const day = i + 1
                const dayBookings = getBookingsForDate(day)
                return (
                  <div
                    key={day}
                    className="bg-cosmic-900/50 border border-gold-400/20 rounded-lg p-1 md:p-2 min-h-16 md:min-h-24 hover:border-gold-400/50 hover:bg-gold-400/5 cursor-pointer transition-all"
                  >
                    <div className="font-display font-semibold text-amber-100 mb-1 text-sm md:text-base">{day}</div>
                    {dayBookings.length > 0 && (
                      <div className="space-y-1">
                        {dayBookings.map((booking, idx) => (
                          <div
                            key={idx}
                            className={`text-xs p-1 rounded font-medium ${getStatusColor(booking.status)}`}
                          >
                            {booking.time}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bookings List */}
          <div className="bg-cosmic-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gold-400/20 mb-8">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-6 text-gold-400">Scheduled Bookings</h3>
            {bookings.length === 0 ? (
              <p className="text-amber-200/60">No bookings scheduled for this month.</p>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking, index) => (
                  <div key={index} className="bg-cosmic-900/50 border border-gold-400/20 rounded-xl p-4 hover:border-gold-400/40 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-display font-semibold text-amber-100">{booking.nepaliDate}</p>
                        <p className="text-amber-200/60">{booking.time}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-display font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-amber-200/80">{booking.serviceType}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Book Appointment CTA */}
          <div className="text-center">
            <Link
              to="/booking"
              className="inline-block px-10 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-cosmic-950 font-display font-semibold rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-gold-400/30 hover:scale-105"
            >
              {t('home.bookAppointment')}
            </Link>
          </div>
          </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
