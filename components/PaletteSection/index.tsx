import { Box, Grid } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootType } from "../../redux/constants/stateTypes"
import {
  CountHandlerType,
  PaletteColorJSONType,
  PaletteDataType,
  PaletteJSONType,
} from "../../utils/interfaces"
import PaletteBar from "./PaletteBar"
import { styles } from "./styles/styles"
import PrimaryLoader from "../common/Loaders/PrimaryLoader"
import OptionsBar from "./OptionsBar"
import { getContrastingColor } from "../../utils/methods"

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
  const countHandler: CountHandlerType = () => {
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

  // creates a JSON object for the palette
  const getJSONObjectForPalette = useCallback(
    (allPalettes: PaletteDataType[], count: number) => {
      const paletteJSONObject: PaletteJSONType = {}
      const paletteArray: PaletteColorJSONType[] = []
      const currentPalette = [...allPalettes][count]
      // stores palette name in the JSON obj
      paletteJSONObject["name"] = [...allPalettes].reverse()[count].name
      // for every color generates an object for hexcodes and stores in paletteArray
      currentPalette?.hex.map((hex, i) => {
        paletteArray[i] = {
          TITLE: `color_${i}`,
          BACKGROUND: `#${hex}`,
          TEXT: `#${getContrastingColor(hex)}`,
        }
      })
      // stores the palette array generated in the JSON Obj
      paletteJSONObject["palette"] = paletteArray
      return paletteJSONObject
    },
    [count, allPalettes]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
  }, [])

  return allPalettes.length !== 0 ? (
    <Box
      className={pid + "Wrapper"}
      id={pid + "Wrapper"}
      sx={{
        width: "100%",
      }}
      tabIndex={0}
    >
      <Grid
        container
        className={pid + "HeaderWrapper"}
        sx={styles.paletteSectionHeaderWrapper}
      >
        <Grid
          item
          xs={6}
          sx={styles.paletteSectionTitle}
          className={pid + "Title"}
          id={pid + "Title"}
        >
          {palette?.name}
        </Grid>
        <OptionsBar
          countHandler={countHandler}
          pid={pid}
          getJSONObjectForPalette={getJSONObjectForPalette}
          allPalettes={allPalettes}
          count={count}
        />
      </Grid>
      <Box
        className={pid + "BarsWrapper"}
        id={pid + "BarsWrapper"}
        sx={styles.paletteSectionBarsWrapper}
      >
        {/* reversing the array so that new palettes come first */}
        {[...allPalettes].reverse()[count]?.hex.map((hexcode, i) => {
          return (
            <PaletteBar key={hexcode} pid={pid} hexcode={hexcode} index={i} />
          )
        })}
      </Box>
    </Box>
  ) : (
    <PrimaryLoader />
  )
}

export default PaletteSection
