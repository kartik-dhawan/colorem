import { Box } from "@mui/material"
import Head from "next/head"
import Navbar from "./Navbar/Navbar"

interface ChildrenType {
  children: JSX.Element
}

const Layout = ({ children }: ChildrenType) => {
  return (
    <Box
      sx={{
        margin: {
          xs: "24px 30px",
          sm: "30px 50px",
        },
      }}
    >
      <Head>
        <title>Colorem</title>
        <meta name="description" content="The permutations of colors." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {children}
    </Box>
  )
}

export default Layout
