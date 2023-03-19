import { Box, Stack } from "@mui/material"
import { Antonio, Roboto_Condensed } from "@next/font/google"
import { useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useSelector } from "react-redux"
import AboutPageContent from ".."
import { RootType } from "../../../redux/constants/stateTypes"
import ErrorFallback, { myErrorHandler } from "../../common/ErrorFallback"
import PrimaryButtonGroup from "../../common/PrimaryButtonGroup"
import { styles as commonStyles } from "../styles/index"

// loading fonts before component loads
const antonio = Antonio({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})
const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  display: "swap",
})

const ProjectInsights = () => {
  const iid = "insightsSection"

  const [selectedArena, setSelectedArena] = useState<string>("management")

  const insightsSectionContent = useSelector(
    (state: RootType) => state.contentSlice.currentAboutContent
  ).content

  console.log(insightsSectionContent)

  return (
    <AboutPageContent>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
        <Stack
          sx={{
            overflowY: { lg: "scroll" },
            maxHeight: { lg: "100vh" },
          }}
        >
          <Box
            className={iid + "Title " + antonio.className}
            id={iid + "Title"}
            sx={commonStyles.aboutSubSectionTitle}
          >
            {insightsSectionContent?.title}
          </Box>
          <Box
            className={iid + "Body " + roboto.className}
            id={iid + "Body"}
            sx={commonStyles.aboutSubSectionBody}
          >
            {insightsSectionContent?.body}
          </Box>
          {/* common button group component */}
          <PrimaryButtonGroup
            buttonArray={insightsSectionContent?.arenasList}
            setSelectedButton={setSelectedArena}
            selectedButton={selectedArena}
          />
        </Stack>
      </ErrorBoundary>
    </AboutPageContent>
  )
}

export default ProjectInsights
