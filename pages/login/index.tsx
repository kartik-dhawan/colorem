import { Box } from "@mui/material"
import LoginPage from "../../components/LoginPage"
import { styles } from "../../components/LoginPage/styles"

const Login = () => {
  const lid = "loginPage"
  return (
    <Box
      className={lid + "Wrapper"}
      id={lid + "Wrapper"}
      data-testid={lid + "Wrapper"}
      sx={styles.loginPageWrapper}
    >
      <LoginPage />
    </Box>
  )
}

export default Login
