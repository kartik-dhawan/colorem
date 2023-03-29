import { Box, Container } from "@mui/material"
import { Antonio, Roboto_Condensed } from "next/font/google"
import { useSelector } from "react-redux"
import AboutPageContent from ".."
import { RootType } from "../../../redux/constants/stateTypes"
import { styles as commonStyles } from "../styles/index"
import GitHubIcon from "@mui/icons-material/GitHub"
import InstagramIcon from "@mui/icons-material/Instagram"
import EmailIcon from "@mui/icons-material/Email"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import Link from "next/link"
import { styles } from "../styles/moreSection"
import { useId } from "react"

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

interface ContactItem {
  linkId: string
  label: string
  url: string
  icon: string
}

const MoreSection = () => {
  const mid = "moreSection"
  const id = useId()

  const moreSectionContent = useSelector(
    (state: RootType) => state.contentSlice.currentAboutContent
  ).content

  return (
    <AboutPageContent>
      <Box
        className={mid + "Title " + antonio.className}
        id={mid + "Title"}
        sx={commonStyles.aboutSubSectionTitle}
      >
        {moreSectionContent?.title}
      </Box>
      <Box
        className={mid + "Body " + roboto.className}
        id={mid + "Body"}
        sx={commonStyles.aboutSubSectionBody}
      >
        {moreSectionContent?.body}
      </Box>
      {/* add the image below */}
      <Box
        sx={{
          height: "400px",
          backgroundColor: "#999999",
          margin: "24px 0px",
        }}
      />
      <Container
        sx={styles.moreSectionIconContainer}
        className={mid + "IconContainer "}
        id={mid + "IconContainer"}
      >
        {moreSectionContent?.contactLinks?.map((item: ContactItem) => {
          return (
            <Link
              href={item.url}
              className={mid + "IconLink"}
              id={mid + id + "IconLink"}
              key={item.linkId}
            >
              <Box
                sx={{
                  ...styles.moreSectionIcon,
                  "&::after": {
                    content: `"${item.label}"`,
                    ...styles.moreSectionIconAfter,
                  },
                }}
              >
                {item.icon === "GitHubIcon" && <GitHubIcon />}
                {item.icon === "InstagramIcon" && <InstagramIcon />}
                {item.icon === "LinkedInIcon" && <LinkedInIcon />}
                {item.icon === "EmailIcon" && <EmailIcon />}
              </Box>
            </Link>
          )
        })}
      </Container>
    </AboutPageContent>
  )
}

export default MoreSection
