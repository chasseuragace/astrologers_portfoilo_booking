import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigation } from '../../components/Navigation'
import { Footer } from '../../components/Footer'
import { loginWithEmail } from '../../firebase/auth'

export function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await loginWithEmail(email, password)
    
    if (result.error) {
      setError(result.error)
    } else if (result.user) {
      navigate('/admin/dashboard')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-cosmic-950 font-body">
      <Navigation />
      <main className="flex-1 flex items-center justify-center py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-gradient opacity-50"></div>
        <div className="absolute inset-0 bg-sacred-pattern"></div>
        
        <div className="relative z-10 container mx-auto px-4 max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full animate-glow opacity-60 blur-xl"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-cosmic-950 text-3xl font-display font-bold">
                ॐ
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gold-400">Admin Login</h1>
          </div>

          <div className="bg-cosmic-800/40 backdrop-blur-sm p-8 rounded-2xl border border-gold-400/20">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-amber-100">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gold-400/30 rounded-lg bg-cosmic-900/50 text-amber-100 placeholder-amber-200/40 focus:border-gold-400 focus:outline-none transition-colors"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2 text-amber-100">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gold-400/30 rounded-lg bg-cosmic-900/50 text-amber-100 placeholder-amber-200/40 focus:border-gold-400 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-cosmic-950 px-6 py-3 rounded-lg font-display font-semibold hover:shadow-lg hover:shadow-gold-400/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-cosmic-900/50 rounded-lg border border-gold-400/20">
              <p className="text-sm text-amber-200/60 text-center">
                Only authorized admin can access this area.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
