import colorPalette from "../database/models/colorPalette"
import { FinalPaletteType } from "../utils/interfaces"

// this function returns a promise which further consists the response.
export const getAllColorPalettes: () => Promise<
  FinalPaletteType[]
> = async () => {
  // .find() finds all the records from the collection
  return await colorPalette.find()
}
