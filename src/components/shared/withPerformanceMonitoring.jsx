import React, { useEffect } from 'react'
import { measureRenderTime } from '../../utils/performance'

/**
 * Higher-order component for performance monitoring
 * @param {React.Component} WrappedComponent - Component to wrap
 * @param {string} componentName - Name for logging
 * @returns {React.Component} Enhanced component with performance monitoring
 */
const withPerformanceMonitoring = (WrappedComponent, componentName) => {
  const EnhancedComponent = React.memo((props) => {
    useEffect(() => {
      const endMeasure = measureRenderTime(componentName || WrappedComponent.name)
      return endMeasure
    })

    return <WrappedComponent {...props} />
  })

  EnhancedComponent.displayName = `withPerformanceMonitoring(${componentName || WrappedComponent.name})`
  
  return EnhancedComponent
}

export default withPerformanceMonitoring
