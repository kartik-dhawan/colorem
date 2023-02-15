import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material"
import { Roboto_Condensed, Anton } from "@next/font/google"
import MenuIcon from "@mui/icons-material/Menu"
import { useId } from "react"
import { styles } from "./styles"
import { useSelector } from "react-redux"
import { RootType } from "../../redux/constants/stateTypes"
import { AboutNavItem } from "../../utils/interfaces"
import Link from "next/link"

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" })

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: "300",
  display: "swap",
})

const AboutPageNav = () => {
  const aid = "aboutSideNav"
  const id = useId()

  const { aboutPageNavItems } = useSelector(
    (state: RootType) => state.contentSlice
  )

  return (
    <Box sx={styles.aboutSideNavWrapper} className={aid + "Wrapper"}>
      <IconButton
        className={aid + "MenuButton"}
        id={aid + "MenuButton"}
        sx={styles.aboutSideNavMenuButton}
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
        {aboutPageNavItems?.map((item: AboutNavItem) => {
          return (
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
          )
        })}
      </List>
    </Box>
  )
}

export default AboutPageNav
