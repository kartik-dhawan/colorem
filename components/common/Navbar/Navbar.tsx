import { Grid } from "@mui/material"
import Link from "next/link"
import { styles } from ".././styles"

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
      <Grid item sm={6} xs={6}>
        <Link href="/" style={{ textDecoration: "none" }}>
          Colorem
        </Link>
      </Grid>
      <Grid item sm={3} xs={6} textAlign={"right"}>
        <Link href="/" style={{ textDecoration: "none" }}>
          About
        </Link>
      </Grid>
      <Grid
        item
        sm={3}
        sx={{
          textAlign: "right",
          display: {
            xs: "none",
            sm: "inline",
          },
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          Github
        </Link>
      </Grid>
    </Grid>
  )
}

export default Navbar
