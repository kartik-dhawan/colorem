import { Box } from "@mui/material"
import PaletteSection from "../../components/PaletteSection"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { updatePalettes } from "../../redux/slices/paletteSlice"
import { client } from "../../utils/contentful/config"
import { updateContent } from "../../redux/slices/contentSlice"
import { ContentfulType, PaletteDataType } from "../../utils/interfaces"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback, {
  myErrorHandler,
} from "../../components/common/ErrorFallback"
import useSWR from "swr"
import { API_URLS } from "../../utils/constants"
import { logger } from "../../lib/methods"
import { fetcher } from "../../utils/methods"
import { Roboto } from "@next/font/google"

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

const roboto = Roboto({ display: "swap", weight: "300", subsets: ["latin"] })

const Palettes = ({ contentData }: ContentfulType) => {
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

    // storing contentful data in redux for this page
    dispatch(updateContent(contentData))
  })

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
      }}
      className={roboto.className}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
        <PaletteSection />
      </ErrorBoundary>
    </Box>
  )
}

export default Palettes
