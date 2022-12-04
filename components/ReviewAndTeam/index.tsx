import { Grid } from "@mui/material"
import Review from "./Review"
import TeamDetails from "./TeamDetails"

const ReviewAndTeam = () => {
  return (
    <Grid container spacing={5} mt={1}>
      <Review />
      <TeamDetails />
    </Grid>
  )
}

export default ReviewAndTeam
