import { Alert, AlertTitle, Box, Button } from "@mui/material"
import { useCallback, useState } from "react"
import { logger } from "../../../lib/methods"
import { styles } from "./styles"

export const myErrorHandler = (
  error: Error,
  info: { componentStack: string }
) => {
  // Do something with the error
  // E.g. log to an error logging client here
  logger({ error, type: "Error" })
  logger({ info, type: "Info" })
}

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: any // eslint-disable-line
}) => {
  const efid = "errorFallback"

  const [showErrorDetails, setShowErrorDetails] = useState<boolean>(false)

  const errorDetailsHandler = useCallback(() => {
    setShowErrorDetails(!showErrorDetails)
  }, [showErrorDetails])

  return (
    <Box
      role="alert"
      className={efid + "Wrapper"}
      id={efid + "Wrapper"}
      sx={styles.errorFallbackWrapper}
    >
      <Alert
        severity="error"
        className={efid + "PrimaryAlert"}
        id={efid + "PrimaryAlert"}
        action={
          <Button color="inherit" size="small" onClick={errorDetailsHandler}>
            {showErrorDetails ? "Hide details" : "Show details"}
          </Button>
        }
        sx={styles.errorFallbackHeaderAlert}
      >
        <AlertTitle>Code Error</AlertTitle>
        {error.name}
      </Alert>
      {showErrorDetails && (
        <Alert
          severity="error"
          sx={{
            width: "80%",
          }}
          className={efid + "SecondaryAlert"}
          id={efid + "SecondaryAlert"}
        >
          <AlertTitle>{error.name}</AlertTitle>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </Alert>
      )}
      <Box sx={styles.errorFallbackTryAgainBtnWrapper}>
        <Button
          className={efid + "TryAgainBtn"}
          id={efid + "TryAgainBtn"}
          sx={styles.errorFallbackTryAgainBtn}
          onClick={resetErrorBoundary}
        >
          Try Again
        </Button>
      </Box>
    </Box>
  )
}

export default ErrorFallback
