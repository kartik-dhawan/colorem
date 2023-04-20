import mongoose, { Mongoose } from "mongoose"
// dotenvs are already loaded by next.js from .env* files

const createConnectionManager = () => {
  const current: Mongoose | null = null

  return {
    connect: async () => {
      if (current) return current
      const instance = await mongoose.connect(process.env.MONGO_URI || "")
      return instance
    },
  }
}

export const manager = createConnectionManager()
