import { Box } from "@mui/material"
import SubNav from "../../components/common/Navbar/SubNav"
import FileSection from "../../components/FileSection"
import Essentials from "../../components/Essentials"
import FeedbackAndTeam from "../../components/FeedbackAndTeam"

const Dashboard = () => {
  return (
    <Box>
      <SubNav />
      <FileSection />
      <FeedbackAndTeam />
      <Essentials />
    </Box>
  )
}

export default Dashboard
