// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { v4 as uuidv4 } from "uuid"
import randomWords from "random-words"
import type { NextApiRequest, NextApiResponse } from "next"
import connectDatabase from "../../../lib/database/connect"
import {
  getColormindPalette,
  rgbArrayToHex,
} from "../../../lib/methods/palettes/savePalette"
import {
  FinalPaletteType,
  RandomColormindModelType,
} from "../../../lib/utils/interfaces"
import colorPalette from "../../../lib/database/models/colorPalette"
import { getColormindModels } from "../../../lib/methods/palettes/getPalettes"
import { logger } from "../../../lib/methods"
import { responseTexts } from "../../../lib/utils/constants"

const savePalette = async (req: NextApiRequest, res: NextApiResponse) => {
  // gets a list of available models
  const colormindModels = await getColormindModels()

  // gets a random colormind model-type to fetch a random palette
  const getRandomColormindModel: RandomColormindModelType = () => {
    return colormindModels.result[Math.floor(Math.random() * 6)]
  }

  // using POST method even when we just need GET because Next.js doesn't
  // hide our API end points after deployment.
  // ex: colorem.vercel.app/api/palettes would still return the api response
  // when we hit it anywhere, hence exposing our APIs
  if (req.method === "POST") {
    const randomModel = getRandomColormindModel()
    return await getColormindPalette(randomModel)
      .then((response) => {
        // gets array of colors in hex-code
        const paletteInHexCode = rgbArrayToHex(response.result)

        const paletteResponse: FinalPaletteType = {
          paletteGuid: uuidv4(),
          name: randomWords({ exactly: 1, wordsPerString: 2 })[0],
          hex: paletteInHexCode,
          rgb: response.result,
          model: randomModel,
          likes: 0,
        }

        // creates an instance of the schema
        const palette = new colorPalette(paletteResponse)

        // saves that instance into the DB
        palette
          .save()
          .then(() => {
            // sends the palette as a response to the API if saved
            logger("============= Saved the palette to DB =============")
            res.status(200).json(paletteResponse)
          })
          .catch(() => {
            // else sends the error response to the API
            res.status(501).json(responseTexts.COULD_NOT_COMPLETE.MONGODB_SAVE)
          })
      })
      .catch((err) => {
        res.status(401).json({
          message: responseTexts.COULD_NOT_COMPLETE.COLORMIND,
          err,
        })
      })
  } else {
    res.status(403).json(responseTexts.TRY_DIFFERENT_REQUEST)
  }
}

export default connectDatabase(savePalette)
