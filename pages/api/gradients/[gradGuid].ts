import { NextApiRequest, NextApiResponse } from "next"
import { getGradientByGuid } from "../../../lib/methods/gradients/getGradients"
import { updateGradientLikesByGuid } from "../../../lib/methods/gradients/saveGradient"
import { PUT_TYPES, responseTexts } from "../../../lib/utils/constants"

const individualGradient = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { gradGuid } = req.query
  if (req.method === "PUT") {
    return req.body.type === "Like/Unlike"
      ? updateGradientLikesByGuid(req, res, gradGuid)
          .then((updatedGradient) => {
            res.status(200).json(updatedGradient)
          })
          .catch((error) => {
            res.status(501).json({
              message: responseTexts.COULD_NOT_COMPLETE.PUT,
              error,
            })
          })
      : res.status(200).json({
          message: responseTexts.SELECT_TYPE_PUT,
          types: PUT_TYPES,
        })
  } else if (req.method === "POST") {
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
    res.status(403).json({ message: responseTexts.TRY_DIFFERENT_REQUEST })
  }
}

export default individualGradient
