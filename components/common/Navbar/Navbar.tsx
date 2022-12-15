import { Grid } from "@mui/material"
import Link from "next/link"
import { styles } from "./styles"
import { externalLinks } from "../../../utils/constants"

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
      className="navWrapper"
      id="navWrapper"
    >
      <Grid item sm={4} xs={6}>
        <Link href="/" style={{ textDecoration: "none" }}>
          Colorem
        </Link>
      </Grid>
      <Grid item sm={4} xs={6} textAlign={"right"}>
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
