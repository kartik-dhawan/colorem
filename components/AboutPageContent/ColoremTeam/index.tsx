import { Button, ButtonGroup, Typography } from "@mui/material"
import { Antonio } from "@next/font/google"
import { useEffect, useId, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useSelector } from "react-redux"
import AboutPageContent from ".."
import { RootType } from "../../../redux/constants/stateTypes"
import { RoleButtonData } from "../../../utils/interfaces"
import ErrorFallback, { myErrorHandler } from "../../common/ErrorFallback"
import { styles } from "../styles/coloremTeam"

// loading fonts before component loads
const antonio = Antonio({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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

  const [teamRoles, setTeamRoles] = useState<RoleButtonData[]>(
    initialRoleButtonState
  )

  const [selectedRole, setSelectedRole] = useState<string>("agileLead")

  /**
   * filters & stores role-button label data
   */
  useEffect(() => {
    const buttonArray: RoleButtonData[] = []
    teamSectionContent /* eslint-disable-line */ &&
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
        <Typography
          className={tid + "Title " + antonio.className}
          id={tid + "Title"}
          sx={styles.teamSectionTitle}
        >
          {teamSectionContent?.title}
        </Typography>
        <ButtonGroup
          className={tid + "RoleButtonGroup"}
          id={tid + "RoleButtonGroup"}
          sx={styles.teamSectionRoleButtonGroup}
        >
          {teamRoles?.map((role: RoleButtonData, i: number) => {
            return (
              <Button
                key={i}
                className={tid + "RolesButton " + antonio.className}
                id={id + tid + "RolesButton"}
                onClick={() => {
                  setSelectedRole(role.role)
                }}
                disableRipple
                sx={
                  selectedRole === role.role
                    ? styles.teamSectionSelectedRoleButton
                    : styles.teamSectionUnselectedRoleButton
                }
              >
                {role.label}
              </Button>
            )
          })}
        </ButtonGroup>
      </ErrorBoundary>
    </AboutPageContent>
  )
}

export default ColoremTeam
