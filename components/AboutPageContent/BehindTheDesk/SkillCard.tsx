import { Box, LinearProgress, Stack } from "@mui/material"
import { useId } from "react"
import { SkillType } from "../../../utils/interfaces"
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import { Roboto_Condensed } from "@next/font/google"
import { styles } from "../styles/behindTheDesk"
import { monthsToYears } from "../../../utils/methods"

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
        <Box
          sx={{
            fontSize: "18px",
          }}
        >
          {skillDetails.techName}
        </Box>
      </Box>

      <Stack
        className={sid + "Details " + roboto.className}
        id={sid + "Details"}
        sx={styles.skillCardDetailsSection}
      >
        <Box sx={styles.skillCardFieldText}>
          <div className={sid + "FieldTitle"}>Hands-On</div>
          <div className={sid + "FieldValue"}>
            {monthsToYears(skillDetails.handsOnExperience)}
          </div>
        </Box>
        <Box sx={styles.skillCardFieldText}>
          <div className={sid + "FieldTitle"}>Work Experience</div>
          <div className={sid + "FieldValue"}>
            {monthsToYears(skillDetails.professionalExperience)}
          </div>
        </Box>
        <Box sx={styles.skillCardFieldProgressBar}>
          <div className={sid + "FieldTitle"}>Fluency</div>
          <LinearProgress
            variant="determinate"
            value={skillDetails.fluency * 100}
            color={"secondary"}
            sx={{
              borderRadius: "100px",
              backgroundColor: "#a1b4a8", // progress_bar_green_complement
              "& > span": {
                backgroundColor: "#1db954", // progress_bar_green
              },
            }}
          />
        </Box>
        <Box sx={styles.skillCardFieldProgressBar}>
          <div className={sid + "FieldTitle"}>Adaptability</div>
          <LinearProgress
            variant="determinate"
            value={skillDetails.adaptability * 100}
            sx={{
              borderRadius: "100px",
              backgroundColor: "#c9cbae", // progress_bar_yellow_complement
              "& > span": {
                backgroundColor: "#b9a91d", // progress_bar_yellow
              },
            }}
          />
        </Box>
      </Stack>
    </Box>
  )
}

export default SkillCard
