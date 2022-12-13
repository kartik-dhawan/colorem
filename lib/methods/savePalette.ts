import axios from "axios"

// runs colormind api and returns a promise
export const getColormindPalette = async () => {
  const res = await axios.post(
    "http://colormind.io/api/",
    { model: "default" },
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
