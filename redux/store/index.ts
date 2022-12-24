import { configureStore } from "@reduxjs/toolkit"
import contentSlice from "../slices/contentSlice"
import paletteSlice from "../slices/paletteSlice"

const store = configureStore({
  reducer: {
    contentSlice,
    paletteSlice,
  },
})

export default store
