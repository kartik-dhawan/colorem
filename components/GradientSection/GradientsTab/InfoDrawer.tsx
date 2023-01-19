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

  // state for the current value of selected tab
  const [value, setValue] = useState("css")

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    console.log(value)
  }, [value])

  const infoDrawerCloseHandler = useCallback(() => {
    setInfoDrawerToggle(false)
  }, [])

  const { gradient } = useSelector((state: RootType) => state.gradientSlice)
  useEffect(() => {
    console.log(gradient)
  }, [gradient])

  const gradientStyleString: string = gradient.colors
    .map((color) => {
      return `#${color}`
    })
    .join(", ")

  const likeToggleHandler = useCallback(() => {
    setLikeToggle(!likeToggle)
  }, [likeToggle])

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
              value="array"
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
            {value}
          </TabPanel>
        </TabContext>
      </Container>
    </Drawer>
  )
}

export default InfoDrawer
