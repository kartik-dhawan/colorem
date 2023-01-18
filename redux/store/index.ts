import { configureStore } from "@reduxjs/toolkit"
import contentSlice from "../slices/contentSlice"
import gradientSlice from "../slices/gradientSlice"
import paletteSlice from "../slices/paletteSlice"
import toggleSlice from "../slices/toggleSlice"

const store = configureStore({
  reducer: {
    contentSlice,
    paletteSlice,
    toggleSlice,
    gradientSlice,
  },
})

export default store
