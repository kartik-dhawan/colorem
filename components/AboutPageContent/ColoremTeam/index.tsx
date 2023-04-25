import { Box, Divider, Skeleton } from "@mui/material"
import { Antonio, Roboto_Condensed } from "next/font/google"
import { useEffect, useId, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useSelector } from "react-redux"
import AboutPageContent from ".."
import { RootType } from "../../../redux/constants/stateTypes"
import { RoleButtonData } from "../../../utils/interfaces"
import ErrorFallback, { myErrorHandler } from "../../common/ErrorFallback"
import { styles } from "../styles/coloremTeam"
import { styles as commonStyles } from "../styles"
import PrimaryButtonGroup from "../../common/PrimaryButtonGroup"
import Image from "next/image"

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

const initialRoleButtonState = [
  {
    role: "",
    label: "",
  },
]

const ColoremTeam = () => {
  const tid = "teamSection"
  const id = useId()

  /*
   * gets the content for current about subpage from redux store
   */
  const teamSectionContent = useSelector(
    (state: RootType) => state.contentSlice.currentAboutContent
  ).content

  /*
   * gets the images for current about subpage from redux store
   */
  const teamSectionImages = useSelector(
    (state: RootType) => state.contentSlice.currentAboutContent
  ).images?.general

  const [teamRoles, setTeamRoles] = useState<RoleButtonData[]>(
    initialRoleButtonState
  )

  const [selectedRole, setSelectedRole] = useState<string>("frontEndDeveloper")

  /**
   * filters & stores role-button label data
   */
  useEffect(() => {
    const buttonArray: RoleButtonData[] = []
    teamSectionContent /* eslint-disable-line */ &&
      teamSectionContent?.roles &&
      Object.keys(teamSectionContent?.roles).forEach((key: string) => {
        return (
          teamSectionContent &&
          buttonArray.push({
            role: key,
            label: teamSectionContent.roles[key].label,
          })
        )
      })
    setTeamRoles(buttonArray)
  }, [teamSectionContent])

  return (
    <AboutPageContent>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
        <Box
          className={tid + "Title " + antonio.className}
          id={tid + "Title"}
          sx={commonStyles.aboutSubSectionTitle}
        >
          {teamSectionContent?.title}
        </Box>
        <Box sx={styles.teamSectionButtonGroupWrapper}>
          <Box
            sx={styles.teamSectionPersonName}
            className={tid + "PersonName " + roboto.className}
          >
            {selectedRole !== "frontEndDeveloper" && "Also"} Kartik Dhawan
          </Box>
          <Divider sx={styles.teamSectionNameDivider} />
          {/* common button group component */}
          <PrimaryButtonGroup
            buttonArray={teamRoles}
            setSelectedButton={setSelectedRole}
            selectedButton={selectedRole}
          />
        </Box>
        <Box
          className={tid + "RoleFunFact " + roboto.className}
          id={tid + "RoleFunFact"}
          sx={styles.teamSectionRoleFunFact}
        >
          *
          {teamSectionContent?.roles &&
            teamSectionContent?.roles[selectedRole]?.funFact}
        </Box>
        <Box
          sx={{
            margin: "2rem 0rem",
          }}
        >
          {teamSectionContent?.roles &&
            teamSectionContent?.roles[selectedRole]?.body.map(
              (bodyText: string, i: number) => {
                return (
                  <Box
                    key={i}
                    className={tid + "BodyText " + roboto.className}
                    id={id + tid + "BodyText"}
                    sx={styles.teamSectionBodyText}
                  >
                    {bodyText}
                  </Box>
                )
              }
            )}

          {/* Image for each role */}
          <Box
            className={tid + "ImageWrapper"}
            id={tid + "ImageWrapper"}
            sx={styles.teamSectionImageWrapper}
          >
            {!teamSectionImages ? (
              <Skeleton sx={styles.skeletonCss} animation="pulse" />
            ) : (
              teamSectionImages.map((image: any) /* eslint-disable-line */ => {
                if (image.fields.title === selectedRole) {
                  return (
                    <Image
                      className={tid + "Image"}
                      id={id + tid + "Image"}
                      key={id}
                      src={"https:" + image.fields.file.url}
                      fill
                      alt={""}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )
                }
              })
            )}
          </Box>
        </Box>
      </ErrorBoundary>
    </AboutPageContent>
  )
}

export default ColoremTeam
