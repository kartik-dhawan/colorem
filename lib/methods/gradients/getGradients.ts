import colorGradient from "../../database/models/colorGradient"
import { FinalGradientType } from "../../utils/interfaces"

// this function returns a promise which further consists the response.
export const getAllColorGradients: (
  offset?: number, // eslint-disable-line
  limit?: number // eslint-disable-line
) => Promise<FinalGradientType[]> = async (offset?: number, limit?: number) => {
  // .find() finds all the records from the collection
  if (limit && offset === 0) {
    return (await colorGradient.find().limit(limit)).reverse()
  }
  return offset && limit
    ? (await colorGradient.find().skip(offset).limit(limit)).reverse()
    : (await colorGradient.find()).reverse()
}
