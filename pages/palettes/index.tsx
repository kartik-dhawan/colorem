import { Box } from "@mui/material"
import axios from "axios"
import PaletteSection from "../../components/PaletteSection"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { updatePalettes } from "../../redux/slices/paletteSlice"
import { PaletteType } from "../../redux/constants/stateTypes"
import { LOCAL_URL } from "../../utils/constants"
import { client } from "../../utils/contentful/config"
import { updateContent } from "../../redux/slices/contentSlice"

export const getStaticProps = async () => {
  const response = await axios.get(LOCAL_URL + "/api/palettes")
  const contentResponse = await client.getEntries({
    content_type: "coloremDashboard", // eslint-disable-line
  })

  return {
    props: {
      data: response?.data,
      contentData: contentResponse?.items[0]?.fields,
    },
  }
}

const Palettes = ({ data, contentData }: PaletteType) => {
  const dispatch = useDispatch()

  useEffect(() => {
    // saves the palettes in redux store.
    dispatch(updatePalettes(data))
    dispatch(updateContent(contentData))
  }, [data])

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
      }}
    >
      <PaletteSection />
    </Box>
  )
}

export default Palettes
