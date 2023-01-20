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
import Instructor from "../common/Instructor"
import PrimaryAlertBox from "../common/AlertBoxes/PrimaryAlertBox"
import { popupAlertTitles } from "../../utils/constants"

const PaletteSection = () => {
  const pid = "paletteSection"
  let allPalettes = useSelector((state: RootType) => state.paletteSlice.data)
  {
    /* reversing the array so that new palettes come first */
  }
  allPalettes = [...allPalettes].reverse()
  const totalPalettes = allPalettes.length
  const [count, setCount] = useState<number>(0)
  const [palette, setPalette] = useState<PaletteDataType>(allPalettes[0])

  const [guid, setGuid] = useState<string | undefined>()

  // instructor variables and states
  const [showInstructor, setShowInstructor] = useState<boolean>(true)
  const { paletteSectionInstructor } = useSelector(
    (state: RootType) => state.contentSlice.data
  )

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

  useEffect(() => {
    setGuid(palette?.paletteGuid)
  }, [palette?.name])

  // used to control the count from client screen (without keyboard)
  const countHandler: CountHandlerType = () => {
    if (count < totalPalettes - 1) {
      setCount((count) => count + 1)
    } else {
      setCount(totalPalettes - 1)
    }
  }

  // changes palette index (or count) on hitting spacebar
  const handleKeyDown = (event: any) /* eslint-disable-line */ => {
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
      paletteJSONObject["name"] = allPalettes[count].name
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

  // looks for any key pressing event on any componeny on the window
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
  }, [])

  // if on a session on a page, user visits this page for the first time
  // then & only then this popup will be visible
  useEffect(() => {
    const isFirstTimePopup =
      sessionStorage.getItem("persistPaletteInstructor") === "visited"
        ? false
        : true
    setShowInstructor(isFirstTimePopup)
  }, [])

  const { copiedAlert } = useSelector((state: RootType) => state.toggleSlice)

  return allPalettes.length !== 0 && !showInstructor ? (
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
        {/*  options bar  */}
        <OptionsBar
          countHandler={countHandler}
          pid={pid}
          getJSONObjectForPalette={getJSONObjectForPalette}
          allPalettes={allPalettes}
          count={count}
          guid={guid}
        />
      </Grid>
      {/* Alert which will appear to notify that the text has been copied */}
      {copiedAlert && <PrimaryAlertBox alertTitle={popupAlertTitles.COPIED} />}
      <Box
        className={pid + "BarsWrapper"}
        id={pid + "BarsWrapper"}
        sx={styles.paletteSectionBarsWrapper}
      >
        {allPalettes[count]?.hex.map((hexcode, i) => {
          return (
            <PaletteBar key={hexcode} pid={pid} hexcode={hexcode} index={i} />
          )
        })}
      </Box>
    </Box>
  ) : showInstructor ? (
    <Instructor
      instructorData={paletteSectionInstructor}
      setShowInstructor={setShowInstructor}
    />
  ) : (
    <PrimaryLoader />
  )
}

export default PaletteSection
