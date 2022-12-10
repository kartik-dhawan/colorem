import { configureStore } from "@reduxjs/toolkit"
import contentSlice from "../slices/contentSlice"

const store = configureStore({
  reducer: {
    contentSlice,
  },
})

export default store
