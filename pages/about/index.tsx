import { Box } from "@mui/material"
import AboutPageNav from "../../components/AboutPageNav"

const AboutPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <AboutPageNav />
      {/* the content component will come here */}
      {/* add {flex: 1} css property inside the wrapper of content section once you remove this box */}
      <Box sx={{ flex: 1 }} />
    </Box>
  )
}

export default AboutPage
