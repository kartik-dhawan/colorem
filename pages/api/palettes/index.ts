// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import connectDatabase from "../../../lib/database/connect"
import { getAllColorPalettes } from "../../../lib/methods/getPalettes"

const getPalettes = async (req: NextApiRequest, res: NextApiResponse) => {
  // using POST method even when we just need GET because Next.js doesn't
  // hide our API end points after deployment.
  // ex: colorem.vercel.app/api/palettes would still return the api response
  // when we hit it anywhere, hence exposing our APIs
  if (req.method === "POST") {
    // fetches all the color palettes from the DB
    getAllColorPalettes()
      .then((response) => {
        res.status(200).json(response)
      })
      .catch((err) => {
        console.log({
          message: "Error fetching records.",
          error: err,
        })
        res.status(501).json("Could not fetch color palettes from MongoDB")
      })
  } else {
    res
      .status(403)
      .send("Cannot access this api. Try sending a POST request to this API.")
  }
}

export default connectDatabase(getPalettes)
