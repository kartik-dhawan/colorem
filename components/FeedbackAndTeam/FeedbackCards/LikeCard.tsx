import { Box, Typography } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { styles } from "../styles/styles"

interface LikeType {
  likedBy: string
}

const LikeCard = ({ likedBy }: LikeType) => {
  return (
    <Box
      className={"feedbackCard"}
      id={"feedbackCard"}
      sx={styles.feedbackcard}
    >
      <FavoriteIcon className={"feedbackIcon"} id={"feedbackIcon"} />
      <Typography
        variant="body1"
        sx={{
          margin: "0px 0px 0 20px",
          fontSize: "17px",
        }}
      >
        {likedBy} liked a palette.
      </Typography>
    </Box>
  )
}

export default LikeCard
