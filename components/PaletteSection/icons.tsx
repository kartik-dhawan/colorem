import { IconButton, SxProps, Theme, Typography } from "@mui/material"
import { iconStyles } from "./styles/styles"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import BookmarkIcon from "@mui/icons-material/Bookmark"

const pid = "paletteSection"

interface CopyIconProps {
  copyHandler?: () => void
  sx?: SxProps<Theme>
}

interface LikeIconProps {
  favorite: boolean
  favoriteHandler?: () => void
  likeCount: number
  sx?: SxProps<Theme>
}

interface SaveIconProps {
  saved: boolean
  savedHandler?: () => void
  sx?: SxProps<Theme>
}

// for copy icon
export const CopyIconComponent = ({ copyHandler, sx }: CopyIconProps) => {
  return (
    <IconButton
      className={pid + "OptionsIcon"}
      id={pid + "OptionsIconCopy"}
      sx={{
        ...iconStyles.optionsCopyIcon,
        ...iconStyles.optionsBarButtonsCommon,
        ...sx,
      }}
      onClick={copyHandler}
    >
      <ContentCopyIcon />
    </IconButton>
  )
}

// for like or favorite icon
export const LikeIconComponent = ({
  favorite,
  favoriteHandler,
  likeCount,
  sx,
}: LikeIconProps) => {
  return (
    <IconButton
      className={pid + "OptionsIcon"}
      id={pid + "OptionsIconLike"}
      sx={{
        ...iconStyles.optionsLikeIcon,
        ...iconStyles.optionsBarButtonsCommon,
        ...sx,
      }}
      onClick={favoriteHandler}
    >
      {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      <Typography
        variant="body1"
        sx={{
          paddingLeft: "4px",
        }}
      >
        {likeCount}
      </Typography>
    </IconButton>
  )
}

// for save icon
export const SaveIconComponent = ({
  saved,
  savedHandler,
  sx,
}: SaveIconProps) => {
  return (
    <IconButton
      className={pid + "OptionsIcon"}
      id={pid + "OptionsIconSave"}
      sx={{
        ...iconStyles.optionsSaveIcon,
        ...iconStyles.optionsBarButtonsCommon,
        ...sx,
      }}
      onClick={savedHandler}
      disabled
    >
      {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
    </IconButton>
  )
}
