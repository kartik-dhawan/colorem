import type { NextApiRequest, NextApiResponse } from "next"
import { logger } from "../../../lib/methods"
import { getPaletteByGuid } from "../../../lib/methods/getPalettes"
import { updatePaletteByGuid } from "../../../lib/methods/savePalette"

const individualPalette = async (req: NextApiRequest, res: NextApiResponse) => {
  // gets the params from URL
  const { paletteGuid } = req.query

  // PUT - api route-method tp update likes of a palette
  if (req.method === "PUT") {
    // a function to like or unlike the palette
    return req.body.type === "Like/Unlike" // eslint-disable-line
      ? updatePaletteByGuid(req, res, paletteGuid)
          .then((updatedPalette) => {
            res.status(200).json(updatedPalette)
          })
          .catch((err) => {
            logger({ error: err, type: "Error" })
            res.status(501).json({
              message: "Could not complete the PUT request.",
              err,
            })
          })
      : res.status(200).json({
          message: "Please select a type of PUT request in context to the app.",
          types: ["Like/Unlike"],
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
          message: "Could not complete the PUT request.",
          err,
        })
      })
  } else {
    res
      .status(403)
      .json("Cannot access this API. Try sending a PUT request to this API.")
  }
}

export default individualPalette
