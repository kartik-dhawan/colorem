import { Box } from "@mui/material"
import { Antonio, Roboto_Condensed } from "@next/font/google"
import { ErrorBoundary } from "react-error-boundary"
import { useSelector } from "react-redux"
import AboutPageContent from ".."
import { RootType } from "../../../redux/constants/stateTypes"
import { SkillType } from "../../../utils/interfaces"
import { sortArrayByField } from "../../../utils/methods"
import ErrorFallback, { myErrorHandler } from "../../common/ErrorFallback"
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

  const developerSectionContent = useSelector(
    (state: RootType) => state.contentSlice.currentAboutContent
  ).content

  const orderedSkillsArray = sortArrayByField(
    developerSectionContent?.skills,
    "order"
  )

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
          className={did + "body " + roboto.className}
          id={did + "body"}
          sx={{
            margin: "16px 0px",
            fontSize: {
              xs: "19px",
              lg: "18px",
              xl: "20px",
            },
            lineHeight: {
              xs: "28px",
              lg: "27px",
              xl: "30px",
            },
            textAlign: "right",
            fontStyle: "italic",
            fontWeight: 300,
          }}
        >
          {developerSectionContent?.body}
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "16px",
          }}
        >
          {orderedSkillsArray ? (
            orderedSkillsArray.map((item: SkillType, i: number) => {
              return <SkillCard key={i} skillDetails={item} />
            })
          ) : (
            <div>
              No skill cards to show. The owner has not added any skillset in
              contentful.
            </div>
          )}
        </Box>
      </ErrorBoundary>
    </AboutPageContent>
  )
}

export default BehindTheDesk
