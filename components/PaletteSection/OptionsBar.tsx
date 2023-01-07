import { Grid, IconButton, Typography } from "@mui/material"
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
import { API_URLS, COPIED_ALERT_TIMEOUT } from "../../utils/constants"
import axios from "axios"
import { validate } from "uuid"
import { logger } from "../../lib/methods"

interface OptionsBarProps {
  countHandler: CountHandlerType
  pid: string
  getJSONObjectForPalette: JSONForPaletteFunction
  allPalettes: PaletteDataType[]
  count: number
  guid: string | undefined
}

const OptionsBar = ({
  pid,
  countHandler,
  getJSONObjectForPalette,
  allPalettes,
  count,
  guid,
}: OptionsBarProps) => {
  const [saved, setSaved] = useState<boolean>(false)
  const [favorite, setFavorite] = useState<boolean>(false)

  const dispatch = useDispatch()

  const { copiedAlert } = useSelector((state: RootType) => state.toggleSlice)

  const [likeCount, setLikeCount] = useState<number>(allPalettes[count].likes)

  // sets the initial likeCount as likes from DB
  useEffect(() => {
    setLikeCount(allPalettes[count].likes ? allPalettes[count].likes : 0)
  }, [count])

  // clears previous palette's state on liking that palette
  const handleKeyDown = (event: any) /* eslint-disable-line */ => {
    if (event.key === " ") {
      // " " - space
      event.preventDefault()
      setFavorite(false)
      setSaved(false)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
  }, [])

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

  // updates like count instantly on UI while it asynchronously updates it in DB
  const likesHandlerUI = (like: boolean) => {
    if (like) {
      setLikeCount((like) => like + 1)
    } else {
      setLikeCount((like) => like - 1)
    }
  }

  // to hit like-a-palette api on toggle
  const hitLikePaletteAPI = useCallback(
    (like: boolean) => {
      return (
        guid &&
        validate(guid) &&
        axios
          .put(`${API_URLS.UPDATE_A_PALETTE}/${guid}`, {
            like: like, // request body
            type: "Like/Unlike",
          })
          .then(() => {
            // updates like count instantly on UI while it asynchronously updates it in DB
            likesHandlerUI(like)
          })
          .catch((err) => {
            logger({
              error: err,
              type: "error",
            })
          })
      )
    },
    [guid]
  )

  // gets liked palettes by user in that session
  const likedPalettes: string[] = JSON.parse(
    localStorage.getItem("liked") || "[]"
  )

  // if the user has already liked that palette in that session, it will persist that
  useEffect(() => {
    return guid && likedPalettes.includes(guid)
      ? setFavorite(true)
      : setFavorite(false)
  }, [likedPalettes])

  // to toggle like post button (heart icon)
  const favoriteHandler = useCallback(() => {
    setFavorite(!favorite)
    hitLikePaletteAPI(!favorite)
    const liked =
      guid &&
      (!favorite
        ? likedPalettes[likedPalettes.push(guid) - 1]
        : likedPalettes.splice(likedPalettes.indexOf(guid), 1))

    // stores liked palettes in local storage to persist temporarily
    // once authentication has been implemented, this data will be stored in that user's collection
    localStorage.setItem("liked", JSON.stringify(likedPalettes))
    localStorage.setItem("previous-liked-unliked", JSON.stringify(liked))
  }, [favorite, guid])

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
        <Typography
          variant="body1"
          sx={{
            paddingLeft: "4px",
          }}
        >
          {likeCount}
        </Typography>
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
