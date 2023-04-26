import { Box, Button, TextField } from "@mui/material"
import { styles } from "./styles"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { LoginFormState } from "../../utils/interfaces"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import db, { app } from "../../lib/auth/firebaseConfig"
import { collection, query, where } from "firebase/firestore"
import { getUsersDataFromQuery } from "../../lib/auth/firestore"
import LoadingButton from "@mui/lab/LoadingButton"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback, { myErrorHandler } from "../common/ErrorFallback"

const LoginPage = () => {
  const lid = "loginPage"
  const router = useRouter()
  const auth = getAuth(app)
  const collectioRef = collection(db, "users")

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
  const [disabledButton, setDisabledButton] = useState<boolean>(false)

  // logs user in on enter
  useEffect(() => {
    const keyDownHandler = (event: any) /** esint-disable-line */ => {
      if (event.key === "Enter") {
        event.preventDefault()
        return !disabledButton && loginHandler()
      }
    }

    document.addEventListener("keydown", keyDownHandler)

    return () => {
      document.removeEventListener("keydown", keyDownHandler)
    }
  }, [disabledButton])

  // enables url traversing to sign up or login page specificaly
  useEffect(() => {
    if (activityStatus === "login") {
      setToggleLoginActivity(true)
    } else if (activityStatus === "signup") {
      setToggleLoginActivity(false)
    }
  }, [router.query])

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email)
  }

  /*
   * textfield input check to disable or enable buttons
   * also adds a check for password to be at least of 6 characters
   * & username to be of at least 4 characters
   */
  useEffect(() => {
    if (
      (activityStatus === "login" && formData.username.length < 4) ||
      formData.password.length <= 5
    ) {
      setDisabledButton(true)
    } else if (
      (activityStatus === "signup" && !isValidEmail(formData.email)) ||
      formData.password.length <= 5 ||
      formData.username.length < 4
    ) {
      setDisabledButton(true)
    } else {
      setDisabledButton(false)
    }
  }, [formData])

  const loginHandler = async () => {
    // initializes loader
    setLoader(true)

    // querying the firestore db to get email for the entered usernmame
    const q = query(collectioRef, where("username", "==", formData.username))
    const data = await getUsersDataFromQuery(q)

    // using that email & password entered by user to login
    return (
      data.email !== "" &&
      signInWithEmailAndPassword(auth, data.email, formData.password)
        .then(async (user) => {
          // algo : HS256
          const token = await user.user.getIdToken()
          localStorage.setItem("firebase-token", JSON.stringify(token))
          document.cookie = `firebase-token=${token}`
          // clears form data after login
          setFormData(initialFormState)
          router.push("/dashboard")
        })
        .catch((error) => {
          console.log(error)
          setLoader(false)
        })
    )
  }

  const signUpHandler = () => {
    setLoader(true)
    router.push("/dashboard")
  }

  // toogles from signup page to login page
  const handleLoginToggle = useCallback(() => {
    setToggleLoginActivity(true)
    router.push({
      pathname: "/login",
      query: { ...router.query, activity: "login" },
    })
    setFormData(initialFormState)
  }, [router])

  // toogles from login page to signup page
  const handleSignupToggle = useCallback(() => {
    setToggleLoginActivity(false)
    router.push({
      pathname: "/login",
      query: { ...router.query, activity: "signup" },
    })
    setFormData(initialFormState)
  }, [router])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      <Box
        className={lid + "FormWrapper"}
        id={lid + "FormWrapper"}
        data-testid={lid + "FormWrapper"}
        sx={styles.loginPageFormWrapper}
      >
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
        <Button disableRipple sx={styles.loginPageExtraOptionsButton}>
          recover account
        </Button>
        <Button disableRipple sx={styles.loginPageExtraOptionsButton}>
          log in with google
        </Button>
      </Box>
    </ErrorBoundary>
  )
}
export default LoginPage
