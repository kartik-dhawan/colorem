import { Box } from "@mui/material"
import { ChildrenType } from "../../../utils/interfaces"
import AboutPageNav from "../../AboutPageNav"

const AboutLayout = ({ children }: ChildrenType) => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <AboutPageNav />
      {children}
    </Box>
  )
}

export default AboutLayout
