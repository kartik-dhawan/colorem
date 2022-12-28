import { Grid, IconButton } from "@mui/material"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import NextPlanIcon from "@mui/icons-material/NextPlan"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useCallback, useState } from "react"
import { CountHandlerType } from "../../utils/interfaces"
import { styles } from "./styles/styles"

interface OptionsBarProps {
  countHandler: CountHandlerType
  pid: string
}

const OptionsBar = ({ pid, countHandler }: OptionsBarProps) => {
  const [saved, setSaved] = useState<boolean>(false)
  const [favorite, setFavorite] = useState<boolean>(false)

  // to toggle save post button (bookmark icon)
  const savedHandler = useCallback(() => {
    setSaved(!saved)
  }, [saved])

  // to toggle like post button (heart icon)
  const favoriteHandler = useCallback(() => {
    setFavorite(!favorite)
  }, [favorite])

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
        sx={styles.optionsIcon}
      >
        <ContentCopyIcon />
      </IconButton>
      {/* button to like the palette */}
      <IconButton
        className={pid + "OptionsIcon"}
        id={pid + "OptionsIconLike"}
        sx={styles.optionsIcon}
        onClick={favoriteHandler}
      >
        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      {/* button to save the palette */}
      <IconButton
        className={pid + "OptionsIcon"}
        id={pid + "OptionsIconSave"}
        sx={styles.optionsIcon}
        onClick={savedHandler}
      >
        {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
      {/* button to go to the next palette */}
      <IconButton
        className={pid + "OptionsIcon"}
        id={pid + "OptionsIconNext"}
        onClick={() => {
          countHandler()
          setSaved(false)
          setFavorite(false)
        }}
        sx={styles.optionsIconNext}
      >
        <NextPlanIcon sx={{ fontSize: "26px" }} />
      </IconButton>
    </Grid>
  )
}

export default OptionsBar
