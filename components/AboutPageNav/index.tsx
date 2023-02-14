import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material"
import { Roboto_Condensed } from "@next/font/google"
import MenuIcon from "@mui/icons-material/Menu"

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
    title: "Person behind the desk",
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
  const aid = "about"

  return (
    <Box
      sx={{
        margin: {
          xs: "24px 30px",
          sm: "30px 50px",
        },
        flex: 1,
      }}
    >
      <IconButton sx={{ color: "#c4c4c4" }}>
        <MenuIcon />
      </IconButton>
      <Typography
        sx={{ fontWeight: 300, letterSpacing: "1px", color: "#c4c4c4" }}
        className={aid + "SideNavTitleText " + roboto_condensed.className}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro eius
        deleniti voluptates sit excepturi vel. Odit dignissimos consectetur
        sunt. Praesentium culpa dolores deleniti rem totam sequi odio rerum
        veniam quaerat tenetur adipisci, amet enim!
      </Typography>
      {mockNavListData.map((item) => {
        return (
          <List key={item.id}>
            <ListItemButton>
              <ListItem>{item.title}</ListItem>
            </ListItemButton>
          </List>
        )
      })}
    </Box>
  )
}

export default AboutPageNav
