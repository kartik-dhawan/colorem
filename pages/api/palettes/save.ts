// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { v4 as uuidv4 } from "uuid"
import randomWords from "random-words"
import type { NextApiRequest, NextApiResponse } from "next"
import connectDatabase from "../../../lib/database/connect"
import {
  getColormindPalette,
  rgbArrayToHex,
} from "../../../lib/methods/savePalette"
import { FinalPaletteType } from "../../../lib/utils/interfaces"

const savePalette = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await getColormindPalette().then((response) => {
      // gets array of colors in hex-code
      const paletteInHexCode = rgbArrayToHex(response.result)

      const finalPalette: FinalPaletteType = {
        paletteGuid: uuidv4(),
        name: randomWords({ exactly: 1, wordsPerString: 2 })[0],
        hex: paletteInHexCode,
        rgb: response.result,
      }

      // saves this object to MongoDB
      // ----

      // sends the response to the API
      res.status(200).json(finalPalette)
    })
  } else {
    res.status(200).json("Cannot access this API")
  }
}

export default connectDatabase(savePalette)
