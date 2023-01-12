import { v4 as uuidv4 } from "uuid"
import { NextApiResponse } from "next"
import colorGradient from "../../database/models/colorGradient"
import { GradientBody } from "../../utils/interfaces"
import { responseTexts, SaveGradientBodyKeys } from "../../utils/constants"
import { areArraysEqual, logger } from ".."

export const saveAGradient = async (
  body: GradientBody,
  res: NextApiResponse
) => {
  // makes ready a new gradient object to save in DB
  const newGradientObject = {
    ...body,
    gradientGuid: uuidv4(),
    likes: 0,
  }

  // checks if req.body has all the keys required
  const bodyKeys: string[] = Object.keys(body)
  const isCorrectBody: boolean = areArraysEqual(SaveGradientBodyKeys, bodyKeys)

  if (isCorrectBody) {
    // creates an instance of GradientSchema
    const gradient = new colorGradient(newGradientObject)

    // saves the new gradient into the database
    try {
      const savedGradient = await gradient.save()
      logger("============= Saved the palette to DB =============")
      res.status(200)
      return savedGradient
    } catch (error) {
      logger({ type: "error", error })
      res.status(501)
      return { errorMessage: responseTexts.COULD_NOT_COMPLETE.MONGODB_SAVE }
    }
  } else {
    // returns a generic message if all the body keys aren't passed
    res.status(501)
    return { errorMessage: responseTexts.BODY_NOT_PRESENT }
  }
}
