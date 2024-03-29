import { Box, Button, TextField } from "@mui/material"
import { styles } from "./styles"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { LoginErrorSuccess, LoginFormState } from "../../utils/interfaces"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"
import db, { app } from "../../lib/auth/firebaseConfig"
import { addDoc, collection, query, where } from "firebase/firestore"
import { getUsersDataFromQuery } from "../../lib/auth/firestore"
import LoadingButton from "@mui/lab/LoadingButton"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback, { myErrorHandler } from "../common/ErrorFallback"
import { useDispatch, useSelector } from "react-redux"
import {
  resetErrorState,
  updateAuthStatus,
  updateErrorSuccessState,
} from "../../redux/slices/authSlice"
import AuthAlert from "../common/AlertBoxes/AuthAlert"
import { RootType } from "../../redux/constants/stateTypes"
import { isValidEmail } from "../../utils/methods"

const LoginPage = () => {
  const lid = "loginPage"
  const router = useRouter()
  const auth = getAuth(app)
  const dispatch = useDispatch()
  const collectioRef = collection(db, "users")
  const googleProvider = new GoogleAuthProvider()

  const initialFormState: LoginFormState = {
    email: "",
    username: "",
    password: "",
  }

  // finds the status of the page - login or signup
  const activityStatus = router.query?.activity
    ? router.query?.activity
    : "login"

  const [toggleLoginActivity, setToggleLoginActivity] = useState<boolean>(true) // true - login & false - sign up
  const [formData, setFormData] = useState<LoginFormState>(initialFormState)
  const [loader, setLoader] = useState<boolean>(false)
  const [disabledButton, setDisabledButton] = useState<boolean>(false) // eslint-disable-line

  const { errorSuccessState } = useSelector(
    (state: RootType) => state.authSlice
  )

  // logs user in on enter
  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === "Enter" && !disabledButton) {
        event.preventDefault()
        return loginHandler()
      }
    }

    document.addEventListener("keydown", keyDownHandler)

    return () => {
      document.removeEventListener("keydown", keyDownHandler)
    }
  }, [disabledButton, formData])

  /*
   * textfield input check to disable or enable buttons
   * also adds a check for password to be at least of 6 characters
   * & username to be of at least 4 characters
   */
  useEffect(() => {
    setDisabledButton(false)
    if (activityStatus === "login") {
      ;(formData.username.length < 4 || formData.password.length < 6) && // eslint-disable-line
        setDisabledButton(true)
    }
    if (activityStatus === "signup") {
      ;(formData.username.length < 4 || // eslint-disable-line
        formData.password.length < 6 ||
        !isValidEmail(formData.email)) &&
        setDisabledButton(true)
    }
  }, [formData])

  // enables url traversing to sign up or login page specificaly
  useEffect(() => {
    if (activityStatus === "login") {
      setToggleLoginActivity(true)
    } else if (activityStatus === "signup") {
      setToggleLoginActivity(false)
    }
  }, [router.query])

  const loginHandler = async () => {
    dispatch(resetErrorState())

    // initializes loader
    setLoader(true)

    // querying the firestore db to get email for the entered usernmame
    const q = query(collectioRef, where("username", "==", formData.username))
    getUsersDataFromQuery(q).then((data: any) /* eslint-disable-line */ => {
      if (data !== null) {
        signInWithEmailAndPassword(auth, data.email, formData.password)
          .then(async (user) => {
            // algo : HS256
            const token = await user.user.getIdToken()
            localStorage.setItem("firebase-token", token)
            document.cookie = `firebase-token=${token}`
            // clears form data after login
            setFormData(initialFormState)
            // sets auth state in redux
            dispatch(updateAuthStatus(true))
            // post login redirect
            router.push("/dashboard")
          })
          .catch((error) => {
            // all errors will be handled in the same format
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
            setLoader(false)
          })
      } else {
        const errorObject: LoginErrorSuccess = {
          status: "error",
          error: {
            name: "EmailNotFound",
            code: "auth/email-not-found",
            message:
              "The username is incorrect, the account does not exist. Please signup to continue.",
            customData: {},
          },
        }
        dispatch(updateErrorSuccessState(errorObject))
        setLoader(false)
      }
    })
  }

  const signUpHandler = () => {
    setLoader(true)
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (res) => {
        const token = await res.user.getIdToken()
        // logs user in after sign up
        localStorage.setItem("firebase-token", token)
        document.cookie = `firebase-token=${token}`
        // clears form data after login
        setFormData(initialFormState)
        // sets auth state in redux
        dispatch(updateAuthStatus(true))
        // saves username & email in database
        await addDoc(collectioRef, {
          method: "email-password",
          email: formData.email,
          username: formData.username,
        })
        setLoader(false)
        router.push("/dashboard")
      })
      .catch((error) => {
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
        setLoader(false)
      })
  }

  // toogles from signup page to login page
  const handleLoginToggle = useCallback(() => {
    dispatch(resetErrorState())
    setToggleLoginActivity(true)
    router.push({
      pathname: "/login",
      query: { ...router.query, activity: "login" },
    })
    setFormData(initialFormState)
  }, [router])

  // toogles from login page to signup page
  const handleSignupToggle = useCallback(() => {
    dispatch(resetErrorState())
    setToggleLoginActivity(false)
    router.push({
      pathname: "/login",
      query: { ...router.query, activity: "signup" },
    })
    setFormData(initialFormState)
  }, [router])

  const recoverRouteHandler = useCallback(() => {
    router.push("/recover")
  }, [router])

  const signInWithGoogleHandler = async () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential && credential.idToken
        token && localStorage.setItem("firebase-token", token)
        document.cookie = `firebase-token=${token}`
        // The signed-in user info.
        const user = result.user
        // saves email in database if there is not already an account
        const q = query(collectioRef, where("email", "==", user?.email))
        const getFireStoreUser = await getUsersDataFromQuery(q)
        user &&
          getFireStoreUser === null &&
          (await addDoc(collectioRef, {
            method: "google",
            email: user?.email,
            photoUrl: user.photoURL,
            displayName: user.displayName,
          }))
        router.push("/admin")
      })
      .catch((error) => {
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
        setLoader(false)
      })
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      <Box
        className={lid + "FormWrapper"}
        id={lid + "FormWrapper"}
        data-testid={lid + "FormWrapper"}
        sx={styles.loginPageFormWrapper}
      >
        {errorSuccessState.status !== null && (
          <AuthAlert
            state={errorSuccessState}
            activityStatus={activityStatus}
          />
        )}
        {!toggleLoginActivity && (
          <TextField
            label="Email Id"
            type="email"
            autoComplete="current-password"
            variant="standard"
            className={lid + "TextField"}
            id={lid + "PasswordField"}
            data-testid={lid + "PasswordField"}
            required
            sx={{
              minWidth: {
                sm: "50%",
                md: "40%",
                lg: "35%",
              },
              ...styles.loginPageTextField,
            }}
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value })
            }}
          />
        )}
        <TextField
          label="Username"
          variant="standard"
          className={lid + "TextField"}
          id={lid + "UsernameField"}
          data-testid={lid + "UsernameField"}
          sx={styles.loginPageTextField}
          value={formData.username}
          required
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value })
          }}
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          className={lid + "TextField"}
          id={lid + "PasswordField"}
          data-testid={lid + "PasswordField"}
          required
          sx={styles.loginPageTextField}
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value })
          }}
        />
        {toggleLoginActivity ? (
          <LoadingButton
            disableRipple
            sx={styles.loginPageButton}
            data-testid={lid + "LoginButton"}
            onClick={loginHandler}
            loading={loader}
            disabled={disabledButton}
          >
            Login
          </LoadingButton>
        ) : (
          <LoadingButton
            disableRipple
            sx={styles.loginPageButton}
            data-testid={lid + "SignupButton"}
            onClick={signUpHandler}
            loading={loader}
            disabled={disabledButton}
          >
            Sign Up
          </LoadingButton>
        )}
      </Box>
      <Box sx={styles.loginPageExtraOptions}>
        {toggleLoginActivity ? (
          <Button
            disableRipple
            sx={styles.loginPageExtraOptionsButton}
            onClick={handleSignupToggle}
            data-testid={lid + "ToggleSignup"}
          >
            create an account
          </Button>
        ) : (
          <Button
            disableRipple
            sx={styles.loginPageExtraOptionsButton}
            onClick={handleLoginToggle}
            data-testid={lid + "ToggleLogin"}
          >
            log into an account
          </Button>
        )}
        <Button
          disableRipple
          sx={styles.loginPageExtraOptionsButton}
          onClick={recoverRouteHandler}
        >
          recover account
        </Button>
        <Button
          disableRipple
          sx={styles.loginPageExtraOptionsButton}
          onClick={signInWithGoogleHandler}
        >
          log in with google
        </Button>
      </Box>
    </ErrorBoundary>
  )
}
export default LoginPage
