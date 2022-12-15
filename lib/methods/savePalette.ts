import axios from "axios"
import { URLS } from "../utils/constants"

// runs colormind api and returns a promise
export const getColormindPalette = async (model: string) => {
  const res = await axios.post(
    URLS.COLORMIND_API,
    { model: model },
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  )
  return res.data
}

// converts an array of colors in RGB to an array of hexcodes
export const rgbArrayToHex = (palette: number[][]) => {
  const hexArray = palette.map((color) => {
    const hex = color
      .map((code) => {
        return code.toString(16).padStart(2, "0")
      })
      .join("")
    return hex
  })
  return hexArray
}
