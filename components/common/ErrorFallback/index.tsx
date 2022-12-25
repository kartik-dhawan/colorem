export const myErrorHandler = (
  error: Error,
  info: { componentStack: string }
) => {
  // Do something with the error
  // E.g. log to an error logging client here
  console.log("Error: ", error)
  console.log("ErrorInfo: ", info)
}

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: any
}) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.name}</pre>
      <pre>{error.stack}</pre>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export default ErrorFallback
