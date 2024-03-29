import { Box, Grid, Typography } from "@mui/material"
import { styles } from "./styles/styles"
import LikeCard from "./FeedbackCards/LikeCard"
import TextCard from "./FeedbackCards/TextCard"
import { useSelector } from "react-redux"
import { RootType } from "../../redux/constants/stateTypes"

const Feedback = () => {
  const fid = "feedbackSection"
  const content = useSelector((state: RootType) => state.contentSlice.data)

  return (
    <Grid
      item
      md={5}
      xs={12}
      order={{ md: 1, xs: 2 }}
      className={fid + "Wrapper"}
      id={fid + "Wrapper"}
      data-testid={fid + "Wrapper"}
      sx={{
        borderRight: {
          xs: "none",
          md: "1px solid #444",
        },
        marginTop: {
          xs: "27px",
          md: "0px",
        },
      }}
    >
      <Typography
        variant="h5"
        className={fid + "Title"}
        id={fid + "Title"}
        sx={styles.feedbackSectionTitle}
      >
        {content.feedbackTitle}
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
