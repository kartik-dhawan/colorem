// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { v4 as uuidv4 } from "uuid"
import randomWords from "random-words"
import type { NextApiRequest, NextApiResponse } from "next"
import connectDatabase from "../../../lib/database/connect"
import {
  getColormindPalette,
  rgbArrayToHex,
} from "../../../lib/methods/savePalette"
import {
  FinalPaletteType,
  RandomColormindModelType,
} from "../../../lib/utils/interfaces"
import colorPalette from "../../../lib/database/models/colorPalette"
import { getColormindModels } from "../../../lib/methods/getPalettes"

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
    await getColormindPalette(randomModel)
      .then((response) => {
        // gets array of colors in hex-code
        const paletteInHexCode = rgbArrayToHex(response.result)

        const paletteResponse: FinalPaletteType = {
          paletteGuid: uuidv4(),
          name: randomWords({ exactly: 1, wordsPerString: 2 })[0],
          hex: paletteInHexCode,
          rgb: response.result,
          model: randomModel,
        }

        // creates an instance of the schema
        const palette = new colorPalette(paletteResponse)

        // saves that instance into the DB
        palette
          .save()
          .then(() => {
            // sends the palette as a response to the API if saved
            console.log("============= Saved the palette to DB =============")
            res.status(200).json(paletteResponse)
          })
          .catch(() => {
            // else sends the error response to the API
            res.status(501).json("Could not save the palette to MongoDB")
          })
      })
      .catch((err) => {
        res.status(401).json({
          message: "Could not fetch the palette from ColorMind API",
          err,
        })
      })
  } else {
    res
      .status(403)
      .json("Cannot access this API. Try sending a POST request to this API.")
  }
}

export default connectDatabase(savePalette)
