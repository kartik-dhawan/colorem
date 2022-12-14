// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import connectDatabase from "../../../lib/database/connect"
import colorPalette from "../../../lib/database/models/colorPalette"

const getAllPalettesFromMongo = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const allColorPalettes = await colorPalette.find()
    res.status(200).json(allColorPalettes)
  } else {
    res
      .status(403)
      .send("Cannot access this api. Try sending a POST request to this API.")
  }
}

export default connectDatabase(getAllPalettesFromMongo)
