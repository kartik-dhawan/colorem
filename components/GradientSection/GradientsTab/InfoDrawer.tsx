import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
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
      ></Container>
    </Drawer>
  )
}

export default InfoDrawer
