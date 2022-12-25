import { Box } from "@mui/material"
import PaletteSection from "../../components/PaletteSection"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { updatePalettes } from "../../redux/slices/paletteSlice"
import { client } from "../../utils/contentful/config"
import { updateContent } from "../../redux/slices/contentSlice"
import { ContentfulType, PaletteDataType } from "../../utils/interfaces"
import axios from "axios"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback, {
  myErrorHandler,
} from "../../components/common/ErrorFallback"

export const getStaticProps = async () => {
  const contentResponse = await client.getEntries({
    content_type: "coloremDashboard", // eslint-disable-line
  })

  return {
    props: {
      contentData: contentResponse?.items[0]?.fields,
    },
    revalidate: 10 || parseInt(process.env.ISR_REVAL_TIME_DASHBOARD || "10"), // In seconds
  }
}

const Palettes = ({ contentData }: ContentfulType) => {
  const dispatch = useDispatch()
  const [palettesData, setPalettesData] = useState<PaletteDataType[]>([]) // eslint-disable-line

  useEffect(() => {
    axios.post("/api/palettes").then((res) => {
      setPalettesData(res.data)
      // saves the palettes in redux store.
      dispatch(updatePalettes(res.data))
    })
    dispatch(updateContent(contentData))
  }, [])

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
      }}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
        <PaletteSection />
      </ErrorBoundary>
    </Box>
  )
}

export default Palettes
