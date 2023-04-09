import { Box } from "@mui/material"
import SubNav from "../../components/common/Navbar/SubNav"
import FileSection from "../../components/FileSection"
import Essentials from "../../components/Essentials"
import FeedbackAndTeam from "../../components/FeedbackAndTeam"
import { client } from "../../utils/contentful/config"
import { ContentfulType, PaletteDataType } from "../../utils/interfaces"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateContent } from "../../redux/slices/contentSlice"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback, {
  myErrorHandler,
} from "../../components/common/ErrorFallback"
import { Roboto } from "next/font/google"
import Head from "next/head"
import useSWR from "swr"
import { API_URLS } from "../../utils/constants"
import { fetcher } from "../../utils/methods"
import { updatePalettes } from "../../redux/slices/paletteSlice"
import { logger } from "../../lib/methods"

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
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

const roboto = Roboto({ weight: "400", display: "swap", subsets: ["latin"] })

const Dashboard = ({ contentData }: ContentfulType) => {
  const dispatch = useDispatch()

  // using SWR for data fetching because when we use useEffect(), after react 18
  // it calls the function twice.
  // while using useSWR() it only gets called once, and even when we try to
  // call it again in any of the subcomponent it uses the response of its previous call
  const { data, error } = useSWR<PaletteDataType[]>(
    API_URLS.GET_ALL_PALETTES,
    fetcher
  )

  useEffect(() => {
    // if we get data on axios call, store it in redux
    dispatch(updatePalettes(data ? data : []))

    // handle the error here, set it in redux and display a generic error page.
    if (error) {
      // we need to create an error page for error condition
      logger({ error, type: "error" })
    }

    dispatch(updateContent(contentData))
  }, [data, contentData])

  const title = "Colorem"
  const description = "Permutations with colors & more."

  return (
    <Box className={roboto.className}>
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
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
        <SubNav content={contentData} />
        <FileSection />
        <FeedbackAndTeam />
        <Essentials />
      </ErrorBoundary>
    </Box>
  )
}

export default Dashboard
