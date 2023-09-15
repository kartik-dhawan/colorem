import { useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useDispatch } from "react-redux"
import ErrorFallback, {
  myErrorHandler,
} from "../../components/common/ErrorFallback"
import GradientSection from "../../components/GradientSection"
import { updateContent } from "../../redux/slices/contentSlice"
import { client } from "../../utils/contentful/config"
import { GradientsPage } from "../../utils/interfaces"
import {
  updateGradientsData,
  updateLoadingStatus,
} from "../../redux/slices/gradientSlice"
import Head from "next/head"
import { getAllColorGradients } from "../../lib/methods/gradients/getGradients"
import { manager } from "../../lib/database/connectionManager"
import Script from "next/script"

export const getServerSideProps = async () => {
  const contentResponse = await client.getEntries({
    content_type: "coloremDashboard", // eslint-disable-line
  })

  // need to connect DB again inside getStaticProps - else build will fail (specific to this project)
  manager.connect()

  /**
   *  fetches data directly from the database
   *  without involving calling the API
   */
  const gradients = await getAllColorGradients()

  return {
    props: {
      contentData: contentResponse?.items[0]?.fields,
      gradients: JSON.parse(JSON.stringify(gradients)),
    },
  }
}
const Gradients = ({ contentData, gradients }: GradientsPage) => {
  const dispatch = useDispatch()

  useEffect(() => {
    // if we get data from serverside props, store it in redux
    if (gradients.length !== 0) {
      dispatch(updateGradientsData(gradients))
      dispatch(updateLoadingStatus(false))
    } else {
      dispatch(updateLoadingStatus(true))
    }

    // storing contentful data in redux for this page
    dispatch(updateContent(contentData))
  }, [contentData, gradients])

  const title = "Colorem | Gradients"
  const description = "Browse through blended color combinations & more."

  return (
    <>
      <Head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.G_TAG_CODE}`}
        />
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.G_TAG_CODE}');
            `}
        </Script>
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
