import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Typography,
} from "@mui/material"
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootType } from "../../../redux/constants/stateTypes"
import { GetColorName } from "hex-color-to-color-name"
import { styles } from "../styles/infoDrawerStyles"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import { styles as sideNavStyles } from "../../SideNav/styles/styles"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import SyntaxHighlightBox from "../../common/SyntaxHighlightBox"
import { copyToClipboard, hexToRGB } from "../../../utils/methods"
import PrimaryAlertBox from "../../common/AlertBoxes/PrimaryAlertBox"
import { API_URLS, popupAlertTitles } from "../../../utils/constants"
import { validate } from "uuid"
import axios from "axios"
import { logger } from "../../../lib/methods"
import { updateCurrentGradient } from "../../../redux/slices/gradientSlice"
import { useSWRConfig } from "swr"
import { useRouter } from "next/router"
import { styles as SubMenuStyles } from "../../PaletteSection/styles/styles"

interface InfoDrawerProps {
  infoDrawerToggle: boolean
  setInfoDrawerToggle: Dispatch<SetStateAction<boolean>>
}

const InfoDrawer = ({
  infoDrawerToggle,
  setInfoDrawerToggle,
}: InfoDrawerProps) => {
  const iid = "infoDrawer"
  const dispatch = useDispatch()
  const router = useRouter()
  const { mutate } = useSWRConfig()

  /*
   * gets current selected gradient from store
   */
  const { gradient } = useSelector((state: RootType) => state.gradientSlice)

  const [likeToggle, setLikeToggle] = useState<boolean>(false)
  const [saveToggle, setSaveToggle] = useState<boolean>(false)
  const [gradientCode, setGradientCode] = useState<string>("")
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number>(0)

  /**
   * submenu classes & actions
   */

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClose = () => {
    setAnchorEl(null)
  }

  /**
   * sets default likes to the likes from the database
   */
  useEffect(() => {
    setLikeCount(gradient?.likes)
  }, [gradient?.likes])

  /**
   * Removes copied alert after 2 seconds
   */
  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  }, [isCopied])

  /*
   * state for the current value of selected tab
   */
  const [value, setValue] = useState("css")

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  /**
   * On closing the info drawer, it will remove the query params and direct the user to '/gradients'
   */
  const infoDrawerCloseHandler = useCallback(() => {
    setInfoDrawerToggle(false)
    router.push(
      {
        pathname: "/gradients",
        query: { ...router.query, guid: "" },
      },
      "/gradients"
    )
  }, [])

  /*
   * final string of all hexcodes in a gradient
   */
  const gradientStyleString: string = gradient
    ? gradient.colors
        ?.map((color) => {
          return `#${color}`
        })
        .join(", ")
    : "..."

  /**
   * gets gradient's code in the selected format
   */
  useEffect(() => {
    if (value === "css") {
      const cssGradientString = `  background: linear-gradient(90deg, ${gradientStyleString});
  background: -moz-linear-gradient(90deg, ${gradientStyleString});
  background: -webkit-linear-gradient(90deg,${gradientStyleString});
`
      setGradientCode(cssGradientString)
    } else if (value === "json") {
      const jsonGradient: { [key: string]: string } = {}
      gradient.colors.map((color, index) => {
        return (jsonGradient[`color_${index}`] = `#${color}`)
      })
      setGradientCode(JSON.stringify(jsonGradient))
    } else if (value === "javascript") {
      const arrayGradientString = `const colorsInHex = [ ${gradient.colors
        .map((color) => `"#${color}"`)
        .join(", ")} ]
const colorsInRGB = [ ${gradient.colors
        .map((color) => `"rgb${hexToRGB(`#${color}`)}"`)
        .join(", ")} ]
      `
      setGradientCode(arrayGradientString)
    }
  }, [value, gradient, gradientCode])

  const copyGradientHandler = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      // only do this behaviour for tablets & desktops
      if (window.innerWidth > 599) {
        copyToClipboard(gradientCode)
        setIsCopied(true)
      } else {
        setAnchorEl(event.currentTarget)
      }
    },
    [gradientCode]
  )

  /**
   * @param {boolean} likeToggle
   * to hit like-a-gradient api on toggle
   */
  const hitLikePaletteAPI = useCallback(
    (likeToggle: boolean) => {
      return (
        gradient.gradientGuid &&
        validate(gradient.gradientGuid) &&
        axios
          .put(`${API_URLS.UPDATE_A_GRADIENT}/${gradient.gradientGuid}`, {
            like: likeToggle, // request body
            type: "Like/Unlike",
          })
          .then((res) => {
            // updates like count instantly on UI while it asynchronously updates it in DB
            setLikeCount(res.data.likes)
            // mutates the 'all-gradients' api without reloading
            mutate(API_URLS.GET_ALL_GRADIENTS)
            // also updates the redux state
            dispatch(updateCurrentGradient(res.data))
          })
          .catch((err) => {
            logger({
              error: err,
              type: "error",
            })
          })
      )
    },
    [gradient?.gradientGuid, likeToggle]
  )

  // gets liked gradients by user in that session
  const likedGradients: string[] =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("likedGradients") || "[]")

  // if the user has already liked that gradient in that session, it will persist that
  useEffect(() => {
    return gradient?.gradientGuid &&
      likedGradients.includes(gradient.gradientGuid)
      ? setLikeToggle(true)
      : setLikeToggle(false)
  }, [likedGradients, gradient?.gradientGuid])

  /**
   * toggle handlers for likes & save feature
   */
  const likeToggleHandler = useCallback(() => {
    setLikeToggle(!likeToggle)
    hitLikePaletteAPI(!likeToggle)
    const liked =
      gradient.gradientGuid &&
      (!likeToggle
        ? likedGradients[likedGradients.push(gradient.gradientGuid) - 1]
        : likedGradients.splice(
            likedGradients.indexOf(gradient.gradientGuid),
            1
          ))
    /**
     *  stores liked palettes in local storage to persist temporarily
     * once authentication has been implemented, this data will be stored in that user's collection
     */
    localStorage.setItem("likedGradients", JSON.stringify(likedGradients))
    localStorage.setItem("previous-liked-gradients", JSON.stringify(liked))
  }, [likeToggle, gradient?.gradientGuid, gradient?.likes])

  const saveToggleHandler = useCallback(() => {
    setSaveToggle(!saveToggle)
  }, [saveToggle])

  return (
    <Drawer
      anchor={"right"}
      open={infoDrawerToggle}
      onClose={infoDrawerCloseHandler}
      className={"gradientInfoDrawer"}
      id={"gradientInfoDrawer"}
      transitionDuration={400}
      sx={styles.gradientInfoDrawer}
    >
      <Button
        variant="contained"
        onClick={infoDrawerCloseHandler}
        className={iid + "CloseBtn"}
        id={iid + "CloseBtn"}
        sx={sideNavStyles.sideNavCloseBtn}
      >
        Close
      </Button>
      <Container
        sx={styles.infoDrawerDescWrapper}
        className={iid + "DescWrapper"}
        id={iid + "DescWrapper"}
      >
        <Box
          className={iid + "GradientBox"}
          id={iid + "GradientBox"}
          sx={{
            ...styles.infoDrawerGradientBox,
            background: `linear-gradient(90deg, ${gradientStyleString})`,
          }}
        ></Box>
        <Box
          className={iid + "GradientDescription"}
          id={iid + "GradientDescription"}
          sx={styles.infoDrawerGradientDescription}
        >
          <Typography
            variant="h6"
            sx={styles.infoDrawerGradientDescConstant}
            className={iid + "GradientDescConstant"}
            id={iid + "GradientDescConstant"}
          >
            Gradient
          </Typography>
          <Typography
            variant="h1"
            sx={{
              ...styles.infoDrawerGradientName,
              "&::after": {
                content: `"${gradient?.name}"`,
                ...styles.infoDrawerGradientName.tooltipOnHover,
              },
              "&:hover::after": {
                display: "flex",
              },
            }}
            className={iid + "GradientName"}
            id={iid + "GradientName"}
          >
            {gradient?.name}
          </Typography>
          <Typography
            variant="h4"
            className={iid + "GradientColorsName"}
            id={iid + "GradientColorsName"}
            sx={styles.infoDrawerGradientColorsName}
          >
            {gradient?.colors?.map((color) => GetColorName(color)).join(" & ")}
          </Typography>
        </Box>
      </Container>
      <Container
        className={iid + "IconsWrapper"}
        id={iid + "IconsWrapper"}
        sx={styles.infoDrawerIconsWrapper}
      >
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          elevation={0}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={SubMenuStyles.optionsBarMenu}
        >
          <MenuItem
            disableRipple
            className={iid + "SubMenuItem"}
            onClick={() => {
              setAnchorEl(null)
              setValue("css")
              const cssGradientString = `background: linear-gradient(90deg, ${gradientStyleString});
background: -moz-linear-gradient(90deg, ${gradientStyleString});
background: -webkit-linear-gradient(90deg,${gradientStyleString});`
              copyToClipboard(cssGradientString)
              setIsCopied(true)
            }}
            sx={SubMenuStyles.optionsBarSubMenuItem}
          >
            CSS Class
          </MenuItem>
          <Divider />
          <MenuItem
            disableRipple
            className={iid + "SubMenuItem"}
            onClick={() => {
              setAnchorEl(null)
              setValue("json")
              const jsonGradient: { [key: string]: string } = {}
              gradient.colors.map((color, index) => {
                return (jsonGradient[`color_${index}`] = `#${color}`)
              })
              copyToClipboard(JSON.stringify(jsonGradient))
              setIsCopied(true)
            }}
            sx={SubMenuStyles.optionsBarSubMenuItem}
          >
            JSON Object
          </MenuItem>
          <Divider />
          <MenuItem
            disableRipple
            className={iid + "SubMenuItem"}
            onClick={() => {
              setAnchorEl(null)
              setValue("javascript")
              const arrayGradientString = `const colorsInHex = [ ${gradient.colors
                .map((color) => `"#${color}"`)
                .join(", ")} ]
const colorsInRGB = [ ${gradient.colors
                .map((color) => `"rgb${hexToRGB(`#${color}`)}"`)
                .join(", ")} ]`
              copyToClipboard(arrayGradientString)
              setIsCopied(true)
            }}
            sx={SubMenuStyles.optionsBarSubMenuItem}
          >
            Array
          </MenuItem>
        </Menu>
        <IconButton
          disableRipple
          sx={styles.infoDrawerCopyButton}
          className={iid + "CopyButton"}
          id={iid + "CopyButton"}
          onClick={copyGradientHandler}
        >
          <ContentCopyIcon />
        </IconButton>
        <IconButton
          sx={styles.infoDrawerLikeButton}
          className={iid + "LikeButton"}
          id={iid + "LikeButton"}
          onClick={likeToggleHandler}
        >
          {likeToggle ? <FavoriteIcon /> : <FavoriteBorderIcon />} {likeCount}
        </IconButton>
        <IconButton
          className={iid + "SaveButton"}
          id={iid + "SaveButton"}
          sx={styles.infoDrawerSaveButton}
          onClick={saveToggleHandler}
        >
          {saveToggle ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </Container>
      <Container
        className={iid + "CopyStylingWrapper"}
        id={iid + "CopyStylingWrapper"}
        sx={styles.infoDrawerCopyStylingWrapper}
      >
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            orientation="horizontal"
            sx={styles.infoDrawerTabList}
            className={iid + "TabList"}
            id={iid + "TabList"}
          >
            <Tab
              label="CSS"
              value="css"
              disableRipple
              className={iid + "TabItem"}
              id={iid + "CSSTab"}
              sx={styles.infoDrawerTabItem}
            />
            <Tab
              label="JSON"
              value="json"
              disableRipple
              className={iid + "TabItem"}
              id={iid + "JSONTab"}
              sx={styles.infoDrawerTabItem}
            />
            <Tab
              label="Array"
              value="javascript"
              disableRipple
              className={iid + "TabItem"}
              id={iid + "ArrayTab"}
              sx={styles.infoDrawerTabItem}
            />
          </TabList>
          <TabPanel
            value={value}
            className={iid + "SelectedTabCode"}
            id={iid + "SelectedTabCode" + value.toUpperCase()}
            sx={{
              padding: "0px",
            }}
          >
            {/* Gradients Tab Body Section */}
            <SyntaxHighlightBox
              body={gradientCode}
              language={value}
              sx={styles.infoDrawerCodeBox}
            />
          </TabPanel>
        </TabContext>
      </Container>
      {isCopied && <PrimaryAlertBox alertTitle={popupAlertTitles.COPIED} />}
    </Drawer>
  )
}

export default InfoDrawer
