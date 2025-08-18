/**
 * Performance monitoring utilities
 */

// Web Vitals tracking
export const measureWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}

// Component render time measurement
export const measureRenderTime = (componentName) => {
  const startTime = performance.now()
  
  return () => {
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`)
    }
    
    return renderTime
  }
}

// Bundle size analysis helper
export const logBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    import('webpack-bundle-analyzer').then(() => {
      console.log('Bundle analyzer available. Run: npm run analyze')
    }).catch(() => {
      console.log('Install webpack-bundle-analyzer for bundle size analysis')
    })
  }
}

// Memory usage monitoring
export const logMemoryUsage = () => {
  if (performance.memory && process.env.NODE_ENV === 'development') {
    const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } = performance.memory
    console.log('Memory usage:', {
      used: `${(usedJSHeapSize / 1048576).toFixed(2)} MB`,
      total: `${(totalJSHeapSize / 1048576).toFixed(2)} MB`,
      limit: `${(jsHeapSizeLimit / 1048576).toFixed(2)} MB`
    })
  }
}

// Network performance
export const measureNetworkLatency = async (url) => {
  const startTime = performance.now()
  
  try {
    await fetch(url, { method: 'HEAD' })
    const endTime = performance.now()
    return endTime - startTime
  } catch (error) {
    console.warn('Network latency measurement failed:', error)
    return null
  }
}
