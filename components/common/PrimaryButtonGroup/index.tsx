import { Button, ButtonGroup } from "@mui/material"
import { Antonio } from "@next/font/google"
import { useId } from "react"
import { RoleButtonData } from "../../../utils/interfaces"
import { styles } from "./styles"

// loading fonts before component loads
const antonio = Antonio({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

interface ButtonGroupProps {
  buttonArray: RoleButtonData[]
  setSelectedButton: (role: string) => void // eslint-disable-line
  selectedButton: string
}

const PrimaryButtonGroup = ({
  buttonArray,
  setSelectedButton,
  selectedButton,
}: ButtonGroupProps) => {
  const id = useId()

  return (
    <ButtonGroup
      className={"primaryButtonGroup"}
      id={"primaryButtonGroup"}
      sx={styles.buttonGroupWrapper}
    >
      {buttonArray?.map((role: RoleButtonData, i: number) => {
        return (
          <Button
            key={i}
            className={"RolesButton"}
            id={id + "RolesButton"}
            onClick={() => {
              setSelectedButton(role.role)
            }}
            disableRipple
            sx={
              selectedButton === role.role
                ? styles.buttonGroupSelectedButton
                : styles.buttonGroupUnselectedButton
            }
          >
            <span className={antonio.className}>{role.label}</span>
          </Button>
        )
      })}
    </ButtonGroup>
  )
}

export default PrimaryButtonGroup
