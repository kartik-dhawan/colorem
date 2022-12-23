import { Box } from "@mui/material"
import { useSelector } from "react-redux"
import { RootType } from "../../redux/constants/stateTypes"
import PaletteBar from "./PaletteBar"

const PaletteSection = () => {
  const pid = "paletteSection"
  const data = useSelector((state: RootType) => state.paletteSlice.data)
  console.log("Fetched data from store using useSelector")
  console.log(data)

  return (
    <Box className={pid + "Wrapper"} id={pid + "Wrapper"}>
      <h4>PaletteBars</h4>
      <Box className={pid + "BarsWrapper"} id={pid + "BarsWrapper"}>
        <PaletteBar pid={pid} />
      </Box>
    </Box>
  )
}

export default PaletteSection
