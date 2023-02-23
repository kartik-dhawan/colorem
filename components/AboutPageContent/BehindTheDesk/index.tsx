import { Box, Button, Divider } from "@mui/material"
import { Antonio, Roboto_Condensed } from "@next/font/google"
import { useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useSelector } from "react-redux"
import AboutPageContent from ".."
import { RootType } from "../../../redux/constants/stateTypes"
import { SkillType } from "../../../utils/interfaces"
import { sortArrayByField } from "../../../utils/methods"
import ErrorFallback, { myErrorHandler } from "../../common/ErrorFallback"
import { styles } from "../styles/behindTheDesk"
import { styles as commonStyles } from "../styles/index"
import SkillCard from "./SkillCard"

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

const BehindTheDesk = () => {
  const did = "developerSection"

  const [cardsLimit, setCardsLimit] = useState<number>(3)
  const [isMaxCardLimit, setIsMaxCardLimit] = useState<boolean>(false)

  const developerSectionContent = useSelector(
    (state: RootType) => state.contentSlice.currentAboutContent
  ).content

  /**
   * sorts the array according to order coming from contentful
   * & then slices it to three for initial render
   */
  const initialOrderedSkillsArray = sortArrayByField(
    developerSectionContent?.skills,
    "order"
  )?.slice(0, cardsLimit)

  return (
    <AboutPageContent>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
        <Box
          className={did + "Title " + antonio.className}
          id={did + "Title"}
          sx={commonStyles.aboutSubSectionTitle}
        >
          {developerSectionContent?.title}
        </Box>
        <Box
          className={did + "Body " + roboto.className}
          id={did + "Body"}
          sx={styles.developerSectionBody}
        >
          {developerSectionContent?.body}
        </Box>
        <Box
          className={did + "Skillset " + roboto.className}
          id={did + "Skillset"}
          sx={styles.developerSectionSkillset}
        >
          Skillset
        </Box>
        <Box
          className={did + "CardsWrapper"}
          id={did + "CardsWrapper"}
          sx={styles.developerSectionCardsWrapper}
        >
          {initialOrderedSkillsArray ? (
            initialOrderedSkillsArray.map((item: SkillType, i: number) => {
              return <SkillCard key={i} skillDetails={item} />
            })
          ) : (
            <div>
              No skill cards to show. The owner has not added any skillset in
              contentful.
            </div>
          )}
        </Box>
        <Divider sx={{ marginTop: "16px", height: "2px" }} />
        {/* toggled 'See more' / 'See less' button */}
        {!isMaxCardLimit ? (
          <Button
            onClick={() => {
              setCardsLimit(developerSectionContent?.skills.length)
              setIsMaxCardLimit(true)
            }}
            sx={styles.skillCardSeeMoreLessButton}
          >
            <div className={roboto.className}>See more</div>
          </Button>
        ) : (
          <Button
            disableRipple
            onClick={() => {
              setCardsLimit(3)
              setIsMaxCardLimit(false)
            }}
            sx={styles.skillCardSeeMoreLessButton}
          >
            <div className={roboto.className}>See less</div>
          </Button>
        )}
      </ErrorBoundary>
    </AboutPageContent>
  )
}

export default BehindTheDesk
