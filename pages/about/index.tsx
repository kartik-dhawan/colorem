import { Box } from "@mui/material"
import AboutPageNav from "../../components/AboutPageNav"

/**
 *
 * figure out a way to keep the side nav in all pages &
 * make the route change for every selected listitem
 */

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
      <Box
        sx={{
          flex: {
            md: 0,
            lg: 1,
          },
        }}
      />
    </Box>
  )
}

export default AboutPage
