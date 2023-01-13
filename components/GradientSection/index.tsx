import * as React from "react"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import { useState } from "react"
import { styles } from "./styles"

const GradientSection = () => {
  const gid = "gradientSection"

  const [value, setValue] = useState("1")

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{ width: "100%", typography: "body1" }}
      className={gid + "Wrapper"}
      id={gid + "Wrapper"}
    >
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
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
              disabled
              disableRipple
            />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          className={gid + "ColorsTabBody"}
          id={gid + "ColorsTabBody"}
        >
          Item One Body
        </TabPanel>
        <TabPanel
          value="2"
          className={gid + "CreateTabBody"}
          id={gid + "CreateTabBody"}
        >
          Item Two Body
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default GradientSection
