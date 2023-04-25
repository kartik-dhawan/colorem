import { Box } from "@mui/material"
import Head from "next/head"
import Navbar from "./Navbar/Navbar"
import Footer from "./Footer/index"
import { ChildrenType } from "../../utils/interfaces"
import { useRouter } from "next/router"
import { useEffect } from "react"

const styles = {
  LayoutWrapper: {
    margin: {
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
  useEffect(() => {
    document.cookie = `page-route=${router.asPath}`
  }, [])

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
      <Footer />
    </>
  )
}

export default Layout
