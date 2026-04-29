import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'

interface ImageCarouselProps {
  images: string[]
  title?: string
}

export function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
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

  // Auto-slide every 7 seconds
  useEffect(() => {
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        nextSlide()
      }, 7000)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [images.length])

  // Reset interval on manual navigation
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        nextSlide()
      }, 7000)
    }
  }, [currentIndex])

  if (images.length === 0) return null

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-2xl font-display font-bold mb-4 text-amber-100">{title}</h3>
      )}
      <div className="relative rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm border border-amber-500/20">
        {/* Main Image */}
        <div className="relative aspect-video w-full">
          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
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
                onClick={() => goToSlide(index)}
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
    </div>
  )
}
