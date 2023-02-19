import { Box } from "@mui/material"
import { motion } from "framer-motion"
import { useRouter } from "next/router"

const AboutPageContent = () => {
  const router = useRouter()

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
              xs: "20px 54px",
              sm: "20px 74px",
              md: "20px 82px",
              lg: "48px 32px",
            },
            color: "#111",
            fontWeight: 400,
          }}
        >
          {router.asPath}
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum saepe
            porro perferendis obcaecati quas, natus, fugit vero explicabo
            debitis atque dolore repellat fuga quibusdam quaerat ab, quia ipsam
            suscipit libero blanditiis magni ratione aperiam consequatur
            incidunt voluptas. Voluptas saepe magnam dolorem nisi? Quisquam sint
            laborum consequuntur totam dolorem maiores necessitatibus.
          </p>
        </Box>
      </motion.div>
    </Box>
  )
}

export default AboutPageContent
