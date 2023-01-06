import { Grid, IconButton } from "@mui/material"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import NextPlanIcon from "@mui/icons-material/NextPlan"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useCallback, useEffect, useState } from "react"
import {
  CountHandlerType,
  JSONForPaletteFunction,
  PaletteDataType,
} from "../../utils/interfaces"
import { styles } from "./styles/styles"
import { copyPaletteJSON } from "../../utils/methods"
import { toggleCopiedAlert } from "../../redux/slices/toggleSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootType } from "../../redux/constants/stateTypes"
import { COPIED_ALERT_TIMEOUT } from "../../utils/constants"

interface OptionsBarProps {
  countHandler: CountHandlerType
  pid: string
  getJSONObjectForPalette: JSONForPaletteFunction
  allPalettes: PaletteDataType[]
  count: number
}

const OptionsBar = ({
  pid,
  countHandler,
  getJSONObjectForPalette,
  allPalettes,
  count,
}: OptionsBarProps) => {
  const [saved, setSaved] = useState<boolean>(false)
  const [favorite, setFavorite] = useState<boolean>(false)

  const dispatch = useDispatch()

  const { copiedAlert } = useSelector((state: RootType) => state.toggleSlice)

  // if any 'copied' alert is on the screen, it would remove it after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      dispatch(toggleCopiedAlert(false))
    }, COPIED_ALERT_TIMEOUT)
  }, [copiedAlert])

  // to toggle save post button (bookmark icon)
  const savedHandler = useCallback(() => {
    setSaved(!saved)
  }, [saved])

  // to toggle like post button (heart icon)
  const favoriteHandler = useCallback(() => {
    setFavorite(!favorite)
  }, [favorite])

  // clear saves and likes on clicking next palette icon
  const nextHandler = useCallback(() => {
    countHandler()
    setSaved(false)
    setFavorite(false)
  }, [])

  return (
    <Grid
      item
      xs={6}
      sx={styles.optionsIconWrapper}
      className={pid + "IconButtonWrapper"}
      id={pid + "IconButtonWrapper"}
    >
      {/* button to copy the code for palette */}
      <IconButton
        className={pid + "OptionsIcon"}
        id={pid + "OptionsIconCopy"}
        sx={styles.optionsCopyIcon}
        onClick={() => {
          const paletteJSON = getJSONObjectForPalette(allPalettes, count)
          copyPaletteJSON(paletteJSON)
          // shows an alert
          dispatch(toggleCopiedAlert(true))
        }}
      >
        <ContentCopyIcon />
      </IconButton>
      {/* button to like the palette */}
      <IconButton
        className={pid + "OptionsIcon"}
        id={pid + "OptionsIconLike"}
        sx={styles.optionsLikeIcon}
        onClick={favoriteHandler}
      >
        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      {/* button to save the palette */}
      <IconButton
        className={pid + "OptionsIcon"}
        id={pid + "OptionsIconSave"}
        sx={styles.optionsSaveIcon}
        onClick={savedHandler}
      >
        {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
      {/* button to go to the next palette */}
      <IconButton
        className={pid + "OptionsIcon"}
        id={pid + "OptionsIconNext"}
        onClick={nextHandler}
        sx={styles.optionsIconNext}
      >
        <NextPlanIcon sx={{ fontSize: "26px" }} />
      </IconButton>
    </Grid>
  )
}

export default OptionsBar
