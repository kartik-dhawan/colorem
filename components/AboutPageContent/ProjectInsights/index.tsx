import { Box, Stack } from "@mui/material"
import { Antonio, Roboto_Condensed } from "@next/font/google"
import { useId, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useSelector } from "react-redux"
import AboutPageContent from ".."
import { RootType } from "../../../redux/constants/stateTypes"
import ErrorFallback, { myErrorHandler } from "../../common/ErrorFallback"
import PrimaryButtonGroup from "../../common/PrimaryButtonGroup"
import { styles } from "../styles/projectInsights"
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
  const id = useId()
  const iid = "insightsSection"

  const [selectedArena, setSelectedArena] = useState<string>("management")

  const insightsSectionContent = useSelector(
    (state: RootType) => state.contentSlice.currentAboutContent
  ).content

  const selectedRoleContent =
    insightsSectionContent?.arenas &&
    insightsSectionContent.arenas[selectedArena].content

  console.log(selectedRoleContent)

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
          {/* content according to the roles */}
          <Box
            className={iid + "ContentWrapper"}
            id={iid + "ContentWrapper"}
            sx={{ textAlign: "right" }}
          >
            {selectedRoleContent &&
              selectedRoleContent?.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    <Stack
                      className={iid + "ContentItemWrapper " + roboto.className}
                      id={id + iid + "ContentItemWrapper"}
                      sx={{
                        margin: "8px 0px",
                      }}
                    >
                      <Box
                        className={iid + "ContentItemTitle"}
                        sx={styles.insightsSectionContentItemTitle}
                      >
                        {item.title}
                      </Box>
                      <Box
                        className={iid + "ContentItemText"}
                        sx={styles.insightsSectionContentItemText}
                      >
                        {item.body.map((text: string, i: number) => {
                          return <div key={i}>{text}</div>
                        })}
                      </Box>
                    </Stack>
                    {/* temporary skeleton for an image */}
                    <Box
                      sx={{
                        height: "250px",
                        backgroundColor: "#999999",
                        margin: "0px 0px 24px 0px",
                      }}
                    ></Box>
                  </div>
                )
              })}
          </Box>
        </Stack>
      </ErrorBoundary>
    </AboutPageContent>
  )
}

export default ProjectInsights
