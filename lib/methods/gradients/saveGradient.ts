import { v4 as uuidv4 } from "uuid"
import { NextApiRequest, NextApiResponse } from "next"
import colorGradient from "../../database/models/colorGradient"
import { GradientBody } from "../../utils/interfaces"
import { responseTexts, SaveGradientBodyKeys } from "../../utils/constants"
import { areArraysEqual, logger } from ".."
import { getGradientByGuid } from "./getGradients"

/**
 *
 * @param {GradientBody} body
 * @param {NextApiResponse} res
 * @returns
 */
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

/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @param {string | string[] | undefined} gradGuid
 */
export const updateGradientLikesByGuid = async (
  req: NextApiRequest,
  res: NextApiResponse,
  gradGuid: string | string[] | undefined
) => {
  const gradient = await getGradientByGuid(res, gradGuid)

  /**
   * returns a generic response if no gradient with that Guid is found
   */
  if (!gradient) {
    res.status(200).json({ message: responseTexts.GRADIENT_NOT_FOUND })
  }

  /*
   * filter on the basis of which the gradient would be searched and then updated
   */
  const filter = {
    gradientGuid: gradGuid,
  }

  /**
   * update object contains the key value pair of the items to be added/updated
   */
  let update
  if (req.body?.like === true) {
    // adds a like count
    update = {
      likes: gradient?.likes + 1,
    }
  } else if (req.body?.like === false) {
    // subtracts a like count
    update = {
      likes: gradient?.likes && gradient?.likes - 1,
    }
  } else {
    res.status(200).json({ message: responseTexts.BODY_NOT_PRESENT })
  }

  /**
   * final updated palette after increasing or decreasing the like count
   */
  const updatedGradient = await colorGradient.findOneAndUpdate(filter, update, {
    new: true, // added so as to return the new updated object after the process
  })

  return updatedGradient
}
