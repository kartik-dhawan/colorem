import mongoose from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"

const connectDatabase =
  (handler: any) /* eslint-disable-line */ =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
      return handler(req, res)
    }
    // this line removes the deprecating warning
    mongoose.set("strictQuery", true)

    // connext with mongo
    await mongoose.connect(process.env.MONGO_URI || "")
    return handler(req, res)
  }

export default connectDatabase
