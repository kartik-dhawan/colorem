import { Box, Button } from "@mui/material"
// EJS syntax for importing not working with framer motion in react so used CJS
const { motion } = require("framer-motion") // eslint-disable-line

interface SideNavProps {
  sideNavToggle: boolean
  setSideNavToggle: any
}

const SideNav = ({ sideNavToggle, setSideNavToggle }: SideNavProps) => {
  const variants = {
    open: { opacity: 1, display: "flex" },
    closed: { opacity: 0, display: "none" },
  }

  return (
    <motion.div
      className="motionWrapper"
      variants={variants}
      animate={sideNavToggle ? "open" : "closed"}
      transition={{
        type: "spring",
        stiffness: 50,
        x: { duration: 0.4 },
      }}
    >
      <Box>
        <Button
          variant="contained"
          onClick={() => {
            setSideNavToggle(!sideNavToggle)
            localStorage.setItem("sideNavToggle", `${!sideNavToggle}`)
          }}
        >
          Close
        </Button>
      </Box>
    </motion.div>
  )
}
export default SideNav
