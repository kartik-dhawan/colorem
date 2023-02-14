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

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" })

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: "300",
  display: "swap",
})

const mockNavListData = [
  {
    id: 1,
    title: "About Project",
  },
  {
    id: 2,
    title: "Behind the desk",
  },
  {
    id: 3,
    title: "Tech nuggets",
  },
  {
    id: 4,
    title: "The Colorem team",
  },
  {
    id: 5,
    title: "More",
  },
]

const AboutPageNav = () => {
  const aid = "aboutSideNav"
  const id = useId()

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
        {mockNavListData.map((item) => {
          return (
            <ListItemButton
              disableGutters
              key={item.id}
              disableRipple
              className={aid + "ListItemWrapper"}
              id={aid + "ListItemWrapper" + id}
              sx={styles.aboutSideNavListItemWrapper}
            >
              <ListItem
                className={aid + "ListItem " + anton.className}
                id={aid + "ListItem" + id}
                sx={styles.aboutSideNavListItem}
              >
                {item.title}
              </ListItem>
            </ListItemButton>
          )
        })}
      </List>
    </Box>
  )
}

export default AboutPageNav
