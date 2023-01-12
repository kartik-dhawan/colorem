import colorGradient from "../../database/models/colorGradient"
import { FinalGradientType } from "../../utils/interfaces"

// this function returns a promise which further consists the response.
export const getAllColorGradients: () => Promise<
  FinalGradientType[]
> = async () => {
  // .find() finds all the records from the collection
  return colorGradient.find()
}
