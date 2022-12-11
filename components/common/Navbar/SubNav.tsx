import { Button, Grid } from "@mui/material"
import { useState } from "react"
import { ContentfulType } from "../../../utils/interfaces"
import { styles } from "./styles"
import SideNav from "../../SideNav"

const SubNav = ({ content }: ContentfulType) => {
  const snid = "subNav"
  const [sideNavToggle, setSideNavToggle] = useState<boolean>(false)

  return (
    <Grid
      container
      sx={{
        ...styles.nav,
        margin: "25px 0px",
      }}
      className={snid + "Wrapper"}
      id={snid + "Wrapper"}
    >
      {/* positioned absolute-fixed and will cover the whole screen */}
      <SideNav
        sideNavToggle={sideNavToggle}
        setSideNavToggle={setSideNavToggle}
      />
      <Grid
        item
        xs={6}
        sm={4}
        className={snid + "Title"}
        id={snid + "Title"}
        sx={styles.subNavTitle}
      >
        {content.subnavHeader}
      </Grid>
      <Grid
        item
        xs={6}
        sm={4}
        textAlign={"right"}
        sx={{ color: "#ebe1e1" }} // text_third
        className={snid + "ChooseTheme"}
        id={snid + "ChooseTheme"}
      >
        Theme
      </Grid>
      <Grid item xs={0} sm={4} textAlign={"right"}>
        <Button
          variant="contained"
          className={snid + "GetStartBtn"}
          id={snid + "GetStartBtn"}
          sx={styles.subNavButton}
          onClick={() => {
            console.log("Toggled sidenav")
            setSideNavToggle(!sideNavToggle)
          }}
        >
          Get Started
        </Button>
      </Grid>
    </Grid>
  )
}

export default SubNav
