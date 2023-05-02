import { Button, Grid, IconButton } from "@mui/material"
import { useState } from "react"
import { ContentfulType } from "../../../utils/interfaces"
import { styles } from "./styles"
import SideNav from "../../SideNav"
import { Antonio } from "next/font/google"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const SubNav = ({ content }: ContentfulType) => {
  const snid = "subNav"
  const [sideNavToggle, setSideNavToggle] = useState<boolean>(false)
  const [themeToggle, setThemeToggle] = useState<boolean>(false)

  const themeToggler = () => {
    setThemeToggle(!themeToggle)
  }

  return (
    <Grid
      container
      sx={{
        ...styles.nav,
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        margin: "18px 0px 27px",
      }}
      className={snid + "Wrapper"}
      id={snid + "Wrapper"}
      data-testid={"subNavWrapper"}
    >
      {/* positioned absolute-fixed and will cover the whole screen */}
      <SideNav
        sideNavToggle={sideNavToggle}
        setSideNavToggle={setSideNavToggle}
      />
      <Grid
        item
        xs={6}
        sm={6}
        className={snid + "Title " + antonio.className}
        id={snid + "Title"}
        sx={styles.subNavTitle}
      >
        {content.subnavHeader}
      </Grid>
      <Grid
        item
        xs={6}
        sm={2}
        textAlign={"right"}
        className={snid + "ChooseTheme"}
        id={snid + "ChooseTheme"}
        sx={styles.subNavThemeIcon}
      >
        <IconButton onClick={themeToggler}>
          {themeToggle ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Grid>
      <Grid
        item
        xs={0}
        sm={4}
        sx={{
          textAlign: {
            xs: "left",
            sm: "right",
          },
        }}
      >
        <Button
          variant="contained"
          className={snid + "GetStartBtn"}
          id={snid + "GetStartBtn"}
          sx={styles.subNavButton}
          onClick={() => {
            setSideNavToggle(!sideNavToggle)
          }}
        >
          Start looking
        </Button>
      </Grid>
    </Grid>
  )
}

export default SubNav
