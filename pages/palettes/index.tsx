import { Box } from "@mui/material"
import axios from "axios"
import PaletteSection from "../../components/PaletteSection"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { updatePalettes } from "../../redux/slices/paletteSlice"
import { PaletteType } from "../../redux/constants/stateTypes"
import { LOCAL_URL } from "../../utils/constants"

export const getStaticProps = async () => {
  const response = await axios.get(LOCAL_URL + "/api/palettes")
  return {
    props: {
      data: response?.data,
    },
  }
}

const Palettes = ({ data }: PaletteType) => {
  const dispatch = useDispatch()

  useEffect(() => {
    // saves the palettes in redux store.
    dispatch(updatePalettes(data))
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
