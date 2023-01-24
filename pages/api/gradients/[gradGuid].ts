import { NextApiRequest, NextApiResponse } from "next"
import { getGradientByGuid } from "../../../lib/methods/gradients/getGradients"
import { responseTexts } from "../../../lib/utils/constants"

const individualGradient = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { gradGuid } = req.query

  if (req.method === "POST") {
    try {
      const gradient = await getGradientByGuid(res, gradGuid)
      res.status(200).json(gradient)
    } catch (error) {
      res.status(501).json({
        message: responseTexts.COULD_NOT_COMPLETE.PUT,
        error,
      })
    }
  } else {
    res.status(403).json(responseTexts.TRY_DIFFERENT_REQUEST)
  }
}

export default individualGradient
