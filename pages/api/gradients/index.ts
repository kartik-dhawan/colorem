import connectDatabase from "../../../lib/database/connect"
import { NextApiRequest, NextApiResponse } from "next"
import colorGradient from "../../../lib/database/models/colorGradient"

const getGradients = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const data = await colorGradient.find()
    res.json(data)
  }
}

export default connectDatabase(getGradients)
