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
import MetaData from "../../components/common/MetaData"

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

  return (
    <>
      <MetaData
        title="Colorem | Gradients"
        description="Browse through blended color combinations & more."
      />
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
        <GradientSection />
      </ErrorBoundary>
    </>
  )
}

export default Gradients
