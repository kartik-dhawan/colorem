import { Box, Button, TextField } from "@mui/material"
import { styles as AuthStyles, styles } from "../LoginPage/styles"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback, { myErrorHandler } from "../common/ErrorFallback"
import { LoadingButton } from "@mui/lab"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { isValidEmail } from "../../utils/methods"
import { LoginErrorSuccess, RecoveryType } from "../../utils/interfaces"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import db, { app } from "../../lib/auth/firebaseConfig"
import { getErrorObjectByCode } from "../../lib/auth/errorMessages"
import { useDispatch } from "react-redux"
import {
  resetErrorState,
  updateErrorSuccessState,
} from "../../redux/slices/authSlice"
import { collection, query, where } from "firebase/firestore"
import { getUsersDataFromQuery } from "../../lib/auth/firestore"

const RecoverPassword = () => {
  const rid = "recoverPassword"
  const router = useRouter()
  const auth = getAuth(app)
  const dispatch = useDispatch()
  const collectioRef = collection(db, "users")

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
    dispatch(resetErrorState())
    router.push("/login")
  }, [router])

  const resetPasswordHandler = async () => {
    // querying the firestore db to get email for the entered usernmame
    const q = query(collectioRef, where("username", "==", recoveryUsername))
    const data = await getUsersDataFromQuery(q)

    /* if user wants to recovers by email, use the email entered
     * else if user enters username, it will fetch the email from firestore
     * corressponding to that username
     */
    const email = recoveryType === "username" ? data.email : recoveryEmail

    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("email sent")
      })
      .catch((error) => {
        console.log(error.code)
        console.log(getErrorObjectByCode(error.code))
        const errorObject: LoginErrorSuccess = {
          status: "error",
          error: {
            code: error.code,
            message: error.message,
            name: error.name,
            customData: error.customData,
          },
        }
        dispatch(updateErrorSuccessState(errorObject))
      })
  }

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
            onClick={resetPasswordHandler}
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
