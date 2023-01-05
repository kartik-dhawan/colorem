import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
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

// a function to get a palette on the basis of paletteGuid
export const getPaletteByGuid = async (
  paletteGuid: string | string[] | undefined,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const filter = {
    paletteGuid: paletteGuid,
  }

  const palette = await colorPalette.findOne(filter)

  if (palette) {
    return palette
  } else {
    res
      .status(404)
      .json(
        "Palette not found. Please verify the paletteGuid. If it is correct, the database doesn't consist of this record."
      )
  }
}
