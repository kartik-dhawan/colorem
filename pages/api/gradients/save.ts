import { NextApiRequest, NextApiResponse } from "next"
import connectDatabase from "../../../lib/database/connect"
import { saveAGradient } from "../../../lib/methods/gradients/saveGradient"
import { responseTexts } from "../../../lib/utils/constants"

const saveGradient = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return res.json(await saveAGradient(req.body, res))
  } else {
    return res.json(responseTexts.TRY_DIFFERENT_REQUEST)
  }
}

export default connectDatabase(saveGradient)
