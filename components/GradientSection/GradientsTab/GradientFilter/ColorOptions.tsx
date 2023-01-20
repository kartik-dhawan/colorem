import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toggleSelectedColor } from "../../../../redux/slices/toggleSlice"
import { ColorOptionConstants } from "../../../../utils/constants"
import { ColorListType } from "../../../../utils/interfaces"
import { styles } from "../../styles/gradientFilterStyles"

const ColorOptions = () => {
  const cid = "filterByColor"

  const dispatch = useDispatch()

  const [colorOptionsList, setColorOptionsList] =
    useState<ColorListType[]>(ColorOptionConstants)
  const [isColorSelected, setIsColorSelected] = useState<boolean>(false)

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
