import { Box, IconButton, Stack } from "@mui/material"
import { Antonio, Roboto_Condensed } from "@next/font/google"
import { useCallback, useEffect, useId, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useSelector } from "react-redux"
import AboutPageContent from ".."
import { RootType } from "../../../redux/constants/stateTypes"
import ErrorFallback, { myErrorHandler } from "../../common/ErrorFallback"
import PrimaryButtonGroup from "../../common/PrimaryButtonGroup"
import { styles } from "../styles/projectInsights"
import { styles as commonStyles } from "../styles/index"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"

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

  let insightsSection: Element | null
  let scrollLength: number | undefined

  const [scrollPosition, setScrollPosition] = useState<"top" | "bottom">("top")
  const [sectionTop, setSectionTop] = useState<number | undefined>()
  const [selectedArena, setSelectedArena] = useState<string>("management")

  const insightsSectionContent = useSelector(
    (state: RootType) => state.contentSlice.currentAboutContent
  ).content

  const selectedRoleContent =
    insightsSectionContent?.arenas &&
    insightsSectionContent.arenas[selectedArena].content

  if (typeof window !== "undefined") {
    insightsSection = document.querySelector(".css-1wvgw2s-MuiStack-root")
    scrollLength = insightsSection && scrollPosition === "top" ? 1000 : -1000
  }

  const handleScroll = () => {
    setSectionTop(
      document.querySelector("#insightsSectionTitle")?.getBoundingClientRect()
        .top
    )
  }

  useEffect(() => {
    insightsSection?.addEventListener("scroll", handleScroll)
    return () => insightsSection?.removeEventListener("scroll", handleScroll)
  })

  const handleScrollButton = useCallback(() => {
    if (scrollPosition === "top") {
      setScrollPosition("bottom")
    } else {
      setScrollPosition("top")
    }
    insightsSection?.scrollTo({
      top: scrollLength,
      left: 0,
      behavior: "smooth",
    })
  }, [scrollPosition])

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
        <IconButton
          sx={{
            position: "fixed",
            bottom: "50px",
            border: "2px solid #888",
            "& > svg": {
              backgroundColor: "#333",
              color: "#d9d9d9",
              borderRadius: "100px",
              padding: "8px",
              margin: "-4px",
            },
          }}
          disableRipple
          onClick={handleScrollButton}
        >
          {scrollPosition === "top" && sectionTop && sectionTop > -200 ? (
            <ArrowDownwardIcon />
          ) : (
            <ArrowUpwardIcon />
          )}
        </IconButton>
      </ErrorBoundary>
    </AboutPageContent>
  )
}

export default ProjectInsights
