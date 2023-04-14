import { Box } from "@mui/material"
import PaletteSection from "../../components/PaletteSection"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { updatePalettes } from "../../redux/slices/paletteSlice"
import { client } from "../../utils/contentful/config"
import { updateContent } from "../../redux/slices/contentSlice"
import { PalettesPage } from "../../utils/interfaces"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback, {
  myErrorHandler,
} from "../../components/common/ErrorFallback"
import { Roboto } from "next/font/google"
import Head from "next/head"
import { manager } from "../../lib/database/connectionManager"
import { getAllColorPalettes } from "../../lib/methods/palettes/getPalettes"

export const getServerSideProps = async () => {
  const contentResponse = await client.getEntries({
    content_type: "coloremDashboard", // eslint-disable-line
  })

  // need to connect DB again inside getStaticProps - else build will fail (specific to this project)
  manager.connect()

  /**
   *  fetches data directly from the database
   *  without involving calling the API
   * */
  const palettes = await getAllColorPalettes()

  return {
    props: {
      contentData: contentResponse?.items[0]?.fields,
      palettes: JSON.parse(JSON.stringify(palettes)),
    },
  }
}

const roboto = Roboto({ display: "swap", weight: "300", subsets: ["latin"] })

const Palettes = ({ contentData, palettes }: PalettesPage) => {
  const dispatch = useDispatch()

  useEffect(() => {
    // if we get data on axios call, store it in redux
    dispatch(updatePalettes(palettes))

    // storing contentful data in redux for this page
    dispatch(updateContent(contentData))
  })

  const title = "Colorem | Palettes"
  const description =
    "Browse through various permutations colors to pick best for your theme."

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
          content={"https:" + contentData.defaultMetaImage?.fields.file.url}
        />
        <meta property="og:site_name" content="colorem.vercel.app" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={"https:" + contentData.defaultMetaImage?.fields.file.url}
        />
      </Head>
      <Box
        sx={{
          flex: 1,
          display: "flex",
        }}
        className={roboto.className}
      >
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={myErrorHandler}
        >
          <PaletteSection />
        </ErrorBoundary>
      </Box>
    </>
  )
}

export default Palettes
