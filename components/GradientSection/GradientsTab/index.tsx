import { Box } from "@mui/material"
import { useEffect } from "react"
import { gradients } from "../../../utils/constants"
import { styles } from "../styles"
import GradientBox from "./GradientBox"

interface GradientsTabProps {
  gid: string
}

const GradientsTab = ({ gid }: GradientsTabProps) => {
  useEffect(() => {
    console.log(gradients)
  }, [])

  return (
    <Box
      sx={styles.gradientSectionColorBoxWrapper}
      className={gid + "ColorBoxWrapper"}
      id={gid + "ColorBoxWrapper"}
    >
      {gradients.map((gradient) => (
        <GradientBox grad={gradient} key={gradient.gradientGuid} />
      ))}
    </Box>
  )
}

export default GradientsTab
