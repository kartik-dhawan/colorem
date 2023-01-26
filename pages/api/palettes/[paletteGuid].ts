import type { NextApiRequest, NextApiResponse } from "next"
import { logger } from "../../../lib/methods"
import { getPaletteByGuid } from "../../../lib/methods/palettes/getPalettes"
import { updatePaletteLikesByGuid } from "../../../lib/methods/palettes/savePalette"
import { PUT_TYPES, responseTexts } from "../../../lib/utils/constants"

const individualPalette = async (req: NextApiRequest, res: NextApiResponse) => {
  // gets the params from URL
  const { paletteGuid } = req.query

  // PUT - api route-method tp update likes of a palette
  if (req.method === "PUT") {
    // a function to like or unlike the palette
    return req.body?.type === "Like/Unlike" // eslint-disable-line
      ? updatePaletteLikesByGuid(req, res, paletteGuid)
          .then((updatedPalette) => {
            res.status(200).json(updatedPalette)
          })
          .catch((err) => {
            logger({ error: err, type: "Error" })
            res.status(501).json({
              message: responseTexts.COULD_NOT_COMPLETE.PUT,
              err,
            })
          })
      : res.status(200).json({
          message: responseTexts.SELECT_TYPE_PUT,
          types: PUT_TYPES,
        })
  }

  // GET - api route-method to get a single palette by Guid
  else if (req.method === "POST") {
    getPaletteByGuid(paletteGuid, req, res)
      .then((palette) => {
        res.status(200).json(palette)
      })
      .catch((err) => {
        logger({ error: err, type: "Error" })
        res.status(501).json({
          message: responseTexts.COULD_NOT_COMPLETE.PUT,
          err,
        })
      })
  } else {
    res.status(403).json({ message: responseTexts.TRY_DIFFERENT_REQUEST })
  }
}

export default individualPalette
