import { Box, Typography } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { styles } from "../styles/styles"

interface LikeType {
  likes: number
}

const LikeCard = ({ likes }: LikeType) => {
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
        {likes} new likes on palettes.
      </Typography>
    </Box>
  )
}

export default LikeCard
