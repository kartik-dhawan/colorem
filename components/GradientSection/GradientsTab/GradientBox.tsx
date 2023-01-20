import { Box, IconButton, Typography } from "@mui/material"
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useId,
  useState,
} from "react"
import { getRandomBox } from "../../../utils/methods"
import { gradientBoxTypeStyles, styles } from "../styles"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import InfoIcon from "@mui/icons-material/Info"
import { useDispatch } from "react-redux"
import { updateCurrentGradient } from "../../../redux/slices/gradientSlice"
import { GradientDataType } from "../../../utils/interfaces"

interface GradientBoxProps {
  grad: GradientDataType
  infoDrawerToggle: boolean
  setInfoDrawerToggle: Dispatch<SetStateAction<boolean>>
}
const GradientBox = ({ grad, setInfoDrawerToggle }: GradientBoxProps) => {
  const gid = "gradientBox"
  const id = useId()

  const dispatch = useDispatch()

  const [randomBox, setRandomBoxState] = useState("wide")

  useEffect(() => {
    // gets a random box type - tall || wide || square || largeSquare
    setRandomBoxState(getRandomBox())
  }, [])

  /*
   * Toggles the info drawer open and stores that gradient's data in the redux store
   */
  const handleInfoDrawerToggle = useCallback(() => {
    setInfoDrawerToggle(true)
    dispatch(updateCurrentGradient(grad))
  }, [])

  const gradientStyleString: string = grad.colors
    .map((color) => {
      return `#${color}`
    })
    .join(", ")

  return (
    <Box
      className={"gradientSectionColorBox " + randomBox}
      id={id + "gradientSectionColorBox"}
      sx={{
        background: `linear-gradient(90deg, ${gradientStyleString})`,
        ...styles.gradientSectionColorBox,
        ...gradientBoxTypeStyles[randomBox],
      }}
    >
      <Typography sx={styles.gradientSectionBoxTitleText}>
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
          <IconButton sx={{ color: "#111" }} disabled>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton sx={{ color: "#111" }} onClick={handleInfoDrawerToggle}>
            <InfoIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default GradientBox
