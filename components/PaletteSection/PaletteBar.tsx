import { Box, Button, Container, Divider, Typography } from "@mui/material"
import { styles } from "./styles/styles"
import { useCallback, useEffect, useId } from "react"
import { GetColorName } from "hex-color-to-color-name"
import {
  copyHexCode,
  getContrastingColor,
  getLightOrDarkTextColor,
} from "../../utils/methods"
import { toggleCopiedAlert } from "../../redux/slices/toggleSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootType } from "../../redux/constants/stateTypes"
import { COPIED_ALERT_TIMEOUT } from "../../utils/constants"

interface PaletteBarType {
  pid: string
  hexcode: string
  index: number
}

const PaletteBar = ({ pid, hexcode, index }: PaletteBarType) => {
  // use this id in common components that are rendered multiple times on the same page to keep the id unique at all places
  const id = useId()
  const dispatch = useDispatch()

  const { copiedAlert } = useSelector((state: RootType) => state.toggleSlice)

  // if any 'copied' alert is on the screen, it would remove it after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      dispatch(toggleCopiedAlert(false))
    }, COPIED_ALERT_TIMEOUT)
  }, [copiedAlert])

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
        sx={styles.paletteSectionBarContentWrapper}
      >
        <Box
          className={pid + "BarColorText"}
          id={id + pid + "BarColorText"}
          sx={{
            ...styles.paletteSectionBarColorText,
            color: `#${getLightOrDarkTextColor(hexcode)}`,
          }}
        >
          <Typography variant="body1" sx={styles.paletteBarFirstColorName}>
            {GetColorName(hexcode)}
          </Typography>
          <Typography variant="body1" sx={styles.paletteBarSecondColorName}>
            &nbsp;& {GetColorName(getContrastingColor(hexcode))}
          </Typography>
        </Box>
        <Divider
          sx={{
            ...styles.paletteSectionBarDivider,
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
              <Button
                sx={{
                  ...styles.paletteBarHexcode,
                  color: `#${getContrastingColor(hexcode)}`,
                }}
                onClick={useCallback(() => {
                  // text-color section
                  dispatch(toggleCopiedAlert(true))
                  // shows an alert
                  copyHexCode(getContrastingColor(hexcode))
                }, [hexcode])}
              >
                {`#${getContrastingColor(hexcode)}`}
              </Button>
              Text Color
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
              <Button
                sx={{
                  ...styles.paletteBarHexcode,
                  color: `#${getContrastingColor(hexcode)}`,
                }}
                onClick={useCallback(() => {
                  // background-color section
                  copyHexCode(hexcode)
                  // shows an alert
                  dispatch(toggleCopiedAlert(true))
                }, [hexcode])}
              >{`#${hexcode}`}</Button>
              Background Color
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default PaletteBar
