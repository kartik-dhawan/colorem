import { Box, Typography } from "@mui/material"
import { styles } from "./styles"

interface PrimaryAlertType {
  alertTitle: string
}

const PrimaryAlertBox = ({ alertTitle }: PrimaryAlertType) => {
  const paid = "primaryAlert"

  return (
    <Box
      className={paid + "Wrapper"}
      id={paid + "Wrapper"}
      sx={styles.primaryAlertWrapper}
    >
      <Typography
        className={paid + "Title"}
        id={paid + "Title"}
        sx={styles.primaryAlertTitle}
      >
        {alertTitle}
      </Typography>
    </Box>
  )
}

export default PrimaryAlertBox
