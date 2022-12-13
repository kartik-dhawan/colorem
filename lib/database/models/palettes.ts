// imports 'palettes' collection from mongo db atlas
import mongoose from "mongoose"
const Schema = mongoose.Schema

const PaletteSchema = new Schema(
  {
    result: [[Number]],
  },
  { collection: "palettes" }
)

export default mongoose.models.palettes ||
  mongoose.model("palettes", PaletteSchema)
