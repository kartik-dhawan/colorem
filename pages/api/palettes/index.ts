// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import connectDatabase from "../../../lib/database/connect"
// import palettes from "../../../lib/database/models/palettes"

const getAllPalettesFromMongo = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    // const allColorPalettes = await palettes.find()
    res.status(200).json("All Color Palettes")
  } else {
    res.status(200).send("Cannot access this api.")
  }
}

export default connectDatabase(getAllPalettesFromMongo)
