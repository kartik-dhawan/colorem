import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import { useCallback, useState } from "react"
import { styles } from "./styles"
import GradientsTab from "./GradientsTab"
import SideNav from "../SideNav"
import { IconButton, Typography } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { iconStyles } from "../PaletteSection/styles/styles"

const GradientSection = () => {
  const gid = "gradientSection"

  const [value, setValue] = useState("1")
  const [sideNavToggle, setSideNavToggle] = useState<boolean>(false)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // toggles sidenav menu
  const menuHandler = useCallback(() => {
    setSideNavToggle(!sideNavToggle)
  }, [sideNavToggle])

  return (
    <Box
      sx={{ width: "100%", typography: "body1", paddingTop: "5px" }}
      className={gid + "Wrapper"}
      id={gid + "Wrapper"}
    >
      <TabContext value={value}>
        <Box
          sx={styles.gradientSectionTabsWrapper}
          className={gid + "TabsWrapper"}
          id={gid + "TabsWrapper"}
        >
          <TabList
            onChange={handleChange}
            aria-label="gradients-page-tab"
            className={gid + "TabList"}
            id={gid + "TabList"}
          >
            <Tab
              label="Gradients"
              value="1"
              sx={styles.gradientSectionTabs}
              disableRipple
              className={gid + "ColorsTab"}
              id={gid + "ColorsTab"}
            />
            <Tab
              label="Create your own"
              value="2"
              sx={styles.gradientSectionTabs}
              className={gid + "CreateTab"}
              id={gid + "CreateTab"}
              disableRipple
            />
            <SideNav
              sideNavToggle={sideNavToggle}
              setSideNavToggle={setSideNavToggle}
            />
          </TabList>
          <IconButton
            className={gid + "MenuIcon"}
            id={gid + "MenuIcon"}
            onClick={menuHandler}
            sx={iconStyles.optionsMenuIcon}
          >
            <MenuIcon sx={{ fontsize: "26px" }} />
          </IconButton>
        </Box>
        <TabPanel
          value="1"
          className={gid + "ColorsTabBody"}
          id={gid + "ColorsTabBody"}
          sx={{
            padding: "0px",
          }}
        >
          {/* Gradients Tab Body Section */}
          <GradientsTab gid={gid} />
        </TabPanel>
        <TabPanel
          value="2"
          className={gid + "CreateTabBody"}
          id={gid + "CreateTabBody"}
        >
          <Typography sx={{ fontWeight: 300 }}>Feature coming soon.</Typography>
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default GradientSection
