import { Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { RootType } from "../../redux/constants/stateTypes"
import PaletteBar from "./PaletteBar"
import { styles } from "./styles/styles"

const PaletteSection = () => {
  const pid = "paletteSection"
  const allPalettes = useSelector((state: RootType) => state.paletteSlice.data)
  const palette = allPalettes[34]
  console.log(palette)

  return (
    <Box
      className={pid + "Wrapper"}
      id={pid + "Wrapper"}
      sx={{
        width: "100%",
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
      <Box
        className={pid + "BarsWrapper"}
        id={pid + "BarsWrapper"}
        sx={styles.paletteSectionBarsWrapper}
      >
        {palette?.hex.map((hexcode) => {
          return <PaletteBar key={hexcode} pid={pid} hexcode={hexcode} />
        })}
      </Box>
    </Box>
  )
}

export default PaletteSection
