import { Navigation } from '../../../../components/Navigation'
import { Footer } from '../../../../components/Footer'
import { useState, useMemo } from 'react'
import { useBookingList } from '../../../booking/presentation/hooks/booking.hooks'
import { Calendar, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import { NepaliDatePickerCustom } from '../../../../components/NepaliDatePickerCustom'

export function CustomerBookingsPage() {
  const { data: bookingsData, isLoading, error } = useBookingList()

  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter bookings
  const filteredBookings = useMemo(() => {
    const bookings = bookingsData || []
    return bookings.filter(booking => {
      const statusMatch = statusFilter === 'all' || booking.status === statusFilter
      const dateMatch = !selectedDate || booking.nepaliDate === selectedDate
      return statusMatch && dateMatch
    })
  }, [bookingsData, statusFilter, selectedDate])

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)
  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredBookings.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredBookings, currentPage, itemsPerPage])

  // Reset page when filters change
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status)
    setCurrentPage(1)
  }

  const handleDateFilterChange = (date: string) => {
    setSelectedDate(date)
    setCurrentPage(1)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-500/80 text-amber-100'
      case 'Pending': return 'bg-gold-500/80 text-cosmic-950'
      case 'Rejected': return 'bg-red-500/80 text-amber-100'
      case 'Completed': return 'bg-blue-500/80 text-amber-100'
      case 'Cancelled': return 'bg-gray-500/80 text-amber-100'
      default: return 'bg-cosmic-700 text-amber-100'
    }
  }

  const statusOptions = ['all', 'Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled']

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-cosmic-950 font-body">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-gold-400 font-display text-xl animate-pulse">Consulting the stars...</div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-cosmic-950 font-body">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-red-400 bg-red-900/20 p-6 rounded-xl border border-red-500/50">
            <h2 className="text-xl font-display font-bold mb-2">Error connecting to celestial database</h2>
            <p>{error.message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
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
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-gold-400">My Bookings</h1>
            <p className="text-xl text-amber-200/70">View and manage your appointment requests</p>
          </div>

          {/* Filters */}
          <div className="bg-cosmic-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gold-400/20 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gold-400" />
                <span className="text-amber-100 font-display font-semibold">Filters:</span>
              </div>
              
              {/* Status Filter */}
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusFilterChange(status)}
                    className={`px-4 py-2 rounded-lg font-display font-medium transition-all ${
                      statusFilter === status
                        ? 'bg-gold-500 text-cosmic-950'
                        : 'bg-cosmic-900/50 border border-gold-400/30 text-amber-100 hover:bg-gold-400/10'
                    }`}
                  >
                    {status === 'all' ? 'All' : status}
                  </button>
                ))}
              </div>

              {/* Date Filter */}
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gold-400" />
                <NepaliDatePickerCustom
                  value={selectedDate}
                  onChange={(date) => handleDateFilterChange(date)}
                  placeholder="Filter by date"
                  className="w-48"
                />
                {selectedDate && (
                  <button
                    onClick={() => handleDateFilterChange('')}
                    className="text-amber-200/60 hover:text-amber-100"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Filter Summary */}
            <div className="mt-4 pt-4 border-t border-gold-400/20">
              <p className="text-amber-200/60">
                Showing {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''}
                {statusFilter !== 'all' && ` with status "${statusFilter}"`}
                {selectedDate && ` on ${selectedDate}`}
              </p>
            </div>
          </div>

          {/* Bookings List */}
          <div className="bg-cosmic-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gold-400/20 mb-8">
            {paginatedBookings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-amber-200/60 text-lg">No bookings found matching your filters.</p>
                {statusFilter !== 'all' || selectedDate ? (
                  <button
                    onClick={() => {
                      setStatusFilter('all')
                      setSelectedDate('')
                      setCurrentPage(1)
                    }}
                    className="mt-4 px-6 py-2 bg-gold-500 text-cosmic-950 font-display font-semibold rounded-lg hover:bg-gold-600 transition-colors"
                  >
                    Clear Filters
                  </button>
                ) : null}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedBookings.map((booking) => (
                  <div key={booking.id} className="bg-cosmic-900/50 border border-gold-400/20 rounded-xl p-6 hover:border-gold-400/40 transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-display font-semibold text-amber-100 text-lg">{booking.name}</p>
                          <span className={`px-3 py-1 rounded-full text-sm font-display font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-amber-200/80 mb-1">{booking.serviceType}</p>
                        <p className="text-amber-200/60 text-sm">
                          <span className="font-display font-medium">Date:</span> {booking.nepaliDate}
                          {booking.duration && ` • <span className="font-display font-medium">Duration:</span> ${booking.duration}`}
                        </p>
                        {booking.location && (
                          <p className="text-amber-200/60 text-sm">
                            <span className="font-display font-medium">Location:</span> {booking.location}
                          </p>
                        )}
                        {booking.description && (
                          <p className="text-amber-200/60 text-sm mt-2">{booking.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-cosmic-900/50 border border-gold-400/30 text-amber-100 hover:bg-gold-400/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-display font-medium transition-all ${
                    currentPage === page
                      ? 'bg-gold-500 text-cosmic-950'
                      : 'bg-cosmic-900/50 border border-gold-400/30 text-amber-100 hover:bg-gold-400/10'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-cosmic-900/50 border border-gold-400/30 text-amber-100 hover:bg-gold-400/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
