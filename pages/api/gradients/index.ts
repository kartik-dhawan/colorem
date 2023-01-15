import connectDatabase from "../../../lib/database/connect"
import { NextApiRequest, NextApiResponse } from "next"
import { getAllColorGradients } from "../../../lib/methods/gradients/getGradients"
import { responseTexts } from "../../../lib/utils/constants"

const getGradients = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // gets the URL parameters
    const { limit, offset } = req.query

    // fetches either all the color gradients or a range of gradients on the basis of the offset & limit
    return getAllColorGradients(Number(offset), Number(limit))
      .then((gradients) => {
        res.status(200).json(gradients)
      })
      .catch(() => {
        res.status(501).json(responseTexts.COULD_NOT_COMPLETE.MONGODB_FETCH)
      })
  } else {
    res.status(403).send(responseTexts.TRY_DIFFERENT_REQUEST)
  }
}

export default connectDatabase(getGradients)
