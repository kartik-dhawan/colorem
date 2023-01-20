import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { logger } from ".."
import colorPalette from "../../database/models/colorPalette"
import { responseTexts, URLS } from "../../utils/constants"
import { FinalPaletteType } from "../../utils/interfaces"

/**
 * this function returns a promise which further consists the response.
//  * @returns {Promise<FinalPaletteType[]>} 
 */
export const getAllColorPalettes: () => Promise<
  FinalPaletteType[]
> = async () => {
  // .find() finds all the records from the collection
  return await colorPalette.find()
}

/**
 *
 * this function fetches all colormind models in a list
 */
export const getColormindModels = async () => {
  return await axios
    .get(URLS.COLORMIND_MODELS_API)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      logger({
        message: responseTexts.COULD_NOT_COMPLETE.COLORMIND_MODEL,
        error: err,
      })
      return err
    })
}

/**
 * a function to get a palette on the basis of paletteGuid
 * @param {string | string[] | undefined} paletteGuid
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @returns
 */
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
    res.status(404).json(responseTexts.PALETTE_NOT_FOUND)
  }
}
