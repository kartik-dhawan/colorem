import { Box } from "@mui/material"
import SubNav from "../../components/common/Navbar/SubNav"
import FileSection from "../../components/FileSection"
import ReviewAndTeam from "../../components/ReviewAndTeam"

const Dashboard = () => {
  return (
    <Box>
      <SubNav />
      <FileSection />
      <ReviewAndTeam />
    </Box>
  )
}

export default Dashboard
