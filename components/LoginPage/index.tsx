import { Box, Button, TextField } from "@mui/material"
import { styles } from "./styles"

const LoginPage = () => {
  const lid = "loginPage"

  return (
    <>
      <Box
        className={lid + "FormWrapper"}
        id={lid + "FormWrapper"}
        data-testid={lid + "FormWrapper"}
        sx={styles.loginPageFormWrapper}
      >
        <TextField
          label="Email Id"
          type="email"
          autoComplete="current-password"
          variant="standard"
          className={lid + "TextField"}
          id={lid + "PasswordField"}
          data-testid={lid + "PasswordField"}
          sx={{
            minWidth: {
              sm: "50%",
              md: "40%",
              lg: "35%",
            },
            ...styles.loginPageTextField,
          }}
        />
        <TextField
          label="Username"
          variant="standard"
          className={lid + "TextField"}
          id={lid + "UsernameField"}
          data-testid={lid + "UsernameField"}
          sx={styles.loginPageTextField}
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          className={lid + "TextField"}
          id={lid + "PasswordField"}
          data-testid={lid + "PasswordField"}
          sx={styles.loginPageTextField}
        />
        <Button disableRipple sx={styles.loginPageButton}>
          Login
        </Button>
        <Button disableRipple sx={styles.loginPageButton}>
          Sign Up
        </Button>
      </Box>
      <Box sx={styles.loginPageExtraOptions}>
        <Button disableRipple sx={styles.loginPageExtraOptionsButton}>
          create an account
        </Button>
        <Button disableRipple sx={styles.loginPageExtraOptionsButton}>
          log into an account
        </Button>
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
