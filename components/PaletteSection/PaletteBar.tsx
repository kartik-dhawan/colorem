import { Box } from "@mui/material"

interface PaletteBarType {
  pid: string
}

const PaletteBar = ({ pid }: PaletteBarType) => {
  return (
    <Box className={pid + "Bar"}>
      <div>Bar</div>
    </Box>
  )
}

export default PaletteBar
