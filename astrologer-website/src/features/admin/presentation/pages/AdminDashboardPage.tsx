import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigation } from '../../../../components/Navigation'
import { Footer } from '../../../../components/Footer'
import { Link } from 'react-router-dom'
import { Users, Settings, LogOut, CheckCircle, Clock, XCircle } from 'lucide-react'
import { onAuthChange, logoutUser } from '../../../../firebase/auth'
import { useBookingList } from '../../../booking/presentation/hooks/booking.hooks'

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const [authLoading, setAuthLoading] = useState(true)
  const { data: bookingsData, isLoading: bookingsLoading, error: bookingsError } = useBookingList()

  useEffect(() => {
    // Check Firebase authentication
    const unsubscribe = onAuthChange((user) => {
      if (!user) {
        navigate('/admin/login')
      }
      setAuthLoading(false)
    })

    return () => unsubscribe()
  }, [navigate])

  const handleLogout = async () => {
    await logoutUser()
    navigate('/admin/login')
  }

  const bookings = bookingsData || []

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-500 text-white'
      case 'Pending': return 'bg-yellow-500 text-white'
      case 'Rejected': return 'bg-red-500 text-white'
      case 'Completed': return 'bg-blue-500 text-white'
      case 'Cancelled': return 'bg-gray-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    approved: bookings.filter(b => b.status === 'Approved').length,
    rejected: bookings.filter(b => b.status === 'Rejected').length,
  }

  if (authLoading || (bookingsLoading && bookings.length === 0)) {
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

  if (bookingsError) {
    return (
      <div className="min-h-screen flex flex-col bg-cosmic-950 font-body">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-red-400 bg-red-900/20 p-6 rounded-xl border border-red-500/50">
            <h2 className="text-xl font-display font-bold mb-2">Error connecting to celestial database</h2>
            <p>{bookingsError.message}</p>
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
        
        <div className="relative z-10 container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-display font-bold text-gold-400">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-500/30 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-cosmic-800/40 backdrop-blur-sm p-6 rounded-xl border border-gold-400/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-200/60">Total Bookings</p>
                  <p className="text-3xl font-display font-bold text-amber-100">{stats.total}</p>
                </div>
                <Users className="w-8 h-8 text-gold-400" />
              </div>
            </div>

            <div className="bg-cosmic-800/40 backdrop-blur-sm p-6 rounded-xl border border-gold-400/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-200/60">Pending</p>
                  <p className="text-3xl font-display font-bold text-amber-100">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
            </div>

            <div className="bg-cosmic-800/40 backdrop-blur-sm p-6 rounded-xl border border-gold-400/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-200/60">Approved</p>
                  <p className="text-3xl font-display font-bold text-amber-100">{stats.approved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
            </div>

            <div className="bg-cosmic-800/40 backdrop-blur-sm p-6 rounded-xl border border-gold-400/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-200/60">Rejected</p>
                  <p className="text-3xl font-display font-bold text-amber-100">{stats.rejected}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link
              to="/admin/bookings"
              className="bg-cosmic-800/40 backdrop-blur-sm p-6 rounded-xl border border-gold-400/20 hover:border-gold-400/50 transition"
            >
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-gold-400" />
                <div>
                  <h3 className="font-display font-semibold text-lg text-amber-100">Manage Bookings</h3>
                </div>
              </div>
            </Link>

            <Link
              to="/services"
              className="bg-cosmic-800/40 backdrop-blur-sm p-6 rounded-xl border border-gold-400/20 hover:border-gold-400/50 transition"
            >
              <div className="flex items-center gap-4">
                <Settings className="w-8 h-8 text-gold-400" />
                <div>
                  <h3 className="font-display font-semibold text-lg text-amber-100">Services</h3>
                </div>
              </div>
            </Link>
          </div>

          {/* Recent Bookings */}
          <div className="bg-cosmic-800/40 backdrop-blur-sm p-6 rounded-xl border border-gold-400/20">
            <h2 className="text-2xl font-display font-bold mb-4 text-gold-400">Recent Bookings</h2>
            {bookings.length === 0 ? (
              <p className="text-amber-200/60">No bookings yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gold-400/20">
                      <th className="text-left p-3 text-amber-100 font-display">Name</th>
                      <th className="text-left p-3 text-amber-100 font-display">Service</th>
                      <th className="text-left p-3 text-amber-100 font-display">Date</th>
                      <th className="text-left p-3 text-amber-100 font-display">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((booking) => (
                      <tr key={booking.id} className="border-b border-gold-400/10 hover:bg-gold-400/5">
                        <td className="p-3 text-amber-200">{booking.name}</td>
                        <td className="p-3 text-amber-200">{booking.serviceType}</td>
                        <td className="p-3 text-amber-200">{booking.nepaliDate}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
