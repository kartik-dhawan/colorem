import { Box, Divider, Grid, IconButton, Menu, MenuItem } from "@mui/material"
import NextPlanIcon from "@mui/icons-material/NextPlan"
import MenuIcon from "@mui/icons-material/Menu"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useCallback, useEffect, useState } from "react"
import {
  CountHandlerType,
  JSONForPaletteFunction,
  PaletteDataType,
} from "../../utils/interfaces"
import { iconStyles, styles } from "./styles/styles"
import { copyPaletteJSON } from "../../utils/methods"
import { toggleCopiedAlert } from "../../redux/slices/toggleSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootType } from "../../redux/constants/stateTypes"
import { API_URLS, COPIED_ALERT_TIMEOUT } from "../../utils/constants"
import axios from "axios"
import { validate } from "uuid"
import { logger } from "../../lib/methods"
import SideNav from "../SideNav"
import {
  CopyIconComponent,
  LikeIconComponent,
  SaveIconComponent,
} from "./icons"

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
  const [sideNavToggle, setSideNavToggle] = useState<boolean>(false)

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

  const copyHandler = () => {
    const paletteJSON = getJSONObjectForPalette(allPalettes, count)
    copyPaletteJSON(paletteJSON)
    // shows an alert
    dispatch(toggleCopiedAlert(true))
  }

  // clear saves and likes on clicking next palette icon
  const nextHandler = useCallback(() => {
    countHandler()
    setSaved(false)
    setFavorite(false)
  }, [])

  // toggles sidenav menu
  const menuHandler = useCallback(() => {
    setSideNavToggle(!sideNavToggle)
  }, [sideNavToggle])

  // for submenu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleSubMenuIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Grid
      item
      xs={6}
      sx={iconStyles.optionsIconWrapper}
      className={pid + "IconButtonWrapper"}
      id={pid + "IconButtonWrapper"}
    >
      <Box
        className={pid + "SubMenuWrapper"}
        id={pid + "SubMenuWrapper"}
        sx={iconStyles.optionsBarSubMenuWrapper}
      >
        {/* for mobile & tablet view */}
        <IconButton
          id={pid + "SubMenuIconBtn"}
          sx={{ color: "#d9d9d9" }}
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleSubMenuIconClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          elevation={0}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={styles.optionsBarMenu}
        >
          <MenuItem
            disableRipple
            onClick={copyHandler}
            className={pid + "SubMenuItem"}
            sx={styles.optionsBarSubMenuItem}
          >
            <CopyIconComponent copyHandler={copyHandler} />
            Copy
          </MenuItem>
          <Divider />
          <MenuItem
            className={pid + "SubMenuItem"}
            sx={styles.optionsBarSubMenuItem}
            onClick={favoriteHandler}
          >
            <LikeIconComponent favorite={favorite} likeCount={likeCount} />
            Like
          </MenuItem>
          <Divider />
          <MenuItem
            className={pid + "SubMenuItem"}
            sx={styles.optionsBarSubMenuItem}
            onClick={savedHandler}
          >
            <SaveIconComponent saved={saved} />
            Save
          </MenuItem>
        </Menu>
      </Box>
      {/* for desktops */}
      <CopyIconComponent
        copyHandler={copyHandler}
        sx={iconStyles.optionsBarButtonsConditionalDisplay}
      />
      <LikeIconComponent
        favorite={favorite}
        likeCount={likeCount}
        favoriteHandler={favoriteHandler}
        sx={iconStyles.optionsBarButtonsConditionalDisplay}
      />
      <SaveIconComponent
        saved={saved}
        savedHandler={savedHandler}
        sx={iconStyles.optionsBarButtonsConditionalDisplay}
      />
      <IconButton
        className={pid + "OptionsIcon"}
        id={pid + "OptionsIconNext"}
        onClick={nextHandler}
        sx={iconStyles.optionsIconNext}
      >
        <NextPlanIcon sx={{ fontSize: "26px" }} />
      </IconButton>
      <IconButton
        className={pid + "OptionsIcon"}
        id={pid + "OptionsIconMenu"}
        onClick={menuHandler}
        sx={iconStyles.optionsMenuIcon}
      >
        <MenuIcon sx={{ fontSize: "26px" }} />
      </IconButton>
      <SideNav
        sideNavToggle={sideNavToggle}
        setSideNavToggle={setSideNavToggle}
      />
    </Grid>
  )
}

export default OptionsBar
