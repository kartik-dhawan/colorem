import { Box, IconButton, Typography } from "@mui/material"
import { useEffect, useId, useState } from "react"
import { FinalGradientType } from "../../../lib/utils/interfaces"
import { getRandomBox } from "../../../utils/methods"
import { gradientBoxTypeStyles, styles } from "../styles"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import InfoIcon from "@mui/icons-material/Info"

interface GradientBoxProps {
  grad: FinalGradientType
}
const GradientBox = ({ grad }: GradientBoxProps) => {
  const gid = "gradientBox"
  const id = useId()

  const [randomBox, setRandomBoxState] = useState("wide")

  useEffect(() => {
    // gets a random box type - tall || wide || square || largeSquare
    setRandomBoxState(getRandomBox())
  }, [])

  return (
    <Box
      className={"gradientSectionColorBox " + randomBox}
      id={id + "gradientSectionColorBox"}
      sx={{
        background: `linear-gradient(90deg, #${grad.colors[0]}, #${grad.colors[1]})`,
        ...styles.gradientSectionColorBox,
        ...gradientBoxTypeStyles[randomBox],
      }}
    >
      <Typography sx={{ position: "absolute", bottom: "10px", left: "10px" }}>
        {grad.name}
      </Typography>
      {/* action buttons on hover */}
      <Box
        sx={styles.gradientBoxHoverWrapper}
        className={gid + "HoverWrapper"}
        id={id + gid + "HoverWrapper"}
      >
        <Box
          sx={styles.gradientBoxActionBtnsWrapper}
          className={gid + "ActionBtnsWrapper"}
          id={id + gid + "ActionBtnsWrapper"}
        >
          <IconButton sx={{ color: "#111" }}>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton sx={{ color: "#111" }}>
            <InfoIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default GradientBox
