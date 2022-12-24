import { Box } from "@mui/material"
import { styles } from "./styles/styles"

interface PaletteBarType {
  pid: string
  hexcode: string
}

const PaletteBar = ({ pid, hexcode }: PaletteBarType) => {
  return (
    <Box
      className={pid + "Bar"}
      sx={{
        ...styles.paletteSectionBar,
        backgroundColor: `#${hexcode}`,
      }}
    ></Box>
  )
}

export default PaletteBar
