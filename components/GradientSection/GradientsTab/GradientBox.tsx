import { Box, Typography } from "@mui/material"
import { useEffect, useId, useState } from "react"
import { FinalGradientType } from "../../../lib/utils/interfaces"
import { getRandomBox } from "../../../utils/methods"
import { gradientBoxTypeStyles, styles } from "../styles"

interface GradientBoxProps {
  grad: FinalGradientType
}
const GradientBox = ({ grad }: GradientBoxProps) => {
  const gid = "gradientSection"
  const id = useId()

  const [randomBox, setRandomBoxState] = useState("wide")

  useEffect(() => {
    // gets a random box type - tall || wide || square || largeSquare
    setRandomBoxState(getRandomBox())
  }, [])

  return (
    <Box
      className={gid + "ColorBox " + randomBox}
      id={id + gid + "ColorBox"}
      sx={{
        background: `linear-gradient(90deg, #${grad.colors[0]}, #${grad.colors[1]})`,
        ...styles.gradientSectionColorBox,
        ...gradientBoxTypeStyles[randomBox],
      }}
    >
      <Typography sx={{ position: "absolute", bottom: "10px", left: "10px" }}>
        {grad.name}
      </Typography>
    </Box>
  )
}

export default GradientBox
