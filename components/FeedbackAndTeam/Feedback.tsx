import { Box, Grid, Typography } from "@mui/material"
import { styles } from "./styles/styles"
import LikeCard from "./FeedbackCards/LikeCard"
import TextCard from "./FeedbackCards/TextCard"

const Feedback = () => {
  const fid = "feedbackSection"
  return (
    <Grid
      item
      md={5}
      xs={12}
      order={{ md: 1, xs: 2 }}
      className={fid + "Wrapper"}
      id={fid + "Wrapper"}
      sx={{
        borderRight: "1px solid #444",
      }}
    >
      <Typography
        variant="h5"
        className={fid + "Title"}
        id={fid + "Title"}
        sx={styles.feedbackSectionTitle}
      >
        Working on your feedbacks!
      </Typography>
      <Box className="feedbackCardsWrapper" id="feedbackCardsWrapper">
        <LikeCard likes={23} />
        <TextCard cardVariant={"feedback"} />
        <TextCard cardVariant={"comment"} />
      </Box>
    </Grid>
  )
}

export default Feedback
