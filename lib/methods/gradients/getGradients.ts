import { NextApiResponse } from "next"
import colorGradient from "../../database/models/colorGradient"
import { responseTexts } from "../../utils/constants"
import { FinalGradientType } from "../../utils/interfaces"

/**
 * this function returns a promise which further consists the response.
 */
export const getAllColorGradients: () => Promise<
  FinalGradientType[]
> = async () => {
  // .find() finds all the records from the collection
  return colorGradient.find()
}

/**
 *
 * @param {string} gradientGuid
 * @returns {FinalGradientType}
 */
export const getGradientByGuid = async (
  res: NextApiResponse,
  gradientGuid: string | string[] | undefined
) => {
  if (typeof gradientGuid === "string") {
    return await colorGradient.findOne({ gradientGuid: gradientGuid })
  }
  return res.status(404).json(responseTexts.INCORRECT_GUID_TYPE)
}
