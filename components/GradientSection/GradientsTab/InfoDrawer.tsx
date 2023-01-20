import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
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
import { useSelector } from "react-redux"
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
import { popupAlertTitles } from "../../../utils/constants"

interface InfoDrawerProps {
  infoDrawerToggle: boolean
  setInfoDrawerToggle: Dispatch<SetStateAction<boolean>>
}

const InfoDrawer = ({
  infoDrawerToggle,
  setInfoDrawerToggle,
}: InfoDrawerProps) => {
  const iid = "infoDrawer"

  const [likeToggle, setLikeToggle] = useState<boolean>(false)
  const [saveToggle, setSaveToggle] = useState<boolean>(false)
  const [gradientCode, setGradientCode] = useState<string>("")
  const [isCopied, setIsCopied] = useState<boolean>(false)

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

  const infoDrawerCloseHandler = useCallback(() => {
    setInfoDrawerToggle(false)
  }, [])

  /*
   * gets current selected gradient from store
   */
  const { gradient } = useSelector((state: RootType) => state.gradientSlice)

  /*
   * final string of all hexcodes in a gradient
   */
  const gradientStyleString: string = gradient.colors
    .map((color) => {
      return `#${color}`
    })
    .join(", ")

  /**
   * toggle handlers for likes & save feature
   */

  const likeToggleHandler = useCallback(() => {
    setLikeToggle(!likeToggle)
  }, [likeToggle])

  const saveToggleHandler = useCallback(() => {
    setSaveToggle(!saveToggle)
  }, [saveToggle])

  /**
   * gets gradient's code in the selected format
   */
  useEffect(() => {
    if (value === "css") {
      const cssGradientString = `.yourClass {
  background: linear-gradient(90deg, ${gradientStyleString});
  background: -moz-linear-gradient(90deg, ${gradientStyleString});
  background: -webkit-linear-gradient(90deg,${gradientStyleString});
}`
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
  }, [value, gradient])

  const copyGradientHandler = useCallback(() => {
    copyToClipboard(gradientCode)
    setIsCopied(true)
  }, [gradientCode])

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
            sx={styles.infoDrawerGradientName}
            className={iid + "GradientName"}
            id={iid + "GradientName"}
          >
            {gradient.name}
          </Typography>
          <Typography
            variant="h4"
            className={iid + "GradientColorsName"}
            id={iid + "GradientColorsName"}
            sx={styles.infoDrawerGradientColorsName}
          >
            {gradient.colors.map((color) => GetColorName(color)).join(" & ")}
          </Typography>
        </Box>
      </Container>
      <Container
        className={iid + "IconsWrapper"}
        id={iid + "IconsWrapper"}
        sx={styles.infoDrawerIconsWrapper}
      >
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
          {likeToggle ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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