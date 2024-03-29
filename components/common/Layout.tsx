import { Box } from "@mui/material"
import Head from "next/head"
import Navbar from "./Navbar/Navbar"
import Footer from "./Footer/index"
import { ChildrenType } from "../../utils/interfaces"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { updateAuthStatus } from "../../redux/slices/authSlice"
import { isTokenValid } from "../../utils/methods"
import { useDispatch } from "react-redux"

const styles = {
  LayoutWrapper: {
    boxSizing: "border-box",
    padding: {
      xs: "24px 30px",
      sm: "30px 50px",
    },
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
}

const Layout = ({ children }: ChildrenType) => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    document.cookie = `page-route=${router.asPath}`
  }, [])

  const token: string =
    (typeof window !== "undefined" && localStorage.getItem("firebase-token")) ||
    ""

  /**
   * stores the auth status in store (false if token has expired)
   */
  const { isValid } = isTokenValid(token)

  useEffect(() => {
    dispatch(updateAuthStatus(isValid))
    // clears cookies & local storage then redirects user to login page once the session expires
    if (!isValid) {
      typeof window !== "undefined" && localStorage.removeItem("firebase-token") // eslint-disable-line
      document.cookie = "firebase-token='';"
    }
    // to make the token consistent
    if (token === "") {
      document.cookie = "firebase-token='';"
      router.asPath === "/admin" && router.replace("/login") // eslint-disable-line
    }
  }, [router.asPath, isValid, token])

  return (
    <>
      <Box sx={styles.LayoutWrapper}>
        <Head>
          <title>Colorem</title>
          <meta name="description" content="The permutations of colors." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        {children}
      </Box>
      {router.asPath !== "/logout" && <Footer />}
    </>
  )
}

export default Layout
