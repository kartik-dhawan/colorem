import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ToggleSliceType } from "../constants/stateTypes"

const initialState: ToggleSliceType = {
  copiedAlert: false,
  selectedColor: "",
  selectedColorsNumber: null,
}

const toggleSlice = createSlice({
  name: "toggles",
  initialState,
  reducers: {
    toggleCopiedAlert: (
      state: ToggleSliceType,
      action: PayloadAction<boolean>
    ) => {
      state.copiedAlert = action.payload
    },
    toggleSelectedColor: (
      state: ToggleSliceType,
      action: PayloadAction<string>
    ) => {
      state.selectedColor = action.payload
    },
    toggleSelectedColorsNumber: (
      state: ToggleSliceType,
      action: PayloadAction<number | null>
    ) => {
      state.selectedColorsNumber = action.payload
    },
  },
})

export const {
  toggleCopiedAlert,
  toggleSelectedColor,
  toggleSelectedColorsNumber,
} = toggleSlice.actions

export default toggleSlice.reducer
