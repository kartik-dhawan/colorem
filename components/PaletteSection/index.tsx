import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootType } from "../../redux/constants/stateTypes"
import { PaletteDataType } from "../../utils/interfaces"
import PaletteBar from "./PaletteBar"
import { styles } from "./styles/styles"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"

const PaletteSection = () => {
  const pid = "paletteSection"
  const allPalettes = useSelector((state: RootType) => state.paletteSlice.data)
  const totalPalettes = allPalettes.length
  const [count, setCount] = useState<number>(0)
  const [palette, setPalette] = useState<PaletteDataType>(allPalettes[0])

  // returns the palette onthe basis of index from the API
  const getNewPaletteOnSpacebar = (count: number) => {
    const tempPalette = allPalettes && allPalettes[count]
    return tempPalette
  }

  useEffect(() => {
    // when the palettes finish it goes back to the first palette repeats the whole list again
    if (totalPalettes && count > totalPalettes - 1) {
      setCount(0)
      setPalette(getNewPaletteOnSpacebar(0))
    }
    // gets the current palette on the basis of index or count & set it in the state
    setPalette(getNewPaletteOnSpacebar(count))
  }, [count, allPalettes[0], totalPalettes])

  // used to control the count from client screen (without keyboard)
  const countHandler = () => {
    if (count < totalPalettes - 1) {
      setCount((count) => count + 1)
    } else {
      setCount(totalPalettes - 1)
    }
  }

  // changes palette index (or count) on hitting spacebar
  const handleKeyDown = (event: any) => {
    if (event.key === " ") {
      // " " - space
      event.preventDefault()
      setCount((count) => count + 1)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <Box
      className={pid + "Wrapper"}
      id={pid + "Wrapper"}
      sx={{
        width: "100%",
      }}
      tabIndex={0}
    >
      <Box
        className={pid + "HeaderWrapper"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 6px",
        }}
      >
        <Typography
          variant="body2"
          sx={styles.paletteSectionTitle}
          className={pid + "Title"}
          id={pid + "Title"}
        >
          {palette?.name}
        </Typography>
        <Button
          onClick={countHandler}
          className={pid + "NextBtn"}
          id={pid + "NextPaletteBtn"}
          sx={{
            color: "#d9d9d9", // $text_primary
            fontSize: "20px",
            fontWeight: 300,
            borderRadius: "0px",
            padding: "2px 7px 2px 16px",
          }}
        >
          Next <KeyboardDoubleArrowRightIcon />
        </Button>
      </Box>
      <Box
        className={pid + "BarsWrapper"}
        id={pid + "BarsWrapper"}
        sx={styles.paletteSectionBarsWrapper}
      >
        {allPalettes[count]?.hex.map((hexcode) => {
          return <PaletteBar key={hexcode} pid={pid} hexcode={hexcode} />
        })}
      </Box>
    </Box>
  )
}

export default PaletteSection
