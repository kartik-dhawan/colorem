import { useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useDispatch } from "react-redux"
import ErrorFallback, {
  myErrorHandler,
} from "../../components/common/ErrorFallback"
import GradientSection from "../../components/GradientSection"
import { updateContent } from "../../redux/slices/contentSlice"
import { API_URLS } from "../../utils/constants"
import { client } from "../../utils/contentful/config"
import { ContentfulType, GradientDataType } from "../../utils/interfaces"
import { fetcher } from "../../utils/methods"
import useSWR from "swr"
import {
  updateGradientsData,
  updateLoadingStatus,
} from "../../redux/slices/gradientSlice"
import { logger } from "../../lib/methods"
import Head from "next/head"

export const getStaticProps = async () => {
  const contentResponse = await client.getEntries({
    content_type: "coloremDashboard", // eslint-disable-line
  })

  return {
    props: {
      contentData: contentResponse?.items[0]?.fields,
    },
    revalidate: parseInt(process.env.ISR_REVAL_TIME_DASHBOARD || "10"), // In seconds
  }
}
const Gradients = ({ contentData }: ContentfulType) => {
  const dispatch = useDispatch()

  const { data, error, isLoading } = useSWR<GradientDataType[]>(
    API_URLS ? API_URLS.GET_ALL_GRADIENTS : "",
    fetcher
  )

  useEffect(() => {
    // if we get data on axios call, store it in redux
    dispatch(updateGradientsData(data ? data : []))

    dispatch(updateLoadingStatus(isLoading))

    // handle the error here, set it in redux and display a generic error page.
    if (error) {
      // we need to create an error page for error condition
      logger({ error, type: "error" })
    }

    // storing contentful data in redux for this page
    dispatch(updateContent(contentData))
  }, [contentData, isLoading, data])

  const title = "Colorem | Gradients"
  const description = "Browse through blended color combinations & more."

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
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
        <GradientSection />
      </ErrorBoundary>
    </>
  )
}

export default Gradients
