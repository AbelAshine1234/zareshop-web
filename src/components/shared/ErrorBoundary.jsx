import React from 'react'
import styles from './ErrorBoundary.module.scss'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback, showDetails = false } = this.props
      
      if (Fallback) {
        return <Fallback error={this.state.error} />
      }

      return (
        <div className={styles.errorBoundary}>
          <div className={styles.container}>
            <h2 className={styles.title}>Oops! Something went wrong</h2>
            <p className={styles.message}>
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            
            <div className={styles.actions}>
              <button 
                className={styles.button}
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>
              <button 
                className={`${styles.button} ${styles.secondary}`}
                onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
              >
                Try Again
              </button>
            </div>

            {showDetails && this.state.error && (
              <details className={styles.details}>
                <summary>Technical Details</summary>
                <div className={styles.errorDetails}>
                  <strong>Error:</strong> {this.state.error.toString()}
                  <br />
                  <strong>Stack:</strong>
                  <pre>{this.state.errorInfo.componentStack}</pre>
                </div>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
