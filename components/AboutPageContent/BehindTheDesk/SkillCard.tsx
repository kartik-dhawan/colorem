import { Box } from "@mui/material"
import { useId } from "react"
import { SkillType } from "../../../utils/interfaces"
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import { Roboto_Condensed } from "@next/font/google"

const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  display: "swap",
})
interface SkillCardProps {
  skillDetails: SkillType
}

const SkillCard = ({ skillDetails }: SkillCardProps) => {
  const sid = "skillCard"
  const id = useId()

  console.log(skillDetails)
  return (
    <Box
      className={sid + "Wrapper " + roboto.className}
      id={id + sid + "Wrapper"}
      sx={{
        color: "#c4c4c4",
        backgroundColor: "#222",
        padding: "10px",
      }}
    >
      <Box
        className={sid + "Header"}
        id={id + sid + "Header"}
        sx={{ display: "flex", alignItems: "center", gap: "4px" }}
      >
        <Box
          sx={{
            height: "24px",
            aspectRatio: "1",
          }}
        >
          <AccountBoxIcon />
        </Box>
        <Box>{skillDetails.techName}</Box>
      </Box>
      <Box
        className={sid + "PercentBarsWrapper"}
        id={id + sid + "PercentBarsWrapper"}
      ></Box>
      <Box
        className={sid + "ExperienceWrapper"}
        id={id + sid + "ExperienceWrapper"}
      ></Box>
    </Box>
  )
}

export default SkillCard
