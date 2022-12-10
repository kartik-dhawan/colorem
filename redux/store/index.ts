import { configureStore } from "@reduxjs/toolkit"
import countSlice from "../slices/countSlice"

const store = configureStore({
  reducer: {
    countSlice,
  },
})

export default store
