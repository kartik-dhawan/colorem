import { Box, Button, TextField } from "@mui/material"
import { styles as AuthStyles, styles } from "../LoginPage/styles"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback, { myErrorHandler } from "../common/ErrorFallback"
import { LoadingButton } from "@mui/lab"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { isValidEmail } from "../../utils/methods"
import { RecoveryType } from "../../utils/interfaces"

const RecoverPassword = () => {
  const rid = "recoverPassword"
  const router = useRouter()

  const [recoveryEmail, setRecoveryEmail] = useState<string>("")
  const [recoveryUsername, setRecoveryUsername] = useState<string>("")
  const [disabledButton, setDisabledButton] = useState<boolean>(false)
  const [recoveryType, setRecoveryType] = useState<RecoveryType>("email")

  // validates the entered data
  useEffect(() => {
    if (recoveryType === "email") {
      return isValidEmail(recoveryEmail)
        ? setDisabledButton(false)
        : setDisabledButton(true)
    } else {
      return recoveryUsername.length < 4
        ? setDisabledButton(true)
        : setDisabledButton(false)
    }
  }, [recoveryEmail, recoveryUsername])

  const recoverPasswordHandler = useCallback(() => {
    return recoveryType === "email"
      ? setRecoveryType("username")
      : setRecoveryType("email")
  }, [recoveryEmail, recoveryType])

  const goBackHandler = useCallback(() => {
    router.push("/login")
  }, [router])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      <Box sx={AuthStyles.loginPageWrapper}>
        <Box sx={AuthStyles.loginPageFormWrapper}>
          {recoveryType === "email" && (
            <TextField
              label="Recovery Email Id"
              type="email"
              autoComplete="current-password"
              variant="standard"
              className={rid + "TextField"}
              id={rid + "PasswordField"}
              data-testid={rid + "PasswordField"}
              required
              sx={{
                minWidth: {
                  sm: "50%",
                  md: "40%",
                  lg: "35%",
                },
                ...AuthStyles.loginPageTextField,
              }}
              value={recoveryEmail}
              onChange={(e) => {
                setRecoveryEmail(e.target.value)
              }}
            />
          )}
          {recoveryType === "username" && (
            <TextField
              label="Recovery Username"
              variant="standard"
              className={rid + "TextField"}
              id={rid + "UsernameField"}
              data-testid={rid + "UsernameField"}
              sx={styles.loginPageTextField}
              value={recoveryUsername}
              required
              onChange={(e) => {
                setRecoveryUsername(e.target.value)
              }}
            />
          )}
          <LoadingButton
            disableRipple
            sx={styles.loginPageButton}
            data-testid={rid + "RecoverButton"}
            // loading={loader}
            disabled={disabledButton}
          >
            Send Link
          </LoadingButton>
        </Box>
        <Box sx={AuthStyles.loginPageExtraOptions}>
          <Button
            disableRipple
            sx={AuthStyles.loginPageExtraOptionsButton}
            onClick={recoverPasswordHandler}
          >
            {recoveryType === "email"
              ? "recover using username"
              : "recover using email"}
          </Button>
          <Button
            disableRipple
            sx={AuthStyles.loginPageExtraOptionsButton}
            onClick={goBackHandler}
          >
            go back
          </Button>
        </Box>
      </Box>
    </ErrorBoundary>
  )
}

export default RecoverPassword
