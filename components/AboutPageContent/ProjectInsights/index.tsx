import { Box, IconButton, Skeleton, Stack } from "@mui/material"
import { Antonio, Roboto_Condensed } from "next/font/google"
import { useCallback, useEffect, useId, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useSelector } from "react-redux"
import AboutPageContent from ".."
import { RootType } from "../../../redux/constants/stateTypes"
import ErrorFallback, { myErrorHandler } from "../../common/ErrorFallback"
import PrimaryButtonGroup from "../../common/PrimaryButtonGroup"
import { styles } from "../styles/projectInsights"
import { styles as commonStyles } from "../styles/index"
import { styles as teamStyles } from "../styles/coloremTeam"
import MouseIcon from "@mui/icons-material/Mouse"
import Image from "next/image"
import Link from "next/link"

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
  const [sectionTop, setSectionTop] = useState<number | undefined>() // eslint-disable-line
  const [selectedArena, setSelectedArena] = useState<string>("management")

  const insightsSectionContent = useSelector(
    (state: RootType) => state.contentSlice.currentAboutContent
  ).content

  const projectsSectionImages = useSelector(
    (state: RootType) => state.contentSlice.currentAboutContent
  ).images

  const selectedRoleContent =
    insightsSectionContent?.arenas &&
    insightsSectionContent.arenas[selectedArena].content

  const selectedRoleImages =
    projectsSectionImages && projectsSectionImages[`${selectedArena}Images`]

  useEffect(() => {
    insightsSection = document.querySelector(".css-1wvgw2s-MuiStack-root")
    scrollLength = insightsSection && scrollPosition === "top" ? 1000 : -1000
  }, [scrollPosition])

  // scroll logic
  const handleScroll = () => {
    setSectionTop(
      document.querySelector("#insightsSectionTitle")?.getBoundingClientRect()
        .top
    )
  }
  useEffect(() => {
    insightsSection?.addEventListener("scroll", handleScroll)
    return () => insightsSection?.removeEventListener("scroll", handleScroll)
  }, [])

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
                const imageUrl =
                  "https:" + selectedRoleImages[index].fields.file.url
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
                    {/* Image mapped according to the data & image array */}
                    <Box
                      className={iid + "ImageWrapper"}
                      id={iid + "ImageWrapper"}
                      sx={styles.insightsSectionImageWrapper}
                    >
                      {!selectedRoleImages[index] ? (
                        <Skeleton
                          sx={teamStyles.skeletonCss}
                          animation="pulse"
                        />
                      ) : (
                        <Link href={imageUrl} target="_blank">
                          <Image
                            src={imageUrl}
                            fill
                            alt={""}
                            style={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              borderRadius: "16px",
                            }}
                          />
                        </Link>
                      )}
                    </Box>
                  </div>
                )
              })}
          </Box>
        </Stack>
        {/* TODO remove 'display: none' from styles of this icon before working on it */}
        <IconButton
          sx={styles.insightsSectionScrollButton}
          disableRipple
          onClick={handleScrollButton}
        >
          <MouseIcon />
        </IconButton>
      </ErrorBoundary>
    </AboutPageContent>
  )
}

export default ProjectInsights
