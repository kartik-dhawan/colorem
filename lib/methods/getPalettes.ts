import axios from "axios"
import colorPalette from "../database/models/colorPalette"
import { URLS } from "../utils/constants"
import { FinalPaletteType } from "../utils/interfaces"

// this function returns a promise which further consists the response.
export const getAllColorPalettes: () => Promise<
  FinalPaletteType[]
> = async () => {
  // .find() finds all the records from the collection
  return await colorPalette.find()
}

// this function fetches all colormind models in a list
export const getColormindModels: () => Promise<any> = async () => {
  return await axios
    .get(URLS.COLORMIND_MODELS_API)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log({
        message: "Could not fetch colormind models' list.",
        error: err,
      })
      return err
    })
}
