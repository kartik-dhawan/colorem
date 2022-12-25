import { Box } from "@mui/material"
import { styles } from "./styles/styles"
import { useId } from "react"

interface PaletteBarType {
  pid: string
  hexcode: string
}

const PaletteBar = ({ pid, hexcode }: PaletteBarType) => {
  const id = useId()
  return (
    <Box
      className={pid + "Bar"}
      id={id + pid + "Bar"}
      sx={{
        ...styles.paletteSectionBar,
        backgroundColor: `#${hexcode}`,
      }}
    ></Box>
  )
}

export default PaletteBar
