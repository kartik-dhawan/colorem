import { Box } from "@mui/material"
import LoginPage from "../../components/LoginPage"
import { styles } from "../../components/LoginPage/styles"
import Head from "next/head"
import { client } from "../../utils/contentful/config"
import { ContentfulType } from "../../utils/interfaces"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { updateContent } from "../../redux/slices/contentSlice"

export const getStaticProps = async () => {
  const response = await client.getEntries({ content_type: "coloremDashboard" }) // eslint-disable-line

  return {
    props: {
      contentData: response?.items[0]?.fields,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10 || parseInt(process.env.ISR_REVAL_TIME_DASHBOARD || "10"), // In seconds
  }
}

const Login = ({ contentData }: ContentfulType) => {
  const lid = "loginPage"
  const title = "Login"
  const description =
    "Login & Browse through blended color combinations & more."

  const dispatch = useDispatch()

  useEffect(() => {
    // saves contentful data in redux store for this page
    dispatch(updateContent(contentData))
  }, [contentData])

  return (
    <>
      <Head>
        {/* Primary meta tags */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : ""}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={
            "https://images.ctfassets.net/1v98waf66sfj/3AZSHDIcX2l5wtugFxRmWn/0d56e19f5f34ca6dd7a1ff453cefdcf4/homeMetaImage.webp"
          }
        />
        <meta property="og:site_name" content="colorem.vercel.app" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={
            "https://images.ctfassets.net/1v98waf66sfj/3AZSHDIcX2l5wtugFxRmWn/0d56e19f5f34ca6dd7a1ff453cefdcf4/homeMetaImage.webp"
          }
        />
      </Head>
      <Box
        className={lid + "Wrapper"}
        id={lid + "Wrapper"}
        data-testid={lid + "Wrapper"}
        sx={styles.loginPageWrapper}
      >
        <LoginPage />
      </Box>
    </>
  )
}

export default Login
