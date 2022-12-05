import { Grid } from "@mui/material"
import Feedback from "./Feedback"
import TeamDetails from "./TeamDetails"

const FeedbackAndTeam = () => {
  return (
    <Grid container spacing={5} mt={1}>
      <Feedback />
      <TeamDetails />
    </Grid>
  )
}

export default FeedbackAndTeam
