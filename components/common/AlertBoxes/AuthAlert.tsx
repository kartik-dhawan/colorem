import { Box, Button, Typography } from "@mui/material"
import { LoginErrorSuccess } from "../../../utils/interfaces"
import ErrorIcon from "@mui/icons-material/Error"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useCallback, useState } from "react"
import { styles } from "./styles"
import { getErrorObjectByCode } from "../../../lib/auth/errorMessages"
import { useSelector } from "react-redux"
import { RootType } from "../../../redux/constants/stateTypes"

interface AuthAlertProps {
  state: LoginErrorSuccess
  activityStatus: string | string[]
}

const AuthAlert = ({ state, activityStatus }: AuthAlertProps) => {
  const aid = "authAlert"
  const [detailsToggle, setDetailsToggle] = useState<boolean>(false)

  const detailsToggleHandler = useCallback(() => {
    setDetailsToggle(!detailsToggle)
  }, [detailsToggle])

  const { errorSuccessState } = useSelector(
    (state: RootType) => state.authSlice
  )

  return (
    <Box
      sx={
        activityStatus === "login"
          ? styles.authAlertWrapper
          : styles.authAlertWrapperSignUp
      }
      className={aid + "Wrapper"}
      data-testid={aid + "Wrapper"}
    >
      <Box
        className={aid + "TitleWrapper"}
        data-testid={aid + "TitleWrapper"}
        sx={{
          ...styles.authAlertTitleWrapper,
          "& > svg": {
            color: state.status === "error" ? "#ca8282" : "#7aa965",
          },
        }}
      >
        {state.status === "error" && <ErrorIcon />}
        {state.status === "success" && <CheckCircleIcon />}
        <Typography
          className={aid + "Title"}
          data-testid={aid + "Title"}
          sx={{
            ...styles.authAlertTitle,
            color: state.status === "error" ? "#ca8282" : "#7aa965",
          }}
        >
          {state.error && getErrorObjectByCode(state.error?.code).title}
          {state.status === "success" && errorSuccessState.success?.name}
        </Typography>
        <Button
          className={aid + "DetailsToggle"}
          data-testid={aid + "DetailsToggle"}
          disableRipple
          sx={styles.authAlertDetailsButton}
          onClick={detailsToggleHandler}
        >
          {detailsToggle ? "(show less)" : "(show more)"}
        </Button>
      </Box>
      {detailsToggle && (
        <Typography
          className={aid + "DetailsBody"}
          data-testid={aid + "DetailsBody"}
          sx={styles.authAlertDetailsBody}
        >
          {state.error && getErrorObjectByCode(state.error?.code).message}
          {state.status === "success" && errorSuccessState.success?.message}
        </Typography>
      )}
    </Box>
  )
}

export default AuthAlert
