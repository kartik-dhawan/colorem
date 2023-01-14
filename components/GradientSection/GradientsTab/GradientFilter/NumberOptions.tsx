import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toggleSelectedColorsNumber } from "../../../../redux/slices/toggleSlice"
import { ColorNumberOptionsConstants } from "../../../../utils/constants"
import { styles as ColorOptionStyles } from "../../styles/gradientFilterStyles"

const NumberOptions = () => {
  const dispatch = useDispatch()

  const [colorNumbersList, setColorNumbersList] = useState<number[]>(
    ColorNumberOptionsConstants
  )
  const [isNumberSelected, setIsNumberSelected] = useState<boolean>(false)

  // sets the active selected colorNumberList & stores the selected color number it in redux store
  const selectColorNumberHandler = (colorNumber: number) => {
    setColorNumbersList([colorNumber])
    setIsNumberSelected(true)
    dispatch(toggleSelectedColorsNumber(colorNumber))
  }

  return (
    <Box sx={{ display: "flex" }}>
      {colorNumbersList.map((colorNumber) => {
        return (
          <Button
            disableRipple
            key={colorNumber - 1}
            sx={ColorOptionStyles.filterByColorWrapper} // resuing styles from ColorOption styles
            onClick={() => {
              selectColorNumberHandler(colorNumber)
            }}
          >
            <Typography>{colorNumber}</Typography>
          </Button>
        )
      })}
      {isNumberSelected && (
        <Button
          onClick={() => {
            // resets all the states
            setColorNumbersList(ColorNumberOptionsConstants)
            setIsNumberSelected(false)
            dispatch(toggleSelectedColorsNumber(null))
          }}
          disableRipple
          sx={ColorOptionStyles.filterByColorClearBtn}
          className={"ClearBtn"}
          id={"ClearBtn"}
        >
          <u>Clear</u>
        </Button>
      )}
    </Box>
  )
}

export default NumberOptions
