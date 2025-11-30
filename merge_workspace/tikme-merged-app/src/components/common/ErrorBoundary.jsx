import { Component } from 'react'
import './ErrorBoundary.css'

/**
 * Error Boundary Component
 * Catches JavaScript errors in child component tree
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo })

    // Log error to console (in production, send to error tracking service)
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      const { fallback, showDetails = false } = this.props
      const { error, errorInfo } = this.state

      // Custom fallback UI
      if (fallback) {
        return fallback({ error, errorInfo, retry: this.handleRetry })
      }

      // Default error UI
      return (
        <div className="error-boundary">
          <div className="error-content">
            <div className="error-icon">😵</div>
            <h2>Oops! Something went wrong</h2>
            <p className="error-message">
              We're sorry, but something unexpected happened.
              Please try again or refresh the page.
            </p>

            {showDetails && error && (
              <div className="error-details">
                <p className="error-name">{error.name}: {error.message}</p>
                {errorInfo && (
                  <pre className="error-stack">
                    {errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}

            <div className="error-actions">
              <button className="retry-btn" onClick={this.handleRetry}>
                🔄 Try Again
              </button>
              <button className="reload-btn" onClick={this.handleReload}>
                🔃 Refresh Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Tool Error Boundary - Specific for teaching tools
 */
export function ToolErrorBoundary({ children, toolName = 'Tool' }) {
  return (
    <ErrorBoundary
      fallback={({ error, retry }) => (
        <div className="tool-error">
          <div className="tool-error-content">
            <span className="tool-error-icon">⚠️</span>
            <h3>{toolName} Error</h3>
            <p>This tool encountered an issue and couldn't load properly.</p>
            <button className="tool-retry-btn" onClick={retry}>
              Try Again
            </button>
          </div>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}

/**
 * Page Error Boundary - For full pages
 */
export function PageErrorBoundary({ children }) {
  return (
    <ErrorBoundary showDetails={process.env.NODE_ENV === 'development'}>
      {children}
    </ErrorBoundary>
  )
}

export default ErrorBoundary
