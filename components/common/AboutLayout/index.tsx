import { Box } from "@mui/material"
import { ErrorBoundary } from "react-error-boundary"
import { ChildrenType } from "../../../utils/interfaces"
import AboutPageNav from "../../AboutPageNav"
import ErrorFallback, { myErrorHandler } from "../ErrorFallback"

const AboutLayout = ({ children }: ChildrenType) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          maxHeight: "-webkit-fill-available",
          overflow: {
            lg: "hidden",
          },
          flexDirection: {
            xs: "column",
            lg: "row",
          },
        }}
      >
        <AboutPageNav />
        {children}
      </Box>
    </ErrorBoundary>
  )
}

export default AboutLayout
