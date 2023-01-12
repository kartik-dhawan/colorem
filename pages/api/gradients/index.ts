import connectDatabase from "../../../lib/database/connect"
import { NextApiRequest, NextApiResponse } from "next"
import { getAllColorGradients } from "../../../lib/methods/gradients/getGradients"
import { responseTexts } from "../../../lib/utils/constants"

const getGradients = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // fetches all the color gradients from the DB
    return getAllColorGradients()
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
