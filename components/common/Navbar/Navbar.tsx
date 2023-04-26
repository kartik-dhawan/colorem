import { Grid } from "@mui/material"
import Link from "next/link"
import { styles } from "./styles"
import { Roboto } from "next/font/google"
import { useSelector } from "react-redux"
import { RootType } from "../../../redux/constants/stateTypes"

const roboto = Roboto({ weight: "300", display: "swap", subsets: ["latin"] })

const Navbar = () => {
  const { isAuthenticated } = useSelector((state: RootType) => state.authSlice)

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
      <Grid
        item
        sm={4}
        textAlign={"right"}
        sx={{
          display: {
            xs: "none",
            sm: "inline",
          },
          ...styles.navbarItems,
        }}
      >
        <Link href="/about" style={{ textDecoration: "none" }}>
          About
        </Link>
      </Grid>
      <Grid
        item
        sm={4}
        xs={6}
        sx={{
          textAlign: "right",
          ...styles.navbarItems,
        }}
      >
        <Link
          href={isAuthenticated ? "/logout" : "/login"}
          style={{ textDecoration: "none" }}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </Link>
      </Grid>
    </Grid>
  )
}

export default Navbar
