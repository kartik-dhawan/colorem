import { Box } from "@mui/material"
import { motion } from "framer-motion"
import { ChildrenType } from "../../utils/interfaces"

const AboutPageContent = ({ children }: ChildrenType) => {
  const variant = {
    before: { x: "100%" },
    after: { x: 0 },
  }

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
            backgroundColor: "#c4c4c4",
            minHeight: "100vh",
            maxHeight: "-webkit-fill-available",
            padding: {
              xs: "20px 30px",
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
