import { Grid } from "@mui/material"
import Link from "next/link"
import { styles } from "./styles"
import { externalLinks } from "../../../utils/constants"
import { Roboto } from "next/font/google"

const roboto = Roboto({ weight: "300", display: "swap", subsets: ["latin"] })

const Navbar = () => {
  return (
    <Grid
      container
      sx={{
        ...styles.nav,
        border: "0.5px solid #ffffffc6",
        borderRight: "none",
        borderLeft: "none",
      }}
      className={"navWrapper " + roboto.className}
      id="navWrapper"
    >
      <Grid item sm={4} xs={6} sx={styles.navbarItems}>
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          Colorem
        </Link>
      </Grid>
      <Grid item sm={4} xs={6} textAlign={"right"} sx={styles.navbarItems}>
        <Link href="/about" style={{ textDecoration: "none" }}>
          About
        </Link>
      </Grid>
      <Grid
        item
        sm={4}
        sx={{
          textAlign: "right",
          display: {
            xs: "none",
            sm: "inline",
          },
          ...styles.navbarItems,
        }}
      >
        <Link
          href={externalLinks.GITHUB}
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          Github
        </Link>
      </Grid>
    </Grid>
  )
}

export default Navbar
