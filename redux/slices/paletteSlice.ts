import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PaletteDataType } from "../../utils/interfaces"
import { PaletteType } from "../constants/stateTypes"

// initial state
const initialState: PaletteType = {
  data: [],
}

const paletteSlice = createSlice({
  name: "Palette Slice",
  initialState,
  reducers: {
    updatePalettes: (
      state: PaletteType,
      action: PayloadAction<PaletteDataType[]>
    ) => {
      state.data = action.payload
    },
  },
})

export const { updatePalettes } = paletteSlice.actions

export default paletteSlice.reducer
