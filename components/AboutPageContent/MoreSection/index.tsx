import { Box, Container, Skeleton, Typography } from "@mui/material"
import { Antonio, Roboto_Condensed } from "next/font/google"
import { useSelector } from "react-redux"
import AboutPageContent from ".."
import { RootType } from "../../../redux/constants/stateTypes"
import { styles as commonStyles } from "../styles/index"
import { styles as teamStyles } from "../styles/coloremTeam"
import Link from "next/link"
import { styles } from "../styles/moreSection"
import { useId } from "react"
import Image from "next/image"
import GitHubIcon from "@mui/icons-material/GitHub"
import InstagramIcon from "@mui/icons-material/Instagram"
import EmailIcon from "@mui/icons-material/Email"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import LaunchIcon from "@mui/icons-material/Launch"

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

  const { data } = useSelector((state: RootType) => state.contentSlice)

  const moreSectionContent = useSelector(
    (state: RootType) => state.contentSlice.currentAboutContent
  ).content

  const moreSectionImages1 = useSelector(
    (state: RootType) => state.contentSlice.currentAboutContent
  ).images

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
        className={mid + "ProfileCard"}
        id={mid + "ProfileCard"}
        sx={styles.moreSectionProfileCard}
      >
        {!moreSectionImages1?.general[0].fields.file.url ? (
          <Skeleton sx={teamStyles.skeletonCss} animation="pulse" />
        ) : (
          <>
            <Box sx={styles.moreSectionGradientEffect} />
            <Box
              className={mid + "ProfileCardContent"}
              id={mid + "ProfileCardContent"}
              sx={styles.moreSectionProfileCardContent}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" className={roboto.className} sx={{}}>
                  Kartik Dhawan
                </Typography>
                {data.portfolioUrl && (
                  <Link href={data.portfolioUrl} target="_blank">
                    <LaunchIcon />
                  </Link>
                )}
              </Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 300, letterSpacing: "0.5px" }}
              >
                I personally love looking at the moon. How about you?
              </Typography>
            </Box>
            <Image
              src={"https://" + moreSectionImages1?.general[0].fields.file.url}
              fill
              alt={""}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
          </>
        )}
      </Box>
      <Container
        sx={styles.moreSectionIconContainer}
        className={mid + "IconContainer "}
        id={mid + "IconContainer"}
      >
        {moreSectionContent?.contactLinks?.map((item: ContactItem) => {
          return (
            <Link
              href={item.label === "Email" ? `mailto:${item.url}` : item.url}
              className={mid + "IconLink"}
              id={mid + id + "IconLink"}
              key={item.linkId}
              target="_blank"
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
