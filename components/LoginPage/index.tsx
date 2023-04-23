import { Box, Button, TextField } from "@mui/material"
import { styles } from "./styles"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { LoginFormState } from "../../utils/interfaces"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import db, { app } from "../../lib/auth/firebaseConfig"
import { collection, query, where } from "firebase/firestore"
import { getDataFromQuery } from "../../lib/auth/firestore"

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

  const [toggleLoginActivity, setToggleLoginActivity] = useState<boolean>(true) // true - login & false - sign up
  const [formData, setFormData] = useState<LoginFormState>(initialFormState)

  // enables url traversing to sign up or login page specificaly
  useEffect(() => {
    const activityStatus = router.query?.activity
    if (activityStatus === "login") {
      setToggleLoginActivity(true)
    } else if (activityStatus === "signup") {
      setToggleLoginActivity(false)
    }
  }, [router.query])

  const loginHandler = async () => {
    // querying the firestore db to get email for the entered usernmame
    const q = query(collectioRef, where("username", "==", formData.username))
    const data = await getDataFromQuery(q)

    // using that email & password entered by user to login
    return (
      data.email !== "" &&
      signInWithEmailAndPassword(auth, data.email, formData.password).then(
        async (user) => {
          // algo : HS256
          const token = await user.user.getIdToken()
          localStorage.setItem("firebase-token", JSON.stringify(token))
          document.cookie = `firebase-token=${token}`
          // clears form data after login
          setFormData(initialFormState)
        }
      )
    )
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
    <>
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
          <Button
            disableRipple
            sx={styles.loginPageButton}
            data-testid={lid + "LoginButton"}
            onClick={loginHandler}
          >
            Login
          </Button>
        ) : (
          <Button
            disableRipple
            sx={styles.loginPageButton}
            data-testid={lid + "SignupButton"}
          >
            Sign Up
          </Button>
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
    </>
  )
}
export default LoginPage
