import { Box, Button, Drawer } from "@mui/material"
import Link from "next/link"
import { Dispatch, SetStateAction, useCallback } from "react"
import { useSelector } from "react-redux"
import { RootType } from "../../redux/constants/stateTypes"
import { SideNavItemsType } from "../../utils/interfaces"
import { styles } from "./styles/styles"
// EJS syntax for importing not working with framer motion in react so used CJS
const { motion } = require("framer-motion") // eslint-disable-line

interface SideNavProps {
  sideNavToggle: boolean
  setSideNavToggle: Dispatch<SetStateAction<boolean>>
}

const SideNav = ({ sideNavToggle, setSideNavToggle }: SideNavProps) => {
  const { sideNavigationItems } = useSelector(
    (state: RootType) => state.contentSlice.data
  )

  const variant = {
    before: { opacity: 0, x: -50 },
    after: { opacity: 1, x: 0 },
  }

  const sid = "sideNav"

  const sideNavCloseHandler = useCallback(() => {
    setSideNavToggle(false)
  }, [])

  return (
    <Drawer
      anchor={"right"}
      open={sideNavToggle}
      onClose={sideNavCloseHandler}
      className={sid + "Drawer"}
      id={sid + "Drawer"}
      elevation={2}
      transitionDuration={400}
      sx={styles.sideNavDrawer}
    >
      <Box
        className={sid + "Wrapper"}
        id={sid + "Wrapper"}
        sx={styles.sideNavWrapper}
      >
        <motion.div
          className={sid + "LinksContainer"}
          id={sid + "LinksContainer"}
          transition={{ delay: 0.5 }}
        >
          {sideNavigationItems?.map((item: SideNavItemsType) => {
            return (
              <motion.div
                initial={variant.before}
                animate={variant.after}
                transition={{ duration: 0.7, delay: item.id * 0.17 }}
                key={item.id}
                className={sid + "LinkItem"}
                id={sid + "LinkItem_" + item.id}
              >
                <Link
                  href={item.link}
                  className={sid + "Link"}
                  id={sid + "Link" + item.id}
                >
                  {item.title}
                  <div
                    className={sid + "ItemBody"}
                    id={sid + "ItemBody_" + item.id}
                  >
                    {item.body}
                  </div>
                </Link>
                <div
                  className={sid + "LinkOverlay"}
                  id={sid + "LinkOverlay" + item.id}
                />
              </motion.div>
            )
          })}
        </motion.div>
        <Button
          variant="contained"
          onClick={() => {
            setSideNavToggle(!sideNavToggle)
            localStorage.setItem("sideNavToggle", `${!sideNavToggle}`)
          }}
          className={sid + "CloseBtn"}
          id={sid + "CloseBtn"}
          sx={styles.sideNavCloseBtn}
        >
          Close
        </Button>
      </Box>
    </Drawer>
  )
}
export default SideNav
