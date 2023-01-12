// imports 'colorGradients' collection from mongo db atlas
import mongoose from "mongoose"
const Schema = mongoose.Schema

const GradientSchema = new Schema(
  {
    gradientGuid: String,
    name: String,
    colors: [String],
    filter: [String],
    likes: Number,
  },
  { collection: "colorGradient" }
)

export default mongoose.models.colorGradient ||
  mongoose.model("colorGradient", GradientSchema)
