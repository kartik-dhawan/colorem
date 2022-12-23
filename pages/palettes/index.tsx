import { Box } from "@mui/material"
import axios from "axios"
import PaletteSection from "../../components/PaletteSection"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { updatePalettes } from "../../redux/slices/paletteSlice"
import { PaletteType } from "../../redux/constants/stateTypes"

export const getStaticProps = async () => {
  const response = await axios.get("http://localhost:3000/api/palettes")
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
    console.log("Saved data in redux")
  }, [data])

  return (
    <Box>
      <PaletteSection />
    </Box>
  )
}

export default Palettes
