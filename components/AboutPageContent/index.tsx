import { Box } from "@mui/material"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootType } from "../../redux/constants/stateTypes"
import { aboutSectionColorScheme } from "../../utils/constants"
import { ChildrenType } from "../../utils/interfaces"

const AboutPageContent = ({ children }: ChildrenType) => {
  const [variant, setVariant] = useState<any>({
    before: { x: 0 },
    after: { x: 0 },
  })

  const [backgroundColor, setBackgroundColor] = useState<string>("#c4c4c4")

  const selectedNavItem = useSelector(
    (state: RootType) => state.contentSlice.currentAboutContent
  )?.route

  const innerWidth = typeof window !== "undefined" && window.innerWidth

  useEffect(() => {
    if (innerWidth >= 1200) {
      setVariant({
        before: { x: "100%" },
        after: { x: 0 },
      })
    }
  }, [innerWidth])

  // sets a background color according to the color of the selected navitem
  useEffect(() => {
    aboutSectionColorScheme.navItemContentColors.forEach((color) => {
      if (color.route === selectedNavItem) {
        setBackgroundColor(color.color)
      }
    })
  }, [selectedNavItem])

  return (
    <Box
      sx={{
        flex: {
          xs: 0,
          lg: 1,
        },
      }}
      className="aboutPageContentWrapper"
      id="aboutPageContentWrapper"
    >
      <motion.div
        initial={variant.before}
        animate={variant.after}
        transition={{ duration: 0.7 }}
      >
        <Box
          sx={{
            backgroundColor: {
              xs: "#c4c4c4",
              lg: backgroundColor,
            },
            height: "max-content",
            minHeight: { lg: "100vh" },
            padding: {
              xs: "20px 40px",
              sm: "20px 74px",
              md: "20px 82px",
              lg: "48px 32px",
            },
            color: "#111",
            fontWeight: 400,
          }}
        >
          {children}
        </Box>
      </motion.div>
    </Box>
  )
}

export default AboutPageContent
