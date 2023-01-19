import { Grid } from "@mui/material"
import Link from "next/link"
import { styles } from "./styles"
import { externalLinks } from "../../../utils/constants"

const Navbar = () => {
  return (
    <Grid container sx={styles.nav} className="navWrapper" id="navWrapper">
      <Grid item sm={4} xs={6} sx={styles.navbarItems}>
        <Link href="/" style={{ textDecoration: "none" }}>
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
