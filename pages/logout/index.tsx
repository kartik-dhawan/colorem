import { getAuth, signOut } from "firebase/auth"
import { useEffect } from "react"
import { app } from "../../lib/auth/firebaseConfig"
import { useRouter } from "next/router"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback, {
  myErrorHandler,
} from "../../components/common/ErrorFallback"
import { Box, Typography } from "@mui/material"
import { styles } from "../../components/LoginPage/styles"
import { useDispatch } from "react-redux"
import {
  updateAuthStatus,
  updateErrorSuccessState,
} from "../../redux/slices/authSlice"
import { LOGOUT_SUCCESS_MESSAGE } from "../../lib/auth/errorMessages"

const LogoutPage = () => {
  const auth = getAuth(app)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    signOut(auth)
      .then((sign) => {
        console.log(sign)
        localStorage.removeItem("firebase-token")
        document.cookie = "firebase-token='';"
        // sets logout status in redux to show success alert on logout
        dispatch(
          updateErrorSuccessState({
            status: "success",
            error: null,
            success: LOGOUT_SUCCESS_MESSAGE,
          })
        )
        // updates auth state in redux
        dispatch(updateAuthStatus(false))
        // post logout redirect
        router.push("/login")
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      <Box
        sx={styles.logoutPageWrapper}
        className="logoutPageWrapper"
        id="logoutPageWrapper"
        data-testid="logoutPageWrapper"
      >
        <Typography
          variant="subtitle1"
          sx={styles.logoutPageText}
          className="logoutPageText"
          id="logoutPageText"
          data-testid="logoutPageText"
        >
          Please wait while we log you out...
        </Typography>
      </Box>
    </ErrorBoundary>
  )
}

export default LogoutPage
