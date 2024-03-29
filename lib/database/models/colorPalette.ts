// imports 'colorPalettes' collection from mongo db atlas
import mongoose from "mongoose"
const Schema = mongoose.Schema

const PaletteSchema = new Schema(
  {
    hex: [String],
    name: String,
    paletteGuid: String,
    rgb: [[Number]],
    model: String,
    likes: Number,
  },
  { collection: "colorPalette" }
)

export default mongoose.models.colorPalette ||
  mongoose.model("colorPalette", PaletteSchema)
