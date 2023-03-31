import { Box, Divider, LinearProgress, Stack } from "@mui/material"
import { useId } from "react"
import { SkillType } from "../../../utils/interfaces"
import PersonPinIcon from "@mui/icons-material/PersonPin"
import { Roboto_Condensed } from "next/font/google"
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
      sx={styles.skillCardWrapper}
    >
      <Box
        className={sid + "Header"}
        id={id + sid + "Header"}
        sx={styles.skillCardHeader}
      >
        <PersonPinIcon />
        <Box
          sx={{
            fontSize: {
              xs: "20px",
              md: "18px",
              xl: "21px",
            },
          }}
        >
          {skillDetails.techName}
        </Box>
      </Box>
      <Divider sx={{ backgroundColor: "#999", margin: "12px 6px 0px 6px" }} />
      <Stack
        className={sid + "Details " + roboto.className}
        id={sid + "Details"}
        sx={styles.skillCardDetailsSection}
      >
        <Box sx={{ ...styles.skillCardFieldText, gridArea: "hands" }}>
          <div className={sid + "FieldTitle"}>Hands-On</div>
          <div className={sid + "FieldValue"}>
            {monthsToYears(skillDetails.handsOnExperience)}
          </div>
        </Box>
        <Box sx={{ ...styles.skillCardFieldText, gridArea: "work" }}>
          <div className={sid + "FieldTitle"}>Work Experience</div>
          <div className={sid + "FieldValue"}>
            {monthsToYears(skillDetails.professionalExperience)}
          </div>
        </Box>
        <Box sx={{ ...styles.skillCardProgressBarField, gridArea: "fluency" }}>
          <div className={sid + "FieldTitle"}>Fluency</div>
          <LinearProgress
            variant="determinate"
            value={skillDetails.fluency * 100}
            color={"secondary"}
            sx={{
              ...styles.skillCardProgressBar,
              "& > span": {
                backgroundColor: "#642B73",
                background: "linear-gradient(90deg, #642B73, #C6426E)",
              },
            }}
          />
        </Box>
        <Box sx={{ ...styles.skillCardProgressBarField, gridArea: "adap" }}>
          <div className={sid + "FieldTitle"}>Adaptability</div>
          <LinearProgress
            variant="determinate"
            value={skillDetails.adaptability * 100}
            sx={{
              ...styles.skillCardProgressBar,
              "& > span": {
                backgroundColor: "#134E5E",
                background: "linear-gradient(90deg, #134E5E, #71B280)",
              },
            }}
          />
        </Box>
      </Stack>
    </Box>
  )
}

export default SkillCard
