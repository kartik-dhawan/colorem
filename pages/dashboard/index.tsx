import { Box } from "@mui/material"
import SubNav from "../../components/common/Navbar/SubNav"
import FileSection from "../../components/FileSection"
import FeedbackAndTeam from "../../components/FeedbackAndTeam"

const Dashboard = () => {
  return (
    <Box>
      <SubNav />
      <FileSection />
      <FeedbackAndTeam />
    </Box>
  )
}

export default Dashboard
