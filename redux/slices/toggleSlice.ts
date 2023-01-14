import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ToggleSliceType } from "../constants/stateTypes"

const initialState: ToggleSliceType = {
  copiedAlert: false,
  selectedColor: "",
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
  },
})

export const { toggleCopiedAlert, toggleSelectedColor } = toggleSlice.actions

export default toggleSlice.reducer
