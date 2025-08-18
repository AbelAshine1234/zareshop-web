import { useState, useEffect, useRef } from 'react'

/**
 * Hook for intersection observer functionality
 * @param {Object} options - Intersection observer options
 * @returns {Array} [ref, isIntersecting, entry]
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
      setEntry(entry)
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    })

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return [ref, isIntersecting, entry]
}
