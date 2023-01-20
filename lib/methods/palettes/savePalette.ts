import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import colorPalette from "../../database/models/colorPalette"
import { responseTexts, URLS } from "../../utils/constants"
import { getPaletteByGuid } from "./getPalettes"

/**
 * runs colormind api and returns a promise
 * @param {string} model
 * @returns
 */
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

/**
 * converts an array of colors in RGB to an array of hexcodes
 * @param {number[][]} palette
 * @returns
 */
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

/**
 * updates palettes likes
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @param {string | string[] | undefined} paletteGuid
 * @returns
 */
export const updatePaletteByGuid = async (
  req: NextApiRequest,
  res: NextApiResponse,
  paletteGuid: string | string[] | undefined
) => {
  // gets the palette matching the GUID from URL
  const palette = await getPaletteByGuid(paletteGuid, req, res)

  // returns a generic response if no palette with that Guid is found
  if (!palette) {
    res.status(200).json(responseTexts.PALETTE_NOT_FOUND)
  }

  // filter on the basis of which the palette would be searched and then updated
  const filter = {
    paletteGuid: paletteGuid,
  }

  // update object contains the key value pair of the items to be added/updated
  let update
  if (req.body.like === true) {
    // adds a like count
    update = {
      likes: palette?.likes ? palette?.likes + 1 : 1,
    }
  } else if (req.body.like === false) {
    // subtracts a like count
    update = {
      likes: palette?.likes && palette?.likes - 1,
    }
  } else {
    res.status(200).json(responseTexts.BODY_NOT_PRESENT)
  }

  // final updated palette after increasing or decreasing the like count
  const updatedPalette = await colorPalette.findOneAndUpdate(filter, update, {
    new: true, // added so as to return the new updated object after the process
  })

  return updatedPalette
}
