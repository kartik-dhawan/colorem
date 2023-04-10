import { Box, Button, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { toggleSelectedColor } from "../../../../redux/slices/toggleSlice"
import { ColorOptionConstants } from "../../../../utils/constants"
import { ColorListType } from "../../../../utils/interfaces"
import { styles } from "../../styles/gradientFilterStyles"

interface ColorOptionsProps {
  setIsColorSelected: (param: boolean) => void // eslint-disable-line
  isColorSelected: boolean
  setColorOptionsList: (param: ColorListType[]) => void // eslint-disable-line
  colorOptionsList: ColorListType[]
}

const ColorOptions = ({
  setIsColorSelected,
  isColorSelected,
  setColorOptionsList,
  colorOptionsList,
}: ColorOptionsProps) => {
  const cid = "filterByColor"

  const dispatch = useDispatch()

  // sets the active selected colorlist & stores the selected color name it in redux store
  const selectColorHandler = (color: ColorListType) => {
    setColorOptionsList([
      {
        cid: 1,
        colorType: color.colorType,
        colorCode: color?.colorCode,
      },
    ])
    setIsColorSelected(true)
    dispatch(toggleSelectedColor(color.colorType))
  }

  return (
    <Box
      className={cid + "Wrapper"}
      id={cid + "Wrapper"}
      sx={{ display: "flex", flexWrap: "wrap" }}
    >
      {colorOptionsList.map((color) => {
        return (
          <Button
            disableRipple
            key={color.cid}
            sx={styles.filterByColorWrapper}
            onClick={() => {
              selectColorHandler(color)
            }}
          >
            <Box
              sx={{
                ...styles.filterByColorBall,
                backgroundColor: `${color.colorCode}`,
              }}
            />
            <Typography>{color.colorType}</Typography>
          </Button>
        )
      })}
      {isColorSelected && (
        <Button
          onClick={() => {
            // resets all the states
            setColorOptionsList(ColorOptionConstants)
            setIsColorSelected(false)
            dispatch(toggleSelectedColor(""))
          }}
          disableRipple
          sx={styles.filterByColorClearBtn}
          className={cid + "ClearBtn"}
          id={cid + "ClearBtn"}
        >
          <u>Clear</u>
        </Button>
      )}
    </Box>
  )
}

export default ColorOptions
