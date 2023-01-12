// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import connectDatabase from "../../../lib/database/connect"
import { logger } from "../../../lib/methods"
import { getAllColorPalettes } from "../../../lib/methods/palettes/getPalettes"
import { responseTexts } from "../../../lib/utils/constants"

const getPalettes = async (req: NextApiRequest, res: NextApiResponse) => {
  // using POST method even when we just need GET because Next.js doesn't
  // hide our API end points after deployment.
  // ex: colorem.vercel.app/api/palettes would still return the api response
  // when we hit it anywhere, hence exposing our APIs
  if (req.method === "POST") {
    // fetches all the color palettes from the DB
    return getAllColorPalettes()
      .then((response) => {
        res.status(200).json(response)
      })
      .catch((err) => {
        logger({
          message: "Error fetching records.",
          error: err,
        })
        res.status(501).json(responseTexts.COULD_NOT_COMPLETE.MONGODB_FETCH)
      })
  } else {
    res.status(403).send(responseTexts.TRY_DIFFERENT_REQUEST)
  }
}

export default connectDatabase(getPalettes)
