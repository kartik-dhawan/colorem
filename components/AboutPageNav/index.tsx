import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material"
import { Roboto_Condensed, Anton } from "@next/font/google"
import MenuIcon from "@mui/icons-material/Menu"
import { useCallback, useId, useState } from "react"
import { styles } from "./styles"
import { useSelector } from "react-redux"
import { RootType } from "../../redux/constants/stateTypes"
import { AboutNavItem, AnimationVariant } from "../../utils/interfaces"
import Link from "next/link"
import SideNav from "../SideNav"
import { useRouter } from "next/router"
// EJS syntax for importing not working with framer motion in react so used CJS
const { motion } = require("framer-motion") // eslint-disable-line

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" })

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: "300",
  display: "swap",
})

const AboutPageNav = () => {
  const aid = "aboutSideNav"
  const id = useId()
  const router = useRouter()

  let variant: AnimationVariant
  let buttonVariant: AnimationVariant

  if (router.asPath === "/about") {
    variant = {
      before: { opacity: 0, x: -50 },
      after: { opacity: 1, x: 0 },
    }
    buttonVariant = {
      before: { opacity: 0, y: -10 },
      after: { opacity: 1, y: 0 },
    }
  } else {
    variant = {
      before: { opacity: 1, x: 0 },
      after: { opacity: 1, x: 0 },
    }
    buttonVariant = {
      before: { opacity: 1, x: 0 },
      after: { opacity: 1, x: 0 },
    }
  }

  const { aboutPageNavItems } = useSelector(
    (state: RootType) => state.contentSlice
  )

  const [sideNavToggle, setSideNavToggle] = useState<boolean>(false)

  const homeButtonHandler = useCallback(() => {
    router.push("/dashboard")
  }, [])

  const backButtonHandler = useCallback(() => {
    router.push("/about")
  }, [])

  return (
    <Box sx={styles.aboutSideNavWrapper} className={aid + "Wrapper"}>
      <SideNav
        sideNavToggle={sideNavToggle}
        setSideNavToggle={setSideNavToggle}
      />
      <IconButton
        className={aid + "MenuButton"}
        id={aid + "MenuButton"}
        sx={styles.aboutSideNavMenuButton}
        onClick={() => {
          setSideNavToggle(true)
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        className={aid + "TitleText " + roboto_condensed.className}
        id={aid + "TitleText"}
        sx={styles.aboutSideNavTitleText}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro eius
        deleniti voluptates sit excepturi vel. Odit dignissimos consectetur
        sunt. Praesentium culpa dolores deleniti.
      </Typography>
      <List
        className={aid + "ListWrapper"}
        id={aid + "ListWrapper"}
        disablePadding
        sx={{
          margin: "30px 0px",
        }}
      >
        <motion.div transition={{ delay: 0.5 }}>
          {aboutPageNavItems?.map((item: AboutNavItem) => {
            return (
              <motion.div
                initial={variant.before}
                animate={variant.after}
                transition={{ duration: 0.7, delay: item.id * 0.17 }}
                key={item.id}
              >
                <ListItemButton
                  disableGutters
                  key={item.id}
                  disableRipple
                  className={aid + "ListItemWrapper"}
                  id={aid + "ListItemWrapper" + id}
                  sx={styles.aboutSideNavListItemWrapper}
                >
                  <Link href={`/about/${item.route}`}>
                    <ListItem
                      className={aid + "ListItem " + anton.className}
                      id={aid + "ListItem" + id}
                      sx={styles.aboutSideNavListItem}
                    >
                      {item.title}
                    </ListItem>
                  </Link>
                </ListItemButton>
              </motion.div>
            )
          })}
        </motion.div>
      </List>
      <motion.div
        initial={buttonVariant.before}
        animate={buttonVariant.after}
        transition={{ duration: 0.7, delay: 1.3 }}
      >
        <ButtonGroup sx={styles.aboutSideNavButtonGroup}>
          <Button
            sx={{
              ...styles.aboutSideNavHomeButton,
              ...styles.aboutSideNavButtonsCommon,
            }}
            onClick={homeButtonHandler}
          >
            Home
          </Button>
          {router.asPath !== "/about" && (
            <Button
              sx={{
                ...styles.aboutSideNavBackButton,
                ...styles.aboutSideNavButtonsCommon,
              }}
              variant="contained"
              onClick={backButtonHandler}
            >
              Back
            </Button>
          )}
        </ButtonGroup>
      </motion.div>
    </Box>
  )
}

export default AboutPageNav
