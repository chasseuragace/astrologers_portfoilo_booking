import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { clsx } from 'clsx'

interface ImageCarouselProps {
  images: string[]
  title?: string
}

export function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const openFullScreen = () => {
    setIsFullScreen(true)
  }

  const closeFullScreen = () => {
    setIsFullScreen(false)
  }

  // Auto-slide every 7 seconds (only when not in fullscreen)
  useEffect(() => {
    if (images.length > 1 && !isFullScreen) {
      intervalRef.current = setInterval(() => {
        nextSlide()
      }, 7000)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [images.length, isFullScreen])

  // Reset interval on manual navigation
  useEffect(() => {
    if (intervalRef.current && !isFullScreen) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        nextSlide()
      }, 7000)
    }
  }, [currentIndex, isFullScreen])

  // Handle keyboard navigation in fullscreen
  useEffect(() => {
    if (isFullScreen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') nextSlide()
        if (e.key === 'ArrowLeft') prevSlide()
        if (e.key === 'Escape') closeFullScreen()
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFullScreen])

  if (images.length === 0) return null

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-2xl font-display font-bold mb-4 text-amber-100">{title}</h3>
      )}
      <div className="relative rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm border border-amber-500/20">
        {/* Main Image */}
        <div className="relative aspect-video w-full cursor-pointer" onClick={openFullScreen}>
          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
            <span className="text-white text-sm font-medium">Click to expand</span>
          </div>
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); goToSlide(index); }}
                className={clsx(
                  'h-2 rounded-full',
                  index === currentIndex
                    ? 'bg-amber-400 w-6'
                    : 'bg-white/50 w-2'
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Image Counter */}
      {images.length > 1 && (
        <p className="text-center text-amber-200/60 text-sm mt-2">
          {currentIndex + 1} / {images.length}
        </p>
      )}

      {/* Full Screen Modal */}
      {isFullScreen && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col">
          {/* Close Button */}
          <button
            onClick={closeFullScreen}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors"
            aria-label="Close fullscreen"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Main Image Container */}
          <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
            <img
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              style={{ maxHeight: 'calc(100vh - 150px)' }}
            />
          </div>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="h-24 bg-black/50 backdrop-blur-sm flex items-center justify-center gap-2 p-4 overflow-x-auto">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={clsx(
                    'flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border-2 transition-all',
                    index === currentIndex
                      ? 'border-amber-400 opacity-100'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                  aria-label={`Go to image ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  )
}
