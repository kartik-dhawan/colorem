import { Box, Typography } from "@mui/material"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import CommentIcon from "@mui/icons-material/Comment"
import { styles } from "../styles/styles"

interface TextCardType {
  cardVariant: string
}

const TextCard = ({ cardVariant }: TextCardType) => {
  return (
    <Box
      className={"feedbackCard"}
      id={"feedbackCard"}
      sx={styles.feedbackcard}
    >
      {cardVariant === "feedback" && (
        <PersonOutlineIcon className={"feedbackIcon"} id={"feedbackIcon"} />
      )}
      {cardVariant === "comment" && (
        <CommentIcon className={"feedbackIcon"} id={"feedbackIcon"} />
      )}
      <Typography
        variant="body1"
        sx={{
          margin: "0px 0px 0 20px",
          fontSize: "17px",
        }}
        className={"feedbackCardBody"}
      >
        Mr. Shay sent a{" "}
        <b>
          <i>{cardVariant}</i>
        </b>
        , &apos;Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Maiores eaque dolor ad! 🇦🇷 💟&apos;
      </Typography>
    </Box>
  )
}

export default TextCard
