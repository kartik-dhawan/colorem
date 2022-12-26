import { Box, Container, Divider, Typography } from "@mui/material"
import { styles } from "./styles/styles"
import { useEffect, useId } from "react"
import { GetColorName } from "hex-color-to-color-name"
import {
  getContrastingColor,
  getLightOrDarkTextColor,
} from "../../utils/methods"

interface PaletteBarType {
  pid: string
  hexcode: string
  index: number
}

const PaletteBar = ({ pid, hexcode, index }: PaletteBarType) => {
  // use this id in common components that are rendered multiple times on the same page to keep the id unique at all places
  const id = useId()

  useEffect(() => {
    console.log("Color 1: ", GetColorName(hexcode))
    console.log("Color 2: ", GetColorName(getContrastingColor(hexcode)))
  }, [])

  return (
    <Container
      className={pid + "Bar"}
      id={id + pid + "Bar"}
      sx={{
        ...styles.paletteSectionBar,
        backgroundColor: `#${hexcode}`,
      }}
    >
      <Typography
        className={pid + "BarNumber"}
        id={id + pid + "BarNumber"}
        variant={"h2"}
        sx={{
          ...styles.paletteSectionBarNumber,
          color: `#${getLightOrDarkTextColor(hexcode)}`,
        }}
      >{`0${index + 1}`}</Typography>
      <Box
        className={pid + "BarContentWrapper"}
        id={id + pid + "BarContentWrapper"}
      >
        <Typography
          variant="body1"
          className={pid + "BarColorText"}
          id={id + pid + "BarColorText"}
          sx={{
            ...styles.paletteSectionBarColorText,
            color: `#${getLightOrDarkTextColor(hexcode)}`,
          }}
        >
          <Typography variant="body1" sx={{ fontSize: "25px" }}>
            {GetColorName(hexcode)}
          </Typography>
          <Typography variant="body1">
            & {GetColorName(getContrastingColor(hexcode))}
          </Typography>
        </Typography>
        <Divider
          sx={{
            margin: "15px 0px 75px 0px",
            backgroundColor: `#${getContrastingColor(hexcode)}`,
          }}
        />
        <Box
          className={pid + "BarColorBallsWrapper"}
          id={id + pid + "BarColorBallsWrapper"}
          sx={styles.paletteSectionBarColorBallsWrapper}
        >
          <Box
            className={pid + "BarTextBall"}
            id={id + pid + "BarTextBall"}
            sx={styles.paletteSectionBarTextBall}
          >
            <Box
              className={pid + "BarColorBall"}
              sx={{
                ...styles.paletteSectionBarColorBall,
                backgroundColor: `#${getContrastingColor(hexcode)}`,
                border: `2px solid #${getContrastingColor(hexcode)}`,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                ...styles.paletteSectionBarColorReference,
                color: `#${getLightOrDarkTextColor(hexcode)}`,
              }}
            >
              Primary Text Color
            </Typography>
          </Box>
          <Box
            className={pid + "BarBgBall"}
            id={id + pid + "BarBgBall"}
            sx={styles.paletteSectionBarBgBall}
          >
            <Box
              className={pid + "BarColorBall"}
              sx={{
                ...styles.paletteSectionBarColorBall,
                backgroundColor: `#${hexcode}`,
                border: `2px solid #${getContrastingColor(hexcode)}`,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                ...styles.paletteSectionBarColorReference,
                color: `#${getLightOrDarkTextColor(hexcode)}`,
              }}
            >
              Primary Background Color
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default PaletteBar
